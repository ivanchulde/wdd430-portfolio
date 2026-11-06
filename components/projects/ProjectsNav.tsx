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
      className="border-b border-gray-200 bg-white px-6 py-4"
    >
      <div className="flex flex-wrap gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white"
                  : "rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-blue-50 hover:text-blue-700"
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
