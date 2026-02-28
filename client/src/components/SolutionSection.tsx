import { motion } from 'framer-motion';
import { Check, Clock, Users, Zap, BookOpen, Award } from 'lucide-react';

/**
 * Solution Section - Present the Program
 * Design Philosophy: Clarity + Confidence + Exclusivity
 * - Gold accents on key benefits
 * - Structured layout with visual hierarchy
 * - Specific numbers and tangible benefits
 * - Eliminates friction points
 */

export default function SolutionSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const features = [
    {
      icon: Clock,
      title: 'Entrenamientos de 45 minutos',
      description: 'Máximo. 4 días a la semana. Ciencia pura.',
    },
    {
      icon: Zap,
      title: 'Ciencia + Psicología',
      description: 'Basado en investigación. Diseñado para resultados.',
    },
    {
      icon: BookOpen,
      title: 'Nutrición simplificada',
      description: 'No dietas. Reglas claras que funcionan.',
    },
    {
      icon: Users,
      title: 'Comunidad comprometida',
      description: 'Hombres como tú. Mismo objetivo. Mismo camino.',
    },
    {
      icon: Award,
      title: 'Acceso de 3 meses',
      description: 'Programa completo. Renovable cuando quieras.',
    },
    {
      icon: Check,
      title: 'Garantía de resultados',
      description: '30 días de garantía. Dinero de vuelta si no funciona.',
    },
  ];

  const results = [
    { metric: '8-12 kg', label: 'Pérdida de grasa' },
    { metric: '4-6 kg', label: 'Ganancia de músculo' },
    { metric: '6 semanas', label: 'Primeros resultados visibles' },
  ];

  return (
    <section className="relative py-8 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            DEFINIDO EN VERANO
          </h2>
          <p className="text-accent text-xl font-heading">
            El Sistema de 3 Meses para Hombres Que No Tienen Tiempo
          </p>
          <div className="gradient-line w-24 mx-auto mt-6"></div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="card-glass p-6 hover:border-accent/50 transition-all duration-300 group"
                variants={itemVariants}
              >
                <Icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-lg text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Results Highlight */}
        <motion.div
          className="bg-card border border-border rounded-sm p-8 md:p-12 mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-3xl text-white mb-8 text-center">
            Resultado Comprobado
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="counter text-5xl md:text-6xl mb-2">{result.metric}</div>
                <p className="text-gray-300 font-body">{result.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="divider-gold"></div>
      </div>
    </section>
  );
}
