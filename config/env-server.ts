import '@/lib/server-only'

import { parseEnvVars } from '../lib/env/parser'
import { EnvVarValues, ServerEnvVars, serverEnvVarSchema } from './types'

const envName = process.env.APP_ENV === 'dev' ? 'development' : process.env.APP_ENV ?? 'development'

const initialVars: EnvVarValues<ServerEnvVars> = {
  // env name
  APP_ENV: envName,

  // urls
  PKM_DATA_URL: process.env.PKM_DATA_URL ?? '/static/data',
  PKM_ASSETS_URL: process.env.PKM_ASSETS_URL ?? '/static/assets',

  // paths
  MDX_RELATIVE_DIR: 'app/_mdx',

  // database
  DB_PROVIDER: process.env.DB_PROVIDER,
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT ?? '3306',
  DB_DATABASE: process.env.DB_DATABASE ?? 'supereffective',

  // auth
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  GITHUB_APP_CLIENT_ID: process.env.GITHUB_APP_CLIENT_ID,
  GITHUB_APP_CLIENT_SECRET: process.env.GITHUB_APP_CLIENT_SECRET,
}

export const envVars = parseEnvVars<ServerEnvVars>(initialVars, serverEnvVarSchema)
