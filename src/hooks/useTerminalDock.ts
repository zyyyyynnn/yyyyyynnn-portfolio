import { useCallback, useRef, useState } from 'react'
import type { CSSProperties, RefObject } from 'react'
import type { TerminalPhase } from '../data/portfolio'

type DockStyle = CSSProperties & {
  '--dock-x'?: string
  '--dock-y'?: string
  '--dock-scale'?: string
}

type UseTerminalDockOptions = {
  terminalRef: RefObject<HTMLDivElement | null>
  targetRef: RefObject<HTMLDivElement | null>
  setPhase: (phase: TerminalPhase) => void
}

export function useTerminalDock({ terminalRef, targetRef, setPhase }: UseTerminalDockOptions) {
  const timeoutRefs = useRef<number[]>([])
  const animationRef = useRef<Animation | null>(null)
  const [dockStyle, setDockStyle] = useState<DockStyle>({
    '--dock-x': '0px',
    '--dock-y': '0px',
    '--dock-scale': '1',
  })

  const clearDockTimer = useCallback(() => {
    timeoutRefs.current.forEach((timer) => window.clearTimeout(timer))
    timeoutRefs.current = []
    if (animationRef.current) {
      animationRef.current.cancel()
      animationRef.current = null
    }
  }, [])

  const startDocking = useCallback(() => {
    const terminalElement = terminalRef.current
    const targetElement = targetRef.current

    if (!terminalElement || !targetElement) {
      setPhase('skipped')
      return
    }

    const terminalRect = terminalElement.getBoundingClientRect()
    const targetRect = targetElement.getBoundingClientRect()

    const scale = Math.min(
      (targetRect.width * 0.94) / terminalRect.width,
      (targetRect.height * 0.88) / terminalRect.height,
    )
    const terminalCenterX = terminalRect.left + terminalRect.width / 2
    const terminalCenterY = terminalRect.top + terminalRect.height / 2
    const targetCenterX = targetRect.left + targetRect.width / 2
    const targetCenterY = targetRect.top + targetRect.height / 2
    const translateX = targetCenterX - terminalCenterX
    const translateY = targetCenterY - terminalCenterY
    const finalTransform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`
    const overshootTransform = `translate3d(${translateX * 0.96}px, ${translateY * 0.96}px, 0) scale(${scale * 1.06})`

    setDockStyle({
      '--dock-x': `${translateX}px`,
      '--dock-y': `${translateY}px`,
      '--dock-scale': `${scale}`,
    })
    clearDockTimer()
    terminalElement.style.transform = 'translate3d(0, 0, 0) scale(1)'
    terminalElement.style.opacity = '1'
    terminalElement.style.filter = 'blur(0)'
    terminalElement.style.clipPath = 'inset(0% round 18px)'
    terminalElement.style.borderRadius = '18px'
    setPhase('preparing-dock')

    const dockTimer = window.setTimeout(() => {
      setPhase('docking')
      animationRef.current = terminalElement.animate(
        [
          {
            transform: 'translate3d(0, 0, 0) scale(1)',
            opacity: 1,
            filter: 'blur(0) brightness(1)',
            clipPath: 'inset(0% round 18px)',
            borderRadius: '18px',
            offset: 0,
          },
          {
            transform: `translate3d(${translateX * 0.08}px, ${translateY * 0.08}px, 0) scale(0.985)`,
            opacity: 1,
            filter: 'blur(0) brightness(1.03)',
            clipPath: 'inset(0% round 18px)',
            borderRadius: '18px',
            offset: 0.16,
          },
          {
            transform: `translate3d(${translateX * 0.62}px, ${translateY * 0.62}px, 0) scale(${0.42 + scale * 0.58})`,
            opacity: 0.98,
            filter: 'blur(0.18px) brightness(1.05)',
            clipPath: 'inset(0% round 15px)',
            borderRadius: '15px',
            offset: 0.62,
          },
          {
            transform: overshootTransform,
            opacity: 0.9,
            filter: 'blur(0.28px) brightness(1.08)',
            clipPath: 'inset(2% 4% round 11px)',
            borderRadius: '11px',
            offset: 0.82,
          },
          {
            transform: finalTransform,
            opacity: 0.64,
            filter: 'blur(0.48px) brightness(1.1)',
            clipPath: 'inset(12% 18% round 9px)',
            borderRadius: '9px',
            offset: 0.94,
          },
          {
            transform: finalTransform,
            opacity: 0.36,
            filter: 'blur(0.7px) brightness(1.12)',
            clipPath: 'inset(31% 38% round 9px)',
            borderRadius: '9px',
            offset: 1,
          },
        ],
        {
          duration: 1420,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards',
        },
      )

      const absorbTimer = window.setTimeout(() => setPhase('absorbing'), 1120)
      timeoutRefs.current.push(absorbTimer)
      animationRef.current.finished
        .then(() => {
          terminalElement.style.transform = finalTransform
          terminalElement.style.opacity = '0.32'
          terminalElement.style.filter = 'blur(0.7px) brightness(1.12)'
          terminalElement.style.clipPath = 'inset(31% 38% round 9px)'
          setPhase('docked')
        })
        .catch(() => undefined)
      const doneTimer = window.setTimeout(() => setPhase('docked'), 1660)
      timeoutRefs.current.push(doneTimer)
    }, 180)
    timeoutRefs.current.push(dockTimer)
  }, [clearDockTimer, setPhase, targetRef, terminalRef])

  return { dockStyle, startDocking, clearDockTimer }
}
