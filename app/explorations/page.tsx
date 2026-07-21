import { Metadata } from "next";
import Link from "next/link";
import { Activity, HeartPulse, Bike, Clock, FlaskConical, Stethoscope, LucideIcon, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/card";
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

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explorations médicales — CardioConseils",
  description: "Découvrez les explorations médicales proposées par notre cabinet de cardiologie : ECG, échocardiographie, épreuve d'effort, Holter et bilan lipidique.",
};

export default async function ExplorationsPage() {
  const explorations = await prisma.exploration.findMany();

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-medical-500">
            Explorations médicales
          </span>
          <h1 className="mt-3 text-3xl font-bold font-heading text-foreground md:text-4xl">
            Comprendre les examens du cœur
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Chaque examen a son objectif. Découvrez ce qu'il évalue, comment il se déroule et comment vous préparer.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {explorations.map((exploration) => {
            const Icon = iconMap[exploration.icon] || Stethoscope;
            return (
              <StaggerItem key={exploration.id}>
                <Link href={`/explorations/${exploration.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl">
                  <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                    <CardHeader>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-medical-50 text-medical-600">
                        <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                      </div>
                      <CardTitle className="mt-4">{exploration.title}</CardTitle>
                      <CardDescription>{exploration.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-medical-700">
                        Lire la fiche
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
