type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <path d="M14 2L26 22H2L14 2Z" fill="var(--color-primary-500)" />
        <path d="M14 2L20 22H8L14 2Z" fill="var(--color-primary-300)" />
      </svg>
      <span className="font-sans text-heading-1 font-bold text-neutral-900">
        Vertex
      </span>
    </span>
  );
}
