import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Activity, HeartPulse, Bike, Clock, FlaskConical, Stethoscope, LucideIcon, ArrowLeft, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";
import { explorations, getExplorationBySlug } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  "heart-pulse": HeartPulse,
  bike: Bike,
  clock: Clock,
  "flask-conical": FlaskConical,
  stethoscope: Stethoscope,
};

interface ExplorationPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return explorations.map((exploration) => ({ slug: exploration.slug }));
}

export async function generateMetadata({ params }: ExplorationPageProps): Promise<Metadata> {
  const exploration = getExplorationBySlug(params.slug);

  if (!exploration) {
    return { title: "Exploration introuvable — CardioConseils" };
  }

  return {
    title: `${exploration.title} — CardioConseils`,
    description: exploration.shortDescription,
  };
}

export default async function ExplorationDetailPage({ params }: ExplorationPageProps) {
  const exploration = getExplorationBySlug(params.slug);

  if (!exploration) {
    notFound();
  }

  const Icon = iconMap[exploration.icon] || Stethoscope;
  const steps = JSON.parse(exploration.steps) as string[];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Link
          href="/explorations"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mb-6 -ml-2 text-muted-foreground hover:text-medical-700"
          )}
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Retour aux explorations
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-medical-50 text-medical-600">
              <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h1 className="mt-5 text-3xl font-bold font-heading text-foreground md:text-4xl lg:text-5xl">
              {exploration.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {exploration.fullDescription}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {exploration.image && (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-medical-100">
                <Image
                  src={exploration.image}
                  alt={`Matériel utilisé pour ${exploration.title}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </ScrollReveal>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-2xl bg-white p-8 shadow-soft">
              <h2 className="text-2xl font-bold font-heading text-foreground">
                Pourquoi le médecin le prescrit
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {exploration.whyPrescribed}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl bg-medical-50 p-8">
              <h2 className="text-2xl font-bold font-heading text-medical-700">
                Préparation nécessaire
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {exploration.preparation}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16">
          <ScrollReveal className="mb-10 text-center">
            <h2 className="text-3xl font-bold font-heading text-foreground">
              Déroulement étape par étape
            </h2>
            <p className="mt-3 text-muted-foreground">
              Ce que vous vivrez lors de l'examen, de l'arrivée à l'interprétation.
            </p>
          </ScrollReveal>

          <StaggerContainer className="relative">
            <div className="absolute left-6 top-0 bottom-0 hidden w-0.5 bg-medical-100 md:block" aria-hidden="true" />
            {steps.map((step, index) => (
              <StaggerItem key={index}>
                <div className="relative mb-8 md:pl-16">
                  <div className="hidden md:flex absolute left-0 top-0 h-12 w-12 items-center justify-center rounded-full bg-medical-100 text-medical-700 font-bold font-heading">
                    {index + 1}
                  </div>
                  <div className="rounded-2xl bg-white p-6 shadow-soft md:p-8">
                    <div className="md:hidden mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-medical-100 text-medical-700 text-sm font-bold font-heading">
                      {index + 1}
                    </div>
                    <p className="text-lg leading-relaxed text-foreground">{step}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <ScrollReveal className="mt-16 rounded-2xl border border-mint-200 bg-mint-50 p-6 text-center">
          <div className="mx-auto flex max-w-2xl items-start gap-3">
            <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-mint-500" aria-hidden="true" />
            <p className="text-left text-sm text-mint-800">
              <strong>À retenir :</strong> {exploration.title} est un examen courant, généralement rapide et indolore. N'hésitez pas à poser vos questions au personnel soignant avant, pendant ou après l'examen.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
