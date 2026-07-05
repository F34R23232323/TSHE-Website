import React, { useState, useEffect } from 'react'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 2, zIndex: 9998, pointerEvents: 'none' }}>
      <div style={{
        height: '100%', width: `${progress}%`,
        background: 'var(--red)',
        transition: 'width .08s linear',
      }} />
    </div>
  )
}
