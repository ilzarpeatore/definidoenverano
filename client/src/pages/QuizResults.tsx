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
  recommendations: Array<{ text: string; resourceType: string }>;
}

const PROFILE_INFO: Record<string, ProfileInfo> = {
  ejecutivo_atrapado: {
    name: 'Ejecutivo Atrapado',
    description: 'Tu dolor está directamente relacionado con tu estilo de vida sedentario y estrés laboral.',
    color: 'from-blue-500 to-blue-600',
    icon: '💼',
    recommendations: [
      { text: 'Implementar pausas activas cada 2 horas', resourceType: 'pausas_activas' },
      { text: 'Mejorar la postura en el escritorio', resourceType: 'postura_escritorio' },
      { text: 'Reducir estrés con técnicas de respiración', resourceType: 'tecnicas_respiracion' },
      { text: 'Ejercicio de fortalecimiento 3x por semana', resourceType: 'fortalecimiento' }
    ]
  },
  emprendedor_quemado: {
    name: 'Emprendedor Quemado',
    description: 'Tu cuerpo está pidiendo ayuda. El estrés y la falta de descanso están afectando tu salud.',
    color: 'from-red-500 to-red-600',
    icon: '🔥',
    recommendations: [
      { text: 'Urgente: Establecer límites de trabajo', resourceType: 'limites_trabajo' },
      { text: 'Programa de recuperación intensiva', resourceType: 'recuperacion_intensiva' },
      { text: 'Consulta con especialista recomendada', resourceType: 'consulta_especialista' },
      { text: 'Integrar movimiento en tu rutina diaria', resourceType: 'movimiento_diario' }
    ]
  },
  atleta_lesionado: {
    name: 'Atleta Lesionado',
    description: 'Tu lesión requiere un enfoque específico de rehabilitación y fortalecimiento.',
    color: 'from-orange-500 to-orange-600',
    icon: '⚡',
    recommendations: [
      { text: 'Rehabilitación progresiva personalizada', resourceType: 'rehabilitacion_progresiva' },
      { text: 'Fortalecimiento específico de la zona afectada', resourceType: 'fortalecimiento_especifico' },
      { text: 'Vuelta gradual a la actividad física', resourceType: 'vuelta_actividad' },
      { text: 'Seguimiento periódico del progreso', resourceType: 'seguimiento_progreso' }
    ]
  },
  recien_diagnosticado: {
    name: 'Recién Diagnosticado',
    description: 'Estás en las primeras etapas. Ahora es el momento perfecto para actuar.',
    color: 'from-green-500 to-green-600',
    icon: '🌱',
    recommendations: [
      { text: 'Empezar con ejercicios básicos de movilidad', resourceType: 'movilidad_basica' },
      { text: 'Identificar y eliminar factores de riesgo', resourceType: 'factores_riesgo' },
      { text: 'Crear una rutina de prevención', resourceType: 'rutina_prevencion' },
      { text: 'Educación sobre postura y movimiento', resourceType: 'educacion_postura' }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-accent" />
          <p className="text-gray-400">Generando tu reporte...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-danger" />
          <h2 className="text-2xl font-bold mb-2">Quiz no encontrado</h2>
          <p className="text-gray-400 mb-6">No pudimos encontrar tu evaluación.</p>
          <Button onClick={() => window.location.href = '/quiz'}>Realizar Quiz Nuevamente</Button>
        </div>
      </div>
    );
  }

  const profile = PROFILE_INFO[results.profile] || PROFILE_INFO.ejecutivo_atrapado;

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className={`bg-gradient-to-r ${profile.color} rounded-lg p-8 mb-8 text-white`}>
          <div className="flex items-start gap-4">
            <div className="text-5xl">{profile.icon}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
              <p className="text-lg opacity-95">{profile.description}</p>
              <div className="mt-4 text-sm opacity-90">
                <p><strong>Puntuación:</strong> {results.totalScore} / 20</p>
                <p><strong>Severidad:</strong> {results.severity} / 10</p>
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
                  <p className="text-gray-300 mb-2">{rec.text}</p>
                  {quizId && (
                    <DownloadGuideButton
                      quizId={quizId}
                      resourceType={rec.resourceType}
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
          <div className="space-y-2 text-gray-300">
            <p><strong>Nombre:</strong> {results.firstName} {results.lastName}</p>
            <p><strong>Email:</strong> {results.email}</p>
            <p><strong>Fecha de Evaluación:</strong> {new Date(results.createdAt).toLocaleDateString('es-ES')}</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            Próximos Pasos
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>✓ Descarga las guías personalizadas para tu perfil</li>
            <li>✓ Comienza con la guía de pausas activas esta semana</li>
            <li>✓ Implementa gradualmente cada recomendación</li>
            <li>✓ Monitorea tu progreso y ajusta según sea necesario</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-accent hover:bg-accent/90"
          >
            Volver a Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
