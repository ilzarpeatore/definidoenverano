import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function PosturalChecklistHome() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const checklistItems = [
    {
      id: 1,
      category: 'Cabeza y Cuello',
      item: '¿Tu cabeza está alineada con tus hombros?',
      correct: 'La cabeza debe estar directamente encima de los hombros',
      incorrect: 'Cabeza adelantada (postura de "tecladista")'
    },
    {
      id: 2,
      category: 'Cabeza y Cuello',
      item: '¿Tus hombros están relajados?',
      correct: 'Hombros bajos y relajados',
      incorrect: 'Hombros elevados o tensionados'
    },
    {
      id: 3,
      category: 'Espalda',
      item: '¿Tu espalda mantiene una curva natural?',
      correct: 'Curva natural en la zona lumbar',
      incorrect: 'Espalda muy recta o muy encorvada'
    },
    {
      id: 4,
      category: 'Espalda',
      item: '¿Tus omóplatos están alineados?',
      correct: 'Omóplatos hacia atrás y abajo',
      incorrect: 'Omóplatos hacia adelante o desalineados'
    },
    {
      id: 5,
      category: 'Zona Lumbar',
      item: '¿Sientes apoyo en la zona baja de la espalda?',
      correct: 'Apoyo natural en la curva lumbar',
      incorrect: 'Falta de apoyo o dolor'
    },
    {
      id: 6,
      category: 'Zona Lumbar',
      item: '¿Tu pelvis está neutral?',
      correct: 'Pelvis neutra, ni inclinada hacia adelante ni atrás',
      incorrect: 'Pelvis inclinada (lordosis o cifosis lumbar)'
    },
    {
      id: 7,
      category: 'Extremidades',
      item: '¿Tus brazos cuelgan naturalmente?',
      correct: 'Brazos relajados a los lados',
      incorrect: 'Brazos tensionados o adelantados'
    },
    {
      id: 8,
      category: 'Extremidades',
      item: '¿Tu peso está distribuido en ambas piernas?',
      correct: 'Peso equilibrado en ambas piernas',
      incorrect: 'Peso en una sola pierna'
    },
    {
      id: 9,
      category: 'Pies',
      item: '¿Tus pies están separados al ancho de hombros?',
      correct: 'Pies separados al ancho de hombros',
      incorrect: 'Pies muy juntos o muy separados'
    },
    {
      id: 10,
      category: 'Pies',
      item: '¿Tus pies apuntan hacia adelante?',
      correct: 'Pies paralelos, apuntando hacia adelante',
      incorrect: 'Pies girados hacia adentro o afuera'
    }
  ];

  const toggleCheck = (id: number) => {
    setCheckedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const correctPosture = checkedItems.length;
  const percentage = Math.round((correctPosture / checklistItems.length) * 100);

  const categories = Array.from(new Set(checklistItems.map(item => item.category)));

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
            Checklist: Evaluación Postural en Casa
          </h1>
          <p className="text-xl text-gray-300">
            Realiza esta evaluación en 5 minutos frente a un espejo
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Instructions */}
          <Card className="bg-slate-900/50 border-accent/20 p-6 mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent" />
              Cómo realizar esta evaluación
            </h2>
            <ol className="space-y-2 text-gray-300 text-sm">
              <li><span className="font-semibold">1.</span> Ponte de pie frente a un espejo</li>
              <li><span className="font-semibold">2.</span> Mantén una postura natural (como si estuvieras en la oficina)</li>
              <li><span className="font-semibold">3.</span> Revisa cada punto y marca si tu postura es correcta</li>
              <li><span className="font-semibold">4.</span> No fuerces una postura "perfecta", queremos tu postura real</li>
            </ol>
          </Card>

          {/* Progress */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Tu Evaluación</h3>
              <span className="text-2xl font-bold text-accent">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-accent h-3 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {correctPosture} de {checklistItems.length} puntos correctos
            </p>
          </div>

          {/* Checklist by Category */}
          <div className="space-y-8 mb-12">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-bold text-accent mb-4">{category}</h3>
                <div className="space-y-3">
                  {checklistItems
                    .filter(item => item.category === category)
                    .map((item) => (
                      <Card
                        key={item.id}
                        className={`bg-slate-900/50 border transition-colors cursor-pointer p-4 ${
                          checkedItems.includes(item.id)
                            ? 'border-green-500/40 bg-green-500/5'
                            : 'border-gray-700 hover:border-accent/40'
                        }`}
                        onClick={() => toggleCheck(item.id)}
                      >
                        <div className="flex gap-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCheck(item.id);
                            }}
                            className="flex-shrink-0 mt-1"
                          >
                            {checkedItems.includes(item.id) ? (
                              <CheckCircle2 className="w-6 h-6 text-green-400" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-600" />
                            )}
                          </button>
                          <div className="flex-1">
                            <p className="font-semibold text-white mb-2">{item.item}</p>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-green-400 font-semibold mb-1">✓ Correcto:</p>
                                <p className="text-gray-400">{item.correct}</p>
                              </div>
                              <div>
                                <p className="text-red-400 font-semibold mb-1">✗ Incorrecto:</p>
                                <p className="text-gray-400">{item.incorrect}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20 p-8 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Tu Resultado</h3>
            
            {percentage >= 80 ? (
              <div>
                <p className="text-green-400 text-lg font-semibold mb-4">
                  ✓ Tu postura es buena
                </p>
                <p className="text-gray-300 mb-6">
                  Mantén estos hábitos y continúa con ejercicios de mantenimiento. Aún así, el Método RESET puede ayudarte a optimizar tu postura y prevenir futuros problemas.
                </p>
              </div>
            ) : percentage >= 50 ? (
              <div>
                <p className="text-yellow-400 text-lg font-semibold mb-4">
                  ⚠️ Tu postura necesita mejoras
                </p>
                <p className="text-gray-300 mb-6">
                  Tienes varios puntos a corregir. El Método RESET está diseñado exactamente para esto: identificar y corregir desequilibrios posturales.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-red-400 text-lg font-semibold mb-4">
                  ✗ Tu postura requiere atención urgente
                </p>
                <p className="text-gray-300 mb-6">
                  Múltiples puntos de desequilibrio. Es hora de tomar acción. El Método RESET ha ayudado a miles de personas con problemas posturales similares.
                </p>
              </div>
            )}

            <Link href="/checkout">
              <a className="inline-block">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                  Comenzar Método RESET
                </Button>
              </a>
            </Link>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-400 mb-6">
              ¿Quieres una evaluación profesional personalizada?
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
