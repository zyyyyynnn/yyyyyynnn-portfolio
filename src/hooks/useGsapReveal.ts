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
          filter: 'blur(0)',
          clearProps: 'transform',
        })
        return
      }

      revealItems.forEach((item) => {
        const targets = item.classList.contains('photo-board')
          ? gsap.utils.toArray<HTMLElement>('.polaroid', item)
          : item.classList.contains('project-scroll-shell')
            ? gsap.utils.toArray<HTMLElement>('.project-index-panel, .project-scroll-card', item)
            : [item]
        const animatesChildren = targets.length > 0 && targets[0] !== item

        if (animatesChildren) {
          gsap.set(item, {
            autoAlpha: 1,
            y: 0,
            rotation: 0,
            filter: 'blur(0)',
          })
        }

        gsap.fromTo(
          targets,
          {
            autoAlpha: 0,
            y: 24,
            rotate: -1,
            filter: 'blur(2px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            rotate: (_index, target) => {
              const element = target as HTMLElement
              const rotation = Number.parseFloat(element.style.getPropertyValue('--r'))
              return element.classList.contains('polaroid') && Number.isFinite(rotation) ? rotation : 0
            },
            filter: 'blur(0)',
            duration: 0.78,
            ease: 'power3.out',
            stagger: targets.length > 1 ? 0.09 : 0,
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
