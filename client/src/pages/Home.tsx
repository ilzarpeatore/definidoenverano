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
import PricingOfferBlock from '@/components/PricingOfferBlock';

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
        
        {/* Pricing Phases Section 1 - Fase de Lanzamiento (After Hero) */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-center text-accent font-display text-3xl md:text-4xl font-bold mb-8">Fases de Precios</h2>
            <PricingPhaseCard variant="current" />
          </div>
        </section>
        
        <ProblemSection />
        <TransformationGallery />
        <SolutionSection />
        <TestimonialSection />
        
        {/* Pricing Phases Section 2 - Fase de Expansión (After Testimonials) */}
        <section className="py-16 md:py-24 bg-card border-t border-border">
          <div className="container max-w-4xl mx-auto px-4">
            <PricingPhaseCard variant="next" />
          </div>
        </section>
        
        {/* Featured Pricing Offer Block (Middle of Page) */}
        <PricingOfferBlock />
        
        <CoachingSection />
        <NutritionSection />
        <AppSection />
        <FreeResourcesSection />
        
        {/* Pricing Phases Section 3 - Fase de Consolidación (Before Pricing & Access) */}
        <section className="py-16 md:py-24 bg-background border-t border-border">
          <div className="container max-w-4xl mx-auto px-4">
            <PricingPhaseCard variant="future" />
          </div>
        </section>
        
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
      <LeadMagnetPopup />
    </div>
  );
}
