import appConfig from '@/config/general'
import { getAllGames } from '@supeffective/dataset'
import Link from 'next/link'

export default async function Page() {
  const records = await getAllGames(appConfig.static.dataUrl)

  return (
    <ul className="columns-4">
      {records.map((record) => {
        return (
          <li key={record.id}>
            <Link href={`/games/${record.id}`}>{record.name}</Link>
          </li>
        )
      })}
    </ul>
  )
}
