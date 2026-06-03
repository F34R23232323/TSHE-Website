/**
 * TSHE Live Data Store
 * All pages read from here. Admin panel writes to here.
 * Falls back to hardcoded defaults from content.ts if no overrides saved.
 */

import {
  ruleSections as defaultRules,
  punishmentTiers as defaultTiers,
  warnSteps as defaultWarnSteps,
  definitions as defaultDefs,
  reportGuide as defaultReport,
  type RuleSection,
  type PunishmentTier,
  type WarnStep,
  type Definition,
} from './content'

export type { RuleSection, PunishmentTier, WarnStep, Definition }

// ── Storage keys ──────────────────────────────────────────────────────────────
const KEYS = {
  rules:       'tshe_data_rules',
  tiers:       'tshe_data_tiers',
  warnSteps:   'tshe_data_warnsteps',
  definitions: 'tshe_data_definitions',
  report:      'tshe_data_report',
  site:        'tshe_data_site',
  services:    'tshe_data_services',
  staffGuides: 'tshe_data_staffguides',
} as const

// ── Site-wide settings ────────────────────────────────────────────────────────
export interface SiteConfig {
  serverName: string
  serverTagline: string
  discordInvite: string
  appealUrl: string
  maintenanceMode: boolean
  maintenanceMessage: string
  maintenanceEta: string
  maintenanceAutoDisable: boolean    // auto-disable at a specific datetime
  maintenanceAutoDisableAt: string   // ISO datetime string
  embedTitle: string
  embedDescription: string
  announcementBanner: string
  announcementEnabled: boolean
  accentColor: string
  copyrightYear: string
  footerNote: string
}

export const DEFAULT_SITE: SiteConfig = {
  serverName: 'The SnowHaven Empire',
  serverTagline: 'A community built on respect, safety, and fun. Est. 2024.',
  discordInvite: 'https://discord.gg/DeSrm3WNmk',
  appealUrl: 'https://zepp.noxxbot.com/appeals/1466990155020898413',
  maintenanceMode: false,
  maintenanceMessage: "The SnowHaven Empire website is currently undergoing maintenance. We'll be back shortly!",
  maintenanceEta: '',
  maintenanceAutoDisable: false,
  maintenanceAutoDisableAt: '',
  embedTitle: 'The SnowHaven Empire',
  embedDescription: 'Community rules, punishment guide, AI moderation, AutoMod limits, FAQ, roles, and full server documentation for TSHE.',
  announcementBanner: '',
  announcementEnabled: false,
  accentColor: '#7ec8e3',
  copyrightYear: '2026',
  footerNote: 'Powered by Noxx',
}

// ── Services ──────────────────────────────────────────────────────────────────
export interface ServiceItem {
  id: string
  name: string
  tagline: string
  description: string
  badge: string
  primaryLabel: string
  primaryUrl: string
  secondaryLabel: string
  secondaryUrl: string
  color: string
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  { id: 'kasumei', name: 'Kasumei Tickets', tagline: 'Advanced Ticket Management', description: 'A powerful ticketing system for Discord servers. Create custom ticket panels, manage support queues, and keep your community help desk organised with full transcript support.', badge: 'Ticketing Bot', primaryLabel: 'kasumei.com', primaryUrl: 'https://kasumei.com', secondaryLabel: '', secondaryUrl: '', color: '#a78bfa' },
  { id: 'noxx', name: 'Noxx', tagline: 'The All-in-One Discord Bot', description: 'Noxx is a fully-featured Discord bot with 150+ commands covering moderation, leveling, tickets, music, economy, custom branding, IP verification, and much more. The same bot powering TSHE.', badge: 'Featured', primaryLabel: 'noxxbot.com', primaryUrl: 'https://noxxbot.com', secondaryLabel: 'Dashboard', secondaryUrl: 'https://dashboard.noxxbot.com', color: '#7ec8e3' },
  { id: 'tnrp', name: 'TNRP', tagline: 'The Next Roleplay Community', description: 'A dedicated Discord roleplay server. Immersive storylines, active community, and structured roleplay events. Join a growing universe of characters, lore, and collaborative storytelling.', badge: 'Community', primaryLabel: 'Server Website', primaryUrl: 'https://noxxbot.com/tnrp', secondaryLabel: 'Join Discord', secondaryUrl: 'https://discord.gg/tnrp1', color: '#34d399' },
  { id: 'mika', name: 'Mika', tagline: 'Uptime & Status Monitoring', description: 'Mika is an uptime tracking and status monitoring bot. Monitor your websites, APIs, and services directly from Discord — with instant alerts when something goes down.', badge: 'Monitoring', primaryLabel: 'stats.noxxbot.com', primaryUrl: 'https://stats.noxxbot.com', secondaryLabel: '', secondaryUrl: '', color: '#f59e0b' },
  { id: 'f34r', name: 'ItzF34R.mp4', tagline: 'About the Developer', description: "The personal portfolio and about page for ItzF34R — owner of TSHE, developer of Noxx, Kasumei, Mika, and more. Check out projects, skills, and contact information.", badge: 'Portfolio', primaryLabel: 'f34r.noxxbot.com', primaryUrl: 'https://f34r.noxxbot.com', secondaryLabel: '', secondaryUrl: '', color: '#f472b6' },
]

