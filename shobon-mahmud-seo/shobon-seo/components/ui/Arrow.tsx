import { ArrowUpRight } from "lucide-react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <ArrowUpRight
      aria-hidden
      className={`size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${className}`}
      strokeWidth={1.75}
    />
  );
}
