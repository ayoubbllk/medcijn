import Link from "next/link";
import { ThumbsUp, MessageCircle } from "lucide-react";

interface Question {
  id: string;
  author: string | null;
  content: string;
  answer: string;
  votes: number;
}

interface QACardProps {
  question: Question;
}

export function QACard({ question }: QACardProps) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span>{question.author || "Anonyme"}</span>
      </div>
      <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
        {question.content}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {question.answer}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-medical-600">
          <ThumbsUp className="h-4 w-4" aria-hidden="true" />
          <span className="font-medium">{question.votes} utile(s)</span>
        </div>
        <Link
          href="/qa"
          className="text-sm font-semibold text-medical-700 hover:text-medical-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Voir la réponse
        </Link>
      </div>
    </article>
  );
}
