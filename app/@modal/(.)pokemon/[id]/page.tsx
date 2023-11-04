import DialogInterceptedRoute from '@/components/ui/dialog-intercepted-route'
import appConfig from '@/config/general'
import { PageProps } from '@/lib/router/types'
// import { waitMs } from '@/lib/utils'
import { fetchPokemon, fetchPokemonIndex } from '@supeffective/dataset'
import { notFound } from 'next/navigation'

const records = await fetchPokemonIndex(appConfig.static.dataUrl)

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  return records.map((record) => ({
    id: record.id,
    regionId: record.region,
  }))
}

export default async function Page({ params }: PageProps<['id']>) {
  // await waitMs(5000)
  const found = records.find((record) => record.id === params.id)
  if (!found) {
    notFound()
  }
  const record = await fetchPokemon(found.id, found.region, appConfig.static.dataUrl)

  const header = <div>Pokémon</div>
  const footer = null

  return (
    <DialogInterceptedRoute header={header} footer={footer} className="max-w-auto md:max-w-[60vw]">
      <div>{record.name}</div>
    </DialogInterceptedRoute>
  )
}
