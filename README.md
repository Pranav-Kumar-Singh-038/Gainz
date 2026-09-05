# Hevy Clone

A workout tracking app (clone of Hevy) built with a React + Vite frontend and an Express + Prisma backend.

## Live Demo (dev deployment)

Try the app here: **https://gainz-azure.vercel.app/**

Deployment setup:
- **Frontend** → Vercel (`dev` branch): https://gainz-azure.vercel.app/
- **Backend API** → Render: `https://gainz-backenc.onrender.com`
- **Database** → Neon (PostgreSQL)

> Note: the backend runs on Render's free tier, so the first API call after a period of inactivity can take ~30–60s (cold start). If the app seems stuck on first load, wait a moment and retry.

## How To Use

1. **Sign up:** Open the demo link. You'll land on the Signup page — enter an email and password, then hit Submit.
2. **Log in:** After signup you'll be sent to the Login page. Log in with the same credentials. (Your session is kept via `userId` in browser localStorage.)
3. **Dashboard:** After login you get three options:
   - **Exercises** — browse the full exercise catalog (800+ exercises with instructions and images).
   - **Create Workout** — manage your workouts.
   - **Logout** — ends your session.
4. **Create a workout:** On the Create Workout page, type a name (e.g. "Push Day") and hit Create. Your workouts are listed below, each with:
   - **Modify Workout** — opens that workout's exercise list.
   - **Delete Workout** — removes the workout.
5. **Add exercises to a workout:** On a workout's page (`/workout/:id/exercises`):
   - The top list shows exercises already in the workout (name, sets, reps, rest time), each removable via **Remove Exercise**.
   - Under **Add Exercises**, type a name in the Search box and hit **Search** to find exercises from the catalog.
   - For a result, optionally set **Sets**, **Reps**, and **Rest Time (seconds)** (defaults: 3 sets, 12 reps, 120s), then hit **Add Exercise**.

## Features

- Workout logging
- Exercise search and selection
- Workout creation flow

## Features To Implement

- Editable workout details:
  - sets
  - reps
  - rest time
  - weights
- Improved exercise search
- Search on `Enter` key press
- Edit exercise details
- Button press feedback: buttons currently show no visible effect when pressed — add active/pressed states so taps feel responsive
- Search results UX: show a "no results found" message for empty searches, and show the number of items found at the top of the results list
- Exercise alternate names: many exercises need aliases/alternate names (e.g. "narrow stance squats") so search finds them regardless of which variation name the user types
- Exercise card CSS: display image, instructions, and name properly (layout is currently unstyled)
- Edit exercise detail after adding: allow changing sets/reps/rest of an exercise already added to a workout
- Separate place to start a workout: a dedicated workout session view ( distinct from the create/edit flow) for actually performing a workout

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
