import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCurrentPhaseInfo, type CurrentPhaseInfo } from '@/lib/pricingPhases';

/**
 * Pricing Phase Card Component
 * Displays current pricing phase with real-time urgency indicator
 */
export default function PricingPhaseCard() {
  const [phaseInfo, setPhaseInfo] = useState<CurrentPhaseInfo | null>(null);

  useEffect(() => {
    // Get current phase info
    const info = getCurrentPhaseInfo();
    setPhaseInfo(info);

    // Update every minute to keep percentage accurate
    const interval = setInterval(() => {
      setPhaseInfo(getCurrentPhaseInfo());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!phaseInfo) {
    return null;
  }

  const { phase, completionPercentage, daysUntilNextPrice, nextPrice, phaseNumber, totalPhases } = phaseInfo;

  return (
    <motion.div
      className="relative rounded-2xl border-2 border-accent/60 bg-gradient-to-br from-orange-950 to-orange-900 p-8 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header: Phase Name and Price */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-accent/80 text-sm font-semibold mb-2">
              {phaseNumber} de {totalPhases}
            </p>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-accent">
              {phase.name}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-gray-300 text-sm mb-1">Precio actual</p>
            <p className="font-display text-4xl md:text-5xl font-bold text-accent">
              €{phase.price}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-orange-800 rounded-full overflow-hidden border border-accent/40">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-orange-400"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.8 }}
            ></motion.div>
          </div>
          <p className="text-gray-300 text-sm mt-2">
            {completionPercentage}% de esta fase completada
          </p>
        </div>

        {/* Urgency Alert */}
        <motion.div
          className="rounded-xl border border-accent/50 bg-orange-800/50 p-4 flex items-start gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-accent font-bold text-lg">
              ⏰ En {daysUntilNextPrice} días: El precio subirá a €{nextPrice}
            </p>
            <p className="text-gray-300 text-sm mt-1">
              Asegúrate de acceder al programa antes de que termine esta fase de precios especiales.
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="/assessment"
            className="inline-block w-full text-center px-6 py-3 bg-accent hover:bg-accent/90 text-black font-bold rounded-lg transition-colors btn-glow"
          >
            Acceder al Programa Ahora
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
