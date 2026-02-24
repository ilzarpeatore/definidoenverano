import { motion } from 'framer-motion';
import { CheckCircle, Zap, Heart, Smile } from 'lucide-react';

/**
 * Nutrition Section - Dieta Sin Restricciones
 * Design Philosophy: Empowerment, Sustainability, Real Results
 * - Destruye el mito de dietas restrictivas
 * - Comunica sostenibilidad
 * - Muestra flexibilidad y realismo
 * - Refuerza diferenciador clave
 */

export default function NutritionSection() {
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

  const myths = [
    {
      myth: 'Necesitas comer "limpio" 100% del tiempo',
      reality: 'El 80/20 funciona. Comer bien la mayoría del tiempo y disfrutar ocasionalmente es sostenible.',
      icon: '🍕',
    },
    {
      myth: 'Tienes que contar calorías obsesivamente',
      reality: 'Te enseñamos métodos simples. Porciones inteligentes, no matemáticas complicadas.',
      icon: '📊',
    },
    {
      myth: 'No puedes comer carbohidratos',
      reality: 'Los carbohidratos son tu aliado. Los necesitas para entrenar duro y recuperarte.',
      icon: '🍚',
    },
    {
      myth: 'Debes eliminar alimentos que amas',
      reality: 'Adaptamos tu plan a tus preferencias. Comida que amas, resultados que quieres.',
      icon: '❤️',
    },
  ];

  const nutritionBenefits = [
    {
      title: 'Planes Personalizados',
      description: 'Tu dieta se adapta a tu estilo de vida, preferencias y objetivos. No hay soluciones genéricas.',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: 'Sostenible de Por Vida',
      description: 'No es una dieta temporal. Construimos hábitos que duran. Comer bien se convierte en tu estilo de vida.',
      icon: <Heart className="w-6 h-6" />,
    },
    {
      title: 'Flexibilidad Real',
      description: 'Viajes, cenas con amigos, celebraciones. Tu plan se adapta a la vida real, no al revés.',
      icon: <Smile className="w-6 h-6" />,
    },
  ];

  const nutritionPrinciples = [
    {
      number: '1',
      principle: 'Proteína Suficiente',
      detail: '1.6-2.2g por kg de peso corporal. Es la base para construir músculo.',
    },
    {
      number: '2',
      principle: 'Calorías Inteligentes',
      detail: 'Ni muy pocas (sin energía), ni excesivas. El balance perfecto para tu objetivo.',
    },
    {
      number: '3',
      principle: 'Alimentos Reales',
      detail: 'Comida de verdad. Pollo, arroz, verduras, frutas. Nada complicado.',
    },
    {
      number: '4',
      principle: 'Consistencia > Perfección',
      detail: 'Hacer bien el 80% consistentemente supera hacer perfecto el 100% ocasionalmente.',
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
              Nutrición Inteligente
            </span>
          </motion.div>
          <motion.h2
            className="font-display text-4xl md:text-5xl text-white mb-6"
            variants={itemVariants}
          >
            Sin Dietas Restrictivas, Con Resultados Reales
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Olvídate de las dietas imposibles. Te enseñamos a comer bien, disfrutar la comida y transformar tu cuerpo al mismo tiempo.
          </motion.p>
        </motion.div>

        {/* Myths vs Reality */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h3 className="font-display text-2xl text-white mb-10 text-center">
            Destruyamos los Mitos
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {myths.map((item, index) => (
              <motion.div
                key={index}
                className="card-glass border border-border p-6 rounded-sm"
                variants={itemVariants}
              >
                <div className="flex gap-4">
                  <div className="text-4xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-heading text-white mb-2 line-through text-red-400/70">
                      {item.myth}
                    </h4>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300">{item.reality}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-20" />

        {/* Benefits */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h3 className="font-display text-2xl text-white mb-10 text-center">
            Lo Que Obtienes
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {nutritionBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="card-glass border border-border p-8 rounded-sm text-center"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4 text-accent">
                  {benefit.icon}
                </div>
                <h4 className="font-heading text-white text-lg mb-3">
                  {benefit.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-20" />

        {/* Core Principles */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <h3 className="font-display text-2xl text-white mb-10 text-center">
            Los 4 Principios de Nutrición Summer Shred
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {nutritionPrinciples.map((item, index) => (
              <motion.div
                key={index}
                className="card-glass border border-border p-8 rounded-sm flex gap-6"
                variants={itemVariants}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center">
                    <span className="font-display text-xl text-accent font-bold">
                      {item.number}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading text-white text-lg mb-2">
                    {item.principle}
                  </h4>
                  <p className="text-gray-400">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial Quote */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-sm p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl text-gray-200 italic mb-6">
            "Lo mejor de Summer Shred es que no me siento en dieta. Como bien, disfruto la comida, y los resultados vienen solos. Es la primera vez que puedo mantener esto de por vida."
          </p>
          <p className="text-accent font-bold">— Carlos M., Ejecutivo, 34 años</p>
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
            ¿Listo para comer bien sin sufrir?
          </p>
          <a
            href="#cta"
            className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-8 rounded-sm btn-glow transition-all"
          >
            Obtén tu Plan de Nutrición
          </a>
        </motion.div>
      </div>
    </div>
  );
}
