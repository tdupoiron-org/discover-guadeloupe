import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from './db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function runMigration(filename: string): Promise<void> {
  const filepath = resolve(__dirname, '..', 'migrations', filename)
  const sql = await readFile(filepath, 'utf8')
  await pool.query(sql)
  console.log(`✓ Applied migration: ${filename}`)
}

async function main() {
  try {
    await runMigration('001_create_sites.sql')
    console.log('All migrations applied successfully.')
  } catch (err) {
    console.error('Migration failed:', err)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

main()
