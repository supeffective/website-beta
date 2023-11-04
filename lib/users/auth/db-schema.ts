import type { AdapterAccount } from '@auth/core/adapters'
import { int, mysqlTable, primaryKey, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const userTable = mysqlTable('user', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }), // aka. "display name"
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    fsp: 3,
  }).defaultNow(),
  image: varchar('image', { length: 255 }),
  // custom fields, not part of (Next)Auth.js:
  bio: varchar('bio', { length: 255 }),
  characterAvatar: varchar('characterAvatar', { length: 50 }),
  preferredLanguage: varchar('preferredLanguage', { length: 50 }),
  username: varchar('username', { length: 50 }),
  twitterUsername: varchar('twitterUsername', { length: 50 }),
  discordUsername: varchar('discordUsername', { length: 50 }),
  twitchUsername: varchar('twitchUsername', { length: 50 }),
  youtubeUsername: varchar('youtubeUsername', { length: 50 }),
  patreonTier: varchar('patreonTier', { length: 50 }),
  // favoritePokemonTeamId: varchar('favoritePokemonTeamId', { length: 255 }),
})

// export const userPrivacyTable = mysqlTable('userPrivacy', {
//   userId: varchar('userId', { length: 255 }).notNull().primaryKey(),
//   showTwitterUsername: int('showTwitterUsername').notNull(),
//   showDiscordUsername: int('showDiscordUsername').notNull(),
//   showTwitchUsername: int('showTwitchUsername').notNull(),
//   showYoutubeUsername: int('showYoutubeUsername').notNull(),
//   showPreferredLanguage: int('showPreferredLanguage').notNull(),
// })

export const accountTable = mysqlTable(
  'account',
  {
    userId: varchar('userId', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: varchar('refresh_token', { length: 255 }),
    access_token: varchar('access_token', { length: 255 }),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: varchar('id_token', { length: 255 }),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
)

export const sessionTable = mysqlTable('session', {
  sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
  userId: varchar('userId', { length: 255 }).notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokenTable = mysqlTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
)
