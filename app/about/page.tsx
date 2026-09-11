import SkillCard from '@/components/SkillCard';

export default function About() {
  const skills = [
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'JavaScript',
    'PostgreSQL',
    'MongoDB',
    'Git',
    'Docker',
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">
          About Me
        </h1>

        <p className="mb-6 text-lg leading-8 text-gray-600">
          I&apos;m Iván Chulde, an Electronics and Communications Engineer
          and a Software Development student. I enjoy learning new
          technologies and building web applications.
        </p>

        <p className="mb-10 text-lg leading-8 text-gray-600">
          I&apos;m currently learning full-stack development with technologies
          such as Next.js, React, TypeScript, and Node.js.
        </p>

        <SkillCard
          title="My Technical Skills"
          skills={skills}
        />
      </section>
    </main>
  );
}