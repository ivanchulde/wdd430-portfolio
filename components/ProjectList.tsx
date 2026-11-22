import ProjectCard from "./ProjectCard";

interface Project {
  id?: number;
  title: string;
  description: string;
  technologies: string[];
  yearCompleted?: number;
  link?: string;
}

interface ProjectListProps {
  projects: Project[];
  showActions?: boolean;
}

export default function ProjectList({
  projects,
  showActions = false,
}: ProjectListProps) {
  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id ?? `${project.title}-${index}`}
          {...project}
          showActions={showActions}
        />
      ))}
    </section>
  );
}
