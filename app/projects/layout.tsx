import Link from "next/link";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen">
      <nav className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex gap-6">
          <Link
            href="/projects"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Projects
          </Link>

          <Link
            href="/projects/opensource"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Open Source
          </Link>

          <Link
            href="/projects/school"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            School Projects
          </Link>
        </div>
      </nav>

      {children}
    </section>
  );
}