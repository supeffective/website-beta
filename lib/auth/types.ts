import { userTable } from './db-schema'

export type UserRecord = typeof userTable.$inferSelect

export type UserSessionAttributes = {
  userId: string
  email: string
  displayName: string
}

export type UserSession = {
  user: UserSessionAttributes
  sessionId: string
  activePeriodExpiresAt: string
  idlePeriodExpiresAt: string
  state: string
  fresh: boolean
}
export enum OAuthProviderId {
  GITHUB = 'github',
  PATREON = 'patreon',
  DISCORD = 'discord',
}
