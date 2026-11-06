import ProjectsNav from "@/components/projects/ProjectsNav";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen">
      <ProjectsNav />

      {children}
    </section>
  );
}
