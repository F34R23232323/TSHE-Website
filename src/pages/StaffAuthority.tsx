import React from 'react'
import { Shield, Gavel, Ban, VolumeX, MessageSquareX, UserX, AlertTriangle, Eye, Trash2, Clock, Zap, Lock, Info, ChevronRight, ExternalLink } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const powers = [
  {
    icon: Ban,
    title: 'Ban Members',
    desc: 'Staff may permanently or temporarily ban any member from the server at any time. No prior warning, evidence presentation, or explanation is required. A ban may be issued instantly based on staff judgment.',
    color: 'var(--red)',
  },
  {
    icon: UserX,
    title: 'Kick Members',
    desc: 'Staff may kick any member from the server at any time, with or without warning. Kicks are immediate and do not require documentation, evidence, or prior notice.',
    color: '#f87171',
  },
  {
    icon: VolumeX,
    title: 'Mute / Timeout Members',
    desc: 'Staff may mute or timeout any member in text and/or voice channels at any time. Duration is at staff discretion. No warning or evidence is required.',
    color: '#f59e0b',
  },
  {
    icon: AlertTriangle,
    title: 'Issue Warnings',
    desc: 'Staff may issue formal or informal warnings to any member at any time. Warnings do not require rule citations, evidence collection, or prior notice. Verbal warnings are equally valid.',
    color: 'var(--gold)',
  },
  {
    icon: MessageSquareX,
    title: 'Delete Messages',
    desc: 'Staff may delete any message, in any channel, at any time, without providing a reason. Bulk message deletion and channel purges are within staff authority with no notice required.',
    color: '#f97316',
  },
  {
    icon: Eye,
    title: 'Monitor Members',
    desc: 'Staff may observe, monitor, and review any member\'s activity, messages, voice activity, and server presence without notification. This includes reviewing message history and patterns.',
    color: '#a78bfa',
  },
  {
    icon: Trash2,
    title: 'Manage Channels & Content',
    desc: 'Staff may create, delete, rename, reorder, or reconfigure channels, categories, roles, and server content. Content may be removed or altered at any time without member consent.',
    color: '#60a5fa',
  },
  {
    icon: Lock,
    title: 'Restrict Access',
    desc: 'Staff may revoke channel access, role permissions, or server features from any member at any time. Channel locks, permission overrides, and role removals require no justification.',
    color: '#34d399',
  },
  {
    icon: Zap,
    title: 'Emergency Actions',
    desc: 'In emergencies — raids, spam waves, NSFW floods, or active harm — staff may bypass normal procedures entirely. Mass bans, server lockdowns, and emergency pings are authorised without consultation.',
    color: '#ef4444',
  },
  {
    icon: Clock,
    title: 'Preventive Action',
    desc: 'Staff may act preemptively. If a member or situation appears likely to cause harm or disruption, staff may intervene before any rule is broken. Suspicion and pattern recognition are sufficient grounds.',
    color: '#f472b6',
  },
]

const principles = [
  'No evidence is required. Staff may act on observation, reports, pattern recognition, or instinct.',
  'No warning is required. A first offense can result in a ban if the situation warrants it.',
  'No reason is required. Staff are not obligated to explain their actions to the affected member.',
  'No appeal guarantee. While TSHE provides an appeal process, submission does not guarantee reversal.',
  'Staff judgment is final. Decisions are made in the best interest of the community as a whole.',
  'All actions are logged. While staff don\'t owe you an explanation, everything is internally recorded.',
]

