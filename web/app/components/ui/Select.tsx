import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <div className="relative inline-flex items-center">
      <select
        className={`h-11 w-full appearance-none rounded-md border border-neutral-200 bg-white pl-4 pr-10 text-body text-neutral-900 focus:border-primary-400 focus:outline-none ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        strokeWidth={2}
        className="pointer-events-none absolute right-4 text-neutral-500"
      />
    </div>
  );
}
