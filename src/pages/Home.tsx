import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Snowflake, Shield, BookOpen, Bot, HelpCircle, FileText, ExternalLink, ChevronRight, Users, Zap, Clock, Gift, Star, Ban, Heart, MessageCircle, TrendingUp } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const cards = [
  { to: '/rules',   icon: BookOpen,   title: 'Community Rules',   desc: 'Full SnowHaven Codex — all sections A through G.',       color: 'var(--ice)'  },
  { to: '/punish',  icon: Shield,     title: 'Punishment Guide',  desc: 'Warning escalation and tier-based penalty system.',     color: 'var(--gold)' },
  { to: '/automod', icon: Bot,        title: 'AutoMod Limits',    desc: 'Automated moderation thresholds and content filters.',  color: 'var(--ice)'  },
  { to: '/faq',     icon: HelpCircle, title: 'FAQ',               desc: 'Answers to the most common questions from members.',    color: 'var(--gold)' },
  { to: '/docs',    icon: FileText,   title: 'Docs & Guides',     desc: 'Report guides, definitions, and moderation notes.',     color: 'var(--ice)'  },
]

const stats = [
  { icon: Users, value: '1,500+', label: 'Community Members', color: 'var(--ice)' },
  { icon: Shield, value: '24/7', label: 'Moderation', color: 'var(--gold)' },
  { icon: Zap, value: '9', label: 'Staff Roles', color: 'var(--ice)' },
  { icon: Clock, value: '5', label: 'Punishment Tiers', color: 'var(--red)' },
]

