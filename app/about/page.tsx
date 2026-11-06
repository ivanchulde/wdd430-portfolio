import type { Metadata } from "next";
import Image from "next/image";
import SkillCard from "@/components/SkillCard";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Iván Chulde, an Electronics and Communications Engineer and full-stack development student.",
};

export default function About() {
  const skills = [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "PostgreSQL",
    "MongoDB",
    "Git",
    "Docker",
  ];

  const highlights = [
    {
      title: "Engineering mindset",
      description:
        "Electronics and Communications Engineer with a focus on solving real problems through technology.",
    },
    {
      title: "Full-stack learning",
      description:
        "Building applications end to end with Next.js, React, TypeScript, Node.js, and databases.",
    },
    {
      title: "Always improving",
      description:
        "I enjoy learning new tools, refining my code, and turning ideas into working products.",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="mx-auto mb-12 flex max-w-4xl flex-col items-center gap-8 text-center md:flex-row md:text-left">
        <Image
          src="/ivan-chulde.png"
          alt="Iván Chulde"
          width={160}
          height={213}
          className="avatar-photo h-40 w-40 shrink-0 rounded-full border-4 border-white object-cover shadow-lg ring-4 ring-primary/15"
        />

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            About me
          </p>

          <h1 className="mb-5 text-4xl font-bold tracking-tight text-foreground">
            Engineer, developer, and lifelong learner
          </h1>

          <p className="text-lg leading-8 text-muted">
            I&apos;m Iván Chulde, an Electronics and Communications
            Engineer and a Software Development student. I enjoy learning
            new technologies and building web applications that are useful
            and easy to use.
          </p>
        </div>
      </header>

      <section className="mb-14 grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
          >
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              {item.title}
            </h2>

            <p className="text-sm leading-6 text-muted">
              {item.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl">
        <p className="mb-8 text-lg leading-8 text-muted">
          I&apos;m currently learning full-stack development with
          technologies such as Next.js, React, TypeScript, and Node.js.
        </p>

        <SkillCard title="My Technical Skills" skills={skills} />
      </section>
    </main>
  );
}
