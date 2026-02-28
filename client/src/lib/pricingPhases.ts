/**
 * Pricing Phases Configuration
 * Defines the launch date and phases for dynamic pricing
 */

// Launch date: February 28, 2026 at 00:00 GMT+1 (today)
const LAUNCH_DATE = new Date('2026-02-28T00:00:00+01:00');

export interface Phase {
  name: string;
  price: number;
  durationDays: number;
  startDate: Date;
  endDate: Date;
}

export interface CurrentPhaseInfo {
  phase: Phase;
  phaseNumber: number;
  totalPhases: number;
  completionPercentage: number;
  daysElapsed: number;
  daysRemaining: number;
  nextPhase: Phase | null;
  nextPrice: number;
  daysUntilNextPrice: number;
}

// Define all phases
const PHASES: Phase[] = [
  {
    name: 'Fase de Lanzamiento',
    price: 197,
    durationDays: 15,
    startDate: new Date('2026-02-28T00:00:00+01:00'),
    endDate: new Date('2026-03-15T00:00:00+01:00'),
  },
  {
    name: 'Fase de Expansión',
    price: 247,
    durationDays: 30,
    startDate: new Date('2026-03-15T00:00:00+01:00'),
    endDate: new Date('2026-04-14T00:00:00+01:00'),
  },
  {
    name: 'Fase de Consolidación',
    price: 297,
    durationDays: 60,
    startDate: new Date('2026-04-14T00:00:00+01:00'),
    endDate: new Date('2026-06-13T00:00:00+01:00'),
  },
];

/**
 * Get current phase information based on real time
 */
export function getCurrentPhaseInfo(): CurrentPhaseInfo {
  const now = new Date();
  
  // Find current phase
  let currentPhase = PHASES[PHASES.length - 1]; // Default to last phase
  let phaseNumber = PHASES.length;
  
  for (let i = 0; i < PHASES.length; i++) {
    if (now >= PHASES[i].startDate && now < PHASES[i].endDate) {
      currentPhase = PHASES[i];
      phaseNumber = i + 1;
      break;
    }
  }
  
  // Calculate time metrics
  const daysElapsed = Math.floor(
    (now.getTime() - currentPhase.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysRemaining = Math.max(
    0,
    currentPhase.durationDays - daysElapsed
  );
  const completionPercentage = Math.min(
    100,
    Math.round((daysElapsed / currentPhase.durationDays) * 100)
  );
  
  // Get next phase info
  const nextPhaseIndex = phaseNumber < PHASES.length ? phaseNumber : -1;
  const nextPhase = nextPhaseIndex !== -1 ? PHASES[nextPhaseIndex] : null;
  const nextPrice = nextPhase ? nextPhase.price : currentPhase.price;
  const daysUntilNextPrice = daysRemaining;
  
  return {
    phase: currentPhase,
    phaseNumber,
    totalPhases: PHASES.length,
    completionPercentage,
    daysElapsed,
    daysRemaining,
    nextPhase,
    nextPrice,
    daysUntilNextPrice,
  };
}

/**
 * Get all phases for reference
 */
export function getAllPhases(): Phase[] {
  return PHASES;
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
