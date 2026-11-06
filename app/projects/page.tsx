import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import ProjectList from "@/components/ProjectList";
import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";
import {
  filterProjects,
  paginateProjects,
  type Project,
} from "@/lib/projects-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "School and open source projects built by Iván Chulde with Next.js, React, TypeScript, Node.js, and databases.",
};

async function getBaseUrl(): Promise<string> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host");

  if (!host) {
    return process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  }

  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}

async function fetchAllProjects(): Promise<Project[]> {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/projects`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch projects: ${response.status}`
    );
  }

  return (await response.json()) as Project[];
}

export default async function ProjectsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query || "";

  const rawPage = Number(searchParams?.page) || 1;

  const requestedPage =
    Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  const allProjects = await fetchAllProjects();
  const filteredProjects = filterProjects(allProjects, query);

  const { projects, totalPages } = paginateProjects(
    filteredProjects,
    requestedPage
  );

  const resultsLabel =
    filteredProjects.length === 1
      ? "1 project"
      : `${filteredProjects.length} projects`;

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <header className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          Portfolio
        </p>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          Projects Overview
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-muted">
          Here you can find some of my school and open source projects.
        </p>
      </header>

      <ProjectSearch />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {query ? (
            <>
              Showing {resultsLabel} for{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{query}&rdquo;
              </span>
            </>
          ) : (
            <>Showing {resultsLabel}</>
          )}
        </p>

        {query && (
          <Link
            href="/projects"
            className="text-sm font-semibold text-primary transition hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          >
            Clear search
          </Link>
        )}
      </div>

      {projects.length > 0 ? (
        <>
          <ProjectList projects={projects} />
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            No projects found
          </h2>

          <p className="mx-auto mb-6 max-w-md text-sm leading-6 text-muted">
            {query
              ? `No projects match "${query}". Try a different title, description, or technology.`
              : "There are no projects to show right now."}
          </p>

          {query && (
            <Link
              href="/projects"
              className="inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              Clear search
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
