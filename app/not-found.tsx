import { baseMetadata } from '@/config'

const metadata = baseMetadata
metadata.robots = 'noindex, nofollow'

export { metadata }

export default function NotFoundPage() {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <h1 className="text-3xl font-thin">Error 404: Page Not Found</h1>
    </div>
  )
}
