# ShortenerService

A URL shortener backend built with **Express**, **tRPC**, **Drizzle ORM (MySQL)**, and **Redis**. It generates short, collision-free codes using an atomic Redis counter encoded in base62, caches lookups for fast redirects, and persists the canonical mapping in MySQL.

## How it works

1. **Short code generation** — `INCR` on a Redis key hands out a unique, monotonically increasing integer for every new URL. That integer is base62-encoded (`0-9A-Za-z`) into a compact short code, so no locking or collision checks are needed.
2. **Write path** — On creation, the mapping is written to MySQL (source of truth) and cached in Redis (`urls:<shortCode>`, 3-day TTL).
3. **Read path** — Redirects check Redis first; on a cache miss they fall back to MySQL and return the original URL.
4. **API layer** — All business logic is exposed over tRPC (`/api/v1/trpc`), with a plain Express route (`GET /:shortUrl`) handling the actual redirect by calling the tRPC procedure internally via a server-side caller.

## Tech stack

| Layer          | Choice                                   |
|----------------|-------------------------------------------|
| Runtime        | Node.js (TypeScript, ESM)                 |
| HTTP framework | Express 5                                 |
| API            | tRPC v11                                  |
| Database       | MySQL via Drizzle ORM                     |
| Cache / counter| Redis (ioredis)                           |
| Validation     | Zod                                       |
| Logging        | Winston + daily rotate file               |
| Tooling        | Biome (lint/format), Drizzle Kit, pnpm    |

## Project structure

```
src/
├── config/          # env config, DB connection, Redis connection, logger
├── controllers/      # Express controllers (redirect, health)
├── database/
│   ├── schemas/       # Drizzle table schema
│   └── migrations/     # Drizzle-generated SQL migrations
├── dtos/             # Shared TypeScript DTOs
├── repositories/      # Data access — MySQL (url) and Redis (cache/counter)
├── services/          # Business logic, orchestrates repositories
├── trpc/              # tRPC context, router, and app router
├── utils/
│   ├── base62.util.ts   # Base62 encode/decode
│   └── errors/           # Typed application errors (404, 500, etc.)
├── validators/        # Express param validation middleware
└── index.ts           # App entrypoint
```

## API

### tRPC procedures (`/api/v1/trpc`)

| Procedure                 | Type     | Description                              |
|----------------------------|----------|-------------------------------------------|
| `urls.createUrl`           | mutation | Shorten a new URL                         |
| `urls.findAllUrls`         | query    | List all shortened URLs                   |
| `urls.findUrlById`         | query    | Fetch a URL record by numeric ID          |
| `urls.findUrlByShortUrl`   | query    | Resolve a short code to its original URL  |
| `urls.deleteUrlById`       | mutation | Delete a URL record by ID                 |

### REST routes

| Route                | Description                                |
|-----------------------|---------------------------------------------|
| `GET /:shortUrl`       | Redirects to the original URL               |
| `GET /api/v1/health`   | Health check (status, uptime, timestamp)    |

## Getting started

### Prerequisites

- Node.js + [pnpm](https://pnpm.io/)
- MySQL instance
- Redis instance

### Setup

```bash
pnpm install
```

Create a `.env` file in the project root:

```env
PORT=3000
BASE_URL=http://localhost:3000
DATABASE_URL=mysql://user:password@localhost:3306/shortener
REDIS_SERVER_HOST=localhost
REDIS_SERVER_PORT=6379
REDIS_INCR_COUNTER_KEY=counter
```

Run migrations:

```bash
pnpm db:generate   # generate migration files from the schema
pnpm db:migrate     # apply migrations to the database
```

### Run

```bash
pnpm dev     # nodemon + ts-node, with reload
pnpm start   # plain ts-node
```

### Other scripts

```bash
pnpm db:studio       # open Drizzle Studio
pnpm biome:check     # lint + format check (write mode)
```

## Design notes

- **Why an atomic counter instead of a hash of the URL?** A Redis `INCR` counter guarantees uniqueness and monotonicity without needing collision retries or distributed locks — every request gets a distinct integer, which is then base62-encoded into a short code.
- **Why cache in Redis with a TTL?** Reads (redirects) are the hot path. Caching recently created/accessed mappings keeps redirects fast while MySQL remains the durable source of truth; a cache miss simply falls back to the database.
- **Why tRPC behind Express?** tRPC gives end-to-end type safety for the URL operations (create, list, find, delete), while the raw Express route handles the public-facing redirect, which needs a plain HTTP redirect rather than a JSON response.

## Roadmap / possible extensions

- Custom aliases for short URLs
- Click analytics (count, referrer, geo)
- Rate limiting on URL creation
- Expiry dates for short URLs
