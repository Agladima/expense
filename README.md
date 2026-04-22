# Expense App

This project now has:

- a Vite React frontend in `src/`
- a lightweight Node backend in `server/`

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

## Data Storage

The backend uses a local JSON file for now:

- `server/data/db.json`

That gives us a usable backend immediately without introducing a database before the frontend is wired up.
