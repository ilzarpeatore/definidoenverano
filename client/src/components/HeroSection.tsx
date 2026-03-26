import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';

/**
 * Hero Section - Método RESET by BeStronger
 * Design Philosophy: Professional Health + Neurofunctional Recovery
 * - Modern professional aesthetic with dark background
 * - Clear, empathetic messaging
 * - Gold accents for premium positioning
 * - Immediate emotional impact: Relief, Hope, Recovery
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
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663378157518/JQRutXWXNFhZNqCU.jpg"
          alt="Hombre musculado definido fitness transformación"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
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
          ¿Dolor de espalda tras horas frente al ordenador?
          <br />
          <span className="text-gradient-gold">Reinicia tu cuerpo.</span>
          <br />
          Recupera tu vida.
        </motion.h1>

        {/* Divider Line */}
        <motion.div className="gradient-line w-24 mx-auto my-8" variants={itemVariants}></motion.div>

        {/* Subheadline */}
        <motion.p
          className="font-body text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          El Método RESET: la única forma de eliminar el dolor lumbar y cervical sin pastillas, sin fisios, sin ejercicios complicados.
          <br />
          <span className="text-amber-300 font-semibold">Reduce tu dolor en un 70% en solo 6 semanas.</span>
        </motion.p>

        {/* Price Display */}
        {pricing && (
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-sm text-amber-400 font-semibold">PRECIO ACTUAL</p>
            <p className="text-4xl font-bold text-amber-300">€{pricing.currentPrice}</p>
            {!pricing.isLastPhase && (
              <p className="text-xs text-amber-200 mt-2">Sube a €{pricing.nextPrice} en {pricing.daysUntilNextPhase} día{pricing.daysUntilNextPhase !== 1 ? 's' : ''}</p>
            )}
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mb-12">
          <Button
            size="lg"
            onClick={() => navigate('/free-week')}
            className="btn-glow bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-8 py-6 rounded-sm"
          >
            ACCEDER A VALORACIÓN GRATUITA
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
