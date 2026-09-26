import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export default async function OpenSourcePage() {
  const projects = await getProjects("opensource");

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Open Source Projects
      </h1>

      <p className="mb-8 text-lg text-gray-600">
        These are some of my open source projects.
      </p>

      <ProjectList projects={projects} />
    </main>
  );
}