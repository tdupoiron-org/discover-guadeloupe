import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg

/**
 * Shared connection pool.  Configure via environment variables:
 *   PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD
 */
export const pool = new Pool({
  host:     process.env.PGHOST     ?? 'localhost',
  port:     Number(process.env.PGPORT ?? 5432),
  database: process.env.PGDATABASE ?? 'discover_guadeloupe',
  user:     process.env.PGUSER     ?? 'postgres',
  password: process.env.PGPASSWORD ?? 'postgres',
})

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err)
})
