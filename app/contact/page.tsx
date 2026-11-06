import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Iván Chulde.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          Contact
        </p>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          Let&apos;s work together
        </h1>

        <p className="text-lg leading-8 text-muted">
          This page will contain my contact information. In the meantime,
          you can find my work and reach me through GitHub.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Get in touch
        </h2>

        <p className="mb-6 text-sm leading-6 text-muted">
          Contact details are coming soon. Feel free to explore my projects
          or connect with me on GitHub.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/ivanchulde"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          >
            Visit my GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
