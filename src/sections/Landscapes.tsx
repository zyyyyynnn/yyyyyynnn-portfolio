import type { CSSProperties } from 'react'
import { ImageWithFallback } from '../components/ImageWithFallback'
import { SectionHeader } from '../components/SectionHeader'
import { landscapes } from '../data/portfolio'

export function Landscapes() {
  return (
    <section className="section photos-section" id="photos">
      <SectionHeader
        number="03"
        title="Landscape Photography"
        subtitle="风景摄影 · 光线记录"
        note="travel frame / city trace"
      />
      <div className="photo-board" data-reveal>
        {landscapes.map((landscape) => (
          <article
            className="polaroid"
            key={landscape.id}
            aria-label={`${landscape.city}, ${landscape.note}`}
            style={{ '--r': `${landscape.rotation}deg` } as CSSProperties}
          >
            <ImageWithFallback
              src={landscape.image}
              alt={landscape.city}
              label={landscape.city}
              loading="lazy"
            />
            <p className="polaroid-caption">{landscape.city} / {landscape.note}</p>
          </article>
        ))}
        <p className="hand-note board-note">archived light</p>
      </div>
    </section>
  )
}
