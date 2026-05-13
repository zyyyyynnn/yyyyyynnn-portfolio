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
        note="pinned / stray light / 随手拍"
      />
      <div className="photo-board" data-reveal>
        {landscapes.map((landscape) => (
          <article
            className="polaroid"
            key={landscape.id}
            aria-label={`${landscape.city}, ${landscape.note}`}
            style={{ '--r': `${landscape.rotation}deg` } as CSSProperties}
          >
            <span className="photo-corner" aria-hidden="true" />
            <ImageWithFallback
              src={landscape.image}
              alt={landscape.city}
              label={landscape.city}
            />
          </article>
        ))}
        <p className="hand-note board-note">
          光线记录
          <br />
          time pinned
        </p>
      </div>
    </section>
  )
}
