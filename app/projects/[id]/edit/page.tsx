import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/projects/ProjectForm";
import { getProjectById } from "@/lib/projects-db";
import { updateProject } from "../../actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Project",
  description: "Update an existing portfolio project.",
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <header className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          Projects
        </p>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          Edit Project
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-muted">
          Update the details for <span className="font-semibold text-foreground">{project.title}</span>.
        </p>
      </header>

      <ProjectForm
        action={updateProject.bind(null, id)}
        submitLabel="Update project"
        defaultValues={{
          title: project.title,
          description: project.description,
          technologies: project.technologies.join(", "),
          yearCompleted: String(
            project.yearCompleted ?? new Date().getFullYear()
          ),
          type: project.type,
          link: project.link ?? "",
        }}
      />

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
