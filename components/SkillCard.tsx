interface SkillCardProps {
  title: string;
  skills: string[];
}

export default function SkillCard({ title, skills }: SkillCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-8 w-1.5 rounded-full bg-primary"
        />
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/30 hover:bg-primary-light hover:text-primary-dark"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
