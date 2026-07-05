import React from 'react'
import { ExternalLink, MessageCircle, Shield, Clock, AlertTriangle, HelpCircle, Check, ChevronRight, Info, MessageSquareMore } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const guidelines = [
  {
    title: 'Provide clear details',
    desc: 'Describe your issue in full when opening the ticket. Include relevant message links, screenshots, user IDs, and timestamps. The more context you give, the faster staff can help.',
    icon: MessageCircle,
    color: '#60a5fa',
  },
  {
    title: 'One issue per ticket',
    desc: 'Open a separate ticket for each distinct issue. Do not pile multiple unrelated problems into a single ticket — this slows down resolution and creates confusion.',
    icon: Info,
    color: '#a78bfa',
  },
  {
    title: 'Be respectful and patient',
    desc: 'Staff are volunteers. Hostile, demanding, or accusatory language in tickets will result in the ticket being closed and may lead to moderation action. Rudeness is never acceptable.',
    icon: Shield,
    color: '#f87171',
  },
  {
    title: 'No DMs to staff about tickets',
    desc: 'Do not DM staff members about your ticket. All communication stays inside the ticket thread. DMing staff about existing tickets may result in your ticket being closed without resolution.',
    icon: AlertTriangle,
    color: '#f59e0b',
  },
  {
    title: 'Response times',
    desc: 'Staff aim to respond within 24 hours. Complex issues (appeals, investigations) may take longer. If your ticket has received no response after 48 hours, you may ping the ticket thread once.',
    icon: Clock,
    color: '#34d399',
  },
  {
    title: 'False or spam tickets',
    desc: 'Opening frivolous tickets, submitting false reports, or spamming the ticket system wastes staff time. Abuse of the ticket system results in a formal warning and may lead to a mute.',
    icon: MessageSquareMore,
    color: '#e879f9',
  },
]

const ticketTypes = [
  { label: 'Appeal a moderation action', icon: Shield, color: 'var(--red2)' },
  { label: 'Report a rule violation', icon: AlertTriangle, color: 'var(--gold)' },
  { label: 'Partnership inquiry', icon: MessageSquareMore, color: '#a78bfa' },
  { label: 'Staff application question', icon: HelpCircle, color: '#60a5fa' },
  { label: 'Bot or website bug report', icon: Info, color: '#34d399' },
  { label: 'General help or question', icon: MessageCircle, color: '#f472b6' },
]

