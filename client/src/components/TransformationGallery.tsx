import { motion } from 'framer-motion';

/**
 * Transformation Gallery - Social Proof Through Visuals
 * Design Philosophy: Real Results, Real People
 * - Multiple before/after comparisons
 * - Grid layout for maximum impact
 * - Subtle animations on scroll
 * - Gold accents for consistency
 */

export default function TransformationGallery() {
  const transformations = [
    {
      id: 1,
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663378157518/ovvPetUYCIuneRFJ.webp',
      title: 'Transformación 1',
      description: '12 semanas de dedicación',
    },
    {
      id: 2,
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663378157518/XJMaXAoygdoBdaxp.webp',
      title: 'Transformación 2',
      description: 'Resultados reales',
    },
    {
      id: 3,
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663378157518/GvqtOJAsCqfLpUCB.webp',
      title: 'Transformación 3',
      description: 'Definición muscular',
    },
    {
      id: 4,
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663378157518/PIglvLWlfnFZHKgo.webp',
      title: 'Transformación 4',
      description: 'Cuerpo completamente diferente',
    },
  ];

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

  return (
    <section className="bg-background py-20 md:py-32">
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
              Resultados Reales
            </span>
          </motion.div>
          <motion.h2
            className="font-display text-4xl md:text-5xl text-white mb-6"
            variants={itemVariants}
          >
            Transformaciones que Hablan por Sí Solas
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Estos son hombres como tú. Ocupados. Sin excusas. Que decidieron cambiar.
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {transformations.map((transformation) => (
            <motion.div
              key={transformation.id}
              className="relative group overflow-hidden rounded-sm"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-black">
                <img
                  src={transformation.image}
                  alt={transformation.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                  <div>
                    <h3 className="font-heading text-white text-lg mb-1">
                      {transformation.title}
                    </h3>
                    <p className="text-accent text-sm font-bold">
                      {transformation.description}
                    </p>
                  </div>
                </div>

                {/* Gold Border */}
                <div className="absolute inset-0 border-2 border-accent/30 pointer-events-none group-hover:border-accent/60 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 bg-accent/10 border border-accent/30 rounded-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">247+</div>
            <p className="text-gray-300">Transformaciones Completadas</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">4.9★</div>
            <p className="text-gray-300">Calificación Promedio</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">92%</div>
            <p className="text-gray-300">Tasa de Satisfacción</p>
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
          <p className="text-gray-300 mb-6 text-lg">
            ¿Listo para ser la próxima transformación?
          </p>
          <a
            href="#cta"
            className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-8 rounded-sm btn-glow transition-all"
          >
            Comienza tu Transformación
          </a>
        </motion.div>
      </div>
    </section>
  );
}
