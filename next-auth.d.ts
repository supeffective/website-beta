import { UserRecord } from './lib/auth/types'

declare module 'next-auth' {
  interface Session {
    user: {
      id: UserRecord['id']
      name?: UserRecord['name']
      email: UserRecord['email']
      image?: UserRecord['image']
    }
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser extends UserRecord {}
}
