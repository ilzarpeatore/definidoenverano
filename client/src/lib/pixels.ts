/**
 * Retargeting Pixels
 * Facebook Pixel + Google Ads Pixel
 * Campañas de recuperación de carrito abandonado
 */

// ============================================================
// FACEBOOK PIXEL
// ============================================================

export function initFacebookPixel(pixelId: string) {
  if (typeof window === 'undefined') return;
  if ((window as any).fbq) return; // Ya inicializado

  const fbq = function (...args: any[]) {
    (fbq as any).callMethod
      ? (fbq as any).callMethod.apply(fbq, args)
      : (fbq as any).queue.push(args);
  };
  (fbq as any).push = fbq;
  (fbq as any).loaded = true;
  (fbq as any).version = '2.0';
  (fbq as any).queue = [];
  (window as any).fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  (window as any).fbq('init', pixelId);
  (window as any).fbq('track', 'PageView');
}

export function trackFBEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === 'undefined' || !(window as any).fbq) return;
  (window as any).fbq('track', eventName, params);
  console.log(`[FB Pixel] Event: ${eventName}`, params);
}

export const FB_EVENTS = {
  PAGE_VIEW: 'PageView',
  VIEW_CONTENT: 'ViewContent',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  ADD_PAYMENT_INFO: 'AddPaymentInfo',
  PURCHASE: 'Purchase',
  LEAD: 'Lead',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  CONTACT: 'Contact',
};

// Eventos específicos de Facebook
export function fbTrackViewContent() {
  trackFBEvent(FB_EVENTS.VIEW_CONTENT, {
    content_name: 'Definido en Verano - Programa 12 Semanas',
    content_category: 'Fitness',
    value: 197,
    currency: 'EUR',
  });
}

export function fbTrackInitiateCheckout() {
  trackFBEvent(FB_EVENTS.INITIATE_CHECKOUT, {
    content_name: 'Definido en Verano',
    value: 197,
    currency: 'EUR',
    num_items: 1,
  });
}

export function fbTrackPurchase(orderId: string, amount: number) {
  trackFBEvent(FB_EVENTS.PURCHASE, {
    transaction_id: orderId,
    value: amount,
    currency: 'EUR',
    content_name: 'Definido en Verano',
  });
}

export function fbTrackLead(email: string) {
  trackFBEvent(FB_EVENTS.LEAD, {
    content_name: 'Assessment Completado',
    content_category: 'Lead',
    value: 0,
    currency: 'EUR',
  });
}

export function fbTrackFreeWeekSignup(email: string) {
  trackFBEvent(FB_EVENTS.LEAD, {
    content_name: 'Free Week Signup',
    content_category: 'Free Trial',
    value: 0,
    currency: 'EUR',
  });
}

export function fbTrackFreeWeekConversion(orderId: string, amount: number) {
  trackFBEvent(FB_EVENTS.PURCHASE, {
    transaction_id: orderId,
    value: amount,
    currency: 'EUR',
    content_name: 'Free Week Conversion',
  });
}

export function fbTrackLeadMagnetDownload(magnetType: string) {
  trackFBEvent(FB_EVENTS.LEAD, {
    content_name: 'Lead Magnet Download',
    content_category: magnetType,
    value: 0,
    currency: 'EUR',
  });
}

// ============================================================
// GOOGLE ADS PIXEL
// ============================================================

export function initGoogleAds(conversionId: string) {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=AW-${conversionId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  if (!(window as any).gtag) {
    const gtag = (...args: any[]) => {
      window.dataLayer.push(args);
    };
    (window as any).gtag = gtag;
  }

  (window as any).gtag('js', new Date());
  (window as any).gtag('config', `AW-${conversionId}`);
}

export function trackGoogleConversion(
  conversionId: string,
  conversionLabel: string,
  value?: number,
  currency = 'EUR'
) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'conversion', {
    send_to: `AW-${conversionId}/${conversionLabel}`,
    value: value,
    currency: currency,
  });

  console.log(`[Google Ads] Conversion tracked: AW-${conversionId}/${conversionLabel}`);
}

// ============================================================
// CARRITO ABANDONADO - RETARGETING
// ============================================================

interface AbandonedCartData {
  email?: string;
  step: 'assessment' | 'checkout';
  assessmentData?: Record<string, any>;
  timestamp: number;
}

export function saveAbandonedCartData(data: Omit<AbandonedCartData, 'timestamp'>) {
  if (typeof window === 'undefined') return;

  const cartData: AbandonedCartData = {
    ...data,
    timestamp: Date.now(),
  };

  localStorage.setItem('abandoned_cart', JSON.stringify(cartData));

  // Disparar eventos de retargeting
  if (data.step === 'checkout') {
    fbTrackInitiateCheckout();
  } else if (data.step === 'assessment') {
    fbTrackViewContent();
  }
}

export function getAbandonedCartData(): AbandonedCartData | null {
  if (typeof window === 'undefined') return null;

  const data = localStorage.getItem('abandoned_cart');
  if (!data) return null;

  try {
    const parsed = JSON.parse(data) as AbandonedCartData;
    // Expirar después de 24 horas
    if (Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('abandoned_cart');
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearAbandonedCartData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('abandoned_cart');
}

// ============================================================
// INICIALIZACIÓN COMBINADA
// ============================================================

export function initAllPixels(config: {
  ga4MeasurementId?: string;
  fbPixelId?: string;
  googleAdsConversionId?: string;
}) {
  if (config.fbPixelId) {
    initFacebookPixel(config.fbPixelId);
  }

  if (config.googleAdsConversionId) {
    initGoogleAds(config.googleAdsConversionId);
  }
}

// Tipos globales
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}
