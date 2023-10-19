import { UserRecord, UserSession } from './lib/auth/types'

declare module 'next-auth' {
  interface Session {
    user?: UserSession['user']
    expires: UserSession['expires']
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser extends UserRecord {}
}
