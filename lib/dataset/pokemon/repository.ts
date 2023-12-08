import { dd } from '@/lib/utils'
import { jsonParseCsvArray } from '@/lib/utils/json'
import { OptimizedPokemonList, OptimizedPokemonListItem, SearchIndex } from './types'

export async function fetchOptimizedPokemonIndex(): Promise<OptimizedPokemonList> {
  const csvData = require('../data/pokemon-index.csv.json')
  const data = jsonParseCsvArray<OptimizedPokemonListItem>(csvData)

  return Promise.resolve(data)
}

export function createPokemonSearchIndex(pokemon: OptimizedPokemonList): SearchIndex {
  const index: SearchIndex = []

  pokemon.forEach((p) => {
    const safeName = p.name.toLowerCase().replace(/[^a-z0-9]/gi, '')
    const keywords = [
      `id:${p.id}`,
      `name:${safeName}`,
      `nid:${p.nid}`,
      `dex:${p.dexNum}`,
      `num:${p.dexNum}`,
      `type:${p.type1}`,
      `type:${p.type2}`,
      `color:${p.color}`,
      `region:${p.region}`,
      `generation:${p.generation}`,
      `gen:${p.generation}`,
      p.isMythical ? ':mythical' : false,
      p.isLegendary ? ':legendary' : false,
      p.forms.length > 0 ? ':hasforms' : false,
      p.baseSpecies ? `base:${p.baseSpecies}` : false,
    ]

    const keywordsText = keywords.filter(Boolean).join(' ').toLowerCase()
    index.push([keywordsText, p.id])
  })

  dd(
    `Created search index with ${index.length} records. Memory needed: ${Math.round(
      JSON.stringify(index).length / 1024,
    )} KB`,
  )
  return index
}

type SearchQuery = {
  field: string
  value: string
  negated: boolean
}

function parseQuery(query: string): SearchQuery[] {
  const queryParts = query.replace(/\s+/g, ' ').trim().toLowerCase().split(' ')
  const parsedQuery: SearchQuery[] = []

  queryParts.forEach((part) => {
    const negated = part.startsWith('!')
    const fieldValue = negated ? part.substring(1) : part
    const field = fieldValue.includes(':') ? fieldValue.split(':')[0] : ''
    const value = fieldValue.includes(':') ? fieldValue.split(':')[1] : fieldValue
    const safeValue = value.toLowerCase().replace(/[^a-z0-9]/gi, '')

    parsedQuery.push({ field, value: safeValue, negated })
  })

  return parsedQuery
}

export function searchPokemon(
  query: string,
  index: SearchIndex,
  pokemon: OptimizedPokemonList,
): OptimizedPokemonListItem[] {
  const q = parseQuery(query)
  if (q.length === 0) {
    return pokemon
  }

  const results = index.filter((record) => {
    const [keywords] = record

    return q.every((query) => {
      const { field, value, negated } = query
      const matches = field !== '' ? keywords.includes(`${field}:${value}`) : keywords.includes(`${value}`)

      return negated ? !matches : matches
    })
  })

  const pokemonIds = results.map((record) => record[1])

  return pokemon.filter((p) => pokemonIds.includes(p.id))
}
