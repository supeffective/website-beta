
import { BASE_DATA_URL } from '@/config'
import { fetchBoxPresetIndex } from '@supeffective/dataset'
import Link from 'next/link'

export default async function Page() {
    const records = await fetchBoxPresetIndex(BASE_DATA_URL)

    return (
        <ul className="columns-4">
            {records.map((record) => {
                return (
                    <li key={record.id}><Link href={`/boxes/${record.id}`}>{record.name}</Link></li>
                )
            })}
        </ul>
    )
}
