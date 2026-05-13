import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useProjectScroll(total: number) {
  const ref = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(
    () => {
      const element = ref.current
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

      if (!element || reducedMotion) {
        setActiveIndex(0)
        return
      }

      const cards = gsap.utils.toArray<HTMLElement>('[data-project-card]', element)
      const tags = gsap.utils.toArray<HTMLElement>('.stack-tags span', element)
      const stage = element.querySelector<HTMLElement>('.project-scroll-stage')

      gsap.set(cards, {
        yPercent: (index) => (index === 0 ? 0 : 12 + index * 8),
        xPercent: (index) => index * 1.4,
        rotate: (index) => (index === 0 ? -0.4 : 1.6 + index * 0.8),
        scale: (index) => 1 - index * 0.035,
        autoAlpha: (index) => (index === 0 ? 1 : 0.55),
        zIndex: (index) => cards.length - index,
      })
      gsap.set(tags, { y: 0, autoAlpha: 1 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top top+=72',
          end: () => `+=${window.innerHeight * Math.max(total - 1, 1) * 0.78}`,
          scrub: 0.55,
          pin: stage ?? false,
          anticipatePin: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextIndex = Math.min(total - 1, Math.round(self.progress * (total - 1)))

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex
              setActiveIndex(nextIndex)
            }
          },
        },
      })

      cards.forEach((card, index) => {
        const startAt = index / Math.max(total - 1, 1)

        timeline.to(
          card,
          {
            yPercent: index === 0 ? -10 : 0,
            xPercent: 0,
            rotate: index === 0 ? -1.4 : 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.44,
            ease: 'power2.out',
          },
          startAt,
        )

        if (index < cards.length - 1) {
          timeline.to(
            card,
            {
              yPercent: -22,
              xPercent: -2,
              rotate: -2.8,
              scale: 0.94,
              autoAlpha: 0.36,
              duration: 0.5,
              ease: 'power2.inOut',
            },
            startAt + 0.42,
          )
        }
      })

      return () => {
        timeline.kill()
      }
    },
    { dependencies: [total], scope: ref },
  )

  return { ref, activeIndex }
}
