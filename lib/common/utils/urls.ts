import { isClientSide, isDevelopmentEnv, isLocalDevelopmentEnv, isProductionEnv, isVercel } from '../env/utils'

const DOMAIN_URL_PROD = 'https://supereffective2024.vercel.app'

export function getBaseUrl(): string {
  if (isClientSide()) {
    return window.location.origin
  }

  if (isProductionEnv()) {
    return DOMAIN_URL_PROD
  }

  if (isDevelopmentEnv() && !isVercel()) {
    return `http://localhost:${process.env.PORT ?? '3000'}`
  }

  const vercelUrl = _getEnvVercelUrl()
  const appUrl = _getEnvAppUrl()

  if (appUrl) {
    return appUrl
  }

  if (vercelUrl) {
    return vercelUrl
  }

  throw new Error('Could not determine the Next.js app base URL.')
}

export function getAbsoluteUrl(relativePath?: string): string {
  const sanitizedBaseUrl = getBaseUrl().replace(/\/$/, '')

  if (!relativePath) {
    return sanitizedBaseUrl
  }

  const sanitizedPath = relativePath.replace(/^\/|\/$/g, '')
  return `${sanitizedBaseUrl}${sanitizedPath ? '/' + sanitizedPath : '/'}`
}

function _getHttpProtocol() {
  if (isLocalDevelopmentEnv()) {
    return 'http://'
  }
  return 'https://'
}

function _getEnvAppUrl(): string {
  const appUrl = process.env.APP_BASE_URL ?? process.env.NEXT_PUBLIC_APP_BASE_URL

  if (!appUrl) {
    return ''
  }

  return appUrl
}

function _getEnvVercelUrl(): string {
  const vercelUrl = process.env.VERCEL_URL

  if (!vercelUrl) {
    return ''
  }

  if (!vercelUrl.startsWith('http')) {
    return `${_getHttpProtocol()}${process.env.VERCEL_URL}`
  }

  return vercelUrl
}