const features = [
  { icon: Bot, title: 'AI Moderation', desc: 'Advanced AI flags harmful content for staff review — no automatic punishments.', color: 'var(--ice)' },
  { icon: Shield, title: 'Zero Tolerance', desc: 'Hate speech, doxxing, and CSAM result in permanent ban with no appeal.', color: 'var(--red)' },
  { icon: Gift, title: 'VIP & Boosters', desc: 'Skip the grind — all permission tiers unlocked immediately for VIP members.', color: 'var(--gold)' },
  { icon: TrendingUp, title: 'Leveling System', desc: 'Level up by being active — unlock emojis, stickers, links, embeds, and images.', color: 'var(--ice)' },
  { icon: Heart, title: 'Safe Space', desc: 'Strictly SFW in every channel at all times. 13+ only. Welcoming community.', color: 'var(--gold)' },
  { icon: Ban, title: 'Appeal System', desc: 'Fair and documented appeals for non-zero-tolerance offenses. Staff-reviewed.', color: 'var(--ice)' },
]

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('[data-delay]')
    els?.forEach(el => {
      const d = el.getAttribute('data-delay') || '0'
      ;(el as HTMLElement).style.animationDelay = d + 'ms'
      el.classList.add('fade-up')
    })
  }, [])

  return (
    <div ref={heroRef} style={{ position: 'relative', zIndex: 1 }}>

      {/* ── Hero ── */}
      <section style={{
        minHeight: 'calc(100vh - var(--nav-h))',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '4rem 1.5rem',
      }}>
        {/* Icon */}
        <div data-delay="0" style={{ opacity: 0, marginBottom: '1.5rem' }}>
          <div className="glow-pulse" style={{
            width: 80, height: 80, borderRadius: '1.25rem', margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(126,200,227,.15), rgba(201,168,76,.15))',
            border: '1px solid rgba(126,200,227,.25)',
            display: 'grid', placeItems: 'center',
          }}>
            <Snowflake size={40} color="var(--ice2)" strokeWidth={1.5} className="icon-bounce" />
          </div>
        </div>

        {/* Eyebrow */}
        <div data-delay="80" style={{ opacity: 0 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(126,200,227,.08)', border: '1px solid rgba(126,200,227,.2)',
            borderRadius: 99, padding: '.3rem .9rem',
            fontFamily: 'var(--display)', fontSize: '.62rem', letterSpacing: '.12em',
            color: 'var(--ice)', textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            <Snowflake size={10} /> The SnowHaven Empire
          </span>
        </div>

        {/* Heading */}
        <h1 data-delay="160" style={{
          opacity: 0,
          fontFamily: 'var(--display2)', fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
          fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em',
          marginBottom: '1rem',
        }}>
          <span style={{ background: 'linear-gradient(135deg, var(--ice3), var(--ice), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            SnowHaven
          </span>
          <br />
          <span style={{ color: 'var(--text)' }}>Community Hub</span>
        </h1>

        {/* Sub */}
        <p data-delay="240" style={{
          opacity: 0,
          fontSize: 'clamp(.9rem, 2.5vw, 1.1rem)', color: 'var(--dim)',
          maxWidth: 540, margin: '0 auto 2.25rem',
          lineHeight: 1.75,
        }}>
          Your central resource for server rules, moderation guidelines, FAQ, and community documentation.
        </p>

        {/* CTAs */}
        <div data-delay="320" style={{ opacity: 0, display: 'flex', gap: '.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/rules" style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'linear-gradient(135deg, rgba(126,200,227,.2), rgba(126,200,227,.1))',
            border: '1px solid rgba(126,200,227,.35)',
            color: 'var(--ice2)', fontFamily: 'var(--display)', fontSize: '.75rem',
            letterSpacing: '.08em', fontWeight: 700, padding: '.65rem 1.5rem',
            borderRadius: '.6rem', textDecoration: 'none', transition: 'all .18s',
          }}>
            <BookOpen size={14} /> Read the Rules
          </Link>
          <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(255,255,255,.04)', border: '1px solid var(--border2)',
            color: 'var(--dim)', fontFamily: 'var(--display)', fontSize: '.75rem',
            letterSpacing: '.08em', fontWeight: 700, padding: '.65rem 1.5rem',
            borderRadius: '.6rem', textDecoration: 'none', transition: 'all .18s',
          }}>
            <ExternalLink size={14} /> Join Discord
          </a>
        </div>

        {/* Scroll indicator */}
        <div data-delay="500" style={{ opacity: 0, marginTop: '4rem', animation: 'fadeIn 1s 1.2s both' }}>
          <div className="float" style={{
            width: 24, height: 40, border: '1.5px solid rgba(126,200,227,.25)',
            borderRadius: 12, margin: '0 auto', position: 'relative',
          }}>
            <div style={{
              width: 3, height: 8, background: 'var(--ice)',
              borderRadius: 2, position: 'absolute', left: '50%', top: 6,
              transform: 'translateX(-50%)',
              animation: 'scrollDot 1.8s ease-in-out infinite',
            }} />
          </div>
          <style>{`
            @keyframes scrollDot {
              0%,100% { transform: translateX(-50%) translateY(0); opacity:1; }
              60%      { transform: translateX(-50%) translateY(14px); opacity:0; }
            }
          `}</style>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{
        maxWidth: 1000, margin: '0 auto', padding: '2rem 1.5rem 3rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '.75rem',
        }}>
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.label} data-reveal data-delay={String((i % 4) + 1)} style={{
                background: 'var(--bg1)',
                border: '1px solid var(--border)',
                borderRadius: '.75rem',
                padding: '1.25rem',
                textAlign: 'center',
                transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(126,200,227,.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                <Icon size={22} color={s.color} style={{ marginBottom: '.65rem', opacity: .8 }} />
                <p style={{
                  fontFamily: 'var(--display)', fontSize: '1.4rem',
                  fontWeight: 800, color: s.color, marginBottom: '.3rem',
                }}>{s.value}</p>
                <p style={{ fontSize: '.68rem', color: 'var(--muted)', fontFamily: 'var(--display)', letterSpacing: '.04em' }}>
                  {s.label}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Cards ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <h2 style={{
          fontFamily: 'var(--display)', fontSize: '.65rem', letterSpacing: '.15em',
          textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center',
          marginBottom: '2.5rem',
        }}>
          Server Resources
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          {cards.map(({ to, icon: Icon, title, desc, color }) => (
            <Link key={to} to={to} data-reveal style={{ textDecoration: 'none' }}>
              <div className="lift" style={{
                background: 'var(--bg1)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '1.5rem',
                height: '100%',
                transition: 'all .25s',
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: '.75rem',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(126,200,227,.25)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,.3)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '.6rem',
                  background: `rgba(${color === 'var(--ice)' ? '126,200,227' : '201,168,76'},.1)`,
                  border: `1px solid rgba(${color === 'var(--ice)' ? '126,200,227' : '201,168,76'},.2)`,
                  display: 'grid', placeItems: 'center', flexShrink: 0,
                }}>
                  <Icon size={18} color={color} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--display)', fontSize: '.85rem', fontWeight: 600, marginBottom: '.35rem', color: 'var(--text)' }}>{title}</h3>
                  <p style={{ fontSize: '.76rem', color: 'var(--muted)', lineHeight: 1.6 }}>{desc}</p>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', color, fontFamily: 'var(--display)', letterSpacing: '.05em' }}>
                  View <ChevronRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem 4rem',
      }}>
        <h2 style={{
          fontFamily: 'var(--display)', fontSize: '.65rem', letterSpacing: '.15em',
          textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center',
          marginBottom: '.75rem',
        }}>
          Why Join SnowHaven
        </h2>
        <p style={{
          textAlign: 'center', fontSize: '.85rem', color: 'var(--dim)',
          maxWidth: 480, margin: '0 auto 2.5rem', lineHeight: 1.7,
        }}>
          A community built on respect, safety, and fun — with transparent moderation and fair systems.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={f.title} data-reveal data-delay={String((i % 3) + 1)} className="lift" style={{
                background: 'var(--bg1)',
                border: '1px solid var(--border)',
                borderRadius: '.75rem',
                padding: '1.35rem',
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                transition: 'all .25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(126,200,227,.2)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: '.55rem', flexShrink: 0,
                  background: f.color === 'var(--ice)' ? 'rgba(126,200,227,.1)' : f.color === 'var(--gold)' ? 'rgba(201,168,76,.1)' : 'rgba(248,113,113,.1)',
                  border: f.color === 'var(--ice)' ? '1px solid rgba(126,200,227,.2)' : f.color === 'var(--gold)' ? '1px solid rgba(201,168,76,.2)' : '1px solid rgba(248,113,113,.2)',
                  display: 'grid', placeItems: 'center',
                }}>
                  <Icon size={17} color={f.color} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--display)', fontSize: '.8rem', fontWeight: 700, color: 'var(--text)', marginBottom: '.35rem' }}>{f.title}</h3>
                  <p style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{
        maxWidth: 900, margin: '0 auto 2rem', padding: '0 1.5rem',
      }}>
        <div data-reveal className="animated-bg" style={{
          border: '1px solid rgba(126,200,227,.2)',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <MessageCircle size={28} color="var(--ice)" style={{ marginBottom: '1rem', opacity: .7 }} />
          <h2 style={{
            fontFamily: 'var(--display)', fontSize: 'clamp(.95rem, 3vw, 1.2rem)',
            fontWeight: 700, marginBottom: '.75rem', letterSpacing: '.03em',
          }}>
            Ready to join the Empire?
          </h2>
          <p style={{ fontSize: '.8rem', color: 'var(--dim)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
            Read our rules, meet the community, and start your journey in The SnowHaven Empire.
          </p>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '.5rem',
              background: 'linear-gradient(135deg, rgba(126,200,227,.25), rgba(201,168,76,.15))',
              border: '1px solid rgba(126,200,227,.35)',
              color: '#fff', fontFamily: 'var(--display)', fontSize: '.75rem',
              letterSpacing: '.08em', fontWeight: 700, padding: '.7rem 1.75rem',
              borderRadius: '.6rem', textDecoration: 'none',
            }}>
              <ExternalLink size={14} /> Join Discord
            </a>
            <Link to="/rules" style={{
              display: 'inline-flex', alignItems: 'center', gap: '.5rem',
              background: 'rgba(126,200,227,.08)', border: '1px solid rgba(126,200,227,.2)',
              color: 'var(--ice)', fontFamily: 'var(--display)', fontSize: '.75rem',
              letterSpacing: '.08em', fontWeight: 700, padding: '.7rem 1.75rem',
              borderRadius: '.6rem', textDecoration: 'none',
            }}>
              <BookOpen size={14} /> View Rules
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
