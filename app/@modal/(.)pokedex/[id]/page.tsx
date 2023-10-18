import { appConfig } from '@/config'
import { fetchPokedex, fetchPokedexIndex } from '@supeffective/dataset'
import { notFound } from 'next/navigation'
import DialogInterceptedRoute from '../../../../components/ui/dialog-intercepted-route'
import { PageProps } from '../../../../lib/types'

const records = await fetchPokedexIndex(appConfig.static.dataUrl)

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  return records.map((record) => ({
    id: record.id,
    regionId: record.region,
  }))
}

export default async function Page({ params, searchParams }: PageProps<['id']>) {
  const found = records.find((record) => record.id === params.id)
  if (!found) {
    notFound()
  }
  const record = await fetchPokedex(found.id, found.region, appConfig.static.dataUrl)

  const header = <div>Pokédex</div>
  const footer = null

  return (
    <DialogInterceptedRoute header={header} footer={footer} className="max-w-auto md:max-w-[60vw]">
      <div>{record.name}</div>
    </DialogInterceptedRoute>
  )
}
