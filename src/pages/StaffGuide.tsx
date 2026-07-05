import React, { useState } from 'react'
import { Shield, Crown, Zap, Eye, Flame, Heart, Star, ChevronDown, ChevronRight, BookOpen, Info, AlertTriangle, ExternalLink } from 'lucide-react'
import { getStaffGuides, type StaffRoleGuide } from '../data/store'

const iconMap: Record<string, React.ElementType> = {
  'staff-policies': BookOpen, 'head-administrator': Zap, 'senior-administrator': Crown,
  'administrator': Shield, 'junior-administrator': Crown, 'operations-manager': Zap,
  'community-manager': Heart, 'staff-coordinator': Crown, 'head-moderator': Star,
  'moderator': Eye, 'junior-moderator': Flame,
}

const tierColors: Record<string, { label: string; color: string }> = {
  policy:     { label: 'All Staff',      color: 'var(--red)' },
  leadership: { label: 'Leadership',     color: '#f59e0b' },
  admin:      { label: 'Administration', color: '#f472b6' },
  management: { label: 'Management',     color: '#5865f2' },
  mod:        { label: 'Moderation',     color: '#34d399' },
}

function parseMarkdown(text: string) {
  return text.split('\n').map((line, i) => {
    const isBullet = line.startsWith('- ') || line.startsWith('* ')
    const clean = line.replace(/^[-*]\s/, '')
    const parts = clean.split(/\*\*(.+?)\*\*/g)
    const rendered = parts.map((p, j) =>
      j % 2 === 1
        ? <strong key={j} style={{ color: 'var(--text)', fontWeight: 600 }}>{p}</strong>
        : <span key={j}>{p}</span>
    )
    return (
      <p key={i} style={{
        fontSize: 13, color: 'var(--dim)', lineHeight: 1.75, marginBottom: 4,
        paddingLeft: isBullet ? 16 : 0, position: 'relative',
      }}>
        {isBullet && <span style={{ position: 'absolute', left: 4, color: 'var(--muted)' }}>•</span>}
        {rendered}
      </p>
    )
  })
}

