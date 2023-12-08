import {
  createdAtColumn,
  descriptionColumn,
  expiresAtColumn,
  primaryKeyColumn,
  publicIdColumn,
  shortSlugColumn,
  updatedAtColumn,
  userIdForeignColumn,
} from '@/lib/db/column-types'
import { boolean, index, int, mysqlTable } from 'drizzle-orm/mysql-core'
import { patreonCampaign, patreonTiers } from '../../config/patreon'

// TODO move to config:
const defaultPokemonLimit = 30 * 32 * 5 // 30 slots per box, 32 boxes, 5 game saves = 4800

export const donationsTable = mysqlTable(
  'donation',
  {
    id: primaryKeyColumn(),
    publicId: publicIdColumn(),
    userId: userIdForeignColumn(),
    //
    tierSlug: shortSlugColumn('tier').default(patreonTiers[patreonCampaign.tierIds.none].slug),
    totalPledged: int('totalPledged').default(0),
    isRecurring: boolean('recurring').default(false),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
    expiresAt: expiresAtColumn(),
    notes: descriptionColumn('notes'),
    // Limits:
    pokemonLimit: int('maxPokemon').default(defaultPokemonLimit),
  },
  (table) => {
    return {
      userIdIdx: index('userId_idx').on(table.userId),
    }
  },
)
