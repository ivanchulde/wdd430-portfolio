import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Settings",
  description: "Settings for managing portfolio projects.",
};

export default function ProjectSettingsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <header className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          Projects
        </p>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          Project Settings
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-muted">
          This section will contain settings for managing my projects.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-3 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary-dark"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </span>

          <h2 className="text-xl font-semibold text-foreground">
            Coming soon
          </h2>
        </div>

        <p className="text-sm leading-6 text-muted">
          This is a placeholder page for the projects section settings.
          Project management tools will be available here in a future
          activity.
        </p>
      </section>
    </main>
  );
}
