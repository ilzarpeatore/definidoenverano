import { useEffect } from 'react';
import { initializeGA, trackScrollDepth, trackTimeOnPage, trackTrafficSource } from '@/lib/analytics';

interface AnalyticsProviderProps {
  measurementId: string;
  children: React.ReactNode;
}

export function AnalyticsProvider({ measurementId, children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Inicializar GA4
    initializeGA(measurementId);

    // Rastrear scroll depth
    const unsubscribeScroll = trackScrollDepth();

    // Rastrear tiempo en página
    const unsubscribeTime = trackTimeOnPage(window.location.pathname);

    // Rastrear fuente de tráfico
    trackTrafficSource();

    return () => {
      unsubscribeScroll?.();
      unsubscribeTime?.();
    };
  }, [measurementId]);

  return <>{children}</>;
}
