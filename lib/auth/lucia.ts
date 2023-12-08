import '@/lib/utils/env/server-only'

import { mysql2, planetscale } from '@lucia-auth/adapter-mysql'
import { lucia } from 'lucia'
import { nextjs_future } from 'lucia/middleware'

import { connection } from '../db/client'
import { authTableNames } from './db-schema'
import { OAuthProviderId, UserRecord } from './types'

import { envVars } from '@/config/env/server-vars'
import { discord, github, patreon } from '@lucia-auth/oauth/providers'
import { getAbsoluteUrl } from '../router/base-url'

function resolveLuciaAdapter() {
  if (connection.type === 'planetscale') {
    return planetscale(connection.connection, authTableNames)
  } else {
    return mysql2(connection.connection, authTableNames)
  }
}

export const luciaAuth = lucia({
  env: envVars.DB_PROVIDER === 'mysql_planetscale' ? 'PROD' : 'DEV',
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

export const githubAuth = github(luciaAuth, {
  clientId: envVars.GITHUB_APP_CLIENT_ID,
  clientSecret: envVars.GITHUB_APP_CLIENT_SECRET,
  redirectUri: getAbsoluteUrl('/auth/github/callback'),
  scope: ['read:user', 'user:email'],
})

export const patreonAuth = patreon(luciaAuth, {
  clientId: envVars.PATREON_APP_CLIENT_ID,
  clientSecret: envVars.PATREON_APP_CLIENT_SECRET,
  scope: ['identity[email]', 'identity.memberships'],
  redirectUri: getAbsoluteUrl('/auth/patreon/callback'),
})

export const discordAuth = discord(luciaAuth, {
  clientId: envVars.DISCORD_APP_CLIENT_ID,
  clientSecret: envVars.DISCORD_APP_CLIENT_SECRET,
  scope: ['identify', 'email'],
  redirectUri: getAbsoluteUrl('/auth/discord/callback'),
})

export const authProviders = {
  [OAuthProviderId.GITHUB]: githubAuth,
  [OAuthProviderId.PATREON]: patreonAuth,
  [OAuthProviderId.DISCORD]: discordAuth,
}
