import { BoxPreset, Pokedex, Pokemon, getAllBoxPresets, getAllPokedexes, getAllPokemon } from '@supeffective/dataset'
import { BASE_DATA_URL } from './constants'

export async function getPokedexesByGameSet(gameSet: string): Promise<Pokedex[]> {
  const dexes = await getAllPokedexes(BASE_DATA_URL)
  return dexes.filter((row) => row.gameSets.includes(gameSet))
}

export async function getBoxPresetsByGameSet(gameSet: string): Promise<BoxPreset[]> {
  const presets = await getAllBoxPresets(BASE_DATA_URL)
  return presets.filter((row) => row.gameSet === gameSet)
}

export async function getPokemonCollection(): Promise<Pokemon[]> {
  return getAllPokemon(BASE_DATA_URL)
}
