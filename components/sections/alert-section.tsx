import { AlertTriangle, Wind, HeartCrack, Brain, Footprints, BatteryWarning, Phone } from "lucide-react";
import { AlertAccordion } from "@/components/alert-accordion";
import { ScrollReveal } from "@/components/scroll-reveal";

const alertSigns = [
  {
    id: "chest-pain",
    icon: <HeartCrack className="h-5 w-5 text-white" aria-hidden="true" />,
    title: "Douleur ou oppression thoracique",
    description:
      "Une sensation d'oppression, d'écrasement ou de brûlure au centre de la poitrine, parfois irradiant vers le bras, la mâchoire ou le dos, peut être le signe d'une angine ou d'un infarctus. Appelez le 14 en cas de doute.",
  },
  {
    id: "shortness",
    icon: <Wind className="h-5 w-5 text-white" aria-hidden="true" />,
    title: "Essoufflement anormal",
    description:
      "Un essoufflement au repos, à l'effort ou en position allongée, surtout s'il est nouveau ou s'aggrave, peut traduire une insuffisance cardiaque ou un problème de valves.",
  },
  {
    id: "palpitations",
    icon: <AlertTriangle className="h-5 w-5 text-white" aria-hidden="true" />,
    title: "Palpitations ou rythme irrégulier",
    description:
      "La sensation de battements cardiaques rapides, irréguliers ou puissants, accompagnés de vertiges ou de malaise, nécessite une évaluation médicale rapide.",
  },
  {
    id: "dizziness",
    icon: <Brain className="h-5 w-5 text-white" aria-hidden="true" />,
    title: "Vertiges ou perte de connaissance",
    description:
      "Un malaise, des vertiges intenses ou un évanouissement peuvent être liés à un trouble du rythme cardiaque grave. Ne conduisez pas et consultez rapidement.",
  },
  {
    id: "edema",
    icon: <Footprints className="h-5 w-5 text-white" aria-hidden="true" />,
    title: "Gonflement des chevilles ou des jambes",
    description:
      "Un œdème bilatéral des chevilles, surtout le soir, peut être le signe d'une insuffisance cardiaque. Faites-le examiner par votre médecin.",
  },
  {
    id: "fatigue",
    icon: <BatteryWarning className="h-5 w-5 text-white" aria-hidden="true" />,
    title: "Fatigue inhabituelle extrême",
    description:
      "Une fatigue soudaine et persistante, notamment chez les femmes, peut être un symptôme d'alerte cardiaque méconnu. Ne l'ignorez pas.",
  },
];

export function AlertSection() {
  return (
    <section className="px-3 py-10 md:px-4">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-accent-400 px-6 py-14 md:px-12 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Signes d'alerte
            </span>
            <h2 className="mt-5 text-3xl font-bold font-heading text-white md:text-4xl">
              Ces signes doivent vous alerter
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              Certaines sensations ne doivent pas être minimisées. Si vous les ressentez, surtout
              plusieurs à la fois, consultez rapidement un médecin ou appelez les secours.
            </p>

            <div className="mt-8 rounded-2xl bg-white/15 p-6 backdrop-blur-sm">
              <p className="font-heading font-semibold text-white">
                En cas d'urgence vitale, composez le
              </p>
              <a
                href="tel:14"
                className="mt-2 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-2xl font-bold font-heading text-accent-600 transition-colors hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="h-6 w-6" aria-hidden="true" />
                14
              </a>
              <p className="mt-3 text-sm text-white/80">Protection civile — Secours médicaux d'urgence</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <AlertAccordion items={alertSigns} />
          </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
