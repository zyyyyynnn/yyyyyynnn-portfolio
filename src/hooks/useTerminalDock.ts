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
  const timeoutRef = useRef<number | null>(null)
  const animationRef = useRef<Animation | null>(null)
  const [dockStyle, setDockStyle] = useState<DockStyle>({
    '--dock-x': '0px',
    '--dock-y': '0px',
    '--dock-scale': '1',
  })

  const clearDockTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
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
      (targetRect.width * 0.86) / terminalRect.width,
      (targetRect.height * 0.76) / terminalRect.height,
    )
    const terminalCenterX = terminalRect.left + terminalRect.width / 2
    const terminalCenterY = terminalRect.top + terminalRect.height / 2
    const targetCenterX = targetRect.left + targetRect.width / 2
    const targetCenterY = targetRect.top + targetRect.height / 2
    const translateX = targetCenterX - terminalCenterX
    const translateY = targetCenterY - terminalCenterY
    const finalTransform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`

    setDockStyle({
      '--dock-x': `${translateX}px`,
      '--dock-y': `${translateY}px`,
      '--dock-scale': `${scale}`,
    })
    clearDockTimer()
    terminalElement.style.transform = 'translate3d(0, 0, 0) scale(1)'
    terminalElement.style.opacity = '1'
    terminalElement.style.filter = 'blur(0)'
    setPhase('docking')

    animationRef.current = terminalElement.animate(
      [
        {
          transform: 'translate3d(0, 0, 0) scale(1)',
          opacity: 1,
          filter: 'blur(0)',
          offset: 0,
        },
        {
          transform: `translate3d(${translateX * 0.2}px, ${translateY * 0.2}px, 0) scale(${0.86 + scale * 0.14})`,
          opacity: 1,
          filter: 'blur(0)',
          offset: 0.18,
        },
        {
          transform: `translate3d(${translateX * 0.72}px, ${translateY * 0.72}px, 0) scale(${0.34 + scale * 0.66})`,
          opacity: 0.76,
          filter: 'blur(0.35px)',
          offset: 0.58,
        },
        {
          transform: finalTransform,
          opacity: 0.12,
          filter: 'blur(0.9px)',
          offset: 0.86,
        },
        {
          transform: finalTransform,
          opacity: 0,
          filter: 'blur(1.2px)',
          offset: 1,
        },
      ],
      {
        duration: 1320,
        easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
        fill: 'forwards',
      },
    )

    animationRef.current.finished
      .then(() => {
        terminalElement.style.transform = finalTransform
        terminalElement.style.opacity = '0'
        terminalElement.style.filter = 'blur(1.2px)'
        setPhase('docked')
      })
      .catch(() => undefined)
    timeoutRef.current = window.setTimeout(() => setPhase('docked'), 1480)
  }, [clearDockTimer, setPhase, targetRef, terminalRef])

  return { dockStyle, startDocking, clearDockTimer }
}
