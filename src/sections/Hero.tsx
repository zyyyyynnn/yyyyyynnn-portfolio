import type { RefObject } from 'react'
import type { TerminalPhase } from '../data/portfolio'
import { RetroComputerDock } from '../components/RetroComputerDock'

type HeroProps = {
  screenRef: RefObject<HTMLDivElement | null>
  terminalPhase: TerminalPhase
}

export function Hero({ screenRef, terminalPhase }: HeroProps) {
  const docked =
    terminalPhase === 'docking' || terminalPhase === 'docked' || terminalPhase === 'skipped'

  return (
    <section className={`hero-section ${docked ? 'hero-ready' : ''}`} id="home">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">01 Home / Clean Light Paper Archive</p>
        <h1>
          <span>I ship code,</span>
          <br />
          <span>I catch light.</span>
        </h1>
        <p className="hero-subtitle">写代码，也记录光线落下来的方式。</p>
        <p className="identity">yyyyyynnn</p>
        <p className="hand-note hero-note">paper archive / light notes</p>
      </div>
      <div className="hero-stack" data-reveal>
        <div className="kraft-slab" />
        <RetroComputerDock screenRef={screenRef} docked={docked} />
      </div>
    </section>
  )
}
