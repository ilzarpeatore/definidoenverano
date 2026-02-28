/**
 * Dynamic Pricing Service
 * Calculates current price based on launch date and phase
 * 
 * Launch Date: March 1, 2026
 * Phase 1 (Days 1-14): €197
 * Phase 2 (Days 15-28): €247
 * Phase 3 (Day 29+): €297
 */

export interface PricingPhase {
  phase: 1 | 2 | 3;
  price: number;
  startDay: number;
  endDay: number | null;
  daysUntilNextPhase: number;
  progressPercentage: number;
}

const LAUNCH_DATE = new Date('2026-03-01T00:00:00Z');

interface Phase {
  phase: 1 | 2 | 3;
  price: number;
  startDay: number;
  endDay: number | null;
}

const PRICING_PHASES: Phase[] = [
  { phase: 1, price: 197, startDay: 1, endDay: 14 },
  { phase: 2, price: 247, startDay: 15, endDay: 28 },
  { phase: 3, price: 297, startDay: 29, endDay: null },
];

export function getCurrentPricingPhase(): PricingPhase {
  const now = new Date();
  const daysSinceLaunch = Math.floor((now.getTime() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  let currentPhase: Phase = PRICING_PHASES[2]; // Default to phase 3
  for (const phase of PRICING_PHASES) {
    if (phase.endDay === null || daysSinceLaunch <= phase.endDay) {
      currentPhase = phase;
      break;
    }
  }

  const daysUntilNextPhase = currentPhase.endDay ? currentPhase.endDay - daysSinceLaunch + 1 : 0;
  const phaseDuration = currentPhase.endDay ? currentPhase.endDay - currentPhase.startDay + 1 : 14;
  const daysInPhase = daysSinceLaunch - currentPhase.startDay + 1;
  const progressPercentage = Math.min(100, Math.max(0, (daysInPhase / phaseDuration) * 100));

  return {
    phase: currentPhase.phase,
    price: currentPhase.price,
    startDay: currentPhase.startDay,
    endDay: currentPhase.endDay,
    daysUntilNextPhase: Math.max(0, daysUntilNextPhase),
    progressPercentage,
  };
}

export function getNextPhasePrice(): number | null {
  const current = getCurrentPricingPhase();
  const nextPhaseIndex = PRICING_PHASES.findIndex(p => p.phase === current.phase) + 1;
  
  if (nextPhaseIndex < PRICING_PHASES.length) {
    return PRICING_PHASES[nextPhaseIndex].price;
  }
  
  return null;
}

export function getPricingInfo() {
  const current = getCurrentPricingPhase();
  const nextPrice = getNextPhasePrice();

  return {
    currentPrice: current.price,
    currentPhase: current.phase,
    daysUntilNextPhase: current.daysUntilNextPhase,
    nextPrice,
    progressPercentage: current.progressPercentage,
    isLastPhase: current.phase === 3,
  };
}
