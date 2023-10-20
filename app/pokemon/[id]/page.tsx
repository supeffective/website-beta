import appConfig from '@/config/general'
import { fetchPokemon, fetchPokemonIndex } from '@supeffective/dataset'
import { notFound } from 'next/navigation'
import { PageProps } from '../../../lib/types'

const records = await fetchPokemonIndex(appConfig.static.dataUrl)

// Return a list of `params` to populate the [id] dynamic route segment
export async function generateStaticParams() {
  return records.map((record) => ({
    id: record.id,
  }))
}

export default async function Page({ params }: PageProps<['id']>) {
  const found = records.find((record) => record.id === params.id)
  if (!found) {
    notFound()
  }

  const record = await fetchPokemon(found.id, found.region, appConfig.static.dataUrl)
  return <div className="p2 py-8">Pokemon: {record.id}</div>
}
