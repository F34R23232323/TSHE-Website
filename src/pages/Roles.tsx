import React, { useState } from 'react'
import {
  TrendingUp, Crown, Bell, Shield, Star, Zap, Gift,
  Trophy, Sparkles, Flame, Leaf, Wand2, Infinity, Swords,
  Users, Landmark, Settings, Moon, Eye, Megaphone,
  Wrench, Power, Hammer, ThumbsUp, Skull, Calendar,
  Upload, Heart, AlertCircle, Bot, Medal, Anchor, Cpu,
  Image as ImageIcon, Link as LinkIcon, Smile,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

// All perks are cumulative — higher level = all lower perks included
const ALL_PERKS = [
  { key: 'emojis',   label: 'External Emojis', Icon: Smile,       color: '#facc15', since: 10 },
  { key: 'stickers', label: 'Stickers',         Icon: Star,        color: '#facc15', since: 10 },
  { key: 'links',    label: 'Link Sharing',     Icon: LinkIcon,    color: '#60a5fa', since: 20 },
  { key: 'embeds',   label: 'Embeds',           Icon: Sparkles,    color: '#60a5fa', since: 20 },
  { key: 'images',   label: 'Image Posting',    Icon: ImageIcon,   color: '#a78bfa', since: 30 },
]

function getPerks(level: number) {
  return ALL_PERKS.filter(p => level >= p.since)
}

interface LevelRole {
  level: number
  name: string
  Icon: React.ElementType
  color: string
  req: string
}

const levelRoles: LevelRole[] = [
  { level: 1,   name: 'Newbie',        Icon: Star,      color: '#a0a0b0', req: 'Level 1+'        },
  { level: 5,   name: 'Starter',       Icon: Sparkles,  color: '#f59e0b', req: 'Level 5'        },
  { level: 10,  name: 'Active',        Icon: Zap,       color: '#facc15', req: 'Level 10'       },
  { level: 15,  name: 'Pro',           Icon: Flame,     color: '#34d399', req: 'Level 15'       },
  { level: 20,  name: 'Good Member',   Icon: TrendingUp,color: '#60a5fa', req: 'Level 20'       },
  { level: 30,  name: 'Touch Grass',   Icon: Leaf,      color: '#a78bfa', req: 'Level 30'       },
  { level: 40,  name: 'Ace',           Icon: Wand2,     color: '#f472b6', req: 'Level 40'       },
  { level: 60,  name: 'Legend',        Icon: Infinity,  color: '#e879f9', req: 'Level 60'       },
  { level: 80,  name: 'Mythic',        Icon: Anchor,    color: '#f97316', req: 'Level 80'       },
  { level: 100, name: 'Godlike',       Icon: Trophy,    color: '#f87171', req: 'Level 100'      },
  { level: 999, name: 'First Place',   Icon: Medal,     color: '#c9a84c', req: '#1 Leaderboard'  },
]

interface StaffRole {
  name: string
  Icon: React.ElementType
  color: string
  desc: string
}

const staffRoles: StaffRole[] = [
  { 
    name: 'Co-Founder & Lead Developer', 
    Icon: Zap, 
    color: '#f59e0b', 
    desc: 'Ultimate authority of TSHE — Level 100. Full bot access, exempt from all AutoMod rules. Held by ItzF34RLESS.mp4.' 
  },
  { 
    name: 'Co-Founder', 
    Icon: Zap, 
    color: '#f59e0b', 
    desc: 'Co-Founder of TSHE — Level 100. Full access and authority alongside the Lead Developer. Held by F34R\'s Sweet Princess.' 
  },
  { 
    name: 'Head Administrator', 
    Icon: Crown, 
    color: '#ed4245', 
    desc: 'Highest authority below Owners — Level 95. Holds Administrator permission with full bot access. Not a publicly obtainable role.'
  },
  { 
    name: 'Senior Administrator', 
    Icon: Shield, 
    color: '#f57c00', 
    desc: 'Senior administration — Level 90. Oversees admins, manages server config, and handles major escalations. Second-highest authority below Head Admin.'
  },
  { 
    name: 'Administrator', 
    Icon: Shield, 
    color: '#f87171', 
    desc: 'Administration — Level 85. Handles elevated moderation, server configuration, and bridges Management with Moderation.'
  },
  { 
    name: 'Junior Administrator', 
    Icon: Settings, 
    color: '#f57c00', 
    desc: 'Entry-level administration — Level 80. Handles moderate server management and bridges Moderation with Administration.'
  },
  { 
    name: 'Operations Manager', 
    Icon: Cpu, 
    color: '#5865f2', 
    desc: 'Technical leadership — Level 75. Manages bots, infrastructure, the website, and all backend systems. Highest apply-able role.'
  },
  { 
    name: 'Community Manager', 
    Icon: Heart, 
    color: '#5865f2', 
    desc: 'Community leadership — Level 70. Oversees events, engagement, channel structure, and member experience.'
  },
  { 
    name: 'Staff Coordinator', 
    Icon: Users, 
    color: '#5865f2', 
    desc: 'Staff leadership — Level 65. Manages staff performance, conduct, recruitment, and training.'
  },
  { 
    name: 'Head Moderator', 
    Icon: Star, 
    color: '#60a5fa', 
    desc: 'Moderation lead — Level 60. Handles escalated cases, mentors junior mods, and acts as the first escalation point. Promoted from Moderator.'
  },
  { 
    name: 'Moderator', 
    Icon: Eye, 
    color: '#34d399', 
    desc: 'Frontline moderation — Level 50. Daily rule enforcement, warnings, mutes, kicks, and temporary bans.'
  },
  { 
    name: 'Junior Moderator', 
    Icon: Flame, 
    color: '#34d399', 
    desc: 'Entry-level moderation — Level 40. First step into the team. Evaluated on judgement before promotion to Moderator.'
  },
]

interface PingRole {
  name: string
  Icon: React.ElementType
  color: string
  desc: string
}

const pingRoles: PingRole[] = [
  { name: 'Announcements',    Icon: Megaphone,    color: '#f59e0b', desc: 'Major server announcements from the team.'             },
  { name: 'Bot Updates',      Icon: Wrench,       color: '#60a5fa', desc: 'Changelogs and updates to server bots.'                 },
  { name: 'Bot Status',       Icon: Power,        color: '#60a5fa', desc: 'Bot outages, restarts, and status changes.'            },
  { name: 'Server Updates',   Icon: Hammer,       color: '#a78bfa', desc: 'Channel additions, rule changes, and structure updates.'},
  { name: 'Votes',            Icon: ThumbsUp,     color: '#34d399', desc: 'Community votes and polls for server decisions.'       },
  { name: 'Dead Chat Revive', Icon: Skull,        color: '#f87171', desc: 'Ping for when the chat needs reviving.'               },
  { name: 'Events Ping',      Icon: Calendar,     color: '#f472b6', desc: 'Community events, game nights, and activities.'        },
  { name: 'Giveaways',        Icon: Gift,         color: '#e879f9', desc: 'Server giveaways and prize announcements.'             },
  { name: 'Upload Pings',     Icon: Upload,       color: '#94a3b8', desc: 'New content uploads and media posts.'                  },
  { name: 'Partners Ping',    Icon: Heart,        color: '#facc15', desc: 'Partner server announcements and promotions.'          },
  { name: 'Sneak Peaks',      Icon: Eye,          color: '#7ec8e3', desc: 'Early previews of upcoming bot features and content.'  },
  { name: "F34R's News",      Icon: Zap,           color: '#f59e0b', desc: "F34R's personal news and project updates."           },
  { name: 'Question Of The Day', Icon: ThumbsUp,  color: '#34d399', desc: 'Daily QOTD pings for community engagement.'           },
]

function Tab({ id, label, icon: Icon, active, onClick, color }: any) {
  return (
    <button onClick={() => onClick(id)} style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem',
      fontFamily: 'Cinzel, serif', fontSize: '.68rem', letterSpacing: '.07em', fontWeight: 700,
      cursor: 'pointer', padding: '.6rem .75rem', borderRadius: '.55rem',
      background: active ? 'var(--bg4)' : 'transparent',
      border: `1px solid ${active ? color : 'transparent'}`,
      color: active ? color : 'var(--muted)',
      transition: 'all .15s',
    }}>
      <Icon size={13} /> {label}
    </button>
  )
}

