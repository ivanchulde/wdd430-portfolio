import ProjectsNav from "@/components/projects/ProjectsNav";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <ProjectsNav />

      {children}
    </section>
  );
}
