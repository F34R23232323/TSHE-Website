import React from 'react'
import { ExternalLink, Ticket, Bot, Activity, Users, User, Zap } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { getServices } from '../data/store'

const iconMap: Record<string, React.ElementType> = {
  kasumei: Ticket,
  noxx:    Bot,
  tnrp:    Users,
  mika:    Activity,
  f34r:    User,
}

function hexToRgba(hex: string, alpha: number) {
  try {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${alpha})`
  } catch { return `rgba(126,200,227,${alpha})` }
}

export default function Services() {
  useScrollReveal()
  const services = getServices()

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div data-reveal style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(126,200,227,.08)', border: '1px solid rgba(126,200,227,.2)',
            borderRadius: 99, padding: '.3rem .9rem',
            fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.12em',
            color: 'var(--ice)', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            <Zap size={10} /> ItzF34R Network
          </div>
          <h1 data-reveal data-delay="1" style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 700, letterSpacing: '-.01em', marginBottom: '.75rem',
          }}>
            <span className="text-gradient">Our Services</span>
          </h1>
          <p data-reveal data-delay="2" style={{ fontSize: '.9rem', color: 'var(--dim)', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>
            Explore all platforms and projects from the TSHE developer network.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {services.map((s, i) => {
            const Icon = iconMap[s.id] ?? Zap
            const bg     = hexToRgba(s.color, .07)
            const border = hexToRgba(s.color, .2)
            const links = [
              s.primaryLabel   && { label: s.primaryLabel,   url: s.primaryUrl,   primary: true  },
              s.secondaryLabel && { label: s.secondaryLabel, url: s.secondaryUrl, primary: false },
            ].filter(Boolean) as { label: string; url: string; primary: boolean }[]

            return (
              <div key={s.id} data-reveal data-delay={String((i % 3) + 1)} className="lift" style={{
                background: 'var(--bg1)', border: `1px solid ${border}`,
                borderRadius: '1.1rem', padding: '1.75rem 2rem',
                backgroundImage: `linear-gradient(135deg, ${bg} 0%, transparent 60%)`,
                display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center',
                transition: 'border-color .2s, transform .2s, box-shadow .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,.35), 0 0 0 1px ${border}`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', minWidth: 0 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '.85rem', flexShrink: 0,
                    background: bg, border: `1px solid ${border}`,
                    display: 'grid', placeItems: 'center', animation: 'glowPulse 4s ease-in-out infinite',
                  }}>
                    <Icon size={24} color={s.color} strokeWidth={1.75} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', flexWrap: 'wrap', marginBottom: '.35rem' }}>
                      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.05rem', fontWeight: 700 }}>{s.name}</h2>
                      {s.badge && (
                        <span style={{
                          fontSize: '.58rem', fontFamily: 'Cinzel, serif', letterSpacing: '.07em',
                          padding: '2px 8px', borderRadius: 4, background: bg, border: `1px solid ${border}`, color: s.color,
                        }}>{s.badge}</span>
                      )}
                    </div>
                    <p style={{ fontSize: '.78rem', color: s.color, fontFamily: 'Cinzel, serif', letterSpacing: '.04em', marginBottom: '.6rem', opacity: .85 }}>{s.tagline}</p>
                    <p style={{ fontSize: '.81rem', color: 'var(--dim)', lineHeight: 1.75, maxWidth: 620 }}>{s.description}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', flexShrink: 0 }}>
                  {links.map(l => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '.45rem',
                      fontFamily: 'Cinzel, serif', fontSize: '.65rem', letterSpacing: '.07em', fontWeight: 700,
                      padding: '.45rem 1rem', borderRadius: '.5rem',
                      background: l.primary ? bg : 'var(--bg3)',
                      border: `1px solid ${l.primary ? border : 'var(--border)'}`,
                      color: l.primary ? s.color : 'var(--dim)',
                      textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all .15s',
                    }}>
                      <ExternalLink size={11} /> {l.label}
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div data-reveal style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <p style={{ fontSize: '.8rem', color: 'var(--muted)', lineHeight: 1.75 }}>
            All platforms above are developed and maintained by <span style={{ color: 'var(--ice)' }}>ItzF34R</span>.
            {' '}For support, visit{' '}
            <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" style={{ color: 'var(--ice)', textDecoration: 'underline' }}>
              the TSHE Discord server
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
