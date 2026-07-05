import React, { useState, useEffect, useRef } from 'react'
import {
  Shield, Crown, Zap, Flame, Moon, Eye, Settings, Swords, Landmark, Users,
  BookOpen, ChevronDown, LogOut, Pin, PinOff, Trash2, MessageSquare, Bell,
  AlertTriangle, Clock, Activity, Plus, Edit3, Check, X, Search, FileText,
  Lock, ExternalLink, Calendar, Plane, UserCheck, AlertOctagon, Pencil,
  BookMarked, Info,
} from 'lucide-react'
import {
  getStaffGuides, type StaffRoleGuide,
  getPortalNotes, savePortalNotes, getPortalActivity, pushPortalActivity,
  type StaffNote, type StaffActivity,
  getPortalLOA, savePortalLOA, type LOAEntry,
  getPortalIncidents, savePortalIncidents, type IncidentReport,
  getStaffDirectory, saveStaffDirectory, upsertDirectoryEntry, type StaffDirEntry,
} from '../data/store'

// ── Role metadata ─────────────────────────────────────────────────────────────

interface RoleMeta { id: string; name: string; color: string; tier: string }

const ROLE_MAP: Record<string, RoleMeta> = {
  '1479852874635939880': { id: '1479852874635939880', name: 'Co-Founder & Lead Dev', color: '#f59e0b', tier: 'owner'      },
  '1479912951694495845': { id: '1479912951694495845', name: 'Co-Founder',            color: '#f59e0b', tier: 'owner'      },
  '1511038769321611447': { id: '1511038769321611447', name: 'Head Administrator',    color: '#ed4245', tier: 'admin'      },
  '1511038881032568923': { id: '1511038881032568923', name: 'Senior Administrator',  color: '#f57c00', tier: 'admin'      },
  '1511039635059511326': { id: '1511039635059511326', name: 'Administrator',         color: '#f87171', tier: 'admin'      },
  '1511040098379104288': { id: '1511040098379104288', name: 'Junior Administrator',  color: '#f57c00', tier: 'admin'      },
  '1511040831782391898': { id: '1511040831782391898', name: 'Operations Manager',    color: '#5865f2', tier: 'management' },
  '1511041492477673472': { id: '1511041492477673472', name: 'Community Manager',     color: '#5865f2', tier: 'management' },
  '1511042054334058686': { id: '1511042054334058686', name: 'Staff Coordinator',     color: '#5865f2', tier: 'management' },
  '1511042708846936096': { id: '1511042708846936096', name: 'Head Moderator',        color: '#60a5fa', tier: 'mod'        },
  '1511043938327199924': { id: '1511043938327199924', name: 'Moderator',             color: '#34d399', tier: 'mod'        },
  '1511044452855185561': { id: '1511044452855185561', name: 'Junior Moderator',      color: '#34d399', tier: 'mod'        },
}

const ROLE_ORDER = [
  '1479852874635939880','1479912951694495845',
  '1511038769321611447','1511038881032568923','1511039635059511326','1511040098379104288',
  '1511040831782391898','1511041492477673472','1511042054334058686',
  '1511042708846936096','1511043938327199924','1511044452855185561',
]

const iconMap: Record<string, React.ElementType> = {
  'staff-policies': BookOpen, 'foundership': Crown, 'co-founder': Users,
  'owner': Zap, 'co-owner': Crown, 'head-executive': Swords,
  'executive': Landmark, 'head-admin': Settings, 'administrator': Flame,
  'head-mod': Moon, 'moderator': Eye,
}

const tierColors: Record<string, string> = {
  policy: 'var(--red2)', leadership: '#f59e0b', admin: '#f472b6', mod: '#34d399',
}
const tierLabels: Record<string, string> = {
  policy: 'All Staff', leadership: 'Leadership', admin: 'Administration', mod: 'Moderation',
}

const noteCategoryMeta = {
  general:      { label: 'General',      color: 'var(--red2)', icon: MessageSquare },
  incident:     { label: 'Incident',     color: '#f87171', icon: AlertTriangle  },
  announcement: { label: 'Announcement', color: '#f59e0b', icon: Bell           },
  reminder:     { label: 'Reminder',     color: '#34d399', icon: Clock          },
} as const
type NoteCategory = keyof typeof noteCategoryMeta

const severityMeta = {
  low:      { label: 'Low',      color: '#34d399', icon: Info          },
  medium:   { label: 'Medium',   color: '#f59e0b', icon: AlertTriangle },
  high:     { label: 'High',     color: '#f87171', icon: AlertOctagon  },
  critical: { label: 'Critical', color: '#ef4444', icon: AlertOctagon  },
} as const

const incidentStatusMeta = {
  open:      { label: 'Open',      color: '#f59e0b' },
  resolved:  { label: 'Resolved',  color: '#34d399' },
  escalated: { label: 'Escalated', color: '#f87171' },
  closed:    { label: 'Closed',    color: '#6b7280' },
} as const

const incidentCategoryMeta = {
  member: { label: 'Member',        color: 'var(--red2)' },
  staff:  { label: 'Staff Conduct', color: '#a78bfa' },
  raid:   { label: 'Raid/Attack',   color: '#ef4444' },
  spam:   { label: 'Spam',          color: '#f59e0b' },
  other:  { label: 'Other',         color: '#6b7280' },
} as const

// ── Helpers ───────────────────────────────────────────────────────────────────

function hexAlpha(hex: string, a: number) {
  try {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
    return `rgba(${r},${g},${b},${a})`
  } catch { return `rgba(200,30,50,${a})` }
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  if (diff < 60000)    return 'just now'
  if (diff < 3600000)  return `${Math.floor(diff/60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff/3600000)}h ago`
  return `${Math.floor(diff/86400000)}d ago`
}

function fmtDate(iso: string): string {
  if (!iso) return '—'
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }
  catch { return iso }
}

function daysBetween(from: string, to: string): number {
  return Math.max(0, Math.ceil((new Date(to).getTime() - new Date(from).getTime()) / 86400000))
}

function isLOAActive(loa: LOAEntry): boolean {
  if (loa.status !== 'active') return false
  const now = new Date()
  return new Date(loa.from) <= now && new Date(loa.to) >= now
}

