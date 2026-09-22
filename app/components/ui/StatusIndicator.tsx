import { CheckCircle2, Circle, Lock, PlayCircle } from "lucide-react";

type Status = "in-progress" | "completed" | "now-playing" | "locked";

type StatusIndicatorProps = {
  status: Status;
  label?: string;
  className?: string;
};

const config: Record<
  Status,
  { icon: React.ReactNode; text: string; color: string }
> = {
  "in-progress": {
    icon: <Circle size={16} strokeWidth={2} />,
    text: "In Progress",
    color: "text-primary-500",
  },
  completed: {
    icon: <CheckCircle2 size={16} strokeWidth={2} />,
    text: "Completed",
    color: "text-green-600",
  },
  "now-playing": {
    icon: <PlayCircle size={16} strokeWidth={2} />,
    text: "Now Playing",
    color: "text-primary-500",
  },
  locked: {
    icon: <Lock size={16} strokeWidth={2} />,
    text: "Locked",
    color: "text-neutral-500",
  },
};

export function StatusIndicator({
  status,
  label,
  className = "",
}: StatusIndicatorProps) {
  const { icon, text, color } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-body ${color} ${className}`}
    >
      {icon}
      {label ?? text}
    </span>
  );
}
