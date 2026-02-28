import HeroSection from '@/components/HeroSection';
import LeadMagnetPopup from '@/components/LeadMagnetPopup';
import ProblemSection from '@/components/ProblemSection';
import TransformationGallery from '@/components/TransformationGallery';
import SolutionSection from '@/components/SolutionSection';
import TestimonialSection from '@/components/TestimonialSection';
import CoachingSection from '@/components/CoachingSection';
import NutritionSection from '@/components/NutritionSection';
import AppSection from '@/components/AppSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import FreeResourcesSection from '@/components/FreeResourcesSection';
import PricingPhaseCard from '@/components/PricingPhaseCard';

/**
 * Definido en Verano Landing Page
 * Design Philosophy: Dark Gym Aesthetic + Vibe Marketing
 * - Minimalist Industrial with Gold Accents
 * - Emotional resonance through recognition
 * - High-conversion copywriting
 * - Smooth animations and interactions
 */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <TransformationGallery />
        <SolutionSection />
        <TestimonialSection />
        <CoachingSection />
        <NutritionSection />
        <AppSection />
        <FreeResourcesSection />
        
        {/* Pricing Phases Section 1 */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container max-w-4xl mx-auto px-4">
            <PricingPhaseCard
              phaseName="Fase de Lanzamiento"
              currentPrice={197}
              nextPrice={247}
              daysUntilIncrease={15}
              completionPercentage={0}
            />
          </div>
        </section>
        
        <CTASection />
        
        {/* Pricing Phases Section 2 */}
        <section className="py-16 md:py-24 bg-card border-t border-border">
          <div className="container max-w-4xl mx-auto px-4">
            <PricingPhaseCard
              phaseName="Fase de Expansión"
              currentPrice={247}
              nextPrice={297}
              daysUntilIncrease={30}
              completionPercentage={35}
            />
          </div>
        </section>
        
        <FAQSection />
        
        {/* Pricing Phases Section 3 */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container max-w-4xl mx-auto px-4">
            <PricingPhaseCard
              phaseName="Fase de Consolidación"
              currentPrice={297}
              nextPrice={397}
              daysUntilIncrease={60}
              completionPercentage={70}
            />
          </div>
        </section>
      </main>
      <Footer />
      <LeadMagnetPopup />
    </div>
  );
}
