// Default Next.js font:
// import { Inter } from 'next/font/google'

// Neobrutalism fonts:
// import { Lexend_Mega, Public_Sans, Archivo_Black, Bebas_Neue, Maven_Pro, Reem_Kufi } from 'next/font/google'

import { baseMetadata, baseViewport } from '@/config/metadata'
import { ContextProviders } from '@/lib/components/context-providers'
import { Navigation } from '@/lib/components/navigation'
import { ServiceWorkers } from '@/lib/components/service-workers'
import '@/lib/styles/globals.scss'
import { cn } from '@/lib/utils'
import { Reem_Kufi } from 'next/font/google'

const baseFont = Reem_Kufi({ subsets: ['latin'] })

export const metadata = baseMetadata
export const viewport = baseViewport

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal?: React.ReactNode }) {
  return (
    <html lang="en" className="light pwa-app">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={cn(baseFont.className, ' bg-primary')}>
        <ContextProviders>
          <Navigation />
          <main className="flex flex-col p-4">{children}</main>
          {modal}
        </ContextProviders>
        <ServiceWorkers />
      </body>
    </html>
  )
}
