# Expense App

This project uses:

- a Vite React frontend in `src/`
- a Fastify API in `server/`
- Prisma ORM in `prisma/`
- Neon Postgres as the recommended database

## Neon Setup

1. Create a Neon project at `https://console.neon.tech/`
2. Copy the two connection strings Neon gives you:
   - pooled connection string for app runtime
   - direct connection string for Prisma CLI and migrations
3. Add them to `.env`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@YOUR-POOLER-HOST/neondb?sslmode=require&channel_binding=require"
DIRECT_URL="postgresql://USER:PASSWORD@YOUR-DIRECT-HOST/neondb?sslmode=require&channel_binding=require"
PORT=4000
```

`DATABASE_URL` should use Neon's pooled host.
`DIRECT_URL` should use Neon's direct host.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your Neon values.

3. Generate the Prisma client:

```bash
npm run prisma:generate
```

4. Create and apply your first migration:

```bash
npm run prisma:migrate -- --name init
```

## Run

Start the frontend:

```bash
npm run dev
```

Start the backend:

```bash
npm run dev:server
```

The backend runs on `http://localhost:4000`.

## Backend API

Available routes:

- `GET /api/health`
- `GET /api/expenses`
- `POST /api/expenses`
- `GET /api/forms`
- `POST /api/forms`
- `PUT /api/forms/:id`
- `DELETE /api/forms/:id`

## Sources

- Prisma Neon docs: https://docs.prisma.io/docs/orm/overview/databases/neon
- Prisma PostgreSQL setup: https://www.prisma.io/docs/orm/core-concepts/supported-databases/postgresql
