import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Hero Section - Dark Gym Aesthetic
 * Design Philosophy: Minimalist Industrial with Gold Accents
 * - Black background with subtle texture
 * - Large, aggressive typography (Space Mono)
 * - Gold metallic accents and glow effects
 * - Immediate emotional impact: Power, Exclusivity, Transformation
 */

export default function HeroSection() {
  const [, navigate] = useLocation();

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
          Recupera tu Mejor Versión
          <br />
          <span className="text-gradient-gold">en 12 Semanas</span>
          <br />
          Sin Vivir en el Gimnasio
        </motion.h1>

        {/* Divider Line */}
        <motion.div className="gradient-line w-24 mx-auto my-8" variants={itemVariants}></motion.div>

        {/* Subheadline */}
        <motion.p
          className="font-body text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Para hombres ocupados que quieren volver a mirarse al espejo con confianza. Sin dietas extremas, sin sacrificar tu vida profesional.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mb-12">
          <Button
            size="lg"
            onClick={() => navigate('/assessment')}
            className="btn-glow bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-sm"
          >
            ACCESO INMEDIATO
          </Button>
          <p className="text-sm text-gray-400 mt-4">Garantía de 30 días. Sin preguntas.</p>
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
