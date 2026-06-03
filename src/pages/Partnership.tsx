import React, { useState } from 'react'
import { Handshake, Users, Activity, Shield, Heart, Ban, Layout, UserCheck, CheckCircle, Snowflake, ExternalLink, Copy, Check, ChevronDown, ClipboardList, Diamond, Zap, FileText } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const DISCORD_INVITE = 'https://discord.gg/z2efJQbF3B'

const SERVER_AD = `❄️❄️ WELCOME TO THE SNOWHAVEN EMPIRE! ❄️❄️

Step into The SnowHaven Empire (TSHE) — a thriving, fun-filled community where adventure, friendship, and excitement never end! 🌨️✨

🌟 WHY JOIN US?
🔥 Active & Friendly Members – Everyone is welcome, and the chat is always buzzing!
🎮 Games & Fun – Play, compete, or just hang out in our gaming zones!
🎉 Events & Giveaways – Win prizes, join contests, and show off your skills!
🎨 Creativity & Memes – Share art, memes, and everything you love!
🤝 Partnerships – We love teaming up with other awesome servers. Grow with us!

🚀 JOIN THE EMPIRE & LEVEL UP YOUR COMMUNITY EXPERIENCE!
If you're looking for fun, friends, and a place to belong, The SnowHaven Empire is the perfect home! ❄️💫

Don't wait — adventure, excitement, and giveaways are waiting for you! Come be part of the empire today! 🌨️🏰

🔗 JOIN NOW!
${DISCORD_INVITE}`

interface Req {
  icon: React.ElementType
  color: string
  title: string
  body: string
}

const requirements: Req[] = [
  {
    icon: Users,
    color: 'var(--ice)',
    title: 'Minimum Member Count',
    body: 'Your server must have at least 50 active members. However, F34R.mp4! may allow servers with fewer members if the server is active and well-managed.',
  },
  {
    icon: Activity,
    color: 'var(--gold)',
    title: 'Active Community',
    body: 'Your server should have regular activity in channels. Dead or inactive servers are not eligible.',
  },
  {
    icon: Shield,
    color: 'var(--ice)',
    title: 'Clear Rules and Moderation',
    body: 'Your server must have a clear rules channel and an active moderation team to maintain safety and order.',
  },
  {
    icon: Heart,
    color: 'var(--gold)',
    title: 'Friendly and Positive Environment',
    body: 'All partners must foster a welcoming, respectful, and safe environment. Toxic or harmful communities are automatically denied.',
  },
  {
    icon: Ban,
    color: 'var(--red)',
    title: 'No NSFW or Illegal Content',
    body: 'Servers must not contain NSFW, illegal, or pirated content. Violating this results in instant rejection.',
  },
  {
    icon: Layout,
    color: 'var(--ice)',
    title: 'Good Server Structure',
    body: 'Organized channels, roles, and categories are required for readability and professionalism.',
  },
  {
    icon: UserCheck,
    color: 'var(--gold)',
    title: 'Owner Presence',
    body: 'The server owner must be in their server during the partnership review to stay updated on the process.',
  },
]

const tips = [
  'Make sure your server meets all requirements before applying.',
  "Ensure your moderation team is active — F34R.mp4! may test moderation to see if it meets standards.",
  'Provide a clear server invite link and description.',
  'Double-check that your server does not violate Discord TOS.',
  "Servers that are inactive, poorly moderated, or against F34R.mp4!'s standards will be denied.",
]

const steps = [
  {
    n: '1',
    title: 'Submit Request',
    body: 'Submit your partnership request in the designated partnerships channel.',
  },
  {
    n: '2',
    title: 'Include Details',
    body: 'Include your server invite link, member count, and a brief description.',
  },
  {
    n: '3',
    title: 'Review Process',
    body: "F34R.mp4! personally reviews each server — checking TOS compliance, community activity, moderation quality, and overall standards.",
  },
  {
    n: '4',
    title: 'Decision',
    body: 'If the server passes all checks, your partnership is approved. Failing any standard results in denial.',
  },
]

