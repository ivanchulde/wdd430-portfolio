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

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Projects Overview
      </h1>

      <p className="mb-8 text-lg text-gray-600">
        Here you can find some of my school and open source projects.
      </p>

      <ProjectSearch />

      <ProjectList projects={projects} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}
