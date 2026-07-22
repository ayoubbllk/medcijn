import { Metadata } from "next";
import { QAList } from "@/components/qa-list";
import { QuestionForm } from "@/components/question-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Q&A Communautaire — CardioConseils",
  description: "Posez vos questions anonymement sur la santé cardiaque et découvrez les réponses du médecin.",
};

export default async function QAPage() {
  const questions = await prisma.question.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-medical-500">
            Q&A Communautaire
          </span>
          <h1 className="mt-3 text-3xl font-bold font-heading text-foreground md:text-4xl">
            Vos questions, nos réponses
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Consultez les réponses aux questions les plus fréquentes ou posez la vôtre en toute
            anonymité.
          </p>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <ScrollReveal className="mb-6">
              <div className="rounded-2xl border border-accent-200 bg-accent-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-500" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-accent-700">
                    Les réponses publiées ici sont à visée éducative. Elles ne constituent pas un
                    diagnostic ni une consultation personnalisée. En cas de symptômes, consultez
                    votre médecin ou appelez le 14 en urgence.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <QAList questions={questions} />
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <ScrollReveal delay={0.2}>
              <QuestionForm />
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </div>
  );
}
