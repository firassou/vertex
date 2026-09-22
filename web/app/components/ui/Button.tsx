import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight, Play } from "lucide-react";

type Variant = "primary" | "secondary" | "tertiary" | "text";
type Size = "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: "external" | "play" | ReactNode;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-md font-medium text-body transition-colors disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-400 disabled:bg-primary-200 disabled:text-white/80",
  secondary:
    "border border-primary-500 text-primary-500 bg-transparent hover:bg-primary-100 disabled:border-primary-200 disabled:text-primary-200",
  tertiary:
    "border border-neutral-200 text-neutral-900 bg-white hover:bg-neutral-50 disabled:text-neutral-300 disabled:border-neutral-100",
  text: "text-neutral-900 bg-transparent hover:underline disabled:text-neutral-300 disabled:hover:no-underline px-0 h-auto",
};

const sizes: Record<Size, string> = {
  lg: "h-11 px-4",
  md: "h-11 px-3",
};

function resolveIcon(icon: ButtonProps["icon"]) {
  if (icon === "external") return <ArrowUpRight size={16} strokeWidth={2} />;
  if (icon === "play") return <Play size={16} strokeWidth={2} />;
  return icon ?? null;
}

export function Button({
  variant = "primary",
  size = "lg",
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const sizeClass = variant === "text" ? "" : sizes[size];
  return (
    <button
      className={`${base} ${variants[variant]} ${sizeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
      {resolveIcon(icon)}
    </button>
  );
}
