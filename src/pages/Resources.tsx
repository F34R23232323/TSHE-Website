import React from 'react'
import { Link } from 'react-router-dom'
import { Newspaper, Zap, Bot, Shield, Gift, Calendar, Megaphone, Users, Sparkles, Wrench, ChevronRight, BookOpen, Star, ExternalLink } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface Update {
  date: string
  title: string
  description: string
  icon: React.ElementType
  color: string
  badge?: string
  link?: string
}

const updates: Update[] = [
  {
    date: 'May 2026',
    title: 'New Staff Portal Launched',
    description: 'TSHE staff now have a dedicated web portal for notes, incident reports, LOA tracking, and a searchable staff directory — all synced in real time.',
    icon: Shield,
    color: '#f87171',
    badge: 'Staff',
    link: '/staff-portal',
  },
  {
    date: 'April 2026',
    title: 'AI Moderation Beta Activated',
    description: 'Messages are now scanned by AI for toxicity, threats, hate speech, harassment, doxxing, and more. Staff review every flag before action.',
    icon: Bot,
    color: '#a78bfa',
    badge: 'AI',
    link: '/automod',
  },
  {
    date: 'March 2026',
    title: 'AutoMod Overhaul',
    description: 'Comprehensive update to automated moderation thresholds. New spam detection, escalation paths, and content filter categories added.',
    icon: Zap,
    color: '#f59e0b',
    link: '/automod',
  },
  {
    date: 'February 2026',
    title: 'Partnership Programme Reopened',
    description: 'Partnership applications are now open. Full requirements, the server ad template, and application steps are live on the new Partnerships page.',
    icon: Users,
    color: 'var(--ice)',
    badge: 'Community',
    link: '/partnership',
  },
  {
    date: 'January 2026',
    title: 'Website v2.0 Released',
    description: 'Complete website redesign with live-editable content via admin panel, new pages for roles, services, staff guides, and full mobile optimisation.',
    icon: Sparkles,
    color: 'var(--gold)',
    badge: 'Launch',
  },
  {
    date: 'December 2025',
    title: 'Community Giveaway Event',
    description: 'Holiday giveaway with Nitro prizes, custom roles, and server perks. Over 200 members participated.',
    icon: Gift,
    color: '#f472b6',
    badge: 'Event',
  },
  {
    date: 'November 2025',
    title: 'Leveling System Expanded',
    description: 'New level roles from Newbie to Godlike. Permission unlocks for emojis, stickers, links, embeds, and image posting at key milestones.',
    icon: Star,
    color: '#facc15',
    link: '/roles',
  },
  {
    date: 'October 2025',
    title: 'Staff Team Restructured',
    description: 'New hierarchy with clear tiers: Leadership, Administration, and Moderation. Each role now has documented responsibilities and authority levels.',
    icon: Shield,
    color: '#34d399',
    link: '/staff',
  },
  {
    date: 'September 2025',
    title: 'Aegis Bot Integration Complete',
    description: 'TSHE\'s own Discord bot — Aegis — is now fully integrated. Handles moderation, leveling, tickets, AutoMod, and 150+ commands.',
    icon: Wrench,
    color: 'var(--ice)',
    link: '/services',
  },
  {
    date: 'August 2025',
    title: 'Official Rules Codex Published',
    description: 'The SnowHaven Codex — a complete rulebook with sections A through I — published for all members. Clear escalation paths and zero-tolerance policies defined.',
    icon: BookOpen,
    color: 'var(--ice)',
    link: '/rules',
  },
]

