import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-body text-neutral-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-neutral-900">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-neutral-900" : ""}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight size={14} strokeWidth={2} className="text-neutral-300" />
            )}
          </span>
        );
      })}
    </nav>
  );
}
