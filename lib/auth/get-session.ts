import { eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import db from '../db/client'
import { authOptions } from './auth-options'
import { userTable } from './db-schema'
import { UserRecord } from './types'

export async function getServerSideSession() {
  return await getServerSession(authOptions)
}

export async function getServerSideUser(): Promise<UserRecord | null> {
  const session = await getServerSideSession()
  if (!session || !session.user) {
    console.warn('next-auth: No session found')
    return null
  }

  const found = await db.query.userTable.findFirst({
    where: eq(userTable.id, session.user.id),
  })

  if (!found) {
    console.warn('next-auth: No user found')
    return null
  }

  return found ?? null
}

export function redirectToLogin(): never {
  redirect('/auth/signin')
}
