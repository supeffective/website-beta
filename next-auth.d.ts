import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: DefaultSession['user'] & {
      id: string
    }
  }
}

// declare module 'next-auth/adapters' {
//   interface AdapterUser extends UserRecord {}
// }
