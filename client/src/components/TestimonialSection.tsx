import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

/**
 * Testimonial Section - Social Proof & Credibility
 * Design Philosophy: Authentic transformation stories
 * - Real numbers and specific results
 * - Relatable contexts (age, profession, challenges)
 * - Visual hierarchy with images and quotes
 * - Reduces perceived risk
 * - Horizontal slider for better engagement
 */

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        'No creía en los programas online. Pero el sistema de Definido en Verano es diferente. Entrenamientos cortos, resultados reales. Recomendado 100%.',
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
        'Pensé que necesitaba 2 horas en el gym. Con Definido en Verano logré más en 45 minutos. Eficiencia pura. Ahora tengo el cuerpo que siempre quise.',
      image:
        'https://files.manuscdn.com/user_upload_by_module/session_file/310519663378157518/ZgXiVDlwTuQvJLAH.jpg',
      results: '12 kg transformación',
      rating: 5,
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
          <div className="inline-block mb-4">
            <span className="text-accent font-display text-2xl font-bold">2,847 hombres transformados</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white">
            En 18 meses
          </h2>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Slider Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-out"
              animate={{ x: -currentIndex * 100 + '%' }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <motion.div className="card-glass p-8 md:p-12 flex flex-col max-w-2xl mx-auto">
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-200 text-lg md:text-xl mb-8 flex-grow italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-border mb-8"></div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-accent/30"
                      />
                      <div>
                        <p className="font-heading text-white text-lg">{testimonial.name}</p>
                        <p className="text-gray-400 text-sm">{testimonial.age} años • {testimonial.role}</p>
                        <p className="text-accent text-sm font-bold mt-2">{testimonial.results}</p>
                      </div>
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
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-accent' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="divider-gold mt-16"></div>
      </div>
    </section>
  );
}