// ── Report guide ──────────────────────────────────────────────────────────────
export interface ReportStep {
  step: number
  title: string
  desc: string
}

// ── Generic read/write helpers ────────────────────────────────────────────────
// ── Persistent store helpers (server-side JSON file via /api/store) ───────────────
// Reads are synchronous from an in-memory cache warmed by initStore().
// Writes persist to disk asynchronously (fire-and-forget fetch).
// Call initStore() once on app startup (e.g. in main.tsx) before rendering.

const _cache: Record<string, unknown> = {}

export async function initStore(): Promise<void> {
  try {
    const res = await fetch('/api/store')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json() as { store: Record<string, unknown> }
    Object.assign(_cache, data.store)
  } catch (e) {
    console.warn('[store] Could not load from server, falling back to defaults:', e)
  }
}

function read<T>(key: string, fallback: T): T {
  if (key in _cache) {
    try { return _cache[key] as T } catch {}
  }
  return fallback
}

function write<T>(key: string, value: T): void {
  _cache[key] = value
  fetch('/api/store', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value }),
  }).catch(e => console.warn('[store] Write failed for key', key, e))
  // Dispatch a custom event so same-window listeners (App.tsx) pick up changes immediately.
  window.dispatchEvent(new CustomEvent('tshe-store-update', { detail: { key } }))
}

function reset(key: string): void {
  delete _cache[key]
  fetch(`/api/store?key=${encodeURIComponent(key)}`, { method: 'DELETE' })
    .catch(e => console.warn('[store] Delete failed for key', key, e))
}

// ── Public API ────────────────────────────────────────────────────────────────

// Site config
export function getSiteConfig(): SiteConfig {
  const cfg = read(KEYS.site, DEFAULT_SITE)
  // Auto-disable maintenance if scheduled time has passed
  if (cfg.maintenanceMode && cfg.maintenanceAutoDisable && cfg.maintenanceAutoDisableAt) {
    const disableAt = new Date(cfg.maintenanceAutoDisableAt).getTime()
    if (!isNaN(disableAt) && Date.now() >= disableAt) {
      const updated = { ...cfg, maintenanceMode: false, maintenanceAutoDisable: false }
      write(KEYS.site, updated)
      return updated
    }
  }
  return cfg
}
export const saveSiteConfig  = (v: SiteConfig)     => write(KEYS.site, v)
export const resetSiteConfig = ()                  => reset(KEYS.site)

// Rules
export const getRules   = (): RuleSection[] => read(KEYS.rules, defaultRules)
export const saveRules  = (v: RuleSection[]) => write(KEYS.rules, v)
export const resetRules = ()                 => reset(KEYS.rules)

// Punishment tiers
export const getTiers   = (): PunishmentTier[] => read(KEYS.tiers, defaultTiers)
export const saveTiers  = (v: PunishmentTier[]) => write(KEYS.tiers, v)
export const resetTiers = ()                    => reset(KEYS.tiers)

// Warning steps
export const getWarnSteps   = (): WarnStep[] => read(KEYS.warnSteps, defaultWarnSteps)
export const saveWarnSteps  = (v: WarnStep[]) => write(KEYS.warnSteps, v)
export const resetWarnSteps = ()              => reset(KEYS.warnSteps)

// Definitions
export const getDefinitions   = (): Definition[] => read(KEYS.definitions, defaultDefs)
export const saveDefinitions  = (v: Definition[]) => write(KEYS.definitions, v)
export const resetDefinitions = ()                => reset(KEYS.definitions)

// Report guide
export const getReport   = (): ReportStep[] => read(KEYS.report, defaultReport)
export const saveReport  = (v: ReportStep[]) => write(KEYS.report, v)
export const resetReport = ()                => reset(KEYS.report)

// Services
export const getServices   = (): ServiceItem[] => read(KEYS.services, DEFAULT_SERVICES)
export const saveServices  = (v: ServiceItem[]) => write(KEYS.services, v)
export const resetServices = ()                 => reset(KEYS.services)

// Staff guide
export interface StaffGuideSection {
  id: string
  title: string
  content: string
}

export interface StaffRoleGuide {
  id: string
  roleName: string
  color: string
  tier: 'leadership' | 'admin' | 'management' | 'mod' | 'policy'
  summary: string
  sections: StaffGuideSection[]
}

