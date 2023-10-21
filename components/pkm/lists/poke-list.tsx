import { OptimizedPokemonList, OptimizedPokemonListItem } from '@/lib/pokemon/types'
import Link from 'next/link'
import { PokeImg } from '../images'

type PokeListProps = {
  pokemon: OptimizedPokemonList
}

type PokeListItemProps = {
  pokemon: OptimizedPokemonListItem
}

export function PokeListItem({ pokemon }: PokeListItemProps) {
  return (
    <Link
      className="snap-scroll-item content-visibility-auto flex select-none flex-col gap-1 rounded-lg border-2 bg-white/40 p-2 text-center no-underline shadow-md duration-150 hover:bg-nb-yellow-200 active:translate-x-1 active:translate-y-1 active:shadow-none"
      href={`/pokemon/${pokemon.id}`}
      scroll={false}
    >
      <span className="block text-xs font-bold">No. {pokemon.nid.split('-')[0]}</span>
      <span className="block w-full">
        <PokeImg className="pointer-events-none block w-full" imgClassName="block w-full" assetId={pokemon.nid} />
      </span>
      <span className="mt-2 block text-xs">{pokemon.name}</span>
    </Link>
  )
}

export function PokeList({ pokemon }: PokeListProps) {
  return (
    <div className="grid w-full grid-cols-3 gap-4 pb-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10">
      {pokemon.map((record) => {
        return <PokeListItem key={record.id} pokemon={record} />
      })}
    </div>
  )
}
