import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';

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
  const [, navigate] = useLocation();

  const testimonials = [
    {
      name: 'Carlos M.',
      age: 42,
      role: 'Programador',
      quote:
        'Después de 3 años con dolor lumbar, en 4 semanas con RESET estoy entrenando de nuevo sin miedo. Es increíble. Finalmente entiendo qué estaba pasando.',
      image:
        'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-man-1_73980c35.webp',
      results: 'Dolor: 8/10 → 2/10',
      rating: 5,
    },
    {
      name: 'María G.',
      age: 38,
      role: 'Abogada',
      quote:
        'Pensé que tendría que vivir con pastillas de por vida. RESET me devolvió la libertad. No es solo que desapareció el dolor, es que aprendí a prevenirlo.',
      image:
        'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-woman-1_de013276.webp',
      results: 'Dolor: 7/10 → 1/10',
      rating: 5,
    },
    {
      name: 'David L.',
      age: 45,
      role: 'Consultor',
      quote:
        'Probé fisioterapia, masajes, yoga... nada funcionaba. Con RESET en 6 semanas recuperé la movilidad completa. Vuelvo a jugar con mis hijos sin limitaciones.',
      image:
        'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-man-2_80cae104.webp',
      results: 'Movilidad: Limitada → Completa',
      rating: 5,
    },
    {
      name: 'Roberto García',
      age: 45,
      role: 'Gerente de Proyectos',
      quote:
        'Llevo 8 años trabajando en oficina, y los últimos 3 con dolor lumbar constante. Probé fisioterapia, masajes, incluso una resonancia magnética que no mostró nada grave. El Método RESET fue diferente porque no solo me dio ejercicios, sino que me enseñó POR QUÉ me dolía. En 6 semanas volví a jugar fútbol con mis hijos sin miedo.',
      image:
        'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-man-3_52435d14.webp',
      results: 'Dolor: 8/10 → 1/10',
      rating: 5,
    },
    {
      name: 'María Rodríguez',
      age: 52,
      role: 'Enfermera',
      quote:
        'Como enfermera, estoy de pie 12 horas diarias. El dolor lumbar me obligó a considerar cambiar de profesión. Después de 4 meses con el programa, no solo desapareció el dolor, sino que mi resistencia aumentó. Ahora termino turnos sin agotamiento.',
      image:
        'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-woman-2_12ee9528.webp',
      results: 'Resistencia: Limitada → Óptima',
      rating: 5,
    },
    {
      name: 'Javier López',
      age: 38,
      role: 'Empresario',
      quote:
        'El dolor me limitaba en mi negocio. No podía viajar, no podía estar en reuniones largas sin incomodidad. Pensé que era parte de envejecer. El Método RESET me demostró que no, que era un problema de patrones de movimiento. Ahora viajo sin restricciones.',
      image:
        'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-man-4_09da572b.webp',
      results: 'Movilidad: Limitada → Completa',
      rating: 5,
    },
    {
      name: 'Ana Martínez',
      age: 35,
      role: 'Diseñadora Gráfica',
      quote:
        'Pasaba 10 horas al día frente a la computadora. El dolor lumbar era tan intenso que algunos días no podía ni levantarme de la cama. Después de 8 semanas, no solo mejoró el dolor, sino que mi productividad se duplicó porque no estaba pensando constantemente en el malestar.',
      image:
        'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-woman-3_06b4d92a.webp',
      results: 'Productividad: +100%',
      rating: 5,
    },
    {
      name: 'Carlos Sánchez',
      age: 48,
      role: 'Técnico de Mantenimiento',
      quote:
        'Mi trabajo requiere levantar cosas pesadas. El dolor lumbar me hacía tomar días libres constantemente. Temía perder mi empleo. Con el programa, aprendí técnicas correctas de levantamiento y fortalecimiento específico. Llevo 6 meses sin un solo día de baja laboral.',
      image:
        'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-man-5_7514bae7.webp',
      results: 'Bajas laborales: 0 en 6 meses',
      rating: 5,
    },
    {
      name: 'Patricia Gómez',
      age: 42,
      role: 'Profesora',
      quote:
        'Como profesora, debo estar de pie y moviéndome constantemente. El dolor lumbar me hacía irritable con mis estudiantes. Después del programa, no solo mejoró mi espalda, sino también mi paciencia y energía. Mis estudiantes notaron el cambio.',
      image:
        'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-woman-2_12ee9528.webp',
      results: 'Energía: Baja → Óptima',
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
            <span className="text-accent font-display text-2xl font-bold">Miles de personas liberadas del dolor</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white">
            Historias de Recuperación
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
                        loading="lazy"
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
            Sé el próximo caso de éxito
          </button>
        </motion.div>

        {/* Divider */}
        <div className="divider-gold mt-16"></div>
      </div>
    </section>
  );
}
