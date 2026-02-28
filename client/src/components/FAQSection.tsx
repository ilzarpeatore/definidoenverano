import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/**
 * FAQ Section - Anticipate & Resolve Objections
 * Design Philosophy: Clear communication + Risk reduction
 * - Addresses common objections
 * - Specific, confident answers
 * - Builds trust through transparency
 */

export default function FAQSection() {
  const faqs = [
    {
      question: '¿Cuánto tiempo toma cada entrenamiento?',
      answer:
        'Los entrenamientos duran máximo 45 minutos. Están diseñados para ser intensos pero eficientes. 4 días a la semana es el programa estándar, pero puedes ajustar según tu agenda.',
    },
    {
      question: '¿Necesito equipo especial?',
      answer:
        'No. Solo necesitas mancuernas básicas. Si no tienes acceso a un gimnasio, incluimos modificaciones con peso corporal. Todo está adaptado para máxima flexibilidad.',
    },
    {
      question: '¿Funciona para mi edad?',
      answer:
        'Sí. Tenemos clientes de 25 a 55 años con resultados comprobados. El programa se adapta a tu nivel de fitness actual. No importa si eres principiante o avanzado.',
    },
    {
      question: '¿Qué pasa si no veo resultados?',
      answer:
        'Tienes 30 días de garantía de devolución de dinero. Sin preguntas. Si no ves progreso, te devolvemos el 100% de tu inversión. Así de confiados estamos.',
    },
    {
      question: '¿Es una dieta restrictiva?',
      answer:
        'No. La nutrición en Definido en Verano es simplificada, no restrictiva. Aprendes reglas claras que puedes seguir de por vida. Nada de contar calorías obsesivamente.',
    },
    {
      question: '¿Tendré acceso de por vida?',
      answer:
        'Sí. Cuando compres, tienes acceso perpetuo al programa. Recibiras todas las actualizaciones y mejoras que hagamos sin costo adicional.',
    },
    {
      question: '¿Hay soporte disponible?',
      answer:
        'Sí. Tienes acceso a nuestra comunidad privada y soporte directo. Puedes hacer preguntas, compartir progreso y conectar con otros hombres en el mismo camino.',
    },
    {
      question: '¿Cuándo voy a ver resultados?',
      answer:
        'Los primeros cambios visibles aparecen en 6 semanas. A las 12 semanas, la transformación es dramática. Pero los cambios internos (energía, confianza) comienzan desde la semana 1.',
    },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-300">
            Resolvemos tus dudas para que tomes la mejor decisión
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-glass px-6 border-border"
              >
                <AccordionTrigger className="text-white hover:text-accent transition-colors py-4">
                  <span className="font-heading text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Divider */}
        <div className="divider-gold mt-16"></div>
      </div>
    </section>
  );
}
