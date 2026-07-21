import { ScrollReveal } from "@/components/scroll-reveal";
import { TipsCarousel } from "@/components/tips-carousel";
import { prisma } from "@/lib/prisma";

export async function TipsSection() {
  const tips = await prisma.tip.findMany();

  return (
    <section className="bg-gradient-to-b from-background to-medical-50/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-medical-500">
            Astuces du moment
          </span>
          <h2 className="mt-3 text-3xl font-bold font-heading text-foreground md:text-4xl">
            Petits gestes, grand cœur
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Des conseils simples et concrets pour prendre soin de votre cœur au quotidien.
          </p>
        </ScrollReveal>

        <TipsCarousel tips={tips} />
      </div>
    </section>
  );
}
