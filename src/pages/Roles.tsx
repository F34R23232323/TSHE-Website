import React, { useState } from 'react'
import { Trophy, Crown, Shield, Bell, Zap, Gift, Star, TrendingUp, Users, Flame, Wrench, Power, Calendar, ThumbsUp, Upload, Heart, Eye, Megaphone, Skull, Image, Link, Smile, Sparkles, Hammer, Leaf, Wand2, Infinity, Anchor, Medal, Bot } from 'lucide-react'

const t_zap = (t: string) => t

// Permission unlocks from real plugin configs
const unlockedByLevel = [
  { level: 10, perks: ['External Emojis', 'Stickers'], icons: [Smile, Star], color: '#facc15' },
  { level: 20, perks: ['Link Sharing', 'Embeds'], icons: [Link, Sparkles], color: '#60a5fa' },
  { level: 30, perks: ['Image Posting'], icons: [Image], color: '#a78bfa' },
]

const modUnlocks = [
  { level: 40, label: 'Moderation tools', desc: 'Warnings, mutes, kicks, bans, view cases, note users, clean messages' },
  { level: 50, label: 'Full moderation', desc: 'Mass mute/ban, hide/delete cases, act-as-other, handle reports, lock channels' },
  { level: 80, label: 'Server management', desc: 'Reload guild, run source, ping everyone/here, manage appeals' },
  { level: 100, label: 'Owner tools', desc: 'Complete bypass of all AutoMod rules except CSAM, full config access' },
]

const levelRoles = [
  { level: 1,   name: 'Newbie',        icon: Star,      color: '#a0a0b0' },
  { level: 5,   name: 'Starter',       icon: Sparkles,  color: '#f59e0b' },
  { level: 10,  name: 'Active',        icon: Zap,       color: '#facc15' },
  { level: 15,  name: 'Pro',           icon: Flame,     color: '#34d399' },
  { level: 20,  name: 'Good Member',   icon: TrendingUp,color: '#60a5fa' },
  { level: 30,  name: 'Touch Grass',   icon: Leaf,      color: '#a78bfa' },
  { level: 40,  name: 'Ace',           icon: Wand2,     color: '#f472b6' },
  { level: 60,  name: 'Legend',        icon: Infinity,  color: '#e879f9' },
  { level: 80,  name: 'Mythic',        icon: Anchor,    color: '#f97316' },
  { level: 100, name: 'Godlike',       icon: Trophy,    color: '#f87171' },
  { level: 999, name: 'First Place',   icon: Medal,     color: '#c9a84c' },
]

const staffRoles = [
  { name: 'Co-Founder & Lead Developer', icon: Zap,    level: 100, color: '#f59e0b', desc: 'Ultimate authority of TSHE. Full bot access, exempt from all AutoMod rules. Held by ItzF34R.' },
  { name: 'Co-Founder',                  icon: Crown,  level: 100, color: '#f59e0b', desc: 'Co-Founder of TSHE. Full access and authority alongside the Lead Developer.' },
  { name: 'Head Administrator',          icon: Crown,  level: 95,  color: '#ed4245', desc: 'Highest authority below Owners. Holds Administrator permission with full bot access. Not publicly obtainable.' },
  { name: 'Senior Administrator',        icon: Shield, level: 90,  color: '#f57c00', desc: 'Oversees admins, manages server configuration, and handles major escalations.' },
  { name: 'Administrator',               icon: Shield, level: 85,  color: '#f87171', desc: 'Handles elevated moderation, server configuration, and bridges Management with Moderation.' },
  { name: 'Junior Administrator',        icon: Wrench, level: 80,  color: '#f57c00', desc: 'Entry-level administration. Handles moderate server management and bridges Moderation with Administration.' },
  { name: 'Operations Manager',          icon: Bot,    level: 75,  color: '#5865f2', desc: 'Technical leadership. Manages bots, infrastructure, the website, and backend systems. Highest apply-able role.' },
  { name: 'Community Manager',           icon: Heart,  level: 70,  color: '#5865f2', desc: 'Community leadership. Oversees events, engagement, channel structure, and member experience.' },
  { name: 'Staff Coordinator',           icon: Users,  level: 65,  color: '#5865f2', desc: 'Staff leadership. Manages staff performance, conduct, recruitment, and training.' },
  { name: 'Head Moderator',              icon: Star,   level: 60,  color: '#60a5fa', desc: 'Moderation lead. Handles escalated cases, mentors juniors. Promoted from Moderator.' },
  { name: 'Moderator',                   icon: Eye,    level: 50,  color: '#34d399', desc: 'Frontline moderation. Daily rule enforcement, warnings, mutes, kicks, and temporary bans.' },
  { name: 'Junior Moderator',            icon: Flame,  level: 40,  color: '#34d399', desc: 'Entry-level moderation. First step into the team. Evaluated on judgement before promotion.' },
]

