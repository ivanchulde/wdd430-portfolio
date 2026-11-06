import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary/95 text-white shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="flex w-fit items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <Image
            src="/ivan-chulde.png"
            alt=""
            width={36}
            height={48}
            className="avatar-photo h-9 w-9 rounded-full object-cover ring-2 ring-white/40"
          />
          <span className="text-xl font-bold tracking-tight sm:text-2xl">
            Iván Chulde
          </span>
        </Link>

        <NavLinks />
      </div>
    </header>
  );
}
