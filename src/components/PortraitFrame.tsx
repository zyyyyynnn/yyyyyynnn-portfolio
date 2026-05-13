import { ImageWithFallback } from './ImageWithFallback'

export function PortraitFrame() {
  return (
    <div className="portrait-frame" data-reveal>
      <span className="portrait-tape" aria-hidden="true" />
      <ImageWithFallback
        src="/assets/about/about-portrait.jpg"
        alt="Portrait frame placeholder"
        label="portrait pending"
        className="portrait-img"
      />
      <div className="portrait-meta" aria-hidden="true">
        <span>portrait pending</span>
        <span>frame 04</span>
      </div>
    </div>
  )
}
