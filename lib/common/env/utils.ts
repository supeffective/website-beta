function _getEnvName(): string {
  return process.env.APP_ENV ?? process.env.NODE_ENV ?? 'development'
}

export function hasDevFeaturesEnabled(): boolean {
  return isDevelopmentEnv() && !isCIEnv()
}

export function isProductionEnv(): boolean {
  return _getEnvName() === 'production'
}

export function isDevelopmentEnv(): boolean {
  return _getEnvName() === 'development'
}

export function isPreviewEnv(): boolean {
  return _getEnvName() === 'preview'
}

export function isCIEnv(): boolean {
  return process.env['CI'] === '1'
}

export function isServerSide(): boolean {
  return typeof window === 'undefined'
}

export function isClientSide(): boolean {
  return typeof window !== 'undefined'
}

export function getNextAppUrl(): URL {
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`)
  }

  if (isDevelopmentEnv()) {
    return new URL('http://localhost:' + (process.env.PORT ?? '3000'))
  }

  if (process.env.APP_BASE_URL) {
    return new URL(process.env.APP_BASE_URL)
  }

  throw new Error('Could not determine the Next.js app URL.')
}
