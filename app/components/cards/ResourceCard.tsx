import { Download, FileText } from "lucide-react";

type ResourceCardProps = {
  title: string;
  description: string;
  meta: string;
};

export function ResourceCard({ title, description, meta }: ResourceCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-neutral-100 text-neutral-700">
        <FileText size={18} strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-heading-3 font-medium text-neutral-900">
          {title}
        </h3>
        <p className="mt-1 text-body text-neutral-500">{description}</p>
        <div className="mt-3 flex items-center justify-between text-small text-neutral-500">
          <span>{meta}</span>
          <Download size={16} strokeWidth={2} className="text-neutral-500" />
        </div>
      </div>
    </div>
  );
}
