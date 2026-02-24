/**
 * SEO Head Component
 * Centraliza meta tags y schema.org para fácil mantenimiento
 */

export const SEO_CONFIG = {
  siteName: 'Definido en Verano',
  siteUrl: 'https://definidoenverano.com',
  description: 'Transforma tu cuerpo en 12 semanas sin dietas restrictivas. Programa de entrenamiento inteligente para hombres ocupados con poco tiempo. Acceso a app propia, coaching personalizado y comunidad privada.',
  keywords: 'programa entrenamiento, fitness hombres, transformación corporal, definición muscular, entrenamiento 12 semanas, coaching fitness',
  ogImage: 'https://cdn.example.com/og-image.jpg',
  twitterHandle: '@definidoenverano',
  socialLinks: {
    instagram: 'https://www.instagram.com/definidoenverano',
    facebook: 'https://www.facebook.com/definidoenverano',
    youtube: 'https://www.youtube.com/@definidoenverano',
  },
};

export const generateSchemaProduct = () => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Definido en Verano',
  description: 'Programa de transformación corporal en 12 semanas para hombres ocupados',
  brand: {
    '@type': 'Brand',
    name: 'Definido en Verano',
  },
  offers: {
    '@type': 'Offer',
    price: '197',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '247',
  },
});

export const generateSchemaOrganization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Definido en Verano',
  url: SEO_CONFIG.siteUrl,
  logo: 'https://cdn.example.com/logo.png',
  sameAs: [
    SEO_CONFIG.socialLinks.instagram,
    SEO_CONFIG.socialLinks.facebook,
    SEO_CONFIG.socialLinks.youtube,
  ],
});

export const generateSchemaFAQ = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo dura el programa Definido en Verano?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El programa dura 12 semanas, pero tienes acceso de por vida a todos los materiales, actualizaciones y la app.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito experiencia previa en el gym?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. El programa está diseñado para todos los niveles, desde principiantes hasta avanzados. Cada ejercicio tiene modificaciones.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Es necesaria una dieta restrictiva?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. La nutrición en Definido en Verano es simplificada y flexible. Aprendes reglas claras que puedes seguir de por vida.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo debo entrenar por día?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Entre 45-60 minutos, 4-5 días por semana. Diseñado para hombres ocupados con poco tiempo disponible.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Hay garantía de dinero de vuelta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Ofrecemos garantía de 30 días sin preguntas. Si no estás satisfecho, te devolvemos tu dinero.',
      },
    },
  ],
});
