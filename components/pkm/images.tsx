'use client'

import appConfig from '@/config/general'
import { BaseAssetImg, PokeImg as BasePokeImg, PokeImgProps } from '@supeffective/ui'

const BASE_ASSETS_URL = appConfig.static.assetsUrl

export const PokeImg = (props: PokeImgProps) => {
  return <BasePokeImg baseUrl={BASE_ASSETS_URL} variant="home2d-icon" {...props} />
}

export const PokeImg3d = (props: PokeImgProps) => {
  return <BasePokeImg baseUrl={BASE_ASSETS_URL} variant="home3d-icon" {...props} />
}

export const GameImg = ({ assetId, ...rest }: PokeImgProps) => {
  return (
    <BaseAssetImg
      {...rest}
      assetId={`images/games/icons-square/${assetId}`}
      extension="jpg"
      baseWidth={64}
      baseHeight={64}
      baseUrl={BASE_ASSETS_URL}
    />
  )
}
export const GameAvatarImg = ({ assetId, ...rest }: PokeImgProps) => {
  return (
    <BaseAssetImg
      {...rest}
      assetId={`images/games/icons-square/${assetId}`}
      extension="png"
      baseWidth={256}
      baseHeight={256}
      baseUrl={BASE_ASSETS_URL}
    />
  )
}

export const ItemImg = ({ assetId, ...rest }: PokeImgProps) => {
  return (
    <BaseAssetImg
      {...rest}
      assetId={`images/items/gen9-style/${assetId}`}
      extension="png"
      baseWidth={64}
      baseHeight={64}
      baseUrl={BASE_ASSETS_URL}
    />
  )
}

export const RibbonImg = ({ assetId, ...rest }: PokeImgProps) => {
  return (
    <BaseAssetImg
      {...rest}
      assetId={`images/ribbons/gen9-style/${assetId}`}
      extension="png"
      baseWidth={64}
      baseHeight={64}
      baseUrl={BASE_ASSETS_URL}
    />
  )
}
export const MarkImg = ({ assetId, ...rest }: PokeImgProps) => {
  return (
    <BaseAssetImg
      {...rest}
      assetId={`images/marks/gen9-style/${assetId}`}
      extension="png"
      baseWidth={64}
      baseHeight={64}
      baseUrl={BASE_ASSETS_URL}
    />
  )
}
