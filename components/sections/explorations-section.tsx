import { Activity, HeartPulse, Bike, Clock, FlaskConical, Stethoscope, LucideIcon } from "lucide-react";
import { FlipCard } from "@/components/flip-card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";
import { prisma } from "@/lib/prisma";

const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  "heart-pulse": HeartPulse,
  bike: Bike,
  clock: Clock,
  "flask-conical": FlaskConical,
  stethoscope: Stethoscope,
};

export async function ExplorationsSection() {
  const explorations = await prisma.exploration.findMany();

  return (
    <section id="explorations" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-medical-500">
            Explorations du cabinet
          </span>
          <h2 className="mt-3 text-3xl font-bold font-heading text-foreground md:text-4xl">
            Des examens pour mieux comprendre votre cœur
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Cliquez sur chaque carte pour découvrir ce qu'est l'examen, pourquoi il est prescrit et comment se préparer.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {explorations.map((exploration) => {
            const Icon = iconMap[exploration.icon] || Stethoscope;
            return (
              <StaggerItem key={exploration.id}>
                <FlipCard
                  front={
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-medical-50 text-medical-600">
                        <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold font-heading text-foreground">
                        {exploration.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {exploration.shortDescription}
                      </p>
                      <span className="mt-auto pt-4 text-xs font-medium text-medical-500">
                        Cliquez pour en savoir plus
                      </span>
                    </div>
                  }
                  back={
                    <div className="flex h-full flex-col">
                      <h3 className="text-lg font-semibold font-heading text-medical-700">
                        {exploration.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">
                        {exploration.fullDescription}
                      </p>
                      <div className="mt-auto pt-3">
                        <p className="text-xs font-semibold text-medical-600">
                          Préparation :
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {exploration.preparation}
                        </p>
                      </div>
                    </div>
                  }
                  ariaLabelFront={`Découvrir les détails de ${exploration.title}`}
                  ariaLabelBack={`Revenir au résumé de ${exploration.title}`}
                />
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