const pingRoles = [
  { name: 'Announcements',       icon: Megaphone, color: '#f59e0b', desc: 'Major server announcements from the team.' },
  { name: 'Bot Updates',         icon: Wrench,    color: '#60a5fa', desc: 'Changelogs and updates to server bots.' },
  { name: 'Bot Status',          icon: Power,     color: '#60a5fa', desc: 'Bot outages, restarts, and status changes.' },
  { name: 'Server Updates',      icon: Hammer,    color: '#a78bfa', desc: 'Channel additions, rule changes, and structure updates.' },
  { name: 'Votes',               icon: ThumbsUp,  color: '#34d399', desc: 'Community votes and polls for server decisions.' },
  { name: 'Dead Chat Revive',    icon: Skull,     color: '#f87171', desc: 'Ping for when the chat needs reviving.' },
  { name: 'Events Ping',         icon: Calendar,  color: '#f472b6', desc: 'Community events, game nights, and activities.' },
  { name: 'Giveaways',           icon: Gift,      color: '#e879f9', desc: 'Server giveaways and prize announcements.' },
  { name: 'Upload Pings',        icon: Upload,    color: '#94a3b8', desc: 'New content uploads and media posts.' },
  { name: 'Partners Ping',       icon: Heart,     color: '#facc15', desc: 'Partner server announcements and promotions.' },
  { name: 'Sneak Peaks',         icon: Eye,       color: 'var(--red)', desc: 'Early previews of upcoming bot features and content.' },
  { name: "F34R's News",         icon: Zap,       color: '#f59e0b', desc: "F34R's personal news and project updates." },
  { name: 'Question of the Day', icon: ThumbsUp,  color: '#34d399', desc: 'Daily QOTD pings for community engagement.' },
]

const selfRoles = [
  { category: 'Age Bracket', roles: ['13-15', '16-17', '18+', 'Prefer Not To Say'], exclusive: true },
  { category: 'Relationship Status', roles: ['Taken', 'Single'], exclusive: true },
  { category: 'DM Status', roles: ['DMs Open', 'Ask to DM', 'DMs Closed'], exclusive: true },
  { category: 'Gaming Platforms', roles: ['PC', 'XBOX', 'PlayStation', 'Switch', 'Mobile'], exclusive: false },
]

