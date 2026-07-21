import { Metadata } from "next";
import { BlogFilter } from "@/components/blog-filter";
import { ScrollReveal } from "@/components/scroll-reveal";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — CardioConseils",
  description: "Découvrez nos articles sur la prévention cardiovasculaire, l'alimentation, l'activité physique et les pathologies du cœur.",
};

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal className="mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-medical-500">
            Blog
          </span>
          <h1 className="mt-3 text-3xl font-bold font-heading text-foreground md:text-4xl">
            Tous nos articles
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Explorez nos conseils par catégorie ou recherchez un sujet qui vous intéresse.
          </p>
        </ScrollReveal>

        <BlogFilter articles={articles} />
      </div>
    </div>
  );
}
