import type { Metadata } from 'next'

// Default Next.js font:
// import { Inter } from 'next/font/google'

// Neobrutalism fonts:
// import { Lexend_Mega, Public_Sans, Archivo_Black, Bebas_Neue, Maven_Pro, Reem_Kufi } from 'next/font/google'

import { MainMenu } from '@/components/layout/main-menu'
import { Reem_Kufi } from 'next/font/google'
import { Suspense } from 'react'
import '../styles/globals.scss'

const baseFont = Reem_Kufi({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SuperEffective 2024',
  description: 'Generated by itsjavi.com',
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal?: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={baseFont.className}>
        <Suspense>
          <MainMenu />
        </Suspense>
        <main className="min-h-dvh flex flex-col items-center justify-between p-4">
          {children}
        </main>
        {modal}
      </body>
    </html>
  )
}
