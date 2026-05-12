import { useState } from 'react'

type ImageWithFallbackProps = {
  src: string
  alt: string
  className?: string
  label?: string
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  label = 'image pending',
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={alt}>
        {label}
      </div>
    )
  }

  return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />
}
