import appConfig from '@/config/general'
import { getAllGames, getGameById } from '@supeffective/dataset'
import { notFound } from 'next/navigation'
import { PageProps } from '../../../lib/types'

const records = await getAllGames(appConfig.static.dataUrl)

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

  const record = await getGameById(found.id, appConfig.static.dataUrl)
  return <div className="p2 py-8">Pokemon: {record.id}</div>
}
