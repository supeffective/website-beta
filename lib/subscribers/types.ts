import { donationsTable } from './db-schema'

export type DonationRecord = typeof donationsTable.$inferSelect
