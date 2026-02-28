import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Shield } from 'lucide-react';
import { useLocation } from 'wouter';

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
    'Programa completo de 12 semanas',
    'Entrenamientos científicamente diseñados',
    'Plan de nutrición personalizado',
    'Acceso a comunidad privada',
    'Soporte directo del coach',
    'Acceso durante 3 meses',
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
            ACCESO INMEDIATO
          </h2>
          <p className="text-gray-300 text-lg">
            Al Programa Definido en Verano
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          className="card-glass p-8 md:p-12 mb-12 border-2 border-accent/50"
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
              <p className="text-gray-400 text-sm line-through">Precio normal: $497 USD</p>
            </motion.div>

            {/* Discount Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block bg-accent/20 border border-accent text-accent px-4 py-2 rounded-sm font-bold text-sm">
                60% DE DESCUENTO
              </span>
            </motion.div>

            {/* Final Price */}
            <motion.div variants={itemVariants}>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-accent font-display text-6xl font-bold">$197</span>
                <span className="text-gray-400 text-lg">USD</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">Precio especial de lanzamiento</p>
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
            <p className="text-accent font-heading text-lg mb-4">Lo que obtienes:</p>
            <div className="space-y-3">
              {includes.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-200">{item}</span>
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
            onClick={() => navigate('/assessment')}
            className="btn-glow w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-sm"
          >
            ACCESO INMEDIATO AL PROGRAMA
          </Button>
          </motion.div>

          {/* Guarantee */}
          <motion.div
            className="flex items-center justify-center gap-2 text-accent"
            variants={itemVariants}
          >
            <Shield className="w-5 h-5" />
            <p className="font-body text-sm">
              Garantía de 30 días. Si no ves resultados, devolvemos tu dinero. Sin preguntas.
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
          <p className="text-gray-400 text-sm">
            ¿Preguntas? Mira las respuestas más frecuentes abajo o contacta directamente.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
