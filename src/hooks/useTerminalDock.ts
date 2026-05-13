import gsap from 'gsap'
import { useCallback, useRef } from 'react'
import type { RefObject } from 'react'
import type { TerminalPhase } from '../data/portfolio'

type UseTerminalDockOptions = {
  coverRef: RefObject<HTMLDivElement | null>
  terminalRef: RefObject<HTMLDivElement | null>
  targetRef: RefObject<HTMLDivElement | null>
  setPhase: (phase: TerminalPhase) => void
}

export function useTerminalDock({ coverRef, terminalRef, targetRef, setPhase }: UseTerminalDockOptions) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const clearDocking = useCallback(() => {
    timelineRef.current?.kill()
    timelineRef.current = null
  }, [])

  const startDocking = useCallback(() => {
    clearDocking()
    const coverElement = coverRef.current
    const terminalElement = terminalRef.current
    const targetElement = targetRef.current

    if (!coverElement || !terminalElement || !targetElement) {
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

    setPhase('docking')
    targetElement.style.setProperty('--screen-dock-glow', '0')
    gsap.set(coverElement, { autoAlpha: 1 })
    gsap.set(terminalElement, {
      x: 0,
      y: 0,
      scale: 1,
      autoAlpha: 1,
      opacity: 1,
      filter: 'none',
      borderRadius: 16,
      transformOrigin: '50% 50%',
      boxShadow: '0 26px 78px rgba(0, 0, 0, 0.42), 0 1px 0 rgba(255, 255, 255, 0.1) inset',
    })

    timelineRef.current = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        gsap.set(coverElement, { autoAlpha: 0, pointerEvents: 'none' })
        gsap.set(terminalElement, { clearProps: 'transform,opacity,visibility,filter,borderRadius,boxShadow' })
        targetElement.style.removeProperty('--screen-dock-glow')
        timelineRef.current = null
        setPhase('docked')
      },
    })

    timelineRef.current
      .to(terminalElement, {
        scale: 0.985,
        y: -8,
        duration: 0.18,
      })
      .to(
        coverElement,
        {
          backgroundColor: 'rgba(244, 237, 223, 0.18)',
          duration: 0.22,
        },
        '<',
      )
      .to(
        targetElement,
        {
          '--screen-dock-glow': 0.55,
          duration: 0.22,
        },
        '<',
      )
      .to(terminalElement, {
        x: translateX,
        y: translateY,
        scale,
        opacity: 0.92,
        borderRadius: 9,
        boxShadow: '0 8px 22px rgba(0, 0, 0, 0.24), 0 1px 0 rgba(255, 255, 255, 0.08) inset',
        duration: 0.78,
        ease: 'power3.inOut',
      })
      .to(
        targetElement,
        {
          '--screen-dock-glow': 0.82,
          duration: 0.16,
        },
        '-=0.18',
      )
      .to(coverElement, { autoAlpha: 0, duration: 0.12 }, '-=0.04')
  }, [clearDocking, coverRef, setPhase, targetRef, terminalRef])

  return { startDocking, clearDocking }
}
