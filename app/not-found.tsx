import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-medical-50">
        <Heart className="h-10 w-10 text-medical-500" aria-hidden="true" />
      </div>
      <h1 className="mt-6 text-4xl font-bold font-heading text-foreground">Page introuvable</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "default" }),
          "mt-8 rounded-full bg-medical-700 px-6 text-white hover:bg-medical-800"
        )}
      >
        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
        Retour à l'accueil
      </Link>
    </div>
  );
}
