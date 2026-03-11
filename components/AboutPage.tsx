import { CareerJourneySection } from "@/components/about/CareerJourneySection";
import { AboutImage, SocialLinks } from "@/components/about/Header";
import { TechStackSection } from "@/components/about/TechStackSection";
import { CareerEvolutionSection } from "@/components/about/TimelineSection";

export function AboutPage() {
  return (
    <main className="home-page">
      <AboutImage />
      <SocialLinks />
      <CareerJourneySection />
      <CareerEvolutionSection />
      <TechStackSection />
    </main>
  );
}
