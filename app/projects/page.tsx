import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Projects Overview
      </h1>

      <p className="mb-8 text-lg text-gray-600">
        Here you can find some of my school and open source projects.
      </p>

      <ProjectList projects={projects} />
    </main>
  );
}