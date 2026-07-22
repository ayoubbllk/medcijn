import { Award, Users, MessagesSquare } from "lucide-react";
import { AlgeriaMap } from "@/components/algeria-map";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";

const highlights = [
  {
    id: "first",
    icon: Award,
    text: "Le 1er espace éditorial de cardiologie pensé pour les patients algériens.",
  },
  {
    id: "team",
    icon: Users,
    text: "Une équipe de cardiologues engagée dans la prévention et la vulgarisation.",
  },
  {
    id: "support",
    icon: MessagesSquare,
    text: "Des réponses personnalisées à vos questions, où que vous soyez.",
  },
];

export function AlgeriaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-medical-50/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <ScrollReveal>
              <h2 className="text-3xl font-bold font-heading md:text-4xl">
                Nous sommes présents dans{" "}
                <span className="text-medical-600">les 58 wilayas</span> du pays…
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Survolez la carte pour découvrir chaque wilaya : nos contenus de
                prévention sont lus d&apos;Alger à In Guezzam.
              </p>
            </ScrollReveal>

            <StaggerContainer className="mt-10 space-y-4">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.id}>
                    <div className="flex items-center gap-4 rounded-2xl border-2 border-medical-200 bg-white p-5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-medical-600 text-white">
                        <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <p className="text-sm font-medium leading-relaxed text-foreground md:text-base">
                        {item.text}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          <ScrollReveal delay={0.15} className="relative">
            <div className="pointer-events-none absolute -right-20 top-1/2 hidden h-96 w-96 -translate-y-1/2 rounded-full bg-medical-100/70 blur-3xl lg:block" aria-hidden="true" />
            <AlgeriaMap />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
