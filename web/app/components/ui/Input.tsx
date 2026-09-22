import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  shortcut?: string;
};

export function Input({
  shortcut,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="relative flex items-center">
      <Search
        size={18}
        strokeWidth={2}
        className="pointer-events-none absolute left-4 text-neutral-500"
      />
      <input
        className={`h-11 w-full rounded-md border border-neutral-200 bg-white pl-11 pr-16 text-body text-neutral-900 placeholder:text-neutral-500 focus:border-primary-400 focus:outline-none ${className}`}
        {...props}
      />
      {shortcut && (
        <span className="pointer-events-none absolute right-4 rounded-sm border border-neutral-200 px-1.5 py-0.5 text-small text-neutral-500">
          {shortcut}
        </span>
      )}
    </div>
  );
}
