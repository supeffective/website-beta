import { redirect } from 'next/navigation'

export function redirectToLogin(): never {
  redirect('/auth/signin')
}
