import { UserProfileEditor } from '@/components/user/UserProfileEditor'
import { getServerSideUser, redirectToLogin } from '@/lib/auth/get-session'

export default async function Page() {
  const user = await getServerSideUser()
  if (!user) {
    redirectToLogin()
  }
  return <UserProfileEditor user={user} />
}
