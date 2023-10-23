import appConfig from '@/config/general'
import { BaseAssetImg, type BaseAssetImgProps } from './base-img'

const BASE_ASSETS_URL = appConfig.static.assetsUrl

type PokeImgProps = {
  shiny?: boolean
} & BaseAssetImgProps

export const PokeImg = ({ assetId, shiny, ...rest }: PokeImgProps) => {
  const resolvedAssetId = shiny
    ? `images/pokemon/home3d-icon-bordered/shiny/${assetId}`
    : `images/pokemon/home2d-icon/regular/${assetId}`

  return (
    <BaseAssetImg
      {...rest}
      assetId={resolvedAssetId}
      fallback={`images/pokemon/home2d-icon/unknown`}
      extension="png"
      baseWidth={128}
      baseHeight={128}
      baseUrl={BASE_ASSETS_URL}
    />
  )
}

export const PokeImg3d = ({ assetId, shiny, ...rest }: PokeImgProps) => {
  const resolvedAssetId = shiny
    ? `images/pokemon/home3d-icon-bordered/shiny/${assetId}`
    : `images/pokemon/home3d-icon-bordered/regular/${assetId}`

  return (
    <BaseAssetImg
      {...rest}
      assetId={resolvedAssetId}
      fallback={`images/pokemon/home3d-icon-bordered/unknown`}
      extension="png"
      baseWidth={264}
      baseHeight={264}
      baseUrl={BASE_ASSETS_URL}
    />
  )
}

export const GameImg = ({ assetId, ...rest }: BaseAssetImgProps) => {
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
export const GameAvatarImg = ({ assetId, ...rest }: BaseAssetImgProps) => {
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

export const ItemImg = ({ assetId, ...rest }: BaseAssetImgProps) => {
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

export const RibbonImg = ({ assetId, ...rest }: BaseAssetImgProps) => {
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
export const MarkImg = ({ assetId, ...rest }: BaseAssetImgProps) => {
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
