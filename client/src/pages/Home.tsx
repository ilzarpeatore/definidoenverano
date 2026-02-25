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
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
      <LeadMagnetPopup />
    </div>
  );
}
