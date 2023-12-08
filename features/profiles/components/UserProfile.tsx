import { UserSessionAttributes } from '@/lib/auth/types'
import { Button } from '@/lib/components/ui/button'
import Link from 'next/link'

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
