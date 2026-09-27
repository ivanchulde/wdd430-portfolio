import ProjectList from "@/components/ProjectList";
import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";
import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from "@/lib/projects-db";

export const dynamic = "force-dynamic";

export default async function ProjectsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query || "";

  const rawPage = Number(searchParams?.page) || 1;

  const currentPage =
    Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  const totalPages = await fetchProjectsPages(query);

  const safePage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const projects = await fetchFilteredProjects(
    query,
    safePage
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