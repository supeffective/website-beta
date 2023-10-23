import { Pokemon, pokemonSchema } from '@supeffective/dataset'
import { z } from 'zod'

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
> & {
  hp: number
  atk: number
  def: number
  spa: number
  spd: number
  spe: number
  bst: number
}

export const optimizedPokemonListItemSchema = pokemonSchema
  .pick({
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
  .extend({
    hp: z.coerce.number(),
    atk: z.coerce.number(),
    def: z.coerce.number(),
    spa: z.coerce.number(),
    spd: z.coerce.number(),
    spe: z.coerce.number(),
    bst: z.coerce.number(),
  })
