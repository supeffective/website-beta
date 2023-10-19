import { userTable } from './db-schema'

export type UserRecord = typeof userTable.$inferSelect
