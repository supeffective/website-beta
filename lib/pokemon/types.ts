import { Pokemon, pokemonSchema } from '@supeffective/dataset'

export type SearchIndex = Array<[keywordsText: string, recordId: string]>

export type OptimizedPokemonList = OptimizedPokemonListItem[]
export type OptimizedPokemonListItem = Pick<
  Pokemon,
  | 'id'
  | 'name'
  | 'nid'
  | 'dexNum'
  | 'isForm'
  | 'type1'
  | 'type2'
  | 'color'
  | 'region'
  | 'generation'
  | 'baseSpecies'
  | 'isLegendary'
  | 'isMythical'
  | 'forms'
>

export const optimizedPokemonListItemSchema = pokemonSchema.pick({
  id: true,
  name: true,
  nid: true,
  dexNum: true,
  isForm: true,
  type1: true,
  type2: true,
  color: true,
  region: true,
  generation: true,
  baseSpecies: true,
  forms: true,
  isLegendary: true,
  isMythical: true,
})
