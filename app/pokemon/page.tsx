import appConfig from '@/config/general'
import { fetchPokemonIndex } from '@supeffective/dataset'
import Link from 'next/link'

export default async function Page() {
  const records = await fetchPokemonIndex(appConfig.static.dataUrl)

  return (
    <ul className="columns-4">
      {records.map((record) => {
        return (
          <li key={record.id}>
            <Link href={`/pokemon/${record.id}`} scroll={false}>
              {record.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
