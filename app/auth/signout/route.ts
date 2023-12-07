import { luciaAuth } from '@/lib/auth/lucia'
import * as context from 'next/headers'

import type { NextRequest } from 'next/server'

export const POST = async (request: NextRequest) => {
  const authRequest = luciaAuth.handleRequest(request.method, context)
  // check if user is authenticated
  const session = await authRequest.validate()
  if (!session) {
    return new Response(null, {
      status: 401,
    })
  }
  // make sure to invalidate the current session!
  await luciaAuth.invalidateSession(session.sessionId)
  // delete session cookie
  authRequest.setSession(null)
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/login', // redirect to login page
    },
  })
}
