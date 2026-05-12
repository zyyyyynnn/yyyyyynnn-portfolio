import type { CSSProperties } from 'react'
import { ImageWithFallback } from '../components/ImageWithFallback'
import { SectionHeader } from '../components/SectionHeader'
import { Stamp } from '../components/Stamp'
import { cats } from '../data/portfolio'

export function Cats() {
  return (
    <section className="section cats-section" id="cats">
      <SectionHeader
        number="04"
        title="Cats"
        subtitle="猫猫出没，注意温柔。"
        note="archived cat / quiet visitor"
      />
      <div className="cats-board" data-reveal>
        {cats.map((cat) => (
          <article
            className="cat-piece"
            key={cat.id}
            style={{ '--r': `${cat.rotation}deg` } as CSSProperties}
          >
            <ImageWithFallback src={cat.image} alt={`Cat ${cat.id}`} label={`cat-${cat.id}`} />
            <Stamp>{cat.id}</Stamp>
            <p className="hand-note">{cat.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
