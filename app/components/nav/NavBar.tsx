import Link from "next/link";
import { Bell } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Logo } from "../ui/Logo";

export function NavBar() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-body font-medium text-neutral-700 sm:flex">
            <Link href="/courses" className="hover:text-neutral-900">
              Courses
            </Link>
            <Link href="/my-learning" className="hover:text-neutral-900">
              My Learning
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="text-neutral-700 hover:text-neutral-900"
          >
            <Bell size={20} strokeWidth={2} />
          </button>
          <Show when="signed-out">
            <div className="flex items-center gap-3">
              <SignInButton>
                <button
                  type="button"
                  className="text-body font-medium text-neutral-700 hover:text-neutral-900"
                >
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button
                  type="button"
                  className="rounded-full bg-primary-500 px-4 py-2 text-small font-semibold text-white hover:bg-primary-600"
                >
                  Sign up
                </button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
