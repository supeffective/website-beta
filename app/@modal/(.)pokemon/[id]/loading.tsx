import { LoadingSpinner } from '@/components/primitives/loading-spinner'
import { Overlay } from '@/components/primitives/overlay'

export default async function Loading() {
  return (
    <Overlay className="text-center text-3xl">
      <LoadingSpinner />
    </Overlay>
  )
}
