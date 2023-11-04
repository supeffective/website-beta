import { parseEnvVars } from '@/lib/common/env/parser'
import { ClientEnvVars, EnvVarValues, clientEnvVarSchema } from './types'

const initialVars: EnvVarValues<ClientEnvVars> = {
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV ?? 'development',
  NEXT_PUBLIC_PKM_DATA_URL: process.env.NEXT_PUBLIC_PKM_DATA_URL ?? '/static/data',
  NEXT_PUBLIC_PKM_ASSETS_URL: process.env.NEXT_PUBLIC_PKM_ASSETS_URL ?? '/static/assets',
}

export const clientEnvVars = parseEnvVars<ClientEnvVars>(initialVars, clientEnvVarSchema)
