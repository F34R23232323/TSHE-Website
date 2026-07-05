/**
 * TSHE Admin OAuth Server
 * Handles Discord OAuth2 + role verification for admin panel access.
 * Bot stays invisible (no presence) and has zero commands.
 * Run: node server/index.js
 */

import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { createServer } from 'http'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { Client, GatewayIntentBits, Options, ActivityType, EmbedBuilder } from 'discord.js'
import jwt from 'jsonwebtoken'
import { createHash } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Persistent JSON store (replaces browser localStorage) ────────────────────
const STORE_FILE = join(__dirname, '..', 'data', 'store.json')

function ensureStoreDir() {
  const dir = join(__dirname, '..', 'data')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}
ensureStoreDir()

function readStore(): Record<string, unknown> {
  try {
    if (existsSync(STORE_FILE)) return JSON.parse(readFileSync(STORE_FILE, 'utf8'))
  } catch {}
  return {}
}

function writeStore(data: Record<string, unknown>) {
  writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf8')
}

// ── Config ────────────────────────────────────────────────────────────────────

const {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_BOT_TOKEN,
  DISCORD_GUILD_ID,
  JWT_SECRET,
  PORT = '3001',
  SITE_URL = 'https://tshe.noxxbot.com',
} = process.env

const REQUIRED = ['DISCORD_CLIENT_ID', 'DISCORD_CLIENT_SECRET', 'DISCORD_BOT_TOKEN', 'DISCORD_GUILD_ID', 'JWT_SECRET']
const missing = REQUIRED.filter(k => !process.env[k])
if (missing.length) {
  console.error(`[TSHE Auth] Missing env vars: ${missing.join(', ')}`)
  process.exit(1)
}

// Role IDs allowed to access the admin panel (Head Administrator and above)
const ADMIN_ROLE_IDS = new Set([
  '1479852874635939880', // ItzF34R.mp4! — Co-Founder
  '1479912951694495845', // F34R's Sweet Princess — Co-Founder
  '1511038769321611447', // Head Administrator
  '1511038881032568923', // Senior Administrator
])

// All staff role IDs (for staff portal access)
const STAFF_ROLE_IDS = new Set([
  '1479852874635939880', // ItzF34R.mp4! — Co-Founder
  '1479912951694495845', // F34R's Sweet Princess — Co-Founder
  '1511038769321611447', // Head Administrator
  '1511038881032568923', // Senior Administrator
  '1511039635059511326', // Administrator
  '1511040098379104288', // Junior Administrator
  '1511040831782391898', // Operations Manager
  '1511041492477673472', // Community Manager
  '1511042054334058686', // Staff Coordinator
  '1511042708846936096', // Head Moderator
  '1511043938327199924', // Moderator
  '1511044452855185561', // Junior Moderator
])

// Backwards compat: ALLOWED_ROLE_IDS still used for admin panel
const ALLOWED_ROLE_IDS = ADMIN_ROLE_IDS

const OAUTH_REDIRECT = `${SITE_URL}/auth/callback`
const DISCORD_API    = 'https://discord.com/api/v10'
const COOKIE_NAME    = 'tshe_admin_token'
const COOKIE_OPTS    = {
  httpOnly: true,
  secure:   SITE_URL.startsWith('https'),
  sameSite: 'lax' as const,
  maxAge:   8 * 60 * 60 * 1000, // 8 hours
  path:     '/',
}

// ── Discord Bot (invisible, no commands) ──────────────────────────────────────

const bot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  // Minimal cache — we only need guild members for role checks
  makeCache: Options.cacheWithLimits({
    MessageManager:   0,
    ReactionManager:  0,
    GuildEmojiManager: 0,
  }),
  presence: {
    status: 'online',
    activities: [{
      name: 'tshe.f34rless.xyz',
      type: ActivityType.Watching,
    }],
  },
})

bot.once('ready', () => {
  bot.user?.setPresence({
    status: 'online',
    activities: [{
      name: 'tshe.f34rless.xyz',
      type: ActivityType.Watching,
    }],
  })
  console.log(`[TSHE Bot] Online as ${bot.user?.tag} — Watching tshe.f34rless.xyz`)
})

bot.login(DISCORD_BOT_TOKEN).catch(err => {
  console.error('[TSHE Bot] Login failed:', err.message)
  process.exit(1)
})

