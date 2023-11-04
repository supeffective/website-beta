import { NextAuthProvider } from '@/lib/users/auth/components'

export function Providers({ children }: { children: React.ReactNode }): JSX.Element {
  return <NextAuthProvider>{children}</NextAuthProvider>
}
