import { PokeListApp } from '@/features/pokemon/components/poke-list-app'
import { Heading } from '@/lib/components/typography/heading'
import { fetchOptimizedPokemonIndex } from '@/lib/dataset/pokemon/repository'

export default async function Page() {
  const records = await fetchOptimizedPokemonIndex()
  const filtered = records.filter((p) => !p.nid.startsWith('0000'))

  return (
    <section className="w-full pb-24">
      <Heading className="text-center" level={1}>
        Pokémon
      </Heading>
      <PokeListApp pokemon={filtered} />
    </section>
  )
}
