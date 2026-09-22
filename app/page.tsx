import { Logo } from "./components/ui/Logo";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-neutral-50 py-32">
      <Logo />
      <p className="text-body text-neutral-500">
        The Vertex home page is coming soon.
      </p>
    </div>
  );
}
