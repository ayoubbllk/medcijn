"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, Utensils, AlertTriangle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface RegimeCardProps {
  regime: {
    id: string;
    title: string;
    pathology: string;
    summary: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
    allowed: string;
    forbidden: string;
    tips: string;
    downloadUrl: string | null;
  };
}

export function RegimeCard({ regime }: RegimeCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <div className="rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-soft-lg">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint-100 text-mint-600">
            <Utensils className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-foreground">{regime.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{regime.pathology}</p>
          </div>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border p-6">
              <p className="text-muted-foreground">{regime.summary}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl bg-medical-50 p-4">
                  <p className="text-sm font-semibold text-medical-700">Petit-déjeuner</p>
                  <p className="mt-1 text-sm text-muted-foreground">{regime.breakfast}</p>
                </div>
                <div className="rounded-xl bg-medical-50 p-4">
                  <p className="text-sm font-semibold text-medical-700">Déjeuner</p>
                  <p className="mt-1 text-sm text-muted-foreground">{regime.lunch}</p>
                </div>
                <div className="rounded-xl bg-medical-50 p-4">
                  <p className="text-sm font-semibold text-medical-700">Dîner</p>
                  <p className="mt-1 text-sm text-muted-foreground">{regime.dinner}</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-mint-50 p-4">
                <p className="text-sm font-semibold text-mint-700">Collations</p>
                <p className="mt-1 text-sm text-muted-foreground">{regime.snacks}</p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-mint-600">Aliments privilégiés</p>
                  <p className="mt-1 text-sm text-muted-foreground">{regime.allowed}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-accent-600">Aliments à limiter</p>
                  <p className="mt-1 text-sm text-muted-foreground">{regime.forbidden}</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-mint-200 bg-mint-50 p-4">
                <p className="text-sm font-semibold text-mint-700">Conseils pratiques</p>
                <p className="mt-1 text-sm text-muted-foreground">{regime.tips}</p>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {regime.downloadUrl ? (
                  <a
                    href={regime.downloadUrl}
                    download
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "rounded-full bg-medical-700 px-5 text-white hover:bg-medical-800"
                    )}
                  >
                    <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                    Télécharger la fiche PDF
                  </a>
                ) : (
                  <span
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "rounded-full px-5 opacity-50 cursor-not-allowed"
                    )}
                    aria-disabled="true"
                  >
                    PDF bientôt disponible
                  </span>
                )}

                <div className="flex items-start gap-2 rounded-xl bg-accent-50 p-3 text-sm text-accent-700">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <p>
                    Contenu informatif. Ne remplace pas une consultation avec un médecin ou un nutritionniste.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
