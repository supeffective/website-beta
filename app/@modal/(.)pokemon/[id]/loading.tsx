import { LoadingSpinner } from '@/lib/components/image/loading-spinner'
import { Overlay } from '@/lib/components/overlays'

export default async function Loading() {
  return (
    <Overlay className="text-center text-3xl">
      <LoadingSpinner />
    </Overlay>
  )
}
