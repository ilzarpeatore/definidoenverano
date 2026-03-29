import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

/**
 * Transformation Gallery - Social Proof Through Visuals
 * Design Philosophy: Real Results, Real People
 * - Multiple before/after comparisons
 * - Horizontal slider for better engagement
 * - Subtle animations on scroll
 * - Gold accents for consistency
 */

export default function TransformationGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const transformations = [
    {
      id: 1,
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/transformation-posture-1-es-P946fbAUsPBgYDgdiRZs7r.webp',
      title: 'Postura Mejorada',
      description: 'Corrección de hombros redondeados',
    },
    {
      id: 2,
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/transformation-posture-2-es-iRVuM8zY6sekU9uyx5Jfdb.webp',
      title: 'Postura en el Trabajo',
      description: 'Ergonomía correcta en oficina',
    },
    {
      id: 3,
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/transformation-posture-3-es-fjJ9R9zu4HtePjcCYviwse.webp',
      title: 'Tensión Muscular Reducida',
      description: 'Músculos relajados y tonificados',
    },
    {
      id: 4,
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/transformation-posture-4-es-7y4AfzC6YEFGusw4JYzowx.webp',
      title: 'Alineación Espinal',
      description: 'Columna vertebral correctamente alineada',
    },
    {
      id: 5,
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/transformation-posture-5-es-nMpwMai5cthjsA4iLf57Sh.webp',
      title: 'Dolor Lumbar Eliminado',
      description: 'Postura neutral y sin dolor',
    },
    {
      id: 6,
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/transformation-posture-6-es-kdRVD34DHAZdvkgWVUt6yT.webp',
      title: 'Alineación Cervical',
      description: 'Cuello relajado y bien posicionado',
    },
    {
      id: 7,
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/transformation-posture-7-es-CkDtmgu2SNaRw7y3Ec6rez.webp',
      title: 'Transformación Completa',
      description: 'Postura correcta y confianza restaurada',
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

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
    <section className="bg-background py-8 md:py-32">
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

        {/* Gallery Slider */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Slider Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-out"
              animate={{ x: -currentIndex * 100 + '%' }}
            >
              {transformations.map((transformation) => (
                <div key={transformation.id} className="w-full flex-shrink-0 px-2 md:px-4">
                  <motion.div
                    className="relative group overflow-hidden rounded-sm h-96 md:h-96"
                    whileHover={{ y: -5 }}
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-black h-full">
                      <img
                        src={transformation.image}
                        alt={transformation.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
              aria-label="Previous transformation"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
              aria-label="Next transformation"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            {transformations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-accent' : 'bg-gray-600'
                }`}
                aria-label={`Go to transformation ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 bg-accent/10 border border-accent/30 rounded-sm p-6 md:p-8"
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
      </div>
    </section>
  );
}
