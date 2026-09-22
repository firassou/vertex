type ProgressBarProps = {
  percent: number;
  showLabel?: boolean;
  className?: string;
};

export function ProgressBar({
  percent,
  showLabel = true,
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-1.5 flex-1 rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-primary-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="whitespace-nowrap text-small text-neutral-500">
          {clamped}% complete
        </span>
      )}
    </div>
  );
}
