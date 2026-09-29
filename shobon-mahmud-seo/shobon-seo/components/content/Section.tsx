import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Section({ children, className, tone = "light", id, labelledBy }: { children: React.ReactNode; className?: string; tone?: "light" | "muted" | "dark"; id?: string; labelledBy?: string }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-16 sm:py-20 lg:py-28",
        tone === "muted" && "bg-paper-2",
        tone === "dark" && "on-night bg-night text-on-night",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
