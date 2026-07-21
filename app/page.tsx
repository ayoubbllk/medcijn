import { HeroSection } from "@/components/sections/hero-section";
import { ExplorationsSection } from "@/components/sections/explorations-section";
import { TipsSection } from "@/components/sections/tips-section";
import { AlertSection } from "@/components/sections/alert-section";
import { InteractionSection } from "@/components/sections/interaction-section";
import { NewsSection } from "@/components/sections/news-section";
import { ECGDivider } from "@/components/ecg-divider";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ECGDivider className="text-medical-300" />
      <ExplorationsSection />
      <ECGDivider className="text-medical-300" />
      <TipsSection />
      <AlertSection />
      <ECGDivider className="text-accent-300" />
      <InteractionSection />
      <ECGDivider className="text-medical-300" />
      <NewsSection />
    </>
  );
}
