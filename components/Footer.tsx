import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/projects", label: "Projects" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-center text-sm text-muted">
        <Link
          href="/"
          aria-label="ANIV — Home"
          className="flex flex-col items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        >
          <Image
            src="/logo.png"
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
          />

          <p className="text-xs">
            &copy; {new Date().getFullYear()} ANIV. All rights reserved.
          </p>
        </Link>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-primary-dark"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://github.com/ivanchulde"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-primary-dark"
          >
            GitHub
          </a>
        </nav>

        <p className="text-xs">
          &copy; {new Date().getFullYear()} ANIV. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
