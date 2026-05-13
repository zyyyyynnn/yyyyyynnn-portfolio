import { useEffect, useRef } from 'react'
import { useTerminalDock } from '../hooks/useTerminalDock'
import { TerminalText } from './TerminalText'
import type { RefObject } from 'react'
import type { TerminalPhase } from '../data/portfolio'

type OpeningTerminalProps = {
  targetRef: RefObject<HTMLDivElement | null>
  phase: TerminalPhase
  setPhase: (phase: TerminalPhase) => void
}

export function OpeningTerminal({ targetRef, phase, setPhase }: OpeningTerminalProps) {
  const coverRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const { startDocking, clearDocking } = useTerminalDock({
    coverRef,
    terminalRef,
    targetRef,
    setPhase,
  })

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPhase('skipped')
      return
    }

    const timer = window.setTimeout(startDocking, 3350)

    return () => {
      window.clearTimeout(timer)
      clearDocking()
    }
  }, [clearDocking, setPhase, startDocking])

  const skip = () => {
    clearDocking()
    setPhase('skipped')
  }

  return (
    <div
      ref={coverRef}
      className={`terminal-cover ${phase}`}
      aria-hidden={phase === 'docked' || phase === 'skipped'}
    >
      <button className="skip" type="button" onClick={skip}>
        Skip
      </button>
      <div
        ref={terminalRef}
        className="terminal-window"
      >
        <div className="terminal-titlebar">
          <div className="terminal-controls" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className="terminal-title">portfolio — archive boot</span>
        </div>
        <TerminalText />
      </div>
    </div>
  )
}
