import type { Metadata } from "next";
import Link from "next/link";
import ProjectForm from "@/components/projects/ProjectForm";
import { createProject } from "../actions";

export const metadata: Metadata = {
  title: "Create Project",
  description: "Add a new project to the portfolio.",
};

export default function CreateProjectPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <header className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          Projects
        </p>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          Create Project
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-muted">
          Add the details of a new project. Required fields are validated on
          the server before the record is saved.
        </p>
      </header>

      <ProjectForm action={createProject} submitLabel="Create project" />

      <p className="mt-6 text-sm text-muted">
        <Link
          href="/projects"
          className="font-semibold text-primary transition hover:text-primary-dark"
        >
          &larr; Back to projects
        </Link>
      </p>
    </main>
  );
}
