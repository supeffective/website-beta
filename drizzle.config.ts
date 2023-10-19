import type { Config } from 'drizzle-kit'

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  driver: 'mysql2',
  verbose: true,
  dbCredentials: {
    database: String(process.env.DB_DATABASE),
    host: String(process.env.DB_HOST),
    password: String(process.env.DB_PASSWORD),
    port: parseInt(process.env.DB_PORT ?? '3306'),
    user: String(process.env.DB_USERNAME),
  },
} satisfies Config
