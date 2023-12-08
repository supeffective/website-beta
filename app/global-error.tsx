'use client' // Error components must be Client Components

import { baseMetadata, baseViewport } from '@/config/metadata'
import '@/lib/styles/globals.scss'
import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'
import { useEffect } from 'react'

export const metadata = baseMetadata
export const viewport = baseViewport

// It handles errors thrown in the root app/layout.tsx or app/template.tsx components.
export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en" className="light pwa-app">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-primary">
        {/* This is the default Next.js error component but it doesn't allow omitting the statusCode property yet. */}
        <Error statusCode={undefined as any} />
      </body>
    </html>
  )
}