export const DEFAULT_STAFF_GUIDES: StaffRoleGuide[] = [
  {
    id: 'staff-policies',
    roleName: 'Staff Policies',
    color: '#7ec8e3',
    tier: 'policy',
    summary: 'General policies that apply to all staff members regardless of rank — including time off, leave of absence, activity expectations, conduct, welfare, and bot usage.',
    sections: [
      { id: 'loa', title: 'Leave of Absence (LOA)', content: 'A Leave of Absence is a formal notice that you will be away and unable to carry out your staff duties for an extended period.\n\n**When to submit an LOA:**\n- Moderator / Junior Moderator: 5+ days away\n- Administrator / Junior Administrator: 5+ days away\n- Management and above: 1 week+\n\n**LOA format (post in #staff-loa or staff channel):**\n```\nLOA — [Name / Username]\nFrom: [Start date]\nTo: [Return date]\nReason: [Optional — e.g. holiday, exams, personal]\nCoverage: [Who is covering your duties if applicable]\n```\n\n**Short breaks (1–2 days):** No formal LOA needed — just let your team know in staff chat.\n\n**Extended LOA (2+ weeks):** Must be approved by your direct superior. Your role may be held as inactive pending return.' },
      { id: 'activity', title: 'Activity Requirements', content: 'Activity expectations by tier:\n\n- **Junior Moderator:** Active in the server at least 3–4 times per week. Minimum 1 moderation action or check-in per week.\n- **Moderator:** Active at least 4–5 times per week. Weekly team check-in required.\n- **Head Moderator:** Active at least 4–5 times per week. Weekly team check-in required.\n- **Junior Administrator:** Active at least 3–4 times per week. Respond to escalations within 24 hours.\n- **Administrator / Senior Administrator:** Active daily or near-daily. Check mod-log every 48 hours minimum.\n- **Management and above:** No hard requirement — but must be reachable and responsive.\n- **Co-Founders:** No activity requirement.\n\n**Inactivity procedure:**\n1. 7 days without activity → welfare check message from superior\n2. 14 days without contact or LOA → role review and possible demotion\n3. 30 days without any contact → automatic removal (rank may be reinstated upon return with explanation)' },
      { id: 'returning', title: 'Returning from Time Off', content: 'When you come back from an LOA or extended break:\n\n1. **Ping your direct superior** to confirm you are back and ready for duties\n2. **Review the mod-log** for any major incidents that happened while you were away\n3. **Check staff announcements** for any rule or policy changes\n4. **Re-read any updated guides** if notified of changes\n5. Ease back in — you do not need to catch up on everything at once\n\nIf you return and your role has been adjusted, speak privately with your superior — unexpected situations may be explained and roles may be reinstated.' },
      { id: 'welfare', title: 'Staff Welfare', content: 'Your wellbeing matters more than your moderation output.\n\n- You are **never expected to moderate while stressed, unwell, or burnt out** — step away and let the team know\n- If you are struggling personally, you can DM your superior in confidence — you will not be penalised for being human\n- **Burnout is real** — if moderation feels like a chore you dread, talk to Head Administrator or a senior staff member\n- You are always allowed to take a break — just communicate it\n- If you witness or experience toxic behavior **from other staff members**, report it to Head Administrator or above immediately\n- Mental health days are valid. No explanation required beyond "I need a day."' },
      { id: 'conduct', title: 'General Staff Conduct', content: '- Represent TSHE professionally at all times — in this server and others\n- Never discuss internal staff matters, active cases, or bans in public channels\n- Do not make moderation decisions while emotionally involved in a situation — ask another staff member to handle it\n- Treat all members equally regardless of personal feelings\n- Do not abuse staff permissions for personal gain or entertainment\n- If you disagree with a decision, raise it in private staff channels — never publicly\n- Errors happen — own them, correct them, and inform your superior. There is no shame in making mistakes honestly.' },
      { id: 'bot-usage', title: 'Bot Command Reference', content: '**Command Prefixes:** `!` `,` `?` `-` `~` `$` `>`\n**Tags Prefix:** `!!` (e.g. `!!rules`, `!!appeal`, `!!roles`, `!!ticket`)\n\n**All Members:**\n- !help — Bot help\n- !avatar — View user avatars\n- !!rules — Server rules\n- !!appeal — How to appeal moderation actions\n- !!roles — Self-assignable roles info\n- !!ticket — How to open a support ticket\n\n**Level 40+ (Junior Moderator and above):**\n- Moderation: ?note, ?warn, ?mute, ?kick, ?ban, ?unban, ?cases, ?addcase\n- Utility: ?roles, ?search, ?clean, ?info, ?server, ?inviteinfo, ?channelinfo, ?messageinfo, ?userinfo, ?roleinfo, ?emojiinfo, ?snowflake, ?nickname, ?context, ?jumbo, ?avatar, ?about, ?lookup, ?quote, ?purge_until, ?vcmove, ?vckick\n- Mutes: ?mutes\n\n**Level 50+ (Moderator and above):**\n- ?lock, ?lockstatus — Channel lock\n- ?stick, ?unstick — Sticky messages\n- Appeals — View & handle submissions\n\n**Level 80+ (Junior Administrator and above):**\n- ?lockall — Lock all configured channels\n- ?massban, ?massunban, ?massmute, ?masspunish — Mass actions\n- ?hidecase, ?deletecase — Case management\n- ?act_as — Act as other moderator\n- ?clearwarn — Clear warnings\n- ?mute cleanup — Mute list cleanup\n- ?reload_guild, ?ping, ?source — Server admin\n- Appeals — Manage forms' },
    ],
  },
  {
    id: 'head-administrator',
    roleName: 'Head Administrator',
    color: '#ed4245',
    tier: 'admin',
    summary: 'The highest authority below the Owners (Level 95). Holds Administrator permission and full access to all bot systems, moderation tools, and server infrastructure.',
    sections: [
      { id: 'system', title: 'System Profile', content: '- **Level:** 95 — Highest non-owner authority\n- **Bot Prefixes:** `!` `,` `?` `-` `~` `$` `>`\n- **Tags Prefix:** `!!`\n- **Archive Access:** Yes\n- **Admin Panel:** https://tshe.noxxbot.com/admin' },
      { id: 'responsibilities', title: 'Core Responsibilities', content: '- Final say on all moderation decisions and staff escalations\n- Oversee Administration, Management, and Moderation teams\n- Manage bot configurations, server infrastructure, and system integrity\n- Handle appeals at the highest level\n- Set the long-term direction and standards of TSHE' },
      { id: 'authority', title: 'Authority Overview', content: '- Unrestricted server permissions — full Administrator access\n- Full access to all staff channels, moderation logs, and server settings\n- Can appoint, demote, or remove any staff member at any rank\n- Can issue and overturn any punishment type without restriction\n- Can override decisions made at any level of the staff hierarchy\n- Final word on all appeals, disputes, and staff conduct matters' },
      { id: 'commands', title: 'Bot Commands — Full Access (Level 95)', content: '**Moderation:**\n- ?note, ?warn, ?mute, ?kick, ?ban, ?unban — All standard actions\n- ?massban, ?massunban, ?massmute, ?masspunish — Mass actions\n- ?hidecase, ?deletecase, ?clearwarn, ?act_as — Case management\n- ?mute cleanup — Mute role list management\n\n**Channel Management:**\n- ?lock, ?lockstatus — Channel lock control\n- ?lockall — Lock all configured channels\n- ?stick, ?unstick — Sticky message management\n\n**Infrastructure:**\n- ?reload_guild — Reload bot configuration\n- ?ping, ?source — Bot diagnostics\n- Appeal form management — Create, edit, delete forms\n\n**Utility:** Full access to all utility commands' },
      { id: 'escalation', title: 'Escalation', content: '**Receives from:** Senior Administrator\n**Escalates to:** Co-Founders (beyond your authority)\n\n**When to Act Directly:**\n- Active server emergencies requiring immediate mass action\n- Serious misconduct by any staff member\n- Configuration changes, bot updates, or infrastructure issues\n\nFor everything else: let the chain operate as intended.' },
    ]
  },
  {
    id: 'senior-administrator',
    roleName: 'Senior Administrator',
    color: '#f57c00',
    tier: 'admin',
    summary: 'Second-highest authority (Level 90) working directly below the Head Administrator. Oversees Administrators and handles major decisions when Head Administrator is unavailable.',
    sections: [
      { id: 'system', title: 'System Profile', content: '- **Level:** 90 — Senior administration\n- **Bot Prefixes:** `!` `,` `?` `-` `~` `$` `>`\n- **Tags Prefix:** `!!`\n- **Archive Access:** Yes\n- **Admin Panel:** https://tshe.noxxbot.com/admin (full access)' },
      { id: 'responsibilities', title: 'Core Responsibilities', content: '- Support the Head Administrator in all major decisions\n- Oversee Administrators and the day-to-day admin team\n- Manage server configuration, roles, channels, and permissions\n- Handle escalations from Administrators and Management\n- Review staff applications at the administration level' },
      { id: 'authority', title: 'Authority Overview', content: '- Near-unrestricted server permissions — full management access\n- Full access to all staff channels, moderation logs, and server settings\n- Full access to the TSHE website admin panel\n- Can appoint and demote Administrators and below\n- Can issue and overturn punishments up to permanent ban\n- Can override Administrator and Management decisions\n- Final escalation point before Head Administrator' },
      { id: 'commands', title: 'Bot Commands (Level 90)', content: '**Moderation:**\n- ?note, ?warn, ?mute, ?kick, ?ban, ?unban — All standard actions\n- ?massban, ?massunban, ?massmute — Mass actions\n- ?hidecase, ?deletecase, ?clearwarn, ?act_as — Case management\n\n**Channel Management:**\n- ?lock, ?lockstatus, ?lockall — Full lock control\n- ?stick, ?unstick — Sticky messages\n\n**Infrastructure:**\n- ?reload_guild, ?ping, ?source — Server admin\n- Appeal form management\n\n**Utility:** Full access to all utility commands' },
      { id: 'escalation', title: 'Escalation', content: '**Receives from:** Administrator, Operations Manager\n**Escalates to:** Head Administrator\n\n**When to Act Directly:**\n- Active server emergencies requiring mass action\n- Serious misconduct by Administrators or Management\n- Decisions escalated beyond Administrator level' },
    ]
  },
  {
    id: 'administrator',
    roleName: 'Administrator',
    color: '#f87171',
    tier: 'admin',
    summary: 'Handles elevated moderation, server configuration, and bridges Management with Moderation (Level 85). A trusted member of the administration team.',
    sections: [
      { id: 'system', title: 'System Profile', content: '- **Level:** 85 — Administration\n- **Bot Prefixes:** `!` `,` `?` `-` `~` `$` `>`\n- **Tags Prefix:** `!!`\n- **Archive Access:** Yes' },
      { id: 'responsibilities', title: 'Core Responsibilities', content: '- Handle moderation cases escalated from Head Moderators\n- Manage server channels, roles, and permission structures\n- Support the Management team with day-to-day operations\n- Review and action appeals at the admin level\n- Mentor and oversee the Moderation team' },
      { id: 'authority', title: 'Authority Overview', content: '- Full access to moderation tools and case management\n- Access to all staff channels below Administration level\n- Can manage channels, roles, and server configuration\n- Can appoint and demote Moderators and below\n- Can issue and overturn punishments up to permanent ban\n- Can approve or deny applications for Moderator and below' },
      { id: 'commands', title: 'Bot Commands (Level 85)', content: '**Moderation:**\n- ?note, ?warn, ?mute, ?kick, ?ban, ?unban — All standard actions\n- ?massban, ?massunban, ?massmute — Mass actions\n- ?hidecase, ?deletecase — Case management\n\n**Channel Management:**\n- ?lock, ?lockstatus, ?lockall — Full lock control\n- ?reload_guild, ?ping, ?source — Server admin\n\n**Utility:** Full access to all utility commands' },
      { id: 'escalation', title: 'Escalation', content: '**Receives from:** Head Moderator\n**Escalates to:** Senior Administrator' },
    ]
  },
  {
    id: 'junior-administrator',
    roleName: 'Junior Administrator',
    color: '#f57c00',
    tier: 'admin',
    summary: 'Entry point into administration (Level 80). Handles moderate server management and bridges Moderation with Administration — designed to develop future Administrators.',
    sections: [
      { id: 'system', title: 'System Profile', content: '- **Level:** 80 — Entry-level administration\n- **Bot Prefixes:** `!` `,` `?` `-` `~` `$` `>`\n- **Tags Prefix:** `!!`\n- **Archive Access:** Yes' },
      { id: 'responsibilities', title: 'Core Responsibilities', content: '- Assist Administrators with day-to-day server management\n- Manage channels, roles, and basic server configuration\n- Handle moderation cases escalated from Moderators\n- Support and oversee the Moderation team\n- Learn advanced moderation and server management' },
      { id: 'authority', title: 'Authority Overview', content: '- Elevated moderation permissions and case management\n- Access to Administration-level staff channels\n- Can manage channels and basic server configuration\n- Can issue and overturn punishments up to temporary ban\n- Can guide and oversee the Moderation team\n- Training and mentorship from Senior Administrators' },
      { id: 'commands', title: 'Bot Commands (Level 80)', content: '**Moderation:**\n- ?note, ?warn, ?mute, ?kick, ?ban, ?unban — All standard actions\n\n**Channel Management:**\n- ?lock, ?lockstatus — Channel lock control\n\n**Infrastructure:**\n- ?reload_guild, ?ping, ?source — Server admin\n\n**Utility:** Full access to all utility commands' },
      { id: 'escalation', title: 'Escalation', content: '**Receives from:** Moderator\n**Escalates to:** Administrator' },
    ]
  },
  {
    id: 'operations-manager',
    roleName: 'Operations Manager',
    color: '#5865f2',
    tier: 'management',
    summary: 'Responsible for the technical backbone of TSHE — bots, infrastructure, the website, and all backend systems (Level 75). The highest staff role you can apply for.',
    sections: [
      { id: 'system', title: 'System Profile', content: '- **Level:** 75 — Technical management\n- **Bot Prefixes:** `!` `,` `?` `-` `~` `$` `>`\n- **Tags Prefix:** `!!`\n- **Archive Access:** Yes\n- **Admin Panel:** https://tshe.noxxbot.com/admin (elevated access)' },
      { id: 'responsibilities', title: 'Core Responsibilities', content: '- Manage all TSHE bots — configuration, updates, and troubleshooting\n- Maintain the TSHE website and all backend infrastructure\n- Oversee server security, bot permissions, and system integrity\n- Coordinate with developers for new features and fixes\n- Monitor server health, performance, and automated systems' },
      { id: 'authority', title: 'Authority Overview', content: '- Full access to bot configuration and server infrastructure\n- Elevated access to the TSHE website admin panel\n- Can manage bots, webhooks, integrations, and automated systems\n- Can issue standard moderation actions when necessary\n- Coordinates with Administration on technical decisions' },
      { id: 'commands', title: 'Bot Commands (Level 75)', content: '**Moderation:**\n- ?note, ?warn, ?mute, ?kick, ?ban, ?unban — All standard actions\n\n**Channel Management:**\n- ?lock, ?lockstatus — Channel lock control\n\n**Utility:** Full access to all utility commands' },
      { id: 'escalation', title: 'Escalation', content: '**Receives from:** Community Manager, Staff Coordinator\n**Escalates to:** Administrator, Senior Administrator' },
    ]
  },
  {
    id: 'community-manager',
    roleName: 'Community Manager',
    color: '#5865f2',
    tier: 'management',
    summary: 'Oversees the community experience — member engagement, events, channel structure, and ensuring TSHE remains welcoming and active (Level 70).',
    sections: [
      { id: 'system', title: 'System Profile', content: '- **Level:** 70 — Community management\n- **Bot Prefixes:** `!` `,` `?` `-` `~` `$` `>`\n- **Tags Prefix:** `!!`\n- **Archive Access:** Yes' },
      { id: 'responsibilities', title: 'Core Responsibilities', content: '- Plan and run community events, activities, and competitions\n- Manage channel structure, topics, and community spaces\n- Monitor member satisfaction and community health\n- Coordinate with Content Creators and community contributors\n- Handle community feedback and suggestions' },
      { id: 'authority', title: 'Authority Overview', content: '- Management-level access to community channels and configuration\n- Can manage events, channel structure, and community spaces\n- Can issue basic moderation actions when necessary\n- Oversees the community experience and member engagement\n- Coordinates with the Moderation team on community issues' },
      { id: 'commands', title: 'Bot Commands (Level 70)', content: '**Moderation:**\n- ?note, ?warn, ?mute, ?kick — Basic moderation\n\n**Channel Management:**\n- ?lock, ?lockstatus — Channel lock control\n\n**Utility:** Basic utility commands' },
      { id: 'escalation', title: 'Escalation', content: '**Receives from:** Staff Coordinator, Moderation team\n**Escalates to:** Operations Manager' },
    ]
  },
  {
    id: 'staff-coordinator',
    roleName: 'Staff Coordinator',
    color: '#5865f2',
    tier: 'management',
    summary: 'The bridge between leadership and staff (Level 65). Manages staff performance, conduct, recruitment, and training — ensuring the team runs effectively and professionally.',
    sections: [
      { id: 'system', title: 'System Profile', content: '- **Level:** 65 — Staff management\n- **Bot Prefixes:** `!` `,` `?` `-` `~` `$` `>`\n- **Tags Prefix:** `!!`\n- **Archive Access:** Yes\n- **Admin Panel:** https://tshe.noxxbot.com/admin (elevated access)' },
      { id: 'responsibilities', title: 'Core Responsibilities', content: '- Manage staff performance — activity, conduct, and accountability\n- Coordinate recruitment, interviews, and onboarding\n- Handle staff conduct — warnings, improvement plans, demotions\n- Train new staff and support their development\n- Review and process staff applications' },
      { id: 'authority', title: 'Authority Overview', content: '- Full authority over the Moderation team for performance matters\n- Elevated access to the TSHE website admin panel\n- Can manage staff records, applications, and performance reviews\n- Can issue staff warnings and recommend demotions\n- Can approve or deny applications for Moderator and Junior Moderator' },
      { id: 'commands', title: 'Bot Commands (Level 65)', content: '**Moderation:**\n- ?note, ?warn, ?mute, ?kick — Basic moderation\n\n**Channel Management:**\n- ?lock, ?lockstatus — Channel lock control\n\n**Utility:** Basic utility commands' },
      { id: 'escalation', title: 'Escalation', content: '**Receives from:** Head Moderator, Moderator\n**Escalates to:** Community Manager, Operations Manager' },
    ]
  },
  {
    id: 'head-moderator',
    roleName: 'Head Moderator',
    color: '#60a5fa',
    tier: 'mod',
    summary: 'Step up from Moderator (Level 60). Handles elevated cases, mentors Junior Moderators, and acts as the first escalation point above standard moderation.',
    sections: [
      { id: 'system', title: 'System Profile', content: '- **Level:** 60 — Moderation lead\n- **Bot Prefixes:** `!` `,` `?` `-` `~` `$` `>`\n- **Tags Prefix:** `!!`\n- **Archive Access:** Yes' },
      { id: 'responsibilities', title: 'Core Responsibilities', content: '- Handle cases escalated from Moderators and Junior Moderators\n- Mentor and train the moderation team\n- Review moderator performance\n- Issue punishments up to permanent ban\n- Review appeal submissions and make recommendations\n- Ensure consistent and fair moderation across the server' },
      { id: 'authority', title: 'Authority Overview', content: '- Authority to guide Moderators and Junior Moderators\n- Full moderation tools including ban and unban\n- Access to moderation logs and case history\n- Can lock and unlock channels as needed\n- Can review appeal submissions\n- Reports to Staff Coordinator and Administration' },
      { id: 'commands', title: 'Bot Commands (Level 60)', content: '**Moderation:**\n- ?note, ?warn, ?mute, ?kick, ?ban, ?unban — All standard actions\n\n**Channel Management:**\n- ?lock, ?lockstatus — Channel lock control\n- ?stick, ?unstick — Sticky messages\n\n**Utility:** Server info and management utilities' },
      { id: 'escalation', title: 'Escalation', content: '**Receives from:** Moderator, Junior Moderator\n**Escalates to:** Staff Coordinator, Administrator' },
    ]
  },
  {
    id: 'moderator',
    roleName: 'Moderator',
    color: '#34d399',
    tier: 'mod',
    summary: 'The frontline of TSHE\'s moderation team (Level 50). Enforces rules, handles reports, and keeps the server safe day to day.',
    sections: [
      { id: 'system', title: 'System Profile', content: '- **Level:** 50 — Frontline moderation\n- **Bot Prefixes:** `!` `,` `?` `-` `~` `$` `>`\n- **Tags Prefix:** `!!`\n- **Archive Access:** Yes' },
      { id: 'responsibilities', title: 'Core Responsibilities', content: '- Enforce all TSHE rules consistently and fairly\n- Handle user reports and moderation cases\n- Issue warnings, mutes, kicks, and temporary bans\n- Monitor chat for rule violations and problematic behaviour\n- Escalate serious cases to Head Moderators\n- Support Junior Moderators with guidance' },
      { id: 'authority', title: 'Authority Overview', content: '- Full moderation toolkit — warnings, mutes, kicks, bans\n- Access to moderation channels and case logs\n- Can lock channels during incidents\n- Can guide Junior Moderators on basic moderation\n- Permanent bans require Head Moderator or above approval\n- Reports to Head Moderator and Staff Coordinator' },
      { id: 'commands', title: 'Bot Commands (Level 50)', content: '**Moderation:**\n- ?note, ?warn, ?mute, ?kick — Core moderation\n- ?ban, ?unban — Ban and unban (permanents need Head Mod+)\n\n**Channel Management:**\n- ?lock, ?lockstatus — Channel lock control\n\n**Utility:** Basic utility commands — server info' },
      { id: 'escalation', title: 'Escalation', content: '**Receives from:** Junior Moderator\n**Escalates to:** Head Moderator' },
    ]
  },
  {
    id: 'junior-moderator',
    roleName: 'Junior Moderator',
    color: '#34d399',
    tier: 'mod',
    summary: 'Your first step into TSHE\'s moderation team (Level 40). Learn the tools, build experience, and prove yourself before promotion to Moderator.',
    sections: [
      { id: 'system', title: 'System Profile', content: '- **Level:** 40 — Entry-level moderation\n- **Bot Prefixes:** `!` `,` `?` `-` `~` `$` `>`\n- **Tags Prefix:** `!!`\n- **Archive Access:** No (requires Level 50+)' },
      { id: 'responsibilities', title: 'Core Responsibilities', content: '- Monitor chat for rule violations and report issues\n- Issue warnings and timed mutes for clear violations\n- Assist members with questions and direct them to resources\n- Support Moderators with routine tasks\n- Learn moderation tools, procedures, and best practices\n- Build experience with TSHE\'s rules and enforcement standards' },
      { id: 'authority', title: 'Authority Overview', content: '- Basic moderation tools — warnings and timed mutes\n- Access to Junior Moderator staff channels\n- Can report issues to Moderators for further action\n- Cannot issue kicks, bans, or permanent punishments\n- Training and mentorship from Moderators and Head Moderators\n- Evaluated for promotion to Moderator based on performance' },
      { id: 'commands', title: 'Bot Commands (Level 40)', content: '**Moderation:**\n- ?note, ?warn, ?mute — Basic moderation\n\n**Utility:** Basic utility commands — server info\n\n**No access to:** kick, ban, or permanent punishment commands' },
      { id: 'escalation', title: 'Escalation', content: '**Receives from:** Members\n**Escalates to:** Moderator or Head Moderator' },
    ]
  }
]

