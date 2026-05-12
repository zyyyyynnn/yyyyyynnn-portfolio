type SectionHeaderProps = {
  number: string
  title: string
  subtitle: string
  note?: string
}

export function SectionHeader({ number, title, subtitle, note }: SectionHeaderProps) {
  return (
    <div className="section-header" data-reveal>
      <div className="section-index">{number}</div>
      <div>
        <p className="eyebrow">Paper Archive / {number}</p>
        <h2>{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>
      {note ? <p className="hand-note header-note">{note}</p> : null}
    </div>
  )
}
