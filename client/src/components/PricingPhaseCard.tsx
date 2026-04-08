import { motion } from 'framer-motion';
import { AlertCircle, Calendar, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCurrentPhaseInfo, getAllPhases, type CurrentPhaseInfo, type Phase } from '@/lib/pricingPhases';

interface PricingPhaseCardProps {
  variant?: 'current' | 'next' | 'future';
}

/**
 * Pricing Phase Card Component
 * Three variants:
 * - current: Shows current phase with progress
 * - next: Shows next phase with start date
 * - future: Shows future phase with start date
 */
export default function PricingPhaseCard({ variant = 'current' }: PricingPhaseCardProps) {
  const [phaseInfo, setPhaseInfo] = useState<CurrentPhaseInfo | null>(null);
  const [allPhases, setAllPhases] = useState<Phase[]>([]);

  useEffect(() => {
    const info = getCurrentPhaseInfo();
    setPhaseInfo(info);
    setAllPhases(getAllPhases());

    const interval = setInterval(() => {
      setPhaseInfo(getCurrentPhaseInfo());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!phaseInfo || allPhases.length === 0) {
    return null;
  }

  const currentPhaseIndex = phaseInfo.phaseNumber - 1;
  const nextPhaseIndex = currentPhaseIndex + 1;
  const futurePhaseIndex = currentPhaseIndex + 2;

  // VARIANT 1: Current Phase
  if (variant === 'current') {
    const { phase, completionPercentage, daysUntilNextPrice, nextPrice } = phaseInfo;

    return (
      <motion.div
        className="border-gradient-gold-animated p-6 md:p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-slate-900 rounded-2xl"></div>
        <div className="absolute inset-0 opacity-10 rounded-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <div>
              <p className="text-white text-xs md:text-sm font-semibold mb-1 md:mb-2">
                FASE ACTUAL
              </p>
              <h3 className="font-display text-2xl md:text-4xl font-bold text-white">
                {phase.name}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-white text-xs md:text-sm mb-1">Precio</p>
              <p className="font-display text-3xl md:text-4xl font-bold text-white">
                €{phase.price}
              </p>
            </div>
          </div>

          <div className="mb-4 md:mb-6">
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden border border-accent/40">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-orange-400"
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.8 }}
              ></motion.div>
            </div>
            <p className="text-white text-xs md:text-sm mt-2">
              {completionPercentage}% completado
            </p>
          </div>

          <motion.div
            className="rounded-xl border border-accent/50 bg-blue-900/50 p-3 md:p-4 flex items-start gap-2 md:gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold text-sm md:text-lg">
                ⏰ En {daysUntilNextPrice} días: €{nextPrice}
              </p>
              <p className="text-white text-xs md:text-sm mt-1">
                El precio subirá en {daysUntilNextPrice} días
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // VARIANT 2: Next Phase
  if (variant === 'next' && nextPhaseIndex < allPhases.length) {
    const nextPhase = allPhases[nextPhaseIndex];
    const currentPhase = allPhases[currentPhaseIndex];
    const priceIncrease = nextPhase.price - currentPhase.price;

    return (
      <motion.div
        className="border-gradient-gold-animated p-6 md:p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-slate-900 rounded-2xl"></div>
        <div className="absolute inset-0 opacity-10 rounded-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <div>
              <p className="text-white text-xs md:text-sm font-semibold mb-1 md:mb-2">
                PRÓXIMA FASE
              </p>
              <h3 className="font-display text-2xl md:text-4xl font-bold text-white">
                {nextPhase.name}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-white text-xs md:text-sm mb-1">Nuevo precio</p>
              <p className="font-display text-3xl md:text-4xl font-bold text-white">
                €{nextPhase.price}
              </p>
            </div>
          </div>

          <motion.div
            className="rounded-xl border border-accent/50 bg-blue-900/50 p-3 md:p-4 flex items-start gap-2 md:gap-3 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold text-sm md:text-lg">
                📅 Comienza: {nextPhase.startDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}
              </p>
              <p className="text-white text-xs md:text-sm mt-1">
                Duración: {nextPhase.durationDays} días
              </p>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border border-accent/50 bg-blue-900/50 p-3 md:p-4 flex items-start gap-2 md:gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold text-sm md:text-lg">
                📈 Aumento: +€{priceIncrease}
              </p>
              <p className="text-white text-xs md:text-sm mt-1">
                De €{currentPhase.price} a €{nextPhase.price}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // VARIANT 3: Future Phase
  if (variant === 'future' && futurePhaseIndex < allPhases.length) {
    const futurePhase = allPhases[futurePhaseIndex];
    const previousPhase = allPhases[futurePhaseIndex - 1];
    const priceIncrease = futurePhase.price - previousPhase.price;

    return (
      <motion.div
        className="border-gradient-gold-animated p-6 md:p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-slate-900 rounded-2xl"></div>
        <div className="absolute inset-0 opacity-10 rounded-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <div>
              <p className="text-white text-xs md:text-sm font-semibold mb-1 md:mb-2">
                FASE FINAL
              </p>
              <h3 className="font-display text-2xl md:text-4xl font-bold text-white">
                {futurePhase.name}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-white text-xs md:text-sm mb-1">Precio</p>
              <p className="font-display text-3xl md:text-4xl font-bold text-white">
                €{futurePhase.price}
              </p>
            </div>
          </div>

          <motion.div
            className="rounded-xl border border-accent/50 bg-blue-900/50 p-3 md:p-4 flex items-start gap-2 md:gap-3 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold text-sm md:text-lg">
                📅 Comienza: {futurePhase.startDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}
              </p>
              <p className="text-white text-xs md:text-sm mt-1">
                Duración: {futurePhase.durationDays} días
              </p>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border border-accent/50 bg-blue-900/50 p-3 md:p-4 flex items-start gap-2 md:gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold text-sm md:text-lg">
                📈 Aumento: +€{priceIncrease}
              </p>
              <p className="text-white text-xs md:text-sm mt-1">
                De €{previousPhase.price} a €{futurePhase.price}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return null;
}
