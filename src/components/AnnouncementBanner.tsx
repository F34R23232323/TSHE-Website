import React, { useState, useEffect } from 'react'
import { Bell, X } from 'lucide-react'
import { getSiteConfig } from '../data/store'

export default function AnnouncementBanner() {
  const [cfg, setCfg] = useState(() => getSiteConfig())
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem('tshe_banner_dismissed') === 'true' } catch { return false }
  })

  useEffect(() => {
    const refresh = () => setCfg(getSiteConfig())
    window.addEventListener('tshe-store-update', refresh)
    window.addEventListener('storage', refresh)
    const id = setInterval(refresh, 1000)
    return () => {
      window.removeEventListener('tshe-store-update', refresh)
      window.removeEventListener('storage', refresh)
      clearInterval(id)
    }
  }, [])

  if (!cfg.announcementEnabled || !cfg.announcementBanner || dismissed) return null
  return (
    <div style={{
      position: 'relative', zIndex: 300,
      background: 'rgba(224,49,49,.06)', borderBottom: '1px solid rgba(224,49,49,.15)',
      padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    }}>
      <Bell size={13} color="var(--red)" style={{ flexShrink: 0 }} />
      <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{cfg.announcementBanner}</p>
      <button onClick={() => { try { sessionStorage.setItem('tshe_banner_dismissed', 'true') } catch {} setDismissed(true) }}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4, flexShrink: 0, marginLeft: 'auto' }}>
        <X size={14} />
      </button>
    </div>
  )
}
