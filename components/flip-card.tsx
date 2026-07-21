"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  ariaLabelFront?: string;
  ariaLabelBack?: string;
}

export function FlipCard({
  front,
  back,
  className,
  ariaLabelFront = "Voir le verso de la carte",
  ariaLabelBack = "Voir le recto de la carte",
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const reducedMotion = useReducedMotion();

  const toggle = () => setIsFlipped((prev) => !prev);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  if (reducedMotion) {
    return (
      <div className={cn("rounded-2xl bg-white p-6 shadow-soft", className)}>
        <div className="mb-4">{front}</div>
        <div className="border-t border-border pt-4">{back}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative h-80 cursor-pointer rounded-2xl perspective-1000 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? ariaLabelBack : ariaLabelFront}
      aria-pressed={isFlipped}
    >
      <motion.div
        className="relative h-full w-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 backface-hidden rounded-2xl bg-white p-6 shadow-soft"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-medical-50 to-white p-6 shadow-soft"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
