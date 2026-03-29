import { motion } from 'framer-motion';
import { Smartphone, Dumbbell, TrendingUp, Camera, Activity } from 'lucide-react';

/**
 * App Section - Tu Compañero Digital
 * Design Philosophy: Technology, Tracking, Empowerment
 * - Destaca la app propia como diferenciador
 * - Muestra todas las funcionalidades
 * - Comunica sincronización automática
 * - Refuerza valor agregado
 */

export default function AppSection() {
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

  const appFeatures = [
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: 'Registro de Entrenamientos',
      description: 'Registra cada serie, cada repetición. Sigue tu progresión en tiempo real. Nunca olvides qué hiciste la última sesión.',
      color: 'from-blue-500/20 to-blue-600/20',
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Registro de Hábitos',
      description: 'Sueño, agua, estrés, energía. Trackea todo lo que importa. Identifica patrones que afectan tus resultados.',
      color: 'from-purple-500/20 to-purple-600/20',
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Comparativa de Fotos',
      description: 'Sube fotos semanales. La app las compara automáticamente. Visualiza tu transformación en tiempo real.',
      color: 'from-pink-500/20 to-pink-600/20',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Métricas',
      description: 'Peso, medidas, porcentaje de grasa. Y evolución de tus dolores mediante gráficos.',
      color: 'from-orange-500/20 to-orange-600/20',
    },
  ];



  return (
    <div className="bg-background py-8 md:py-32">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="text-accent font-bold text-sm tracking-widest uppercase">
              Tu Compañero Digital
            </span>
          </motion.div>
          <motion.h2
            className="font-display text-4xl md:text-5xl text-white mb-6"
            variants={itemVariants}
          >
            App Propia Método RESET
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Acceso a una app exclusiva diseñada para tu transformación. Registra, trackea, analiza y celebra cada progreso.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-12 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {appFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className={`card-glass border border-border p-8 rounded-sm hover:border-accent/50 transition-all group bg-gradient-to-br ${feature.color}`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-accent group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-heading text-white text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>





        {/* CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-300 mb-6 text-lg">
            ¿Listo para tener tu transformación en la palma de tu mano?
          </p>
          <a
            href="#cta"
            className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-8 rounded-sm btn-glow transition-all"
          >
            Acceder a la App Ahora
          </a>
        </motion.div>

        {/* Coming Soon Badge */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="inline-block bg-accent/20 border border-accent/50 text-accent px-4 py-2 rounded-full text-sm font-bold">
            Disponible en iOS y Android
          </span>
        </motion.div>
      </div>
    </div>
  );
}
