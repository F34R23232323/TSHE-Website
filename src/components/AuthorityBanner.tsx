import React from 'react'
import { Shield } from 'lucide-react'

export default function AuthorityBanner() {
  return (
    <div style={{
      position: 'relative', zIndex: 250,
      background: 'linear-gradient(135deg, rgba(224,49,49,.09) 0%, rgba(224,49,49,.03) 50%, rgba(230,180,34,.04) 100%)',
      borderBottom: '2px solid rgba(224,49,49,.25)',
      padding: '10px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      animation: 'fadeInDown .4s cubic-bezier(.22,1,.36,1) both',
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'rgba(224,49,49,.12)', border: '1px solid rgba(224,49,49,.3)',
        display: 'grid', placeItems: 'center', flexShrink: 0,
        animation: 'glowPulse 2.5s ease-in-out infinite',
      }}>
        <Shield size={14} color="var(--red)" />
      </div>
      <p style={{
        fontSize: 'clamp(12px, 1.5vw, 13.5px)',
        color: 'var(--text)',
        lineHeight: 1.5,
        textAlign: 'center',
        fontWeight: 500,
      }}>
        <strong style={{ color: 'var(--red2)', fontWeight: 700 }}>Staff Authority:</strong>
        {' '}Staff may <span style={{ color: 'var(--red2)' }}>ban, kick, mute, warn, delete messages</span> and take any moderation action{' '}
        <strong style={{ fontWeight: 700 }}>at any time</strong> — with or without evidence, warning, or stated reason.
        {' '}<a href="/authority" style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Learn more →
        </a>
      </p>
    </div>
  )
}
