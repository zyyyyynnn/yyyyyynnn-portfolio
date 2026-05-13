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
      <div className="photo-desk" data-reveal>
        <div className="photo-feature">
          <p className="eyebrow">Featured Frame / {landscapes[0].id}</p>
          <ImageWithFallback
            src={landscapes[0].image}
            alt={landscapes[0].city}
            label={landscapes[0].city}
            className="photo-feature-img"
            loading="lazy"
          />
          <p className="hand-note feature-note">travel frame</p>
        </div>
        <div className="photo-board" aria-label="Landscape photography archive">
          {landscapes.slice(1).map((landscape) => (
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
          <p className="hand-note board-note">
            archived light
          </p>
        </div>
      </div>
    </section>
  )
}
