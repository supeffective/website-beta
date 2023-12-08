import { OptimizedPokemonList } from '@/lib/dataset/pokemon/types'
import { PokeListItem } from './poke-list-item'

type PokeListProps = {
  pokemon: OptimizedPokemonList
}

export function PokeList({ pokemon }: PokeListProps) {
  return (
    <div className="grid w-full grid-cols-3 gap-2 pb-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10">
      {pokemon.map((record) => {
        return <PokeListItem key={record.id} pokemon={record} />
      })}
    </div>
  )
}
