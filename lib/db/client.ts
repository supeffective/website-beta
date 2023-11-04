import { envVars } from '@/config/env/server-vars'
import '@/lib/common/env/server-only'
import { connect as planetscale_connect } from '@planetscale/database'
import { DefaultLogger, LogWriter } from 'drizzle-orm'
import { MySql2Database, drizzle as mysql_drizzle } from 'drizzle-orm/mysql2'
import { migrate as mysql_migrate } from 'drizzle-orm/mysql2/migrator'
import { PlanetScaleDatabase, drizzle as planetscale_drizzle } from 'drizzle-orm/planetscale-serverless'
import { migrate as planetscale_migrate } from 'drizzle-orm/planetscale-serverless/migrator'
import mysql from 'mysql2/promise'
import * as schema from './schema'

const migrationsFolder = __dirname + '/migrations'

type DrizzleMysqlClient = PlanetScaleDatabase<typeof schema> | MySql2Database<typeof schema>

const globalForDrizzle = globalThis as unknown as {
  drizzleDb?: DrizzleMysqlClient
  drizzleMigrate?: () => Promise<void>
}

class ConsoleLogWriter implements LogWriter {
  write(message: string) {
    console.log('[drizzle-orm]', message)
  }
}

const logger = envVars.APP_ENV === 'development' ? new DefaultLogger({ writer: new ConsoleLogWriter() }) : undefined

const _initDrizzleClient = (): [DrizzleMysqlClient, () => Promise<void>] => {
  if (envVars.DB_PROVIDER === 'mysql_planetscale') {
    console.log('[drizzle-orm] Connecting to PlanetScale MySQL...')

    const connection = planetscale_connect({
      host: envVars.DB_HOST,
      username: envVars.DB_USERNAME,
      password: envVars.DB_PASSWORD,
    })

    const planetscaleClient = planetscale_drizzle(connection, { schema, logger })
    return [
      planetscaleClient,
      async () => {
        console.log('[drizzle-orm] Running migrations...')
        await planetscale_migrate(planetscaleClient, { migrationsFolder })
        console.log('[drizzle-orm] Migrations done.')
      },
    ]
  }

  console.log('[drizzle-orm] Connecting to MySQL...')
  const mysqlPool = mysql.createPool({
    host: envVars.DB_HOST,
    user: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
    port: parseInt(envVars.DB_PORT),
    connectTimeout: 2000,
    connectionLimit: 1, // Setting connectionLimit to "1" in a serverless function environment optimizes resource usage, reduces costs, ensures connection stability, and enables seamless scalability.
    maxIdle: 1, // max idle connections, the default value is the same as `connectionLimit`
    enableKeepAlive: true,
    pool: true,
  })

  const mysqlClient = mysql_drizzle(mysqlPool, { schema, mode: 'default', logger })

  return [
    mysqlClient,
    async () => {
      console.log('[drizzle-orm] Running migrations...')
      const mysqlMigrationsConnection = await mysql.createConnection({
        host: envVars.DB_HOST,
        user: envVars.DB_USERNAME,
        password: envVars.DB_PASSWORD,
        database: envVars.DB_DATABASE,
        port: parseInt(envVars.DB_PORT),
      })
      const mysqlMigrationsClient = mysql_drizzle(mysqlMigrationsConnection, {
        schema,
        mode: 'default',
        logger,
      })
      await mysql_migrate(mysqlMigrationsClient, { migrationsFolder })
      console.log('[drizzle-orm] Migrations done.')
      process.exit(0)
    },
  ]
}

function _getDrizzleGlobals(): [DrizzleMysqlClient, () => Promise<void>] {
  if (globalForDrizzle.drizzleDb !== undefined && globalForDrizzle.drizzleMigrate !== undefined) {
    return [globalForDrizzle.drizzleDb, globalForDrizzle.drizzleMigrate]
  }

  const [db, migrate] = _initDrizzleClient()

  if (envVars.APP_ENV !== 'production') {
    globalForDrizzle.drizzleDb = db
    globalForDrizzle.drizzleMigrate = migrate
  }

  return [db, migrate]
}

const [db, migrate] = _getDrizzleGlobals()

export default db
export { migrate }
