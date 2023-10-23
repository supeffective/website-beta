import appConfig from '@/config/general'
import { csvJsonToCollection, jsonStringifyCompact } from '@/lib/utils/json'
import { Pokemon, fetchCollection } from '@supeffective/dataset'
import fs from 'node:fs'
import path from 'node:path'
import { OptimizedPokemonListItem, optimizedPokemonListItemSchema } from '../types'

const pokemon = await fetchCollection<Pokemon>('pokemon.min.json', appConfig.static.dataUrl)
const DEST_DIR = path.join(__dirname, '..', 'data')
const DEST_FILE = path.join(DEST_DIR, 'pokemon-index.min.json')

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
]
const indexCsvData: Array<any> = [exportedProps]

pokemon.forEach((p) => {
  indexCsvData.push(exportedProps.map((prop) => p[prop] ?? null))
})

// validate result
optimizedPokemonListItemSchema.array().parse(csvJsonToCollection(indexCsvData))

fs.writeFileSync(DEST_FILE, jsonStringifyCompact(indexCsvData))
console.log('optimizedPokemonListItemSchema Validation passed')
console.log(`Wrote ${indexCsvData.length} records to ${DEST_FILE}`)
