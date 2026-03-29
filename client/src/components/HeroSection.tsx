import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';

/**
 * Hero Section - Método RESET by BeStronger
 * Design Philosophy: Empathetic Problem Recognition + Solution
 * - Image of man in office with back pain (relatable problem)
 * - Clear, empathetic messaging focused on pain relief
 * - Blue + Green colors for health/recovery
 * - Immediate emotional impact: Recognition, Hope, Solution
 */

export default function HeroSection() {
  const [, navigate] = useLocation();
  const { data: pricing } = trpc.pricing.getCurrent.useQuery();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/reset-hero-office-pain-ELeDLkx6Ydumin2LPvTpGK.webp"
          alt="Hombre en oficina con dolor de espalda tras 8 horas en el escritorio"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container max-w-4xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Headline - SEO Optimized H1 */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-white"
          variants={itemVariants}
        >
          ¿Dolor de espalda tras 8 horas en el escritorio?
          <br />
          <span className="text-accent">No es normal.</span>
          <br />
          Y tiene solución.
        </motion.h1>

        {/* Divider Line */}
        <motion.div className="gradient-line w-24 mx-auto my-8" variants={itemVariants}></motion.div>

        {/* Subheadline */}
        <motion.p
          className="font-body text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Método RESET: La solución neurocientífica que 250+ hombres ya usan para eliminar su dolor lumbar y cervical.
          <br />
          <span className="text-green-400 font-semibold">Reduce tu dolor en un 70% en solo 6 semanas.</span>
        </motion.p>

        {/* Price Display */}
        {pricing && (
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-sm text-green-400 font-semibold">PRECIO ACTUAL</p>
            <p className="text-4xl font-bold text-green-300">€{pricing.currentPrice}</p>
            {!pricing.isLastPhase && (
              <p className="text-xs text-green-200 mt-2">Sube a €{pricing.nextPrice} en {pricing.daysUntilNextPhase} día{pricing.daysUntilNextPhase !== 1 ? 's' : ''}</p>
            )}
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mb-12">
          <Button
            size="lg"
            onClick={() => navigate('/assessment')}
            className="btn-glow bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-8 py-6 rounded-sm"
          >
            EVALÚA TU DOLOR AHORA
          </Button>
          <p className="text-sm text-gray-400 mt-4">Garantía de dinero devuelto. Sin preguntas.</p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity as any }}
        >
          <ChevronDown className="w-6 h-6 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
