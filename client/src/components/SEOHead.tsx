/**
 * SEO Head Component
 * Centraliza meta tags y schema.org para fácil mantenimiento
 * Optimizado para: reset.bestronger.es - Eliminación de Dolor Lumbar y Cervical
 */

export const SEO_CONFIG = {
  siteName: 'Método RESET - Elimina Dolor Lumbar y Cervical',
  siteUrl: 'https://reset.bestronger.es',
  description: 'Elimina tu dolor lumbar y cervical en 6 semanas. Método RESET: solución neurocientífica para hombres ocupados. 250+ transformaciones, 4.9★ calificación, 92% satisfacción. Garantía 100% devoluciones.',
  keywords: 'dolor lumbar, dolor cervical, dolor de espalda, eliminar dolor lumbar, método RESET, neuromúsculo, fisioterapia, recuperación dolor, ejercicios dolor lumbar, tratamiento dolor espalda, hombres ocupados, dolor crónico, alivio dolor espalda',
  ogImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/reset-hero-office-pain-clean-NRUMY2ySB3DiMCxZnXSUFH.webp',
  twitterHandle: '@metodoreset',
  socialLinks: {
    instagram: 'https://www.instagram.com/metodoreset',
    facebook: 'https://www.facebook.com/metodoreset',
    whatsapp: 'https://wa.me/34666777888',
  },
};

export const generateSchemaProduct = () => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Método RESET - Programa de Eliminación de Dolor Lumbar',
  description: 'Programa de 6 semanas para eliminar dolor lumbar y cervical mediante reprogramación neuromuscular. Solución científica para hombres ocupados.',
  brand: {
    '@type': 'Brand',
    name: 'Método RESET by BeStronger',
  },
  offers: {
    '@type': 'Offer',
    price: '197',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: 'https://reset.bestronger.es',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '247',
    bestRating: '5',
    worstRating: '1',
  },
  review: {
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
    },
    author: {
      '@type': 'Person',
      name: 'Cliente verificado',
    },
    reviewBody: 'Reduje mi dolor lumbar en un 70% en 6 semanas. Excelente programa.',
  },
});

export const generateSchemaOrganization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Método RESET by BeStronger',
  url: SEO_CONFIG.siteUrl,
  logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/reset-logo-updated-3ztMhkLcMExCNVFPJeuu3u.png',
  description: 'Solución neurocientífica para eliminar dolor lumbar y cervical en 6 semanas.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    telephone: '+34-666-777-888',
    contactOption: 'TollFree',
  },
  sameAs: [
    SEO_CONFIG.socialLinks.instagram,
    SEO_CONFIG.socialLinks.facebook,
    SEO_CONFIG.socialLinks.whatsapp,
  ],
});

export const generateSchemaFAQ = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tarda en desaparecer el dolor lumbar con Método RESET?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La mayoría de usuarios reportan reducción del 70% en 6 semanas. Algunos notan mejoras en 2-3 semanas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Es Método RESET efectivo para dolor cervical?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El programa aborda ambas zonas: lumbar y cervical. Utiliza reprogramación neuromuscular basada en ciencia.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa si no veo resultados en 3 semanas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Garantía 100%: Si no reduces tu dolor en 50% en 3 semanas, devolución completa sin preguntas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usar Método RESET si trabajo en oficina?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Perfectamente. El programa está diseñado específicamente para hombres ocupados que pasan 8+ horas en el escritorio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito equipamiento especial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Puedes hacer los ejercicios en casa, en la oficina o en el gym. Algunos ejercicios usan tu propio peso corporal.',
      },
    },
  ],
});

export const generateSchemaLocalBusiness = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Método RESET by BeStronger',
  image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663378157518/AekyKHQG93WNj9axqr5o89/reset-logo-updated-3ztMhkLcMExCNVFPJeuu3u.png',
  description: 'Programa de eliminación de dolor lumbar y cervical mediante reprogramación neuromuscular.',
  url: SEO_CONFIG.siteUrl,
  telephone: '+34-666-777-888',
  priceRange: '€€',
  areaServed: {
    '@type': 'Country',
    name: 'ES',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    telephone: '+34-666-777-888',
    email: 'contacto@bestronger.es',
  },
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
