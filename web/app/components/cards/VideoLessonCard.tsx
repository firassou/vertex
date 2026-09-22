import { Play } from "lucide-react";
import { Badge } from "../ui/Badge";

type VideoLessonCardProps = {
  title: string;
  description: string;
  lessonLabel: string;
  duration: string;
  startLabel: string;
};

export function VideoLessonCard({
  title,
  description,
  lessonLabel,
  duration,
  startLabel,
}: VideoLessonCardProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <Badge variant="video">Video</Badge>
      <h3 className="mt-3 text-heading-3 font-medium text-neutral-900">
        {title}
      </h3>
      <p className="mt-1 text-body text-neutral-500">{description}</p>
      <div className="mt-4 flex items-center justify-between text-small text-neutral-500">
        <span>
          {lessonLabel} · {duration}
        </span>
        <button className="inline-flex items-center gap-1 text-primary-500 hover:underline">
          <Play size={14} strokeWidth={2} />
          {startLabel}
        </button>
      </div>
    </div>
  );
}
