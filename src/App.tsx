import { useMemo, useRef, useState } from 'react'
import { OpeningTerminal } from './components/OpeningTerminal'
import { SiteNav } from './components/SiteNav'
import { useGsapReveal } from './hooks/useGsapReveal'
import { AboutContact } from './sections/AboutContact'
import { Hero } from './sections/Hero'
import { Landscapes } from './sections/Landscapes'
import { Projects } from './sections/Projects'
import type { TerminalPhase } from './data/portfolio'

function App() {
  const shellRef = useRef<HTMLElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const [terminalPhase, setTerminalPhase] = useState<TerminalPhase>('typing')
  const year = useMemo(() => new Date().getFullYear(), [])

  useGsapReveal(shellRef)

  return (
    <main className="site-shell" ref={shellRef}>
      <OpeningTerminal
        targetRef={screenRef}
        phase={terminalPhase}
        setPhase={setTerminalPhase}
      />
      <SiteNav />
      <Hero screenRef={screenRef} terminalPhase={terminalPhase} />
      <Projects />
      <Landscapes />
      <AboutContact />
      <footer className="site-footer">
        © {year} yyyyyynnn. Design with calm. Code with care.
      </footer>
    </main>
  )
}

export default App
