import { getServerSideSession } from '@/lib/auth/get-session'
import { NavBottomMenu } from './nav-bottom'
import { NavTopMenu } from './nav-top'

export async function Navigation() {
  const session = await getServerSideSession()
  return (
    <>
      <NavTopMenu />
      <NavBottomMenu user={session?.user} />
    </>
  )
}
