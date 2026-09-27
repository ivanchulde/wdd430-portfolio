// lib/projects-db.ts
import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

export const ITEMS_PER_PAGE = 6;

export async function getProjects(
  type?: string | null
): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows;
  }

  const { rows } = await sql<Project>`
    SELECT * FROM projects ORDER BY id
  `;

  return rows;
}

export async function getProjectById(
  id: number
): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;

  return rows[0] ?? null;
}

export async function getOpenSourceProjects(): Promise<Project[]> {
  return getProjects("opensource");
}

export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<Project[]> {
  const normalizedQuery = query.trim().slice(0, 100);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  if (!normalizedQuery) {
    const { rows } = await sql<Project>`
      SELECT *
      FROM projects
      ORDER BY id
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;

    return rows;
  }

  const searchPattern = `%${normalizedQuery}%`;

  const { rows } = await sql<Project>`
    SELECT *
    FROM projects
    WHERE title ILIKE ${searchPattern}
       OR COALESCE(description, '') ILIKE ${searchPattern}
       OR EXISTS (
         SELECT 1
         FROM unnest(technologies) AS tech
         WHERE tech ILIKE ${searchPattern}
       )
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return rows;
}

export async function fetchProjectsPages(
  query: string
): Promise<number> {
  const normalizedQuery = query.trim().slice(0, 100);

  if (!normalizedQuery) {
    const { rows } = await sql<{ count: number }>`
      SELECT COUNT(*)::int AS count
      FROM projects
    `;

    return Math.ceil(rows[0].count / ITEMS_PER_PAGE);
  }

  const searchPattern = `%${normalizedQuery}%`;

  const { rows } = await sql<{ count: number }>`
    SELECT COUNT(*)::int AS count
    FROM projects
    WHERE title ILIKE ${searchPattern}
       OR COALESCE(description, '') ILIKE ${searchPattern}
       OR EXISTS (
         SELECT 1
         FROM unnest(technologies) AS tech
         WHERE tech ILIKE ${searchPattern}
       )
  `;

  return Math.ceil(rows[0].count / ITEMS_PER_PAGE);
}