// ── Helper: fetch guild member and check roles ─────────────────────────────────

async function getMemberRoles(userId: string): Promise<string[]> {
  try {
    const guild = await bot.guilds.fetch(DISCORD_GUILD_ID!)
    const member = await guild.members.fetch(userId)
    return [...member.roles.cache.keys()]
  } catch {
    return []
  }
}

function hasAccess(roles: string[]): boolean {
  return roles.some(r => ALLOWED_ROLE_IDS.has(r))
}

function hasStaffAccess(roles: string[]): boolean {
  return roles.some(r => STAFF_ROLE_IDS.has(r))
}

function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: '8h' })
}

function verifyToken(token: string): jwt.JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!)
    return decoded as jwt.JwtPayload
  } catch {
    return null
  }
}

// ── DM Notification Helpers ───────────────────────────────────────────────────

const ERROR_LABELS: Record<string, string> = {
  oauth_denied:    'OAuth Denied',
  invalid_state:   'Invalid State',
  token_exchange:  'Token Exchange Failed',
  user_fetch:      'User Fetch Failed',
  access_denied:   'Access Denied',
  server_error:    'Server Error',
}

async function sendAuthDM(
  userId: string,
  success: boolean,
  opts: {
    username?: string
    avatar?: string | null
    portal?: 'admin' | 'staff'
    error?: string
  } = {}
): Promise<void> {
  try {
    const user = await bot.users.fetch(userId)
    const portalLabel = opts.portal === 'staff' ? 'Staff Portal' : 'Admin Panel'
    const avatarURL   = opts.avatar
      ? `https://cdn.discordapp.com/avatars/${userId}/${opts.avatar}.png`
      : undefined

    if (success) {
      const embed = new EmbedBuilder()
        .setColor(0x57F287) // Discord green
        .setTitle('✅ Authentication Successful')
        .setDescription(`You have successfully signed in to the **TSHE ${portalLabel}**.`)
        .addFields(
          { name: 'Portal',   value: portalLabel,              inline: true },
          { name: 'Username', value: opts.username ?? 'Unknown', inline: true },
        )
        .setFooter({ text: 'TSHE Auth System • Access is logged' })
        .setTimestamp()

      if (avatarURL) embed.setThumbnail(avatarURL)

      await user.send({ embeds: [embed] })
    } else {
      const errorKey   = opts.error ?? 'server_error'
      const errorLabel = ERROR_LABELS[errorKey] ?? errorKey

      const errorDetails: Record<string, string> = {
        oauth_denied:   'You cancelled or denied the Discord OAuth authorisation.',
        invalid_state:  'The OAuth state token was missing or expired. Please try again.',
        token_exchange: 'The server could not exchange your authorisation code with Discord.',
        user_fetch:     'Your Discord user info could not be retrieved.',
        access_denied:  'You do not have the required roles to access this portal.',
        server_error:   'An unexpected server error occurred. Please try again later.',
      }

      const embed = new EmbedBuilder()
        .setColor(0xED4245) // Discord red
        .setTitle('❌ Authentication Failed')
        .setDescription(`Your attempt to access the **TSHE ${portalLabel}** was unsuccessful.`)
        .addFields(
          { name: 'Portal',     value: portalLabel,                              inline: true },
          { name: 'Error Code', value: `\`${errorKey}\``,                        inline: true },
          { name: 'Reason',     value: errorDetails[errorKey] ?? 'Unknown error', inline: false },
        )
        .setFooter({ text: 'TSHE Auth System • If this is unexpected, contact an admin' })
        .setTimestamp()

      await user.send({ embeds: [embed] })
    }
  } catch (err) {
    // User may have DMs closed — log but don't crash
    console.warn(`[TSHE Bot] Could not DM user ${userId}:`, (err as Error).message)
  }
}

// PKCE state store (in-memory, short-lived)
const stateStore = new Map<string, number>()
function createState(): string {
  const state = createHash('sha256').update(Math.random().toString()).digest('hex').slice(0, 32)
  stateStore.set(state, Date.now())
  // Clean up states older than 10 minutes
  for (const [k, v] of stateStore) if (Date.now() - v > 600_000) stateStore.delete(k)
  return state
}
function validateState(state: string): boolean {
  const t = stateStore.get(state)
  if (!t || Date.now() - t > 600_000) return false
  stateStore.delete(state)
  return true
}

