import React from 'react'
import { Link } from 'react-router-dom'
import { Snowflake, ExternalLink, BookOpen, Shield, Bot, HelpCircle, FileText, AlertTriangle, Zap, ClipboardList, Lock, Star, Newspaper } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 1,
      borderTop: '1px solid var(--border)',
      background: 'linear-gradient(180deg, rgba(6,12,26,0) 0%, rgba(6,12,26,.95) 100%)',
      padding: '4rem 1.5rem 2rem',
      marginTop: '4rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Top grid */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
              <div className="glow-pulse" style={{
                width: 34, height: 34, borderRadius: '.5rem',
                background: 'linear-gradient(135deg, rgba(126,200,227,.2), rgba(201,168,76,.15))',
                border: '1px solid rgba(126,200,227,.2)',
                display: 'grid', placeItems: 'center',
              }}>
                <Snowflake size={16} color="var(--ice2)" />
              </div>
              <span style={{ fontFamily: 'var(--display2)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>TSHE</span>
            </div>
            <p style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '1rem' }}>
              The SnowHaven Empire — a community built on respect, safety, and fun. Est. 2024.
            </p>
            <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '.4rem',
              fontSize: '.72rem', color: 'var(--ice)',
              background: 'rgba(126,200,227,.08)', border: '1px solid rgba(126,200,227,.2)',
              padding: '.3rem .75rem', borderRadius: '.4rem', textDecoration: 'none',
              fontFamily: 'var(--display)', letterSpacing: '.06em',
              transition: 'all .15s',
            }}>
              <ExternalLink size={11} /> Join Server
            </a>
          </div>

          {/* Navigate */}
          <div>
            <h4 style={{ fontFamily: 'var(--display)', fontSize: '.6rem', letterSpacing: '.12em', color: 'var(--muted)', marginBottom: '.85rem', textTransform: 'uppercase' }}>Navigate</h4>
            {[
              ['/', 'Home', BookOpen],
              ['/rules', 'Community Rules', Shield],
              ['/roles', 'Roles & Leveling', Star],
              ['/punish', 'Punishments', AlertTriangle],
              ['/automod', 'AutoMod Limits', Bot],
              ['/faq', 'FAQ', HelpCircle],
              ['/docs', 'Documentation', FileText],
              ['/services', 'Services', Zap],
              ['/staff', 'Staff Guide', Shield],
              ['/partnership', 'Partnership', ExternalLink],
              ['/updates', 'Updates & Resources', Newspaper],
            ].map(([to, label, Icon]: any) => (
              <Link key={to} to={to} style={{
                display: 'flex', alignItems: 'center', gap: '.45rem',
                fontSize: '.78rem', color: 'var(--muted)', marginBottom: '.4rem',
                textDecoration: 'none', transition: 'color .15s',
                padding: '.15rem 0',
              }}>
                <Icon size={11} style={{ opacity: .5 }} />
                {label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontFamily: 'var(--display)', fontSize: '.6rem', letterSpacing: '.12em', color: 'var(--muted)', marginBottom: '.85rem', textTransform: 'uppercase' }}>Legal</h4>
            {[
              ['/tos', 'Terms of Service'],
              ['/privacy', 'Privacy Policy'],
            ].map(([to, label]) => (
              <Link key={to} to={to} style={{
                display: 'block', fontSize: '.78rem', color: 'var(--muted)',
                marginBottom: '.4rem', textDecoration: 'none', transition: 'color .15s',
                padding: '.15rem 0',
              }}>{label}</Link>
            ))}
            <div style={{ marginTop: '1.25rem', padding: '.6rem .75rem', background: 'rgba(248,113,113,.06)', border: '1px solid rgba(248,113,113,.15)', borderRadius: '.45rem' }}>
              <p style={{ fontSize: '.68rem', color: 'var(--red)', fontFamily: 'var(--display)', letterSpacing: '.05em', marginBottom: '.25rem' }}>Zero Tolerance</p>
              <p style={{ fontSize: '.7rem', color: 'var(--muted)', lineHeight: 1.6 }}>Hate speech, doxxing, CSAM, and raiding result in permanent ban with no appeal.</p>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 style={{ fontFamily: 'var(--display)', fontSize: '.6rem', letterSpacing: '.12em', color: 'var(--muted)', marginBottom: '.85rem', textTransform: 'uppercase' }}>Community</h4>
            <a href="https://discord.gg/DeSrm3WNmk" target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '.45rem',
              fontSize: '.78rem', color: 'var(--ice)', marginBottom: '.5rem', textDecoration: 'none',
            }}>
              <ExternalLink size={11} /> Join Discord
            </a>
            <a href="https://zepp.noxxbot.com/appeals/1466990155020898413" target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '.45rem',
              fontSize: '.78rem', color: 'var(--dim)', marginBottom: '.5rem', textDecoration: 'none',
            }}>
              <ExternalLink size={11} /> Submit Appeal
            </a>
            <div style={{ marginTop: '1rem', fontSize: '.72rem', color: 'var(--muted)', lineHeight: 1.7 }}>
              {[
                { Icon: ClipboardList, text: 'Rules enforced 24/7',       color: 'var(--ice)'  },
                { Icon: AlertTriangle, text: 'Warnings are permanent', color: 'var(--gold)' },
                { Icon: Lock,          text: 'Strictly SFW — 13+ only',    color: 'var(--dim)'  },
              ].map(({ Icon, text, color }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '.45rem', marginBottom: '.35rem' }}>
                  <Icon size={12} color={color} style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div>
            <h4 style={{ fontFamily: 'var(--display)', fontSize: '.6rem', letterSpacing: '.12em', color: 'var(--muted)', marginBottom: '.85rem', textTransform: 'uppercase' }}>Server Info</h4>
            {[
              { label: 'Tier system', value: '5 tiers' },
              { label: 'Warning steps', value: '9 levels' },
              { label: 'AutoMod rules', value: '10 active' },
              { label: 'Appeal wait', value: '12 months' },
              { label: 'Age minimum', value: '13+' },
              { label: 'Language', value: 'English' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.35rem', padding: '.15rem 0' }}>
                <span style={{ fontSize: '.73rem', color: 'var(--muted)' }}>{s.label}</span>
                <span style={{ fontSize: '.73rem', color: 'var(--dim)', fontWeight: 600, fontFamily: 'var(--display)', letterSpacing: '.04em' }}>{s.value}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '.75rem',
        }}>
          <p style={{ fontSize: '.71rem', color: 'var(--muted)', fontFamily: 'var(--display)', letterSpacing: '.05em' }}>
            &copy; 2026 The SnowHaven Empire &middot; Xyron Development &middot; All rights reserved
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/tos"     style={{ fontSize: '.71rem', color: 'var(--muted)', textDecoration: 'none' }}>Terms</Link>
            <Link to="/privacy" style={{ fontSize: '.71rem', color: 'var(--muted)', textDecoration: 'none' }}>Privacy</Link>
            <Link to="/rules"   style={{ fontSize: '.71rem', color: 'var(--muted)', textDecoration: 'none' }}>Rules</Link>
            <span style={{ fontSize: '.71rem', color: 'var(--muted)' }}>Powered by Xyron Development</span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </footer>
  )
}
