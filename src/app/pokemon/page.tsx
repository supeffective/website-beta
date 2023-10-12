
import { BASE_DATA_URL } from '@/lib/constants'
import { fetchPokemonIndex } from '@supeffective/dataset'
import Link from 'next/link'

export default async function Page() {
  const records = await fetchPokemonIndex(BASE_DATA_URL)

  return (
    <ul className="columns-4">
      {records.map((record) => {
        return (
          <li key={record.id}><Link href={`/pokemon/${record.id}`}>{record.name}</Link></li>
        )
      })}
    </ul>
  )
}
