import React, { useState } from 'react'
import { BookOpen, ShieldX, MessageSquare, Mail, Shield, Bot, ChevronDown } from 'lucide-react'
import { getRules, type RuleSection } from '../data/store'
import { useScrollReveal } from '../hooks/useScrollReveal'

const iconMap: Record<string, React.ElementType> = {
  BookOpen, ShieldX, MessageSquare, Mail, Shield, Bot,
}

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  ice:    { bg: 'rgba(126,200,227,.07)', border: 'rgba(126,200,227,.2)', text: 'var(--ice)' },
  gold:   { bg: 'rgba(201,168,76,.07)',  border: 'rgba(201,168,76,.2)',  text: 'var(--gold)' },
  red:    { bg: 'rgba(248,113,113,.07)', border: 'rgba(248,113,113,.2)', text: 'var(--red)' },
  green:  { bg: 'rgba(74,222,128,.07)',  border: 'rgba(74,222,128,.2)',  text: 'var(--green)' },
  purple: { bg: 'rgba(167,139,250,.07)', border: 'rgba(167,139,250,.2)', text: '#a78bfa' },
}

function FieldItem({ name, value }: { name: string; value: string }) {
  const [open, setOpen] = useState(false)
  const lines = value.split('\n').filter(Boolean)

  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: '.65rem',
      overflow: 'hidden',
      marginBottom: '.5rem',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '.75rem',
          padding: '.85rem 1rem',
          background: open ? 'var(--bg3)' : 'var(--bg2)',
          border: 'none', color: 'var(--text)',
          fontFamily: 'var(--display)', fontSize: '.78rem', fontWeight: 600,
          letterSpacing: '.03em', cursor: 'pointer',
          transition: 'background .15s',
        }}
      >
        <span>{name}</span>
        <ChevronDown size={14} color="var(--muted)" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
      </button>
      {open && (
        <div style={{ padding: '1rem 1rem 1.1rem', background: 'var(--bg1)' }}>
          {lines.map((line, i) => {
            // Bold **text**
            const parts = line.split(/\*\*(.+?)\*\*/g)
            return (
              <p key={i} style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.75, marginBottom: i < lines.length - 1 ? '.4rem' : 0 }}>
                {line.startsWith('- ') || line.startsWith('* ') ? '• ' : ''}
                {parts.map((p, j) =>
                  j % 2 === 1
                    ? <strong key={j} style={{ color: 'var(--text)', fontWeight: 700 }}>{p}</strong>
                    : <span key={j}>{p.replace(/^[-*]\s/, '')}</span>
                )}
              </p>
            )
          })}
        </div>
      )}
    </div>
  )
}

function SectionBlock({ section }: { section: RuleSection }) {
  const Icon = iconMap[section.icon] || BookOpen
  const c = colorMap[section.color]

  return (
    <div id={section.id} style={{
      background: 'var(--bg1)', borderRadius: '1rem',
      border: `1px solid ${c.border}`,
      padding: '1.75rem',
      marginBottom: '1.5rem',
      backgroundImage: `linear-gradient(135deg, ${c.bg} 0%, transparent 60%)`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.85rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: 42, height: 42, borderRadius: '.65rem',
          background: c.bg, border: `1px solid ${c.border}`,
          display: 'grid', placeItems: 'center', flexShrink: 0,
        }}>
          <Icon size={20} color={c.text} />
        </div>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: '1rem', fontWeight: 700, letterSpacing: '.03em' }}>
          {section.title}
        </h2>
      </div>
      {section.fields.map((f: { name: string; value: string }) => (
        <FieldItem key={f.name} name={f.name} value={f.value} />
      ))}
    </div>
  )
}

export default function Rules() {
  useScrollReveal()
  const ruleSections = getRules()
  return (
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <div data-reveal style={{
          display: 'inline-flex', alignItems: 'center', gap: '.5rem',
          background: 'rgba(126,200,227,.08)', border: '1px solid rgba(126,200,227,.2)',
          borderRadius: 99, padding: '.3rem .9rem',
          fontFamily: 'var(--display)', fontSize: '.62rem', letterSpacing: '.12em',
          color: 'var(--ice)', textTransform: 'uppercase', marginBottom: '1rem',
        }}>
          <BookOpen size={10} /> SnowHaven Codex
        </div>
        <h1 data-reveal data-delay="1" style={{
          fontFamily: 'var(--display2)', fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700, letterSpacing: '-.02em', marginBottom: '.75rem',
          background: 'linear-gradient(135deg, var(--ice3), var(--ice))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Community Rules
        </h1>
        <p data-reveal data-delay="2" style={{ fontSize: '.88rem', color: 'var(--dim)', maxWidth: 560, margin: '0 auto' }}>
          All members are expected to read and follow the SnowHaven Codex. Rules are enforced strictly to maintain a safe and welcoming community.
        </p>
      </div>

      {/* Quick nav */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '.5rem',
        marginBottom: '2.5rem', justifyContent: 'center',
      }}>
        {ruleSections.map(s => {
          const c = colorMap[s.color]
          return (
            <a key={s.id} href={`#${s.id}`} style={{
              fontFamily: 'var(--display)', fontSize: '.62rem', letterSpacing: '.07em',
              fontWeight: 600, color: c.text,
              padding: '.28rem .7rem', borderRadius: '.35rem',
              background: c.bg, border: `1px solid ${c.border}`,
              textDecoration: 'none', transition: 'opacity .15s',
            }}>
              {s.title}
            </a>
          )
        })}
      </div>

      {/* Sections */}
      {ruleSections.map(s => <SectionBlock key={s.id} section={s} />)}

      {/* Appeal notice */}
      <div style={{
        background: 'rgba(126,200,227,.06)', border: '1px solid rgba(126,200,227,.2)',
        borderRadius: 'var(--radius)', padding: '1.25rem 1.5rem',
        display: 'flex', gap: '.85rem', alignItems: 'flex-start', marginTop: '1rem',
      }}>
        <Shield size={18} color="var(--ice)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{ fontSize: '.82rem', fontWeight: 700, marginBottom: '.25rem', fontFamily: 'var(--display)' }}>Appealing a Moderation Action</p>
          <p style={{ fontSize: '.78rem', color: 'var(--dim)', lineHeight: 1.65 }}>
            If you believe a punishment was issued in error, submit an appeal at{' '}
            <a href="https://zepp.noxxbot.com/appeals/1466990155020898413" target="_blank" rel="noreferrer" style={{ color: 'var(--ice)' }}>
              zepp.noxxbot.com/appeals/1466990155020898413
            </a>. Appeals must be submitted calmly and respectfully with all relevant evidence.
          </p>
        </div>
      </div>
    </div>
  )
}
