import { HeroSection } from "@/components/sections/hero-section";
import { ExplorationsSection } from "@/components/sections/explorations-section";
import { TipsSection } from "@/components/sections/tips-section";
import { AlgeriaSection } from "@/components/sections/algeria-section";
import { StepsSection } from "@/components/sections/steps-section";
import { AlertSection } from "@/components/sections/alert-section";
import { InteractionSection } from "@/components/sections/interaction-section";
import { NewsSection } from "@/components/sections/news-section";
import { ECGDivider } from "@/components/ecg-divider";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExplorationsSection />
      <AlgeriaSection />
      <StepsSection />
      <TipsSection />
      <AlertSection />
      <ECGDivider className="text-medical-300" />
      <InteractionSection />
      <NewsSection />
    </>
  );
}
