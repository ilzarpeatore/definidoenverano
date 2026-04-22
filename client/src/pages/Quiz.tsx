import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; value: string; points: number }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Dónde sientes el dolor?',
    options: [
      { label: 'Espalda baja (lumbar)', value: 'lumbar', points: 0 },
      { label: 'Espalda media (dorsal)', value: 'dorsal', points: 1 },
      { label: 'Cuello (cervical)', value: 'cervical', points: 2 },
      { label: 'Múltiples zonas', value: 'multiple', points: 3 }
    ]
  },
  {
    id: 2,
    question: '¿Cuánto tiempo llevas con este dolor?',
    options: [
      { label: 'Menos de 1 semana', value: 'acute', points: 1 },
      { label: '1-4 semanas', value: 'subacute', points: 2 },
      { label: '1-6 meses', value: 'chronic', points: 4 },
      { label: 'Más de 6 meses', value: 'very_chronic', points: 5 }
    ]
  },
  {
    id: 3,
    question: '¿Cuál es tu ocupación principal?',
    options: [
      { label: 'Trabajo de oficina/Escritorio', value: 'office', points: 2 },
      { label: 'Ventas/Viajes', value: 'sales', points: 1 },
      { label: 'Construcción/Trabajo físico', value: 'physical', points: 3 },
      { label: 'Autónomo/Emprendedor', value: 'entrepreneur', points: 2 }
    ]
  },
  {
    id: 4,
    question: '¿Cuántas horas pasas sentado diariamente?',
    options: [
      { label: 'Menos de 4 horas', value: 'less_4h', points: 0 },
      { label: '4-6 horas', value: '4_6h', points: 1 },
      { label: '6-8 horas', value: '6_8h', points: 2 },
      { label: 'Más de 8 horas', value: 'more_8h', points: 3 }
    ]
  },
  {
    id: 5,
    question: '¿Qué actividades empeoran tu dolor?',
    options: [
      { label: 'Estar sentado prolongado', value: 'sitting', points: 2 },
      { label: 'De pie prolongado', value: 'standing', points: 1 },
      { label: 'Levantar objetos', value: 'lifting', points: 3 },
      { label: 'Estrés/Tensión', value: 'stress', points: 2 }
    ]
  },
  {
    id: 6,
    question: '¿Has probado algún tratamiento?',
    options: [
      { label: 'Medicinas', value: 'medicine', points: 1 },
      { label: 'Fisioterapia', value: 'physiotherapy', points: 1 },
      { label: 'Ejercicio', value: 'exercise', points: 0 },
      { label: 'Nada aún', value: 'nothing', points: 2 }
    ]
  },
  {
    id: 7,
    question: '¿Cuál es tu objetivo principal?',
    options: [
      { label: 'Eliminar el dolor', value: 'eliminate_pain', points: 0 },
      { label: 'Mejorar postura', value: 'posture', points: 1 },
      { label: 'Ganar fuerza', value: 'strength', points: 1 },
      { label: 'Volver a deportes/actividades', value: 'sports', points: 2 }
    ]
  }
];

interface QuizAnswers {
  [key: string]: string;
  [key: number]: string;
}

export default function Quiz() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [showForm, setShowForm] = useState(false);

  const submitQuizMutation = trpc.quiz.submit.useMutation({
    onSuccess: (data) => {
      navigate(`/quiz-results?id=${data.quizId}`);
    },
    onError: (error) => {
      toast.error(error.message || 'Error al enviar el quiz');
    }
  });

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowForm(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const totalScore = Object.keys(answers).reduce((sum, key) => {
      const question = QUIZ_QUESTIONS.find(q => q.id === parseInt(key));
      const option = question?.options.find(o => o.value === answers[parseInt(key)]);
      return sum + (option?.points || 0);
    }, 0);

    submitQuizMutation.mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      answers,
      totalScore
    });
  };

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const isAnswered = answers[currentQuestion.id] !== undefined;
  const progress = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;

  if (showForm) {
    return (
      <div className="min-h-screen bg-background text-foreground py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="card-glass border border-border p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-2">Casi listo</h2>
            <p className="text-gray-400 mb-8">Completa tus datos para recibir tu reporte personalizado</p>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-4 py-2 bg-card border border-border text-white rounded-sm focus:outline-none focus:border-accent"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Apellidos</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-4 py-2 bg-card border border-border text-white rounded-sm focus:outline-none focus:border-accent"
                    placeholder="Tus apellidos"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 bg-card border border-border text-white rounded-sm focus:outline-none focus:border-accent"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2 bg-card border border-border text-white rounded-sm focus:outline-none focus:border-accent"
                  placeholder="+34 666 777 888"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                onClick={() => setShowForm(false)}
                variant="outline"
                className="flex-1"
              >
                Volver
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitQuizMutation.isPending}
                className="flex-1 flex items-center justify-center gap-2"
              >
                {submitQuizMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Ver mi Reporte
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Evaluación Personalizada
          </h1>
          <p className="text-gray-400">
            Pregunta {currentStep + 1} de {QUIZ_QUESTIONS.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 h-1 bg-card rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent via-green-400 to-yellow-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="card-glass border border-border p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className={`w-full p-4 text-left rounded-sm border-2 transition-all ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50 bg-card'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-accent bg-accent'
                        : 'border-gray-500'
                    }`}
                  >
                    {answers[currentQuestion.id] === option.value && (
                      <div className="w-2 h-2 bg-background rounded-full" />
                    )}
                  </div>
                  <span className="text-white">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex-1 flex items-center justify-center gap-2"
          >
            {currentStep === QUIZ_QUESTIONS.length - 1 ? 'Continuar' : 'Siguiente'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
