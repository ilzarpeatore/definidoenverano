import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';

export function PricingProgressBar() {
  const { data: pricing, isLoading } = trpc.pricing.getCurrent.useQuery();
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!pricing || pricing.isLastPhase) return;

    const updateTimer = () => {
      const daysLeft = pricing.daysUntilNextPhase;
      if (daysLeft > 0) {
        setTimeLeft(`${daysLeft} día${daysLeft !== 1 ? 's' : ''}`);
      } else {
        setTimeLeft('Hoy cambia el precio');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 3600000); // Update every hour

    return () => clearInterval(interval);
  }, [pricing]);

  if (isLoading || !pricing) {
    return null;
  }

  const phaseLabels = {
    1: 'EARLY BIRD',
    2: 'FASE 2',
    3: 'PRECIO FINAL',
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-950 to-amber-900 border border-amber-700 rounded-lg p-4 space-y-3">
      {/* Phase Label */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
          {phaseLabels[pricing.currentPhase]}
        </span>
        <span className="text-2xl font-bold text-amber-400">
          €{pricing.currentPrice}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-amber-950 rounded-full h-2 overflow-hidden border border-amber-700">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300"
            style={{ width: `${pricing.progressPercentage}%` }}
          />
        </div>
        <div className="text-xs text-amber-200">
          {Math.round(pricing.progressPercentage)}% de esta fase completada
        </div>
      </div>

      {/* Urgency Message */}
      {!pricing.isLastPhase && (
        <div className="bg-amber-900/50 border border-amber-700/50 rounded p-2">
          <p className="text-sm text-amber-100">
            <span className="font-semibold text-amber-300">⚠️ En {timeLeft}:</span> El precio subirá a{' '}
            <span className="font-bold text-amber-400">€{pricing.nextPrice}</span>
          </p>
        </div>
      )}

      {pricing.isLastPhase && (
        <div className="bg-red-900/50 border border-red-700/50 rounded p-2">
          <p className="text-sm text-red-100">
            <span className="font-semibold text-red-300">🔴 Precio Final:</span> Este es el precio máximo del programa
          </p>
        </div>
      )}
    </div>
  );
}
