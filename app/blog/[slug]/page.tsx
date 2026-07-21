import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    return { title: "Article introuvable — CardioConseils" };
  }

  return {
    title: `${article.title} — CardioConseils`,
    description: article.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const categoryLabels: Record<string, string> = {
    alimentation: "Alimentation",
    "activité physique": "Activité physique",
    pathologies: "Pathologies",
    stress: "Stress",
    sommeil: "Sommeil",
    tabac: "Tabac",
  };

  const shareText = encodeURIComponent(`${article.title} — CardioConseils`);
  const shareUrl = encodeURIComponent(`https://cardioconseils.fr/blog/${article.slug}`);

  const contentParagraphs = article.content.split("\n\n").filter(Boolean);

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <article className="mx-auto w-full max-w-3xl">
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "mb-6 -ml-2 text-muted-foreground hover:text-medical-700"
              )}
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Retour au blog
            </Link>

            <Badge className="bg-medical-100 text-medical-600 hover:bg-medical-100">
              {categoryLabels[article.category] || article.category}
            </Badge>

            <h1 className="mt-4 text-3xl font-bold font-heading text-foreground md:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {article.readTime} min de lecture
              </span>
            </div>

            {article.image && (
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-medical-100">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            )}

            <div className="mt-10 max-w-none">
              {(() => {
                let headingIndex = 0;
                return contentParagraphs.map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    const currentHeadingIndex = headingIndex++;
                    return (
                      <h2
                        key={index}
                        id={`section-${currentHeadingIndex}`}
                        className="mt-10 text-2xl font-bold font-heading text-foreground scroll-mt-28"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    const items = paragraph.split("\n").map((item) => item.replace("- ", ""));
                    return (
                      <ul key={index} className="my-4 list-disc space-y-2 pl-6 text-foreground">
                        {items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith("> ")) {
                    return (
                      <div
                        key={index}
                        className="my-6 rounded-xl border-l-4 border-accent bg-accent-50 p-4 text-accent-700"
                      >
                        <p className="m-0 text-sm font-medium">{paragraph.replace("> ", "")}</p>
                      </div>
                    );
                  }
                  if (/^\d+\.\s/.test(paragraph)) {
                    const items = paragraph.split("\n").map((item) => item.replace(/^\d+\.\s/, ""));
                    return (
                      <ol key={index} className="my-4 list-decimal space-y-2 pl-6 text-foreground">
                        {items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p key={index} className="leading-relaxed text-foreground">
                      {paragraph}
                    </p>
                  );
                });
              })()}
            </div>

            <div className="mt-12 rounded-2xl border border-border bg-medical-50 p-6">
              <p className="text-sm font-medium text-medical-700">
                Disclaimer médical
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ce contenu est fourni à titre informatif et ne remplace en aucun cas une consultation,
                un diagnostic ou un traitement médical. En cas de symptômes, consultez votre médecin.
              </p>
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl bg-white p-6 shadow-soft">
              <p className="font-heading font-semibold text-foreground">Dans cet article</p>
              <nav className="mt-4 space-y-2">
                {contentParagraphs
                  .filter((p) => p.startsWith("## "))
                  .map((heading, index) => (
                    <a
                      key={index}
                      href={`#section-${index}`}
                      className="block text-sm text-muted-foreground hover:text-medical-700"
                    >
                      {heading.replace("## ", "")}
                    </a>
                  ))}
              </nav>
            </div>

            <div className="mt-6 rounded-2xl bg-white p-6 shadow-soft">
              <p className="font-heading font-semibold text-foreground">Partager</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-medical-700 px-4 py-2 text-sm font-medium text-white hover:bg-medical-800 transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-medical-100 px-4 py-2 text-sm font-medium text-medical-700 hover:bg-medical-200 transition-colors"
                >
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                  Facebook
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
