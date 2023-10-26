import { baseMetadata, baseViewport } from '@/config/metadata'

export const metadata = {
  ...baseMetadata,
  robots: 'noindex, nofollow',
}

export const viewport = baseViewport

export default function NotFoundPage() {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <h1 className="text-3xl font-thin">Error 404: Page Not Found</h1>
    </div>
  )
}
