import { UserProfileEditor } from '@/components/user/UserProfileEditor'
import { getServerSideSession } from '@/lib/auth/get-session'
import { redirectToLogin } from '@/lib/auth/redirects'

export default async function Page() {
  const session = await getServerSideSession()
  if (!session) {
    redirectToLogin()
  }
  return <UserProfileEditor user={session.user} />
}
