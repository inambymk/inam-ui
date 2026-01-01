import dynamic from "next/dynamic";
import { ComponentMetadata } from "@/lib/components-data";

const HeroSection = dynamic(() => import("@/components/pages/landing/HeroSection"));

const FeaturesSection = dynamic(() => import("@/components/pages/landing/FeaturesSection"));

const ThemeShowcase = dynamic(() => import("@/components/pages/landing/ThemeShowcase"));

const ComponentPreview = dynamic(() => import("@/components/pages/landing/ComponentPreview"));

const CtaSection = dynamic(() => import("@/components/pages/landing/CtaSection"));

interface LandingPageProps {
  featuredComponents: ComponentMetadata[];
}

export default function LandingPage({ featuredComponents }: LandingPageProps) {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <ThemeShowcase />
      <ComponentPreview featuredComponents={featuredComponents} />
      <CtaSection />
    </div>
  );
}