function avatarUrl(id: string, avatar: string | null): string {
  if (!avatar) return 'https://cdn.discordapp.com/embed/avatars/0.png'
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=64`
}

function getHighestRole(roles: string[]): RoleMeta | null {
  for (const id of ROLE_ORDER) if (roles.includes(id) && ROLE_MAP[id]) return ROLE_MAP[id]
  return null
}

function parseContent(text: string) {
  return text.split('\n').map((line, i) => {
    const isBullet = line.startsWith('- ') || line.startsWith('* ')
    const clean = line.replace(/^[-*]\s/, '')
    const parts = clean.split(/\*\*(.+?)\*\*/g)
    const rendered = parts.map((p, j) =>
      j % 2 === 1 ? <strong key={j} style={{ color: 'var(--text)', fontWeight: 700 }}>{p}</strong> : <span key={j}>{p}</span>
    )
    return (
      <p key={i} style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.75, marginBottom: '.3rem', paddingLeft: isBullet ? '1rem' : 0, position: 'relative' }}>
        {isBullet && <span style={{ position: 'absolute', left: 0, color: 'var(--muted)' }}>•</span>}
        {rendered}
      </p>
    )
  })
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function Badge({ label, color, size = 'sm' }: { label: string; color: string; size?: 'xs' | 'sm' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: size === 'xs' ? '.58rem' : '.63rem', fontFamily: 'Cinzel, serif', letterSpacing: '.05em', padding: '2px 8px', borderRadius: '.25rem', background: hexAlpha(color, .12), border: `1px solid ${hexAlpha(color, .3)}`, color, whiteSpace: 'nowrap' }}>
      {label}
    </span>
  )
}

function FieldInput({ label, value, onChange, placeholder, type = 'text', rows }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; rows?: number }) {
  const base: React.CSSProperties = { width: '100%', background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.45rem', padding: '.5rem .7rem', color: 'var(--text)', fontSize: '.78rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }
  return (
    <div style={{ marginBottom: '.65rem' }}>
      <label style={{ display: 'block', fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.07em', color: 'var(--muted)', marginBottom: '.3rem', textTransform: 'uppercase' }}>{label}</label>
      {rows ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ ...base, resize: 'vertical', lineHeight: 1.6 }} /> : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={base} />}
    </div>
  )
}

function FieldSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div style={{ marginBottom: '.65rem' }}>
      <label style={{ display: 'block', fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.07em', color: 'var(--muted)', marginBottom: '.3rem', textTransform: 'uppercase' }}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.45rem', padding: '.5rem .7rem', color: 'var(--text)', fontSize: '.78rem', fontFamily: 'inherit', outline: 'none' }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, display: 'grid', placeItems: 'center', padding: '1rem' }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 560, background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '.9rem', fontWeight: 700, color: 'var(--text)' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }}><X size={16} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ActionBtn({ onClick, icon: Icon, label, color = 'var(--muted)', danger }: { onClick: () => void; icon: React.ElementType; label: string; color?: string; danger?: boolean }) {
  return (
    <button onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.65rem', fontFamily: 'Cinzel, serif', color: danger ? 'var(--red)' : color, background: 'transparent', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '.3rem' }}>
      <Icon size={11} /> {label}
    </button>
  )
}

// ── Auth gate ─────────────────────────────────────────────────────────────────

interface StaffUser { id: string; username: string; avatar: string | null }

function LoginGate() {
  const err = new URLSearchParams(window.location.search).get('error')
  const msgs: Record<string, string> = {
    access_denied: 'Your Discord account does not have a staff role on TSHE.',
    oauth_denied: 'You cancelled the Discord authorisation.',
    token_exchange: 'Failed to exchange Discord token. Please try again.',
    invalid_state: 'Invalid authorisation state. Please try again.',
    user_fetch: 'Could not fetch your Discord profile. Please try again.',
  }
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 420, width: '100%', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '1rem', background: 'rgba(248,113,113,.1)', border: '1px solid rgba(248,113,113,.25)', display: 'grid', placeItems: 'center', margin: '0 auto 1.5rem' }}>
          <Lock size={28} color="var(--red)" strokeWidth={1.5} />
        </div>
        <h1 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '.5rem', background: 'linear-gradient(135deg,var(--gold2),var(--red2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Staff Portal</h1>
        <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginBottom: '1.75rem', lineHeight: 1.65 }}>This area is restricted to TSHE staff members.<br />Sign in with your Discord account to continue.</p>
        {err && <div style={{ background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.2)', borderRadius: '.65rem', padding: '.75rem 1rem', marginBottom: '1.25rem', fontSize: '.78rem', color: 'var(--red)', lineHeight: 1.6 }}>{msgs[err] ?? 'An unexpected error occurred.'}</div>}
        <a href="/auth/staff" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.75rem', padding: '.85rem 1.5rem', borderRadius: '.75rem', textDecoration: 'none', background: 'linear-gradient(135deg,rgba(88,101,242,.3),rgba(88,101,242,.15))', border: '1px solid rgba(88,101,242,.45)', color: '#c5cbff', fontFamily: 'Cinzel, serif', fontSize: '.8rem', letterSpacing: '.08em', fontWeight: 700 }}>
          <svg width="18" height="18" viewBox="0 0 71 55" fill="#c5cbff"><path d="M60.1 4.9A58.5 58.5 0 0 0 45.5.5a40.5 40.5 0 0 0-1.7 3.6 54.1 54.1 0 0 0-16.6 0A38.8 38.8 0 0 0 25.4.5 58.4 58.4 0 0 0 10.8 4.9C1.6 18.7-1 32.2.3 45.5a59 59 0 0 0 18 9.3 44.8 44.8 0 0 0 3.9-6.4 38.4 38.4 0 0 1-6.1-3 32 32 0 0 0 1.5-1.2 41.8 41.8 0 0 0 36.5 0l1.5 1.2a38.5 38.5 0 0 1-6.2 3 44.5 44.5 0 0 0 3.9 6.4A58.8 58.8 0 0 0 71.3 45.5C72.8 30 68.7 16.6 60.1 4.9ZM23.7 37.3c-3.6 0-6.5-3.3-6.5-7.4s2.9-7.4 6.5-7.4 6.6 3.3 6.5 7.4c0 4.1-2.9 7.4-6.5 7.4Zm24.1 0c-3.6 0-6.5-3.3-6.5-7.4s2.9-7.4 6.5-7.4 6.5 3.3 6.5 7.4c0 4.1-2.9 7.4-6.5 7.4Z" /></svg>
          Sign in with Discord
        </a>
        <p style={{ marginTop: '1.25rem', fontSize: '.68rem', color: 'var(--muted)', lineHeight: 1.65 }}>All staff ranks (Moderator and above) can access this portal.<br />Roles verified live against the TSHE Discord server.</p>
      </div>
    </div>
  )
}

// ── Guide panel ───────────────────────────────────────────────────────────────

function SectionAccordion({ section, color, defaultOpen = false }: { section: { id: string; title: string; content: string }; color: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '.65rem', overflow: 'hidden', marginBottom: '.5rem' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.75rem', padding: '.85rem 1.1rem', background: open ? 'var(--bg3)' : 'var(--bg2)', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: '.76rem', fontWeight: 600, color: open ? color : 'var(--text)', letterSpacing: '.04em' }}>{section.title}</span>
        <ChevronDown size={13} color="var(--muted)" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
      </button>
      {open && <div style={{ padding: '1rem 1.1rem', background: 'var(--bg1)', borderTop: '1px solid var(--border)' }}>{parseContent(section.content)}</div>}
    </div>
  )
}

function GuidePanel() {
  const guides = getStaffGuides()
  const byTier: Record<string, StaffRoleGuide[]> = { policy: [], leadership: [], admin: [], mod: [] }
  guides.forEach(g => { if (byTier[g.tier as string]) byTier[g.tier as string].push(g); else byTier.mod.push(g) })
  const [activeId, setActiveId] = useState(guides[0]?.id ?? '')
  const [search, setSearch] = useState('')
  const active = guides.find(g => g.id === activeId) ?? guides[0]
  const ActiveIcon = active ? (iconMap[active.id] ?? Shield) : Shield
  const filteredSections = active?.sections.filter(s => !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.content.toLowerCase().includes(search.toLowerCase())) ?? []

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.25rem', alignItems: 'start' }} className="portal-guide-grid">
        <div className="portal-guide-sidebar" style={{ position: 'sticky', top: 80 }}>
          {(['policy','leadership','admin','mod'] as const).map(tier => {
            const group = byTier[tier]
            if (!group?.length) return null
            return (
              <div key={tier} style={{ marginBottom: '1.1rem' }}>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: tierColors[tier], marginBottom: '.4rem', paddingLeft: '.2rem' }}>{tierLabels[tier]}</p>
                {group.map(g => {
                  const Icon = iconMap[g.id] ?? Shield
                  const isActive = activeId === g.id
                  return (
                    <button key={g.id} onClick={() => { setActiveId(g.id); setSearch('') }} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '.7rem', padding: '.65rem .85rem', borderRadius: '.6rem', cursor: 'pointer', background: isActive ? hexAlpha(g.color,.1) : 'transparent', border: `1px solid ${isActive ? hexAlpha(g.color,.3) : 'transparent'}`, transition: 'all .15s', marginBottom: '.2rem' }}>
                      <div style={{ width: 30, height: 30, borderRadius: '.4rem', flexShrink: 0, background: hexAlpha(g.color,.15), border: `1px solid ${hexAlpha(g.color,.25)}`, display: 'grid', placeItems: 'center' }}><Icon size={14} color={g.color} strokeWidth={1.75} /></div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.72rem', fontWeight: 700, color: isActive ? g.color : 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.roleName}</p>
                        <p style={{ fontSize: '.62rem', color: 'var(--muted)', marginTop: '.1rem' }}>{tierLabels[g.tier]}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
        {active && (
          <div>
            <div style={{ background: 'var(--bg1)', border: `1px solid ${hexAlpha(active.color,.25)}`, borderRadius: '.9rem', padding: '1.5rem', marginBottom: '1rem', backgroundImage: `linear-gradient(135deg,${hexAlpha(active.color,.07)} 0%,transparent 55%)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.9rem', marginBottom: '.85rem' }}>
                <div style={{ width: 46, height: 46, borderRadius: '.7rem', flexShrink: 0, background: hexAlpha(active.color,.15), border: `1px solid ${hexAlpha(active.color,.35)}`, display: 'grid', placeItems: 'center' }}><ActiveIcon size={22} color={active.color} strokeWidth={1.5} /></div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.25rem' }}>
                    <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', fontWeight: 700, color: active.color }}>{active.roleName}</h2>
                    <Badge label={tierLabels[active.tier]} color={active.color} />
                  </div>
                  <p style={{ fontSize: '.76rem', color: 'var(--muted)', lineHeight: 1.6 }}>{active.summary}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '.5rem', padding: '.4rem .7rem' }}>
                <Search size={13} color="var(--muted)" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sections…" style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '.76rem', color: 'var(--text)', fontFamily: 'inherit' }} />
                {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }}><X size={12} /></button>}
              </div>
            </div>
            {filteredSections.length === 0 && <p style={{ fontSize: '.8rem', color: 'var(--muted)', textAlign: 'center', padding: '2rem 0' }}>No sections match your search.</p>}
            {filteredSections.map((sec, i) => <SectionAccordion key={sec.id} section={sec} color={active.color} defaultOpen={i === 0 && !search} />)}
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 680px) {
          .portal-guide-grid { grid-template-columns: 1fr !important; }
          .portal-guide-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  )
}

