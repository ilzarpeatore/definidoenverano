import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, AlertCircle, TrendingDown } from 'lucide-react';
import { Link } from 'wouter';

interface AssessmentAnswer {
  painLocation: string;
  painDuration: string;
  painSeverity: string | number;
  dailyImpact: string;
  previousTreatments: string;
  workType?: string;
  goal?: string;
}

interface ResultData {
  score: number;
  level: 'leve' | 'moderado' | 'severo' | 'muy_severo';
  recommendations: string[];
  urgency: string;
  estimatedRecoveryTime: string;
  nextSteps: string[];
}

export default function AssessmentResults() {
  const [answers, setAnswers] = useState<AssessmentAnswer | null>(null);
  const [results, setResults] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('assessmentAnswers');
    if (stored) {
      const parsed = JSON.parse(stored);
      setAnswers(parsed);
      calculateResults(parsed);
    }
    setLoading(false);
  }, []);

  const calculateResults = (answers: AssessmentAnswer) => {
    let score = 0;
    const recommendations: string[] = [];
    let urgency = 'Moderada';
    let estimatedRecoveryTime = '6-8 semanas';

    // Calcular score basado en severidad
    const severity = parseInt(String(answers.painSeverity)) || 5;
    score += severity * 10;

    // Ajustar por duración
    if (answers.painDuration === 'more_3months') {
      score += 20;
      urgency = 'Alta';
      estimatedRecoveryTime = '8-12 semanas';
    } else if (answers.painDuration === '6_12weeks') {
      score += 15;
      urgency = 'Alta';
      estimatedRecoveryTime = '6-8 semanas';
    } else if (answers.painDuration === '2_6weeks') {
      score += 10;
      urgency = 'Moderada';
      estimatedRecoveryTime = '4-6 semanas';
    }

    // Ajustar por impacto diario
    if (answers.dailyImpact === 'severe') {
      score += 15;
    } else if (answers.dailyImpact === 'significant') {
      score += 10;
    } else if (answers.dailyImpact === 'moderate') {
      score += 5;
    }

    // Generar recomendaciones
    if (severity <= 3) {
      recommendations.push('Movimiento progresivo y estiramientos suaves');
      recommendations.push('Corrección postural en el trabajo');
    } else if (severity <= 6) {
      recommendations.push('Programa de fortalecimiento estructurado');
      recommendations.push('Evaluación profesional recomendada');
      recommendations.push('Cambios en ergonomía laboral');
    } else {
      recommendations.push('Evaluación profesional urgente');
      recommendations.push('Programa intensivo de rehabilitación');
      recommendations.push('Monitoreo constante del progreso');
    }

    if (answers.workType === 'office') {
      recommendations.push('Descansos frecuentes durante el trabajo');
      recommendations.push('Ajuste de estación de trabajo');
    }

    if (answers.previousTreatments === 'none') {
      recommendations.push('Comenzar con intervención temprana');
    }

    // Determinar nivel
    let level: 'leve' | 'moderado' | 'severo' | 'muy_severo' = 'leve';
    if (score >= 75) {
      level = 'muy_severo';
    } else if (score >= 55) {
      level = 'severo';
    } else if (score >= 35) {
      level = 'moderado';
    }

    const nextSteps = [
      'Solicitar evaluación personalizada con especialista',
      'Comenzar programa de Método RESET',
      'Implementar cambios de estilo de vida recomendados',
    ];

    setResults({
      score: Math.min(100, score),
      level,
      recommendations,
      urgency,
      estimatedRecoveryTime,
      nextSteps,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Calculando tus resultados...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No se encontraron resultados</h1>
          <Link href="/">
            <div className="text-accent hover:text-accent/80 cursor-pointer">Volver a inicio</div>
          </Link>
        </div>
      </div>
    );
  }

  const levelColors = {
    leve: 'from-green-500 to-emerald-600',
    moderado: 'from-yellow-500 to-orange-600',
    severo: 'from-orange-500 to-red-600',
    muy_severo: 'from-red-600 to-red-700',
  };

  const levelLabels = {
    leve: 'Dolor Leve',
    moderado: 'Dolor Moderado',
    severo: 'Dolor Severo',
    muy_severo: 'Dolor Muy Severo',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-background to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tus Resultados de Evaluación
          </h1>
          <p className="text-lg text-muted-foreground">
            Análisis personalizado basado en tus respuestas
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`bg-gradient-to-br ${levelColors[results.level]} rounded-lg p-8 mb-8 text-white`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Score */}
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">{results.score}</div>
              <p className="text-lg opacity-90">Puntuación de Dolor</p>
            </div>

            {/* Level */}
            <div className="text-center border-l border-r border-white/20">
              <div className="text-3xl font-bold mb-2">{levelLabels[results.level]}</div>
              <p className="text-lg opacity-90">Nivel de Severidad</p>
            </div>

            {/* Urgency */}
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">{results.urgency}</div>
              <p className="text-lg opacity-90">Nivel de Urgencia</p>
            </div>
          </div>
        </motion.div>

        {/* Recovery Time */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 mb-8 flex items-center gap-4"
        >
          <TrendingDown className="w-8 h-8 text-accent flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white mb-1">Tiempo Estimado de Recuperación</h3>
            <p className="text-muted-foreground">
              Con el programa correcto y consistencia: <span className="text-accent font-semibold">{results.estimatedRecoveryTime}</span>
            </p>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-accent" />
            Recomendaciones Personalizadas
          </h2>
          <div className="space-y-4">
            {results.recommendations.map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-white">{rec}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card border border-border rounded-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-accent" />
            Próximos Pasos
          </h2>
          <div className="space-y-4">
            {/* Step 1: Evaluación Personalizada */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold mb-2">Solicitar evaluación personalizada con especialista</p>
                <a
                  href="https://wa.me/34666777888?text=Hola%2C%20me%20gustaría%20agendar%20una%20evaluación%20personalizada%20para%20mi%20dolor%20de%20espalda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Contactar por WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Step 2: Comenzar Programa */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                2
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold mb-2">Comenzar programa de Método RESET</p>
                <a
                  href="/#pricing"
                  className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Ver Programa RESET
                </a>
              </div>
            </motion.div>

            {/* Step 3: Cambios de Estilo de Vida */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                3
              </div>
              <p className="text-white pt-1">Implementar cambios de estilo de vida recomendados</p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6">
            Basado en tu evaluación, el Método RESET está diseñado específicamente para tu caso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">Volver a Inicio</Button>
            </Link>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-12">
          Esta evaluación es orientativa y no reemplaza una evaluación profesional médica. 
          Consulta con un especialista para un diagnóstico completo.
        </p>
      </div>
    </div>
  );
}
