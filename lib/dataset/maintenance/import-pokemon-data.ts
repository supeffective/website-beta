import appConfig from '@/config/general'
import { csvJsonToCollection, jsonStringifyCompact } from '@/lib/common/utils/json'
import { Pokemon, fetchCollection } from '@supeffective/dataset'
import fs from 'node:fs'
import path from 'node:path'
import { OptimizedPokemonListItem, optimizedPokemonListItemSchema } from '../pokemon/types'

const pokemon = await fetchCollection<Pokemon>('pokemon.min.json', appConfig.static.dataUrl)
const DEST_DIR = path.join(__dirname, '..', 'data')
const DEST_FILE = path.join(DEST_DIR, 'pokemon-index.csv.json')

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR)
}

const exportedProps: Array<keyof OptimizedPokemonListItem> = [
  'id',
  'name',
  'nid',
  'dexNum',
  'isForm',
  'type1',
  'type2',
  'color',
  'region',
  'generation',
  'baseSpecies',
  'forms',
  'isLegendary',
  'isMythical',
  'hp',
  'atk',
  'def',
  'spa',
  'spd',
  'spe',
  'bst',
]
const indexCsvData: Array<any> = [exportedProps]

pokemon.forEach((p) => {
  indexCsvData.push(
    exportedProps.map((prop) => {
      if (prop === 'hp' || prop === 'atk' || prop === 'def' || prop === 'spa' || prop === 'spd' || prop === 'spe') {
        const baseStats = p.baseStats
        if (!baseStats || baseStats[prop] === undefined) {
          throw new Error(`Missing base stat for ${p.name} (${prop})`)
        }
        if (isNaN(baseStats[prop])) {
          throw new Error(`Invalid base stat for ${p.name} (${prop}): ${baseStats[prop]}`)
        }
        return baseStats[prop] ?? 0
      }

      if (prop === 'bst') {
        const baseStats = p.baseStats
        if (!baseStats) {
          throw new Error(`Missing base stats for ${p.name}`)
        }
        return (
          (baseStats.hp ?? 0) +
          (baseStats.atk ?? 0) +
          (baseStats.def ?? 0) +
          (baseStats.spa ?? 0) +
          (baseStats.spd ?? 0) +
          (baseStats.spe ?? 0)
        )
      }

      return p[prop] ?? null
    }),
  )
})

// validate result
optimizedPokemonListItemSchema.array().parse(csvJsonToCollection(indexCsvData))

fs.writeFileSync(DEST_FILE, jsonStringifyCompact(indexCsvData))
console.log('optimizedPokemonListItemSchema Validation passed')
console.log(`Wrote ${indexCsvData.length} records to ${DEST_FILE}`)
