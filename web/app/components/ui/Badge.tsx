type BadgeVariant = "video" | "lesson" | "popular";

type BadgeProps = {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
};

const variants: Record<BadgeVariant, string> = {
  video: "bg-neutral-900 text-white",
  lesson: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  popular: "bg-primary-100 text-primary-500",
};

export function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 text-small font-semibold uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