// ── Notes panel ───────────────────────────────────────────────────────────────

function NoteComposer({ user, editNote, onSave, onCancel }: { user: StaffUser; editNote: StaffNote | null; onSave: (content: string, category: NoteCategory) => void; onCancel: () => void }) {
  const [content, setContent] = useState(editNote?.content ?? '')
  const [category, setCategory] = useState<NoteCategory>(editNote?.category ?? 'general')
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => { ref.current?.focus() }, [])
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid rgba(200,30,50,.2)', borderRadius: '.8rem', padding: '1rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '.75rem' }}>
        {(Object.entries(noteCategoryMeta) as [NoteCategory, typeof noteCategoryMeta[NoteCategory]][]).map(([key, m]) => {
          const CatIcon = m.icon
          return <button key={key} onClick={() => setCategory(key)} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.65rem', fontFamily: 'Cinzel, serif', padding: '4px 10px', borderRadius: '.35rem', cursor: 'pointer', background: category === key ? hexAlpha(m.color,.15) : 'transparent', border: `1px solid ${category === key ? hexAlpha(m.color,.4) : 'var(--border)'}`, color: category === key ? m.color : 'var(--muted)' }}><CatIcon size={10} /> {m.label}</button>
        })}
      </div>
      <textarea ref={ref} value={content} onChange={e => setContent(e.target.value)} placeholder="Write your note…" rows={4} style={{ width: '100%', background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.5rem', padding: '.65rem .8rem', color: 'var(--text)', fontSize: '.8rem', fontFamily: 'inherit', lineHeight: 1.65, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
      <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end', marginTop: '.6rem' }}>
        <button onClick={onCancel} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', fontFamily: 'Cinzel, serif', padding: '.4rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)' }}><X size={12} /> Cancel</button>
        <button onClick={() => content.trim() && onSave(content.trim(), category)} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', fontFamily: 'Cinzel, serif', padding: '.4rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'rgba(200,30,50,.15)', border: '1px solid rgba(200,30,50,.3)', color: 'var(--red2)' }}><Check size={12} /> {editNote ? 'Save' : 'Post'}</button>
      </div>
    </div>
  )
}

function NotesPanel({ user, isAdmin }: { user: StaffUser; isAdmin: boolean }) {
  const [notes, setNotes] = useState<StaffNote[]>(() => getPortalNotes())
  const [composing, setComposing] = useState(false)
  const [editNote, setEditNote] = useState<StaffNote | null>(null)
  const [filterCat, setFilterCat] = useState<NoteCategory | 'all'>('all')
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const h = () => setNotes(getPortalNotes())
    window.addEventListener('tshe-portal-update', h)
    return () => window.removeEventListener('tshe-portal-update', h)
  }, [])

  const save = (v: StaffNote[]) => { savePortalNotes(v); setNotes(v) }

  const handlePost = (content: string, category: NoteCategory) => {
    if (editNote) {
      save(notes.map(n => n.id === editNote.id ? { ...n, content, category, editedAt: new Date().toISOString() } : n))
      pushPortalActivity({ authorId: user.id, authorName: user.username, action: 'edited a note', detail: content.slice(0,80) })
      setEditNote(null)
    } else {
      const note: StaffNote = { id: `note_${Date.now()}`, authorId: user.id, authorName: user.username, authorAvatar: user.avatar, content, category, pinned: false, createdAt: new Date().toISOString(), editedAt: null }
      save([note, ...notes])
      pushPortalActivity({ authorId: user.id, authorName: user.username, action: 'posted a note', detail: content.slice(0,80) })
    }
    setComposing(false)
  }

  const displayed = notes
    .filter(n => filterCat === 'all' || n.category === filterCat)
    .filter(n => !pinned || n.pinned)
    .sort((a, b) => { if (a.pinned !== b.pinned) return a.pinned ? -1 : 1; return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() })

  return (
    <div>
      <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap', flex: 1 }}>
          <button onClick={() => setFilterCat('all')} style={{ fontSize: '.65rem', fontFamily: 'Cinzel, serif', padding: '4px 10px', borderRadius: '.35rem', cursor: 'pointer', background: filterCat === 'all' ? 'rgba(200,30,50,.15)' : 'transparent', border: `1px solid ${filterCat === 'all' ? 'rgba(200,30,50,.35)' : 'var(--border)'}`, color: filterCat === 'all' ? 'var(--red2)' : 'var(--muted)' }}>All</button>
          {(Object.entries(noteCategoryMeta) as [NoteCategory, typeof noteCategoryMeta[NoteCategory]][]).map(([key, m]) => {
            const CatIcon = m.icon
            return <button key={key} onClick={() => setFilterCat(key)} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.65rem', fontFamily: 'Cinzel, serif', padding: '4px 10px', borderRadius: '.35rem', cursor: 'pointer', background: filterCat === key ? hexAlpha(m.color,.15) : 'transparent', border: `1px solid ${filterCat === key ? hexAlpha(m.color,.35) : 'var(--border)'}`, color: filterCat === key ? m.color : 'var(--muted)' }}><CatIcon size={10} /> {m.label}</button>
          })}
        </div>
        <button onClick={() => setPinned(p => !p)} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.65rem', fontFamily: 'Cinzel, serif', padding: '4px 10px', borderRadius: '.35rem', cursor: 'pointer', background: pinned ? 'rgba(201,168,76,.15)' : 'transparent', border: `1px solid ${pinned ? 'rgba(201,168,76,.35)' : 'var(--border)'}`, color: pinned ? 'var(--gold)' : 'var(--muted)' }}><Pin size={10} /> Pinned</button>
        <button onClick={() => { setComposing(true); setEditNote(null) }} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.68rem', fontFamily: 'Cinzel, serif', padding: '.4rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'rgba(200,30,50,.12)', border: '1px solid rgba(200,30,50,.3)', color: 'var(--red2)' }}><Plus size={13} /> New Note</button>
      </div>
      {(composing || editNote) && <NoteComposer user={user} editNote={editNote} onSave={handlePost} onCancel={() => { setComposing(false); setEditNote(null) }} />}
      {displayed.length === 0 && <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--muted)', fontSize: '.8rem' }}>No notes yet.</div>}
      {displayed.map(note => {
        const meta = noteCategoryMeta[note.category]
        const CatIcon = meta.icon
        const canEdit = note.authorId === user.id || isAdmin
        return (
          <div key={note.id} style={{ background: 'var(--bg1)', border: `1px solid ${note.pinned ? hexAlpha(meta.color,.35) : 'var(--border)'}`, borderRadius: '.8rem', padding: '1rem 1.1rem', marginBottom: '.65rem', borderLeft: `3px solid ${meta.color}`, position: 'relative' }}>
            {note.pinned && <span style={{ position: 'absolute', top: 10, right: 10, fontSize: '.58rem', fontFamily: 'Cinzel, serif', color: meta.color, background: hexAlpha(meta.color,.15), border: `1px solid ${hexAlpha(meta.color,.3)}`, borderRadius: '.25rem', padding: '2px 7px' }}>PINNED</span>}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.65rem', marginBottom: '.6rem' }}>
              <img src={avatarUrl(note.authorId, note.authorAvatar)} alt="" style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 1 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '.72rem', fontWeight: 700, color: 'var(--text)' }}>{note.authorName}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', fontSize: '.6rem', fontFamily: 'Cinzel, serif', color: meta.color, background: hexAlpha(meta.color,.1), border: `1px solid ${hexAlpha(meta.color,.2)}`, borderRadius: '.25rem', padding: '1px 6px' }}><CatIcon size={9} /> {meta.label}</span>
                  <span style={{ fontSize: '.65rem', color: 'var(--muted)' }}>{timeAgo(note.createdAt)}{note.editedAt ? ' · edited' : ''}</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{note.content}</div>
            <div style={{ display: 'flex', gap: '.4rem', marginTop: '.75rem', paddingTop: '.65rem', borderTop: '1px solid var(--border)' }}>
              {canEdit && <><ActionBtn onClick={() => { setEditNote(note); setComposing(false) }} icon={Edit3} label="Edit" /><ActionBtn onClick={() => { if (window.confirm('Delete?')) save(notes.filter(n => n.id !== note.id)) }} icon={Trash2} label="Delete" danger /></>}
              <ActionBtn onClick={() => save(notes.map(n => n.id === note.id ? { ...n, pinned: !n.pinned } : n))} icon={note.pinned ? PinOff : Pin} label={note.pinned ? 'Unpin' : 'Pin'} color={note.pinned ? meta.color : 'var(--muted)'} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── LOA / Time Off panel ──────────────────────────────────────────────────────

function LOAForm({ user, userRoles, editEntry, onSave, onCancel }: { user: StaffUser; userRoles: string[]; editEntry: LOAEntry | null; onSave: (f: Omit<LOAEntry, 'id' | 'createdAt' | 'returnedAt'>) => void; onCancel: () => void }) {
  const hr = getHighestRole(userRoles)
  const today = new Date().toISOString().split('T')[0]
  const [type, setType]         = useState<LOAEntry['type']>(editEntry?.type ?? 'loa')
  const [from, setFrom]         = useState(editEntry?.from ?? today)
  const [to, setTo]             = useState(editEntry?.to ?? today)
  const [reason, setReason]     = useState(editEntry?.reason ?? '')
  const [coverage, setCoverage] = useState(editEntry?.coverage ?? '')
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid rgba(200,30,50,.2)', borderRadius: '.8rem', padding: '1.1rem', marginBottom: '1rem' }}>
      <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.75rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>{editEntry ? 'Edit LOA' : 'Submit LOA / Absence'}</p>
      <div style={{ display: 'flex', gap: '.4rem', marginBottom: '.9rem', flexWrap: 'wrap' }}>
        {(['loa','partial'] as const).map(t => <button key={t} onClick={() => setType(t)} style={{ fontSize: '.65rem', fontFamily: 'Cinzel, serif', padding: '5px 12px', borderRadius: '.35rem', cursor: 'pointer', background: type === t ? 'rgba(200,30,50,.15)' : 'transparent', border: `1px solid ${type === t ? 'rgba(200,30,50,.35)' : 'var(--border)'}`, color: type === t ? 'var(--red2)' : 'var(--muted)' }}>{t === 'loa' ? 'Full LOA (5+ days)' : 'Short Absence (1–4 days)'}</button>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.65rem' }}>
        <FieldInput label="From" type="date" value={from} onChange={setFrom} />
        <FieldInput label="To"   type="date" value={to}   onChange={setTo}   />
      </div>
      <FieldInput label="Reason (optional)" value={reason} onChange={setReason} placeholder="e.g. holiday, exams, personal…" />
      <FieldInput label="Coverage" value={coverage} onChange={setCoverage} placeholder="Who is covering your duties?" />
      <div style={{ background: 'rgba(200,30,50,.05)', border: '1px solid rgba(200,30,50,.15)', borderRadius: '.5rem', padding: '.65rem .8rem', marginBottom: '.9rem', fontSize: '.72rem', color: 'var(--dim)', lineHeight: 1.65 }}>
        <strong style={{ color: 'var(--red2)' }}>Reminder:</strong> {type === 'loa' ? 'Full LOAs require approval from your direct superior. Also post in #staff-loa on Discord.' : 'Short absences: just let your team know in staff chat.'}
      </div>
      <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
        <button onClick={onCancel} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', fontFamily: 'Cinzel, serif', padding: '.4rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)' }}><X size={12} /> Cancel</button>
        <button onClick={() => onSave({ authorId: user.id, authorName: user.username, authorAvatar: user.avatar, authorRole: hr?.name ?? 'Staff', authorRoleColor: hr?.color ?? 'var(--red2)', type, from, to, reason, coverage, status: 'active' })} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', fontFamily: 'Cinzel, serif', padding: '.4rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'rgba(200,30,50,.15)', border: '1px solid rgba(200,30,50,.3)', color: 'var(--red2)' }}><Check size={12} /> {editEntry ? 'Update' : 'Submit'}</button>
      </div>
    </div>
  )
}

