import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.14 },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}
