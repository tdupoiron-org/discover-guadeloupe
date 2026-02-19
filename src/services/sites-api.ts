import { Site } from '@/types/site'

const API_URL = 'http://localhost:3001/sites'

export async function getSites(): Promise<Site[]> {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Failed to fetch sites')
  return res.json()
}

export async function getSite(id: string): Promise<Site> {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) throw new Error('Failed to fetch site')
  return res.json()
}

export async function createSite(site: Omit<Site, 'id'>): Promise<Site> {
  const id = site.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...site, id }),
  })
  if (!res.ok) throw new Error('Failed to create site')
  return res.json()
}

export async function updateSite(id: string, site: Partial<Site>): Promise<Site> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(site),
  })
  if (!res.ok) throw new Error('Failed to update site')
  return res.json()
}

export async function deleteSite(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete site')
}
