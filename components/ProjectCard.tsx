interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      <h3 className="mb-2 text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-6 text-muted">
        {description}
      </p>

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
    </article>
  );
}
