import { UserSessionAttributes } from '@/lib/auth/types'
import { Button } from '@/lib/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/lib/components/ui/card'
import Link from 'next/link'
import { Suspense } from 'react'
import { SignInForm } from '../../signin/components/signin-form'
import { AvatarSelector } from './AvatarSelector'

type UserProfileEditorProps = {
  user: UserSessionAttributes
}

export function UserProfileEditor(props: UserProfileEditorProps) {
  const { user } = props
  return (
    <>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Editing user profile for {user.displayName}</CardDescription>
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

      <h3>Link an account:</h3>
      <SignInForm />
    </>
  )
}
