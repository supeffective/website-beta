import { luciaAuth } from '@/lib/auth/lucia'
import { OAuthProviderId, UserRecord } from '@/lib/auth/types'
import { resolveOAuthProvider } from '@/lib/auth/utils'
import { dd } from '@/lib/utils'
import { isDevelopmentEnv } from '@/lib/utils/env'
import { OAuthRequestError } from '@lucia-auth/oauth'
import type { DiscordUser, GithubUser, PatreonUser } from '@lucia-auth/oauth/providers'
import { cookies, headers } from 'next/headers'

import type { NextRequest } from 'next/server'

export const GET = async (request: NextRequest, context: { params: { provider: OAuthProviderId } }) => {
  const authProvider = resolveOAuthProvider(context.params.provider)
  if (authProvider === undefined) {
    return new Response('Not found', { status: 404 })
  }
  const storedState = cookies().get(authProvider.cookieName)?.value
  const url = new URL(request.url)
  const state = url.searchParams.get('state')
  const code = url.searchParams.get('code')

  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    })
  }

  try {
    const { getExistingUser, createUser, ...more } = await authProvider.provider.validateCallback(code)

    const rest = more as Record<string, any>

    const getUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) {
        return existingUser
      }

      const newUser: Partial<UserRecord> = {}

      if (authProvider.providerId === OAuthProviderId.GITHUB) {
        const data = rest.githubUser as GithubUser
        newUser.githubHandle = data?.login ?? null
        newUser.email = data?.email ?? null
        newUser.avatar = data?.avatar_url ?? null
        newUser.displayName = data?.name ?? null
      }

      if (authProvider.providerId === OAuthProviderId.PATREON) {
        const data = rest.patreonUser as PatreonUser
        dd('PATREON data = ', data)
        newUser.email = data?.attributes.email ?? null
        newUser.emailVerified =
          newUser.email && data?.attributes.is_email_verified === true ? new Date().getTime() / 1000 : null
        newUser.avatar = data?.attributes.image_url ?? null
        newUser.displayName = data?.attributes.full_name ?? null
      }

      if (authProvider.providerId === OAuthProviderId.DISCORD) {
        const data = rest.discordUser as DiscordUser
        dd('DISCORD data = ', data)
        newUser.discordHandle = data?.username ?? null
        newUser.email = data?.email ?? null
        newUser.emailVerified = newUser.email && data?.verified === true ? new Date().getTime() / 1000 : null
        newUser.avatar = data?.avatar ?? null
        newUser.displayName = data?.global_name ?? null
      }

      const user = await createUser({
        attributes: newUser,
      })

      return user
    }

    const user = await getUser()
    dd('user = ', user)
    const session = await luciaAuth.createSession({
      userId: user.userId,
      attributes: {},
    })
    dd('session = ', user)
    const authRequest = luciaAuth.handleRequest(request.method, {
      cookies,
      headers,
    })
    authRequest.setSession(session)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/profile', // redirect to profile page
      },
    })
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response('OAuthRequestError: invalid code', {
        status: 400,
      })
    }

    console.error(e)

    const errMsg = isDevelopmentEnv() ? String(e) : 'Internal server error'
    return new Response(errMsg, {
      status: 500,
    })
  }
}
