import { motion } from 'framer-motion';
import { Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

/**
 * PricingOfferBlock Component
 * Featured pricing offer section with benefits and CTA
 */
export default function PricingOfferBlock() {
  const [, setLocation] = useLocation();

  const benefits = [
    'Programa completo de 12 semanas',
    'Entrenamientos científicamente diseñados',
    'Plan de nutrición personalizado',
    'Acceso a comunidad privada',
    'Soporte directo del coach',
    'Acceso de 3 meses',
  ];

  const handleCTA = () => {
    setLocation('/assessment');
  };

  return (
    <section className="py-6 md:py-24 bg-gradient-to-br from-orange-950 via-orange-900 to-orange-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">
            ACCESO INMEDIATO
          </h2>
          <p className="text-accent text-lg md:text-xl font-semibold">
            Al Programa Definido en Verano
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          className="bg-gradient-to-br from-orange-800 to-orange-900 rounded-3xl border-2 border-accent/60 p-8 md:p-12 mb-8 md:mb-12 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Decorative accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Price Section */}
            <div className="text-center mb-8 md:mb-10">
              <p className="text-gray-300 text-sm md:text-base mb-2">Precio normal:</p>
              <p className="text-gray-400 text-2xl md:text-3xl line-through mb-4">$497 USD</p>

              <motion.div
                className="inline-block bg-accent/20 border border-accent rounded-full px-4 md:px-6 py-2 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="text-accent font-bold text-lg md:text-xl">60% DE DESCUENTO</p>
              </motion.div>

              <div className="flex items-baseline justify-center gap-2 md:gap-3">
                <span className="font-display text-5xl md:text-6xl font-bold text-accent">
                  $197
                </span>
                <span className="text-gray-300 text-lg md:text-xl">USD</span>
              </div>

              <p className="text-gray-300 text-sm md:text-base mt-3">
                Precio especial de lanzamiento
              </p>
            </div>

            {/* Benefits List */}
            <div className="mb-8 md:mb-10 space-y-3 md:space-y-4">
              <p className="text-white font-semibold text-lg mb-4 md:mb-6">Lo que obtienes:</p>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 md:gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Check className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100 text-sm md:text-base">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              className="mb-6 md:mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                onClick={handleCTA}
                className="w-full bg-accent hover:bg-accent/90 text-orange-950 font-bold text-base md:text-lg py-3 md:py-4 h-auto rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                ACCESO INMEDIATO AL PROGRAMA
              </Button>
            </motion.div>

            {/* Guarantee Section */}
            <motion.div
              className="flex items-start gap-3 md:gap-4 bg-orange-800/50 rounded-xl p-4 md:p-5 border border-accent/30"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-gray-100 text-sm md:text-base">
                <span className="font-bold text-accent">Garantía de 30 días.</span> Si no ves resultados, devolvemos tu dinero. Sin preguntas.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
