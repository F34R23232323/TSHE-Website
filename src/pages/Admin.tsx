import React, { useState, useEffect, useCallback } from 'react'
import {
  Lock, LogOut, Settings, AlertTriangle, CheckCircle,
  Snowflake, Globe, Bell, Wrench, Save, RotateCcw, X, Plus, Trash2,
  ChevronDown, Shield, Bot, HelpCircle, Clock, Power,
  FileText, Zap, Info, BookOpen, Users, Calendar, Timer,
  Eye, EyeOff,
} from 'lucide-react'
import {
  getSiteConfig, saveSiteConfig, DEFAULT_SITE, type SiteConfig,
  getRules, saveRules,
  getTiers, saveTiers,
  getWarnSteps, saveWarnSteps,
  getDefinitions, saveDefinitions,
  getReport, saveReport,
  getStaffGuides, saveStaffGuides, type StaffRoleGuide, type StaffGuideSection,
  resetAllData,
} from '../data/store'
import type { RuleSection, RuleField, PunishmentTier, WarnStep, Definition } from '../data/content'
import type { ReportStep } from '../data/store'

// ── Maintenance exports (used by App.tsx) ────────────────────────────────────
export function loadSettings() { return getSiteConfig() }

export function MaintenanceScreen() {
  const cfg = getSiteConfig()
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <div style={{ width: 88, height: 88, borderRadius: '1.4rem', margin: '0 auto 2rem', background: 'linear-gradient(135deg,rgba(200,30,50,.15),rgba(201,168,76,.15))', border: '1px solid rgba(200,30,50,.25)', display: 'grid', placeItems: 'center', boxShadow: '0 0 60px rgba(200,30,50,.1)', animation: 'glowPulse 4s ease-in-out infinite' }}>
        <Wrench size={40} color="var(--red2)" strokeWidth={1.5} />
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.25)', borderRadius: 99, padding: '.3rem 1rem', marginBottom: '1.5rem', fontFamily: 'Cinzel, serif', fontSize: '.65rem', letterSpacing: '.12em', color: 'var(--red)', textTransform: 'uppercase' }}>
        <AlertTriangle size={11} /> Under Maintenance
      </div>
      <h1 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, marginBottom: '.75rem', background: 'linear-gradient(135deg,var(--gold2),var(--red2),var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{cfg.serverName}</h1>
      <p style={{ fontSize: '.92rem', color: 'var(--dim)', maxWidth: 520, lineHeight: 1.8, marginBottom: cfg.maintenanceEta ? '1rem' : '2.5rem' }}>{cfg.maintenanceMessage}</p>
      {cfg.maintenanceEta && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'rgba(200,30,50,.06)', border: '1px solid rgba(200,30,50,.15)', borderRadius: '.6rem', padding: '.5rem 1.2rem', marginBottom: '2.5rem', fontSize: '.8rem', color: 'var(--red2)' }}>
          <Timer size={13} /><span style={{ fontFamily: 'Cinzel, serif', letterSpacing: '.05em' }}>ETA: {cfg.maintenanceEta}</span>
        </div>
      )}
      <a href={cfg.discordInvite} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', fontFamily: 'Cinzel, serif', fontSize: '.72rem', letterSpacing: '.08em', fontWeight: 700, padding: '.6rem 1.5rem', borderRadius: '.6rem', background: 'rgba(200,30,50,.1)', border: '1px solid rgba(200,30,50,.25)', color: 'var(--red2)', textDecoration: 'none' }}>
        Join our Discord for updates
      </a>
      <p style={{ marginTop: '3rem', fontSize: '.7rem', color: 'var(--muted)', fontFamily: 'Cinzel, serif' }}>
        Staff? <a href="/admin" style={{ color: 'var(--red2)', textDecoration: 'underline' }}>Admin Panel</a>
      </p>
    </div>
  )
}

// ── Discord OAuth ──────────────────────────────────────────────────────────────
interface DiscordUser { id: string; username: string; avatar: string | null }

async function fetchMe(): Promise<DiscordUser | null> {
  try {
    const res = await fetch('/auth/me', { credentials: 'include' })
    if (!res.ok) return null
    const data = await res.json()
    return data.authenticated ? data.user : null
  } catch { return null }
}

async function doLogout(): Promise<void> {
  await fetch('/auth/logout', { method: 'POST', credentials: 'include' })
}

