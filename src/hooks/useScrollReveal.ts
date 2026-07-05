import { useEffect, useRef } from 'react'

const REVEAL_ATTRS = ['data-reveal', 'data-reveal-left', 'data-reveal-right', 'data-reveal-scale']

export function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
              observerRef.current!.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      )
    }

    const ob = observerRef.current

    const observe = () => {
      REVEAL_ATTRS.forEach(attr => {
        document.querySelectorAll(`[${attr}]:not(.revealed)`).forEach(el => {
          ob.observe(el)
        })
      })
    }

    observe()

    const mutationObserver = new MutationObserver(() => {
      observe()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    const t = setTimeout(observe, 120)

    return () => {
      clearTimeout(t)
      mutationObserver.disconnect()
    }
  }, [])
}
