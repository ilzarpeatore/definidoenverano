/**
 * Google Analytics 4 Configuration
 * Eventos de conversión, scroll depth, tiempo en página, fuente de tráfico
 */

// Tipos de eventos
export const GA_EVENTS = {
  // Página vistas
  PAGE_VIEW: 'page_view',
  
  // Assessment
  ASSESSMENT_STARTED: 'assessment_started',
  ASSESSMENT_COMPLETED: 'assessment_completed',
  ASSESSMENT_ABANDONED: 'assessment_abandoned',
  
  // Checkout
  CHECKOUT_STARTED: 'checkout_started',
  CHECKOUT_COMPLETED: 'checkout_completed',
  CHECKOUT_ABANDONED: 'checkout_abandoned',
  
  // Pagos
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_COMPLETED: 'payment_completed',
  PAYMENT_FAILED: 'payment_failed',
  
  // Interacciones
  CTA_CLICKED: 'cta_clicked',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  VIDEO_PLAYED: 'video_played',
  TESTIMONIAL_VIEWED: 'testimonial_viewed',
  
  // Errores
  ERROR_OCCURRED: 'error_occurred',
};

// Inicializar Google Analytics
export function initializeGA(measurementId: string) {
  if (typeof window === 'undefined') return;

  // Cargar script de GA4
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Configurar gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', measurementId, {
    'anonymize_ip': true,
    'allow_google_signals': true,
    'allow_ad_personalization_signals': true,
  });

  (window as any).gtag = gtag;
}

// Enviar evento a GA4
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', eventName, {
    ...eventParams,
    'timestamp': new Date().toISOString(),
  });

  console.log(`[GA4] Event tracked: ${eventName}`, eventParams);
}

// Rastrear scroll depth
export function trackScrollDepth() {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const trackScroll = () => {
    const scrollPercentage = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    if (scrollPercentage > maxScroll) {
      maxScroll = scrollPercentage;

      // Rastrear en hitos: 25%, 50%, 75%, 100%
      if ([25, 50, 75, 100].includes(maxScroll)) {
        trackEvent(GA_EVENTS.SCROLL_DEPTH, {
          'scroll_percentage': maxScroll,
        });
      }
    }
  };

  window.addEventListener('scroll', trackScroll, { passive: true });
  return () => window.removeEventListener('scroll', trackScroll);
}

// Rastrear tiempo en página
export function trackTimeOnPage(pageName: string) {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();

  return () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000); // en segundos
    trackEvent(GA_EVENTS.TIME_ON_PAGE, {
      'page_name': pageName,
      'time_seconds': timeOnPage,
    });
  };
}

// Rastrear fuente de tráfico
export function trackTrafficSource() {
  if (typeof window === 'undefined') return;

  const referrer = document.referrer || 'direct';
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('utm_source') || 'organic';
  const medium = urlParams.get('utm_medium') || 'direct';
  const campaign = urlParams.get('utm_campaign') || 'none';

  trackEvent('traffic_source', {
    'referrer': referrer,
    'utm_source': source,
    'utm_medium': medium,
    'utm_campaign': campaign,
  });
}

// Rastrear conversión de assessment
export function trackAssessmentCompleted(assessmentData: Record<string, any>) {
  trackEvent(GA_EVENTS.ASSESSMENT_COMPLETED, {
    'pain_level': assessmentData.painLevel,
    'pain_type': assessmentData.painType,
    'duration': assessmentData.duration,
    'value': 0,
  });
  
  const funnelData = JSON.parse(localStorage.getItem('conversion_funnel') || '{}');
  funnelData.assessment_completed = new Date().toISOString();
  localStorage.setItem('conversion_funnel', JSON.stringify(funnelData));
}

// Rastrear conversión de pago
export function trackPaymentCompleted(orderData: Record<string, any>) {
  trackEvent(GA_EVENTS.PAYMENT_COMPLETED, {
    'transaction_id': orderData.orderId,
    'value': (orderData.amount || 0) / 100,
    'currency': 'EUR',
    'payment_method': orderData.paymentMethod,
  });
  
  const funnelData = JSON.parse(localStorage.getItem('conversion_funnel') || '{}');
  funnelData.payment_completed = new Date().toISOString();
  funnelData.revenue = (orderData.amount || 0) / 100;
  localStorage.setItem('conversion_funnel', JSON.stringify(funnelData));
  
  if ((window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      value: (orderData.amount || 0) / 100,
      currency: 'EUR',
    });
  }
}

// Rastrear CTA clicks
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent(GA_EVENTS.CTA_CLICKED, {
    'cta_name': ctaName,
    'location': location,
  });
  
  const funnelData = JSON.parse(localStorage.getItem('conversion_funnel') || '{}');
  funnelData.cta_clicks = (funnelData.cta_clicks || 0) + 1;
  funnelData.last_cta_click = new Date().toISOString();
  localStorage.setItem('conversion_funnel', JSON.stringify(funnelData));
}

// Rastrear video play
export function trackVideoPlay(videoName: string) {
  trackEvent(GA_EVENTS.VIDEO_PLAYED, {
    'video_name': videoName,
  });
}

// Rastrear testimonial view
export function trackTestimonialView(testimonialAuthor: string) {
  trackEvent(GA_EVENTS.TESTIMONIAL_VIEWED, {
    'author': testimonialAuthor,
  });
}

// Rastrear error
export function trackError(errorMessage: string, errorContext?: string) {
  trackEvent(GA_EVENTS.ERROR_OCCURRED, {
    'error_message': errorMessage,
    'error_context': errorContext,
  });
}

// Obtener estadísticas de funnel
export function getFunnelStats() {
  const funnelData = JSON.parse(localStorage.getItem('conversion_funnel') || '{}');
  return {
    cta_clicks: funnelData.cta_clicks || 0,
    assessment_completed: !!funnelData.assessment_completed,
    payment_completed: !!funnelData.payment_completed,
    total_revenue: funnelData.revenue || 0,
    timestamps: {
      first_cta: funnelData.first_cta_click,
      assessment: funnelData.assessment_completed,
      payment: funnelData.payment_completed,
    },
  };
}

// Limpiar datos de funnel
export function clearFunnelData() {
  localStorage.removeItem('conversion_funnel');
}

// Tipos globales
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}
