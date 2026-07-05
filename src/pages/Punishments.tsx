import React from 'react'
import { Shield, AlertTriangle, ChevronRight } from 'lucide-react'
import { getTiers, getWarnSteps } from '../data/store'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Punishments() {
  useScrollReveal()
  const punishmentTiers = getTiers()
  const warnSteps = getWarnSteps()
  return (
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <div data-reveal style={{
          display: 'inline-flex', alignItems: 'center', gap: '.5rem',
          background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.2)',
          borderRadius: 99, padding: '.3rem .9rem',
          fontSize: '.62rem', letterSpacing: '.12em',
          color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem',
        }}>
          <Shield size={10} /> Disciplinary System
        </div>
        <h1 data-reveal data-delay="1" style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700, letterSpacing: '-.02em', marginBottom: '.75rem',
          background: 'linear-gradient(135deg, var(--gold2), var(--gold))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Punishment Guide
        </h1>
        <p data-reveal data-delay="2" style={{ fontSize: '.88rem', color: 'var(--dim)', maxWidth: 560, margin: '0 auto' }}>
          SnowHaven moderation follows a graduated system based on severity. Warnings are permanent — they never expire, reset, or diminish. All penalties scale with cumulative lifetime history.
        </p>
      </div>

      {/* Tier table */}
      <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '1rem', overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '.65rem' }}>
          <Shield size={16} color="var(--gold)" />
          <h2 style={{ fontFamily: 'var(--font)', fontSize: '.88rem', fontWeight: 700, letterSpacing: '.05em' }}>Punishment Tiers</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.8rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg2)' }}>
                {['Tier', 'Level', 'Duration', 'Description'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '.6rem 1rem',
                    fontFamily: 'var(--font)', fontSize: '.6rem', letterSpacing: '.1em',
                    textTransform: 'uppercase', color: 'var(--muted)',
                    borderBottom: '1px solid var(--border)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {punishmentTiers.map(t => (
                <tr key={t.level} style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                  <td style={{ padding: '.75rem 1rem' }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '.4rem',
                      background: t.color + '20', border: `1px solid ${t.color}40`,
                      display: 'grid', placeItems: 'center',
                      fontFamily: 'var(--font)', fontSize: '.7rem', fontWeight: 800, color: t.color,
                    }}>{t.level}</div>
                  </td>
                  <td style={{ padding: '.75rem 1rem', color: t.color, fontFamily: 'var(--font)', fontSize: '.75rem', fontWeight: 700 }}>{t.label}</td>
                  <td style={{ padding: '.75rem 1rem', color: 'var(--text)', fontFamily: 'var(--mono, monospace)', fontSize: '.72rem' }}>{t.duration}</td>
                  <td style={{ padding: '.75rem 1rem', color: 'var(--dim)', lineHeight: 1.5 }}>{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Warning escalation */}
      <div data-reveal style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: '1rem', overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '.65rem' }}>
          <AlertTriangle size={16} color="var(--red)" />
          <h2 style={{ fontFamily: 'var(--font)', fontSize: '.88rem', fontWeight: 700, letterSpacing: '.05em' }}>Warning Escalation Ladder</h2>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: '1.25rem', lineHeight: 1.7 }}>
            Each warning is permanent and never expires. Warnings accumulate over your lifetime — there are no resets, no expiry windows, and no clean slates. Major offenses (Hate Speech, Doxxing, CSAM, Threats, etc.) bypass this system entirely and result in immediate permanent action.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {warnSteps.map((w, i) => {
              const pct = (i + 1) / warnSteps.length
              const hue = Math.round(120 - pct * 120) // green → red
              const color = `hsl(${hue}, 65%, 60%)`
              return (
                <div key={w.warns} style={{
                  display: 'flex', alignItems: 'center', gap: '.85rem',
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: '.6rem', padding: '.65rem .9rem',
                }}>
                  <div style={{
                    minWidth: 32, height: 32, borderRadius: '.4rem',
                    background: color + '20', border: `1px solid ${color}40`,
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: 'var(--font)', fontSize: '.7rem', fontWeight: 800, color }}>{w.warns}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '.8rem', color: 'var(--text)', fontWeight: 600 }}>{w.consequence}</span>
                  </div>
                  {w.appealable && (
                    <span style={{
                      fontSize: '.6rem', fontFamily: 'var(--font)', letterSpacing: '.06em',
                      padding: '2px 8px', borderRadius: 4,
                      background: 'rgba(200,30,50,.1)', border: '1px solid rgba(200,30,50,.2)',
                      color: 'var(--red2)', flexShrink: 0,
                    }}>Appealable</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {[
          { title: 'No Loopholes', body: 'Attempts to evade moderation, manipulate wording, or exploit perceived loopholes will result in the maximum penalty plus an additional warning. All staff decisions are final.' },
          { title: 'Permanent Record', body: 'Your full moderation history is visible to all staff on every case. There are no resets, no expiration, and no clean slates. Returning from a ban does not clear your record.' },
          { title: 'Staff Discretion', body: 'Staff may act on any behavior deemed harmful or disruptive, even if not explicitly listed. Staff may skip tiers upward at any time. Tier skipping is always documented.' },
        ].map(n => (
          <div key={n.title} style={{
            background: 'rgba(201,168,76,.05)', border: '1px solid rgba(201,168,76,.15)',
            borderRadius: 'var(--radius)', padding: '1.1rem 1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '.5rem' }}>
              <ChevronRight size={13} color="var(--gold)" />
              <p style={{ fontFamily: 'var(--font)', fontSize: '.78rem', fontWeight: 700, color: 'var(--gold)' }}>{n.title}</p>
            </div>
            <p style={{ fontSize: '.76rem', color: 'var(--muted)', lineHeight: 1.65 }}>{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
