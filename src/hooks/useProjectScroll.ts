import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useProjectScroll() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const element = ref.current
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

      if (!element || reducedMotion) {
        return
      }

      const cards = gsap.utils.toArray<HTMLElement>('[data-project-card]', element)
      gsap.set(cards, { autoAlpha: 0, y: 34 })

      const triggers = cards.map((card) =>
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.58,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            once: true,
          },
        }),
      )

      return () => {
        triggers.forEach((animation) => {
          animation.scrollTrigger?.kill()
          animation.kill()
        })
      }
    },
    { scope: ref },
  )

  return { ref }
}
