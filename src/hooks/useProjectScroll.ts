import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function useProjectScroll(total: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useGSAP(
    () => {
      const element = ref.current
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

      if (!element || reducedMotion) {
        setProgress(0)
        return
      }

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top top+=72',
        end: 'bottom bottom',
        scrub: 0.35,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setProgress(clamp(self.progress, 0, 1))
        },
      })

      return () => {
        trigger.kill()
      }
    },
    { dependencies: [total], scope: ref },
  )

  return { ref, progress }
}
