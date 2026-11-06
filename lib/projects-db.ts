// lib/projects-db.ts
//
// Módulo de datos del portafolio. Contiene los datos en memoria que pide la
// actividad y, además, la implementación PostgreSQL que usa la app en Vercel.
//
// - Si existe POSTGRES_URL se consulta la base de datos.
// - Si no existe (por ejemplo en local), se usan los datos en memoria.
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

const projects: Project[] = [
  {
    id: 1,
    title: "ECU 911 RFID Access Control",
    description:
      "Web application for managing and monitoring access using RFID cards.",
    type: "school",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
    ],
    link: "https://github.com/ivanchulde/ecu911-rfid-access-control",
  },
  {
    id: 2,
    title: "CSE341 Final Project G7",
    description:
      "Full-stack web application developed for managing data and user access with a REST API.",
    type: "school",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "Passport",
      "JWT",
      "Swagger",
      "Jest",
    ],
    link: "https://github.com/ivanchulde/cse341-finalproject-G7",
  },
  {
    id: 3,
    title: "CSE341 Project 2",
    description:
      "Full-stack web application with authentication, REST API functionality, and MongoDB data management.",
    type: "school",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "Passport",
      "Swagger",
    ],
    link: "https://github.com/ivanchulde/cse341-IC-project2",
  },
  {
    id: 4,
    title: "CSE341 Project 1",
    description:
      "REST API web application developed as part of the CSE341 backend development coursework.",
    type: "school",
    technologies: ["Node.js", "Express", "MongoDB", "Swagger"],
    link: "https://github.com/ivanchulde/cse341-IC-project1",
  },
  {
    id: 5,
    title: "CSE340 Web Application",
    description:
      "Web application developed with Express and PostgreSQL as part of the CSE340 course.",
    type: "school",
    technologies: ["Node.js", "Express", "PostgreSQL", "EJS"],
    link: "https://github.com/ivanchulde/cse340-ivan",
  },
  {
    id: 6,
    title: "Poké Explorer",
    description:
      "Dynamic web application that allows users to search, explore, and compare Pokémon data, including stats, abilities, and types, using external APIs and local storage.",
    type: "school",
    technologies: ["JavaScript", "HTML", "CSS"],
    link: "https://github.com/ivanchulde/poke-explorer",
  },
  {
    id: 7,
    title: "WDD 231 Web Frontend Development",
    description:
      "Web frontend development projects created as part of the WDD231 course.",
    type: "school",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/ivanchulde/wdd231",
  },
  {
    id: 8,
    title: "ECU 911 Vehicle Data Visualization",
    description:
      "Application for visualizing vehicle data in the ECU 911 Ambato garage.",
    type: "opensource",
    technologies: ["Python", "HTML", "CSS", "Docker"],
    link: "https://github.com/ivanchulde/ecu911car",
  },
  {
    id: 9,
    title: "Sacrament Meetings",
    description:
      "Web application developed with Next.js and TypeScript.",
    type: "opensource",
    technologies: ["Next.js", "TypeScript", "JavaScript", "CSS"],
    link: "https://github.com/ivanchulde/sacrament-meetings",
  },
  {
    id: 10,
    title: "ECU 911 Access Control System",
    description:
      "Access control project combining software components with hardware-oriented development.",
    type: "opensource",
    technologies: ["C++", "JavaScript", "HTML", "Python", "Docker"],
    link: "https://github.com/ivanchulde/Control_Cerraduras_ECU911",
  },
  {
    id: 11,
    title: "ANIV Delivery",
    description: "Personal delivery application project.",
    type: "opensource",
    technologies: [],
    link: "https://github.com/ivanchulde/ANIV_Delivery",
  },
  {
    id: 12,
    title: "WDD430 Portfolio",
    description:
      "Personal portfolio website developed for the WDD430 Web Full-Stack Development course.",
    type: "opensource",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Vercel"],
    link: "https://github.com/ivanchulde/wdd430-portfolio",
  },
];

function hasDatabase(): boolean {
  return Boolean(process.env.POSTGRES_URL);
}

export function filterProjects(
  projectsToFilter: Project[],
  query: string
): Project[] {
  const normalizedQuery = query.trim().slice(0, 100).toLowerCase();

  if (!normalizedQuery) {
    return projectsToFilter;
  }

  return projectsToFilter.filter((project) => {
    const technologies = Array.isArray(project.technologies)
      ? project.technologies
      : [];

    return (
      project.title.toLowerCase().includes(normalizedQuery) ||
      (project.description ?? "")
        .toLowerCase()
        .includes(normalizedQuery) ||
      technologies.some((tech) =>
        tech.toLowerCase().includes(normalizedQuery)
      )
    );
  });
}

export function paginateProjects(
  projectsToPaginate: Project[],
  currentPage: number
): { projects: Project[]; currentPage: number; totalPages: number } {
  const totalPages = Math.max(
    Math.ceil(projectsToPaginate.length / ITEMS_PER_PAGE),
    1
  );

  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const offset = (safePage - 1) * ITEMS_PER_PAGE;

  return {
    projects: projectsToPaginate.slice(
      offset,
      offset + ITEMS_PER_PAGE
    ),
    currentPage: safePage,
    totalPages,
  };
}

export async function getProjects(
  type?: string | null
): Promise<Project[]> {
  if (!hasDatabase()) {
    if (type) {
      return projects.filter((project) => project.type === type);
    }

    return [...projects];
  }

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
  if (!hasDatabase()) {
    return projects.find((project) => project.id === id) ?? null;
  }

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
  if (!hasDatabase()) {
    const filteredProjects = filterProjects(projects, query);
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredProjects.slice(offset, offset + ITEMS_PER_PAGE);
  }

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
  if (!hasDatabase()) {
    const filteredProjects = filterProjects(projects, query);

    return Math.max(
      Math.ceil(filteredProjects.length / ITEMS_PER_PAGE),
      1
    );
  }

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
