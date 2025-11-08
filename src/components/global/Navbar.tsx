import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default async function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-900 bg-black/40 px-6 py-4 backdrop-blur-lg">
      {/* Logo */}
      <aside className="flex items-center gap-1">
        <p className="text-3xl font-bold">
          Chain
          <span className="bg-linear-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent">
            Ly
          </span>
        </p>
      </aside>

      {/* Nav Links */}
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden lg:block">
        <ul className="flex items-center gap-6 font-semibold">
          <li>
            <Link href="#">Products</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="#">Clients</Link>
          </li>
          <li>
            <Link href="#">Resources</Link>
          </li>
          <li>
            <Link href="#">Documentation</Link>
          </li>
          <li>
            <Link href="#">Enterprise</Link>
          </li>
        </ul>
      </nav>

      {/* Button */}
      <aside className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white backdrop-blur-3xl">
            Dashboard
          </span>
        </Link>
        <MenuIcon className="md:hidden" />
      </aside>
    </header>
  );
}
