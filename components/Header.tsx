import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="bg-blue-600 py-4 text-white shadow-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4">
        <div id="header-title" className="text-2xl font-bold">
          Ivan Chulde
        </div>

        <NavLinks />
      </div>
    </header>
  );
}