import appConfig from '@/config/general'
import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'
import { Img } from '../primitives/img'

export type BaseAssetImgProps = {
  assetId: string
  baseUrl?: string
  baseWidth?: number
  baseHeight?: number
  extension?: string
  fallback?: string | URL
  imgClassName?: string
} & ComponentPropsWithoutRef<'span'>

export function BaseAssetImg({
  className,
  imgClassName,
  assetId,
  fallback,
  title,
  baseUrl,
  baseWidth = 64,
  baseHeight = 64,
  extension = 'png',
  children,
  ...rest
}: BaseAssetImgProps): JSX.Element {
  function _renderImg() {
    const imgClasses = cn('relative block w-100 h-auto pointer-events-none', imgClassName)

    if (!assetId) {
      return <span className={cn(imgClasses, 'empty-asset-img')}>&nbsp;</span>
    }

    const _baseUrl = baseUrl ?? appConfig.static.assetsUrl
    const imgSrc = `${_baseUrl}/${assetId}.${extension}`
    const fallbackSrc = fallback ? `${_baseUrl}/${fallback}.${extension}` : undefined

    return (
      <Img
        data-asset={String(assetId)}
        src={imgSrc}
        loading="lazy"
        alt={title ?? assetId}
        width={baseWidth}
        height={baseHeight}
        fallback={fallbackSrc}
        className={imgClasses}
      />
    )
  }

  return (
    <span
      title={title ?? assetId ?? ''}
      className={cn(
        'relative inline-flex h-auto min-w-[1rem] max-w-full select-none',
        'items-center justify-center text-[0] font-normal leading-[0]',
        className,
      )}
      {...rest}
    >
      {_renderImg()}
      {children}
    </span>
  )
}
