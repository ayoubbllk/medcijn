import Image from "next/image";
import Link from "next/link";
import { HeartPulse, MessageCircle, Stethoscope, CalendarCheck } from "lucide-react";
import { StatCounter } from "@/components/stat-counter";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";
import { stats } from "@/lib/data";

function ChatBubble({
  icon,
  className,
  delay = "0s",
}: {
  icon: React.ReactNode;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`absolute z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft-lg animate-float ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-medical-50 text-medical-600">
        {icon}
      </span>
      <span className="flex flex-col gap-1.5">
        <span className="h-2 w-20 rounded-full bg-medical-100" />
        <span className="h-2 w-12 rounded-full bg-medical-50" />
      </span>
    </div>
  );
}

export async function HeroSection() {
  return (
    <section className="px-3 pt-2 md:px-4">
      <div className="gradient-hero relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] shadow-teal">
        {/* Décor */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-28 right-1/3 h-72 w-72 rounded-full bg-medical-900/25 blur-3xl" aria-hidden="true" />
        <HeartPulse
          className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 text-white/10"
          strokeWidth={1}
          aria-hidden="true"
        />

        <div className="relative grid items-end gap-8 px-6 pt-12 md:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4 lg:pt-16">
          <div className="max-w-xl pb-12 lg:pb-20">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                <Stethoscope className="h-4 w-4" aria-hidden="true" />
                Cabinet de cardiologie
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="mt-6 text-4xl font-bold leading-tight font-heading text-white md:text-5xl lg:text-[3.4rem]">
                Un cœur informé, un cœur protégé.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-white/90">
                Le premier espace de sensibilisation cardiologique pensé pour les
                patients algériens : astuces de prévention, explications claires
                des examens et réponses à vos questions, en quelques clics.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center rounded-full border-2 border-white px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-medical-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Découvrir les astuces santé
                </Link>
                <Link
                  href="/explorations"
                  className="inline-flex items-center rounded-full bg-white/15 px-7 py-3.5 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Les explorations
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2} className="relative hidden justify-end self-end lg:flex">
            <ChatBubble
              icon={<MessageCircle className="h-4 w-4" aria-hidden="true" />}
              className="left-0 top-10"
              delay="0s"
            />
            <ChatBubble
              icon={<HeartPulse className="h-4 w-4" aria-hidden="true" />}
              className="-left-16 top-40"
              delay="1.2s"
            />
            <ChatBubble
              icon={<CalendarCheck className="h-4 w-4" aria-hidden="true" />}
              className="left-4 top-72"
              delay="2.4s"
            />

            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[10rem]">
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80"
                alt="Cardiologue en blouse blanche souriant"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0px, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-700/30 to-transparent" aria-hidden="true" />
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.id}>
              <StatCounter value={stat.value} suffix={stat.suffix || ""} label={stat.label} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
