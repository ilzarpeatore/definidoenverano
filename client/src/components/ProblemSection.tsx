import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

/**
 * Problem Section - Método RESET
 * Design Philosophy: Empathy + Recognition of Frustration
 * - Dark background with subtle gold accents
 * - Empathetic, understanding copy
 * - Visual hierarchy emphasizing pain relief
 * - Before/After transformation imagery (pain to relief)
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
    'Dolor constante que te limita en el trabajo',
    'Dificultad para dormir bien',
    'Miedo a moverte o hacer ejercicio',
    'Dependencia de pastillas o visitas al fisio',
    'Frustración porque ya lo has probado todo',
    'Sensación de que tu cuerpo está roto',
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
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/reset-problem-before-after-HvvsQ8iQ27CGkdh8e8EfGD.webp"
              alt="Transformación en 6 semanas: Antes (Dolor 8/10) - Después (Dolor 2/10)"
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
                Has probado TODO. Y nada ha funcionado.
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Fisioterapia. Pastillas. Masajes. Yoga. Pilates. Estiramientos de YouTube. Incluso has invertido dinero en sesiones presenciales, en aparatos, en cremas.
                <br /><br />
                Pero aquí estás. Con el mismo dolor. Quizás peor.
                <br /><br />
                <span className="text-amber-300 font-semibold">La verdad que nadie te ha dicho: Tu dolor no está en tus músculos. Está en el sistema que los controla.</span>
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
                Pero aquí está la buena noticia:
              </p>
              <p className="text-gray-300 mt-3 text-lg leading-relaxed">
                No necesitas más fisioterapia. Necesitas un sistema estructurado de reprogramación neuromuscular diseñado específicamente para personas como tú que están cansadas de vivir limitadas por el dolor.
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
