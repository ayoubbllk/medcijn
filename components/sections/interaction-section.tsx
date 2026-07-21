import Link from "next/link";
import { SurveyCard } from "@/components/survey-card";
import { QACard } from "@/components/qa-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export async function InteractionSection() {
  const survey = await prisma.survey.findFirst();
  const questions = await prisma.question.findMany({
    orderBy: { votes: "desc" },
    take: 2,
  });

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-medical-500">
            Échangeons
          </span>
          <h2 className="mt-3 text-3xl font-bold font-heading text-foreground md:text-4xl">
            Votre question, notre réponse
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Testez vos connaissances avec un sondage rapide et découvrez les dernières questions de la communauté.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <ScrollReveal>{survey && <SurveyCard survey={survey} />}</ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Dernières questions
                </h3>
                <Link
                  href="/qa"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-full border-medical-200 hover:bg-medical-50"
                  )}
                >
                  Voir toutes les questions
                </Link>
              </div>
            </ScrollReveal>

            {questions.map((question, index) => (
              <ScrollReveal key={question.id} delay={0.15 + index * 0.1}>
                <QACard question={question} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
