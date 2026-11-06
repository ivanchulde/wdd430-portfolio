"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/projects/opensource", label: "Open Source" },
  { href: "/projects/school", label: "School Projects" },
  { href: "/projects/settings", label: "Settings" },
];

export default function ProjectsNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Projects navigation"
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap gap-1 px-6 py-3">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                  : "rounded-full px-4 py-1.5 text-sm font-medium text-muted transition hover:bg-primary-light hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              }
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
