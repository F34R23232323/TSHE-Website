import React, { useState } from 'react'
import {
  Crown, Shield, Eye, Zap, Flame, Moon, Settings,
  Swords, Landmark, Users, ChevronDown, ChevronRight,
  BookOpen, AlertTriangle, Info, ExternalLink, Heart, Star,
  Wrench, Cpu,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { getStaffGuides, type StaffRoleGuide } from '../data/store'

// Icon map by role id
const iconMap: Record<string, React.ElementType> = {
  'staff-policies':         BookOpen,
  'head-administrator':     Zap,
  'senior-administrator':   Crown,
  'administrator':          Shield,
  'junior-administrator':   Settings,
  'operations-manager':     Cpu,
  'community-manager':      Heart,
  'staff-coordinator':      Users,
  'head-moderator':         Star,
  'moderator':              Eye,
  'junior-moderator':       Flame,
}

const tierLabels: Record<string, { label: string; color: string }> = {
  policy:     { label: 'All Staff',      color: '#7ec8e3' },
  owner:      { label: 'Owners',         color: '#f59e0b' },
  admin:      { label: 'Administration', color: '#f472b6' },
  management: { label: 'Management',     color: '#5865f2' },
  mod:        { label: 'Moderation',     color: '#34d399' },
}

function hexAlpha(hex: string, a: number) {
  try {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
    return `rgba(${r},${g},${b},${a})`
  } catch { return `rgba(126,200,227,${a})` }
}

function parseContent(text: string) {
  return text.split('\n').map((line, i) => {
    const isBullet = line.startsWith('- ') || line.startsWith('* ')
    const clean    = line.replace(/^[-*]\s/, '')
    // bold **...**
    const parts = clean.split(/\*\*(.+?)\*\*/g)
    const rendered = parts.map((p, j) =>
      j % 2 === 1
        ? <strong key={j} style={{ color: 'var(--text)', fontWeight: 700 }}>{p}</strong>
        : <span key={j}>{p}</span>
    )
    return (
      <p key={i} style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.75, marginBottom: '.3rem', paddingLeft: isBullet ? '1rem' : 0, position: 'relative' }}>
        {isBullet && <span style={{ position: 'absolute', left: 0, color: 'var(--muted)' }}>•</span>}
        {rendered}
      </p>
    )
  })
}

function SectionAccordion({ section, color }: { section: { id: string; title: string; content: string }; color: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '.65rem', overflow: 'hidden', marginBottom: '.5rem' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.75rem',
        padding: '.8rem 1rem', background: open ? 'var(--bg3)' : 'var(--bg2)', border: 'none', cursor: 'pointer', transition: 'background .15s',
      }}>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: '.76rem', fontWeight: 600, color: open ? color : 'var(--text)', letterSpacing: '.04em' }}>
          {section.title}
        </span>
        <ChevronDown size={13} color="var(--muted)" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
      </button>
      {open && (
        <div style={{ padding: '1rem 1.1rem', background: 'var(--bg1)', borderTop: '1px solid var(--border)' }}>
          {parseContent(section.content)}
        </div>
      )}
    </div>
  )
}

function RoleCard({ guide, active, onClick }: { guide: StaffRoleGuide; active: boolean; onClick: () => void }) {
  const Icon = iconMap[guide.id] ?? Shield
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '.75rem',
      padding: '.75rem .9rem', borderRadius: '.7rem', cursor: 'pointer',
      background: active ? hexAlpha(guide.color, .1) : 'transparent',
      border: `1px solid ${active ? hexAlpha(guide.color, .35) : 'transparent'}`,
      transition: 'all .15s', marginBottom: '.25rem',
    }}>
      <div style={{ width: 32, height: 32, borderRadius: '.45rem', flexShrink: 0, background: hexAlpha(guide.color, .15), border: `1px solid ${hexAlpha(guide.color, .3)}`, display: 'grid', placeItems: 'center' }}>
        <Icon size={15} color={guide.color} strokeWidth={1.75} />
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.74rem', fontWeight: 700, color: active ? guide.color : 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{guide.roleName}</p>
        <p style={{ fontSize: '.63rem', color: 'var(--muted)', marginTop: '.1rem' }}>{tierLabels[guide.tier]?.label}</p>
      </div>
    </button>
  )
}

