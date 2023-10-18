'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { Button } from '../components/ui/button'

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="text-lg">Something went wrong!</h2>
      <p className="flex-1 rounded-md bg-nb-white p-2 px-4 italic text-nb-muted-foreground">{error.message}</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
