# WDD 430 Portfolio

Personal portfolio built for **WDD 430 – Web Full-Stack Development**. It showcases school and open-source projects, with project data stored in PostgreSQL on Vercel.

## Live Application

[View the portfolio](https://wdd430-portfolio-aniv1.vercel.app/)

## Features

- Responsive **Home**, **About**, **Contact**, and **Projects** pages.
- Projects split into **School** and **Open Source** views.
- Debounced search by project title, description, or technology.
- Pagination with 6 projects per page and streaming loading skeletons.
- REST API for listing projects and fetching a single project by id.
- PostgreSQL-backed data through `@vercel/postgres`, with an in-memory fallback so the app also runs without a database.
- Dynamic rendering, so database changes appear immediately in the UI.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- `@vercel/postgres` / Neon PostgreSQL
- Vercel

## Getting Started

### Prerequisites

- Node.js **20.9.0** or newer
- npm
- Vercel CLI (optional, only needed to pull database environment variables locally)

### Install

```bash
git clone https://github.com/ivanchulde/wdd430-portfolio.git
cd wdd430-portfolio
npm install
```

### Environment variables

The app reads `POSTGRES_URL` from the Vercel Postgres/Neon integration. To use the same database locally:

```bash
vercel link
vercel env pull .env.local
```

`POSTGRES_URL` is the variable that enables the database path in `lib/projects-db.ts`. If it is not set, the app falls back to the in-memory project list, so it still works for local UI development.

> Never commit `.env.local`. It is already ignored by Git.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create the production build          |
| `npm run start` | Serve the production build locally   |
| `npm run lint`  | Run ESLint                           |

## Project Structure

```txt
app/
  page.tsx                    Home page with profile and featured projects
  about/page.tsx              About page, skills, and highlights
  contact/page.tsx            Contact links
  projects/
    page.tsx                  All projects with search and pagination
    school/page.tsx           School projects
    opensource/page.tsx       Open-source projects
    settings/page.tsx         Placeholder for future project management
  api/
    projects/route.ts         GET /api/projects
    projects/[id]/route.ts    GET /api/projects/:id
components/                   Reusable UI components
lib/
  projects-db.ts              Project types, seed data, and all SQL queries
public/                       Images and logo
```

## API

| Endpoint                 | Description                          |
| ------------------------ | ------------------------------------ |
| `GET /api/projects`      | Return all projects                  |
| `GET /api/projects?type=school` | Return only school projects   |
| `GET /api/projects?type=opensource` | Return only open-source projects |
| `GET /api/projects/:id`  | Return one project, or `404`         |

## Database

The `projects` table uses this structure:

```sql
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  type VARCHAR,
  technologies TEXT[] DEFAULT '{}',
  link VARCHAR
);
```

All database access is centralized in `lib/projects-db.ts`:

- `getProjects(type?)` – list projects, optionally filtered by type.
- `getProjectById(id)` – fetch a single project.
- `fetchFilteredProjects(query, page)` – search with pagination.
- `fetchProjectsPages(query)` – count pages for the current search.

Search uses `ILIKE` on `title` and `description`, plus `unnest(technologies)` for technology matches. Queries are parameterized with tagged template literals.

## Deployment

The project is deployed on Vercel. Pushing to `main` triggers a new build and deployment automatically. Database credentials are read from the Vercel project settings, so no environment file needs to be committed.

## Author

**Iván Chulde** — [GitHub](https://github.com/ivanchulde)

WDD 430 – Web Full-Stack Development.
