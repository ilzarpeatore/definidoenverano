import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

/**
 * Summer Shred Landing Page
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
        <SolutionSection />
        <TestimonialSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