export default function Roles() {
  useScrollReveal()
  const [tab, setTab] = useState<'levels' | 'staff' | 'pings'>('levels')

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div data-reveal style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.2)',
            borderRadius: 99, padding: '.3rem .9rem',
            fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.12em',
            color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            <Crown size={10} /> Roles &amp; Leveling
          </div>
          <h1 data-reveal data-delay="1" style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700,
            letterSpacing: '-.01em', marginBottom: '.75rem',
            background: 'linear-gradient(135deg, var(--gold2), var(--gold), var(--ice))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Server Roles</h1>
          <p data-reveal data-delay="2" style={{ fontSize: '.88rem', color: 'var(--dim)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
            Level up by being active in chat to unlock permissions. All perks are cumulative — higher roles keep every perk from levels below.
          </p>
        </div>

        {/* VIP callout */}
        <div data-reveal style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,.08), rgba(126,200,227,.06))',
          border: '1px solid rgba(201,168,76,.25)',
          borderRadius: '1rem', padding: '1.1rem 1.5rem',
          display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <div style={{
              width: 40, height: 40, borderRadius: '.6rem', flexShrink: 0,
              background: 'rgba(201,168,76,.15)', border: '1px solid rgba(201,168,76,.3)',
              display: 'grid', placeItems: 'center',
            }}>
              <Crown size={20} color="var(--gold)" />
            </div>
            <div>
              <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.82rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '.15rem' }}>VIP &amp; Nitro Boosters</p>
              <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.6 }}>Skip the grind — all permission tiers unlocked immediately.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.45rem', flexWrap: 'wrap', marginLeft: 'auto' }}>
            {ALL_PERKS.map(p => (
              <span key={p.key} style={{
                display: 'inline-flex', alignItems: 'center', gap: '.3rem',
                fontSize: '.62rem', fontFamily: 'Cinzel, serif', letterSpacing: '.05em',
                padding: '3px 9px', borderRadius: 4,
                background: 'rgba(201,168,76,.12)', border: '1px solid rgba(201,168,76,.25)', color: 'var(--gold)',
              }}>
                <p.Icon size={10} /> {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div data-reveal style={{
          display: 'flex', gap: '.35rem', background: 'var(--bg2)',
          padding: '.35rem', borderRadius: '.7rem', border: '1px solid var(--border)', marginBottom: '2rem',
        }}>
          <Tab id="levels" label="Level Roles" icon={TrendingUp} active={tab==='levels'} onClick={setTab} color="var(--gold)"  />
          <Tab id="staff"  label="Staff Ranks" icon={Shield}     active={tab==='staff'}  onClick={setTab} color="var(--red)"   />
          <Tab id="pings"  label="Ping Roles"  icon={Bell}       active={tab==='pings'}  onClick={setTab} color="var(--ice)"   />
        </div>

        {/* ── LEVEL ROLES ── */}
        {tab === 'levels' && (
          <div>
            {/* Perks legend */}
            <div data-reveal style={{
              background: 'var(--bg1)', border: '1px solid var(--border)',
              borderRadius: '1rem', padding: '1.25rem 1.5rem', marginBottom: '1.5rem',
            }}>
              <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>Permission Unlock Milestones</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '.85rem' }}>
                {[
                  { level: 10, perks: ['External Emojis', 'Stickers'],       icons: [Smile, Star],                   color: '#facc15' },
                  { level: 20, perks: ['Link Sharing', 'Embeds'],             icons: [LinkIcon, Sparkles],             color: '#60a5fa' },
                  { level: 30, perks: ['Image Posting'],                      icons: [ImageIcon],                      color: '#a78bfa' },
                ].map(m => (
                  <div key={m.level} style={{
                    background: 'var(--bg2)', borderRadius: '.65rem', padding: '1rem',
                    borderLeft: `3px solid ${m.color}`,
                  }}>
                    <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.72rem', fontWeight: 800, color: m.color, marginBottom: '.55rem' }}>Level {m.level}+</p>
                    {m.perks.map((p, i) => {
                      const Icon = m.icons[i]
                      return (
                        <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '.25rem' }}>
                          <Icon size={12} color={m.color} />
                          <span style={{ fontSize: '.75rem', color: 'var(--dim)' }}>{p}</span>
                        </div>
                      )
                    })}
                    <p style={{ fontSize: '.68rem', color: 'var(--muted)', marginTop: '.45rem', lineHeight: 1.55 }}>
                      {m.level >= 30 ? 'Includes all previous perks' : m.level >= 20 ? 'Includes Level 10+ perks' : 'First unlock milestone'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Role list — reversed (highest first) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {[...levelRoles].reverse().map((r, i) => {
                const perks = getPerks(r.level)
                const Icon = r.Icon
                return (
                  <div key={r.name} data-reveal data-delay={String((i % 4) + 1)} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    background: 'var(--bg1)', border: '1px solid var(--border)',
                    borderRadius: '.75rem', padding: '.85rem 1.1rem',
                    transition: 'border-color .15s, box-shadow .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = r.color + '40'; e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,.25)` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: '.5rem', flexShrink: 0,
                      background: r.color + '18', border: `1px solid ${r.color}30`,
                      display: 'grid', placeItems: 'center',
                    }}>
                      <Icon size={18} color={r.color} strokeWidth={1.75} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontFamily: 'Cinzel, serif', fontSize: '.82rem', fontWeight: 700, color: r.color }}>{r.name}</span>
                      <span style={{ fontSize: '.72rem', color: 'var(--muted)', marginLeft: '.65rem', fontFamily: 'monospace' }}>{r.req}</span>
                    </div>
                    {perks.length > 0 && (
                      <div style={{ display: 'flex', gap: '.3rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {perks.map(p => (
                          <span key={p.key} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '.28rem',
                            fontSize: '.58rem', fontFamily: 'Cinzel, serif', letterSpacing: '.04em',
                            padding: '2px 7px', borderRadius: 4,
                            background: p.color + '15', border: `1px solid ${p.color}30`, color: p.color,
                          }}>
                            <p.Icon size={9} /> {p.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── STAFF RANKS ── */}
        {tab === 'staff' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {staffRoles.map((r, i) => {
              const Icon = r.Icon
              return (
                <div key={r.name} data-reveal data-delay={String((i % 4) + 1)} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  background: 'var(--bg1)', border: '1px solid var(--border)',
                  borderRadius: '.75rem', padding: '1rem 1.25rem',
                  backgroundImage: `linear-gradient(135deg, ${r.color}08 0%, transparent 60%)`,
                  transition: 'border-color .15s, box-shadow .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = r.color + '35'; e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,.25)` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: '.6rem', flexShrink: 0,
                    background: r.color + '18', border: `1px solid ${r.color}30`,
                    display: 'grid', placeItems: 'center',
                  }}>
                    <Icon size={20} color={r.color} strokeWidth={1.75} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.85rem', fontWeight: 700, color: r.color, marginBottom: '.2rem' }}>{r.name}</p>
                    <p style={{ fontSize: '.76rem', color: 'var(--muted)', lineHeight: 1.55 }}>{r.desc}</p>
                  </div>
                  <Shield size={14} color={r.color} style={{ flexShrink: 0, opacity: .35 }} />
                </div>
              )
            })}
          </div>
        )}

        {/* ── PING ROLES ── */}
        {tab === 'pings' && (
          <div>
            <div data-reveal style={{
              background: 'rgba(126,200,227,.05)', border: '1px solid rgba(126,200,227,.15)',
              borderRadius: '.75rem', padding: '.9rem 1.1rem', marginBottom: '1.25rem',
              display: 'flex', gap: '.65rem', alignItems: 'center',
            }}>
              <Bell size={14} color="var(--ice)" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7 }}>
                Ping roles let you opt-in to specific notifications. Head to the <strong style={{ color: 'var(--text)' }}>#get-roles</strong> channel in the server and select which pings you want to receive.
              </p>
            </div>
            <div data-reveal style={{
              background: 'rgba(74,222,128,.05)', border: '1px solid rgba(74,222,128,.15)',
              borderRadius: '.75rem', padding: '.9rem 1.1rem', marginBottom: '1.25rem',
              display: 'flex', gap: '.65rem', alignItems: 'center',
            }}>
              <Users size={14} color="var(--green)" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--green)' }}>Interactive Roles:</strong> In the <strong style={{ color: 'var(--text)' }}>#get-roles</strong> channel you can also set your <strong>Age Bracket</strong> (13-15, 16-17, 18+, Prefer Not To Say), <strong>Relationship Status</strong> (Taken/Single), <strong>DM Status</strong> (Open/Ask/Closed), and <strong>Gaming Platforms</strong> (PC, XBOX, PlayStation, Switch, Mobile). Use the dropdown menus — picking a new option removes your previous selection.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '.65rem' }}>
              {pingRoles.map((r, i) => {
                const Icon = r.Icon
                return (
                  <div key={r.name} data-reveal data-delay={String((i % 4) + 1)} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '.75rem',
                    background: 'var(--bg1)', border: '1px solid var(--border)',
                    borderRadius: '.75rem', padding: '.9rem 1rem',
                    transition: 'border-color .15s, box-shadow .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = r.color + '35'; e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,.2)` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: '.5rem', flexShrink: 0,
                      background: r.color + '18', border: `1px solid ${r.color}28`,
                      display: 'grid', placeItems: 'center',
                    }}>
                      <Icon size={17} color={r.color} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Cinzel, serif', fontSize: '.78rem', fontWeight: 700, color: r.color, marginBottom: '.2rem' }}>{r.name}</p>
                      <p style={{ fontSize: '.73rem', color: 'var(--muted)', lineHeight: 1.55 }}>{r.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
