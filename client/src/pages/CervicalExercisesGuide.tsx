import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Play, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function CervicalExercisesGuide() {
  const exercises = [
    {
      id: 1,
      name: 'Rotación Cervical Suave',
      duration: '30 segundos',
      reps: '10 rotaciones',
      description: 'Gira lentamente la cabeza hacia cada lado, sin forzar. Detente cuando sientas resistencia.',
      benefits: ['Aumenta movilidad', 'Reduce rigidez', 'Relaja músculos'],
      caution: 'No hagas movimientos bruscos'
    },
    {
      id: 2,
      name: 'Flexión-Extensión Cervical',
      duration: '30 segundos',
      reps: '8-10 repeticiones',
      description: 'Baja lentamente la barbilla hacia el pecho, luego mira hacia arriba. Movimiento suave y controlado.',
      benefits: ['Estira músculos frontales', 'Fortalece posteriores', 'Mejora postura'],
      caution: 'Evita movimientos rápidos'
    },
    {
      id: 3,
      name: 'Inclinación Lateral Cervical',
      duration: '30 segundos',
      reps: '8 por lado',
      description: 'Inclina la cabeza hacia cada lado, llevando la oreja hacia el hombro. Mantén los hombros relajados.',
      benefits: ['Estira trapecio', 'Reduce tensión', 'Mejora flexibilidad'],
      caution: 'No fuerces el estiramiento'
    },
    {
      id: 4,
      name: 'Retracción Cervical (Doble Barbilla)',
      duration: '45 segundos',
      reps: '12-15 repeticiones',
      description: 'Mete ligeramente la barbilla hacia atrás, como si hicieras una "doble barbilla". Mantén 2 segundos.',
      benefits: ['Fortalece cuello', 'Corrige postura', 'Previene dolor'],
      caution: 'Movimiento muy sutil'
    },
    {
      id: 5,
      name: 'Estiramiento de Trapecio Superior',
      duration: '45 segundos',
      reps: '3 series por lado',
      description: 'Inclina la cabeza hacia un lado y coloca la mano en la cabeza. Aplica presión suave.',
      benefits: ['Estira trapecio', 'Reduce tensión', 'Alivia dolor'],
      caution: 'Presión suave, sin dolor'
    },
    {
      id: 6,
      name: 'Movilización de Hombros',
      duration: '1 minuto',
      reps: '10 rotaciones',
      description: 'Sube los hombros hacia las orejas, luego baja lentamente. Luego rota hacia atrás.',
      benefits: ['Relaja hombros', 'Mejora circulación', 'Reduce tensión'],
      caution: 'Movimientos fluidos'
    }
  ];

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
            Guía: Ejercicios para Aliviar Dolor Cervical
          </h1>
          <p className="text-xl text-gray-300">
            6 ejercicios efectivos que puedes hacer en casa, en la oficina o en cualquier lugar
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Warning */}
          <Card className="bg-amber-500/10 border-amber-500/20 p-6 mb-12 flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-400 mb-2">Importante</h3>
              <p className="text-gray-300 text-sm">
                Si tienes dolor severo o has sufrido una lesión reciente, consulta con un profesional antes de hacer estos ejercicios. Estos ejercicios son para mantenimiento y prevención.
              </p>
            </div>
          </Card>

          {/* Exercises Grid */}
          <div className="space-y-6 mb-12">
            {exercises.map((exercise) => (
              <Card key={exercise.id} className="bg-slate-900/50 border-accent/20 p-8 hover:border-accent/40 transition-colors">
                <div className="flex gap-6">
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent flex items-center justify-center">
                      <span className="text-lg font-bold text-accent">{exercise.id}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{exercise.name}</h3>
                    
                    <p className="text-gray-300 mb-6">{exercise.description}</p>

                    {/* Meta Info */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{exercise.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Play className="w-4 h-4" />
                        <span>{exercise.reps}</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-400 mb-2">Beneficios:</p>
                      <div className="flex flex-wrap gap-2">
                        {exercise.benefits.map((benefit, idx) => (
                          <span key={idx} className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Caution */}
                    <div className="pt-4 border-t border-gray-700">
                      <p className="text-xs text-amber-400 font-semibold">⚠️ {exercise.caution}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Program Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-slate-900/50 border-accent/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Cómo usar esta guía</h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">1.</span>
                  <span>Haz estos ejercicios 2-3 veces al día</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">2.</span>
                  <span>Comienza lentamente, sin forzar</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">3.</span>
                  <span>Aumenta intensidad gradualmente</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">4.</span>
                  <span>Mantén consistencia durante 4 semanas</span>
                </li>
              </ol>
            </Card>

            <Card className="bg-slate-900/50 border-accent/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Método RESET Completo</h3>
              <p className="text-gray-300 mb-6">
                Estos ejercicios son efectivos, pero el Método RESET te ofrece un programa personalizado basado en tu diagnóstico específico, con seguimiento profesional y garantía de resultados.
              </p>
              <Link href="/checkout">
                <a className="inline-block">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                    Acceder a RESET
                  </Button>
                </a>
              </Link>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-400 mb-6">
              ¿Quieres un programa personalizado con seguimiento profesional?
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
