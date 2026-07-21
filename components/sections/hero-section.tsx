import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Heart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PulseBlob } from "@/components/pulse-blob";
import { StatCounter } from "@/components/stat-counter";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";
import { prisma } from "@/lib/prisma";

export async function HeroSection() {
  const stats = await prisma.stat.findMany();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-medical-50/50 to-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-medical-700 shadow-soft">
                <Heart className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
                Cabinet de cardiologie
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="mt-6 text-4xl font-bold leading-tight font-heading text-foreground md:text-5xl lg:text-6xl">
                Comprendre et prendre soin de votre cœur
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                Bienvenue sur notre espace de sensibilisation. Nous partageons ici des conseils de
                prévention, des astuces santé et des explications claires sur les explorations
                médicales pour vous accompagner au quotidien.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/blog"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full bg-medical-700 px-6 py-6 text-base font-semibold text-white hover:bg-medical-800"
                  )}
                >
                  Découvrir les astuces santé
                </Link>
                <Link
                  href="/explorations"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full border-medical-200 px-6 py-6 text-base font-medium hover:bg-medical-50"
                  )}
                >
                  Les explorations médicales
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2} className="relative flex justify-center lg:justify-end">
            <PulseBlob className="w-full max-w-md">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[40%_60%_55%_45%/55%_45%_60%_40%] bg-gradient-to-br from-medical-100 to-medical-200">
                <Image
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80"
                  alt="Cardiologue en blouse blanche souriant"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </PulseBlob>
          </ScrollReveal>
        </div>

        <StaggerContainer className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.id}>
              <StatCounter value={stat.value} suffix={stat.suffix || ""} label={stat.label} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 md:block">
        <a
          href="#explorations"
          className="flex flex-col items-center gap-1 text-sm text-muted-foreground hover:text-medical-700 transition-colors"
        >
          <span>Explorer</span>
          <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
