import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calculator, TrendingDown } from 'lucide-react';
import { Link } from 'wouter';
import { useCurrentPrice } from '@/hooks/usePricingSync';

export default function CostCalculator() {
  const [yearsOfPain, setYearsOfPain] = useState(3);
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [workDaysLost, setWorkDaysLost] = useState(8);
  const currentPrice = useCurrentPrice();

  // Cálculos más realistas
  // Pérdida de productividad: €25-50/día (reducción de rendimiento, no día completo perdido)
  const costPerDay = 35; 
  // Costo por día de trabajo completamente perdido: €80-120 (salario promedio)
  const costPerDayLostWork = 100; 
  // Tratamientos médicos: €200-300/año (fisioterapia ocasional, medicinas)
  const medicalCosts = 250 * yearsOfPain; 
  
  const painDaysPerYear = daysPerWeek * 52;
  const totalPainDays = painDaysPerYear * yearsOfPain;
  const costFromPain = totalPainDays * costPerDay;
  const costFromLostWork = workDaysLost * costPerDayLostWork;
  const totalCost = costFromPain + costFromLostWork + medicalCosts;

  const resetCost = currentPrice; // Costo del programa RESET (dinámico)
  const savings = totalCost - resetCost;
  const roi = ((savings / resetCost) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900 to-background py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </a>
          </Link>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4 font-bold">
            Calculadora: Costo del Dolor Lumbar
          </h1>
          <p className="text-xl text-gray-300">
            Descubre cuánto te cuesta realmente no tratar tu dolor lumbar
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Calculator Card */}
          <Card className="bg-slate-900/50 border-accent/20 p-8 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-white">Calcula tu costo</h2>
            </div>

            {/* Input Controls */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Años de dolor */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  ¿Cuántos años llevas con dolor?
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={yearsOfPain}
                  onChange={(e) => setYearsOfPain(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-2xl font-bold text-accent mt-2">{yearsOfPain} años</div>
              </div>

              {/* Días de dolor por semana */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  ¿Cuántos días por semana tienes dolor?
                </label>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-2xl font-bold text-accent mt-2">{daysPerWeek} días/semana</div>
              </div>

              {/* Días de trabajo perdidos */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  ¿Cuántos días de trabajo has perdido?
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={workDaysLost}
                  onChange={(e) => setWorkDaysLost(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-2xl font-bold text-accent mt-2">{workDaysLost} días</div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-gray-300 mb-6">Desglose de costos</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Pérdida de productividad:</span>
                  <span className="text-xl font-bold text-red-400">€{costFromPain.toLocaleString('es-ES')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Días de trabajo perdidos:</span>
                  <span className="text-xl font-bold text-red-400">€{costFromLostWork.toLocaleString('es-ES')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Tratamientos médicos:</span>
                  <span className="text-xl font-bold text-red-400">€{medicalCosts.toLocaleString('es-ES')}</span>
                </div>
              </div>

              <div className="border-t border-red-500/20 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-white">Costo total:</span>
                  <span className="text-4xl font-bold text-red-400">€{totalCost.toLocaleString('es-ES')}</span>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingDown className="w-6 h-6 text-green-400" />
                    <h4 className="text-lg font-semibold text-white">Ahorro con RESET</h4>
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    €{savings.toLocaleString('es-ES')}
                  </div>
                  <p className="text-sm text-gray-300">
                    Retorno de inversión: <span className="font-bold text-green-400">{roi}x</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Info Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-slate-900/50 border-accent/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">¿Por qué estos costos?</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Pérdida de productividad: €35/día (reducción de rendimiento)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Días de trabajo perdidos: €100/día (salario promedio)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Tratamientos: €250/año (fisioterapia, medicinas)</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-slate-900/50 border-accent/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Método RESET</h3>
              <p className="text-gray-300 mb-6">
                Invierte €{currentPrice} hoy y recupera tu calidad de vida. Nuestro programa ha ayudado a miles de personas a eliminar el dolor lumbar de forma permanente.
              </p>
              <Link href="/checkout">
                <a className="inline-block">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                    Comenzar RESET Ahora
                  </Button>
                </a>
              </Link>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-400 mb-6">
              ¿Listo para dejar de pagar el costo del dolor?
            </p>
            <Link href="/quick-assessment">
              <a>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                  Realizar Valoración Gratuita
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
