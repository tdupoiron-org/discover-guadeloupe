import { Router } from 'express'
import * as repo from '../repositories/siteRepository.js'
import type { CreateSiteInput, UpdateSiteInput } from '../types.js'

export const sitesRouter = Router()

/** GET /api/sites – list all sites */
sitesRouter.get('/', async (_req, res) => {
  try {
    const sites = await repo.getAllSites()
    res.json(sites)
  } catch (err) {
    console.error('GET /api/sites error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/** GET /api/sites/:id – get a single site */
sitesRouter.get('/:id', async (req, res) => {
  try {
    const site = await repo.getSiteById(req.params.id)
    if (!site) {
      res.status(404).json({ error: 'Site not found' })
      return
    }
    res.json(site)
  } catch (err) {
    console.error('GET /api/sites/:id error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/** POST /api/sites – create a new site */
sitesRouter.post('/', async (req, res) => {
  try {
    const input = req.body as CreateSiteInput
    if (!input.name) {
      res.status(400).json({ error: 'Field "name" is required' })
      return
    }
    const site = await repo.createSite(input)
    res.status(201).json(site)
  } catch (err: unknown) {
    const code = (err as { code?: string }).code
    if (code === '23505') {
      res.status(409).json({ error: 'A site with that id already exists' })
      return
    }
    console.error('POST /api/sites error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/** PUT /api/sites/:id – replace/update a site */
sitesRouter.put('/:id', async (req, res) => {
  try {
    const input = req.body as UpdateSiteInput
    if (!input || Object.keys(input).length === 0) {
      res.status(400).json({ error: 'Request body must contain at least one field to update' })
      return
    }
    const site = await repo.updateSite(req.params.id, input)
    if (!site) {
      res.status(404).json({ error: 'Site not found' })
      return
    }
    res.json(site)
  } catch (err) {
    console.error('PUT /api/sites/:id error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/** DELETE /api/sites/:id – remove a site */
sitesRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await repo.deleteSite(req.params.id)
    if (!deleted) {
      res.status(404).json({ error: 'Site not found' })
      return
    }
    res.status(204).end()
  } catch (err) {
    console.error('DELETE /api/sites/:id error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})
