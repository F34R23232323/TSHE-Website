import React from 'react'
import { Bot, Zap, Filter, TriangleAlert, Shield, Cpu } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function AutoMod() {
  useScrollReveal()
  return (
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <div data-reveal style={{
          display: 'inline-flex', alignItems: 'center', gap: '.5rem',
          background: 'rgba(167,139,250,.08)', border: '1px solid rgba(167,139,250,.2)',
          borderRadius: 99, padding: '.3rem .9rem',
          fontFamily: 'var(--display)', fontSize: '.62rem', letterSpacing: '.12em',
          color: '#a78bfa', textTransform: 'uppercase', marginBottom: '1rem',
        }}>
          <Bot size={10} /> Automated Systems
        </div>
        <h1 data-reveal data-delay="1" style={{
          fontFamily: 'var(--display2)', fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700, letterSpacing: '-.02em', marginBottom: '.75rem',
          background: 'linear-gradient(135deg, #c4b5fd, #a78bfa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          AutoMod & AI Moderation
        </h1>
        <p data-reveal data-delay="2" style={{ fontSize: '.88rem', color: 'var(--dim)', maxWidth: 560, margin: '0 auto' }}>
          Automated limits are enforced to protect the server. AI moderation scans messages for harmful content. Attempting to bypass any system results in escalated moderation.
        </p>
      </div>

      {/* Message Spam Limits */}
      <div data-reveal style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', marginBottom: '1.25rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '.5rem', background: 'rgba(250,204,21,.1)', border: '1px solid rgba(250,204,21,.25)', display: 'grid', placeItems: 'center' }}>
            <Zap size={16} color="#facc15" />
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: '.88rem', fontWeight: 700, letterSpacing: '.05em' }}>Message Spam Thresholds</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '.85rem' }}>
          {[
            { trigger: '4 identical messages / 30s', action: 'Auto-delete + Tier 1 timeout', color: '#4ade80' },
            { trigger: '6 messages any kind / 10s', action: 'Auto-delete + Tier 1 timeout', color: '#a3e635' },
            { trigger: '10 messages / 30s', action: 'Mute + staff alert', color: '#facc15' },
            { trigger: 'Repeated hits in one session', action: 'Escalates to Tier 2 warning', color: '#fb923c' },
          ].map((t, i) => (
            <div key={t.trigger} data-reveal data-delay={String((i % 4) + 1)} className="lift" style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: '.65rem', padding: '1rem',
              borderLeft: `3px solid ${t.color}`,
              transition: 'all .2s',
            }}>
              <p style={{ fontFamily: 'var(--display)', fontSize: '.72rem', color: t.color, fontWeight: 700, letterSpacing: '.05em', marginBottom: '.25rem' }}>{t.action}</p>
              <p style={{ fontSize: '.76rem', color: 'var(--dim)', fontFamily: 'monospace' }}>{t.trigger}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Escalation Table */}
      <div data-reveal style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', marginBottom: '1.25rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '.5rem', background: 'rgba(248,113,113,.1)', border: '1px solid rgba(248,113,113,.25)', display: 'grid', placeItems: 'center' }}>
            <TriangleAlert size={16} color="var(--red)" />
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: '.88rem', fontWeight: 700, letterSpacing: '.05em' }}>AutoMod Escalation Table</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '.75rem' }}>
          {[
            { step: '1st hit (any category)', action: 'Auto-delete + logged', color: '#4ade80' },
            { step: '2nd hit same session', action: 'Auto-delete + Tier 1 timeout', color: '#a3e635' },
            { step: '3rd hit same session', action: 'Mute + staff review', color: '#facc15' },
            { step: '4th hit / bypass attempt', action: 'Tier 2 warning + extended mute', color: '#fb923c' },
            { step: 'Zero-tolerance content', action: 'Permanent ban + T&S report', color: 'var(--red)' },
          ].map((t, i) => (
            <div key={t.step} data-reveal data-delay={String((i % 4) + 1)} className="lift" style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: '.65rem', padding: '1rem',
              borderLeft: `3px solid ${t.color}`,
              transition: 'all .2s',
            }}>
              <p style={{ fontFamily: 'var(--display)', fontSize: '.72rem', color: t.color, fontWeight: 700, letterSpacing: '.05em', marginBottom: '.25rem' }}>{t.step}</p>
              <p style={{ fontSize: '.76rem', color: 'var(--dim)' }}>{t.action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Filters */}
      <div data-reveal style={{ background: 'rgba(248,113,113,.05)', border: '1px solid rgba(248,113,113,.2)', borderRadius: 'var(--radius)', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', marginBottom: '.85rem' }}>
          <Filter size={15} color="var(--red)" />
          <h3 style={{ fontFamily: 'var(--display)', fontSize: '.82rem', fontWeight: 700 }}>Content Auto-Deleted Immediately</h3>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1rem' }}>
          {['Hate speech / slurs', 'Racism', 'Homophobia / transphobia', 'Ableism', 'Extremist content', 'NSFW / exploitation', 'Scam links', 'Phishing', 'IP addresses', 'Discord tokens', 'Threats / violence', 'Unauthorized invites'].map(tag => (
            <span key={tag} style={{
              fontSize: '.7rem', fontFamily: 'var(--display)', letterSpacing: '.04em',
              padding: '3px 9px', borderRadius: 4,
              background: 'rgba(248,113,113,.1)', border: '1px solid rgba(248,113,113,.2)', color: 'var(--red)',
              transition: 'all .15s',
            }}>
              {tag}
            </span>
          ))}
        </div>
        <p style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          Character substitution, zero-width characters, deliberate misspelling, or any technique used to bypass filters is classified as intentional evasion and automatically escalates to the maximum available penalty.
        </p>
      </div>

      {/* AI Moderation */}
      <div data-reveal style={{ background: 'var(--bg1)', border: '1px solid rgba(167,139,250,.2)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem', backgroundImage: 'linear-gradient(135deg, rgba(167,139,250,.06) 0%, transparent 60%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', marginBottom: '1.25rem' }}>
          <div className="glow-pulse" style={{ width: 36, height: 36, borderRadius: '.5rem', background: 'rgba(167,139,250,.1)', border: '1px solid rgba(167,139,250,.25)', display: 'grid', placeItems: 'center' }}>
            <Cpu size={16} color="#a78bfa" />
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: '.88rem', fontWeight: 700, letterSpacing: '.05em', color: '#a78bfa' }}>AI Moderation (BETA)</h2>
        </div>
        <p style={{ fontSize: '.8rem', color: 'var(--dim)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Messages are scanned by an AI moderation system that flags harmful content for staff review. No action is taken automatically — all flags are reviewed by human staff before any punishment is applied. AI moderation is a supplementary tool and does not replace human judgment.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '.65rem' }}>
          {[
            { name: 'Toxicity', desc: 'Toxic, hateful, or abusive messages directed at anyone. Min confidence: 75%', color: '#f87171' },
            { name: 'Threats', desc: 'Threats of violence, harm, or death. Min confidence: 70%', color: '#ef4444' },
            { name: 'Hate Speech', desc: 'Slurs or targeted discrimination against protected groups. Min confidence: 78%', color: '#dc2626' },
            { name: 'Harassment', desc: 'Harassing or bullying a specific individual. Min confidence: 75%', color: '#f97316' },
            { name: 'Sexual Content', desc: 'Explicit sexual content or graphic descriptions. Min confidence: 80%', color: '#eab308' },
            { name: 'Self Harm', desc: 'Promoting or encouraging self harm or suicide. Does not flag help-seeking. Min confidence: 72%', color: '#f59e0b' },
            { name: 'Doxxing', desc: 'Sharing private personal information without consent. Min confidence: 75%', color: '#ef4444' },
            { name: 'Scams & Phishing', desc: 'Scam attempts, phishing, or fake giveaways. Min confidence: 75%', color: '#f87171' },
            { name: 'Illegal Activity', desc: 'Promoting or soliciting clearly illegal activity. Min confidence: 78%', color: '#dc2626' },
            { name: 'Graphic Violence', desc: 'Describing or glorifying graphic violence or gore. Min confidence: 78%', color: '#b91c1c' },
          ].map((trigger, i) => (
            <div key={trigger.name} data-reveal data-delay={String((i % 5) + 1)} className="lift" style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: '.65rem', padding: '.85rem 1rem',
              transition: 'all .2s',
            }}>
              <p style={{ fontFamily: 'var(--display)', fontSize: '.76rem', fontWeight: 700, color: trigger.color, marginBottom: '.3rem' }}>{trigger.name}</p>
              <p style={{ fontSize: '.72rem', color: 'var(--muted)', lineHeight: 1.55 }}>{trigger.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1rem', background: 'rgba(167,139,250,.06)', border: '1px solid rgba(167,139,250,.15)', borderRadius: '.65rem', padding: '.9rem 1.1rem', display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
          <Shield size={14} color="#a78bfa" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontSize: '.76rem', color: 'var(--dim)', lineHeight: 1.7 }}>
              AI moderation flags are for staff review only. Staff confirm every flag before taking action. False positives can occur — if you believe AI flagged your message incorrectly, submit an appeal at{' '}
              <a href="https://zepp.noxxbot.com/appeals/1466990155020898413" target="_blank" rel="noreferrer" style={{ color: '#a78bfa', textDecoration: 'underline' }}>
                zepp.noxxbot.com/appeals/1466990155020898413
              </a>.
            </p>
          </div>
        </div>
      </div>

      {/* Bypass Note */}
      <div data-reveal style={{ background: 'rgba(248,113,113,.04)', border: '1px solid rgba(248,113,113,.12)', borderRadius: '.75rem', padding: '1rem 1.2rem', display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
        <TriangleAlert size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} />
        <p style={{ fontSize: '.77rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Bypass attempts — including character substitution, zero-width characters, alternate accounts, or filter evasion — automatically increase case severity to the maximum available penalty. There is no accidental bypass defence.
        </p>
      </div>
    </div>
  )
}
