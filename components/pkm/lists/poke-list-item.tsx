import { OptimizedPokemonListItem } from '@/lib/pokemon/types'
import Link from 'next/link'
import { PokeImg } from '../images'

type PokeListItemProps = {
  pokemon: OptimizedPokemonListItem
}

export function PokeListItem({ pokemon }: PokeListItemProps) {
  return (
    <Link
      className="snap-scroll-item content-visibility-auto flex select-none flex-col gap-1 rounded-lg border-2 bg-white/40 p-2 text-center no-underline shadow-md duration-150 hover:z-10 hover:scale-110 hover:bg-nb-yellow-200 active:scale-100"
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
