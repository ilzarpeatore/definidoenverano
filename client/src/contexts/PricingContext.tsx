import React, { createContext, useContext, useEffect, useState } from 'react';
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

interface PricingContextType {
  pricing: PricingData;
  refetch: () => void;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

const DEFAULT_PRICING: PricingData = {
  currentPrice: 197,
  nextPrice: 247,
  currentPhase: 1,
  daysUntilNextPhase: 14,
  progressPercentage: 0,
  isLastPhase: false,
  isLoading: true,
  error: null,
};

/**
 * PricingProvider - Proporciona estado global de precios sincronizado
 * Una única fuente de verdad para todos los componentes
 */
export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [pricing, setPricing] = useState<PricingData>(DEFAULT_PRICING);
  
  // Una única llamada tRPC para toda la app
  const pricingQuery = trpc.pricing.getCurrent.useQuery(undefined, {
    refetchInterval: 5 * 60 * 1000, // Refetch cada 5 minutos
    staleTime: 4 * 60 * 1000, // Considera datos frescos por 4 minutos
  });

  useEffect(() => {
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
      setPricing(newData);
    }

    if (pricingQuery.error) {
      setPricing((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Error al cargar precios',
      }));
    }

    if (pricingQuery.isLoading) {
      setPricing((prev) => ({
        ...prev,
        isLoading: true,
      }));
    }
  }, [pricingQuery.data, pricingQuery.error, pricingQuery.isLoading]);

  const refetch = () => {
    pricingQuery.refetch();
  };

  return (
    <PricingContext.Provider value={{ pricing, refetch }}>
      {children}
    </PricingContext.Provider>
  );
}

/**
 * Hook para acceder a los precios globales
 * Todos los componentes que usen este hook reciben la misma instancia
 */
export function usePricing(): PricingData {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing debe usarse dentro de PricingProvider');
  }
  return context.pricing;
}

/**
 * Hook para refetch manual de precios
 */
export function usePricingRefetch() {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricingRefetch debe usarse dentro de PricingProvider');
  }
  return context.refetch;
}
