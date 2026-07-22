import { Metadata } from "next";
import { RegimeCard } from "@/components/regime-card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";
import { AlertTriangle } from "lucide-react";
import { regimes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Régimes & Nutrition — CardioConseils",
  description: "Fiches nutritionnelles adaptées à l'hypertension, au cholestérol et au post-infarctus. Contenu informatif, ne remplace pas une consultation médicale.",
};

export default function RegimesPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-medical-500">
            Régimes & Nutrition
          </span>
          <h1 className="mt-3 text-3xl font-bold font-heading text-foreground md:text-4xl">
            Manger pour son cœur
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Des fiches pratiques adaptées à différentes pathologies cardiovasculaires. Chaque fiche
            peut être téléchargée au format PDF.
          </p>
        </ScrollReveal>

        <StaggerContainer className="space-y-6">
          {regimes.map((regime) => (
            <StaggerItem key={regime.id}>
              <RegimeCard regime={regime} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal className="mt-12 rounded-2xl border border-accent-200 bg-accent-50 p-6">
          <div className="mx-auto flex max-w-3xl items-start gap-4">
            <AlertTriangle className="h-6 w-6 flex-shrink-0 text-accent-500" aria-hidden="true" />
            <div>
              <p className="font-heading font-semibold text-accent-700">Disclaimer médical</p>
              <p className="mt-2 text-sm leading-relaxed text-accent-700">
                Les fiches présentées sur cette page ont un but strictement informatif et éducatif. Elles ne
                constituent pas un avis médical, un diagnostic ou un plan de traitement. Chaque personne étant
                unique, consultez votre médecin traitant, votre cardiologue ou un nutritionniste diplômé avant
                d'entreprendre un régime spécifique, notamment en cas de traitement médicamenteux ou de
                pathologies associées.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
