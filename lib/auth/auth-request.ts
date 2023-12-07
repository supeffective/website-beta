'use server'

import * as requestContext from 'next/headers'
import { luciaAuth } from './lucia'
import { UserSession } from './types'

export type AuthRequest = ReturnType<typeof handleAuthRequest>

export function handleAuthRequest(method: string | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD') {
  return luciaAuth.handleRequest(method.toUpperCase(), requestContext)
}

export async function handleSession(authRequest: AuthRequest): Promise<UserSession | null> {
  const session = await authRequest.validate()

  return session
}
