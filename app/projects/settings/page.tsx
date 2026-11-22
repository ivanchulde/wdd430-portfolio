import type { Metadata } from "next";
import Link from "next/link";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Projects",
  description: "Edit or delete portfolio projects.",
};

export default async function ProjectSettingsPage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <header className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          Projects
        </p>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          Manage Projects
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-muted">
          Edit or delete any project. Changes appear on the projects list
          right away.
        </p>

        <Link
          href="/projects/create"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        >
          New project
        </Link>
      </header>

      <ProjectList projects={projects} showActions />
    </main>
  );
}
