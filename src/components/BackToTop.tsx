import React, { useState, useEffect, useCallback } from 'react'
import { ChevronUp, ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const percent = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
    setScrollPercent(percent)
    setVisible(scrollTop > 400)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 500,
        width: 42,
        height: 42,
        borderRadius: '50%',
        background: 'rgba(10,16,34,.9)',
        border: '1px solid rgba(126,200,227,.2)',
        color: 'var(--ice)',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        animation: 'scaleIn .3s cubic-bezier(.22,1,.36,1) both',
        transition: 'all .2s ease',
        boxShadow: `0 0 ${10 + scrollPercent * 0.3}px rgba(126,200,227,${.05 + scrollPercent * 0.001})`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(126,200,227,.4)'
        e.currentTarget.style.boxShadow = '0 0 25px rgba(126,200,227,.15)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(126,200,227,.2)'
        e.currentTarget.style.boxShadow = `0 0 ${10 + scrollPercent * 0.3}px rgba(126,200,227,${.05 + scrollPercent * 0.001})`
        e.currentTarget.style.transform = 'none'
      }}
    >
      {/* Circular progress ring */}
      <svg
        style={{ position: 'absolute', inset: -3, width: 'calc(100% + 6px)', height: 'calc(100% + 6px)', transform: 'rotate(-90deg)' }}
        viewBox="0 0 48 48"
      >
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(126,200,227,.08)" strokeWidth="2" />
        <circle
          cx="24" cy="24" r="20"
          fill="none"
          stroke="var(--ice)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 20}`}
          strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollPercent / 100)}`}
          style={{ transition: 'stroke-dashoffset .15s ease' }}
        />
      </svg>
      <ChevronUp size={18} style={{ position: 'relative', zIndex: 1 }} />
    </button>
  )
}
