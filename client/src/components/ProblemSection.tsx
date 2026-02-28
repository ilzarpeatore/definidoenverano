import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

/**
 * Problem Section - Amplify Pain & Agitation
 * Design Philosophy: Emotional resonance through recognition
 * - Dark background with subtle gold accents
 * - Direct, confrontational copy
 * - Visual hierarchy that emphasizes pain points
 * - Before/After transformation imagery
 */

export default function ProblemSection() {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const painPoints = [
    'Trabajas 10+ horas al día y no tienes tiempo para entrenar "bien"',
    'Has intentado 3, 4, 5 veces... y siempre abandonas',
    'Pagas gimnasio que no usas. Compras planes que no funcionan.',
    'La barriga crece mientras tu confianza desaparece',
    'Te comparas con tu versión de hace 5 años y te duele',
  ];

  return (
    <section className="relative py-8 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Before/After Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663378157518/yorwLapMmHuuuaWM.webp"
              alt="Transformación antes y después"
              className="w-full rounded-sm"
            />
            {/* Gold Border Accent */}
            <div className="absolute inset-0 border-2 border-accent/30 rounded-sm pointer-events-none"></div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                El Problema Real
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                No es falta de capacidad. Tú ya entrenaste antes. Tú sabes lo que funciona. El problema es que tienes una vida ocupada, intentos fallidos, y ningún sistema que se adapte a tu realidad.
              </p>
            </motion.div>

            {/* Pain Points */}
            <motion.div className="space-y-4">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-card rounded-sm border border-border hover:border-accent/50 transition-colors"
                  variants={itemVariants}
                >
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-gray-200 font-body">{point}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Urgency Statement */}
            <motion.div
              className="pt-4 border-t border-border"
              variants={itemVariants}
            >
              <p className="text-xl text-accent font-display font-bold">
                Pero aquí está lo importante:
              </p>
              <p className="text-gray-300 mt-3 text-lg leading-relaxed">
                No necesitas más motivación. Necesitas un sistema estructurado diseñado específicamente para hombres como tú.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-gold mt-20"></div>
    </section>
  );
}
