import { useEffect, useState } from 'react';

export type ABTestVariant = 'control' | 'variant';

interface ABTestConfig {
  testName: string;
  variants: ABTestVariant[];
  splitPercentage?: number; // percentage for variant (default 50)
}

/**
 * Hook para A/B testing
 * Asigna variante aleatoria y la persiste en localStorage
 * Trackea eventos de conversión
 */
export const useABTest = (config: ABTestConfig) => {
  const [variant, setVariant] = useState<ABTestVariant>('control');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storageKey = `ab_test_${config.testName}`;
    const stored = localStorage.getItem(storageKey);

    if (stored && config.variants.includes(stored as ABTestVariant)) {
      setVariant(stored as ABTestVariant);
    } else {
      // Asignar nueva variante aleatoria
      const splitPercentage = config.splitPercentage || 50;
      const random = Math.random() * 100;
      const newVariant = random < splitPercentage ? 'variant' : 'control';
      
      setVariant(newVariant);
      localStorage.setItem(storageKey, newVariant);
    }

    setIsLoading(false);
  }, [config.testName, config.variants, config.splitPercentage]);

  const trackConversion = (eventName: string, value?: number) => {
    const eventData = {
      event: `ab_test_conversion_${config.testName}`,
      test_name: config.testName,
      variant,
      conversion_event: eventName,
      value: value || 0,
      timestamp: new Date().toISOString(),
    };

    // Enviar a analytics
    if (window.gtag) {
      window.gtag('event', eventData.event, {
        test_name: config.testName,
        variant,
        conversion_event: eventName,
        value: value || 0,
      });
    }

    // Guardar en localStorage para análisis posterior
    const conversionsKey = `ab_conversions_${config.testName}`;
    const existing = JSON.parse(localStorage.getItem(conversionsKey) || '[]');
    existing.push(eventData);
    localStorage.setItem(conversionsKey, JSON.stringify(existing));

    console.log('[A/B Test]', eventData);
  };

  return {
    variant,
    isLoading,
    trackConversion,
    isControl: variant === 'control',
    isVariant: variant === 'variant',
  };
};
