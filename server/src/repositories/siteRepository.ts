import { randomUUID } from 'node:crypto'
import { pool } from '../db.js'
import type { Site, CreateSiteInput, UpdateSiteInput } from '../types.js'

/** Columns returned by PostgreSQL for a sites row. */
interface SiteRow {
  id: string
  name: string
  description: string
  image: string
  duration: string
  crowd_level: 'low' | 'medium' | 'high'
  rating: string          // pg returns NUMERIC as string
  popularity: 'must-see' | 'popular' | 'hidden-gem'
  category: string
  lat: string             // pg returns NUMERIC as string
  lng: string
}

function rowToSite(row: SiteRow): Site {
  return {
    id:          row.id,
    name:        row.name,
    description: row.description,
    image:       row.image,
    duration:    row.duration,
    crowdLevel:  row.crowd_level,
    rating:      parseFloat(row.rating),
    popularity:  row.popularity,
    category:    row.category,
    coordinates: {
      lat: parseFloat(row.lat),
      lng: parseFloat(row.lng),
    },
  }
}

/** Return every site ordered by name. */
export async function getAllSites(): Promise<Site[]> {
  const { rows } = await pool.query<SiteRow>('SELECT * FROM sites ORDER BY name')
  return rows.map(rowToSite)
}

/** Return a single site by primary key, or null if not found. */
export async function getSiteById(id: string): Promise<Site | null> {
  const { rows } = await pool.query<SiteRow>(
    'SELECT * FROM sites WHERE id = $1',
    [id],
  )
  return rows[0] ? rowToSite(rows[0]) : null
}

/** Insert a new site and return the created record.
 *  If `input.id` is omitted a UUID will be generated automatically.
 */
export async function createSite(input: CreateSiteInput): Promise<Site> {
  const id = input.id ?? randomUUID()
  const { rows } = await pool.query<SiteRow>(
    `INSERT INTO sites
       (id, name, description, image, duration, crowd_level, rating, popularity, category, lat, lng)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING *`,
    [
      id,
      input.name,
      input.description,
      input.image,
      input.duration,
      input.crowdLevel,
      input.rating,
      input.popularity,
      input.category,
      input.coordinates.lat,
      input.coordinates.lng,
    ],
  )
  return rowToSite(rows[0])
}

/** Update an existing site and return the updated record, or null if not found. */
export async function updateSite(
  id: string,
  input: UpdateSiteInput,
): Promise<Site | null> {
  // Build dynamic SET clause from provided fields only
  const setClauses: string[] = []
  const values: unknown[] = []
  let idx = 1

  const fieldMap: Record<string, string> = {
    name:        'name',
    description: 'description',
    image:       'image',
    duration:    'duration',
    crowdLevel:  'crowd_level',
    rating:      'rating',
    popularity:  'popularity',
    category:    'category',
  }

  for (const [key, col] of Object.entries(fieldMap)) {
    if (key in input) {
      setClauses.push(`${col} = $${idx}`)
      values.push(input[key as keyof UpdateSiteInput])
      idx++
    }
  }

  if ('coordinates' in input && input.coordinates !== undefined) {
    setClauses.push(`lat = $${idx}`, `lng = $${idx + 1}`)
    values.push(input.coordinates.lat, input.coordinates.lng)
    idx += 2
  }

  if (setClauses.length === 0) return null

  values.push(id)
  const { rows } = await pool.query<SiteRow>(
    `UPDATE sites SET ${setClauses.join(', ')} WHERE id = $${idx} RETURNING *`,
    values,
  )
  return rows[0] ? rowToSite(rows[0]) : null
}

/** Delete a site and return true if a row was removed, false otherwise. */
export async function deleteSite(id: string): Promise<boolean> {
  const { rowCount } = await pool.query('DELETE FROM sites WHERE id = $1', [id])
  return (rowCount ?? 0) > 0
}