export default function StaffAuthority() {
  useScrollReveal()

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }} data-reveal>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(224,49,49,.1)', border: '1px solid rgba(224,49,49,.25)',
            borderRadius: 99, padding: '.35rem .95rem',
            fontSize: '.62rem', letterSpacing: '.12em',
            color: 'var(--red2)', textTransform: 'uppercase', marginBottom: '1rem',
            fontFamily: 'var(--font)',
          }}>
            <Shield size={10} /> Official Policy
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900, letterSpacing: '-.03em', marginBottom: '.75rem',
            background: 'linear-gradient(135deg, var(--gold2), var(--red2), var(--gold))',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientShift 4s ease infinite',
          }}>
            Staff Authority
          </h1>
          <p style={{
            fontSize: '1rem', color: 'var(--dim)', maxWidth: 600, margin: '0 auto', lineHeight: 1.75,
          }}>
            TSHE staff possess full and unrestricted authority to moderate the server.
            This page exists to eliminate any ambiguity about what staff can and cannot do.
          </p>
        </div>

        {/* ═══ Absolute Authority Declaration ═══ */}
        <div data-reveal-scale style={{
          background: 'linear-gradient(135deg, rgba(224,49,49,.1) 0%, rgba(224,49,49,.03) 50%, rgba(230,180,34,.05) 100%)',
          border: '2px solid rgba(224,49,49,.3)',
          borderRadius: '1rem',
          padding: '2rem 1.75rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, var(--red), var(--gold), var(--red))',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 3s ease infinite',
          }} />
          <Gavel size={32} color="var(--red)" style={{ marginBottom: '.75rem' }} />
          <h2 style={{
            fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-.01em',
            color: 'var(--red2)', marginBottom: '.5rem',
          }}>
            Staff Can Act at Any Time
          </h2>
          <p style={{
            fontSize: '.88rem', color: 'var(--dim)', lineHeight: 1.75, maxWidth: 700, margin: '0 auto',
          }}>
            <strong style={{ color: 'var(--text)' }}>With or without evidence. With or without warning. With or without a stated reason.</strong>
            {' '}By joining TSHE, you acknowledge and accept that staff may ban, kick, mute, warn, delete messages,
            and take any other moderation action against any member at any time based solely on their judgment.
            There is no requirement for staff to provide evidence, justification, or advance notice.
          </p>
          <div style={{
            display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center',
            marginTop: '1.25rem',
          }}>
            <span className="badge badge-red" style={{ fontSize: 12, padding: '5px 12px' }}>
              <Ban size={10} /> No Evidence Required
            </span>
            <span className="badge badge-gold" style={{ fontSize: 12, padding: '5px 12px' }}>
              <AlertTriangle size={10} /> No Warning Required
            </span>
            <span className="badge" style={{ fontSize: 12, padding: '5px 12px', background: 'rgba(249,115,22,.1)', color: '#f97316', border: '1px solid rgba(249,115,22,.25)' }}>
              <Info size={10} /> No Reason Required
            </span>
          </div>
        </div>

        {/* ═══ Powers Grid ═══ */}
        <div data-reveal style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-.01em', marginBottom: '.35rem' }}>
            Complete Staff Powers
          </h2>
          <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
            Every moderation action available to TSHE staff, listed with full scope and authority.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: 12,
          }}>
            {powers.map((p, i) => {
              const Icon = p.icon
              return (
                <div
                  key={p.title}
                  data-reveal
                  data-reveal-delay={String(Math.min(i + 1, 8))}
                  className="card"
                  style={{
                    padding: '1.25rem 1.25rem',
                    borderLeft: `3px solid ${p.color}`,
                    background: `linear-gradient(135deg, ${p.color}08 0%, transparent 60%)`,
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: '.55rem',
                    background: `${p.color}15`, border: `1px solid ${p.color}30`,
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}>
                    <Icon size={18} color={p.color} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: p.color, marginBottom: '.35rem' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.65 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ═══ Key Principles ═══ */}
        <div data-reveal style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-.01em', marginBottom: '.35rem' }}>
            Key Principles
          </h2>
          <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
            These principles govern all staff actions. They are non-negotiable.
          </p>
          <div className="card" style={{
            borderLeft: '3px solid var(--red)',
            background: 'linear-gradient(135deg, rgba(224,49,49,.04) 0%, transparent 50%)',
            padding: '1.5rem',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {principles.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    minWidth: 24, height: 24, borderRadius: '50%',
                    background: 'rgba(224,49,49,.12)', border: '1px solid rgba(224,49,49,.25)',
                    display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1,
                    fontSize: '.7rem', fontWeight: 700, color: 'var(--red2)',
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: '.82rem', color: 'var(--dim)', lineHeight: 1.7 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ By Joining ═══ */}
        <div data-reveal-scale className="card" style={{
          padding: '1.5rem', marginBottom: '2.5rem',
          borderLeft: '3px solid var(--gold)',
          background: 'linear-gradient(135deg, rgba(230,180,34,.06) 0%, transparent 50%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <Lock size={22} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gold2)', marginBottom: '.5rem' }}>
                By Joining TSHE You Agree That:
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'Staff authority is absolute within the server.',
                  'Moderation decisions are final and not subject to member vote or public debate.',
                  'Appeals exist but do not guarantee reversal — they are a courtesy, not a right.',
                  'Your presence in the server is a privilege granted by staff, not a right you possess.',
                  'Staff may remove you from the server permanently for any reason or no reason at all.',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <ChevronRight size={13} color="var(--gold)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <p style={{ fontSize: '.82rem', color: 'var(--dim)', lineHeight: 1.65 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Footer CTA ═══ */}
        <div data-reveal style={{
          textAlign: 'center',
          padding: '2rem 1.5rem',
          background: 'var(--bg1)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
        }}>
          <p style={{ fontSize: '.85rem', color: 'var(--dim)', marginBottom: '1rem', lineHeight: 1.7 }}>
            Questions about a staff action? Use the appropriate channel:
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/tickets" className="btn btn-primary btn-sm">
              <ExternalLink size={13} /> Open Support Ticket
            </a>
            <a href="/power-abuse" className="btn btn-secondary btn-sm">
              <AlertTriangle size={13} /> Report Power Abuse
            </a>
            <a href="https://zepp.noxxbot.com/appeals/1466990155020898413" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
              <ExternalLink size={13} /> Submit Appeal
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