export const getStaffGuides   = (): StaffRoleGuide[] => read(KEYS.staffGuides, DEFAULT_STAFF_GUIDES)
export const saveStaffGuides  = (v: StaffRoleGuide[]) => write(KEYS.staffGuides, v)
export const resetStaffGuides = ()                    => reset(KEYS.staffGuides)

// Reset ALL data to defaults
export function resetAllData() {
  Object.values(KEYS).forEach(k => reset(k))
  Object.values(PORTAL_KEYS).forEach(k => reset(k))
  reset('tshe_portal_loa')
  reset('tshe_portal_incidents')
  reset('tshe_portal_directory')
}

// ── Staff Portal (persisted to server via /api/store, shared across all staff) ──────

export interface StaffNote {
  id: string
  authorId: string
  authorName: string
  authorAvatar: string | null
  content: string
  pinned: boolean
  createdAt: string
  editedAt: string | null
  category: 'general' | 'incident' | 'announcement' | 'reminder'
}

export interface StaffActivity {
  id: string
  authorId: string
  authorName: string
  action: string
  detail: string
  timestamp: string
}

const PORTAL_KEYS = {
  notes:    'tshe_portal_notes',
  activity: 'tshe_portal_activity',
} as const

export const getPortalNotes = (): StaffNote[] => {
  return read(PORTAL_KEYS.notes, [] as StaffNote[])
}
export const savePortalNotes = (v: StaffNote[]) => {
  write(PORTAL_KEYS.notes, v)
  window.dispatchEvent(new CustomEvent('tshe-portal-update', { detail: { key: 'notes' } }))
}

