import { z } from 'zod'

const envNameSchema = z.enum(['development', 'production', 'preview'])

export const clientEnvVarSchema = z.object({
  NEXT_PUBLIC_APP_ENV: envNameSchema,
  NEXT_PUBLIC_PKM_DATA_URL: z.string().url(),
  NEXT_PUBLIC_PKM_ASSETS_URL: z.string().url(),
})

export const serverEnvVarSchema = z.object({
  APP_ENV: envNameSchema,

  // urls
  PKM_DATA_URL: z.string().url(),
  PKM_ASSETS_URL: z.string().url(),

  // paths
  MDX_RELATIVE_DIR: z.string(),

  // database
  DB_PROVIDER: z.enum(['mysql', 'mysql_planetscale']),
  DB_HOST: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string(),
  DB_DATABASE: z.string(),

  // auth
  GITHUB_APP_CLIENT_ID: z.string(),
  GITHUB_APP_CLIENT_SECRET: z.string(),
  PATREON_APP_CLIENT_ID: z.string(),
  PATREON_APP_CLIENT_SECRET: z.string(),
  DISCORD_APP_CLIENT_ID: z.string(),
  DISCORD_APP_CLIENT_SECRET: z.string(),
})

export type ClientEnvVars = z.infer<typeof clientEnvVarSchema>
export type ServerEnvVars = z.infer<typeof serverEnvVarSchema>
export type EnvVarValues<T> = {
  [key in keyof T]: string | undefined
}
