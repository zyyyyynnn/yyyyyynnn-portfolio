import { useEffect, useRef, useState } from 'react'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function useProjectScroll(total: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const update = () => {
      if (!ref.current) {
        return
      }

      const rect = ref.current.getBoundingClientRect()
      const scrollable = Math.max(ref.current.offsetHeight - window.innerHeight, 1)
      setProgress(clamp(-rect.top / scrollable, 0, 1))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [total])

  return { ref, progress }
}
