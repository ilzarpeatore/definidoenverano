import HeroSection from '@/components/HeroSection';
import BlogHighlightSection from '@/components/BlogHighlightSection';
import LeadMagnetPopup from '@/components/LeadMagnetPopup';
import ProblemSection from '@/components/ProblemSection';
import TransformationGallery from '@/components/TransformationGallery';
import SolutionSection from '@/components/SolutionSection';
import TestimonialSection from '@/components/TestimonialSection';
import CoachingSection from '@/components/CoachingSection';

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
        
        {/* Quick Assessment CTA */}
        <section className="py-8 md:py-16 bg-gradient-to-r from-blue-900/20 to-green-900/20 border-b border-border">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Descubre tu plan personalizado en 2 minutos</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Valoracion rápida + recomendaciones específicas para tu tipo de dolor. Gratis, sin compromiso.
            </p>
            <a href="/quick-assessment" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:scale-105 transform">
              Comenzar Valoración Gratuita
            </a>
            <p className="text-xs text-gray-400 mt-3">✓ Sin email requerido • ✓ Resultados instantáneos • ✓ Garantía de privacidad</p>
          </div>
        </section>
        
        {/* Pricing Phases Section 1 - Fase de Lanzamiento (After Hero) */}
        <section className="py-6 md:py-24 bg-background">
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
        <section className="py-6 md:py-24 bg-card border-t border-border">
          <div className="container max-w-4xl mx-auto px-4">
            <PricingPhaseCard variant="next" />
          </div>
        </section>
        
        {/* Featured Pricing Offer Block (Middle of Page) */}
        <PricingOfferBlock />
        
        <CoachingSection />

        <AppSection />
        <FreeResourcesSection />
        
        {/* Pricing Phases Section 3 - Fase de Consolidación (Before Pricing & Access) */}
        <section className="py-6 md:py-24 bg-background border-t border-border">
          <div className="container max-w-4xl mx-auto px-4">
            <PricingPhaseCard variant="future" />
          </div>
        </section>
        
        <CTASection />
        <BlogHighlightSection />
        <FAQSection />
      </main>
      <Footer />
      <LeadMagnetPopup />
    </div>
  );
}
