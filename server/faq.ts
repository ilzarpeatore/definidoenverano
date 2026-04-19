/**
 * FAQ Database for Chatbot
 * Predefined questions and answers to reduce token consumption
 */

export interface FAQItem {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
}

export const faqDatabase: FAQItem[] = [
  {
    id: 'what-is-program',
    keywords: ['qué es', 'en qué consiste', 'programa', 'método reset', 'cómo funciona'],
    question: '¿En qué consiste el Método RESET?',
    answer: `El Método RESET es un programa de 12 semanas diseñado científicamente para eliminar el dolor de espalda y cuello de forma natural.

Incluye:
• 6 fases progresivas de entrenamiento
• Valoración postular personalizada en vídeo
• Seguimiento semanal en vivo con el coach
• Acceso a comunidad privada de apoyo
• Plantillas y guías paso a paso
• Garantía de dinero devuelto si no ves resultados

El programa está diseñado específicamente para hombres ocupados (30-55 años) que trabajan en oficina y sufren dolor crónico por sedentarismo.`,
  },
  {
    id: 'how-long',
    keywords: ['cuánto dura', 'duración', 'semanas', 'tiempo', 'cuánto tiempo'],
    question: '¿Cuánto dura el programa?',
    answer: `El programa tiene una duración de 12 semanas (3 meses).

Cada semana incluye:
• 3-4 entrenamientos de 30-45 minutos
• 1 sesión en vivo con el coach
• Acceso a materiales y guías

Después de las 12 semanas, tendrás acceso de por vida a todos los recursos y podrás continuar con el programa a tu ritmo.`,
  },
  {
    id: 'price',
    keywords: ['precio', 'costo', 'cuánto cuesta', 'cuánto vale', 'tarifa'],
    question: '¿Cuál es el precio?',
    answer: `El precio actual es de €147 (con descuento de -50€ en la fase actual).

El precio normal es €197, pero en esta fase de expansión ofrecemos un descuento especial.

Opciones de pago:
• Pago único: €147
• 3 cuotas: €49/mes sin interés

⚠️ El precio subirá en los próximos días. ¡Actúa ahora para asegurar tu precio actual!`,
  },
  {
    id: 'guarantee',
    keywords: ['garantía', 'devolución', 'dinero devuelto', 'reembolso', 'satisfacción'],
    question: '¿Hay garantía?',
    answer: `Sí, ofrecemos una garantía de 30 días 100% sin riesgo.

Si después de 30 días no ves resultados o no estás satisfecho, devolvemos tu dinero completo sin preguntas.

Además, muchos usuarios ven resultados en las primeras 2-3 semanas:
• Reducción del dolor en 50%
• Mejor postura y movilidad
• Mejor sueño
• Más energía

No hay riesgo. Solo beneficios.`,
  },
  {
    id: 'access',
    keywords: ['acceso', 'cómo accedo', 'cuándo empiezo', 'inmediato', 'cuándo comienza'],
    question: '¿Cuándo tengo acceso al programa?',
    answer: `El acceso es inmediato después del pago.

Después de completar tu compra:
1. Recibirás un correo de bienvenida
2. En 24 horas recibirás tus datos de acceso a la app
3. Podrás descargar la app desde App Store o Google Play
4. ¡Comienza tu transformación!

No hay esperas, no hay complicaciones. Acceso instantáneo.`,
  },
  {
    id: 'who-is-for',
    keywords: ['para quién', 'a quién va dirigido', 'es para mí', 'target', 'público'],
    question: '¿Para quién es el programa?',
    answer: `El Método RESET está diseñado específicamente para:

✓ Hombres de 30-55 años
✓ Que trabajan en oficina o son autónomos
✓ Con dolor crónico de espalda o cuello
✓ Que buscan soluciones naturales sin medicinas
✓ Que quieren recuperar movilidad y calidad de vida
✓ Que tienen poco tiempo pero quieren resultados

Si tienes dolor de espalda o cuello persistente y quieres eliminarlo de forma natural, este programa es para ti.`,
  },
  {
    id: 'results-timeline',
    keywords: ['resultados', 'cuándo veo resultados', 'cuándo mejoro', 'timeline', 'progreso'],
    question: '¿Cuándo veo resultados?',
    answer: `La mayoría de usuarios ven resultados en:

📅 Semana 1-2: Mejora en la postura y reducción inicial del dolor
📅 Semana 3-4: Reducción del 50% del dolor (muchos ven esto)
📅 Semana 6-8: Eliminación casi completa del dolor
📅 Semana 12: Transformación completa

Los resultados dependen de:
• Tu consistencia (hacer los entrenamientos)
• Tu situación inicial
• Cuánto tiempo llevas con el dolor

Pero la mayoría ve cambios significativos en las primeras 3 semanas.`,
  },
  {
    id: 'app-access',
    keywords: ['app', 'aplicación', 'descargar', 'ios', 'android', 'iphone'],
    question: '¿Cómo accedo a la app?',
    answer: `Después de comprar, recibirás tus datos de acceso y podrás descargar la app desde:

📱 iPhone: App Store
🤖 Android: Google Play

Busca "HubFit" en tu tienda de aplicaciones.

La app incluye:
• Todos los entrenamientos en vídeo
• Seguimiento de progreso
• Acceso a la comunidad
• Recordatorios de entrenamientos
• Chat con el coach

Disponible en iOS y Android.`,
  },
  {
    id: 'support',
    keywords: ['soporte', 'ayuda', 'problema', 'contacto', 'asistencia'],
    question: '¿Hay soporte disponible?',
    answer: `Sí, tenemos soporte disponible de varias formas:

📞 WhatsApp: Contacta directamente con nuestro equipo
💬 Chat en vivo: Disponible en horario de oficina
📧 Email: Para consultas más complejas
👥 Comunidad privada: Otros usuarios pueden ayudarte

Estamos aquí para asegurar que obtengas los mejores resultados posibles.

¿Necesitas ayuda con algo específico? ¡Contacta por WhatsApp!`,
  },
  {
    id: 'payment-methods',
    keywords: ['pago', 'métodos de pago', 'tarjeta', 'stripe', 'cómo pago'],
    question: '¿Qué métodos de pago aceptan?',
    answer: `Aceptamos todos los métodos de pago principales:

💳 Tarjetas de crédito (Visa, Mastercard, Amex)
🏦 Transferencia bancaria
📱 Apple Pay / Google Pay
🔐 PayPal (en algunos casos)

El pago es seguro y encriptado. Tu información está protegida.

También ofrecemos:
• Pago único: €147
• 3 cuotas sin interés: €49/mes

Elige la opción que mejor se adapte a ti.`,
  },
  {
    id: 'refund-process',
    keywords: ['devolución', 'reembolso', 'cómo devuelvo', 'proceso devolución'],
    question: '¿Cómo funciona la devolución?',
    answer: `Si no estás satisfecho en los primeros 30 días:

1. Contacta con nuestro equipo por WhatsApp o email
2. Explica por qué quieres la devolución
3. Procesamos la devolución en 5-7 días hábiles
4. El dinero vuelve a tu cuenta

No hay preguntas incómodas, no hay complicaciones. Es simple.

Pero ten en cuenta: la mayoría de usuarios ve resultados en 2-3 semanas, así que es probable que no necesites la devolución.`,
  },
];

/**
 * Find matching FAQ response based on user query
 * Uses keyword matching with similarity scoring
 */
export function findMatchingFAQ(userQuery: string): FAQItem | null {
  const query = userQuery.toLowerCase();
  
  let bestMatch: FAQItem | null = null;
  let bestScore = 0;

  for (const faq of faqDatabase) {
    let score = 0;

    // Check keyword matches
    for (const keyword of faq.keywords) {
      if (query.includes(keyword)) {
        score += 10; // Exact keyword match
      } else if (keyword.split(' ').some(word => query.includes(word))) {
        score += 5; // Partial keyword match
      }
    }

    // Check question match
    const questionWords = faq.question.toLowerCase().split(' ');
    for (const word of questionWords) {
      if (word.length > 3 && query.includes(word)) {
        score += 3;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  // Only return match if score is above threshold
  return bestScore > 0 ? bestMatch : null;
}
