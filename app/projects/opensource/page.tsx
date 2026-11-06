import type { Metadata } from "next";
import { headers } from "next/headers";
import ProjectList from "@/components/ProjectList";
import type { Project } from "@/lib/projects-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Open Source Projects",
  description:
    "Open source projects built by Iván Chulde with Next.js, TypeScript, Python, and Docker.",
};

async function getBaseUrl(): Promise<string> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host");

  if (!host) {
    return process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  }

  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}

export default async function OpenSourcePage() {
  const baseUrl = await getBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/projects?type=opensource`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch projects: ${response.status}`
    );
  }

  const projects = (await response.json()) as Project[];

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
