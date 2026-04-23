import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { DownloadGuideButton } from '@/components/DownloadGuideButton';



interface ProfileInfo {
  name: string;
  description: string;
  color: string;
  icon: string;
  recommendations: string[];
}

const PROFILE_INFO: Record<string, ProfileInfo> = {
  ejecutivo_atrapado: {
    name: 'Ejecutivo Atrapado',
    description: 'Tu dolor está directamente relacionado con tu estilo de vida sedentario y estrés laboral.',
    color: 'from-blue-500 to-blue-600',
    icon: '💼',
    recommendations: [
      'Implementar pausas activas cada 2 horas',
      'Mejorar la postura en el escritorio',
      'Reducir estrés con técnicas de respiración',
      'Ejercicio de fortalecimiento 3x por semana'
    ]
  },
  emprendedor_quemado: {
    name: 'Emprendedor Quemado',
    description: 'Tu cuerpo está pidiendo ayuda. El estrés y la falta de descanso están afectando tu salud.',
    color: 'from-red-500 to-red-600',
    icon: '🔥',
    recommendations: [
      'Urgente: Establecer límites de trabajo',
      'Programa de recuperación intensiva',
      'Consulta con especialista recomendada',
      'Integrar movimiento en tu rutina diaria'
    ]
  },
  atleta_lesionado: {
    name: 'Atleta Lesionado',
    description: 'Tu lesión requiere un enfoque específico de rehabilitación y fortalecimiento.',
    color: 'from-orange-500 to-orange-600',
    icon: '⚡',
    recommendations: [
      'Rehabilitación progresiva personalizada',
      'Fortalecimiento específico de la zona afectada',
      'Vuelta gradual a la actividad física',
      'Seguimiento periódico del progreso'
    ]
  },
  recien_diagnosticado: {
    name: 'Recién Diagnosticado',
    description: 'Estás en las primeras etapas. Ahora es el momento perfecto para actuar.',
    color: 'from-green-500 to-green-600',
    icon: '🌱',
    recommendations: [
      'Empezar con ejercicios básicos de movilidad',
      'Identificar y eliminar factores de riesgo',
      'Crear una rutina de prevención',
      'Educación sobre postura y movimiento'
    ]
  }
};

export default function QuizResults() {
  const [quizId, setQuizId] = useState<number | null>(null);

  useEffect(() => {
    try {
      // Extract query string from window.location
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      
      if (id && !isNaN(parseInt(id))) {
        setQuizId(parseInt(id));
      } else {
        console.error('Invalid or missing quiz ID in URL:', id);
      }
    } catch (error) {
      console.error('Error parsing quiz ID from URL:', error);
    }
  }, []);

  const { data: results, isLoading, error } = trpc.quiz.getResults.useQuery(
    { quizId: quizId! },
    { enabled: quizId !== null }
  );

  if (quizId === null) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-accent" />
          <p className="text-gray-400">Cargando tu reporte personalizado...</p>
        </div>
      </div>
    );
  }

  if (!quizId || quizId === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Quiz no encontrado</h1>
          <p className="text-gray-400 mb-4">No pudimos encontrar tu evaluación. ID inválido.</p>
          <Button onClick={() => window.location.href = '/quiz'}>
            Volver al Quiz
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-accent" />
          <p className="text-gray-400">Cargando tu reporte personalizado...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Error al cargar resultados</h1>
          <p className="text-gray-400 mb-4">{error?.message || 'Algo salió mal'}</p>
          <Button onClick={() => window.location.href = '/quiz'}>
            Volver al Quiz
          </Button>
        </div>
      </div>
    );
  }

  const profile = PROFILE_INFO[results.profile] || PROFILE_INFO.recien_diagnosticado;
  const severityLabel = results.severity <= 3 ? 'Leve' : results.severity <= 6 ? 'Moderado' : 'Severo';
  const severityColor = results.severity <= 3 ? 'text-green-400' : results.severity <= 6 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tu Reporte Personalizado</h1>
          <p className="text-gray-400 text-lg">Basado en tu evaluación de {results.totalScore} puntos</p>
        </div>

        {/* Profile Card */}
        <div className={`bg-gradient-to-r ${profile.color} rounded-lg p-8 mb-8 text-white shadow-lg`}>
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">{profile.icon}</span>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
              <p className="text-white/90">{profile.description}</p>
            </div>
          </div>

          {/* Severity Indicator */}
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">Nivel de Severidad</p>
                <p className={`text-2xl font-bold ${severityColor}`}>{severityLabel}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/80 mb-1">Puntuación</p>
                <p className="text-2xl font-bold">{results.severity}/10</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="card-glass border border-border rounded-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-accent" />
            <h3 className="text-2xl font-bold">Recomendaciones para ti</h3>
          </div>

          <div className="space-y-3">
            {profile.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-300 mb-2">{rec}</p>
                  {quizId && (
                    <DownloadGuideButton
                      quizId={quizId}
                      resourceType={`rec_${idx}`}
                      resourceName="Guía"
                      className="text-sm py-1 px-3 h-auto"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Info */}
        <div className="card-glass border border-border rounded-lg p-8 mb-8">
          <h3 className="text-xl font-bold mb-4">Tu Información</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Nombre</p>
              <p className="text-white">{results.firstName} {results.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p className="text-white">{results.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Fecha de Evaluación</p>
              <p className="text-white">
                {new Date(results.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Perfil</p>
              <p className="text-white">{profile.name}</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="card-glass border border-border rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">¿Listo para transformar tu salud?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            El Método RESET está diseñado específicamente para personas como tú. Acceso inmediato a tu programa personalizado, ejercicios, y seguimiento continuo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="flex-1 sm:flex-none"
            >
              Volver al Inicio
            </Button>
            <Button
              onClick={() => window.location.href = '/price'}
              className="flex-1 sm:flex-none bg-gradient-to-r from-accent to-green-500 hover:from-accent/90 hover:to-green-500/90"
            >
              Ver Planes y Precios
            </Button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Este reporte es una evaluación inicial. Para un diagnóstico completo, consulta con un profesional de salud.
          </p>
        </div>
      </div>
    </div>
  );
}
