import '@/lib/utils/env/server-only'

import { parseEnvVars } from '@/lib/utils/env/parser'
import { EnvVarValues, ServerEnvVars, serverEnvVarSchema } from './types'

const envName = process.env.APP_ENV === 'dev' ? 'development' : process.env.APP_ENV ?? 'development'

const initialVars: EnvVarValues<ServerEnvVars> = {
  // env name
  APP_ENV: envName,

  // urls
  PKM_DATA_URL: process.env.PKM_DATA_URL ?? '/static/data',
  PKM_ASSETS_URL: process.env.PKM_ASSETS_URL ?? '/static/assets',

  // paths
  MDX_RELATIVE_DIR: 'blogs', // mdx files dir name, relative to the project root

  // database
  DB_PROVIDER: process.env.DB_PROVIDER,
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT ?? '3306',
  DB_DATABASE: process.env.DB_DATABASE ?? 'supereffective',

  // auth
  GITHUB_APP_CLIENT_ID: process.env.GITHUB_APP_CLIENT_ID,
  GITHUB_APP_CLIENT_SECRET: process.env.GITHUB_APP_CLIENT_SECRET,
  PATREON_APP_CLIENT_ID: process.env.PATREON_APP_CLIENT_ID,
  PATREON_APP_CLIENT_SECRET: process.env.PATREON_APP_CLIENT_SECRET,
  DISCORD_APP_CLIENT_ID: process.env.DISCORD_APP_CLIENT_ID,
  DISCORD_APP_CLIENT_SECRET: process.env.DISCORD_APP_CLIENT_SECRET,
}

export const envVars = parseEnvVars<ServerEnvVars>(initialVars, serverEnvVarSchema)
