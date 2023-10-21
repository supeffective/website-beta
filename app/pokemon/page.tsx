import { PokeList } from '@/components/pkm/lists/poke-list'
import { Heading } from '@/components/typography/heading'
import appConfig from '@/config/general'
import { fetchPokemonIndex } from '@supeffective/dataset'

export default async function Page() {
  const records = await fetchPokemonIndex(appConfig.static.dataUrl)

  return (
    <section className="w-full pb-24">
      <Heading className="text-center" level={1}>
        Pokémon
      </Heading>
      <PokeList pokemon={records.filter((p) => !p.isForm && !p.nid.startsWith('0000'))} />
    </section>
  )
}
