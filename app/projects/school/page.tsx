import { Suspense } from "react";
import SchoolProjectList from "@/components/projects/SchoolProjectList";
import SchoolProjectSkeleton from "@/components/projects/SchoolProjectSkeleton";

export const dynamic = "force-dynamic";

export default function SchoolProjectsPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        School Projects
      </h1>

      <p className="mb-8 text-lg text-gray-600">
        These are some of the projects I have created for my classes.
      </p>

      <Suspense fallback={<SchoolProjectSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </main>
  );
}