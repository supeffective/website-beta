import { bigint, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const authTableNames: {
  user: string
  session: string
  key: string
} = {
  user: 'auth_user',
  session: 'user_session',
  key: 'user_key',
}

export const userTable = mysqlTable(authTableNames.user, {
  id: varchar('id', { length: 50 }).notNull().primaryKey(),
  // custom fields, not part of Lucia Auth:
  email: varchar('email', { length: 255 }).unique(),
  emailVerified: bigint('emailVerified', { mode: 'number' }),
  username: varchar('username', { length: 50 }).unique(),
  displayName: varchar('displayName', { length: 255 }), // aka. "display name"
  avatar: varchar('avatar', { length: 255 }),
  bio: varchar('bio', { length: 255 }),
  language: varchar('language', { length: 50 }),
  subscriptionTier: varchar('subscriptionTier', { length: 50 }),
  githubHandle: varchar('githubHandle', { length: 50 }),
  twitterHandle: varchar('twitterHandle', { length: 50 }),
  discordHandle: varchar('discordHandle', { length: 50 }),
  twitchHandle: varchar('twitchHandle', { length: 50 }),
  youtubeHandle: varchar('youtubeHandle', { length: 50 }),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date', fsp: 3 }).defaultNow(),
})

// export const userPrivacyTable = mysqlTable('userPrivacy', {
//   userId: varchar('userId', { length: 255 }).notNull().primaryKey(),
//   showTwitterUsername: int('showTwitterUsername').notNull(),
//   showDiscordUsername: int('showDiscordUsername').notNull(),
//   showTwitchUsername: int('showTwitchUsername').notNull(),
//   showYoutubeUsername: int('showYoutubeUsername').notNull(),
//   showPreferredLanguage: int('showPreferredLanguage').notNull(),
// })

export const keyTable = mysqlTable(authTableNames.key, {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 50 }).notNull(),
  hashedPassword: varchar('hashed_password', { length: 255 }),
  // custom fields, not part of Lucia Auth:
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date', fsp: 3 }).defaultNow(),
})

export const sessionTable = mysqlTable(authTableNames.session, {
  id: varchar('id', { length: 128 }).primaryKey(),
  userId: varchar('user_id', { length: 50 }).notNull(),
  activeExpires: bigint('active_expires', { mode: 'number' }).notNull(),
  idleExpires: bigint('idle_expires', { mode: 'number' }).notNull(),
  // custom fields, not part of Lucia Auth:
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).defaultNow(),
})
