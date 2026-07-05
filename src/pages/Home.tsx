import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, BookOpen, Bot, AlertTriangle, Scale, ExternalLink, Gavel, Siren, Users, Crown, ClipboardList, ChevronRight, HelpCircle, MessageCircle, Zap } from 'lucide-react'

const sections = [
  {
    label: 'Rules',
    desc: 'Complete SnowHaven Community Codex — sections A through I covering foundation, conduct, content, and enforcement.',
    to: '/rules',
    icon: BookOpen,
    color: 'var(--red)',
    stat: '9 sections',
    delay: 1,
  },
  {
    label: 'AutoMod',
    desc: '24 active rules scanning messages in real-time for NSFW, slurs, spam, phishing, scams, doxxing, malware, and more.',
    to: '/automod',
    icon: Siren,
    color: 'var(--blue)',
    stat: '24 rules',
    delay: 2,
  },
  {
    label: 'Punishments',
    desc: '5-tier escalation system with 8-step warn ladder. From verbal warnings to permanent bans with zero tolerance.',
    to: '/punish',
    icon: Scale,
    color: 'var(--gold)',
    stat: '5 tiers',
    delay: 3,
  },
  {
    label: 'Roles & Levels',
    desc: '13 level roles from 40 to 100. Unlock permissions, commands, colors, and server features as you level up.',
    to: '/roles',
    icon: Crown,
    color: 'var(--blue)',
    stat: '13 roles',
    delay: 4,
  },
  {
    label: 'FAQ',
    desc: 'Common questions about appeals, rules, punishments, roles, and how the server operates.',
    to: '/faq',
    icon: HelpCircle,
    color: 'var(--green)',
    stat: '20+ Q&As',
    delay: 5,
  },
  {
    label: 'Documentation',
    desc: 'Definitions, report guide, moderation notes, and staff reference material.',
    to: '/docs',
    icon: ClipboardList,
    color: 'var(--dim)',
    stat: 'Guides',
    delay: 6,
  },
]

const stats = [
  { value: '24', label: 'AutoMod Rules', color: 'var(--red)' },
  { value: '5', label: 'Punishment Tiers', color: 'var(--gold)' },
  { value: '8', label: 'Warn Steps', color: 'var(--blue)' },
  { value: '13', label: 'Level Roles', color: 'var(--green)' },
]

