import 'server-only'

import { z } from 'zod'
import { parseEnvVars } from '../lib/env'

const envVarSchema = z.object({
  // urls
  APP_DATA_URL: z.string().url(),
  APP_ASSETS_URL: z.string().url(),
  // notion
  NOTION_TOKEN: z.string(),
  NOTION_SINGLETON_PAGES_DATABASE_ID: z.string(),
  NOTION_PAGES_DATABASE_ID: z.string(),
  NOTION_BLOG_DATABASE_ID: z.string(),
})

type ServerEnvVars = z.infer<typeof envVarSchema>

const initialEnvVars: {
  [key in keyof ServerEnvVars]: string | undefined
} = {
  // urls
  APP_DATA_URL: process.env.APP_DATA_URL ?? '/static/data',
  APP_ASSETS_URL: process.env.APP_ASSETS_URL ?? '/static/assets',
  // notion
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  NOTION_SINGLETON_PAGES_DATABASE_ID: process.env.NOTION_SINGLETON_PAGES_DATABASE_ID,
  NOTION_PAGES_DATABASE_ID: process.env.NOTION_PAGES_DATABASE_ID,
  NOTION_BLOG_DATABASE_ID: process.env.NOTION_BLOG_DATABASE_ID,
}

export const envVars = parseEnvVars<ServerEnvVars>(initialEnvVars, envVarSchema)
