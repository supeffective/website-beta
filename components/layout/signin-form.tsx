'use client'

import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

// const providers = cache(() => {
//   return getProviders()
// })

export function SignInForm({ callbackUrl }: { callbackUrl?: string }) {
  const [cbUrl, setCbUrl] = useState('')

  useEffect(() => {
    setCbUrl(callbackUrl ? decodeURIComponent(callbackUrl) : window.location.origin + '/profile')
  }, [callbackUrl])

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="btn btn-default"
        onClick={() => {
          signIn('github', { callbackUrl: cbUrl })
        }}
      >
        Sign in with Github
      </Button>
      <Button
        className="btn btn-secondary"
        onClick={() => {
          signIn('patreon', { callbackUrl: cbUrl })
        }}
      >
        Sign in with Patreon
      </Button>
    </div>
  )
}
