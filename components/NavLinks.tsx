"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/projects", label: "Projects" },
  ];

  return (
    <nav aria-label="Main navigation" className="flex flex-wrap gap-2">
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href ||
              pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-md bg-white px-3 py-1.5 text-sm font-bold text-blue-700"
                : "rounded-md px-3 py-1.5 text-sm text-blue-100 transition hover:bg-blue-700 hover:text-white"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}