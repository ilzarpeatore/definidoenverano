import { motion } from 'framer-motion';
import { Smartphone, Dumbbell, Apple, Zap, TrendingUp, Camera, Activity } from 'lucide-react';

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
      icon: <Apple className="w-8 h-8" />,
      title: 'Seguimiento Nutricional',
      description: 'Registra tus comidas, macros y calorías. Base de datos de alimentos integrada. Análisis automático de tu nutrición.',
      color: 'from-green-500/20 to-green-600/20',
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
      title: 'Métricas de Pesaje',
      description: 'Peso, medidas, porcentaje de grasa. Gráficos automáticos. Entiende qué está funcionando y qué no.',
      color: 'from-orange-500/20 to-orange-600/20',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Sincronización Automática',
      description: 'Conecta con Apple Health o Google Fit. Todos tus datos en un solo lugar. Sin duplicar esfuerzo.',
      color: 'from-red-500/20 to-red-600/20',
    },
  ];

  const syncBenefits = [
    {
      platform: 'Apple Health',
      features: ['Pasos', 'Calorías quemadas', 'Frecuencia cardíaca', 'Sueño', 'Agua'],
      icon: '🍎',
    },
    {
      platform: 'Google Fit',
      features: ['Pasos', 'Calorías quemadas', 'Frecuencia cardíaca', 'Sueño', 'Agua'],
      icon: '🔵',
    },
  ];

  return (
    <div className="bg-background py-20 md:py-32">
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
            App Propia Summer Shred
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
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

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-20" />

        {/* Sync Integration */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h3 className="font-display text-3xl md:text-4xl text-white mb-4">
              Sincronización Automática
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Conecta tu app Summer Shred con Apple Health o Google Fit. Todos tus datos de salud en un solo lugar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {syncBenefits.map((sync, index) => (
              <motion.div
                key={index}
                className="card-glass border border-border p-8 rounded-sm"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{sync.icon}</span>
                  <h4 className="font-heading text-white text-xl">
                    {sync.platform}
                  </h4>
                </div>
                <div className="space-y-3">
                  {sync.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sync Benefit Box */}
          <motion.div
            className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-sm p-8"
            variants={itemVariants}
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-heading text-white mb-2">Un Solo Dashboard</h4>
                <p className="text-gray-400 text-sm">
                  Toda tu información en un lugar. Entrenamientos, nutrición, hábitos y salud integrados.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🔄</div>
                <h4 className="font-heading text-white mb-2">Sincronización Automática</h4>
                <p className="text-gray-400 text-sm">
                  Sin duplicar datos. Tu app habla con Apple Health y Google Fit automáticamente.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📊</div>
                <h4 className="font-heading text-white mb-2">Análisis Inteligente</h4>
                <p className="text-gray-400 text-sm">
                  IA que analiza tus datos. Recomendaciones personalizadas basadas en tu progreso.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-20" />

        {/* What You Get */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h3 className="font-display text-2xl text-white mb-4">
              Incluido en tu Acceso
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              'App iOS y Android',
              'Actualizaciones de por vida',
              'Sincronización Apple Health',
              'Sincronización Google Fit',
              'Análisis de datos automático',
              'Gráficos y reportes semanales',
              'Notificaciones personalizadas',
              'Soporte técnico prioritario',
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-4 card-glass border border-border rounded-sm"
                variants={itemVariants}
              >
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-accent-foreground text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-300">{item}</span>
              </motion.div>
            ))}
          </div>
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