export default function StaffGuide() {
  const guides = getStaffGuides()
  const byTier: Record<string, StaffRoleGuide[]> = { policy: [], leadership: [], admin: [], mod: [] }
  guides.forEach(g => {
    const t = g.tier as string
    if (byTier[t]) byTier[t].push(g)
    else byTier['mod'].push(g)
  })

  const [activeId, setActiveId] = useState(guides[0]?.id ?? '')
  const active = guides.find(g => g.id === activeId) ?? guides[0]
  const ActiveIcon = active ? (iconMap[active.id] ?? Shield) : Shield
  const tierInfo = active ? tierColors[active.tier] : tierColors.policy

  if (!guides.length) return (
    <div className="page-section" style={{ paddingTop: 48, paddingBottom: 64, textAlign: 'center' }}>
      <p style={{ color: 'var(--muted)' }}>No staff guides have been configured yet.</p>
    </div>
  )

  return (
    <div className="page-section" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div className="section-header">
        <div className="section-label">Staff Information</div>
        <h1 className="section-title">Staff Guides</h1>
        <p className="section-desc" style={{ maxWidth: 540 }}>
          Role responsibilities, authority levels, escalation procedures, and how-to guides for each staff position in The SnowHaven Empire.
        </p>
      </div>

      {/* Info banner */}
      <div data-reveal className="card" style={{
        padding: '12px 16px', marginBottom: 32,
        borderColor: 'rgba(224,49,49,.15)', background: 'rgba(224,49,49,.04)',
        display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        <Info size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
          This guide is public so members understand what each staff role does and who to contact.
          For rules, see the <a href="/rules" style={{ color: 'var(--red)', fontWeight: 600 }}>Rules page</a>.
          For appeals, use the <a href="https://zepp.noxxbot.com/appeals/1466990155020898413" target="_blank" rel="noreferrer" style={{ color: 'var(--red)', fontWeight: 600 }}>official portal</a>.
        </p>
      </div>

      {/* Mobile picker */}
      <div className="staff-mobile" style={{ marginBottom: 20 }}>
        {(['policy', 'leadership', 'admin', 'mod'] as const).map(tier => {
          const group = byTier[tier]
          if (!group?.length) return null
          const ti = tierColors[tier]
          return (
            <div key={tier} style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: ti.color, marginBottom: 6 }}>
                {ti.label}
              </p>
              <div className="tab-bar" style={{ padding: 2 }}>
                {group.map(g => {
                  const Icon = iconMap[g.id] ?? Shield
                  const isActive = activeId === g.id
                  return (
                    <button key={g.id} onClick={() => setActiveId(g.id)} className={`tab-item${isActive ? ' active' : ''}`}
                      style={{ fontSize: 12, color: isActive ? g.color : undefined }}>
                      <Icon size={12} /> {g.roleName}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop layout */}
      <div style={{ display: 'flex', gap: 24 }}>
        {/* Sidebar */}
        <div className="staff-sidebar" style={{
          width: 200, flexShrink: 0, position: 'sticky', top: 80, alignSelf: 'flex-start',
        }}>
          {(['policy', 'leadership', 'admin', 'mod'] as const).map(tier => {
            const group = byTier[tier]
            if (!group?.length) return null
            const ti = tierColors[tier]
            return (
              <div key={tier} style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: ti.color, marginBottom: 6, paddingLeft: 2 }}>
                  {ti.label}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {group.map(g => {
                    const Icon = iconMap[g.id] ?? Shield
                    const isActive = activeId === g.id
                    return (
                      <button key={g.id} onClick={() => setActiveId(g.id)} style={{
                        width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8,
                        padding: '8px 10px', borderRadius: 'var(--radius)',
                        fontFamily: 'inherit', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                        background: isActive ? 'var(--bg2)' : 'transparent',
                        border: `1px solid ${isActive ? 'var(--border2)' : 'transparent'}`,
                        color: isActive ? g.color : 'var(--dim)',
                        transition: 'all .1s',
                      }}>
                        <Icon size={13} style={{ flexShrink: 0 }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.roleName}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Detail panel */}
        {active && (
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Role header */}
            <div className="card" data-reveal style={{
              padding: 22, marginBottom: 16,
              borderLeft: `3px solid ${active.color}`,
              background: `linear-gradient(135deg, ${active.color}08 0%, transparent 50%)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 'var(--radius)',
                  background: `${active.color}15`, border: `1px solid ${active.color}30`,
                  display: 'grid', placeItems: 'center', flexShrink: 0,
                }}>
                  <ActiveIcon size={24} color={active.color} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: active.color, letterSpacing: '-.01em' }}>{active.roleName}</h2>
                    <span className="badge" style={{
                      background: `${active.color}15`, color: active.color, border: `1px solid ${active.color}30`,
                    }}>
                      {tierInfo?.label}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginTop: 4 }}>{active.summary}</p>
                </div>
              </div>
            </div>

            {/* Sections */}
            {active.sections.map(sec => (
              <Accordion key={sec.id} title={sec.title} color={active.color}>
                {parseMarkdown(sec.content)}
              </Accordion>
            ))}

            {/* Footer note */}
            <div className="card" style={{
              marginTop: 20, padding: '14px 16px',
              borderColor: 'rgba(224,49,49,.15)', background: 'rgba(224,49,49,.04)',
              display: 'flex', alignItems: 'flex-start', gap: 10,
            }}>
              <AlertTriangle size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
                Questions about a specific staff action? Open a ticket in the Discord server or check the <a href="/faq" style={{ color: 'var(--red)', fontWeight: 600 }}>FAQ</a>.
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .staff-sidebar { display: none !important; }
        }
        @media (min-width: 769px) {
          .staff-mobile { display: none; }
        }
      `}</style>
    </div>
  )
}

function Accordion({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: 6 }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        padding: '12px 14px', background: open ? 'var(--bg1)' : 'var(--bg0)', border: 'none',
        fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: open ? color : 'var(--text)',
        cursor: 'pointer', transition: 'all .15s',
      }}>
        {title}
        <ChevronDown size={14} color="var(--muted)" style={{
          flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }} />
      </button>
      {open && (
        <div style={{ padding: '12px 16px 16px', background: 'var(--bg0)', borderTop: '1px solid var(--border)' }}>
          {children}
        </div>
      )}
    </div>
  )
}
