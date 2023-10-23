'use client'

import { Input } from '@/components/ui/input'
import { useDebouncedState } from '@/lib/hooks/useDebouncedState'
import { createPokemonSearchIndex, searchPokemon } from '@/lib/pokemon/repository/pokemon'
import { OptimizedPokemonList, SearchIndex } from '@/lib/pokemon/types'
import { useEffect, useState } from 'react'
import { PokeList } from './poke-list'

type PokeListAppProps = {
  pokemon: OptimizedPokemonList
}

let searchIndex: SearchIndex

export function PokeListApp({ pokemon: allPokemon }: PokeListAppProps) {
  if (!searchIndex) {
    searchIndex = createPokemonSearchIndex(allPokemon)
  }

  const [results, setResults] = useState<OptimizedPokemonList>(allPokemon)
  const [search, setDebouncedSearch] = useDebouncedState<string>('', 300)

  useEffect(() => {
    if (search === '') {
      setResults(allPokemon)
      return
    }
    setResults(searchPokemon(search, searchIndex, allPokemon))
  }, [search, allPokemon])

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="sticky top-16 z-20 flex justify-center">
        <Input
          type="search"
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          placeholder="Search by name, number, type, color, etc."
          onChange={(e) => {
            setDebouncedSearch(e.target.value)
          }}
        />
      </div>
      <div className="flex justify-center gap-1 text-foreground/70">
        <span className="font-thin italic">Showing {results.length} species</span>
      </div>
      <PokeList pokemon={results} />
    </div>
  )
}
