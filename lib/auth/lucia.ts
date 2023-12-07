import { mysql2, planetscale } from '@lucia-auth/adapter-mysql'
import { lucia } from 'lucia'
import { nextjs_future } from 'lucia/middleware'

import { isDevelopmentEnv, isProductionEnv } from '../common/env/utils'
import { connection } from '../db/client'
import { authTableNames } from './db-schema'
import { OAuthProviderId, UserRecord } from './types'

import { envVars } from '@/config/env/server-vars'
import { discord, github, patreon } from '@lucia-auth/oauth/providers'

function resolveLuciaAdapter() {
  if (connection.type === 'planetscale') {
    return planetscale(connection.connection, authTableNames)
  } else {
    return mysql2(connection.connection, authTableNames)
  }
}

export const luciaAuth = lucia({
  env: isProductionEnv() ? 'PROD' : 'DEV',
  adapter: resolveLuciaAdapter(),
  middleware: nextjs_future(),
  sessionCookie: {
    // Set sessionCookie.expires to false since (on Next.js) we can’t update the session cookie when validating them.
    expires: false,
  },
  getUserAttributes: (databaseUser: UserRecord): Partial<UserRecord> => {
    // We’ll also expose these DB columns to the User object by defining getUserAttributes.
    return {
      email: databaseUser.email,
      displayName: databaseUser.displayName,
    }
  },
})

// export type LuciaAuth = typeof luciaAuth

const prodBaseRedirectUri =
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
  process.env.APP_BASE_URL ??
  'https://supereffective2024.vercel.app'
const baseRedirectUri = isDevelopmentEnv() ? 'http://localhost:3000' : prodBaseRedirectUri

export const githubAuth = github(luciaAuth, {
  clientId: envVars.GITHUB_APP_CLIENT_ID,
  clientSecret: envVars.GITHUB_APP_CLIENT_SECRET,
  redirectUri: baseRedirectUri + '/auth/github/callback',
  scope: ['read:user', 'user:email'],
})

export const patreonAuth = patreon(luciaAuth, {
  clientId: envVars.PATREON_APP_CLIENT_ID,
  clientSecret: envVars.PATREON_APP_CLIENT_SECRET,
  scope: ['identity[email]', 'identity.memberships'],
  redirectUri: baseRedirectUri + '/auth/patreon/callback',
})

export const discordAuth = discord(luciaAuth, {
  clientId: envVars.DISCORD_APP_CLIENT_ID,
  clientSecret: envVars.DISCORD_APP_CLIENT_SECRET,
  scope: ['identify', 'email'],
  redirectUri: baseRedirectUri + '/auth/discord/callback',
})

export const authProviders = {
  [OAuthProviderId.GITHUB]: githubAuth,
  [OAuthProviderId.PATREON]: patreonAuth,
  [OAuthProviderId.DISCORD]: discordAuth,
}
