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
      question: '¿Cuánto tiempo necesito dedicar?',
      answer:
        'Solo 20-30 minutos al día, 5-6 veces por semana. Es menos tiempo del que pasas en el fisio. Puedes hacerlo en casa, en la oficina, donde sea. También hay versiones express de 15 minutos si tienes poco tiempo.',
    },
    {
      question: '¿Necesito equipamiento especial?',
      answer:
        'No. Solo tu cuerpo y tu móvil. Todos los ejercicios están diseñados para hacerse sin equipamiento. Máxima flexibilidad. Algunos ejercicios opcionales pueden usar bandas elásticas o mancuernas, pero no son obligatorios.',
    },
    {
      question: '¿Y si ya lo he probado todo?',
      answer:
        'Eso es exactamente para quién es RESET. La mayoría de nuestros clientes ya habían probado fisioterapia, entrenamiento personal, yoga, pilates... sin resultados. RESET es diferente porque reprograma la raíz, no trata síntomas. Nos enfocamos en la causa del dolor, no solo en aliviar el síntoma.',
    },
    {
      question: '¿Cuándo voy a notar mejoras?',
      answer:
        'Muchos notan cambios en la primera semana. Pero los resultados más significativos llegan entre la semana 3-4. A las 6-8 semanas, la mayoría ha reducido su dolor en un 70-90%. Los cambios son graduales pero consistentes si sigues el programa.',
    },
    {
      question: '¿Qué pasa si no funciona?',
      answer:
        'Garantía de dinero devuelto de 30 días. Si después de 30 días de seguir consistentemente el programa no ves mejora en tu dolor, te devolvemos el 100% sin preguntas. No es un riesgo. Es una promesa.',
    },
    {
      question: '¿Es para hombres y mujeres?',
      answer:
        'Sí. RESET funciona para cualquier persona con dolor lumbar, independientemente del género o edad. El sistema está diseñado para hombres ocupados de 30-55 años, pero funciona para cualquiera con dolor lumbar crónico.',
    },
    {
      question: '¿Hay soporte disponible?',
      answer:
        'Sí. Tienes acceso a comunidad privada, recursos de soporte, y puedes hacer preguntas sobre tu progreso. Estás conectado con otros usuarios que están en el mismo camino.',
    },
    {
      question: '¿Cuánto tiempo tengo acceso?',
      answer:
        'Tu acceso es de por vida. Una vez que compres el programa, tienes acceso permanente a todo el contenido, actualizaciones futuras, y la comunidad privada. Es una inversión única.',
    },
    {
      question: '¿Funciona para dolor lumbar crónico (más de 3 meses)?',
      answer:
        'Sí. De hecho, el programa está específicamente diseñado para dolor lumbar crónico. Muchos de nuestros usuarios han sufrido dolor durante años sin éxito. El enfoque es diferente porque nos enfocamos en la causa raíz del dolor, no solo en aliviar síntomas temporalmente.',
    },
    {
      question: '¿Necesito ver a un médico antes de empezar?',
      answer:
        'Recomendamos consultar con tu médico si tienes condiciones graves como hernias discales diagnosticadas, cirugía reciente, o dolor muy severo. Para la mayoría de casos de dolor lumbar común, puedes comenzar inmediatamente. El programa incluye modificaciones para diferentes niveles de dolor.',
    },
    {
      question: '¿Funciona para ciática o dolor que baja por la pierna?',
      answer:
        'Sí. Muchos casos de ciática son causados por tensión muscular en la espalda baja que comprime el nervio. Al liberar esta tensión y fortalecer correctamente, el dolor de ciática generalmente desaparece. Tenemos módulos específicos para este tipo de dolor.',
    },
    {
      question: '¿Los resultados son permanentes?',
      answer:
        'Los resultados son duraderos si mantienes los hábitos que aprendes. El programa te enseña cómo prevenir que el dolor regrese. Muchos usuarios continúan con una rutina de mantenimiento de 10-15 minutos 2-3 veces a la semana después de completar el programa.',
    },
    {
      question: '¿Puedo volver a mis actividades normales?',
      answer:
        'Sí, ese es el objetivo. Después del programa, muchos usuarios pueden: volver a hacer deporte, levantar cosas sin miedo, trabajar sin molestia, viajar sin dolor, jugar con sus hijos sin limitaciones. El programa no es solo aliviar dolor, es recuperar tu vida.',
    },
  ];

  return (
    <section className="relative py-8 md:py-32 bg-background overflow-hidden">
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
