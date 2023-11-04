import { timestamp, tinyint, varchar } from 'drizzle-orm/mysql-core'

export const DB_PRIMARY_KEY_LENGTH = 24
export const DB_PUBLIC_ID_LENGTH = 20 // for nanoid, 21 chars = similar collision rate to UUIDv4
export const DB_TITLES_LENGTH = 50
export const DB_SHORT_TITLES_LENGTH = 15
export const DB_DESCRIPTIONS_LENGTH = 500

export function primaryKeyColumn(columnName: string = 'id') {
  return varchar(columnName, { length: DB_PRIMARY_KEY_LENGTH }).notNull().primaryKey()
}

export function foreignKeyColumn(columnName: string) {
  return varchar(columnName, { length: DB_PRIMARY_KEY_LENGTH })
}

export function publicIdColumn(columnName: string = 'pubId') {
  return varchar(columnName, { length: DB_PUBLIC_ID_LENGTH }).notNull().unique()
}

export function timestampColumn(columnName: string) {
  return timestamp(columnName, { mode: 'date' })
}

export function createdAtColumn() {
  return timestampColumn('createdAt').notNull()
}

export function updatedAtColumn() {
  return timestampColumn('updatedAt')
}

export function deletedAtColumn() {
  return timestampColumn('deletedAt')
}

export function expiresAtColumn() {
  return timestampColumn('expiresAt')
}

export function titleColumn(columnName: string = 'title') {
  return varchar(columnName, { length: DB_TITLES_LENGTH })
}

export function languageColumn(columnName: string = 'lang') {
  return varchar(columnName, { length: 10 })
}

export function descriptionColumn(columnName: string = 'description') {
  return varchar(columnName, { length: DB_DESCRIPTIONS_LENGTH })
}

export function slugColumn(columnName: string) {
  return varchar(columnName, { length: DB_TITLES_LENGTH })
}

export function shortSlugColumn(columnName: string) {
  return varchar(columnName, { length: DB_SHORT_TITLES_LENGTH })
}

export function genderColumn(columnName: string = 'gender') {
  return tinyint(columnName) // 1 = male, 2 = female, 3 = other
}
