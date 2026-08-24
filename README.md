# Hevy Clone

A workout tracking app (clone of Hevy) built with a React + Vite frontend and an Express + Prisma backend.

## Tech Stack

**Frontend** (`client/`)
- React 19 with React Compiler
- Vite
- TypeScript
- ESLint

**Backend** (`server/`)
- Node.js + Express 5
- Prisma 7 ORM with `@prisma/adapter-pg` (driver adapter)
- PostgreSQL
- tsx (dev server with hot reload)

## Project Structure

```
hevy-clone/
├── client/              # React frontend
│   └── src/
│       ├── App.tsx      # Root component (fetches exercises)
│       └── main.tsx
└── server/              # Express API
    ├── prisma/
    │   └── schema.prisma   # DB schema (User, Exercise models)
    ├── generated/          # Prisma client (gitignored — regenerate after clone)
    └── src/
        ├── app.ts          # Express app & routes
        └── lib/prisma.ts   # Prisma client instance
```

## Getting Started

### Prerequisites

- Node.js
- A running PostgreSQL database

### Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <repo-url>
   cd hevy-clone
   ```

2. **Backend setup:**

   ```bash
   cd server
   npm install
   cp .env.example .env        # then edit .env with your DB credentials
   npx prisma generate         # generates the client into server/generated/prisma
   npx prisma migrate dev      # creates the database schema from migrations
   ```

3. **Frontend setup:**

   ```bash
   cd ../client
   npm install
   ```

### Running

Run both processes in separate terminals:

```bash
# Terminal 1 — API server (http://localhost:3000)
cd server
npm run dev

# Terminal 2 — Frontend dev server (http://localhost:5173)
cd client
npm run dev
```

Open http://localhost:5173 in your browser.

## API Endpoints

| Method | Path                | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/health-check`     | Health check           |
| POST   | `/add-workout`      | Create a workout       |
| GET    | `/api/get-exercises` | List all exercises     |

Responses use a consistent envelope format:

```json
{
  "message": "Exercises Fetched!",
  "data": [{ "id": 1, "name": "Preacher Curls", "muscleGroup": "Biceps" }]
}
```

## Development Notes

- **Vite proxy:** The client proxies all `/api/*` requests to `http://localhost:3000` during development (see `client/vite.config.ts`), so no CORS configuration is needed.
- **Prisma client is gitignored:** `server/generated/prisma/` must be regenerated with `npx prisma generate` after cloning or whenever `schema.prisma` changes. Schema changes should also get a migration via `npx prisma migrate dev --name <change_name>`.

## Credits

- **Exercise data:** The seeded exercise catalog (`server/prisma/data/exercises.json`, 800+ exercises) comes from [free-exercise-db](https://github.com/yuhonas/free-exercise-db) by [yuhonas](https://github.com/yuhonas), released under [The Unlicense](https://github.com/yuhonas/free-exercise-db/blob/main/LICENSE) (public domain). Exercise images are served from the same repository.
