import Image from "next/image";
import { Calendar, Award, Stethoscope } from "lucide-react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";

const newsItems = [
  {
    id: "1",
    title: "Nouvel échocardiographe Doppler couleur",
    description:
      "Notre cabinet s'équipe d'un appareil d'échocardiographie de dernière génération pour des images encore plus précises et un diagnostic affiné.",
    icon: <Stethoscope className="h-5 w-5" aria-hidden="true" />,
    date: "Janvier 2026",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Participation au Congrès Européen de Cardiologie",
    description:
      "Le Dr. Martin a présenté les avancées en prévention cardiovasculaire lors du dernier congrès de cardiologie à Amsterdam.",
    icon: <Award className="h-5 w-5" aria-hidden="true" />,
    date: "Septembre 2025",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Lancement du programme de rééducation cardiaque",
    description:
      "Un programme d'accompagnement progressif pour reprendre une activité physique en toute sécurité après un événement cardiaque.",
    icon: <Calendar className="h-5 w-5" aria-hidden="true" />,
    date: "Mars 2025",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
  },
];

export function NewsSection() {
  return (
    <section className="bg-gradient-to-b from-medical-50/30 to-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-medical-500">
            Actualités du cabinet
          </span>
          <h2 className="mt-3 text-3xl font-bold font-heading text-foreground md:text-4xl">
            Ce qui nous anime
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Nouveautés, équipements et événements autour de la prise en charge cardiaque.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((news) => (
            <StaggerItem key={news.id}>
              <Card className="overflow-hidden p-0">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={news.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-medical-500">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-medical-50">
                      {news.icon}
                    </span>
                    <span>{news.date}</span>
                  </div>
                  <CardTitle className="mt-3">{news.title}</CardTitle>
                  <CardDescription className="mt-2">{news.description}</CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
