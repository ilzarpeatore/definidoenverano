import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';

export interface PricingData {
  currentPrice: number;
  nextPrice: number | null;
  currentPhase: 1 | 2 | 3;
  daysUntilNextPhase: number;
  progressPercentage: number;
  isLastPhase: boolean;
  isLoading: boolean;
  error: string | null;
}

const CACHE_KEY = 'pricing_sync_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

/**
 * Hook para sincronizar precios dinámicamente según la fase actual
 * Se actualiza cada 5 minutos y cachea en localStorage
 */
export function usePricingSync(): PricingData {
  const [pricingData, setPricingData] = useState<PricingData>({
    currentPrice: 197,
    nextPrice: 247,
    currentPhase: 1,
    daysUntilNextPhase: 14,
    progressPercentage: 0,
    isLastPhase: false,
    isLoading: true,
    error: null,
  });

  const pricingQuery = trpc.pricing.getCurrent.useQuery(undefined, {
    refetchInterval: 5 * 60 * 1000, // Refetch cada 5 minutos
    staleTime: 4 * 60 * 1000, // Considera datos frescos por 4 minutos
  });

  useEffect(() => {
    // Intentar cargar del cache primero
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        const now = Date.now();
        
        // Si el cache es reciente, usarlo
        if (now - parsed.timestamp < CACHE_DURATION) {
          setPricingData({
            ...parsed.data,
            isLoading: false,
          });
          return;
        }
      } catch (e) {
        console.error('[PricingSync] Error parsing cache:', e);
      }
    }

    // Si hay datos de la query, usarlos
    if (pricingQuery.data) {
      const newData: PricingData = {
        currentPrice: pricingQuery.data.currentPrice,
        nextPrice: pricingQuery.data.nextPrice,
        currentPhase: pricingQuery.data.currentPhase,
        daysUntilNextPhase: pricingQuery.data.daysUntilNextPhase,
        progressPercentage: pricingQuery.data.progressPercentage,
        isLastPhase: pricingQuery.data.isLastPhase,
        isLoading: false,
        error: null,
      };

      setPricingData(newData);

      // Guardar en cache
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: newData,
            timestamp: Date.now(),
          })
        );
      } catch (e) {
        console.error('[PricingSync] Error saving to cache:', e);
      }
    }

    // Manejar errores
    if (pricingQuery.error) {
      setPricingData((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Error al cargar precios',
      }));
    }

    // Actualizar loading state
    if (pricingQuery.isLoading) {
      setPricingData((prev) => ({
        ...prev,
        isLoading: true,
      }));
    }
  }, [pricingQuery.data, pricingQuery.error, pricingQuery.isLoading]);

  return pricingData;
}

/**
 * Hook para obtener solo el precio actual
 */
export function useCurrentPrice(): number {
  const { currentPrice } = usePricingSync();
  return currentPrice;
}

/**
 * Hook para obtener información de la fase actual
 */
export function useCurrentPhaseInfo() {
  const { currentPhase, nextPrice, daysUntilNextPhase, isLastPhase } = usePricingSync();
  return { currentPhase, nextPrice, daysUntilNextPhase, isLastPhase };
}
