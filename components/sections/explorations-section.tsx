import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  HeartPulse,
  Bike,
  Clock,
  FlaskConical,
  Stethoscope,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
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
  const explorations = await prisma.exploration.findMany({ take: 4 });

  return (
    <section id="explorations" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal className="relative order-2 lg:order-1">
            <div className="pointer-events-none absolute -left-8 bottom-8 h-40 w-40 rounded-[2rem] bg-medical-900/90 lg:-left-12" aria-hidden="true" />
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-soft-lg mx-auto lg:mx-0">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="Médecin consultant un dossier sur tablette"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="absolute -right-2 top-8 rounded-2xl bg-white px-5 py-4 shadow-soft-lg md:right-6">
              <p className="font-heading text-2xl font-bold text-medical-600">5+</p>
              <p className="text-xs text-muted-foreground">examens expliqués</p>
            </div>
          </ScrollReveal>

          <div className="order-1 lg:order-2">
            <ScrollReveal>
              <h2 className="text-3xl font-bold font-heading md:text-4xl">
                <span className="text-medical-600">Patient</span>, comprenez enfin
                vos examens du cœur !
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Ne vous inquiétez plus avant un rendez-vous : chaque exploration
                est expliquée simplement, avec sa préparation.
              </p>
            </ScrollReveal>

            <StaggerContainer className="mt-8 space-y-4">
              {explorations.map((exploration) => {
                const Icon = iconMap[exploration.icon] || Stethoscope;
                return (
                  <StaggerItem key={exploration.id}>
                    <Link
                      href={`/explorations/${exploration.slug}`}
                      className="group flex items-center gap-4 rounded-2xl border border-medical-100 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-medical-300 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-medical-50 text-medical-600 transition-colors group-hover:bg-medical-600 group-hover:text-white">
                        <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-heading font-semibold text-foreground">
                          {exploration.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {exploration.shortDescription}
                        </span>
                      </span>
                      <ChevronRight
                        className="h-5 w-5 shrink-0 text-medical-300 transition-transform group-hover:translate-x-1 group-hover:text-medical-600"
                        aria-hidden="true"
                      />
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <ScrollReveal delay={0.2}>
              <Link
                href="/explorations"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-medical-600 hover:text-medical-700"
              >
                Voir toutes les explorations
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