export default function Resources() {
  useScrollReveal()

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div data-reveal style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(167,139,250,.08)', border: '1px solid rgba(167,139,250,.2)',
            borderRadius: 99, padding: '.3rem .9rem',
            fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.12em',
            color: '#a78bfa', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            <Newspaper size={10} /> Updates &amp; Resources
          </div>
          <h1 data-reveal data-delay="1" style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 700, letterSpacing: '-.01em', marginBottom: '.75rem',
            background: 'linear-gradient(135deg, var(--ice3), #a78bfa, var(--gold))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Community Updates
          </h1>
          <p data-reveal data-delay="2" style={{ fontSize: '.9rem', color: 'var(--dim)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
            Tracking the growth and evolution of The SnowHaven Empire. New features, policy changes, and community milestones.
          </p>
        </div>

        {/* Quick links row */}
        <div data-reveal style={{
          display: 'flex', flexWrap: 'wrap', gap: '.55rem', marginBottom: '3rem', justifyContent: 'center',
        }}>
          {[
            { to: '/rules', label: 'Rules', icon: BookOpen, color: 'var(--ice)' },
            { to: '/roles', label: 'Roles', icon: Star, color: 'var(--gold)' },
            { to: '/services', label: 'Services', icon: Zap, color: '#f472b6' },
            { to: '/staff', label: 'Staff Guide', icon: Shield, color: '#f87171' },
            { to: '/automod', label: 'AutoMod', icon: Bot, color: '#a78bfa' },
            { to: '/partnership', label: 'Partner', icon: Users, color: 'var(--ice)' },
          ].map(q => {
            const QIcon = q.icon
            return (
              <Link key={q.to} to={q.to} style={{
                display: 'inline-flex', alignItems: 'center', gap: '.35rem',
                fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.06em',
                fontWeight: 600, color: q.color,
                padding: '.3rem .75rem', borderRadius: '.35rem',
                background: 'var(--bg2)', border: '1px solid var(--border)',
                textDecoration: 'none', transition: 'all .15s',
              }}>
                <QIcon size={10} /> {q.label}
              </Link>
            )
          })}
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 22,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, var(--ice) 0%, rgba(126,200,227,.2) 50%, rgba(126,200,227,0) 100%)',
            borderRadius: 1,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {updates.map((u, i) => {
              const Icon = u.icon
              return (
                <div key={i} data-reveal data-delay={String((i % 4) + 1)} style={{
                  display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                  paddingLeft: '3.5rem', position: 'relative',
                }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    left: 10,
                    top: 6,
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: `rgba(${u.color === 'var(--ice)' ? '126,200,227' : u.color === 'var(--gold)' ? '201,168,76' : u.color.replace('#', '').match(/.{2}/g)!.map(h => parseInt(h, 16)).join(',')},.15)`,
                    border: `2px solid ${u.color}40`,
                    display: 'grid',
                    placeItems: 'center',
                    zIndex: 1,
                  }}>
                    <Icon size={12} color={u.color} />
                  </div>

                  {/* Content card */}
                  <div style={{
                    flex: 1,
                    background: 'var(--bg1)',
                    border: '1px solid var(--border)',
                    borderRadius: '.75rem',
                    padding: '1.25rem 1.5rem',
                    transition: 'border-color .2s, box-shadow .2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `rgba(${u.color === 'var(--ice)' ? '126,200,227' : u.color === 'var(--gold)' ? '201,168,76' : '126,200,227'},.25)`
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,.2)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', flexWrap: 'wrap', marginBottom: '.45rem' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '.25rem',
                        fontSize: '.6rem', fontFamily: 'Cinzel, serif', letterSpacing: '.08em',
                        color: 'var(--muted)', background: 'var(--bg3)',
                        padding: '1px 8px', borderRadius: '.25rem', border: '1px solid var(--border)',
                      }}>
                        <Calendar size={9} style={{ opacity: .6 }} /> {u.date}
                      </span>
                      {u.badge && (
                        <span style={{
                          fontSize: '.58rem', fontFamily: 'Cinzel, serif', letterSpacing: '.06em',
                          padding: '1px 7px', borderRadius: '.25rem',
                          background: u.color + '15', border: `1px solid ${u.color}30`,
                          color: u.color,
                        }}>
                          {u.badge}
                        </span>
                      )}
                    </div>
                    <h3 style={{
                      fontFamily: 'Cinzel, serif', fontSize: '.88rem', fontWeight: 700,
                      color: 'var(--text)', marginBottom: '.4rem', letterSpacing: '.02em',
                    }}>
                      {u.title}
                    </h3>
                    <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7, marginBottom: u.link ? '.75rem' : 0 }}>
                      {u.description}
                    </p>
                    {u.link && (
                      <Link to={u.link} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '.3rem',
                        fontSize: '.7rem', fontFamily: 'Cinzel, serif', letterSpacing: '.05em',
                        color: u.color, textDecoration: 'none',
                      }}>
                        <ExternalLink size={10} /> Read more <ChevronRight size={10} />
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
