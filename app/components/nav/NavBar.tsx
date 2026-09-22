import Link from "next/link";
import { Logo } from "../ui/Logo";

export function NavBar() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-6 text-body font-medium text-neutral-700">
          <Link href="/courses" className="hover:text-neutral-900">
            Courses
          </Link>
          <Link href="/my-learning" className="hover:text-neutral-900">
            My Learning
          </Link>
        </nav>
      </div>
    </header>
  );
}