export default function StaffGuide() {
  useScrollReveal()
  const guides = getStaffGuides()

  // Group by tier
  const byTier: Record<string, StaffRoleGuide[]> = { policy: [], leadership: [], admin: [], mod: [] }
  guides.forEach(g => {
    const t = g.tier as string
    if (byTier[t]) byTier[t].push(g)
    else byTier['mod'].push(g)
  })

  const [activeId, setActiveId] = useState(guides[0]?.id ?? '')
  const active = guides.find(g => g.id === activeId) ?? guides[0]
  const ActiveIcon = active ? (iconMap[active.id] ?? Shield) : Shield

  if (!guides.length) return (
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', padding: '6rem 1.5rem', textAlign: 'center' }}>
      <p style={{ color: 'var(--muted)' }}>No staff guides have been configured yet.</p>
    </div>
  )

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div data-reveal style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'rgba(248,113,113,.07)', border: '1px solid rgba(248,113,113,.2)', borderRadius: 99, padding: '.3rem .9rem', fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.12em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <Shield size={10} /> Staff Information
          </div>
          <h1 data-reveal data-delay="1" style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-.01em', marginBottom: '.75rem', background: 'linear-gradient(135deg, var(--ice3), var(--ice), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Staff Guides
          </h1>
          <p data-reveal data-delay="2" style={{ fontSize: '.88rem', color: 'var(--dim)', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>
            Role responsibilities, authority levels, escalation procedures, and how-to guides for each staff position in The SnowHaven Empire.
          </p>
        </div>

        {/* Info banner */}
        <div data-reveal style={{ background: 'rgba(126,200,227,.05)', border: '1px solid rgba(126,200,227,.15)', borderRadius: '.75rem', padding: '.85rem 1.1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '.65rem' }}>
          <Info size={14} color="var(--ice)" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.7 }}>
            This guide is publicly available so members can understand what each staff role does and who to contact for different situations.
            For rule queries, use the <a href="/rules" style={{ color: 'var(--ice)' }}>Rules page</a>. For appeals, use the <a href="/faq" style={{ color: 'var(--ice)' }}>FAQ</a>.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="staff-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', alignItems: 'start' }}>

          {/* Sidebar — role list (hidden on mobile, shown on desktop) */}
          <div className="staff-sidebar" style={{ position: 'sticky', top: 80 }}>
            {(['policy', 'leadership', 'admin', 'mod'] as const).map(tier => {
              const group = byTier[tier]
              if (!group?.length) return null
              const tInfo = tierLabels[tier]
              return (
                <div key={tier} style={{ marginBottom: '1.25rem' }}>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase', color: tInfo.color, marginBottom: '.5rem', paddingLeft: '.25rem' }}>
                    {tInfo.label}
                  </p>
                  {group.map(g => (
                    <RoleCard key={g.id} guide={g} active={activeId === g.id} onClick={() => setActiveId(g.id)} />
                  ))}
                </div>
              )
            })}
          </div>

          {/* Detail panel */}
          {active && (
            <div>
              {/* Role header */}
              <div style={{ background: 'var(--bg1)', border: `1px solid ${hexAlpha(active.color, .25)}`, borderRadius: '1rem', padding: '1.75rem', marginBottom: '1.25rem', backgroundImage: `linear-gradient(135deg, ${hexAlpha(active.color, .07)} 0%, transparent 55%)` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '.8rem', flexShrink: 0, background: hexAlpha(active.color, .15), border: `1px solid ${hexAlpha(active.color, .35)}`, display: 'grid', placeItems: 'center', animation: 'glowPulse 4s ease-in-out infinite' }}>
                    <ActiveIcon size={26} color={active.color} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', flexWrap: 'wrap', marginBottom: '.3rem' }}>
                      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', fontWeight: 700, color: active.color }}>{active.roleName}</h2>
                      <span style={{ fontSize: '.6rem', fontFamily: 'Cinzel, serif', letterSpacing: '.08em', padding: '2px 9px', borderRadius: 4, background: hexAlpha(active.color, .12), border: `1px solid ${hexAlpha(active.color, .3)}`, color: active.color }}>
                        {tierLabels[active.tier]?.label}
                      </span>
                    </div>
                    <p style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>{active.summary}</p>
                  </div>
                </div>
              </div>

              {/* Sections */}
              {active.sections.map(sec => (
                <SectionAccordion key={sec.id} section={sec} color={active.color} />
              ))}

              {/* Need help */}
              <div style={{ marginTop: '1.5rem', background: 'rgba(126,200,227,.04)', border: '1px solid rgba(126,200,227,.12)', borderRadius: '.75rem', padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                <AlertTriangle size={14} color="var(--ice)" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '.77rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                  Questions about a specific staff action? Open a ticket in the Discord server or use the{' '}
                  <a href="/faq" style={{ color: 'var(--ice)' }}>FAQ</a> for common questions.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile horizontal role picker (shown only on small screens) */}
        <div className="staff-mobile-picker">
          {(['policy', 'leadership', 'admin', 'mod'] as const).map(tier => {
            const group = byTier[tier]
            if (!group?.length) return null
            const tInfo = tierLabels[tier]
            return (
              <div key={tier} style={{ marginBottom: '1rem' }}>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase', color: tInfo.color, marginBottom: '.4rem', paddingLeft: '.1rem' }}>
                  {tInfo.label}
                </p>
                <div style={{ display: 'flex', gap: '.5rem', overflowX: 'auto', paddingBottom: '.35rem' }}>
                  {group.map(g => {
                    const BtnIcon = iconMap[g.id] ?? Shield
                    const isActive = activeId === g.id
                    return (
                      <button key={g.id} onClick={() => setActiveId(g.id)} style={{
                        flexShrink: 0, display: 'flex', alignItems: 'center', gap: '.45rem',
                        padding: '.45rem .75rem', borderRadius: '.6rem', cursor: 'pointer',
                        background: isActive ? hexAlpha(g.color, .15) : 'var(--bg2)',
                        border: `1px solid ${isActive ? hexAlpha(g.color, .4) : 'var(--border)'}`,
                        color: isActive ? g.color : 'var(--muted)',
                        fontFamily: 'Cinzel, serif', fontSize: '.68rem', fontWeight: 600,
                        whiteSpace: 'nowrap', transition: 'all .15s',
                      }}>
                        <BtnIcon size={12} color={isActive ? g.color : 'var(--muted)'} />
                        {g.roleName}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <style>{`
          /* Desktop: two-column grid, hide mobile picker */
          .staff-mobile-picker { display: none; }

          /* Mobile: single column, hide sidebar, show picker above detail */
          @media (max-width: 700px) {
            .staff-grid {
              grid-template-columns: 1fr !important;
            }
            .staff-sidebar {
              display: none !important;
            }
            .staff-mobile-picker {
              display: block;
              margin-bottom: 1.25rem;
            }
          }
        `}</style>
      </div>
    </div>
  )
}
