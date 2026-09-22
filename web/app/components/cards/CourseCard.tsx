import type { ReactNode } from "react";
import { BarChart2, Clock, Layers } from "lucide-react";

type CourseCardProps = {
  title: string;
  description: string;
  level: string;
  duration: string;
  moduleCount: number;
  avatarLabel: ReactNode;
  avatarClassName?: string;
  href?: string;
};

export function CourseCard({
  title,
  description,
  level,
  duration,
  moduleCount,
  avatarLabel,
  avatarClassName = "bg-neutral-900 text-white",
}: CourseCardProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-sm text-body-lg font-semibold ${avatarClassName}`}
      >
        {avatarLabel}
      </div>
      <h3 className="text-heading-3 font-medium text-neutral-900">{title}</h3>
      <p className="mt-1 text-body text-neutral-500">{description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-small text-neutral-500">
        <span className="inline-flex items-center gap-1.5">
          <BarChart2 size={14} strokeWidth={2} />
          {level}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock size={14} strokeWidth={2} />
          {duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Layers size={14} strokeWidth={2} />
          {moduleCount} modules
        </span>
      </div>
    </div>
  );
}
