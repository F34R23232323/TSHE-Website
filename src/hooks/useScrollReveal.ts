import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    // Observe all elements with data-reveal
    const observe = () => {
      document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(el => {
        observer.observe(el)
      })
    }

    observe()

    // Re-observe after a tick for dynamically rendered content
    const t = setTimeout(observe, 100)

    return () => {
      clearTimeout(t)
      observer.disconnect()
    }
  })
}
