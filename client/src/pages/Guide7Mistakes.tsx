import { useState } from 'react';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Mistake {
  id: number;
  title: string;
  description: string;
  impact: string;
  solution: string;
}

const mistakes: Mistake[] = [
  {
    id: 1,
    title: "No tener un plan de entrenamiento estructurado",
    description: "Entrenar sin una estrategia clara: hacer ejercicios al azar, cambiar constantemente de rutina, o simplemente seguir lo que ves en redes sociales sin coherencia.",
    impact: "Progreso lento o nulo, desperdicio de tiempo, falta de motivación al no ver resultados claros.",
    solution: "Necesitas un programa progresivo que aumente gradualmente en intensidad. Debe estar diseñado específicamente para tu objetivo (hipertrofia, definición, fuerza) y adaptado a tu disponibilidad de tiempo como hombre ocupado."
  },
  {
    id: 2,
    title: "Ignorar la nutrición o hacer dietas extremas",
    description: "Pensar que solo el entrenamiento es suficiente, o hacer dietas muy restrictivas que no puedes mantener a largo plazo.",
    impact: "Imposible lograr definición sin nutrición adecuada. Las dietas extremas generan efecto rebote y pérdida de masa muscular.",
    solution: "Tu nutrición debe ser sostenible y adaptada a tu estilo de vida. No se trata de restricción extrema, sino de macros calculados inteligentemente para tu objetivo."
  },
  {
    id: 3,
    title: "Entrenar sin progresión ni seguimiento",
    description: "Hacer los mismos ejercicios con los mismos pesos semana tras semana, sin medir progreso ni ajustar variables.",
    impact: "Meseta de progreso, aburrimiento, falta de estímulo muscular para crecer o definirse.",
    solution: "Debes registrar tus entrenamientos y buscar progresión constante: más peso, más repeticiones, mejor técnica. El seguimiento es clave para mantener la motivación."
  },
  {
    id: 4,
    title: "Falta de consistencia y disciplina",
    description: "Entrenar 2 semanas intenso, luego desaparecer 1 mes. Saltarse entrenamientos por cualquier razón o no seguir el plan.",
    impact: "Pérdida de progreso acumulado, resultados nulos, frustración constante.",
    solution: "La consistencia es más importante que la intensidad. Un programa moderado que hagas 4 veces por semana durante 12 semanas supera cualquier programa extremo que abandones."
  },
  {
    id: 5,
    title: "No adaptar el programa a tu estilo de vida ocupado",
    description: "Intentar seguir programas que requieren 2 horas diarias o 6 días a la semana cuando tienes poco tiempo disponible.",
    impact: "Imposible mantener consistencia, abandono del programa, culpa y frustración.",
    solution: "Tu programa debe ser eficiente: entrenamientos de 45-60 minutos, 4 veces por semana máximo. La calidad supera la cantidad. Existen métodos científicos para maximizar resultados en poco tiempo."
  },
  {
    id: 6,
    title: "Entrenar sin técnica correcta (lesiones)",
    description: "Usar pesos muy pesados con forma incorrecta, no calentar, no hacer movilidad, ignorar el dolor.",
    impact: "Lesiones que pueden dejarte fuera semanas o meses, dolor crónico, imposibilidad de progresar.",
    solution: "La técnica correcta es fundamental. Necesitas aprender la ejecución adecuada de cada ejercicio y progresar gradualmente. Una lesión te retrasará más que entrenar con técnica perfecta."
  },
  {
    id: 7,
    title: "Falta de mentalidad y objetivos claros",
    description: "No tener claridad sobre qué quieres lograr, por qué lo quieres, o no creer realmente que es posible para ti.",
    impact: "Falta de motivación sostenida, abandono ante el primer obstáculo, resultados mediocres.",
    solution: "Define objetivos específicos y medibles. Entiende tu por qué profundo. Visualiza el resultado y cultiva la mentalidad de ganador. La transformación física comienza en la mente."
  }
];