export default function Tickets() {
  useScrollReveal()

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div data-reveal style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(96,165,250,.08)', border: '1px solid rgba(96,165,250,.2)',
            borderRadius: 99, padding: '.3rem .9rem',
            fontFamily: 'var(--font)', fontSize: '.62rem', letterSpacing: '.12em',
            color: '#60a5fa', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            <MessageCircle size={10} /> Support System
          </div>
          <h1 data-reveal data-delay="1" style={{
            fontFamily: 'var(--font)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700, letterSpacing: '-.02em', marginBottom: '.75rem',
          }}>
            Support Tickets
          </h1>
          <p data-reveal data-delay="2" style={{ fontSize: '.9rem', color: 'var(--dim)', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>
            All TSHE support is handled through our custom private ticket bot — <strong style={{ color: 'var(--text)' }}>TSHE Tickets</strong>.
            A separate system with its own database, built exclusively for The SnowHaven Empire.
          </p>
        </div>

        {/* Ticket bot info card */}
        <div data-reveal className="card" style={{
          padding: '1.5rem',
          marginBottom: '2.5rem',
          borderLeft: '3px solid #60a5fa',
          background: 'linear-gradient(135deg, rgba(96,165,250,.04) 0%, transparent 100%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '.75rem', flexShrink: 0,
              background: 'rgba(96,165,250,.12)', border: '1px solid rgba(96,165,250,.25)',
              display: 'grid', placeItems: 'center',
            }}>
              <MessageCircle size={22} color="#60a5fa" />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font)', fontSize: '1rem', fontWeight: 700, marginBottom: '.35rem' }}>
                TSHE Tickets
              </h2>
              <p style={{ fontSize: '.82rem', color: 'var(--dim)', lineHeight: 1.7, marginBottom: '.75rem' }}>
                A custom-built private ticket bot designed exclusively for TSHE.
                Fully isolated with its own database — separate from Noxx, Aegis, and all other server systems.
                Tickets are handled by trained staff, not automation.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Private Bot', 'Dedicated Database', 'Staff-Handled', 'Thread-Based', '24h Response'].map(t => (
                  <span key={t} className="badge" style={{
                    background: 'rgba(96,165,250,.08)', color: '#60a5fa',
                    border: '1px solid rgba(96,165,250,.15)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ticket types */}
        <div data-reveal style={{ marginBottom: '2.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font)', fontSize: '1rem', fontWeight: 700,
            marginBottom: '.35rem',
          }}>
            What can you open a ticket for?
          </h2>
          <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
            Tickets are the primary way to reach staff for any formal matter.
          </p>
          <div className="card-grid">
            {ticketTypes.map(t => {
              const Icon = t.icon
              return (
                <div key={t.label} className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '.5rem', flexShrink: 0,
                    background: t.color + '15', border: `1px solid ${t.color}30`,
                    display: 'grid', placeItems: 'center',
                  }}>
                    <Icon size={15} color={t.color} />
                  </div>
                  <span style={{ fontSize: '.82rem', fontWeight: 600 }}>{t.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Guidelines */}
        <div data-reveal style={{ marginBottom: '2.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font)', fontSize: '1rem', fontWeight: 700,
            marginBottom: '.35rem',
          }}>
            Ticket Guidelines
          </h2>
          <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: '1rem' }}>
            Following these ensures your ticket is handled quickly and fairly.
          </p>
          <div className="card-grid">
            {guidelines.map(g => {
              const Icon = g.icon
              return (
                <div key={g.title} className="card" style={{ padding: 20 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 'var(--radius)',
                    background: g.color + '12', border: `1px solid ${g.color}25`,
                    display: 'grid', placeItems: 'center', marginBottom: 12,
                  }}>
                    <Icon size={17} color={g.color} />
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{g.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{g.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Important notes */}
        <div data-reveal style={{ marginBottom: '2.5rem' }}>
          <div className="card" style={{
            padding: '1.25rem 1.5rem',
            borderLeft: '3px solid var(--red)',
            background: 'linear-gradient(135deg, rgba(224,49,49,.04) 0%, transparent 100%)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <AlertTriangle size={18} color="var(--red)" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--red2)', marginBottom: 6 }}>Important</h3>
                <ul style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 6, listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Check size={13} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
                    Do not DM staff about tickets or moderation issues. Use the formal appeal system for punishment appeals.
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Check size={13} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
                    Appeals for zero-tolerance offenses (hate speech, doxxing, CSAM, malware, advertising) are never accepted.
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Check size={13} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
                    Publicly arguing moderation decisions in server channels escalates existing penalties.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div data-reveal style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(96,165,250,.06) 0%, rgba(96,165,250,0) 100%)',
          border: '1px solid rgba(96,165,250,.2)',
          borderRadius: '1rem',
          padding: '2rem 1.5rem',
        }}>
          <MessageCircle size={28} color="#60a5fa" style={{ marginBottom: '.75rem' }} />
          <h2 style={{ fontFamily: 'var(--font)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '.5rem' }}>
            Open a Ticket
          </h2>
          <p style={{ fontSize: '.85rem', color: 'var(--dim)', maxWidth: 480, margin: '0 auto 1.25rem', lineHeight: 1.7 }}>
            Click below to head to the ticket channel and open a new support ticket.
            Staff will respond as soon as possible.
          </p>
          <a
            href="https://discord.com/channels/1466990155020898413/1467119424455704760"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ fontSize: 14, padding: '10px 24px' }}
          >
            <ExternalLink size={15} /> Open a Support Ticket
            <ChevronRight size={14} />
          </a>
        </div>

      </div>
    </div>
  )
}
