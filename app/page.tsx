import ProjectList from '@/components/ProjectList';

const projects = [
  {
    title: 'ECU 911 RFID Access Control',
    description:
      'A web application for managing and monitoring access using RFID cards.',
    technologies: ['Next.js', 'React', 'TypeScript', 'PostgreSQL'],
    link: 'https://github.com/ivanchulde',
  },
  {
    title: 'High School Course Enrollment',
    description:
      'A full-stack web application for managing high school course enrollment.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JavaScript'],
    link: 'https://github.com/ivanchulde',
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">
          Hi, I&apos;m Iván Chulde
        </h1>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          I&apos;m an Electronics and Communications Engineer and a
          full-stack development student. I enjoy building web applications
          and learning new technologies with Next.js, React, TypeScript, and
          Node.js.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">
          My Projects
        </h2>

        <ProjectList projects={projects} />
      </section>
    </main>
  );
}
