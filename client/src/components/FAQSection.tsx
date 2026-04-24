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

export default function FAQSection({ id }: { id?: string } = {}) {
  const faqs = [
    {
      question: '¿Cuánto tiempo necesito dedicar?',
      answer:
        'Solo 10-20 minutos al día, 3-4 veces por semana. Es menos tiempo del que pasas en el fisio. Puedes hacerlo en casa, en la oficina, donde sea.',
    },
    {
      question: '¿Necesito equipamiento especial?',
      answer:
        'No. Solo tu cuerpo y tu móvil. Todos los ejercicios están diseñados para hacerse sin equipamiento. Máxima flexibilidad.',
    },
    {
      question: '¿Y si ya lo he probado todo?',
      answer:
        'Eso es exactamente para quién es RESET. La mayoría de nuestros clientes ya habían probado fisioterapia, entrenamiento personal, yoga, pilates... sin resultados. RESET es diferente porque reprograma la raíz, no trata síntomas.',
    },
    {
      question: '¿Cuándo voy a notar mejoras?',
      answer:
        'Muchos notan cambios en la primera semana. Pero los resultados más significativos llegan entre la semana 3-4. A las 6 semanas, la mayoría ha reducido su dolor en un 70%.',
    },
    {
      question: '¿Qué pasa si no funciona?',
      answer:
        'Garantía de dinero devuelto. Si no reduces tu dolor en un 50% en las primeras 3 semanas, te devolvemos el 100%. No es un riesgo. Es una promesa.',
    },
    {
      question: '¿Es para hombres y mujeres?',
      answer:
        'Sí. RESET funciona para cualquier persona con dolor lumbar o cervical, independientemente del género o edad. El sistema es universal.',
    },
    {
      question: '¿Hay soporte disponible?',
      answer:
        'Sí. Tienes acceso a seguimiento semanal en vivo, comunidad privada, y coaching personalizado. No estás solo en este camino.',
    },
    {
      question: '¿Cuánto tiempo tengo acceso?',
      answer:
        'Tu acceso es de 12 semanas desde la fecha de compra. Incluye las 6 fases del Método RESET, seguimiento semanal, comunidad privada, y plan de mantenimiento para evitar recaídas.',
    },
  ];

  return (
    <section id={id || 'faq'} className="relative py-8 md:py-32 bg-background overflow-hidden">
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
            Preguntas Frecuentes sobre RESET
          </h2>
          <p className="text-gray-300">
            Resolvemos tus dudas sobre el Método RESET y cómo funciona
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
                className="border-gradient-subtle px-6"
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
