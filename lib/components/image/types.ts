import type { ComponentPropsWithoutRef } from 'react'

export type ImgProps = {
  src: string | URL
  /**
   * Image to show if the main image fails to load. It will fallback to 'src' if not provided.
   */
  fallback?: string | URL
} & Omit<ComponentPropsWithoutRef<'img'>, 'src'>

export type ImgState = 'loading' | 'error' | 'loaded'