// ── Express app ───────────────────────────────────────────────────────────────

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: SITE_URL, credentials: true }))

// ── /auth/discord — redirect to Discord OAuth (admin panel) ────────────────────────────────
app.get('/auth/discord', (req, res) => {
  const state  = createState()
  const params = new URLSearchParams({
    client_id:     DISCORD_CLIENT_ID!,
    redirect_uri:  OAUTH_REDIRECT,
    response_type: 'code',
    scope:         'identify guilds.members.read',
    state,
  })
  res.redirect(`https://discord.com/oauth2/authorize?${params}`)
})

// ── /auth/staff — redirect to Discord OAuth (staff portal) ───────────────────
app.get('/auth/staff', (req, res) => {
  const state = 'staff_' + createState()
  const params = new URLSearchParams({
    client_id:     DISCORD_CLIENT_ID!,
    redirect_uri:  OAUTH_REDIRECT,
    response_type: 'code',
    scope:         'identify guilds.members.read',
    state,
  })
  res.redirect(`https://discord.com/oauth2/authorize?${params}`)
})

// ── /auth/callback — Discord sends user back here ────────────────────────────
app.get('/auth/callback', async (req, res) => {
  const { code, state, error } = req.query as Record<string, string>
  const isStaffFlow = typeof state === 'string' && state.startsWith('staff_')
  const errorRedirect = isStaffFlow ? '/staff-portal?error=oauth_denied' : '/admin?error=oauth_denied'

  if (error) {
    // We don't have the user ID at this point (OAuth was denied before we got it)
    return res.redirect(errorRedirect)
  }

  if (!code || !state || !validateState(isStaffFlow ? state.slice(6) : state)) {
    return res.redirect(isStaffFlow ? '/staff-portal?error=invalid_state' : '/admin?error=invalid_state')
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch(`${DISCORD_API}/oauth2/token`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id:     DISCORD_CLIENT_ID!,
        client_secret: DISCORD_CLIENT_SECRET!,
        grant_type:    'authorization_code',
        code,
        redirect_uri:  OAUTH_REDIRECT,
      }),
    })

    if (!tokenRes.ok) {
      console.error('[Auth] Token exchange failed:', await tokenRes.text())
      return res.redirect(isStaffFlow ? '/staff-portal?error=token_exchange' : '/admin?error=token_exchange')
    }

    const { access_token } = await tokenRes.json() as { access_token: string }

    // Fetch Discord user info
    const userRes = await fetch(`${DISCORD_API}/users/@me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (!userRes.ok) return res.redirect(isStaffFlow ? '/staff-portal?error=user_fetch' : '/admin?error=user_fetch')
    const user = await userRes.json() as { id: string; username: string; discriminator: string; avatar: string | null }

    // Check guild member roles via bot
    const roles = await getMemberRoles(user.id)

    if (!hasAccess(roles) && !hasStaffAccess(roles)) {
      // DM the user to tell them they lack the required roles
      void sendAuthDM(user.id, false, {
        username: user.username,
        avatar:   user.avatar,
        portal:   isStaffFlow ? 'staff' : 'admin',
        error:    'access_denied',
      })
      return res.redirect(isStaffFlow ? '/staff-portal?error=access_denied' : '/admin?error=access_denied')
    }

    // Issue signed JWT cookie
    const token = signToken({
      id:       user.id,
      username: user.username,
      avatar:   user.avatar,
      roles,
    })

    // DM the user to confirm successful access
    void sendAuthDM(user.id, true, {
      username: user.username,
      avatar:   user.avatar,
      portal:   isStaffFlow ? 'staff' : 'admin',
    })

    res.cookie(COOKIE_NAME, token, COOKIE_OPTS)
    // Redirect to staff portal if coming from that flow
    res.redirect(isStaffFlow ? '/staff-portal' : '/admin')

  } catch (err) {
    console.error('[Auth] Callback error:', err)
    res.redirect('/admin?error=server_error')
  }
})

// ── /auth/me — frontend polls this to check session ─────────────────────────
app.get('/auth/me', (req, res) => {
  const token = req.cookies[COOKIE_NAME]
  if (!token) return res.status(401).json({ authenticated: false })

  const payload = verifyToken(token)
  if (!payload)  return res.status(401).json({ authenticated: false })

  res.json({
    authenticated: true,
    user: {
      id:       payload.id,
      username: payload.username,
      avatar:   payload.avatar,
    },
  })
})

// ── /auth/me-roles — returns user + their roles for portal access checks ─────
app.get('/auth/me-roles', (req, res) => {
  const token = req.cookies[COOKIE_NAME]
  if (!token) return res.status(401).json({ authenticated: false })

  const payload = verifyToken(token)
  if (!payload)  return res.status(401).json({ authenticated: false })

  res.json({
    authenticated: true,
    user: {
      id:       payload.id,
      username: payload.username,
      avatar:   payload.avatar,
    },
    roles: payload.roles ?? [],
    isAdmin: hasAccess(payload.roles ?? []),
    isStaff: hasStaffAccess(payload.roles ?? []),
  })
})

// ── /auth/staff-verify — verifies staff portal access ────────────────────────
app.get('/auth/staff-verify', (req, res) => {
  const token = req.cookies[COOKIE_NAME]
  if (!token) return res.status(401).json({ ok: false, reason: 'no_token' })
  const payload = verifyToken(token)
  if (!payload) return res.status(401).json({ ok: false, reason: 'invalid_token' })
  getMemberRoles(payload.id).then(roles => {
    if (!hasStaffAccess(roles)) {
      res.clearCookie(COOKIE_NAME, { path: '/' })
      return res.status(403).json({ ok: false, reason: 'access_denied' })
    }
    res.json({ ok: true, isAdmin: hasAccess(roles), roles })
  })
})

// ── /auth/logout — clear cookie ──────────────────────────────────────────────
app.post('/auth/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' })
  res.json({ ok: true })
})

// ── /auth/verify — middleware helper for the frontend ─────────────────────────
app.get('/auth/verify', (req, res) => {
  const token = req.cookies[COOKIE_NAME]
  if (!token) return res.status(401).json({ ok: false, reason: 'no_token' })
  const payload = verifyToken(token)
  if (!payload) return res.status(401).json({ ok: false, reason: 'invalid_token' })
  // Re-check roles on each verify (bot fetches live)
  getMemberRoles(payload.id).then(roles => {
    if (!hasAccess(roles)) {
      res.clearCookie(COOKIE_NAME, { path: '/' })
      return res.status(403).json({ ok: false, reason: 'access_denied' })
    }
    res.json({ ok: true })
  })
})

// ── /api/store — persistent key-value store (replaces localStorage) ──────────
// GET  /api/store?key=foo        → { value: ... } or { value: null }
// GET  /api/store                → { store: { ...all } }
// POST /api/store { key, value } → { ok: true }
// DELETE /api/store?key=foo      → { ok: true }

app.get('/api/store', (req, res) => {
  const store = readStore()
  const { key } = req.query
  if (key && typeof key === 'string') {
    res.json({ value: key in store ? store[key] : null })
  } else {
    res.json({ store })
  }
})

app.post('/api/store', (req, res) => {
  const { key, value } = req.body
  if (!key || typeof key !== 'string') return res.status(400).json({ error: 'key required' })
  const store = readStore()
  store[key] = value
  writeStore(store)
  res.json({ ok: true })
})

app.delete('/api/store', (req, res) => {
  const { key } = req.query
  if (!key || typeof key !== 'string') return res.status(400).json({ error: 'key required' })
  const store = readStore()
  delete store[key]
  writeStore(store)
  res.json({ ok: true })
})

// ── Serve built React frontend (for standalone use without nginx) ─────────────
// When running behind nginx, nginx serves the static files directly.
// When running standalone (e.g. during testing), this serves the built app.
const distPath = join(__dirname, '..', 'dist')
if (existsSync(distPath)) {
  app.use(express.static(distPath))
  // SPA fallback — all non-auth, non-api routes serve index.html
  app.get('*', (req, res) => {
    if (req.path.startsWith('/auth/')) return res.status(404).json({ error: 'Not found' })
    res.sendFile(join(distPath, 'index.html'))
  })
  console.log(`[TSHE Auth] Serving static files from ${distPath}`)
} else {
  console.log('[TSHE Auth] No dist/ folder found — running in proxy mode (nginx serves static files)')
}

// ── Start ─────────────────────────────────────────────────────────────────────
const port = parseInt(PORT)
createServer(app).listen(port, '127.0.0.1', () => {
  console.log(`[TSHE Auth] Server listening on port ${port}`)
})