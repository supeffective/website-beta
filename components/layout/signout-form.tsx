'use client'

import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

export function SignOutForm({ callbackUrl }: { callbackUrl?: string }) {
  const [cbUrl, setCbUrl] = useState('')

  useEffect(() => {
    setCbUrl(callbackUrl ? decodeURIComponent(callbackUrl) : window.location.origin + '/')
  }, [callbackUrl])

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="btn btn-gold"
        onClick={() => {
          signOut({ callbackUrl: cbUrl }).then(() => {
            // window.history.back()
          })
        }}
      >
        Sign out
      </Button>
    </div>
  )
}
