import '@/lib/server-only'

import appConfig from '@/config/general'
import {
  BoxPreset,
  Character,
  Pokedex,
  Pokemon,
  getAllBoxPresets,
  getAllCharacters,
  getAllPokedexes,
  getAllPokemon,
} from '@supeffective/dataset'

export async function getPokedexesByGameSet(gameSet: string): Promise<Pokedex[]> {
  const dexes = await getAllPokedexes(appConfig.static.dataUrl)
  return dexes.filter((row) => row.gameSets.includes(gameSet))
}

export async function getBoxPresetsByGameSet(gameSet: string): Promise<BoxPreset[]> {
  const presets = await getAllBoxPresets(appConfig.static.dataUrl)
  return presets.filter((row) => row.gameSet === gameSet)
}

export async function getPokemonCollection(): Promise<Pokemon[]> {
  return getAllPokemon(appConfig.static.dataUrl)
}

export async function getCharacterCollection(): Promise<Character[]> {
  return getAllCharacters(appConfig.static.dataUrl)
}
