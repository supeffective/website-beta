import { UserSessionAttributes } from '@/lib/auth/types'
import Link from 'next/link'
import { Button } from '../ui/button'

type UserProfileProps = {
  user: UserSessionAttributes
}

export function UserProfile(props: UserProfileProps) {
  const { user } = props
  return (
    <div className="flex-1">
      <p>User profile for {user.displayName}</p>

      <Button asChild variant="primary">
        <Link href="/profile/edit">Edit</Link>
      </Button>
    </div>
  )
}
