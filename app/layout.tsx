// Default Next.js font:
// import { Inter } from 'next/font/google'

// Neobrutalism fonts:
// import { Lexend_Mega, Public_Sans, Archivo_Black, Bebas_Neue, Maven_Pro, Reem_Kufi } from 'next/font/google'

import { baseMetadata } from '@/config'
import { NextAuthProvider } from '@/lib/auth/components'
import { Reem_Kufi } from 'next/font/google'
import { MainMenu } from '../components/layout/main-menu'
import '../styles/globals.scss'

const baseFont = Reem_Kufi({ subsets: ['latin'] })

export const metadata = baseMetadata

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal?: React.ReactNode }) {
  return (
    <html lang="en" className="light standalone-mobile-app">
      <body className={baseFont.className}>
        <NextAuthProvider>
          <MainMenu />
          <main className="flex flex-col items-center justify-between p-4">{children}</main>
          {modal}
        </NextAuthProvider>
      </body>
    </html>
  )
}
