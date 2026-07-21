"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface BlogCardProps {
  article: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    image: string | null;
    readTime: number;
    publishedAt: Date;
  };
}

const categoryLabels: Record<string, string> = {
  alimentation: "Alimentation",
  "activité physique": "Activité physique",
  pathologies: "Pathologies",
  stress: "Stress",
  sommeil: "Sommeil",
  tabac: "Tabac",
};

const categoryColors: Record<string, string> = {
  alimentation: "bg-mint-100 text-mint-600",
  "activité physique": "bg-medical-100 text-medical-600",
  pathologies: "bg-accent-100 text-accent-600",
  stress: "bg-medical-100 text-medical-600",
  sommeil: "bg-medical-100 text-medical-600",
  tabac: "bg-medical-100 text-medical-600",
};

export function BlogCard({ article }: BlogCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="group rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg overflow-hidden"
    >
      <Link href={`/blog/${article.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-medical-100">
          {article.image ? (
            <Image
              src={article.image}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-medical-300">
              <span className="text-4xl">📄</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <Badge className={categoryColors[article.category] || "bg-medical-100 text-medical-600"}>
            {categoryLabels[article.category] || article.category}
          </Badge>
          <h3 className="mt-3 font-heading text-xl font-semibold text-foreground leading-tight group-hover:text-medical-700 transition-colors">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formattedDate}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {article.readTime} min
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
