import { UserProfile } from '@/features/profiles/components/UserProfile'
import { getServerSideSession } from '@/lib/auth/get-session'
import { redirectToLogin } from '@/lib/auth/redirects'

export default async function Page() {
  const session = await getServerSideSession()
  if (!session) {
    redirectToLogin()
  }
  return <UserProfile user={session.user} />
}
