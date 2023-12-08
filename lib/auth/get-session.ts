'use server'

import * as requestContext from 'next/headers'

import { luciaAuth } from '@/lib/auth/lucia'
import { cache } from 'react'
import { dd } from '../common/utils'
import { UserSession } from './types'

async function _getServerSideSession(): Promise<UserSession | null> {
  const authRequest = luciaAuth.handleRequest('GET', requestContext)
  const session = await authRequest.validate()
  dd('_getServerSideSession called', session?.user)
  return session
}

export const getServerSideSession = cache(_getServerSideSession)

// async function getServerSideUser(): Promise<UserRecord | null> {
//   const session = await getServerSideSession()
//   if (!session || !session.user) {
//     return null
//   }

//   if (session.state !== 'active') {
//     return null
//   }

//   const found = await db.query.userTable.findFirst({
//     where: eq(userTable.id, session.user.userId),
//   })

//   if (!found) {
//     console.warn('auth: No user found')
//     return null
//   }

//   return found ?? null
// }
