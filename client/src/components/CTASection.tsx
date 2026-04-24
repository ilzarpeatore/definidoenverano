import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Shield } from 'lucide-react';
import { useLocation } from 'wouter';
import { BorderBeam } from 'border-beam';
import { usePricing } from '@/contexts/PricingContext';

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
  const pricing = usePricing();
  
  // Calcular precio con descuento (siempre -50€)
  const discountedPrice = Math.max(0, pricing.currentPrice - 50);
  // Si hay próxima fase, mostrar ese precio. Si no, mostrar el precio actual (fase 3)
  const nextPrice = pricing.nextPrice || pricing.currentPrice;

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
    <section id="cta" className="relative py-8 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Acceso Inmediato al Programa
          </h2>
          <p className="text-green-400 text-lg font-semibold">
            ⚠️ URGENCIA: Solo 20 Lugares Disponibles en Fase Expansión
          </p>
          <p className="text-gray-300 text-sm mt-2">
            Los lugares se están agotando. Actúa ahora para asegurar tu precio actual.
          </p>
        </motion.div>

        {/* Pricing Card with BorderBeam */}
        <BorderBeam colorVariant="sunset" size="md" theme="dark">
          <motion.div
            className="p-8 md:p-12 mb-12 relative overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-emerald-800 rounded-lg"></div>
            <div className="relative z-10">
              <motion.div
                className="text-center mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Original Price */}
                <motion.div variants={itemVariants} className="mb-4">
                  <p className="text-white text-sm line-through">Precio normal: €{pricing.currentPrice + 50}</p>
                </motion.div>

                {/* Discount Badge */}
                <motion.div variants={itemVariants} className="mb-6">
                  <span className="inline-block bg-red-600 border border-red-400 text-white px-4 py-2 rounded-sm font-bold text-sm animate-pulse">
                    🔥 OFERTA LIMITADA: -50€ (Fase Expansión)
                  </span>
                </motion.div>

                {/* Final Price */}
                <motion.div variants={itemVariants}>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-white font-display text-6xl font-bold">€{discountedPrice}</span>
                    <span className="text-green-400 text-sm font-bold">HOY</span>
                  </div>
                  {pricing.daysUntilNextPhase > 0 ? (
                    <p className="text-green-300 text-sm mt-2 font-semibold">✅ Sube a €{nextPrice} en {pricing.daysUntilNextPhase} días</p>
                  ) : (
                    <p className="text-green-300 text-sm mt-2 font-semibold">✅ Precio final: €{nextPrice}</p>
                  )}
                  <p className="text-white text-xs mt-3">O 3 cuotas de €{Math.round(discountedPrice / 3)} sin interés</p>
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
                  onClick={() => navigate('/checkout')}
                  className="btn-glow w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg py-6 rounded-sm hover:scale-105 transform transition-transform"
                >
                  🚀 ACCESO INMEDIATO AL PROGRAMA
                </Button>
                <p className="text-green-300 text-xs mt-3 font-semibold">Acceso instantáneo • Sin esperas • Comienza hoy</p>
              </motion.div>

              {/* Guarantee */}
              <motion.div
                className="flex items-center justify-center gap-2 text-white bg-green-900/30 p-4 rounded-sm border border-green-500/30"
                variants={itemVariants}
              >
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="font-body text-sm text-white">
                  <span className="text-green-400 font-bold">100% Garantía:</span> Si no reduces tu dolor en 50% en 3 semanas, devolución completa sin preguntas.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </BorderBeam>

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
