"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Tip {
  id: string;
  title: string;
  category: string;
  image: string | null;
  summary: string;
}

interface TipsCarouselProps {
  tips: Tip[];
}

const categoryLabels: Record<string, string> = {
  alimentation: "Alimentation",
  "activité physique": "Activité physique",
  stress: "Stress",
  tabac: "Tabac",
  sommeil: "Sommeil",
};

const categoryColors: Record<string, string> = {
  alimentation: "bg-mint-100 text-mint-600",
  "activité physique": "bg-medical-100 text-medical-600",
  stress: "bg-accent-100 text-accent-600",
  tabac: "bg-medical-100 text-medical-600",
  sommeil: "bg-medical-100 text-medical-600",
};

export function TipsCarousel({ tips }: TipsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div ref={sectionRef} className="relative">
      <div className="absolute right-0 top-0 hidden -translate-y-full gap-2 md:flex">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground hover:bg-medical-50 hover:text-medical-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Astuces précédentes"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground hover:bg-medical-50 hover:text-medical-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Astuces suivantes"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {tips.map((tip, index) => (
          <motion.article
            key={tip.id}
            className="min-w-[280px] max-w-[280px] flex-shrink-0 snap-start rounded-2xl bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: reducedMotion ? 0 : index * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-medical-100">
              {tip.image ? (
                <Image
                  src={tip.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-medical-300">
                  <span className="text-4xl">💡</span>
                </div>
              )}
            </div>
            <Badge
              className={`mt-4 ${categoryColors[tip.category] || "bg-medical-100 text-medical-600"}`}
            >
              {categoryLabels[tip.category] || tip.category}
            </Badge>
            <h3 className="mt-3 font-heading text-lg font-semibold text-foreground leading-tight">
              {tip.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {tip.summary}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
