import { UserRecord } from '@/lib/users/types'
import Link from 'next/link'
import { Button } from '../ui/button'

type UserProfileProps = {
  user: UserRecord
}

export function UserProfile(props: UserProfileProps) {
  const { user } = props
  return (
    <div className="flex-1">
      <p>user profile for {user.name}</p>

      <Button asChild variant="primary">
        <Link href="/profile/edit">Edit</Link>
      </Button>
    </div>
  )
}
