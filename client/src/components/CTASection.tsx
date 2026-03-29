import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Shield } from 'lucide-react';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { getCurrentPhaseInfo } from '@/lib/pricingPhases';

/**
 * CTA Section - Final Conversion
 * Design Philosophy: Urgency + Risk Elimination + Clear Action
 * - Limited-time pricing
 * - Money-back guarantee
 * - Clear value proposition
 * - Minimal friction
 */

export default function CTASection() {
  const [, navigate] = useLocation();
  const [currentPrice, setCurrentPrice] = useState<number>(197);
  const [normalPrice, setNormalPrice] = useState<number>(247);
  const [discountedPrice, setDiscountedPrice] = useState<number>(197);

  useEffect(() => {
    const phaseInfo = getCurrentPhaseInfo();
    const price = phaseInfo.phase.price;
    setCurrentPrice(price);
    setNormalPrice(price);
    // Discount is always 50€
    setDiscountedPrice(Math.max(0, price - 50));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const includes = [
    'Valoración postural en vídeo',
    '6 fases progresivas del Método RESET',
    'Seguimiento semanal en vivo',
    'Acceso a comunidad privada',
    'Plantillas y guías paso a paso',
    'Garantía de dinero devuelto',
  ];

  return (
    <section className="relative py-8 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            COMIENZA TU RESET HOY
          </h2>
          <p className="text-white text-lg">
            Lanzamiento Especial: -50€ para los Primeros 20
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          className="bg-gradient-to-br from-green-900 to-emerald-800 p-8 md:p-12 mb-12 border-2 border-green-500/50 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Original Price */}
            <motion.div variants={itemVariants} className="mb-4">
              <p className="text-white text-sm line-through">Precio normal: €{normalPrice}</p>
            </motion.div>

            {/* Discount Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block bg-green-600 border border-green-400 text-white px-4 py-2 rounded-sm font-bold text-sm">
                EARLY ACCESS: -50€
              </span>
            </motion.div>

            {/* Final Price */}
            <motion.div variants={itemVariants}>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-white font-display text-6xl font-bold">€{discountedPrice}</span>
              </div>
              <p className="text-white text-sm mt-2">O 3 cuotas de €{Math.round(discountedPrice / 3)}</p>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-border my-8"></div>

          {/* What's Included */}
          <motion.div
            className="mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-white font-heading text-lg mb-4">Lo que obtienes:</p>
            <div className="space-y-3">
              {includes.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <Check className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-white">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
          >
          <Button
            size="lg"
            onClick={() => navigate('/free-week')}
            className="btn-glow w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg py-6 rounded-sm"
          >
            COMIENZA TU RESET AHORA
          </Button>
          </motion.div>

          {/* Guarantee */}
          <motion.div
            className="flex items-center justify-center gap-2 text-white"
            variants={itemVariants}
          >
            <Shield className="w-5 h-5" />
            <p className="font-body text-sm text-white">
              Garantía de dinero devuelto. Si no reduces tu dolor en un 50% en 3 semanas, te devolvemos el 100%.
            </p>
          </motion.div>
        </motion.div>

        {/* FAQ Preview */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-white text-sm">
            ¿Preguntas? Mira las respuestas más frecuentes abajo o contacta directamente.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
