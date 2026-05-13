import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { RefObject } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

export function useGsapReveal(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const scope = scopeRef.current

      if (!scope) {
        return
      }

      const revealItems = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope)
      const reducedMotion = prefersReducedMotion()

      if (reducedMotion) {
        gsap.set(revealItems, {
          opacity: 1,
          y: 0,
          rotation: 0,
          filter: 'none',
          clearProps: 'transform',
        })
        return
      }

      revealItems.forEach((item) => {
        const isPhotoArea = item.classList.contains('photo-desk')
        const targets = isPhotoArea
          ? gsap.utils.toArray<HTMLElement>('.photo-feature, .polaroid', item)
          : [item]
        const animatesChildren = targets.length > 0 && targets[0] !== item

        if (animatesChildren) {
          gsap.set(item, {
            autoAlpha: 1,
            y: 0,
            rotation: 0,
            filter: 'none',
          })
        }

        gsap.fromTo(
          targets,
          {
            autoAlpha: 0,
            y: isPhotoArea ? 16 : 20,
            rotate: isPhotoArea ? 0 : -0.4,
            filter: 'none',
          },
          {
            autoAlpha: 1,
            y: 0,
            rotate: (_index, target) => {
              const element = target as HTMLElement
              const rotation = Number.parseFloat(element.style.getPropertyValue('--r'))
              return element.classList.contains('polaroid') && Number.isFinite(rotation) ? rotation : 0
            },
            filter: 'none',
            duration: isPhotoArea ? 0.38 : 0.56,
            ease: 'power2.out',
            stagger: targets.length > 1 ? 0.03 : 0,
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              once: true,
            },
          },
        )
      })
    },
    { scope: scopeRef },
  )
}
