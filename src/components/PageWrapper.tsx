import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })

    const el = ref.current
    if (!el) return
    el.classList.remove('page-enter')
    void el.offsetWidth
    el.classList.add('page-enter')
  }, [pathname])

  return (
    <div ref={ref} className="page-enter" style={{ minHeight: '60vh' }}>
      {children}
    </div>
  )
}
