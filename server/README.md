# Discover Guadeloupe – API Server

Node.js / Express REST API backed by **PostgreSQL** that serves and persists
site data for the Discover Guadeloupe web and iOS apps.

---

## Prerequisites

| Tool | Minimum version |
|------|-----------------|
| Node.js | 20 LTS |
| npm | 10 |
| PostgreSQL | 15 |

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `PGHOST` | `localhost` | PostgreSQL host |
| `PGPORT` | `5432` | PostgreSQL port |
| `PGDATABASE` | `discover_guadeloupe` | Database name |
| `PGUSER` | `postgres` | Database user |
| `PGPASSWORD` | `postgres` | Database password |
| `PORT` | `3001` | API server port |
| `ALLOWED_ORIGINS` | `http://localhost:5173` | Comma-separated CORS origins |

---

## Local Setup

### 1. Create the database

```bash
psql -U postgres -c "CREATE DATABASE discover_guadeloupe;"
```

### 2. Install dependencies

```bash
cd server
npm install
```

### 3. Run migrations

```bash
npm run migrate
```

### 4. Seed initial data (optional)

```bash
npm run seed
```

### 5. Start the dev server

```bash
npm run dev
```

The API will be available at `http://localhost:3001`.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/sites` | List all sites |
| `GET` | `/api/sites/:id` | Get a single site |
| `POST` | `/api/sites` | Create a site |
| `PUT` | `/api/sites/:id` | Update a site |
| `DELETE` | `/api/sites/:id` | Delete a site |

### Example – List sites

```bash
curl http://localhost:3001/api/sites
```

### Example – Create a site

```bash
curl -X POST http://localhost:3001/api/sites \
  -H "Content-Type: application/json" \
  -d '{
    "id": "my-beach",
    "name": "My Beach",
    "description": "A beautiful beach.",
    "image": "https://example.com/beach.jpg",
    "duration": "2-3 hours",
    "crowdLevel": "low",
    "rating": 4.5,
    "popularity": "hidden-gem",
    "category": "Beach",
    "coordinates": { "lat": 16.25, "lng": -61.55 }
  }'
```

### Example – Update a site

```bash
curl -X PUT http://localhost:3001/api/sites/my-beach \
  -H "Content-Type: application/json" \
  -d '{ "rating": 4.8 }'
```

### Example – Delete a site

```bash
curl -X DELETE http://localhost:3001/api/sites/my-beach
```

---

## Production Build

```bash
npm run build   # compiles TypeScript to dist/
npm start       # runs the compiled output
```

---

## Project Structure

```
server/
├── migrations/
│   └── 001_create_sites.sql     # Initial schema
├── seeds/
│   └── seed.ts                  # Seed script for dev data
├── src/
│   ├── db.ts                    # PostgreSQL connection pool
│   ├── index.ts                 # Express app entry point
│   ├── migrate.ts               # Migration runner
│   ├── types.ts                 # Shared TypeScript types
│   ├── repositories/
│   │   └── siteRepository.ts    # Data-access layer
│   └── routes/
│       └── sites.ts             # CRUD route handlers
├── .env.example                 # Environment variable template
├── package.json
└── tsconfig.json
```
