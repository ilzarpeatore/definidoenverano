import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  age: number;
  role: string;
  quote: string;
  image: string;
  results: string;
  rating: number;
}

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Carlos M.',
      age: 42,
      role: 'Programador',
      quote:
        'Después de 3 años con dolor lumbar, en 4 semanas con RESET estoy entrenando de nuevo sin miedo. Es increíble. Finalmente entiendo qué estaba pasando.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-man-3_52435d14.webp',
      results: 'Dolor: 8/10 → 2/10',
      rating: 5,
    },
    {
      id: '2',
      name: 'María G.',
      age: 38,
      role: 'Abogada',
      quote:
        'Pensé que tendría que vivir con pastillas de por vida. RESET me devolvió la libertad. No es solo que desapareció el dolor, es que aprendí a prevenirlo.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-woman-2_12ee9528.webp',
      results: 'Dolor: 7/10 → 1/10',
      rating: 5,
    },
    {
      id: '3',
      name: 'David L.',
      age: 45,
      role: 'Consultor',
      quote:
        'Probé fisioterapia, masajes, yoga... nada funcionaba. Con RESET en 6 semanas recuperé la movilidad completa. Vuelvo a jugar con mis hijos sin limitaciones.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-man-5_90ee2c41.webp',
      results: 'Movilidad: Limitada → Completa',
      rating: 5,
    },
    {
      id: '4',
      name: 'Patricia G.',
      age: 42,
      role: 'Profesora',
      quote:
        'Como profesora, debo estar de pie constantemente. El dolor lumbar me hacía irritable. Después del programa, mejoró mi espalda, paciencia y energía. Mis estudiantes notaron el cambio.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/testimonial-woman-3_06b4d92a.webp',
      results: 'Energía: Baja → Óptima',
      rating: 5,
    },
    {
      id: '5',
      name: 'Roberto G.',
      age: 45,
      role: 'Gerente de Proyectos',
      quote:
        'Llevo 8 años en oficina con dolor lumbar constante. Probé fisioterapia, masajes... nada funcionaba. RESET me enseñó POR QUÉ me dolía. En 6 semanas volví a jugar fútbol con mis hijos.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/carlos-sanchez-headshot_18242fa2.webp',
      results: 'Dolor: 8/10 → 1/10',
      rating: 5,
    },
    {
      id: '6',
      name: 'Javier L.',
      age: 40,
      role: 'Empresario',
      quote:
        'Como empresario, no tenía tiempo para dolor. Probé todo sin resultado. RESET cambió mi vida en 5 semanas. Ahora tengo energía y claridad mental para dirigir mi negocio.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/javier-lopez-headshot_34138bc4.webp',
      results: 'Energía: Baja → Máxima',
      rating: 5,
    },
    {
      id: '7',
      name: 'Ana M.',
      age: 35,
      role: 'Diseñadora Gráfica',
      quote:
        'Pasaba 10 horas frente a la computadora. El dolor era tan intenso que algunos días no podía levantarme. Después de 8 semanas, mejoró el dolor y mi productividad se duplicó.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/patricia-gomez-headshot_667ed0b7.webp',
      results: 'Productividad: +100%',
      rating: 5,
    },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStart;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        prev();
      } else {
        next();
      }
    }
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - dragStart;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        prev();
      } else {
        next();
      }
    }
    setDragOffset(0);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background/50">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Historias de Recuperación</h2>
          <p className="text-lg text-muted-foreground">
            Hombres como tú que recuperaron su vida sin cirugía ni pastillas
          </p>
        </div>

        {/* Testimonial Card - Draggable */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative bg-card rounded-xl border border-border p-8 md:p-10 shadow-lg cursor-grab active:cursor-grabbing transition-transform"
          style={{
            transform: `translateX(${dragOffset}px)`,
            userSelect: isDragging ? 'none' : 'auto',
          }}
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Image */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-40 h-40 md:w-48 md:h-48 rounded-lg object-cover shadow-md"
                  draggable={false}
                />
                <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full p-2">
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-2 space-y-4">
              {/* Quote */}
              <blockquote className="text-lg italic text-foreground leading-relaxed border-l-4 border-accent pl-4">
                "{current.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-lg">{current.name}</p>
                  <span className="text-sm text-muted-foreground">({current.age} años)</span>
                </div>
                <p className="text-sm text-muted-foreground">{current.role}</p>
              </div>

              {/* Results */}
              <div className="bg-accent/10 rounded-lg p-3 inline-block">
                <p className="text-sm font-semibold text-accent">{current.results}</p>
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
            </div>
          </div>

          {/* Drag Hint */}
          <div className="absolute bottom-2 right-4 text-xs text-muted-foreground opacity-50">
            Desliza para más historias
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-2 hover:bg-accent/10 rounded-full transition-colors"
            aria-label="Testimonial anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-accent w-6' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 hover:bg-accent/10 rounded-full transition-colors"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Counter */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          {currentIndex + 1} de {testimonials.length} historias
        </div>
      </div>
    </section>
  );
}
