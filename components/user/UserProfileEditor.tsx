import { UserRecord } from '@/lib/users/types'
import Link from 'next/link'
import { Suspense } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { AvatarSelector } from './AvatarSelector'

type UserProfileEditorProps = {
  user: UserRecord
}

export function UserProfileEditor(props: UserProfileEditorProps) {
  const { user } = props
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Editing user profile for {user.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Choose an avatar:</p>
        <Suspense
          fallback={
            <div>
              <p>Loading avatars...</p>
            </div>
          }
        >
          <AvatarSelector />
        </Suspense>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="secondary" asChild>
          <Link href="/profile">Save</Link>
        </Button>
        <Button variant="primary" asChild>
          <Link href="/profile">Cancel</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