export const getPortalActivity = (): StaffActivity[] => {
  return read(PORTAL_KEYS.activity, [] as StaffActivity[])
}
export const pushPortalActivity = (entry: Omit<StaffActivity, 'id' | 'timestamp'>) => {
  const existing = getPortalActivity()
  const next = [{ ...entry, id: `act_${Date.now()}`, timestamp: new Date().toISOString() }, ...existing].slice(0, 100)
  write(PORTAL_KEYS.activity, next)
  window.dispatchEvent(new CustomEvent('tshe-portal-update', { detail: { key: 'activity' } }))
}

// ── LOA / Time Off ────────────────────────────────────────────────────────────

export interface LOAEntry {
  id: string
  authorId: string
  authorName: string
  authorAvatar: string | null
  authorRole: string
  authorRoleColor: string
  type: 'loa' | 'partial' | 'returned'
  from: string
  to: string
  reason: string
  coverage: string
  status: 'active' | 'completed' | 'cancelled'
  createdAt: string
  returnedAt: string | null
}

export const getPortalLOA = (): LOAEntry[] => {
  return read('tshe_portal_loa', [] as LOAEntry[])
}
export const savePortalLOA = (v: LOAEntry[]) => {
  write('tshe_portal_loa', v)
  window.dispatchEvent(new CustomEvent('tshe-portal-update', { detail: { key: 'loa' } }))
}

