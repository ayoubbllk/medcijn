"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface PulseBlobProps {
  className?: string;
  children: React.ReactNode;
}

export function PulseBlob({ className, children }: PulseBlobProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        {reducedMotion ? (
          <div className="absolute h-[110%] w-[110%] rounded-full bg-gradient-to-br from-medical-200/40 to-medical-400/30 blur-3xl" />
        ) : (
          <motion.div
            className="absolute h-[110%] w-[110%] rounded-full bg-gradient-to-br from-medical-200/40 to-medical-400/30 blur-3xl"
            animate={{
              scale: [1, 1.03, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        )}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
