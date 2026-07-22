"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function QuestionForm() {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    // Site statique : confirmation locale (pas d'API / base de données)
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSuccess(true);
    setAuthor("");
    setContent("");
    setIsSubmitting(false);
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft md:p-8">
      <h2 className="font-heading text-2xl font-semibold text-foreground">
        Poser une question
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Votre question sera publiée anonymement si vous ne renseignez pas votre prénom.
      </p>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl bg-mint-50 p-4 text-mint-800"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" aria-hidden="true" />
              <p className="font-medium">Merci pour votre question !</p>
            </div>
            <p className="mt-1 text-sm">
              Elle sera publiée après modération et une réponse vous y sera apportée.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="author" className="text-sm font-medium text-foreground">
            Prénom (optionnel)
          </Label>
          <Input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Marie, Paul..."
            className="rounded-xl border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="question" className="text-sm font-medium text-foreground">
            Votre question
          </Label>
          <Textarea
            id="question"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Quelle est votre question sur la santé cardiaque ?"
            rows={5}
            required
            className="rounded-xl border-border"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="rounded-full bg-medical-700 hover:bg-medical-800 disabled:opacity-50"
        >
          <Send className="mr-2 h-4 w-4" aria-hidden="true" />
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma question"}
        </Button>
      </form>
    </div>
  );
}