// ── Incident Reports ──────────────────────────────────────────────────────────

export interface IncidentReport {
  id: string
  reportedById: string
  reportedByName: string
  reportedByAvatar: string | null
  title: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: 'member' | 'staff' | 'raid' | 'spam' | 'other'
  description: string
  actionTaken: string
  involvedUsers: string
  status: 'open' | 'resolved' | 'escalated' | 'closed'
  createdAt: string
  updatedAt: string
  resolvedAt: string | null
  notes: { authorId: string; authorName: string; content: string; timestamp: string }[]
}

export const getPortalIncidents = (): IncidentReport[] => {
  return read('tshe_portal_incidents', [] as IncidentReport[])
}
export const savePortalIncidents = (v: IncidentReport[]) => {
  write('tshe_portal_incidents', v)
  window.dispatchEvent(new CustomEvent('tshe-portal-update', { detail: { key: 'incidents' } }))
}

// ── Staff Directory ───────────────────────────────────────────────────────────

export interface StaffDirEntry {
  discordId: string
  displayName: string
  avatar: string | null
  primaryRoleId: string
  timezone: string
  contactNote: string
  specialties: string
  joinedStaff: string
  lastSeen: string
  onLOA: boolean
}

export const getStaffDirectory = (): StaffDirEntry[] => {
  return read('tshe_portal_directory', [] as StaffDirEntry[])
}
export const saveStaffDirectory = (v: StaffDirEntry[]) => {
  write('tshe_portal_directory', v)
  window.dispatchEvent(new CustomEvent('tshe-portal-update', { detail: { key: 'directory' } }))
}
export const upsertDirectoryEntry = (entry: StaffDirEntry) => {
  const existing = getStaffDirectory()
  const idx = existing.findIndex(e => e.discordId === entry.discordId)
  if (idx >= 0) existing[idx] = entry
  else existing.push(entry)
  saveStaffDirectory(existing)
}