export default function Roles() {
  const [tab, setTab] = useState<'levels' | 'staff' | 'pings' | 'self'>('levels')

  const getLevelPerks = (lvl: number) => unlockedByLevel.filter(p => lvl >= p.level)

  return (
    <div className="page-section" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div className="section-header">
        <div className="section-label">Roles &amp; Leveling</div>
        <h1 className="section-title">Server Roles</h1>
        <p className="section-desc" style={{ maxWidth: 520 }}>
          Level up by being active in chat to unlock permissions. All perks are cumulative — higher levels keep perks from below. Staff roles shown for transparency.
        </p>
      </div>

      {/* Tab bar */}
      <div className="tab-bar" style={{ marginBottom: 32 }}>
        {[
          { id: 'levels' as const, label: 'Level Roles', icon: TrendingUp },
          { id: 'staff' as const,  label: 'Staff Ranks', icon: Shield },
          { id: 'pings' as const,  label: 'Ping Roles',  icon: Bell },
          { id: 'self' as const,   label: 'Self Roles',  icon: Users },
        ].map(t => {
          const Icon = t.icon
          return (
            <button key={t.id} type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setTab(t.id) }}
              className={`tab-item${tab === t.id ? ' active' : ''}`}
              style={{ padding: '8px 16px', minHeight: 36 }}>
              <Icon size={13} /> {t.label}
            </button>
          )
        })}
      </div>

      {/* ── LEVEL ROLES ── */}
      {tab === 'levels' && (
        <>
          {/* VIP callout */}
          <div data-reveal className="card" style={{
            padding: '16px 20px', marginBottom: 24,
            borderColor: 'rgba(230,180,34,.25)',
            background: 'linear-gradient(135deg, rgba(230,180,34,.05), rgba(230,180,34,0))',
            display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 'var(--radius)',
                background: 'rgba(230,180,34,.12)', border: '1px solid rgba(230,180,34,.25)',
                display: 'grid', placeItems: 'center', flexShrink: 0,
              }}>
                <Crown size={18} color="var(--gold)" />
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold)' }}>VIP &amp; Nitro Boosters</h3>
                <p style={{ fontSize: 12, color: 'var(--muted)' }}>Skip the grind — all permission tiers unlocked immediately.</p>
              </div>
            </div>
          </div>

          {/* Unlock milestones */}
          <div data-reveal className="card" style={{ padding: 20, marginBottom: 24 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 14 }}>Permission Unlock Milestones</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              {unlockedByLevel.map(m => (
                <div key={m.level} style={{
                  background: 'var(--bg0)', borderRadius: 'var(--radius)', padding: 14,
                  borderLeft: `3px solid ${m.color}`,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: m.color, marginBottom: 8 }}>Level {m.level}+</div>
                  {m.perks.map((p, i) => {
                    const Icon = m.icons[i]
                    return (
                      <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontSize: 13, color: 'var(--dim)' }}>
                        <Icon size={12} color={m.color} /> {p}
                      </div>
                    )
                  })}
                  <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
                    {m.level >= 30 ? 'Includes all previous perks' : m.level >= 20 ? 'Includes Level 10+ perks' : 'First unlock milestone'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Level Roles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[...levelRoles].reverse().map(r => {
              const perks = getLevelPerks(r.level)
              const Icon = r.icon
              return (
                <div key={r.name} data-reveal className="card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 'var(--radius)',
                    background: `${r.color}15`, border: `1px solid ${r.color}30`,
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}>
                    <Icon size={16} color={r.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: r.color }}>{r.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                      {r.level === 999 ? '#1 Leaderboard' : `Level ${r.level}`}
                    </span>
                  </div>
                  {perks.length > 0 && (
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {perks.map(p => (
                        <span key={p.perks[0]} className="badge" style={{ background: `${p.color}15`, color: p.color, borderColor: `${p.color}30` }}>
                          {p.perks[0]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Staff unlock table */}
          <div data-reveal style={{ marginTop: 32 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 14 }}>Staff Level Thresholds</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {modUnlocks.map(m => (
                <div key={m.level} className="card" style={{
                  padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 14,
                  borderLeft: '3px solid var(--red)',
                }}>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 800, color: 'var(--red)',
                    minWidth: 32, textAlign: 'center',
                  }}>{m.level}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── STAFF RANKS ── */}
      {tab === 'staff' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {staffRoles.map(r => {
            const Icon = r.icon
            return (
              <div key={r.name} data-reveal className="card" style={{
                padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 14,
                borderLeft: `3px solid ${r.color}`,
                background: `linear-gradient(135deg, ${r.color}08 0%, transparent 60%)`,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 'var(--radius)',
                  background: `${r.color}15`, border: `1px solid ${r.color}30`,
                  display: 'grid', placeItems: 'center', flexShrink: 0,
                }}>
                  <Icon size={18} color={r.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: r.color }}>{r.name}</span>
                    <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>Level {r.level}</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{r.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── PING ROLES ── */}
      {tab === 'pings' && (
        <>
          <div data-reveal className="card" style={{ padding: 14, marginBottom: 20, borderColor: 'rgba(224,49,49,.15)', background: 'rgba(224,49,49,.04)' }}>
            <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
              Ping roles let you opt into specific notifications. Head to <strong style={{ color: 'var(--text)' }}>#get-roles</strong> in the server to select which pings you want.
            </p>
          </div>
          <div className="card-grid">
            {pingRoles.map(r => {
              const Icon = r.icon
              return (
                <div key={r.name} data-reveal className="card" style={{ padding: 14, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 'var(--radius)',
                    background: `${r.color}15`, border: `1px solid ${r.color}28`,
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}>
                    <Icon size={16} color={r.color} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: r.color, marginBottom: 2 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{r.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* ── SELF ROLES ── */}
      {tab === 'self' && (
        <>
          <div data-reveal className="card" style={{ padding: 14, marginBottom: 20, borderColor: 'rgba(77,171,247,.15)', background: 'rgba(77,171,247,.04)' }}>
            <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7 }}>
              Self-assignable roles in <strong style={{ color: 'var(--text)' }}>#get-roles</strong>. Use the dropdown menus — picking a new exclusive option removes your previous one. Toggle roles allow multiple selections.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {selfRoles.map(cat => (
              <div key={cat.category} className="card" data-reveal style={{ padding: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Users size={14} color="var(--blue)" />
                  <h3 style={{ fontSize: 14, fontWeight: 700 }}>{cat.category}</h3>
                  <span className="badge" style={{ background: cat.exclusive ? 'var(--red-bg)' : 'var(--green-bg)', color: cat.exclusive ? 'var(--red)' : 'var(--green)', borderColor: cat.exclusive ? 'var(--red-brd)' : 'rgba(55,178,77,.2)' }}>
                    {cat.exclusive ? 'Pick One' : 'Multiple'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {cat.roles.map(role => (
                    <span key={role} className="badge badge-blue">{role}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
