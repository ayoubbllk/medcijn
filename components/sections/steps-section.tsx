import Link from "next/link";
import { BookOpenText, Stethoscope, MessageCircleQuestion } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";

const steps = [
  {
    number: "1",
    icon: BookOpenText,
    title: "Lisez nos astuces santé",
    description: "Des gestes simples et concrets pour protéger votre cœur au quotidien.",
    href: "/blog",
  },
  {
    number: "2",
    icon: Stethoscope,
    title: "Comprenez vos examens",
    description: "ECG, échographie, épreuve d'effort : chaque exploration expliquée clairement.",
    href: "/explorations",
  },
  {
    number: "3",
    icon: MessageCircleQuestion,
    title: "Posez vos questions",
    description: "Notre équipe répond à vos interrogations, sans jargon médical.",
    href: "/qa",
  },
];

export function StepsSection() {
  return (
    <section className="px-3 py-10 md:px-4 md:py-14">
      <div className="gradient-hero relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-14 md:px-12 md:py-20">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-medical-900/25 blur-3xl" aria-hidden="true" />

        <ScrollReveal className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold font-heading text-white md:text-4xl">
            <span className="text-medical-900">Patient</span>, prenez soin de
            votre cœur en trois étapes simples…
          </h2>
        </ScrollReveal>

        <div className="relative mt-14">
          {/* Ligne reliant les étapes */}
          <div className="absolute left-1/2 top-6 hidden h-0.5 w-2/3 -translate-x-1/2 bg-white/30 md:block" aria-hidden="true" />

          <StaggerContainer className="grid gap-10 md:grid-cols-3 md:gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.number}>
                  <Link
                    href={step.href}
                    className="group relative flex flex-col items-center text-center focus:outline-none"
                  >
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white font-heading text-lg font-bold text-medical-700 shadow-soft-lg transition-transform group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-white">
                      {step.number}
                    </span>
                    <span className="mt-6 w-full rounded-3xl bg-white/10 p-6 backdrop-blur-sm transition-colors group-hover:bg-white/20">
                      <Icon className="mx-auto h-8 w-8 text-white" strokeWidth={1.6} aria-hidden="true" />
                      <span className="mt-4 block font-heading text-lg font-semibold text-white">
                        {step.title}
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-white/85">
                        {step.description}
                      </span>
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
