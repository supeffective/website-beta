import { OAuthProviderId } from '@/lib/auth/types'
import { resolveOAuthProvider } from '@/lib/auth/utils'
import * as nextHeadersContext from 'next/headers'

import type { NextRequest } from 'next/server'

/*
  PROVIDER.getAuthorizationUrl() will create a new OAuth provider authorization url,
  where the user will be authenticated in the OAuth provider website. When generating an authorization url,
  Lucia will also create a new state. This should be stored as a http-only cookie to be used later.
 */
export const GET = async (request: NextRequest, context: { params: { provider: OAuthProviderId } }) => {
  const authProvider = resolveOAuthProvider(context.params.provider)

  if (authProvider === undefined) {
    return new Response('Not found', { status: 404 })
  }

  const [url, state] = await authProvider.provider.getAuthorizationUrl()

  // store state
  nextHeadersContext.cookies().set(authProvider.cookieName, state ?? '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 2, // 2 hours
  })

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  })
}
