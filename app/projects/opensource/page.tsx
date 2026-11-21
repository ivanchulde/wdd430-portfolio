import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Open Source Projects",
  description:
    "Open source projects built by Iván Chulde with Next.js, TypeScript, Python, and Docker.",
};

export default async function OpenSourcePage() {
  const projects = await getProjects("opensource");

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <header className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          Open source
        </p>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          Open Source Projects
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-muted">
          These are some of my open source projects. I enjoy sharing code
          and learning in public.
        </p>
      </header>

      <p className="mb-6 text-sm text-muted">
        {projects.length}{" "}
        {projects.length === 1 ? "project" : "projects"}
      </p>

      <ProjectList projects={projects} />
    </main>
  );
}
