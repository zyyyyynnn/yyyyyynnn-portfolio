import type { ReactNode } from 'react'

type StampProps = {
  children: ReactNode
  className?: string
}

export function Stamp({ children, className = '' }: StampProps) {
  return <span className={`stamp ${className}`}>{children}</span>
}