export default function Home() {
  const [pfpErrored, setPfpErrored] = useState(false)
  const [pfpLoaded, setPfpLoaded] = useState(false)

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>

      {/* ── Hero ── */}
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        maxWidth: 740,
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Decorative background glow */}
        <div style={{
          position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(224,49,49,.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* PFP */}
        <div data-reveal-scale style={{
          width: 88, height: 88, borderRadius: '50%', overflow: 'hidden',
          margin: '0 auto 28px',
          border: '2px solid var(--gold)',
          boxShadow: '0 0 48px rgba(224,49,49,.2), 0 0 8px rgba(224,49,49,.1)',
          animation: 'glowPulseGold 3s ease-in-out infinite',
          background: pfpErrored || !pfpLoaded ? 'linear-gradient(135deg, rgba(224,49,49,.2), rgba(230,180,34,.15))' : 'transparent',
          display: 'grid', placeItems: 'center',
        }}>
          {pfpErrored ? (
            <Crown size={32} color="var(--gold)" opacity={0.8} />
          ) : (
            <img src="/pfp.png" alt="TSHE"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: pfpLoaded ? 'block' : 'none' }}
              onLoad={() => setPfpLoaded(true)} onError={() => setPfpErrored(true)} />
          )}
        </div>

        <span data-reveal className="badge badge-red" style={{ marginBottom: 18, fontSize: 12, padding: '5px 14px' }}>
          <Crown size={11} /> The SnowHaven Empire
        </span>

        <h1 data-reveal data-delay="1" style={{
          fontSize: 'clamp(30px, 6vw, 48px)',
          fontWeight: 900,
          letterSpacing: '-.03em',
          lineHeight: 1.1,
          marginBottom: 16,
        }}>
          The SnowHaven Empire
        </h1>

        <p data-reveal data-delay="2" style={{
          fontSize: 'clamp(15px, 2.5vw, 17px)',
          color: 'var(--dim)',
          lineHeight: 1.75,
          marginBottom: 32,
          maxWidth: 540,
          margin: '0 auto 32px',
        }}>
          The official hub for Bot Development, Software Projects and community. Discord's most transparent moderation system.
        </p>

        <div data-reveal data-delay="3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 52 }}>
          <Link to="/rules" className="btn btn-primary" style={{ fontSize: 14, padding: '10px 22px' }}>
            <BookOpen size={15} /> Read the Rules
          </Link>
          <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: 14 }}>
            <ExternalLink size={15} /> Discord.gg/tshe
          </a>
          <Link to="/authority" className="btn btn-gold" style={{ fontSize: 14 }}>
            <Shield size={15} /> Staff Authority
          </Link>
        </div>

        {/* Stats */}
        <div className="stat-row">
          {stats.map((s, i) => (
            <div key={s.label} data-reveal data-reveal-delay={String(i + 4)} className="stat-item">
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sections grid ── */}
      <section className="page-section-wide" style={{ paddingBottom: 72 }}>
        <div className="section-header" style={{ textAlign: 'center' }} data-reveal>
          <div className="section-label">Server Resources</div>
          <h2 className="section-title">Everything you need to know</h2>
          <p className="section-desc" style={{ maxWidth: 500, margin: '8px auto 0' }}>
            All policies, tools, and documentation pulled directly from the server's live moderation systems.
          </p>
        </div>

        <div className="card-grid">
          {sections.map(s => {
            const Icon = s.icon
            return (
              <Link key={s.to} to={s.to} data-reveal data-reveal-delay={String(s.delay)} style={{ textDecoration: 'none' }}>
                <div className="card glow-card" style={{ padding: 22, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '.55rem',
                    background: `${s.color}15`, border: `1px solid ${s.color}30`,
                    display: 'grid', placeItems: 'center', marginBottom: 14, flexShrink: 0,
                  }}>
                    <Icon size={18} color={s.color} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: '-.01em' }}>{s.label}</h3>
                  <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, flex: 1, marginBottom: 14 }}>{s.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="badge" style={{ background: `${s.color}10`, color: s.color, border: `1px solid ${s.color}25`, fontSize: 11 }}>
                      {s.stat}
                    </span>
                    <ChevronRight size={15} color="var(--muted)" style={{ transition: 'transform .2s, color .2s' }} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Zero Tolerance Banner ── */}
      <section className="page-section" style={{ paddingBottom: 72 }}>
        <div data-reveal-scale className="card" style={{
          borderLeft: '3px solid var(--red)',
          padding: 28,
          background: 'linear-gradient(135deg, rgba(224,49,49,.06) 0%, rgba(224,49,49,0) 100%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <AlertTriangle size={24} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Zero Tolerance Offenses</h3>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.75 }}>
                Hate speech, slurs, doxxing, CSAM, threats of violence, and extremist content result in immediate permanent ban with no appeal rights. Discord Trust & Safety is automatically notified for criminal content. These rules apply to all members at all times — in every channel, DM, and external platform where TSHE members are targeted.
              </p>
              <Link to="/rules" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 13.5, fontWeight: 600, color: 'var(--red)', transition: 'gap .2s' }}
                onMouseEnter={e => (e.currentTarget.style.gap = '10px')}
                onMouseLeave={e => (e.currentTarget.style.gap = '6px')}
              >
                Full Codex <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick links strip ── */}
      <section className="page-section-wide" style={{ paddingBottom: 88 }}>
        <div style={{
          display: 'flex', gap: 10, flexWrap: 'wrap',
        }}>
          {[
            { label: 'Staff Authority', to: '/authority', icon: Shield, accent: true },
            { label: 'Tickets', to: '/tickets', icon: MessageCircle },
            { label: 'Power Abuse', to: '/power-abuse', icon: AlertTriangle },
            { label: 'Staff Guide', to: '/staff', icon: Zap },
            { label: 'Partnership', to: '/partnership', icon: Users },
            { label: 'Updates', to: '/updates', icon: ExternalLink },
            { label: 'Appeals', href: 'https://zepp.noxxbot.com/appeals/1466990155020898413', icon: Gavel },
          ].map((l, i) => {
            const Icon = l.icon
            const Comp = l.to ? Link : 'a'
            const props = l.to ? { to: l.to } : { href: l.href, target: '_blank', rel: 'noreferrer' }
            return (
              <Comp key={l.label} {...props as any}
                data-reveal data-reveal-delay={String(i + 1)}
                className={l.accent ? 'btn btn-gold btn-sm' : 'btn btn-secondary btn-sm'}
                style={{ fontSize: 12.5 }}
              >
                <Icon size={12.5} /> {l.label}
              </Comp>
            )
          })}
        </div>
      </section>
    </div>
  )
}