function LOAPanel({ user, userRoles }: { user: StaffUser; userRoles: string[] }) {
  const [entries, setEntries] = useState<LOAEntry[]>(() => getPortalLOA())
  const [showForm, setShowForm] = useState(false)
  const [editEntry, setEditEntry] = useState<LOAEntry | null>(null)
  const [historyView, setHistoryView] = useState(false)

  useEffect(() => {
    const h = () => setEntries(getPortalLOA())
    window.addEventListener('tshe-portal-update', h)
    return () => window.removeEventListener('tshe-portal-update', h)
  }, [])

  const save = (v: LOAEntry[]) => { savePortalLOA(v); setEntries(v) }

  const handleSubmit = (form: Omit<LOAEntry, 'id' | 'createdAt' | 'returnedAt'>) => {
    if (editEntry) {
      save(entries.map(e => e.id === editEntry.id ? { ...editEntry, ...form } : e))
      pushPortalActivity({ authorId: user.id, authorName: user.username, action: 'updated their LOA', detail: `${fmtDate(form.from)} → ${fmtDate(form.to)}` })
    } else {
      const entry: LOAEntry = { ...form, id: `loa_${Date.now()}`, createdAt: new Date().toISOString(), returnedAt: null }
      save([entry, ...entries])
      pushPortalActivity({ authorId: user.id, authorName: user.username, action: form.type === 'loa' ? 'submitted an LOA' : 'submitted a short absence', detail: `${fmtDate(form.from)} → ${fmtDate(form.to)}${form.reason ? ` — ${form.reason}` : ''}` })
    }
    setShowForm(false); setEditEntry(null)
  }

  const activeEntries   = entries.filter(e => e.status === 'active')
  const historyEntries  = entries.filter(e => e.status !== 'active')
  const currentlyAway   = activeEntries.filter(isLOAActive)
  const upcoming        = activeEntries.filter(e => new Date(e.from) > new Date())
  const displayed       = historyView ? historyEntries : activeEntries

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '.65rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Away Now',      value: currentlyAway.length, color: '#f87171', icon: Plane    },
          { label: 'Upcoming',      value: upcoming.length,      color: '#f59e0b', icon: Calendar },
          { label: 'This Month',    value: entries.filter(e => new Date(e.createdAt).getMonth() === new Date().getMonth()).length, color: 'var(--red2)', icon: Clock },
        ].map(s => {
          const SIcon = s.icon
          return (
            <div key={s.label} style={{ background: 'var(--bg1)', border: `1px solid ${hexAlpha(s.color,.2)}`, borderRadius: '.75rem', padding: '.85rem 1rem', display: 'flex', alignItems: 'center', gap: '.65rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: '.45rem', background: hexAlpha(s.color,.12), border: `1px solid ${hexAlpha(s.color,.25)}`, display: 'grid', placeItems: 'center', flexShrink: 0 }}><SIcon size={15} color={s.color} /></div>
              <div><p style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', fontWeight: 800, color: s.color }}>{s.value}</p><p style={{ fontSize: '.63rem', color: 'var(--muted)' }}>{s.label}</p></div>
            </div>
          )
        })}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '.5rem', padding: '.2rem', gap: '.2rem' }}>
          <button onClick={() => setHistoryView(false)} style={{ fontSize: '.65rem', fontFamily: 'Cinzel, serif', padding: '4px 12px', borderRadius: '.35rem', cursor: 'pointer', background: !historyView ? 'var(--bg4)' : 'transparent', border: `1px solid ${!historyView ? 'rgba(200,30,50,.2)' : 'transparent'}`, color: !historyView ? 'var(--red2)' : 'var(--muted)' }}>Active / Upcoming</button>
          <button onClick={() => setHistoryView(true)}  style={{ fontSize: '.65rem', fontFamily: 'Cinzel, serif', padding: '4px 12px', borderRadius: '.35rem', cursor: 'pointer', background:  historyView ? 'var(--bg4)' : 'transparent', border: `1px solid ${ historyView ? 'rgba(200,30,50,.2)' : 'transparent'}`, color:  historyView ? 'var(--red2)' : 'var(--muted)' }}>History</button>
        </div>
        <button onClick={() => { setShowForm(true); setEditEntry(null) }} style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.68rem', fontFamily: 'Cinzel, serif', padding: '.4rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'rgba(200,30,50,.12)', border: '1px solid rgba(200,30,50,.3)', color: 'var(--red2)' }}><Plus size={13} /> Submit LOA</button>
      </div>

      {showForm && <LOAForm user={user} userRoles={userRoles} editEntry={editEntry} onSave={handleSubmit} onCancel={() => { setShowForm(false); setEditEntry(null) }} />}

      {displayed.length === 0 && <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--muted)', fontSize: '.8rem' }}>{historyView ? 'No LOA history yet.' : 'No active or upcoming LOAs.'}</div>}

      {displayed.map(entry => {
        const isNow = isLOAActive(entry)
        const days = daysBetween(entry.from, entry.to)
        const statusColor = entry.status === 'active' && isNow ? '#f87171' : entry.status === 'active' ? '#f59e0b' : entry.status === 'completed' ? '#34d399' : '#6b7280'
        const statusLabel = entry.status === 'active' && isNow ? 'Away Now' : entry.status === 'active' ? 'Upcoming' : entry.status === 'completed' ? 'Returned' : 'Cancelled'
        return (
          <div key={entry.id} style={{ background: 'var(--bg1)', border: `1px solid ${hexAlpha(statusColor,.25)}`, borderRadius: '.8rem', padding: '1rem 1.15rem', marginBottom: '.65rem', borderLeft: `3px solid ${statusColor}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.65rem', flexWrap: 'wrap' }}>
              <img src={avatarUrl(entry.authorId, entry.authorAvatar)} alt="" style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.3rem' }}>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '.75rem', fontWeight: 700, color: 'var(--text)' }}>{entry.authorName}</span>
                  <Badge label={entry.authorRole} color={entry.authorRoleColor} size="xs" />
                  <Badge label={statusLabel} color={statusColor} size="xs" />
                  <Badge label={entry.type === 'loa' ? 'Full LOA' : 'Short Absence'} color="#a78bfa" size="xs" />
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '.7rem', color: 'var(--dim)' }}><span style={{ color: 'var(--muted)' }}>From:</span> {fmtDate(entry.from)}</span>
                  <span style={{ fontSize: '.7rem', color: 'var(--dim)' }}><span style={{ color: 'var(--muted)' }}>To:</span> {fmtDate(entry.to)}</span>
                  <span style={{ fontSize: '.7rem', color: 'var(--dim)' }}><span style={{ color: 'var(--muted)' }}>Duration:</span> {days}d</span>
                </div>
                {(entry.reason || entry.coverage) && (
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '.5rem', flexWrap: 'wrap' }}>
                    {entry.reason   && <p style={{ fontSize: '.72rem', color: 'var(--dim)' }}><span style={{ color: 'var(--muted)' }}>Reason: </span>{entry.reason}</p>}
                    {entry.coverage && <p style={{ fontSize: '.72rem', color: 'var(--dim)' }}><span style={{ color: 'var(--muted)' }}>Coverage: </span>{entry.coverage}</p>}
                  </div>
                )}
                {entry.returnedAt && <p style={{ fontSize: '.68rem', color: '#34d399', marginTop: '.4rem' }}>Returned {timeAgo(entry.returnedAt)}</p>}
              </div>
            </div>
            {entry.authorId === user.id && entry.status === 'active' && (
              <div style={{ display: 'flex', gap: '.4rem', marginTop: '.75rem', paddingTop: '.65rem', borderTop: '1px solid var(--border)' }}>
                {isNow && <ActionBtn onClick={() => { save(entries.map(e => e.id === entry.id ? { ...e, status: 'completed', returnedAt: new Date().toISOString() } : e)); pushPortalActivity({ authorId: user.id, authorName: user.username, action: 'returned from LOA', detail: '' }) }} icon={UserCheck} label="Mark as Returned" color="#34d399" />}
                <ActionBtn onClick={() => { setEditEntry(entry); setShowForm(true) }} icon={Edit3} label="Edit" />
                <ActionBtn onClick={() => { if (window.confirm('Cancel this LOA?')) save(entries.map(e => e.id === entry.id ? { ...e, status: 'cancelled' } : e)) }} icon={X} label="Cancel" danger />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Incident Reports panel ────────────────────────────────────────────────────

function IncidentForm({ onSave, onCancel }: { onSave: (f: Omit<IncidentReport, 'id' | 'createdAt' | 'updatedAt' | 'resolvedAt' | 'notes' | 'reportedById' | 'reportedByName' | 'reportedByAvatar'>) => void; onCancel: () => void }) {
  const [title, setTitle]             = useState('')
  const [severity, setSeverity]       = useState<IncidentReport['severity']>('medium')
  const [category, setCategory]       = useState<IncidentReport['category']>('member')
  const [description, setDescription] = useState('')
  const [actionTaken, setActionTaken] = useState('')
  const [involvedUsers, setInvolved]  = useState('')
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid rgba(248,113,113,.2)', borderRadius: '.8rem', padding: '1.1rem', marginBottom: '1rem' }}>
      <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.75rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>File Incident Report</p>
      <FieldInput label="Title" value={title} onChange={setTitle} placeholder="Brief summary of the incident" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.65rem' }}>
        <FieldSelect label="Severity" value={severity} onChange={v => setSeverity(v as IncidentReport['severity'])} options={Object.entries(severityMeta).map(([k,m]) => ({ value: k, label: m.label }))} />
        <FieldSelect label="Category" value={category} onChange={v => setCategory(v as IncidentReport['category'])} options={Object.entries(incidentCategoryMeta).map(([k,m]) => ({ value: k, label: m.label }))} />
      </div>
      <FieldInput label="Description" value={description} onChange={setDescription} placeholder="What happened? Context, timeline, details." rows={4} />
      <FieldInput label="Action Taken" value={actionTaken} onChange={setActionTaken} placeholder="What was done in response?" rows={2} />
      <FieldInput label="Involved Users" value={involvedUsers} onChange={setInvolved} placeholder="Names or Discord IDs, comma-separated" />
      <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end', marginTop: '.5rem' }}>
        <button onClick={onCancel} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', fontFamily: 'Cinzel, serif', padding: '.4rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)' }}><X size={12} /> Cancel</button>
        <button onClick={() => title.trim() && description.trim() && onSave({ title, severity, category, description, actionTaken, involvedUsers, status: 'open' })} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', fontFamily: 'Cinzel, serif', padding: '.4rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'rgba(248,113,113,.15)', border: '1px solid rgba(248,113,113,.3)', color: 'var(--red)' }}><Check size={12} /> File Report</button>
      </div>
    </div>
  )
}

function IncidentsPanel({ user, isAdmin }: { user: StaffUser; isAdmin: boolean }) {
  const [incidents, setIncidents] = useState<IncidentReport[]>(() => getPortalIncidents())
  const [showForm, setShowForm] = useState(false)
  const [viewInc, setViewInc] = useState<IncidentReport | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | IncidentReport['status']>('all')
  const [noteContent, setNoteContent] = useState('')

  useEffect(() => {
    const h = () => setIncidents(getPortalIncidents())
    window.addEventListener('tshe-portal-update', h)
    return () => window.removeEventListener('tshe-portal-update', h)
  }, [])

  const save = (v: IncidentReport[]) => { savePortalIncidents(v); setIncidents(v) }

  const handleCreate = (form: Omit<IncidentReport, 'id' | 'createdAt' | 'updatedAt' | 'resolvedAt' | 'notes' | 'reportedById' | 'reportedByName' | 'reportedByAvatar'>) => {
    const ir: IncidentReport = { ...form, id: `inc_${Date.now()}`, reportedById: user.id, reportedByName: user.username, reportedByAvatar: user.avatar, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), resolvedAt: null, notes: [] }
    save([ir, ...incidents])
    pushPortalActivity({ authorId: user.id, authorName: user.username, action: 'filed an incident report', detail: `${form.title} [${form.severity.toUpperCase()}]` })
    setShowForm(false)
  }

  const updateStatus = (id: string, status: IncidentReport['status']) => {
    const updated = incidents.map(i => i.id === id ? { ...i, status, updatedAt: new Date().toISOString(), resolvedAt: (status === 'resolved' || status === 'closed') ? new Date().toISOString() : i.resolvedAt } : i)
    save(updated)
    if (viewInc?.id === id) setViewInc(updated.find(i => i.id === id) ?? null)
    pushPortalActivity({ authorId: user.id, authorName: user.username, action: `marked incident as ${status}`, detail: incidents.find(i => i.id === id)?.title ?? '' })
  }

  const addNote = (id: string) => {
    if (!noteContent.trim()) return
    const note = { authorId: user.id, authorName: user.username, content: noteContent.trim(), timestamp: new Date().toISOString() }
    const updated = incidents.map(i => i.id === id ? { ...i, notes: [...i.notes, note], updatedAt: new Date().toISOString() } : i)
    save(updated)
    if (viewInc?.id === id) setViewInc(updated.find(i => i.id === id) ?? null)
    setNoteContent('')
    pushPortalActivity({ authorId: user.id, authorName: user.username, action: 'added a note to incident', detail: noteContent.slice(0,80) })
  }

  const displayed = incidents.filter(i => filterStatus === 'all' || i.status === filterStatus)

  return (
    <div>
      <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap', flex: 1 }}>
          <button onClick={() => setFilterStatus('all')} style={{ fontSize: '.65rem', fontFamily: 'Cinzel, serif', padding: '4px 10px', borderRadius: '.35rem', cursor: 'pointer', background: filterStatus === 'all' ? 'rgba(200,30,50,.15)' : 'transparent', border: `1px solid ${filterStatus === 'all' ? 'rgba(200,30,50,.35)' : 'var(--border)'}`, color: filterStatus === 'all' ? 'var(--red2)' : 'var(--muted)' }}>All</button>
          {(Object.entries(incidentStatusMeta) as [IncidentReport['status'], typeof incidentStatusMeta[IncidentReport['status']]][]).map(([key, m]) => (
            <button key={key} onClick={() => setFilterStatus(key)} style={{ fontSize: '.65rem', fontFamily: 'Cinzel, serif', padding: '4px 10px', borderRadius: '.35rem', cursor: 'pointer', background: filterStatus === key ? hexAlpha(m.color,.15) : 'transparent', border: `1px solid ${filterStatus === key ? hexAlpha(m.color,.35) : 'var(--border)'}`, color: filterStatus === key ? m.color : 'var(--muted)' }}>{m.label}</button>
          ))}
        </div>
        <button onClick={() => setShowForm(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.68rem', fontFamily: 'Cinzel, serif', padding: '.4rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'rgba(248,113,113,.12)', border: '1px solid rgba(248,113,113,.3)', color: 'var(--red)' }}><Plus size={13} /> File Report</button>
      </div>

      {showForm && <IncidentForm onSave={handleCreate} onCancel={() => setShowForm(false)} />}

      {displayed.length === 0 && <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--muted)', fontSize: '.8rem' }}>No incident reports found.</div>}
      {displayed.map(inc => {
        const sev = severityMeta[inc.severity]
        const SevIcon = sev.icon
        const status = incidentStatusMeta[inc.status]
        const cat = incidentCategoryMeta[inc.category]
        return (
          <div key={inc.id} onClick={() => setViewInc(inc)} style={{ background: 'var(--bg1)', border: `1px solid ${hexAlpha(sev.color,.2)}`, borderRadius: '.8rem', padding: '1rem 1.15rem', marginBottom: '.65rem', borderLeft: `3px solid ${sev.color}`, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.65rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem', flexWrap: 'wrap', marginBottom: '.35rem' }}>
                  <SevIcon size={13} color={sev.color} />
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '.78rem', fontWeight: 700, color: 'var(--text)' }}>{inc.title}</span>
                  <Badge label={sev.label} color={sev.color} size="xs" />
                  <Badge label={cat.label} color={cat.color} size="xs" />
                  <Badge label={status.label} color={status.color} size="xs" />
                </div>
                <p style={{ fontSize: '.73rem', color: 'var(--dim)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as React.CSSProperties}>{inc.description}</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '.65rem', color: 'var(--muted)' }}>Filed by <span style={{ color: 'var(--dim)' }}>{inc.reportedByName}</span> · {timeAgo(inc.createdAt)}</span>
                  {inc.notes.length > 0 && <span style={{ fontSize: '.65rem', color: 'var(--muted)' }}>{inc.notes.length} note{inc.notes.length !== 1 ? 's' : ''}</span>}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {viewInc && (
        <Modal title={viewInc.title} onClose={() => setViewInc(null)}>
          <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <Badge label={severityMeta[viewInc.severity].label} color={severityMeta[viewInc.severity].color} />
            <Badge label={incidentCategoryMeta[viewInc.category].label} color={incidentCategoryMeta[viewInc.category].color} />
            <Badge label={incidentStatusMeta[viewInc.status].label} color={incidentStatusMeta[viewInc.status].color} />
          </div>
          <div style={{ marginBottom: '.9rem' }}>
            <p style={{ fontSize: '.62rem', fontFamily: 'Cinzel, serif', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.3rem' }}>Description</p>
            <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{viewInc.description}</p>
          </div>
          {viewInc.actionTaken && <div style={{ marginBottom: '.9rem' }}><p style={{ fontSize: '.62rem', fontFamily: 'Cinzel, serif', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.3rem' }}>Action Taken</p><p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{viewInc.actionTaken}</p></div>}
          {viewInc.involvedUsers && <div style={{ marginBottom: '.9rem' }}><p style={{ fontSize: '.62rem', fontFamily: 'Cinzel, serif', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.3rem' }}>Involved Users</p><p style={{ fontSize: '.78rem', color: 'var(--dim)' }}>{viewInc.involvedUsers}</p></div>}
          <div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            {(Object.keys(incidentStatusMeta) as IncidentReport['status'][]).map(s => (
              <button key={s} onClick={() => updateStatus(viewInc.id, s)} disabled={viewInc.status === s} style={{ fontSize: '.63rem', fontFamily: 'Cinzel, serif', padding: '4px 10px', borderRadius: '.35rem', cursor: viewInc.status === s ? 'default' : 'pointer', opacity: viewInc.status === s ? 1 : 0.7, background: viewInc.status === s ? hexAlpha(incidentStatusMeta[s].color,.2) : 'transparent', border: `1px solid ${hexAlpha(incidentStatusMeta[s].color, viewInc.status === s ? .4 : .2)}`, color: incidentStatusMeta[s].color }}>{incidentStatusMeta[s].label}</button>
            ))}
          </div>
          <p style={{ fontSize: '.62rem', fontFamily: 'Cinzel, serif', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.6rem' }}>Follow-up Notes ({viewInc.notes.length})</p>
          <div style={{ maxHeight: 180, overflowY: 'auto', marginBottom: '.75rem', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
            {viewInc.notes.length === 0 && <p style={{ fontSize: '.75rem', color: 'var(--muted)' }}>No notes yet.</p>}
            {viewInc.notes.map((n, i) => (
              <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '.5rem', padding: '.6rem .75rem' }}>
                <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', marginBottom: '.3rem' }}>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '.68rem', fontWeight: 700, color: 'var(--text)' }}>{n.authorName}</span>
                  <span style={{ fontSize: '.62rem', color: 'var(--muted)' }}>{timeAgo(n.timestamp)}</span>
                </div>
                <p style={{ fontSize: '.75rem', color: 'var(--dim)', lineHeight: 1.6 }}>{n.content}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <input value={noteContent} onChange={e => setNoteContent(e.target.value)} onKeyDown={e => e.key === 'Enter' && addNote(viewInc.id)} placeholder="Add a follow-up note…" style={{ flex: 1, background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.45rem', padding: '.45rem .7rem', color: 'var(--text)', fontSize: '.76rem', fontFamily: 'inherit', outline: 'none' }} />
            <button onClick={() => addNote(viewInc.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', fontFamily: 'Cinzel, serif', padding: '.45rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'rgba(200,30,50,.15)', border: '1px solid rgba(200,30,50,.3)', color: 'var(--red2)', whiteSpace: 'nowrap' }}><Check size={12} /> Add</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── Activity Log panel ────────────────────────────────────────────────────────

function ActivityPanel() {
  const [log, setLog] = useState<StaffActivity[]>(() => getPortalActivity())
  useEffect(() => {
    const h = () => setLog(getPortalActivity())
    window.addEventListener('tshe-portal-update', h)
    return () => window.removeEventListener('tshe-portal-update', h)
  }, [])
  if (log.length === 0) return <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--muted)', fontSize: '.8rem' }}>No activity recorded yet.</div>
  const grouped: Record<string, StaffActivity[]> = {}
  log.forEach(e => {
    const d = new Date(e.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    if (!grouped[d]) grouped[d] = []
    grouped[d].push(e)
  })
  return (
    <div>
      {Object.entries(grouped).map(([date, entries]) => (
        <div key={date} style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.5rem' }}>{date}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
            {entries.map(entry => (
              <div key={entry.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '.65rem', background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.6rem', padding: '.7rem .9rem' }}>
                <Activity size={13} color="var(--red2)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '.72rem', fontWeight: 700, color: 'var(--text)' }}>{entry.authorName}</span>
                  <span style={{ fontSize: '.72rem', color: 'var(--dim)' }}> {entry.action}</span>
                  {entry.detail && <p style={{ fontSize: '.68rem', color: 'var(--muted)', marginTop: '.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.detail}</p>}
                </div>
                <span style={{ fontSize: '.62rem', color: 'var(--muted)', flexShrink: 0, marginTop: 2 }}>{new Date(entry.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Staff Directory panel ─────────────────────────────────────────────────────

function DirEntryForm({ user, userRoles, existing, onSave, onCancel }: { user: StaffUser; userRoles: string[]; existing?: StaffDirEntry; onSave: (e: StaffDirEntry) => void; onCancel: () => void }) {
  const hr = getHighestRole(userRoles)
  const [timezone,  setTimezone]  = useState(existing?.timezone ?? '')
  const [contact,   setContact]   = useState(existing?.contactNote ?? '')
  const [spec,      setSpec]      = useState(existing?.specialties ?? '')
  const [joined,    setJoined]    = useState(existing?.joinedStaff ?? '')
  const [onLOA,     setOnLOA]     = useState(existing?.onLOA ?? false)
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid rgba(200,30,50,.2)', borderRadius: '.8rem', padding: '1.1rem', marginBottom: '1rem' }}>
      <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.75rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>Edit My Directory Profile</p>
      <FieldInput label="Timezone"          value={timezone} onChange={setTimezone} placeholder="e.g. UTC+1, EST, GMT…" />
      <FieldInput label="Focus / Specialties" value={spec}  onChange={setSpec}      placeholder="e.g. appeals, automod, tickets…" />
      <FieldInput label="Contact Note"      value={contact}  onChange={setContact}  placeholder="e.g. DM for urgent, ping in staff chat…" />
      <FieldInput label="Joined Staff (date)" type="date" value={joined} onChange={setJoined} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.9rem' }}>
        <input type="checkbox" id="onloa" checked={onLOA} onChange={e => setOnLOA(e.target.checked)} />
        <label htmlFor="onloa" style={{ fontSize: '.75rem', color: 'var(--dim)', cursor: 'pointer', fontFamily: 'Cinzel, serif' }}>Currently on LOA / away</label>
      </div>
      <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
        <button onClick={onCancel} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', fontFamily: 'Cinzel, serif', padding: '.4rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)' }}><X size={12} /> Cancel</button>
        <button onClick={() => onSave({ discordId: user.id, displayName: user.username, avatar: user.avatar, primaryRoleId: hr?.id ?? existing?.primaryRoleId ?? '', timezone, contactNote: contact, specialties: spec, joinedStaff: joined, lastSeen: new Date().toISOString(), onLOA })} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', fontFamily: 'Cinzel, serif', padding: '.4rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'rgba(200,30,50,.15)', border: '1px solid rgba(200,30,50,.3)', color: 'var(--red2)' }}><Check size={12} /> Save Profile</button>
      </div>
    </div>
  )
}

function DirectoryPanel({ user, userRoles }: { user: StaffUser; userRoles: string[] }) {
  const [directory, setDirectory] = useState<StaffDirEntry[]>(() => getStaffDirectory())
  const [showEdit, setShowEdit]   = useState(false)
  const [search, setSearch]       = useState('')

  useEffect(() => {
    const h = () => setDirectory(getStaffDirectory())
    window.addEventListener('tshe-portal-update', h)
    return () => window.removeEventListener('tshe-portal-update', h)
  }, [])

  // Auto-upsert / update lastSeen on mount
  useEffect(() => {
    const existing = getStaffDirectory().find(e => e.discordId === user.id)
    const hr = getHighestRole(userRoles)
    if (!existing) {
      upsertDirectoryEntry({ discordId: user.id, displayName: user.username, avatar: user.avatar, primaryRoleId: hr?.id ?? '', timezone: '', contactNote: '', specialties: '', joinedStaff: '', lastSeen: new Date().toISOString(), onLOA: false })
    } else {
      upsertDirectoryEntry({ ...existing, displayName: user.username, avatar: user.avatar, lastSeen: new Date().toISOString() })
    }
    setDirectory(getStaffDirectory())
  }, [user.id])

  const myEntry = directory.find(e => e.discordId === user.id)
  const activeLOAIds = new Set(getPortalLOA().filter(isLOAActive).map(l => l.authorId))

  const sorted = [...directory]
    .filter(e => !search || e.displayName.toLowerCase().includes(search.toLowerCase()) || (ROLE_MAP[e.primaryRoleId]?.name ?? '').toLowerCase().includes(search.toLowerCase()) || e.specialties.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => ROLE_ORDER.indexOf(a.primaryRoleId) - ROLE_ORDER.indexOf(b.primaryRoleId))

  return (
    <div>
      <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '.5rem', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '.5rem', padding: '.4rem .7rem' }}>
          <Search size={13} color="var(--muted)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, role, or specialty…" style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '.76rem', color: 'var(--text)', fontFamily: 'inherit' }} />
        </div>
        <button onClick={() => setShowEdit(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.68rem', fontFamily: 'Cinzel, serif', padding: '.4rem .9rem', borderRadius: '.45rem', cursor: 'pointer', background: 'rgba(200,30,50,.12)', border: '1px solid rgba(200,30,50,.3)', color: 'var(--red2)' }}><Pencil size={12} /> Edit My Profile</button>
      </div>
      {showEdit && <DirEntryForm user={user} userRoles={userRoles} existing={myEntry} onSave={e => { upsertDirectoryEntry(e); setDirectory(getStaffDirectory()); setShowEdit(false); pushPortalActivity({ authorId: user.id, authorName: user.username, action: 'updated their directory profile', detail: '' }) }} onCancel={() => setShowEdit(false)} />}
      {sorted.length === 0 && <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--muted)', fontSize: '.8rem' }}>No staff profiles found.</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '.75rem' }}>
        {sorted.map(entry => {
          const role = ROLE_MAP[entry.primaryRoleId]
          const awayNow = entry.onLOA || activeLOAIds.has(entry.discordId)
          return (
            <div key={entry.discordId} style={{ background: 'var(--bg1)', border: `1px solid ${role ? hexAlpha(role.color,.2) : 'var(--border)'}`, borderRadius: '.8rem', padding: '1rem', position: 'relative' }}>
              {awayNow && <div style={{ position: 'absolute', top: 10, right: 10 }}><Badge label="On LOA" color="#f87171" size="xs" /></div>}
              <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', marginBottom: '.75rem' }}>
                <img src={avatarUrl(entry.discordId, entry.avatar)} alt="" style={{ width: 40, height: 40, borderRadius: '50%', border: `2px solid ${role ? hexAlpha(role.color,.4) : 'var(--border)'}`, flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.76rem', fontWeight: 700, color: role?.color ?? 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entry.displayName}</p>
                  {role && <p style={{ fontSize: '.63rem', color: 'var(--muted)', marginTop: '.1rem' }}>{role.name}</p>}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
                {entry.timezone    && <p style={{ fontSize: '.7rem', color: 'var(--dim)' }}><span style={{ color: 'var(--muted)' }}>TZ: </span>{entry.timezone}</p>}
                {entry.specialties && <p style={{ fontSize: '.7rem', color: 'var(--dim)' }}><span style={{ color: 'var(--muted)' }}>Focus: </span>{entry.specialties}</p>}
                {entry.contactNote && <p style={{ fontSize: '.7rem', color: 'var(--dim)' }}><span style={{ color: 'var(--muted)' }}>Contact: </span>{entry.contactNote}</p>}
                {entry.joinedStaff && <p style={{ fontSize: '.7rem', color: 'var(--dim)' }}><span style={{ color: 'var(--muted)' }}>Joined: </span>{fmtDate(entry.joinedStaff)}</p>}
                <p style={{ fontSize: '.65rem', color: 'var(--muted)', marginTop: '.1rem' }}>Last seen {timeAgo(entry.lastSeen)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Quick Links panel ─────────────────────────────────────────────────────────

function LinksPanel({ isAdmin }: { isAdmin: boolean }) {
  const links = [
    { label: 'Discord Server',   url: 'https://discord.gg/DeSrm3WNmk',                   color: '#5865f2', desc: 'Jump straight to TSHE Discord' },
    { label: 'Appeal Portal',    url: 'https://zepp.noxxbot.com/appeals/1466990155020898413',    color: '#f59e0b', desc: 'Manage and review ban appeals' },
    { label: 'Public Rules',     url: '/rules',                                     color: 'var(--red2)', desc: 'Current live server rules' },
    { label: 'Punishment Guide', url: '/punishments',                               color: '#f87171', desc: 'Tier breakdown and ban ladder' },
    { label: 'AutoMod Limits',   url: '/automod',                                   color: '#a78bfa', desc: 'What AutoMod catches and limits' },
    { label: 'FAQ',              url: '/faq',                                       color: '#34d399', desc: 'Common member questions & answers' },
    { label: 'Docs',             url: '/docs',                                      color: '#60a5fa', desc: 'Server docs, definitions, mod notes' },
    ...(isAdmin ? [{ label: 'Admin Panel', url: '/admin', color: '#f472b6', desc: 'Manage site content and settings' }] : []),
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '.75rem' }}>
      {links.map(l => (
        <a key={l.label} href={l.url} target={l.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem', background: 'var(--bg1)', border: `1px solid ${hexAlpha(l.color,.2)}`, borderRadius: '.75rem', padding: '1rem', textDecoration: 'none' }}>
          <div style={{ width: 34, height: 34, borderRadius: '.5rem', flexShrink: 0, background: hexAlpha(l.color,.15), border: `1px solid ${hexAlpha(l.color,.25)}`, display: 'grid', placeItems: 'center' }}><ExternalLink size={15} color={l.color} /></div>
          <div><p style={{ fontFamily: 'Cinzel, serif', fontSize: '.75rem', fontWeight: 700, color: l.color, marginBottom: '.2rem' }}>{l.label}</p><p style={{ fontSize: '.7rem', color: 'var(--muted)', lineHeight: 1.5 }}>{l.desc}</p></div>
        </a>
      ))}
    </div>
  )
}

// ── Main Portal ───────────────────────────────────────────────────────────────

function Portal({ user, userRoles, isAdmin, onLogout }: { user: StaffUser; userRoles: string[]; isAdmin: boolean; onLogout: () => void }) {
  const [tab, setTab] = useState<'guide' | 'notes' | 'loa' | 'incidents' | 'directory' | 'activity' | 'links'>('guide')
  const highestRole = getHighestRole(userRoles)

  const activeLOAs     = getPortalLOA().filter(isLOAActive).length
  const openIncidents  = getPortalIncidents().filter(i => i.status === 'open').length

  const tabs = [
    { id: 'guide',     label: 'Guide',      icon: BookMarked,   badge: undefined        },
    { id: 'notes',     label: 'Notes',       icon: MessageSquare, badge: undefined       },
    { id: 'loa',       label: 'Time Off',    icon: Plane,         badge: activeLOAs || undefined    },
    { id: 'incidents', label: 'Incidents',   icon: AlertOctagon,  badge: openIncidents || undefined },
    { id: 'directory', label: 'Directory',   icon: Users,         badge: undefined       },
    { id: 'activity',  label: 'Activity',    icon: Activity,      badge: undefined       },
    { id: 'links',     label: 'Links',       icon: ExternalLink,  badge: undefined       },
  ] as const

  return (
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'rgba(248,113,113,.07)', border: '1px solid rgba(248,113,113,.2)', borderRadius: 99, padding: '.3rem .9rem', fontFamily: 'Cinzel, serif', fontSize: '.6rem', letterSpacing: '.12em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: '.75rem' }}><Lock size={9} /> Staff Only</div>
          <h1 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, letterSpacing: '-.01em', background: 'linear-gradient(135deg,var(--gold2),var(--red2),var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '.4rem' }}>Staff Portal</h1>
          <p style={{ fontSize: '.8rem', color: 'var(--muted)' }}>Internal resources, guides, and team tools for TSHE staff.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '.65rem .9rem' }}>
          <img src={avatarUrl(user.id, user.avatar)} alt="" style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.74rem', fontWeight: 700, color: highestRole?.color ?? 'var(--red2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 140 }}>{user.username}</p>
            <p style={{ fontSize: '.62rem', color: 'var(--muted)', marginTop: '.1rem' }}>{highestRole?.name ?? 'Staff'}</p>
          </div>
          <button onClick={onLogout} title="Sign out" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex', padding: '4px' }}><LogOut size={14} /></button>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '.3rem', flexWrap: 'wrap', marginBottom: '1.5rem', background: 'var(--bg2)', padding: '.3rem', borderRadius: '.7rem', border: '1px solid var(--border)' }}>
        {tabs.map(({ id, label, icon: Icon, badge }) => (
          <button key={id} onClick={() => setTab(id as typeof tab)} style={{ flex: '1 1 auto', minWidth: 85, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem', fontFamily: 'Cinzel, serif', fontSize: '.63rem', letterSpacing: '.05em', fontWeight: 700, cursor: 'pointer', padding: '.48rem .55rem', borderRadius: '.5rem', background: tab === id ? 'var(--bg4)' : 'transparent', border: `1px solid ${tab === id ? 'rgba(200,30,50,.2)' : 'transparent'}`, color: tab === id ? 'var(--red2)' : 'var(--muted)', transition: 'all .15s', position: 'relative' }}>
            <Icon size={12} /> {label}
            {badge !== undefined && <span style={{ position: 'absolute', top: 3, right: 3, minWidth: 16, height: 16, borderRadius: 8, background: 'var(--red)', color: '#fff', fontSize: '.55rem', display: 'grid', placeItems: 'center', padding: '0 3px' }}>{badge}</span>}
          </button>
        ))}
      </div>

      {tab === 'guide'     && <GuidePanel />}
      {tab === 'notes'     && <NotesPanel user={user} isAdmin={isAdmin} />}
      {tab === 'loa'       && <LOAPanel user={user} userRoles={userRoles} />}
      {tab === 'incidents' && <IncidentsPanel user={user} isAdmin={isAdmin} />}
      {tab === 'directory' && <DirectoryPanel user={user} userRoles={userRoles} />}
      {tab === 'activity'  && <ActivityPanel />}
      {tab === 'links'     && <LinksPanel isAdmin={isAdmin} />}

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function StaffPortal() {
  const [state, setState]       = useState<'loading' | 'gate' | 'portal'>('loading')
  const [user, setUser]         = useState<StaffUser | null>(null)
  const [userRoles, setUserRoles] = useState<string[]>([])
  const [isAdmin, setIsAdmin]   = useState(false)

  useEffect(() => {
    fetch('/auth/me-roles', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (data.authenticated && data.isStaff) { setUser(data.user); setUserRoles(data.roles ?? []); setIsAdmin(data.isAdmin ?? false); setState('portal') }
        else setState('gate')
      })
      .catch(() => setState('gate'))
  }, [])

  const handleLogout = async () => {
    await fetch('/auth/logout', { method: 'POST', credentials: 'include' })
    setState('gate'); setUser(null); setUserRoles([])
  }

  if (state === 'loading') return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 40, height: 40, border: '2px solid rgba(200,30,50,.2)', borderTop: '2px solid var(--red2)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontSize: '.78rem', color: 'var(--muted)', fontFamily: 'Cinzel, serif' }}>Verifying session…</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (state === 'gate' || !user) return <LoginGate />
  return <Portal user={user} userRoles={userRoles} isAdmin={isAdmin} onLogout={handleLogout} />
}
