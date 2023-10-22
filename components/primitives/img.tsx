'use client'

import type { ImgProps } from './types'

/**
 * A component for rendering images with fallback, lazy loading and URL object support.
 * Specially useful when you don't know if the image URL is valid or not (e.g. coming from user-generated content)
 *
 * Uses data-state attribute to indicate the state of the image: loading, loaded or error.
 */
export const Img = (props: ImgProps) => {
  const { alt, src, fallback, loading, ...rest } = props
  const originalSrc = String(src)
  const fallbackSrc = fallback ? String(fallback) : undefined

  if (!src) {
    throw new Error('Img component requires a non-empty src prop')
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={originalSrc}
      loading={loading}
      data-state={'loading'}
      onLoad={(e) => {
        e.currentTarget.setAttribute('data-state', 'loaded')
      }}
      onError={(e) => {
        if (!fallbackSrc) {
          return
        }
        if (e.currentTarget.src === fallbackSrc) {
          console.error(`Failed to load fallback image: ${originalSrc}`)
          return
        }
        e.currentTarget.src = fallbackSrc
        e.currentTarget.setAttribute('data-state', 'error')
      }}
      {...rest}
      alt={alt || ''}
    />
  )
}
