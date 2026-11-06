import { headers } from "next/headers";
import ProjectList from "@/components/ProjectList";
import type { Project } from "@/lib/projects-db";

export const dynamic = "force-dynamic";

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
    <main className="container mx-auto px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Open Source Projects
      </h1>

      <p className="mb-8 text-lg text-gray-600">
        These are some of my open source projects.
      </p>

      <ProjectList projects={projects} />
    </main>
  );
}
