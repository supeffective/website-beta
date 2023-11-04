import { UserProfile } from '@/components/user/UserProfile'
import { getServerSideUser, redirectToLogin } from '@/lib/users/auth/get-session'

export default async function Page() {
  const user = await getServerSideUser()
  if (!user) {
    redirectToLogin()
  }
  return <UserProfile user={user} />
}
