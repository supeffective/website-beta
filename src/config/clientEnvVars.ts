import { z } from 'zod'
import { parseEnvVars } from '../lib/env'

const envVarSchema = z.object({
  NEXT_PUBLIC_APP_DATA_URL: z.string().url(),
  NEXT_PUBLIC_APP_ASSETS_URL: z.string().url(),
})

type ClientEnvVars = z.infer<typeof envVarSchema>

const initialEnvVars: {
  [key in keyof ClientEnvVars]: string | undefined
} = {
  NEXT_PUBLIC_APP_DATA_URL: process.env.NEXT_PUBLIC_APP_DATA_URL ?? '/static/data',
  NEXT_PUBLIC_APP_ASSETS_URL: process.env.NEXT_PUBLIC_APP_ASSETS_URL ?? '/static/assets',
}

export const clientEnvVars = parseEnvVars<ClientEnvVars>(initialEnvVars, envVarSchema)
