import { useMemo, useRef, useState } from 'react'
import { OpeningTerminal } from './components/OpeningTerminal'
import { SiteNav } from './components/SiteNav'
import { useReveal } from './hooks/useReveal'
import { AboutContact } from './sections/AboutContact'
import { Cats } from './sections/Cats'
import { Hero } from './sections/Hero'
import { Landscapes } from './sections/Landscapes'
import { Projects } from './sections/Projects'
import type { TerminalPhase } from './data/portfolio'

function App() {
  useReveal()

  const screenRef = useRef<HTMLDivElement>(null)
  const [terminalPhase, setTerminalPhase] = useState<TerminalPhase>('typing')
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <main className="site-shell">
      <OpeningTerminal
        targetRef={screenRef}
        phase={terminalPhase}
        setPhase={setTerminalPhase}
      />
      <SiteNav />
      <Hero screenRef={screenRef} terminalPhase={terminalPhase} />
      <Projects />
      <Landscapes />
      <Cats />
      <AboutContact />
      <footer className="site-footer">
        © {year} yyyyyynnn. Design with calm. Code with care.
      </footer>
    </main>
  )
}

export default App
