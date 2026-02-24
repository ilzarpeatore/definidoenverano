import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

/**
 * Testimonial Section - Social Proof & Credibility
 * Design Philosophy: Authentic transformation stories
 * - Real numbers and specific results
 * - Relatable contexts (age, profession, challenges)
 * - Visual hierarchy with images and quotes
 * - Reduces perceived risk
 */

export default function TestimonialSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const testimonials = [
    {
      name: 'Carlos M.',
      age: 34,
      role: 'Ejecutivo',
      quote:
        'Llegué pensando que era imposible con mi agenda. En 12 semanas perdí 10 kg de grasa y gané músculo visible. Mi confianza cambió completamente.',
      image:
        'https://files.manuscdn.com/user_upload_by_module/session_file/310519663378157518/JmZrJJcuaHZyZxEz.jpg',
      results: '10 kg grasa',
      rating: 5,
    },
    {
      name: 'Juan P.',
      age: 41,
      role: 'Padre de dos hijos',
      quote:
        'No creía en los programas online. Pero el sistema de Summer Shred es diferente. Entrenamientos cortos, resultados reales. Recomendado 100%.',
      image:
        'https://files.manuscdn.com/user_upload_by_module/session_file/310519663378157518/nZdZLnvpNxknbvov.jpg',
      results: '8 kg grasa + músculo definido',
      rating: 5,
    },
    {
      name: 'Miguel R.',
      age: 28,
      role: 'Emprendedor',
      quote:
        'Pensé que necesitaba 2 horas en el gym. Con Summer Shred logré más en 45 minutos. Eficiencia pura. Ahora tengo el cuerpo que siempre quise.',
      image:
        'https://files.manuscdn.com/user_upload_by_module/session_file/310519663378157518/ZgXiVDlwTuQvJLAH.jpg',
      results: '12 kg transformación',
      rating: 5,
    },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-4">
            <span className="text-accent font-display text-2xl font-bold">2,847 hombres transformados</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white">
            En 18 meses
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="card-glass p-8 flex flex-col"
              variants={itemVariants}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-200 text-sm mb-6 flex-grow italic">
                "{testimonial.quote}"
              </p>

              {/* Divider */}
              <div className="h-px bg-border mb-6"></div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border border-accent/30"
                />
                <div>
                  <p className="font-heading text-white text-sm">{testimonial.name}</p>
                  <p className="text-gray-400 text-xs">{testimonial.age} años • {testimonial.role}</p>
                  <p className="text-accent text-xs font-bold mt-1">{testimonial.results}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="divider-gold"></div>
      </div>
    </section>
  );
}
