import { trustMetrics } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { MetricCard } from "@/components/cards/MetricCard";

export function TrustStrip() {
  return (
    <section aria-labelledby="trust-heading" className="border-y border-line">
      <Container className="py-12 sm:py-14">
        <h2 id="trust-heading" className="sr-only">At a glance</h2>
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:gap-10 sm:divide-y-0 lg:grid-cols-4">
          {trustMetrics.map((m) => <MetricCard key={m.label} metric={m} />)}
        </div>
      </Container>
    </section>
  );
}
