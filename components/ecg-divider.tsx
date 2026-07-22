"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ECGDividerProps {
  className?: string;
  color?: string;
}

export function ECGDivider({
  className = "",
  color = "#16B0B7",
}: ECGDividerProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  const pathD =
    "M0,40 L40,40 L50,40 L60,10 L70,70 L80,40 L90,40 L120,40 L130,40 L140,20 L150,60 L160,40 L170,40 L200,40 L210,40 L220,15 L230,65 L240,40 L250,40 L300,40";

  if (reducedMotion) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 300 80"
        preserveAspectRatio="none"
        className={`w-full h-20 ${className}`}
        aria-hidden="true"
      >
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
        />
      </svg>
    );
  }

  return (
    <svg
      ref={ref}
      viewBox="0 0 300 80"
      preserveAspectRatio="none"
      className={`w-full h-20 ${className}`}
      aria-hidden="true"
    >
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );
}
