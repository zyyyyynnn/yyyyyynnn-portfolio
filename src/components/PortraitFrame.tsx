import { ImageWithFallback } from './ImageWithFallback'

export function PortraitFrame() {
  return (
    <div className="portrait-frame" data-reveal>
      <ImageWithFallback
        src="/assets/about/about-portrait.jpg"
        alt="Personal portrait"
        label="portrait unavailable"
        className="portrait-img"
      />
      <div className="portrait-meta" aria-hidden="true">
        <span>portrait pending</span>
        <span>frame 04</span>
      </div>
    </div>
  )
}
