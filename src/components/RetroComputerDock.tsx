import type { RefObject } from 'react'
import { ImageWithFallback } from './ImageWithFallback'
import { TerminalText } from './TerminalText'

type RetroComputerDockProps = {
  screenRef: RefObject<HTMLDivElement | null>
  active: boolean
  docked: boolean
}

export function RetroComputerDock({ screenRef, active, docked }: RetroComputerDockProps) {
  return (
    <div className="retro-computer-wrap">
      <div className="retro-computer">
        <ImageWithFallback
          src="/assets/hero/retro-computer-terminal-dock.png"
          alt="Retro computer and keyboard terminal dock"
          className="retro-computer-img"
          label="retro computer"
          loading="eager"
          fetchPriority="high"
        />
        <div
          ref={screenRef}
          className={`retro-screen ${active ? 'screen-active' : ''} ${docked ? 'screen-live' : ''}`}
          id="terminal-dock"
        >
          {docked ? <TerminalText compact /> : null}
        </div>
      </div>
      <p className="hand-note computer-note">terminal docks here</p>
    </div>
  )
}
