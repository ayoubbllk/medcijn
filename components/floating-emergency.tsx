"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function FloatingEmergency() {
  const [isOpen, setIsOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="max-w-xs rounded-2xl bg-white p-4 shadow-soft-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-heading font-semibold text-foreground">Urgence cardiaque ?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  En cas de douleur thoracique, d'essoufflement brutal ou de malaise, appelez le 14.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Fermer le panneau d'urgence"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <a
              href="tel:14"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Appeler le 14
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-soft-lg hover:bg-accent-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={isOpen ? "Fermer le bouton d'urgence" : "Ouvrir le bouton d'urgence"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Phone className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
