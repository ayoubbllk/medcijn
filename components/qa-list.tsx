"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, Check } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Question {
  id: string;
  author: string | null;
  content: string;
  answer: string;
  votes: number;
}

interface QAListProps {
  questions: Question[];
}

export function QAList({ questions }: QAListProps) {
  const [votes, setVotes] = useState<Record<string, number>>(() =>
    Object.fromEntries(questions.map((q) => [q.id, q.votes]))
  );
  const [voted, setVoted] = useState<Record<string, boolean>>({});
  const reducedMotion = useReducedMotion();

  const handleVote = async (id: string) => {
    if (voted[id]) return;

    setVotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setVoted((prev) => ({ ...prev, [id]: true }));

    try {
      await fetch(`/api/questions/${id}/vote`, { method: "POST" });
    } catch (error) {
      console.error("Erreur lors du vote", error);
    }
  };

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <motion.article
          key={question.id}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.1 }}
          className="rounded-2xl bg-white p-6 shadow-soft"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-medical-600">
              {question.author || "Anonyme"}
            </span>
          </div>
          <h3 className="mt-3 font-heading text-xl font-semibold text-foreground">
            {question.content}
          </h3>
          <div className="mt-4 rounded-xl bg-medical-50 p-5">
            <p className="text-sm font-semibold text-medical-700">Réponse du médecin</p>
            <p className="mt-2 leading-relaxed text-foreground">{question.answer}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleVote(question.id)}
              disabled={voted[question.id]}
              className={[
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                voted[question.id]
                  ? "bg-mint-100 text-mint-700"
                  : "bg-medical-50 text-medical-700 hover:bg-medical-100",
              ].join(" ")}
              aria-pressed={voted[question.id]}
            >
              <motion.span
                animate={voted[question.id] ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {voted[question.id] ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ThumbsUp className="h-4 w-4" aria-hidden="true" />
                )}
              </motion.span>
              <span>
                {voted[question.id] ? "Merci pour votre vote" : "Cette réponse m'a été utile"}
              </span>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold">
                {votes[question.id] || 0}
              </span>
            </button>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
