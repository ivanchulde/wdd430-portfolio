import type { Metadata } from "next";
import { Suspense } from "react";
import SchoolProjectList from "@/components/projects/SchoolProjectList";
import SchoolProjectSkeleton from "@/components/projects/SchoolProjectSkeleton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "School Projects",
  description:
    "School projects built by Iván Chulde with Node.js, Express, MongoDB, PostgreSQL, and Next.js.",
};

export default function SchoolProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <header className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          School
        </p>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          School Projects
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-muted">
          These are some of the projects I have created for my classes,
          from backend APIs to full-stack web applications.
        </p>
      </header>

      <Suspense fallback={<SchoolProjectSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </main>
  );
}
