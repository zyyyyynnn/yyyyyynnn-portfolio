import type { CSSProperties } from 'react'
import { terminalLines } from '../data/portfolio'

type TerminalTextProps = {
  compact?: boolean
}

export function TerminalText({ compact = false }: TerminalTextProps) {
  const visibleLines = compact ? terminalLines.slice(-4) : terminalLines

  return (
    <div className={compact ? 'terminal-mini-lines' : 'terminal-lines'}>
      {visibleLines.map((line, index) => (
        <div
          key={`${line}-${index}`}
          className="terminal-line"
          style={{ '--line-delay': compact ? '0ms' : `${index * 185}ms` } as CSSProperties}
        >
          {line}
          {index === visibleLines.length - 1 ? <span className="cursor" /> : null}
        </div>
      ))}
    </div>
  )
}
