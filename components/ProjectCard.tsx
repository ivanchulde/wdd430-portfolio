import Link from "next/link";
import { deleteProject } from "@/app/projects/actions";

interface ProjectCardProps {
  id?: number;
  title: string;
  description: string;
  technologies: string[];
  yearCompleted?: number;
  link?: string;
  showActions?: boolean;
}

export default function ProjectCard({
  id,
  title,
  description,
  technologies,
  yearCompleted,
  link,
  showActions = false,
}: ProjectCardProps) {
  const canManage = showActions && typeof id === "number";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      <h3 className="mb-2 text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-6 text-muted">
        {description}
      </p>

      {yearCompleted && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Completed {yearCompleted}
        </p>
      )}

      {technologies.length > 0 && (
        <ul className="mb-5 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary-dark"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-4">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2 hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          >
            View Project
            <span aria-hidden="true">&rarr;</span>
          </a>
        )}
      </div>

      {canManage && (
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <Link
            href={`/projects/${id}/edit`}
            className="rounded-full bg-primary-light px-4 py-1.5 text-sm font-semibold text-primary-dark transition hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          >
            Edit
          </Link>

          <form action={deleteProject}>
            <input type="hidden" name="id" value={id} />
            <button
              type="submit"
              className="rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-muted transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
            >
              Delete
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
