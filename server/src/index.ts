import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { sitesRouter } from './routes/sites.js'

const app = express()
const PORT = Number(process.env.PORT ?? 3001)

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use('/api/sites', sitesRouter)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Discover Guadeloupe API listening on http://localhost:${PORT}`)
})
