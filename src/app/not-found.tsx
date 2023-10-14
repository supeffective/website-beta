import config from "@/config"

const metadata = config.baseMetadata
metadata.robots = 'noindex, nofollow'

export { metadata }

export default function NotFoundPage() {
  return (
    <div className="flex justify-center items-center h-full flex-1">
      <h1 className="text-3xl font-thin">
        Error 404: Page Not Found</h1>
    </div>
  )
}
