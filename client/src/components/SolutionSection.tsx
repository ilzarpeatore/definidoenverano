import { motion } from 'framer-motion';
import { Brain, RotateCw, TrendingUp, Users, Shield, Zap } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Solution Section - Método RESET by BeStronger
 * Design Philosophy: Clarity + Confidence + Neurofunctional Recovery
 * - Gold accents on key benefits
 * - Structured layout with visual hierarchy
 * - Specific numbers and tangible benefits
 * - Emphasizes neuromuscular reprogramming
 */

export default function SolutionSection() {
  const [, navigate] = useLocation();
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
      icon: Brain,
      title: 'Reprogramación Neuromuscular',
      description: 'Tu sistema nervioso aprende a desactivar patrones de dolor crónico.',
    },
    {
      icon: RotateCw,
      title: 'Reactivación de Cadenas Dormidas',
      description: 'Músculos que olvidaron trabajar vuelven a la vida.',
    },
    {
      icon: TrendingUp,
      title: 'Progresión Inteligente',
      description: '6 fases diseñadas para fortalecer sin agravar.',
    },
    {
      icon: Users,
      title: 'Acompañamiento Personalizado',
      description: 'Seguimiento semanal, comunidad privada, coaching en vivo.',
    },
    {
      icon: Shield,
      title: 'Prevención de Recaídas',
      description: 'Plan de mantenimiento para evitar que el dolor vuelva.',
    },
    {
      icon: Zap,
      title: 'Solo 10-20 min/día',
      description: 'Sin equipamiento. En casa, en la oficina, donde sea.',
    },
  ];

  const results = [
    { metric: '70%', label: 'Reducción de dolor en 6 semanas' },
    { metric: '10 min', label: 'Entrenamientos diarios' },
    { metric: '100%', label: 'Garantía de dinero devuelto' },
  ];

  return (
    <section id="solution" className="relative py-8 md:py-32 bg-background overflow-hidden">
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
            MÉTODO RESET by BeStronger
          </h2>
          <p className="text-accent text-xl font-heading">
            No es fisioterapia. No es entrenamiento. Es RESET.
          </p>
          <div className="gradient-line w-24 mx-auto mt-6"></div>
        </motion.div>

        {/* Intro Copy */}
        <motion.div
          className="max-w-3xl mx-auto mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            El Método RESET es un protocolo progresivo de reprogramación neuromuscular diseñado específicamente para personas como tú que han probado todo sin éxito.
            <br /><br />
            <span className="text-amber-300 font-semibold">Mientras otros tratan síntomas, RESET reprograma la raíz.</span>
          </p>
        </motion.div>

        {/* Features Grid - The 4 Pillars */}
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
                className="p-6 border-gradient-green transition-all duration-300 group"
                variants={itemVariants}
              >
                <Icon className="w-8 h-8 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
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
            Lo que conseguirás con el Método RESET
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
                <div className="counter text-5xl md:text-6xl mb-2 text-accent">{result.metric}</div>
                <p className="text-gray-300 font-body">{result.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => navigate('/quick-assessment')}
            className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-8 rounded-sm btn-glow transition-all cursor-pointer"
          >
            Descubre tu plan personalizado ahora
          </button>
        </motion.div>

        {/* Divider */}
        <div className="divider-gold"></div>
      </div>
    </section>
  );
}