export default function Guide7Mistakes() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#b8860b] to-[#d4af37] py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          7 Errores que Impiden tu Definición
        </h1>
        <p className="text-lg text-black/80 max-w-2xl mx-auto">
          Descubre qué está saboteando tu transformación y cómo solucionarlo
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="mb-12 p-6 bg-card border border-border rounded-lg">
          <p className="text-lg text-foreground mb-4">
            Hemos trabajado con cientos de hombres ocupados y hemos identificado los 7 errores más comunes que impiden la definición muscular. Esta guía te mostrará exactamente qué estás haciendo mal y hacia dónde dirigirte.
          </p>
          <p className="text-foreground/80">
            <strong>Nota:</strong> Esta guía te da las pistas. La solución completa está en nuestro programa, donde te enseñamos exactamente cómo implementar cada solución en tu vida.
          </p>
        </div>

        {/* Mistakes List */}
        <div className="space-y-4 mb-12">
          {mistakes.map((mistake) => (
            <div
              key={mistake.id}
              className="border border-border rounded-lg overflow-hidden bg-card hover:border-[#d4af37] transition-colors"
            >
              <button
                onClick={() => toggleExpand(mistake.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-4 text-left flex-1">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center">
                    {mistake.id}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {mistake.title}
                  </h3>
                </div>
                <ChevronDown
                  className={`flex-shrink-0 w-5 h-5 text-[#d4af37] transition-transform ${
                    expandedId === mistake.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedId === mistake.id && (
                <div className="px-6 py-4 border-t border-border bg-background/50">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#d4af37] mb-2">Descripción</h4>
                      <p className="text-foreground/90">{mistake.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-500 mb-2">⚠️ Impacto</h4>
                      <p className="text-foreground/90">{mistake.impact}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-500 mb-2">💡 Dirección de Solución</h4>
                      <p className="text-foreground/90">{mistake.solution}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA 1 - Middle */}
        <div className="mb-12 p-8 bg-gradient-to-r from-[#b8860b]/20 to-[#d4af37]/20 border border-[#d4af37] rounded-lg text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            ¿Reconoces algunos de estos errores?
          </h2>
          <p className="text-foreground/80 mb-6 max-w-xl mx-auto">
            Si identificas 3 o más de estos errores en tu rutina actual, es hora de hacer un cambio. Nuestro programa te da la solución completa y personalizada.
          </p>
          <Button
            size="lg"
            className="bg-[#d4af37] text-black hover:bg-[#b8860b] font-bold"
            onClick={() => window.location.href = '/checkout'}
          >
            Acceder al Programa <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Key Takeaways */}
        <div className="mb-12 p-6 bg-card border border-border rounded-lg">
          <h3 className="text-xl font-bold text-[#d4af37] mb-4">Puntos Clave</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#d4af37] font-bold mt-1">✓</span>
              <span className="text-foreground">La consistencia supera la intensidad</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#d4af37] font-bold mt-1">✓</span>
              <span className="text-foreground">Tu programa debe adaptarse a tu vida, no al revés</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#d4af37] font-bold mt-1">✓</span>
              <span className="text-foreground">Nutrición y entrenamiento van de la mano</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#d4af37] font-bold mt-1">✓</span>
              <span className="text-foreground">El seguimiento y la progresión son clave</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#d4af37] font-bold mt-1">✓</span>
              <span className="text-foreground">La mentalidad es el 50% del éxito</span>
            </li>
          </ul>
        </div>

        {/* Download Section */}
        <div className="mb-12 p-8 bg-card border border-border rounded-lg text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">Descarga la Guía Completa</h3>
          <p className="text-foreground/80 mb-6">
            Guarda esta guía en PDF para consultarla cuando la necesites
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
            onClick={() => window.open('https://tu-hosting.com/guia-7-errores.pdf', '_blank')}
          >
            <Download className="mr-2 w-4 h-4" />
            Descargar PDF
          </Button>
          <p className="text-sm text-foreground/60 mt-4">
            Archivo PDF de alta calidad, 100% gratuito
          </p>
        </div>

        {/* CTA 2 - Final */}
        <div className="p-8 bg-gradient-to-r from-[#d4af37] to-[#b8860b] rounded-lg text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            Estás a un paso de tu transformación
          </h2>
          <p className="text-black/80 mb-6 max-w-xl mx-auto">
            Ahora que conoces los errores, es momento de implementar las soluciones. Únete a cientos de hombres que ya están viendo resultados.
          </p>
          <Button
            size="lg"
            className="bg-black text-[#d4af37] hover:bg-black/80 font-bold"
            onClick={() => window.location.href = '/checkout'}
          >
            Comenzar Mi Transformación <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <p className="text-black/70 text-sm mt-4">
            Garantía de 30 días. Si no ves resultados, devolvemos tu dinero.
          </p>
        </div>
      </div>
    </div>
  );
}
