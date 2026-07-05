import React, { useState, useEffect, useCallback } from 'react'
import { ChevronUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 500)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 500,
        width: 40, height: 40, borderRadius: 'var(--radius)',
        background: 'var(--bg2)', border: '1px solid var(--border)',
        color: 'var(--dim)', display: 'grid', placeItems: 'center',
        cursor: 'pointer', transition: 'all .15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--dim)' }}
    >
      <ChevronUp size={18} />
    </button>
  )
}
