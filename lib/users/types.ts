import { DefaultSession } from 'next-auth'
import { userTable } from './auth/db-schema'

export type UserRecord = typeof userTable.$inferSelect

export type UserSession = {
  user?: {
    name?: UserRecord['name']
    email: UserRecord['email']
    image?: UserRecord['image']
    // extra fields:
    id: UserRecord['id']
    provider: string
    tier: string
  }
  expires: DefaultSession['expires']
}
