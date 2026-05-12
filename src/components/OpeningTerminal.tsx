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
  const terminalRef = useRef<HTMLDivElement>(null)
  const { dockStyle, startDocking, clearDockTimer } = useTerminalDock({
    terminalRef,
    targetRef,
    setPhase,
  })

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPhase('skipped')
      return
    }

    const timer = window.setTimeout(startDocking, 3550)

    return () => {
      window.clearTimeout(timer)
      clearDockTimer()
    }
  }, [clearDockTimer, setPhase, startDocking])

  const skip = () => {
    clearDockTimer()
    setPhase('skipped')
  }

  return (
    <div
      className={`terminal-cover ${phase}`}
      aria-hidden={phase === 'docked' || phase === 'skipped'}
    >
      <button className="skip" type="button" onClick={skip}>
        Skip
      </button>
      <div
        ref={terminalRef}
        className="terminal-window"
        style={phase === 'docking' || phase === 'docked' ? dockStyle : undefined}
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
