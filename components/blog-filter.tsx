"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BlogCard } from "@/components/blog-card";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string | null;
  readTime: number;
  publishedAt: Date;
}

interface BlogFilterProps {
  articles: Article[];
}

const categories = [
  { value: "all", label: "Tous" },
  { value: "alimentation", label: "Alimentation" },
  { value: "prévention", label: "Prévention" },
  { value: "pathologies", label: "Pathologies" },
  { value: "activité physique", label: "Activité physique" },
  { value: "stress", label: "Stress" },
  { value: "sommeil", label: "Sommeil" },
  { value: "tabac", label: "Tabac" },
];

export function BlogFilter({ articles }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => setSelectedCategory(category.value)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selectedCategory === category.value
                  ? "bg-medical-700 text-white"
                  : "bg-white text-muted-foreground hover:bg-medical-50 hover:text-medical-700",
              ].join(" ")}
              aria-pressed={selectedCategory === category.value}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div
          className={[
            "relative flex items-center transition-all duration-300",
            isFocused ? "md:w-80" : "md:w-64",
          ].join(" ")}
        >
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            type="search"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="rounded-full border-border pl-9 focus-visible:ring-medical-500"
          />
        </div>
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredArticles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredArticles.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow-soft">
          <p className="text-lg font-medium text-foreground">Aucun article ne correspond à votre recherche.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Essayez un autre mot-clé ou une autre catégorie.
          </p>
        </div>
      )}
    </div>
  );
}