function avatarUrl(user: DiscordUser): string {
  if (!user.avatar) return 'https://cdn.discordapp.com/embed/avatars/0.png'
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=64`
}

// ── Error screen ──────────────────────────────────────────────────────────────
function ErrorScreen({ reason }: { reason: string }) {
  const messages: Record<string, { title: string; body: string }> = {
    access_denied:  { title: 'Access Denied',  body: 'Your Discord account does not have the required role (Co-Owner or above) to access the admin panel.' },
    oauth_denied:   { title: 'Cancelled',      body: 'You cancelled the Discord authorisation. Click below to try again.' },
    invalid_state:  { title: 'Session Error',  body: 'The OAuth state expired. Please try again.' },
    token_exchange: { title: 'Auth Error',     body: 'Failed to exchange the Discord token. Please try again.' },
    server_error:   { title: 'Server Error',   body: 'An unexpected error occurred. Please try again or contact the Owner.' },
  }
  const { title, body } = messages[reason] ?? { title: 'Error', body: 'Something went wrong.' }
  const isAccessDenied = reason === 'access_denied'
  const color  = isAccessDenied ? 'var(--red)' : 'var(--gold)'
  const border = isAccessDenied ? 'rgba(248,113,113,.25)' : 'rgba(201,168,76,.25)'
  const bg     = isAccessDenied ? 'rgba(248,113,113,.1)'  : 'rgba(201,168,76,.1)'
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ width: '100%', maxWidth: 400, background: 'var(--bg1)', border: `1px solid ${border}`, borderRadius: '1.2rem', padding: '2.25rem', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '.9rem', margin: '0 auto 1rem', background: bg, border: `1px solid ${border}`, display: 'grid', placeItems: 'center' }}>
          <Shield size={24} color={color} strokeWidth={1.5} />
        </div>
        <h1 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: '1rem', fontWeight: 700, marginBottom: '.5rem', color }}>{title}</h1>
        <p style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{body}</p>
        <div style={{ display: 'flex', gap: '.6rem', justifyContent: 'center' }}>
          {!isAccessDenied && <a href="/auth/discord" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontFamily: 'Cinzel, serif', fontSize: '.7rem', letterSpacing: '.08em', padding: '.5rem 1.1rem', borderRadius: '.5rem', background: 'rgba(88,101,242,.15)', border: '1px solid rgba(88,101,242,.35)', color: '#7289da', textDecoration: 'none' }}>Try Again</a>}
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontFamily: 'Cinzel, serif', fontSize: '.7rem', letterSpacing: '.08em', padding: '.5rem 1.1rem', borderRadius: '.5rem', background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--dim)', textDecoration: 'none' }}>← Back to site</a>
        </div>
      </div>
    </div>
  )
}

// ── Login ─────────────────────────────────────────────────────────────────────
function Login() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ width: '100%', maxWidth: 380, background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '1rem', margin: '0 auto 1.25rem', background: 'linear-gradient(135deg,rgba(88,101,242,.2),rgba(200,30,50,.1))', border: '1px solid rgba(88,101,242,.3)', display: 'grid', placeItems: 'center' }}>
          <Lock size={28} color="#7289da" strokeWidth={1.5} />
        </div>
        <h1 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '.35rem' }}>Admin Panel</h1>
        <p style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.6 }}>The SnowHaven Empire<br/>Co-Owner &amp; Above Only</p>
        <a href="/auth/discord" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.75rem', padding: '.85rem 1.5rem', borderRadius: '.75rem', textDecoration: 'none', background: 'linear-gradient(135deg,rgba(88,101,242,.3),rgba(88,101,242,.15))', border: '1px solid rgba(88,101,242,.45)', color: '#c5cbff', fontFamily: 'Cinzel, serif', fontSize: '.8rem', letterSpacing: '.08em', fontWeight: 700, transition: 'all .2s' }}>
          <svg width="20" height="15" viewBox="0 0 71 55" fill="#7289da"><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.44077 45.4204 0.52529C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.52529C25.5141 0.44359 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/></svg>
          Sign in with Discord
        </a>
        <p style={{ marginTop: '1.5rem', fontSize: '.68rem', color: 'var(--muted)', lineHeight: 1.65 }}>Only Co-Owner and above can access this panel.<br/>Your roles are verified via the TSHE Discord.</p>
      </div>
    </div>
  )
}

// ── Shared UI primitives ───────────────────────────────────────────────────────

const css = {
  input: {
    width: '100%', padding: '.6rem .9rem',
    background: '#0d1428', border: '1px solid rgba(200,30,50,.12)',
    borderRadius: '.55rem', color: 'var(--text)',
    fontFamily: 'Raleway, sans-serif', fontSize: '.83rem', outline: 'none',
    transition: 'border-color .15s, box-shadow .15s',
  } as React.CSSProperties,
  ta: {
    width: '100%', padding: '.6rem .9rem',
    background: '#0d1428', border: '1px solid rgba(200,30,50,.12)',
    borderRadius: '.55rem', color: 'var(--text)',
    fontFamily: 'Raleway, sans-serif', fontSize: '.83rem', outline: 'none',
    resize: 'vertical' as const, minHeight: 78, lineHeight: 1.7,
    transition: 'border-color .15s',
  } as React.CSSProperties,
}
const onFocus = (e: React.FocusEvent<any>) => { e.target.style.borderColor = 'rgba(200,30,50,.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,30,50,.06)' }
const onBlur  = (e: React.FocusEvent<any>) => { e.target.style.borderColor = 'rgba(200,30,50,.12)'; e.target.style.boxShadow = 'none' }

function F({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.12em', color: 'rgba(200,30,50,.6)', marginBottom: '.4rem', textTransform: 'uppercase', fontWeight: 600 }}>{label}</label>
      {children}
      {hint && <p style={{ fontSize: '.7rem', color: 'var(--muted)', marginTop: '.3rem', lineHeight: 1.55 }}>{hint}</p>}
    </div>
  )
}

function Toggle({ checked, onChange, label, desc, danger }: { checked: boolean; onChange: (v: boolean) => void; label: string; desc?: string; danger?: boolean }) {
  return (
    <div onClick={() => onChange(!checked)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '.85rem 1rem', background: checked && danger ? 'rgba(248,113,113,.05)' : 'rgba(255,255,255,.02)', border: `1px solid ${checked && danger ? 'rgba(248,113,113,.2)' : 'rgba(255,255,255,.05)'}`, borderRadius: '.65rem', marginBottom: '.65rem', cursor: 'pointer', transition: 'all .15s' }}>
      <div>
        <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.76rem', letterSpacing: '.04em', color: checked && danger ? 'var(--red)' : 'var(--text)', marginBottom: desc ? '.2rem' : 0 }}>{label}</p>
        {desc && <p style={{ fontSize: '.71rem', color: 'var(--muted)', lineHeight: 1.5 }}>{desc}</p>}
      </div>
      <div style={{ width: 44, height: 24, borderRadius: 99, background: checked ? (danger ? 'var(--red)' : 'var(--red2)') : 'rgba(255,255,255,.08)', transition: 'background .2s', flexShrink: 0, position: 'relative' }}>
        <span style={{ position: 'absolute', top: 3, left: checked ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: checked ? '#fff' : 'rgba(255,255,255,.3)', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.3)' }} />
      </div>
    </div>
  )
}

function Btn({ onClick, variant = 'secondary', children, small }: { onClick: () => void; variant?: 'primary'|'secondary'|'danger'|'ghost'; children: React.ReactNode; small?: boolean }) {
  const v = {
    primary:   { background: 'rgba(200,30,50,.15)', border: '1px solid rgba(200,30,50,.3)',  color: 'var(--red2)' },
    secondary: { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', color: 'var(--dim)' },
    danger:    { background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.25)', color: 'var(--red)' },
    ghost:     { background: 'none',                  border: '1px solid transparent',           color: 'var(--muted)' },
  }[variant]
  return (
    <button onClick={onClick} style={{ ...v, fontFamily: 'Cinzel, serif', fontSize: small ? '.63rem' : '.7rem', letterSpacing: '.07em', padding: small ? '.28rem .65rem' : '.45rem .95rem', borderRadius: '.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '.35rem', transition: 'all .15s', whiteSpace: 'nowrap' }}>
      {children}
    </button>
  )
}

function Section({ title, icon: Icon, color = 'var(--red2)', children, action }: { title: string; icon: any; color?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: '.5rem', background: `${color}18`, border: `1px solid ${color}30`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Icon size={15} color={color} />
          </div>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '.82rem', letterSpacing: '.05em', color: 'var(--text)' }}>{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
type Tab = 'overview' | 'maintenance' | 'site' | 'rules' | 'punishments' | 'warns' | 'definitions' | 'staffguide'

function Dashboard({ user, onLogout }: { user: DiscordUser; onLogout: () => void }) {
  const [tab, setTab]         = useState<Tab>('overview')
  const [toastMsg, setToast]  = useState('')
  const [toastType, setToastType] = useState<'success'|'error'>('success')
  const [unsaved, setUnsaved] = useState(false)

  const [site, setSite]         = useState<SiteConfig>(getSiteConfig)
  const [rules, setRules]       = useState(getRules)
  const [tiers, setTiers]       = useState(getTiers)
  const [warns, setWarns]       = useState(getWarnSteps)
  const [defs, setDefs]         = useState(getDefinitions)
  const [report, setReport]     = useState(getReport)
  const [staffGuides, setStaffGuides] = useState(getStaffGuides)

  // Track unsaved changes
  const wrap = <T,>(setter: React.Dispatch<React.SetStateAction<T>>) =>
    (v: T | ((prev: T) => T)) => { setter(v as any); setUnsaved(true) }

  const flash = (msg: string, type: 'success'|'error' = 'success') => {
    setToast(msg); setToastType(type)
    setTimeout(() => setToast(''), 3000)
  }

  const saveAll = () => {
    saveSiteConfig(site); saveRules(rules); saveTiers(tiers)
    saveWarnSteps(warns); saveDefinitions(defs)
    saveReport(report)
    saveStaffGuides(staffGuides)
    setUnsaved(false)
    flash('All changes saved!')
  }

  const quickToggleMaintenance = () => {
    const updated = { ...site, maintenanceMode: !site.maintenanceMode }
    setSite(updated); saveSiteConfig(updated)
    flash(updated.maintenanceMode ? 'Maintenance enabled' : 'Site is live again')
  }

  const hardReset = () => {
    if (!window.confirm('Reset ALL site data to factory defaults? This cannot be undone.')) return
    resetAllData()
    setSite(getSiteConfig()); setRules(getRules()); setTiers(getTiers())
    setWarns(getWarnSteps()); setDefs(getDefinitions())
    setReport(getReport()); setStaffGuides(getStaffGuides())
    setUnsaved(false); flash('Reset to defaults!')
  }

  const NAV: { id: Tab; label: string; icon: any; divider?: boolean }[] = [
    { id: 'overview',    label: 'Overview',     icon: Globe },
    { id: 'maintenance', label: 'Maintenance',  icon: Wrench, divider: true },
    { id: 'site',        label: 'Site Info',    icon: Settings },
    { id: 'rules',       label: 'Rules',        icon: BookOpen },
    { id: 'punishments', label: 'Punishments',  icon: Shield },
    { id: 'warns',       label: 'Warnings',     icon: AlertTriangle },
    { id: 'definitions', label: 'Definitions',  icon: FileText },
    { id: 'staffguide',  label: 'Staff Guide',  icon: Users },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1, background: '#060c1a' }}>

      {/* Sidebar */}
      <aside style={{ width: 210, flexShrink: 0, borderRight: '1px solid rgba(200,30,50,.07)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        {/* Brand */}
        <div style={{ padding: '1.25rem 1rem 1rem', borderBottom: '1px solid rgba(200,30,50,.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.9rem' }}>
            <div style={{ width: 30, height: 30, borderRadius: '.45rem', background: 'rgba(200,30,50,.12)', border: '1px solid rgba(200,30,50,.2)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Settings size={14} color="var(--red2)" />
            </div>
            <div>
              <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.73rem', letterSpacing: '.05em', color: 'var(--text)', lineHeight: 1 }}>Admin Panel</p>
              <p style={{ fontSize: '.6rem', color: 'var(--muted)', marginTop: '.15rem' }}>TSHE</p>
            </div>
          </div>
          {/* Discord user */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.55rem', background: 'rgba(88,101,242,.07)', border: '1px solid rgba(88,101,242,.15)', borderRadius: '.55rem', padding: '.5rem .65rem' }}>
            <img src={avatarUrl(user)} alt="" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.65rem', color: '#c5cbff', letterSpacing: '.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.username}</p>
              <p style={{ fontSize: '.58rem', color: 'rgba(197,203,255,.45)', marginTop: '.1rem' }}>Co-Owner+</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '.75rem .6rem' }}>
          {NAV.map(n => {
            const Icon = n.icon; const active = tab === n.id
            return (
              <React.Fragment key={n.id}>
                {n.divider && <div style={{ height: '1px', background: 'rgba(200,30,50,.06)', margin: '.5rem .4rem' }} />}
                <button onClick={() => setTab(n.id)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '.55rem',
                  fontFamily: 'Cinzel, serif', fontSize: '.68rem', letterSpacing: '.05em',
                  padding: '.55rem .75rem', borderRadius: '.55rem', cursor: 'pointer', border: 'none',
                  background: active ? 'rgba(200,30,50,.1)' : 'transparent',
                  color: active ? 'var(--red2)' : 'var(--muted)',
                  marginBottom: '.15rem', transition: 'all .15s', textAlign: 'left',
                }}>
                  <Icon size={13} style={{ flexShrink: 0, opacity: active ? 1 : .55 }} />
                  {n.label}
                  {n.id === 'maintenance' && site.maintenanceMode && (
                    <span style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: 'var(--red)', flexShrink: 0, boxShadow: '0 0 6px rgba(248,113,113,.6)' }} />
                  )}
                </button>
              </React.Fragment>
            )
          })}
        </nav>

        {/* Sidebar footer */}
        <div style={{ padding: '.75rem .6rem', borderTop: '1px solid rgba(200,30,50,.07)' }}>
          <a href="/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontFamily: 'Cinzel, serif', fontSize: '.63rem', letterSpacing: '.05em', padding: '.45rem .75rem', borderRadius: '.45rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '.2rem', transition: 'color .15s' }}>
            <Eye size={12} style={{ opacity: .5 }} /> View Site
          </a>
          <button onClick={onLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '.5rem', fontFamily: 'Cinzel, serif', fontSize: '.63rem', letterSpacing: '.05em', padding: '.45rem .75rem', borderRadius: '.45rem', cursor: 'pointer', border: 'none', background: 'none', color: 'var(--muted)', textAlign: 'left', transition: 'color .15s' }}>
            <LogOut size={12} style={{ opacity: .5 }} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Top bar */}
        <header style={{ height: 56, borderBottom: '1px solid rgba(200,30,50,.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.75rem', background: 'rgba(6,12,26,.8)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem' }}>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.78rem', letterSpacing: '.06em', color: 'var(--text)' }}>
              {NAV.find(n => n.id === tab)?.label ?? 'Admin'}
            </p>
            {unsaved && (
              <span style={{ fontSize: '.62rem', fontFamily: 'Cinzel, serif', color: 'var(--gold)', background: 'rgba(201,168,76,.1)', border: '1px solid rgba(201,168,76,.2)', padding: '1px 7px', borderRadius: 99, letterSpacing: '.06em' }}>
                Unsaved
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem' }}>
            {site.maintenanceMode && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.2)', borderRadius: '.4rem', padding: '.25rem .7rem', fontSize: '.62rem', color: 'var(--red)', fontFamily: 'Cinzel, serif' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', display: 'inline-block', animation: 'glowPulse 1.5s ease-in-out infinite' }} />
                MAINTENANCE ON
              </div>
            )}
            {/* Quick maintenance toggle button */}
            <button onClick={quickToggleMaintenance} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontFamily: 'Cinzel, serif', fontSize: '.63rem', letterSpacing: '.06em', padding: '.3rem .8rem', borderRadius: '.45rem', cursor: 'pointer', border: `1px solid ${site.maintenanceMode ? 'rgba(74,222,128,.25)' : 'rgba(248,113,113,.25)'}`, background: site.maintenanceMode ? 'rgba(74,222,128,.06)' : 'rgba(248,113,113,.06)', color: site.maintenanceMode ? 'var(--green)' : 'var(--red)', transition: 'all .15s' }}>
              <Power size={11} />
              {site.maintenanceMode ? 'Disable Maintenance' : 'Enable Maintenance'}
            </button>
            <button onClick={saveAll} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontFamily: 'Cinzel, serif', fontSize: '.68rem', letterSpacing: '.07em', padding: '.38rem 1rem', borderRadius: '.5rem', cursor: 'pointer', background: 'rgba(200,30,50,.15)', border: '1px solid rgba(200,30,50,.3)', color: 'var(--red2)', transition: 'all .15s' }}>
              <Save size={13} /> Save All
            </button>
          </div>
        </header>

        {/* Toast */}
        {toastMsg && (
          <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999, display: 'flex', alignItems: 'center', gap: '.6rem', background: toastType === 'success' ? 'rgba(74,222,128,.12)' : 'rgba(248,113,113,.12)', border: `1px solid ${toastType === 'success' ? 'rgba(74,222,128,.3)' : 'rgba(248,113,113,.3)'}`, borderRadius: '.75rem', padding: '.75rem 1.1rem', boxShadow: '0 8px 32px rgba(0,0,0,.4)', animation: 'slideInRight .25s ease', backdropFilter: 'blur(12px)' }}>
            {toastType === 'success' ? <CheckCircle size={15} color="var(--green)" /> : <AlertTriangle size={15} color="var(--red)" />}
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '.72rem', letterSpacing: '.05em', color: toastType === 'success' ? 'var(--green)' : 'var(--red)' }}>{toastMsg}</span>
          </div>
        )}

        {/* Content */}
        <main style={{ flex: 1, padding: '2rem 1.75rem 6rem', overflowY: 'auto' }}>
          {tab === 'overview'    && <OverviewTab    site={site} setSite={setSite} onWrap={wrap} flash={flash} quickToggle={quickToggleMaintenance} goTo={setTab} />}
          {tab === 'maintenance' && <MaintenanceTab site={site} setSite={(s) => { setSite(s); setUnsaved(true) }} flash={flash} />}
          {tab === 'site'        && <SiteTab        site={site} setSite={(s) => { setSite(s); setUnsaved(true) }} />}
          {tab === 'rules'       && <RulesTab       rules={rules}     setRules={wrap(setRules)} />}
          {tab === 'punishments' && <PunishmentsTab tiers={tiers}     setTiers={wrap(setTiers)} report={report} setReport={wrap(setReport)} />}
          {tab === 'warns'       && <WarnsTab       warns={warns}     setWarns={wrap(setWarns)} />}
          {tab === 'definitions' && <DefsTab        defs={defs}       setDefs={wrap(setDefs)} />}
          {tab === 'staffguide'  && <StaffGuideTab  staffGuides={staffGuides} setStaffGuides={wrap(setStaffGuides)} />}
        </main>

        {/* Danger zone at bottom of sidebar */}
        <style>{`
          @keyframes slideInRight { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:translateX(0); } }
          @keyframes fadeInDown   { from { opacity:0; transform:translateY(-6px);} to { opacity:1; transform:translateY(0); } }
          select option { background: #0d1428; }
        `}</style>
      </div>
    </div>
  )
}

// ── OVERVIEW TAB ──────────────────────────────────────────────────────────────
function OverviewTab({ site, setSite, onWrap, flash, quickToggle, goTo }: any) {
  const stats = [
    { label: 'Rules', value: getRules().reduce((a, s) => a + s.fields.length, 0), icon: BookOpen, color: 'var(--red2)' },
    { label: 'Warn steps', value: getWarnSteps().length, icon: AlertTriangle, color: 'var(--red)' },
    { label: 'Staff guides', value: getStaffGuides().length, icon: Users, color: '#f472b6' },
  ]

  return (
    <>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', marginBottom: '.35rem' }}>Overview</h2>
      <p style={{ fontSize: '.78rem', color: 'var(--muted)', marginBottom: '1.75rem' }}>Welcome back, {site.serverName} admin.</p>

      {/* Maintenance status card */}
      <div style={{ background: site.maintenanceMode ? 'rgba(248,113,113,.06)' : 'rgba(74,222,128,.04)', border: `1px solid ${site.maintenanceMode ? 'rgba(248,113,113,.25)' : 'rgba(74,222,128,.2)'}`, borderRadius: '1rem', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.85rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: '.75rem', background: site.maintenanceMode ? 'rgba(248,113,113,.15)' : 'rgba(74,222,128,.12)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            {site.maintenanceMode ? <Wrench size={22} color="var(--red)" /> : <CheckCircle size={22} color="var(--green)" />}
          </div>
          <div>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.88rem', fontWeight: 700, color: site.maintenanceMode ? 'var(--red)' : 'var(--green)', marginBottom: '.2rem' }}>
              {site.maintenanceMode ? 'Site Under Maintenance' : 'Site is Live'}
            </p>
            <p style={{ fontSize: '.74rem', color: 'var(--muted)' }}>
              {site.maintenanceMode
                ? site.maintenanceEta ? `ETA: ${site.maintenanceEta}` : 'No ETA set'
                : 'All pages are accessible to visitors'}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '.65rem', flexWrap: 'wrap' }}>
          <button onClick={quickToggle} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontFamily: 'Cinzel, serif', fontSize: '.68rem', letterSpacing: '.07em', padding: '.45rem 1rem', borderRadius: '.5rem', cursor: 'pointer', border: `1px solid ${site.maintenanceMode ? 'rgba(74,222,128,.3)' : 'rgba(248,113,113,.3)'}`, background: site.maintenanceMode ? 'rgba(74,222,128,.08)' : 'rgba(248,113,113,.08)', color: site.maintenanceMode ? 'var(--green)' : 'var(--red)' }}>
            <Power size={12} />{site.maintenanceMode ? 'Disable' : 'Enable Maintenance'}
          </button>
          <button onClick={() => goTo('maintenance')} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontFamily: 'Cinzel, serif', fontSize: '.68rem', letterSpacing: '.07em', padding: '.45rem 1rem', borderRadius: '.5rem', cursor: 'pointer', border: '1px solid rgba(200,30,50,.2)', background: 'rgba(200,30,50,.07)', color: 'var(--red2)' }}>
            <Settings size={12} /> Configure
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '.75rem', marginBottom: '1.75rem' }}>
        {stats.map(s => (
          <button key={s.label} onClick={() => goTo(s.label === 'Rules' ? 'rules' : s.label === 'Warn steps' ? 'warns' : 'staffguide')} style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.05)', borderRadius: '.85rem', padding: '1rem 1.1rem', textAlign: 'left', cursor: 'pointer', transition: 'all .15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.04)'; e.currentTarget.style.borderColor = `${s.color}40` }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)' }}
          >
            <s.icon size={18} color={s.color} style={{ marginBottom: '.6rem', opacity: .8 }} />
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: '.68rem', color: 'var(--muted)', marginTop: '.3rem', fontFamily: 'Cinzel, serif', letterSpacing: '.05em' }}>{s.label}</p>
          </button>
        ))}
      </div>

      {/* Quick links */}
      <Section title="Quick Actions" icon={Zap}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '.6rem' }}>
          {[
            { label: 'Edit Server Info',     tab: 'site',        icon: Settings,      color: 'var(--red2)' },
            { label: 'Manage Rules',         tab: 'rules',       icon: BookOpen,      color: 'var(--red2)' },
            { label: 'Edit Punishments',     tab: 'punishments', icon: Shield,        color: 'var(--gold)' },
            { label: 'Staff Guide Editor',   tab: 'staffguide',  icon: Users,         color: '#f472b6' },
          ].map(q => (
            <button key={q.tab} onClick={() => goTo(q.tab as Tab)} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', padding: '.65rem .85rem', borderRadius: '.6rem', cursor: 'pointer', border: '1px solid rgba(255,255,255,.05)', background: 'rgba(255,255,255,.02)', color: 'var(--dim)', fontFamily: 'Cinzel, serif', fontSize: '.7rem', letterSpacing: '.04em', textAlign: 'left', transition: 'all .15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = `${q.color}10`; e.currentTarget.style.borderColor = `${q.color}30`; e.currentTarget.style.color = q.color }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)'; e.currentTarget.style.color = 'var(--dim)' }}
            >
              <q.icon size={14} style={{ flexShrink: 0 }} /> {q.label}
            </button>
          ))}
        </div>
      </Section>
    </>
  )
}

// ── MAINTENANCE TAB ───────────────────────────────────────────────────────────
function MaintenanceTab({ site, setSite, flash }: { site: SiteConfig; setSite: (s: SiteConfig) => void; flash: (msg: string, t?: 'success'|'error') => void }) {
  const u = (patch: Partial<SiteConfig>) => setSite({ ...site, ...patch })

  // Auto-disable: check the scheduled time and update countdown
  const [countdown, setCountdown] = useState('')
  useEffect(() => {
    if (!site.maintenanceAutoDisable || !site.maintenanceAutoDisableAt) { setCountdown(''); return }
    const tick = () => {
      const diff = new Date(site.maintenanceAutoDisableAt).getTime() - Date.now()
      if (diff <= 0) {
        setCountdown('Disabling now…')
        // Auto-disable
        const updated = { ...site, maintenanceMode: false, maintenanceAutoDisable: false }
        setSite(updated); saveSiteConfig(updated)
        flash('Maintenance auto-disabled on schedule')
        return
      }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(`${h}h ${m}m ${s}s remaining`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [site.maintenanceAutoDisable, site.maintenanceAutoDisableAt])

  // Preset ETA helpers
  const presets = [
    { label: '30 min',  ms: 30 * 60000 },
    { label: '1 hour',  ms: 60 * 60000 },
    { label: '2 hours', ms: 2 * 60 * 60000 },
    { label: '4 hours', ms: 4 * 60 * 60000 },
    { label: '1 day',   ms: 24 * 60 * 60000 },
  ]

  const applyPreset = (ms: number) => {
    const dt = new Date(Date.now() + ms)
    u({ maintenanceAutoDisableAt: dt.toISOString().slice(0, 16) })
  }

  return (
    <>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', marginBottom: '1.75rem' }}>Maintenance Mode</h2>

      {/* Big status card */}
      <div style={{ background: site.maintenanceMode ? 'rgba(248,113,113,.05)' : 'rgba(74,222,128,.03)', border: `1px solid ${site.maintenanceMode ? 'rgba(248,113,113,.25)' : 'rgba(74,222,128,.18)'}`, borderRadius: '1.1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ width: 52, height: 52, borderRadius: '.85rem', background: site.maintenanceMode ? 'rgba(248,113,113,.12)' : 'rgba(74,222,128,.1)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            {site.maintenanceMode ? <Wrench size={26} color="var(--red)" /> : <CheckCircle size={26} color="var(--green)" />}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.95rem', fontWeight: 700, color: site.maintenanceMode ? 'var(--red)' : 'var(--green)', marginBottom: '.25rem' }}>
              {site.maintenanceMode ? 'Maintenance is ACTIVE' : 'Site is Live'}
            </p>
            <p style={{ fontSize: '.76rem', color: 'var(--muted)', lineHeight: 1.5 }}>
              {site.maintenanceMode
                ? 'All visitors see the maintenance page. /admin remains accessible.'
                : 'All pages are fully accessible to visitors.'}
            </p>
          </div>
          <button onClick={() => { const updated = { ...site, maintenanceMode: !site.maintenanceMode }; setSite(updated); saveSiteConfig(updated); flash(updated.maintenanceMode ? 'Maintenance enabled' : 'Site is live again') }} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontFamily: 'Cinzel, serif', fontSize: '.72rem', letterSpacing: '.07em', padding: '.55rem 1.25rem', borderRadius: '.6rem', cursor: 'pointer', border: `1px solid ${site.maintenanceMode ? 'rgba(74,222,128,.3)' : 'rgba(248,113,113,.3)'}`, background: site.maintenanceMode ? 'rgba(74,222,128,.1)' : 'rgba(248,113,113,.1)', color: site.maintenanceMode ? 'var(--green)' : 'var(--red)', flexShrink: 0 }}>
            <Power size={14} />{site.maintenanceMode ? 'Disable Now' : 'Enable Now'}
          </button>
        </div>

        {site.maintenanceMode && site.maintenanceAutoDisable && countdown && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', background: 'rgba(200,30,50,.06)', border: '1px solid rgba(200,30,50,.15)', borderRadius: '.55rem', padding: '.55rem .9rem' }}>
            <Timer size={13} color="var(--red2)" />
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '.7rem', color: 'var(--red2)', letterSpacing: '.05em' }}>Auto-disabling in {countdown}</span>
          </div>
        )}
      </div>

      {/* Schedule auto-disable */}
      <Section title="Schedule Auto-Disable" icon={Calendar} color="var(--red2)">
        <Toggle
          checked={site.maintenanceAutoDisable}
          onChange={v => u({ maintenanceAutoDisable: v })}
          label="Auto-disable maintenance at a scheduled time"
          desc="When the time arrives, maintenance mode turns off automatically."
        />
        {site.maintenanceAutoDisable && (
          <>
            <F label="Auto-disable at" hint="Pick a date and time. Maintenance will automatically turn off at this moment.">
              <input
                type="datetime-local"
                value={site.maintenanceAutoDisableAt}
                onChange={e => u({ maintenanceAutoDisableAt: e.target.value })}
                style={css.input} onFocus={onFocus} onBlur={onBlur}
              />
            </F>
            <div style={{ marginTop: '.65rem' }}>
              <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.1em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '.5rem' }}>Quick presets from now</p>
              <div style={{ display: 'flex', gap: '.45rem', flexWrap: 'wrap' }}>
                {presets.map(p => (
                  <button key={p.label} onClick={() => applyPreset(p.ms)} style={{ fontFamily: 'Cinzel, serif', fontSize: '.63rem', letterSpacing: '.06em', padding: '.3rem .75rem', borderRadius: '.4rem', cursor: 'pointer', background: 'rgba(200,30,50,.06)', border: '1px solid rgba(200,30,50,.18)', color: 'var(--red2)', transition: 'all .15s' }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </Section>

      {/* Message and ETA */}
      <Section title="Maintenance Page Content" icon={FileText} color="var(--muted)">
        <F label="Message shown to visitors">
          <textarea value={site.maintenanceMessage} onChange={e => u({ maintenanceMessage: e.target.value })} style={css.ta} onFocus={onFocus} onBlur={onBlur} />
        </F>
        <F label="ETA display text" hint="Shown as 'ETA: …' on the maintenance page. Leave blank to hide. This is free text — e.g. 'Tonight at 10 PM UTC' or '~2 hours'.">
          <input value={site.maintenanceEta} onChange={e => u({ maintenanceEta: e.target.value })} style={css.input} placeholder="e.g. Tonight at 10 PM UTC" onFocus={onFocus} onBlur={onBlur} />
        </F>
        {/* Live preview */}
        <div style={{ marginTop: '.75rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.1em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '.65rem' }}>Preview</p>
          <div style={{ background: 'rgba(6,12,26,.8)', border: '1px solid rgba(200,30,50,.1)', borderRadius: '.85rem', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.2)', borderRadius: 99, padding: '.25rem .75rem', marginBottom: '.85rem', fontFamily: 'Cinzel, serif', fontSize: '.6rem', letterSpacing: '.1em', color: 'var(--red)', textTransform: 'uppercase' }}>
              <AlertTriangle size={9} /> Under Maintenance
            </div>
            <p style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: '1.1rem', fontWeight: 700, background: 'linear-gradient(135deg,var(--gold2),var(--red2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '.6rem' }}>{site.serverName}</p>
            <p style={{ fontSize: '.75rem', color: 'var(--dim)', maxWidth: 380, margin: '0 auto', lineHeight: 1.7 }}>{site.maintenanceMessage}</p>
            {site.maintenanceEta && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', background: 'rgba(200,30,50,.06)', border: '1px solid rgba(200,30,50,.15)', borderRadius: '.5rem', padding: '.4rem .9rem', marginTop: '.85rem', fontSize: '.72rem', color: 'var(--red2)', fontFamily: 'Cinzel, serif' }}>
                <Timer size={11} /> ETA: {site.maintenanceEta}
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}

// ── SITE TAB ──────────────────────────────────────────────────────────────────
function SiteTab({ site, setSite }: { site: SiteConfig; setSite: (s: SiteConfig) => void }) {
  const u = (patch: Partial<SiteConfig>) => setSite({ ...site, ...patch })
  return (
    <>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', marginBottom: '1.75rem' }}>Site Information</h2>
      <Section title="Server Details" icon={Settings}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <F label="Server Name"><input value={site.serverName} onChange={e => u({ serverName: e.target.value })} style={css.input} onFocus={onFocus} onBlur={onBlur} /></F>
          <F label="Copyright Year"><input value={site.copyrightYear} onChange={e => u({ copyrightYear: e.target.value })} style={css.input} onFocus={onFocus} onBlur={onBlur} /></F>
        </div>
        <F label="Server Tagline"><input value={site.serverTagline} onChange={e => u({ serverTagline: e.target.value })} style={css.input} onFocus={onFocus} onBlur={onBlur} /></F>
        <F label="Footer Note"><input value={site.footerNote} onChange={e => u({ footerNote: e.target.value })} style={css.input} onFocus={onFocus} onBlur={onBlur} /></F>
      </Section>
      <Section title="Links" icon={Globe}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <F label="Discord Invite URL"><input value={site.discordInvite} onChange={e => u({ discordInvite: e.target.value })} style={css.input} onFocus={onFocus} onBlur={onBlur} /></F>
          <F label="Ban Appeal URL"><input value={site.appealUrl} onChange={e => u({ appealUrl: e.target.value })} style={css.input} onFocus={onFocus} onBlur={onBlur} /></F>
        </div>
      </Section>
      <Section title="Discord / Social Embed" icon={Globe} color="rgba(88,101,242,.8)">
        <F label="Embed Title"><input value={site.embedTitle} onChange={e => u({ embedTitle: e.target.value })} style={css.input} onFocus={onFocus} onBlur={onBlur} /></F>
        <F label="Embed Description"><textarea value={site.embedDescription} onChange={e => u({ embedDescription: e.target.value })} style={css.ta} onFocus={onFocus} onBlur={onBlur} /></F>
        <div style={{ background: '#1e1f22', borderRadius: '.65rem', padding: '1rem', border: '1px solid #3a3c41', borderLeft: '4px solid var(--red2)', maxWidth: 440 }}>
          <p style={{ fontSize: '.65rem', color: '#989aa2', marginBottom: '.3rem', fontFamily: 'sans-serif' }}>tshe.noxxbot.com</p>
          <p style={{ fontSize: '.86rem', color: '#00b0f4', fontWeight: 700, fontFamily: 'sans-serif', marginBottom: '.25rem' }}>{site.embedTitle}</p>
          <p style={{ fontSize: '.76rem', color: '#dbdee1', fontFamily: 'sans-serif', lineHeight: 1.5 }}>{site.embedDescription}</p>
        </div>
      </Section>
      <Section title="Announcement Banner" icon={Bell} color="var(--gold)">
        <Toggle checked={site.announcementEnabled} onChange={v => u({ announcementEnabled: v })} label="Show Announcement Banner" desc="Displays a dismissible bar above the navbar." />
        <F label="Banner Text"><input value={site.announcementBanner} onChange={e => u({ announcementBanner: e.target.value })} style={css.input} onFocus={onFocus} onBlur={onBlur} placeholder="e.g. New rule update — please re-read the Rules page!" /></F>
        {site.announcementEnabled && site.announcementBanner && (
          <div style={{ background: 'rgba(200,30,50,.08)', border: '1px solid rgba(200,30,50,.2)', borderRadius: '.45rem', padding: '.5rem .9rem', display: 'flex', alignItems: 'center', gap: '.5rem', marginTop: '.25rem' }}>
            <Bell size={12} color="var(--red2)" /><p style={{ fontSize: '.78rem', color: 'var(--gold2)', flex: 1 }}>{site.announcementBanner}</p><X size={13} color="var(--dim)" />
          </div>
        )}
      </Section>
    </>
  )
}

// ── RULES TAB ─────────────────────────────────────────────────────────────────
function RulesTab({ rules, setRules }: { rules: RuleSection[]; setRules: (r: RuleSection[]) => void }) {
  const [openSec, setOpenSec]     = useState<string | null>(null)
  const [openField, setOpenField] = useState<string | null>(null)
  const uSec   = (i: number, p: Partial<RuleSection>) => { const n=[...rules]; n[i]={...n[i],...p}; setRules(n) }
  const uField = (si: number, fi: number, p: Partial<RuleField>) => { const n=[...rules]; n[si]={...n[si],fields:n[si].fields.map((f,i)=>i===fi?{...f,...p}:f)}; setRules(n) }
  const delField = (si: number, fi: number) => { const n=[...rules]; n[si]={...n[si],fields:n[si].fields.filter((_,i)=>i!==fi)}; setRules(n) }
  const addField = (si: number) => { const n=[...rules]; n[si]={...n[si],fields:[...n[si].fields,{name:'New Rule',value:'Description here.'}]}; setRules(n) }
  const delSec   = (si: number) => { if(window.confirm('Delete this section?')) setRules(rules.filter((_,i)=>i!==si)) }
  const addSec   = () => setRules([...rules,{id:`s_${Date.now()}`,title:'New Section',icon:'BookOpen',color:'ice',fields:[]}])
  return (
    <>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.75rem' }}>
        <h2 style={{ fontFamily:'Cinzel, serif',fontSize:'1rem' }}>Community Rules</h2>
        <Btn onClick={addSec} variant="primary" small><Plus size={12}/> Add Section</Btn>
      </div>
      {rules.map((sec,si) => (
        <div key={sec.id} style={{ background:'rgba(255,255,255,.02)',border:'1px solid rgba(255,255,255,.06)',borderRadius:'.9rem',marginBottom:'.7rem',overflow:'hidden' }}>
          <div onClick={()=>setOpenSec(openSec===sec.id?null:sec.id)} style={{ display:'flex',alignItems:'center',gap:'.65rem',padding:'.9rem 1rem',cursor:'pointer',background:openSec===sec.id?'rgba(255,255,255,.03)':'transparent' }}>
            <ChevronDown size={13} color="var(--muted)" style={{ transform:openSec===sec.id?'rotate(180deg)':'none',transition:'transform .2s',flexShrink:0 }} />
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:'Cinzel, serif',fontSize:'.8rem',color:'var(--text)' }}>{sec.title}</p>
              <p style={{ fontSize:'.67rem',color:'var(--muted)',marginTop:'.1rem' }}>{sec.fields.length} rules</p>
            </div>
            <div onClick={e=>e.stopPropagation()}><Btn onClick={()=>delSec(si)} variant="danger" small><Trash2 size={11}/></Btn></div>
          </div>
          {openSec===sec.id && (
            <div style={{ padding:'1rem',borderTop:'1px solid rgba(255,255,255,.05)' }}>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'.75rem' }}>
                <F label="Title"><input value={sec.title} onChange={e=>uSec(si,{title:e.target.value})} style={css.input} onFocus={onFocus} onBlur={onBlur}/></F>
                <F label="Color"><select value={sec.color} onChange={e=>uSec(si,{color:e.target.value as any})} style={css.input}>
                  {['ice','gold','red','green','purple'].map(c=><option key={c} value={c}>{c}</option>)}
                </select></F>
              </div>
              {sec.fields.map((f,fi) => (
                <div key={fi} style={{ background:'rgba(255,255,255,.02)',border:'1px solid rgba(255,255,255,.04)',borderRadius:'.6rem',marginBottom:'.5rem',overflow:'hidden' }}>
                  <div onClick={()=>setOpenField(openField===`${si}-${fi}`?null:`${si}-${fi}`)} style={{ display:'flex',alignItems:'center',gap:'.5rem',padding:'.6rem .85rem',cursor:'pointer' }}>
                    <ChevronDown size={11} color="var(--muted)" style={{ transform:openField===`${si}-${fi}`?'rotate(180deg)':'none',transition:'transform .2s',flexShrink:0 }} />
                    <p style={{ flex:1,fontFamily:'Cinzel, serif',fontSize:'.73rem',color:'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{f.name}</p>
                    <div onClick={e=>e.stopPropagation()}><Btn onClick={()=>delField(si,fi)} variant="danger" small><Trash2 size={10}/></Btn></div>
                  </div>
                  {openField===`${si}-${fi}` && (
                    <div style={{ padding:'.85rem',borderTop:'1px solid rgba(255,255,255,.04)' }}>
                      <F label="Rule Name"><input value={f.name} onChange={e=>uField(si,fi,{name:e.target.value})} style={css.input} onFocus={onFocus} onBlur={onBlur}/></F>
                      <F label="Description" hint="Supports **bold** markdown."><textarea value={f.value} onChange={e=>uField(si,fi,{value:e.target.value})} style={{...css.ta,minHeight:90}} onFocus={onFocus} onBlur={onBlur}/></F>
                    </div>
                  )}
                </div>
              ))}
              <Btn onClick={()=>addField(si)} variant="ghost" small><Plus size={11}/> Add Rule</Btn>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

// ── PUNISHMENTS TAB ───────────────────────────────────────────────────────────
function PunishmentsTab({ tiers, setTiers, report, setReport }: { tiers: PunishmentTier[]; setTiers: any; report: ReportStep[]; setReport: any }) {
  const uT = (i: number, p: Partial<PunishmentTier>) => { const n=[...tiers]; n[i]={...n[i],...p}; setTiers(n) }
  const uR = (i: number, p: Partial<ReportStep>)     => { const n=[...report]; n[i]={...n[i],...p}; setReport(n) }
  return (
    <>
      <h2 style={{ fontFamily:'Cinzel, serif',fontSize:'1rem',marginBottom:'1.75rem' }}>Punishments & Report Guide</h2>
      <Section title="Punishment Tiers" icon={Shield} color="var(--gold)">
        {tiers.map((t,i) => (
          <div key={t.level} style={{ background:`${t.color}08`,border:`1px solid ${t.color}20`,borderLeft:`3px solid ${t.color}`,borderRadius:'.65rem',padding:'.9rem',marginBottom:'.65rem' }}>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.85rem',marginBottom:'.65rem' }}>
              <F label="Label"><input value={t.label} onChange={e=>uT(i,{label:e.target.value})} style={css.input} onFocus={onFocus} onBlur={onBlur}/></F>
              <F label="Duration"><input value={t.duration} onChange={e=>uT(i,{duration:e.target.value})} style={css.input} onFocus={onFocus} onBlur={onBlur}/></F>
            </div>
            <F label="Description"><input value={t.description} onChange={e=>uT(i,{description:e.target.value})} style={css.input} onFocus={onFocus} onBlur={onBlur}/></F>
            <div style={{ display:'flex',alignItems:'center',gap:'.65rem',marginTop:'.25rem' }}>
              <input type="color" value={t.color} onChange={e=>uT(i,{color:e.target.value})} style={{ width:34,height:28,padding:'.1rem',background:'var(--bg3)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'.35rem',cursor:'pointer' }} />
              <span style={{ fontSize:'.68rem',color:'var(--muted)' }}>Tier colour</span>
            </div>
          </div>
        ))}
      </Section>
      <Section title="Report Guide Steps" icon={FileText}>
        {report.map((s,i) => (
          <div key={s.step} style={{ background:'rgba(255,255,255,.02)',border:'1px solid rgba(255,255,255,.04)',borderRadius:'.6rem',padding:'.9rem',marginBottom:'.65rem' }}>
            <F label={`Step ${s.step} — Title`}><input value={s.title} onChange={e=>uR(i,{title:e.target.value})} style={css.input} onFocus={onFocus} onBlur={onBlur}/></F>
            <F label="Description"><textarea value={s.desc} onChange={e=>uR(i,{desc:e.target.value})} style={css.ta} onFocus={onFocus} onBlur={onBlur}/></F>
          </div>
        ))}
      </Section>
    </>
  )
}

// ── WARNS TAB ─────────────────────────────────────────────────────────────────
function WarnsTab({ warns, setWarns }: { warns: WarnStep[]; setWarns: any }) {
  const u   = (i: number, p: Partial<WarnStep>) => { const n=[...warns]; n[i]={...n[i],...p}; setWarns(n) }
  const add = () => setWarns([...warns,{warns:warns.length+1,consequence:'New Consequence',appealable:false}])
  const del = (i: number) => setWarns(warns.filter((_,j)=>j!==i).map((w,j)=>({...w,warns:j+1})))
  return (
    <>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.75rem' }}>
        <h2 style={{ fontFamily:'Cinzel, serif',fontSize:'1rem' }}>Warning Escalation</h2>
        <Btn onClick={add} variant="primary" small><Plus size={12}/> Add Step</Btn>
      </div>
      <Section title="Warning Steps" icon={AlertTriangle} color="var(--red)">
        {warns.map((w,i) => {
          const pct=(i+1)/warns.length; const hue=Math.round(120-pct*120); const color=`hsl(${hue},65%,60%)`
          return (
            <div key={i} style={{ display:'grid',gridTemplateColumns:'38px 1fr auto auto',gap:'.65rem',alignItems:'center',background:`${color}08`,border:`1px solid ${color}20`,borderLeft:`3px solid ${color}`,borderRadius:'.55rem',padding:'.65rem .85rem',marginBottom:'.5rem' }}>
              <div style={{ width:34,height:34,borderRadius:'.4rem',background:`${color}20`,border:`1px solid ${color}40`,display:'grid',placeItems:'center',fontFamily:'Cinzel, serif',fontSize:'.72rem',fontWeight:800,color }}>{w.warns}</div>
              <input value={w.consequence} onChange={e=>u(i,{consequence:e.target.value})} style={{...css.input}} onFocus={onFocus} onBlur={onBlur}/>
              <label style={{ display:'flex',alignItems:'center',gap:'.35rem',fontSize:'.68rem',color:'var(--dim)',cursor:'pointer',whiteSpace:'nowrap' }}>
                <input type="checkbox" checked={w.appealable} onChange={e=>u(i,{appealable:e.target.checked})} style={{ accentColor:'var(--red2)',width:14,height:14 }}/> Appealable
              </label>
              <Btn onClick={()=>del(i)} variant="danger" small><Trash2 size={11}/></Btn>
            </div>
          )
        })}
      </Section>
    </>
  )
}

// ── DEFINITIONS TAB ───────────────────────────────────────────────────────────
function DefsTab({ defs, setDefs }: { defs: Definition[]; setDefs: any }) {
  const u   = (i: number, p: Partial<Definition>) => { const n=[...defs]; n[i]={...n[i],...p}; setDefs(n) }
  const del = (i: number) => setDefs(defs.filter((_,j)=>j!==i))
  const add = () => setDefs([...defs,{term:'New Term',meaning:'Meaning here.',tier:'Tier 2 — Mute'}])
  return (
    <>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.75rem' }}>
        <h2 style={{ fontFamily:'Cinzel, serif',fontSize:'1rem' }}>Key Definitions</h2>
        <Btn onClick={add} variant="primary" small><Plus size={12}/> Add</Btn>
      </div>
      <Section title="Definitions" icon={FileText}>
        {defs.map((d,i) => (
          <div key={i} style={{ background:'rgba(255,255,255,.02)',border:'1px solid rgba(255,255,255,.04)',borderRadius:'.6rem',padding:'.9rem',marginBottom:'.65rem' }}>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr auto',gap:'.85rem',marginBottom:'.65rem',alignItems:'end' }}>
              <F label="Term"><input value={d.term} onChange={e=>u(i,{term:e.target.value})} style={css.input} onFocus={onFocus} onBlur={onBlur}/></F>
              <F label="Tier"><input value={d.tier} onChange={e=>u(i,{tier:e.target.value})} style={css.input} placeholder="e.g. Tier 2 — Mute" onFocus={onFocus} onBlur={onBlur}/></F>
              <Btn onClick={()=>del(i)} variant="danger" small><Trash2 size={12}/></Btn>
            </div>
            <F label="Meaning"><textarea value={d.meaning} onChange={e=>u(i,{meaning:e.target.value})} style={css.ta} onFocus={onFocus} onBlur={onBlur}/></F>
          </div>
        ))}
      </Section>
    </>
  )
}

// ── STAFF GUIDE TAB ───────────────────────────────────────────────────────────
function StaffGuideTab({ staffGuides, setStaffGuides }: { staffGuides: StaffRoleGuide[]; setStaffGuides: any }) {
  const [openRole, setOpenRole]       = useState<string | null>(null)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const uRole = (i: number, p: Partial<StaffRoleGuide>) => { const n=[...staffGuides]; n[i]={...n[i],...p}; setStaffGuides(n) }
  const uSec  = (ri: number, si: number, p: Partial<StaffGuideSection>) => { const n=[...staffGuides]; n[ri]={...n[ri],sections:n[ri].sections.map((s,i)=>i===si?{...s,...p}:s)}; setStaffGuides(n) }
  const delSec  = (ri: number, si: number) => { const n=[...staffGuides]; n[ri]={...n[ri],sections:n[ri].sections.filter((_,i)=>i!==si)}; setStaffGuides(n) }
  const addSec  = (ri: number) => { const n=[...staffGuides]; n[ri]={...n[ri],sections:[...n[ri].sections,{id:`s_${Date.now()}`,title:'New Section',content:'Content here.'}]}; setStaffGuides(n) }
  const addRole = () => setStaffGuides([...staffGuides,{id:`r_${Date.now()}`,roleName:'New Role',color:'var(--red2)',tier:'mod',summary:'Role summary.',sections:[]}])
  const delRole = (i: number) => { if(window.confirm('Delete this role guide?')) setStaffGuides(staffGuides.filter((_,j)=>j!==i)) }
  return (
    <>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.75rem' }}>
        <h2 style={{ fontFamily:'Cinzel, serif',fontSize:'1rem' }}>Staff Guide</h2>
        <Btn onClick={addRole} variant="primary" small><Plus size={12}/> Add Role</Btn>
      </div>
      {staffGuides.map((role,ri) => (
        <div key={role.id} style={{ background:'rgba(255,255,255,.02)',border:`1px solid ${role.color}20`,borderLeft:`3px solid ${role.color}`,borderRadius:'.9rem',marginBottom:'.7rem',overflow:'hidden' }}>
          <div onClick={()=>setOpenRole(openRole===role.id?null:role.id)} style={{ display:'flex',alignItems:'center',gap:'.65rem',padding:'.9rem 1rem',cursor:'pointer' }}>
            <ChevronDown size={13} color="var(--muted)" style={{ transform:openRole===role.id?'rotate(180deg)':'none',transition:'transform .2s',flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:'Cinzel, serif',fontSize:'.8rem',color:role.color }}>{role.roleName}</p>
              <p style={{ fontSize:'.67rem',color:'var(--muted)',marginTop:'.1rem' }}>{role.sections.length} sections · {role.tier}</p>
            </div>
            <div onClick={e=>e.stopPropagation()}><Btn onClick={()=>delRole(ri)} variant="danger" small><Trash2 size={11}/></Btn></div>
          </div>
          {openRole===role.id && (
            <div style={{ padding:'1rem',borderTop:'1px solid rgba(255,255,255,.05)' }}>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr auto',gap:'.85rem',marginBottom:'1rem',alignItems:'end' }}>
                <F label="Role Name"><input value={role.roleName} onChange={e=>uRole(ri,{roleName:e.target.value})} style={css.input} onFocus={onFocus} onBlur={onBlur}/></F>
                <F label="Tier"><select value={role.tier} onChange={e=>uRole(ri,{tier:e.target.value as StaffRoleGuide['tier']})} style={css.input}>
                  <option value="policy">All Staff (Policy)</option>
                  <option value="leadership">Leadership</option>
                  <option value="admin">Administration</option>
                  <option value="mod">Moderation</option>
                </select></F>
                <F label="Colour">
                  <div style={{ display:'flex',gap:'.4rem' }}>
                    <input type="color" value={role.color} onChange={e=>uRole(ri,{color:e.target.value})} style={{ width:38,height:34,padding:'.1rem',background:'#0d1428',border:'1px solid rgba(255,255,255,.1)',borderRadius:'.4rem',cursor:'pointer' }}/>
                    <input value={role.color} onChange={e=>uRole(ri,{color:e.target.value})} style={{...css.input,width:90}} onFocus={onFocus} onBlur={onBlur}/>
                  </div>
                </F>
              </div>
              <F label="Summary" hint="One-line description shown on the role card.">
                <textarea value={role.summary} onChange={e=>uRole(ri,{summary:e.target.value})} style={{...css.ta,minHeight:60}} onFocus={onFocus} onBlur={onBlur}/>
              </F>
              <p style={{ fontFamily:'Cinzel, serif',fontSize:'.62rem',letterSpacing:'.1em',color:'var(--muted)',textTransform:'uppercase',marginTop:'.5rem',marginBottom:'.6rem' }}>Guide Sections</p>
              {role.sections.map((sec,si) => (
                <div key={sec.id} style={{ background:'rgba(255,255,255,.02)',border:'1px solid rgba(255,255,255,.04)',borderRadius:'.6rem',marginBottom:'.5rem',overflow:'hidden' }}>
                  <div onClick={()=>setOpenSection(openSection===`${ri}-${si}`?null:`${ri}-${si}`)} style={{ display:'flex',alignItems:'center',gap:'.5rem',padding:'.6rem .85rem',cursor:'pointer' }}>
                    <ChevronDown size={11} color="var(--muted)" style={{ transform:openSection===`${ri}-${si}`?'rotate(180deg)':'none',transition:'transform .2s',flexShrink:0 }}/>
                    <p style={{ flex:1,fontFamily:'Cinzel, serif',fontSize:'.72rem',color:'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{sec.title}</p>
                    <div onClick={e=>e.stopPropagation()}><Btn onClick={()=>delSec(ri,si)} variant="danger" small><Trash2 size={10}/></Btn></div>
                  </div>
                  {openSection===`${ri}-${si}` && (
                    <div style={{ padding:'.85rem',borderTop:'1px solid rgba(255,255,255,.04)' }}>
                      <F label="Section Title"><input value={sec.title} onChange={e=>uSec(ri,si,{title:e.target.value})} style={css.input} onFocus={onFocus} onBlur={onBlur}/></F>
                      <F label="Content" hint="Use - or * for bullets. **double stars** for bold.">
                        <textarea value={sec.content} onChange={e=>uSec(ri,si,{content:e.target.value})} style={{...css.ta,minHeight:140,fontFamily:'monospace',fontSize:'.78rem'}} onFocus={onFocus} onBlur={onBlur}/>
                      </F>
                    </div>
                  )}
                </div>
              ))}
              <Btn onClick={()=>addSec(ri)} variant="ghost" small><Plus size={11}/> Add Section</Btn>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function Admin() {
  const [user, setUser]       = useState<DiscordUser | null>(null)
  const [loading, setLoading] = useState(true)
  const params = new URLSearchParams(window.location.search)
  const error  = params.get('error')

  useEffect(() => {
    fetchMe().then(u => { setUser(u); setLoading(false) })
  }, [])

  if (error) return <ErrorScreen reason={error} />

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <Snowflake size={32} color="var(--red2)" style={{ animation: 'loaderSpin 2s linear infinite' }} />
        <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.7rem', letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>Verifying…</p>
      </div>
    </div>
  )

  if (!user) return <Login />

  const handleLogout = async () => {
    await doLogout()
    setUser(null)
    window.location.href = '/'
  }

  return <Dashboard user={user} onLogout={handleLogout} />
}
