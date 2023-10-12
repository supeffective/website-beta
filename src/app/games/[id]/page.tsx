import { BASE_DATA_URL } from '@/lib/constants'
import { PageProps } from '@/lib/types'
import { getAllGames, getGameById } from '@supeffective/dataset'
import { notFound } from 'next/navigation'

const records = await getAllGames(BASE_DATA_URL)

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

  const record = await getGameById(found.id, BASE_DATA_URL)
  return <div className="p2 py-8">Pokemon: {record.id}</div>
}