function ReqCard({ req }: { req: Req }) {
  const Icon = req.icon
  const isRed = req.color === 'var(--red)'
  const bg = isRed ? 'rgba(248,113,113,.07)' : req.color === 'var(--gold)' ? 'rgba(201,168,76,.07)' : 'rgba(126,200,227,.07)'
  const border = isRed ? 'rgba(248,113,113,.2)' : req.color === 'var(--gold)' ? 'rgba(201,168,76,.2)' : 'rgba(126,200,227,.2)'

  return (
    <div className="lift" data-reveal style={{
      background: 'var(--bg1)',
      border: `1px solid ${border}`,
      borderRadius: '1rem',
      padding: '1.5rem',
      backgroundImage: `linear-gradient(135deg, ${bg} 0%, transparent 60%)`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{
          flexShrink: 0,
          width: 38, height: 38, borderRadius: '.6rem',
          background: bg, border: `1px solid ${border}`,
          display: 'grid', placeItems: 'center',
        }}>
          <Icon size={17} color={req.color} />
        </div>
        <div>
          <h3 style={{
            fontFamily: 'var(--display)', fontSize: '.78rem', fontWeight: 700,
            letterSpacing: '.04em', color: 'var(--text)', marginBottom: '.4rem',
          }}>
            {req.title}
          </h3>
          <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7 }}>
            {req.body}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Partnership() {
  useScrollReveal()
  const [copied, setCopied] = useState(false)
  const [adOpen, setAdOpen] = useState(false)

  const copyAd = () => {
    navigator.clipboard.writeText(SERVER_AD).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div data-reveal style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(126,200,227,.08)', border: '1px solid rgba(126,200,227,.2)',
            borderRadius: 99, padding: '.3rem .9rem',
            fontFamily: 'Cinzel, serif', fontSize: '.62rem', letterSpacing: '.12em',
            color: 'var(--ice)', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            <Handshake size={10} /> Partnerships
          </div>
          <h1 data-reveal data-delay="1" style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
            fontWeight: 700, letterSpacing: '-.01em', marginBottom: '.75rem',
          }}>
            <span className="text-gradient">Partner With TSHE</span>
          </h1>
          <p data-reveal data-delay="2" style={{
            fontSize: '.9rem', color: 'var(--dim)',
            maxWidth: 560, margin: '0 auto', lineHeight: 1.75,
          }}>
            We love teaming up with other awesome servers. Grow with us — here's everything you need to know before applying.
          </p>
        </div>

        {/* ── Server Ad ── */}
        <div data-reveal style={{
          background: 'var(--bg1)',
          border: '1px solid rgba(126,200,227,.2)',
          borderRadius: '1rem',
          marginBottom: '3.5rem',
          overflow: 'hidden',
          backgroundImage: 'linear-gradient(135deg, rgba(126,200,227,.05) 0%, transparent 60%)',
        }}>
          {/* Ad header — always visible */}
          <button
            onClick={() => setAdOpen(o => !o)}
            style={{
              width: '100%', textAlign: 'left',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '1rem',
              padding: '1.25rem 1.5rem',
              background: 'none', border: 'none', cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '.85rem' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '.6rem',
                background: 'rgba(126,200,227,.1)', border: '1px solid rgba(126,200,227,.25)',
                display: 'grid', placeItems: 'center', flexShrink: 0,
              }}>
                <Snowflake size={17} color="var(--ice2)" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: '.78rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '.04em' }}>
                  <ClipboardList size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '.3rem' }} /> Server Ad
                </div>
                <div style={{ fontSize: '.72rem', color: 'var(--muted)', marginTop: '.1rem' }}>
                  Copy and post this when partnering with us
                </div>
              </div>
            </div>
            <ChevronDown
              size={16}
              color="var(--muted)"
              style={{
                flexShrink: 0,
                transform: adOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform .2s',
              }}
            />
          </button>

          {/* Collapsible body */}
          {adOpen && (
            <div style={{ borderTop: '1px solid var(--border)', padding: '1.25rem 1.5rem 1.5rem' }}>
              <pre style={{
                fontFamily: 'var(--font)', fontSize: '.8rem', color: 'var(--dim)',
                lineHeight: 1.8, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                background: 'var(--bg2)', borderRadius: '.65rem',
                padding: '1.25rem', border: '1px solid var(--border)',
                marginBottom: '1rem',
              }}>
                {SERVER_AD}
              </pre>

              <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={copyAd}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.45rem',
                    background: copied ? 'rgba(74,222,128,.15)' : 'rgba(126,200,227,.12)',
                    border: `1px solid ${copied ? 'rgba(74,222,128,.35)' : 'rgba(126,200,227,.3)'}`,
                    color: copied ? 'var(--green)' : 'var(--ice2)',
                    fontFamily: 'var(--display)', fontSize: '.7rem', letterSpacing: '.07em',
                    fontWeight: 700, padding: '.5rem 1.1rem', borderRadius: '.5rem',
                    cursor: 'pointer', transition: 'all .2s',
                  }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? 'Copied!' : 'Copy Ad'}
                </button>

                <a
                  href={DISCORD_INVITE}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.45rem',
                    background: 'rgba(201,168,76,.1)', border: '1px solid rgba(201,168,76,.25)',
                    color: 'var(--gold)', fontFamily: 'var(--display)', fontSize: '.7rem',
                    letterSpacing: '.07em', fontWeight: 700, padding: '.5rem 1.1rem',
                    borderRadius: '.5rem', textDecoration: 'none', transition: 'all .2s',
                  }}
                >
                  <ExternalLink size={13} /> Join Server
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ── Requirements ── */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div data-reveal style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontFamily: 'var(--display)', fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              fontWeight: 700, letterSpacing: '.04em', marginBottom: '.4rem',
            }}>
              <Diamond size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '.3rem' }} /> Partner Requirements
            </h2>
            <p style={{ fontSize: '.82rem', color: 'var(--muted)' }}>
              All requirements must be met before submitting a partnership request.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '1rem',
          }}>
            {requirements.map((r, i) => (
              <div key={r.title} data-delay={String((i % 3) + 1)}>
                <ReqCard req={r} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Tips ── */}
        <div data-reveal style={{
          background: 'var(--bg1)',
          border: '1px solid rgba(201,168,76,.2)',
          borderRadius: '1rem',
          padding: '1.75rem',
          marginBottom: '3.5rem',
          backgroundImage: 'linear-gradient(135deg, rgba(201,168,76,.06) 0%, transparent 60%)',
        }}>
          <h2 style={{
            fontFamily: 'var(--display)', fontSize: '.9rem', fontWeight: 700,
            letterSpacing: '.05em', color: 'var(--gold)', marginBottom: '1.1rem',
          }}>
            <Zap size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '.3rem' }} /> Tips Before Requesting
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
            {tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start' }}>
                <CheckCircle size={15} color="var(--gold)" style={{ flexShrink: 0, marginTop: '.15rem' }} />
                <p style={{ fontSize: '.82rem', color: 'var(--dim)', lineHeight: 1.7 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Application Process ── */}
        <div>
          <div data-reveal style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontFamily: 'var(--display)', fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              fontWeight: 700, letterSpacing: '.04em', marginBottom: '.4rem',
            }}>
              <FileText size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '.3rem' }} /> Application Process
            </h2>
            <p style={{ fontSize: '.82rem', color: 'var(--muted)' }}>
              Four simple steps to become a partner.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            {steps.map((s, i) => (
              <div key={s.n} className="lift" data-reveal data-delay={String(i + 1)} style={{
                background: 'var(--bg1)',
                border: '1px solid rgba(126,200,227,.15)',
                borderRadius: '1rem',
                padding: '1.5rem',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '.55rem',
                  background: 'rgba(126,200,227,.1)', border: '1px solid rgba(126,200,227,.25)',
                  display: 'grid', placeItems: 'center', marginBottom: '1rem',
                  fontFamily: 'var(--display)', fontSize: '.85rem', fontWeight: 700, color: 'var(--ice2)',
                }}>
                  {s.n}
                </div>
                <h3 style={{
                  fontFamily: 'var(--display)', fontSize: '.78rem', fontWeight: 700,
                  letterSpacing: '.04em', color: 'var(--text)', marginBottom: '.4rem',
                }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* Note */}
          <div data-reveal style={{
            background: 'rgba(126,200,227,.05)',
            border: '1px solid rgba(126,200,227,.15)',
            borderRadius: '.75rem',
            padding: '1.1rem 1.35rem',
            display: 'flex', alignItems: 'flex-start', gap: '.75rem',
          }}>
            <Snowflake size={15} color="var(--ice)" style={{ flexShrink: 0, marginTop: '.2rem' }} />
            <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.75 }}>
              <strong style={{ color: 'var(--ice)' }}>Note:</strong> F34R.mp4! is usually generous with smaller servers — if your server is lucky and meets standards, he may personally handle your request.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
