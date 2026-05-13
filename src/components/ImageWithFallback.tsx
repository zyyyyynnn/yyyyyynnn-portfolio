import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

type ImageWithFallbackProps = {
  src: string
  alt: string
  className?: string
  label?: string
} & Pick<ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'decoding' | 'fetchPriority'>

export function ImageWithFallback({
  src,
  alt,
  className = '',
  label = 'image pending',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={alt}>
        {label}
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
    />
  )
}
