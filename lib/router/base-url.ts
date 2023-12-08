import { createBaseUrlFunction } from '../common/env/urls'

const APP_BASE_URL_PROD = 'https://supereffective2024.vercel.app'

export const getBaseUrl = createBaseUrlFunction(APP_BASE_URL_PROD)

export function getAbsoluteUrl(relativePath?: string): string {
  const sanitizedBaseUrl = getBaseUrl().replace(/\/$/, '')

  if (!relativePath) {
    return sanitizedBaseUrl
  }

  const sanitizedPath = relativePath.replace(/^\/|\/$/g, '')
  return `${sanitizedBaseUrl}${sanitizedPath ? '/' + sanitizedPath : '/'}`
}
