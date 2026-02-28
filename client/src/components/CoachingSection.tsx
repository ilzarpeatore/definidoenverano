import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { MessageSquare, Users, Zap, TrendingUp, Clock, Target } from 'lucide-react';

/**
 * Coaching Section - Asesoramiento y Acompañamiento
 * Design Philosophy: Trust, Support, Continuous Growth
 * - Destaca el valor del acompañamiento personalizado
 * - Muestra los pilares del entrenamiento
 * - Comunica disponibilidad y soporte
 * - Refuerza la garantía de éxito
 */

export default function CoachingSection() {
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

  const supportFeatures = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Soporte Directo',
      description: 'Respuestas a tus dudas en menos de 24 horas. Chat privado con tu coach.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Comunidad Privada',
      description: 'Conecta con otros hombres en tu transformación. Comparte logros y aprende juntos.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Adaptaciones Personalizadas',
      description: 'Ajustamos tu plan según tu progreso, lesiones o cambios en tu rutina.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Seguimiento Semanal',
      description: 'Revisamos tu progreso cada semana y realizamos ajustes necesarios.',
    },
  ];

  const trainingPillars = [
    {
      number: '01',
      title: 'Entrenamiento Inteligente',
      description: 'Programas basados en ciencia. Máximo resultado en mínimo tiempo. Enfoque en compound movements y progresión sistemática.',
      icon: '💪',
    },
    {
      number: '02',
      title: 'Nutrición Estratégica',
      description: 'Planes de comidas adaptados a tu objetivo. Sin dietas restrictivas. Sostenible y delicioso.',
      icon: '🍎',
    },
    {
      number: '03',
      title: 'Recuperación Óptima',
      description: 'Sueño, estrés y descanso. Los músculos crecen en reposo. Te enseñamos cómo maximizar tu recuperación.',
      icon: '😴',
    },
    {
      number: '04',
      title: 'Mentalidad Ganadora',
      description: 'Psicología del éxito. Supera limitaciones mentales. Construye hábitos que duren de por vida.',
      icon: '🧠',
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
              Acompañamiento Total
            </span>
          </motion.div>
          <motion.h2
            className="font-display text-4xl md:text-5xl text-white mb-6"
            variants={itemVariants}
          >
            No Estás Solo en Tu Transformación
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Acceso directo a coaching, comunidad privada y adaptaciones personalizadas durante los 12 semanas y más allá.
          </motion.p>
        </motion.div>

        {/* Support Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {supportFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="card-glass border border-border p-8 rounded-sm hover:border-accent/50 transition-all group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div className="text-accent text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-heading text-white text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-20" />

        {/* Training Pillars */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h3 className="font-display text-3xl md:text-4xl text-white mb-4">
              Los 4 Pilares de tu Éxito
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Un programa completo que abarca todo lo que necesitas para transformarte
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {trainingPillars.map((pillar, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={itemVariants}
              >
                <div className="card-glass border border-border p-8 rounded-sm h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center">
                    <span className="font-display text-2xl text-accent font-bold">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-8">
                    <div className="text-5xl mb-4">{pillar.icon}</div>
                    <h4 className="font-heading text-white text-xl mb-3">
                      {pillar.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coaching Guarantee */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-sm p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {/* Availability */}
            <motion.div className="text-center" variants={itemVariants}>
              <div className="flex justify-center mb-4">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-heading text-white mb-2">Disponibilidad 24/7</h4>
              <p className="text-gray-400 text-sm">
                Acceso a recursos, comunidad y soporte en cualquier momento
              </p>
            </motion.div>

            {/* Personalization */}
            <motion.div className="text-center" variants={itemVariants}>
              <div className="flex justify-center mb-4">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-heading text-white mb-2">100% Personalizado</h4>
              <p className="text-gray-400 text-sm">
                Tu plan se adapta a ti, no al revés. Lesiones, horarios, preferencias
              </p>
            </motion.div>

            {/* Results */}
            <motion.div className="text-center" variants={itemVariants}>
              <div className="flex justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-heading text-white mb-2">Resultados Garantizados</h4>
              <p className="text-gray-400 text-sm">
                O devolvemos tu dinero. Confiamos en nuestro programa
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-300 mb-6">
            ¿Listo para transformarte con apoyo profesional?
          </p>
          <button
            onClick={() => navigate('/assessment')}
            className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-8 rounded-sm btn-glow transition-all cursor-pointer"
          >
            Comenzar Ahora
          </button>
        </motion.div>
      </div>
    </div>
  );
}
