'use client'

import { Input } from '@/lib/components/ui/input'
import { Label } from '@/lib/components/ui/label'
import { Switch } from '@/lib/components/ui/switch'
import { createPokemonSearchIndex, searchPokemon } from '@/lib/dataset/pokemon/repository'
import { OptimizedPokemonList, SearchIndex } from '@/lib/dataset/pokemon/types'
import { useDebouncedState } from '@/lib/hooks/useDebouncedState'
import { useEffect, useMemo, useState } from 'react'
import { PokeList } from './poke-list'

type PokeListAppProps = {
  pokemon: OptimizedPokemonList
}

let searchIndex: SearchIndex

export function PokeListApp({ pokemon: allPokemon }: PokeListAppProps) {
  if (!searchIndex) {
    searchIndex = createPokemonSearchIndex(allPokemon)
  }

  const initialSearch = 'region:kanto'
  const [withForms, setWithForms] = useState<boolean>(false)

  const filteredForms = useMemo(
    () => (withForms === false ? allPokemon.filter((p) => !p.isForm) : allPokemon),
    [withForms, allPokemon],
  )
  const [results, setResults] = useState<OptimizedPokemonList>(searchPokemon(initialSearch, searchIndex, filteredForms))
  const [search, setDebouncedSearch] = useDebouncedState<string>(initialSearch, 300)
  // const speciesCount = results.filter((p) => !p.isForm).length
  // const formsCount = results.filter((p) => p.isForm).length

  useEffect(() => {
    if (search === '') {
      setResults(filteredForms)
      return
    }
    setResults(searchPokemon(search, searchIndex, filteredForms))
  }, [search, filteredForms])

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="sticky top-16 z-20 flex justify-center gap-2">
        <Input
          type="search"
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          placeholder="Search by name, number, type, color, etc."
          autoCorrect="off"
          defaultValue={search}
          autoCapitalize="none"
          onChange={(e) => {
            setDebouncedSearch(e.target.value)
          }}
        />
        <div className="flex items-center space-x-2">
          <Switch
            id="forms-switch"
            defaultChecked={withForms}
            onCheckedChange={(checked) => {
              setWithForms(checked)
            }}
          />
          <Label htmlFor="forms-switc">With Forms</Label>
        </div>
      </div>
      <div className="flex justify-center gap-1 text-foreground/70">
        {results.length === 0 && <span className="font-thin italic">No results</span>}
        {results.length > 0 && results.length < filteredForms.length && (
          <span className="font-thin italic">{results.length} results found:</span>
        )}
        {results.length === filteredForms.length && (
          <span className="font-thin italic">Showing all {results.length} discovered species:</span>
        )}
      </div>
      {results.length > 0 && <PokeList pokemon={results} />}
    </div>
  )
}
