"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SurveyCardProps {
  survey: {
    id: string;
    question: string;
    options: string;
    correctAnswer: number;
  };
}

export function SurveyCard({ survey }: SurveyCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const reducedMotion = useReducedMotion();

  const options = JSON.parse(survey.options) as string[];

  const handleSelect = async (index: number) => {
    if (hasSubmitted) return;
    setSelected(index);
    const correct = index === survey.correctAnswer;
    setIsCorrect(correct);
    setHasSubmitted(true);

    try {
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surveyId: survey.id, option: index, isCorrect: correct }),
      });
    } catch (error) {
      // Silently fail; the educational feedback is what matters most
      console.error("Erreur lors de l'enregistrement du sondage", error);
    }
  };

  const reset = () => {
    setSelected(null);
    setHasSubmitted(false);
    setIsCorrect(null);
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft md:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-medical-100 text-medical-600">
          <HelpCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-foreground">Sondage santé</h3>
      </div>

      <p className="mt-4 text-lg font-medium text-foreground">{survey.question}</p>

      <div className="mt-5 space-y-3">
        {options.map((option, index) => {
          const isSelected = selected === index;
          const showCorrect = hasSubmitted && index === survey.correctAnswer;
          const showIncorrect = hasSubmitted && isSelected && index !== survey.correctAnswer;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(index)}
              disabled={hasSubmitted}
              className={[
                "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                showCorrect
                  ? "border-mint-300 bg-mint-50 text-mint-700"
                  : showIncorrect
                  ? "border-red-300 bg-red-50 text-red-700"
                  : isSelected
                  ? "border-medical-500 bg-medical-50 text-medical-700"
                  : "border-border bg-white text-foreground hover:bg-medical-50/50",
                hasSubmitted && !isSelected && !showCorrect ? "opacity-60" : "",
              ].join(" ")}
              aria-pressed={isSelected}
            >
              <span className="font-medium">{option}</span>
              {showCorrect && <CheckCircle className="h-5 w-5 text-mint-500" aria-hidden="true" />}
              {showIncorrect && <XCircle className="h-5 w-5 text-red-500" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {hasSubmitted && isCorrect !== null && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={[
              "mt-5 rounded-xl p-4",
              isCorrect ? "bg-mint-50 text-mint-800" : "bg-accent-50 text-accent-700",
            ].join(" ")}
            aria-live="polite"
          >
            <p className="font-heading font-semibold">
              {isCorrect ? "Bonne réponse !" : "Ce n'est pas la bonne réponse."}
            </p>
            <p className="mt-1 text-sm leading-relaxed">
              {isCorrect
                ? "En cas d'AVC, les signes d'alerte peuvent tous apparaître : visage qui tombe, bras qui ne se lève plus, parole perturbée. Agissez vite et appelez le 15."
                : "La bonne réponse est 'Toutes ces réponses'. Face qui tombe, bras qui ne se lève plus, parole perturbée : ce sont les signes d'alerte d'un AVC. Appelez le 15."}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-3 text-sm font-semibold underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Recommencer le sondage
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
