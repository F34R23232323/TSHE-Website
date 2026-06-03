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
    <div style={{ position: 'relative', zIndex: 300, background: 'rgba(126,200,227,.08)', borderBottom: '1px solid rgba(126,200,227,.2)', padding: '.45rem 1rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '.65rem' }}>
      <Bell size={12} color="var(--ice)" style={{ flexShrink: 0 }} />
      <p style={{ fontSize: '.78rem', color: 'var(--ice3)', lineHeight: 1.5 }}>{cfg.announcementBanner}</p>
      <button onClick={() => { try { sessionStorage.setItem('tshe_banner_dismissed', 'true') } catch {} setDismissed(true) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dim)', padding: '.15rem', flexShrink: 0, marginLeft: 'auto' }}>
        <X size={13} />
      </button>
    </div>
  )
}
