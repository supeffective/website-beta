import { pokemonTable, gameSaveTable } from './db-schema'

export type GameSaveRecord = typeof gameSaveTable.$inferSelect
export type GameSavePokemonRecord = typeof pokemonTable.$inferSelect
