import 'server-only'

import { z } from 'zod'
import { parseEnvVars } from '../lib/env/parser'

const envVarSchema = z.object({
  // urls
  APP_DATA_URL: z.string().url(),
  APP_ASSETS_URL: z.string().url(),

  // paths
  MDX_RELATIVE_DIR: z.string(),
})

type ServerEnvVars = z.infer<typeof envVarSchema>

const initialEnvVars: {
  [key in keyof ServerEnvVars]: string | undefined
} = {
  // urls
  APP_DATA_URL: process.env.APP_DATA_URL ?? '/static/data',
  APP_ASSETS_URL: process.env.APP_ASSETS_URL ?? '/static/assets',

  // paths
  MDX_RELATIVE_DIR: process.env.MDX_DIR ?? 'app/_mdx',
}

export const envVars = parseEnvVars<ServerEnvVars>(initialEnvVars, envVarSchema)
