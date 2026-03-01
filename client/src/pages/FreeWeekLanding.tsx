import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

/**
 * Free Week Landing - Dynamic Assessment
 * Design Philosophy: Same as Assessment but for free trial signup
 * - Multi-step form with smooth animations
 * - Builds excitement for free week access
 * - Collects assessment data for personalization
 * - Maintains Dark Gym Aesthetic
 */

interface FreeWeekData {
  firstName: string;
  email: string;
  objective: string;
  experience: string;
  availableTime: string;
  yearsTraining: string;
}

export default function FreeWeekLanding() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FreeWeekData>({
    firstName: '',
    email: '',
    objective: '',
    experience: '',
    availableTime: '',
    yearsTraining: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createFreeWeekMutation = trpc.freeWeek.create.useMutation();

  // Track free week page view
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Free Week Landing',
        content_type: 'page',
      });
    }
  }, []);

  // Track when user completes free week signup
  const trackFreeWeekSignup = () => {
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Free Week Signup',
        content_type: 'page',
      });
    }
  };

  const steps = [
    {
      title: '¿Cuál es tu objetivo principal?',
      subtitle: 'Personalizaremos tu plan según tu meta',
      type: 'radio',
      field: 'objective',
      options: [
        { value: 'lose-fat', label: 'Perder grasa y definir' },
        { value: 'gain-muscle', label: 'Ganar músculo' },
        { value: 'both', label: 'Ambos (recomposición)' },
        { value: 'strength', label: 'Aumentar fuerza' },
      ],
    },
    {
      title: '¿Cuál es tu nivel de experiencia?',
      subtitle: 'Esto nos ayuda a ajustar la intensidad',
      type: 'radio',
      field: 'experience',
      options: [
        { value: 'beginner', label: 'Principiante (nunca he entrenado)' },
        { value: 'intermediate', label: 'Intermedio (entreno ocasionalmente)' },
        { value: 'advanced', label: 'Avanzado (entreno regularmente)' },
      ],
    },
    {
      title: '¿Cuántos años llevas entrenando?',
      subtitle: 'Queremos entender tu trayectoria',
      type: 'radio',
      field: 'yearsTraining',
      options: [
        { value: 'none', label: 'Menos de 1 año' },
        { value: '1-3', label: '1-3 años' },
        { value: '3-5', label: '3-5 años' },
        { value: '5plus', label: 'Más de 5 años' },
      ],
    },
    {
      title: '¿Cuánto tiempo puedes dedicar a entrenar?',
      subtitle: 'Crearemos un plan realista para ti',
      type: 'radio',
      field: 'availableTime',
      options: [
        { value: '30min', label: 'Menos de 30 minutos/día' },
        { value: '30-60min', label: '30-60 minutos/día' },
        { value: '60-90min', label: '60-90 minutos/día' },
        { value: '90plus', label: 'Más de 90 minutos/día' },
      ],
    },
  ];

  const isLastStep = step === steps.length;
  const currentStep = steps[step];
  const progress = ((step + 1) / (steps.length + 1)) * 100;

  const handleNext = () => {
    if (currentStep && !data[currentStep.field as keyof FreeWeekData]) {
      setErrors(['Por favor, selecciona una opción']);
      return;
    }
    setErrors([]);
    setStep(step + 1);
  };

  const handlePrev = () => {
    setErrors([]);
    setStep(Math.max(0, step - 1));
  };

  const handleSubmit = async () => {
    // Validar todos los campos
    if (!data.firstName || !data.email) {
      setErrors(['Por favor, completa tu nombre y email']);
      return;
    }

    if (!data.objective || !data.experience || !data.availableTime || !data.yearsTraining) {
      setErrors(['Por favor, completa todas las preguntas']);
      return;
    }

    setIsSubmitting(true);
    try {
      trackFreeWeekSignup();
      
      await createFreeWeekMutation.mutateAsync({
        email: data.email,
        firstName: data.firstName,
        objective: data.objective,
        experience: data.experience,
        availableTime: data.availableTime,
        yearsTraining: data.yearsTraining,
      });

      toast.success('¡Bienvenido! Revisa tu email para acceder a tu semana gratuita');
      
      // Redirigir a home después de 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error creating free week signup:', error);
      toast.error('Error al procesar tu solicitud. Intenta de nuevo.');
      setErrors(['Error al procesar tu solicitud. Intenta de nuevo.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mostrar formulario de contacto en el último paso
  if (isLastStep) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border py-6">
          <div className="container max-w-2xl mx-auto px-4">
            <h1 className="font-display text-3xl md:text-4xl text-white mb-2">
              Casi listo
            </h1>
            <p className="text-gray-400">
              Solo necesitamos tu información de contacto
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-card border-b border-border py-4">
          <div className="container max-w-2xl mx-auto px-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Paso {step + 1} de {steps.length + 1}
              </span>
              <span className="text-sm text-accent font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-accent h-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center py-12">
          <motion.div
            className="container max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6 mb-12">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => setData({ ...data, firstName: e.target.value })}
                  placeholder="Juan"
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                />
              </div>

              <p className="text-xs text-gray-400">
                Al continuar, aceptas nuestra <a href="/terms" className="text-accent hover:underline">Política de Privacidad</a> y recibirás información sobre el programa.
              </p>
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <motion.div
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors[0]}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={handlePrev}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Atrás
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-accent hover:bg-accent/90 text-black"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    Acceder a mi Semana Gratis
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Mostrar preguntas del assessment
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border py-6">
        <div className="container max-w-2xl mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl text-white mb-2">
            Tu Semana Gratuita
          </h1>
          <p className="text-gray-400">
            Responde estas preguntas para personalizar tu plan
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border py-4">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Paso {step + 1} de {steps.length + 1}
            </span>
            <span className="text-sm text-accent font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-accent h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12">
        <motion.div
          className="container max-w-2xl mx-auto px-4"
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl text-white mb-3">
              {currentStep.title}
            </h2>
            <p className="text-gray-400 text-lg">
              {currentStep.subtitle}
            </p>
          </div>

          {/* Radio Options */}
          <div className="space-y-4 mb-12">
            <RadioGroup
              value={data[currentStep.field as keyof FreeWeekData] as string}
              onValueChange={(value) => {
                setData({ ...data, [currentStep.field]: value });
                setErrors([]);
              }}
            >
              {currentStep.options.map((option) => (
                <motion.div
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-3 p-4 rounded-sm border border-border hover:border-accent/50 cursor-pointer transition-colors"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer text-base text-gray-200 hover:text-white"
                  >
                    {option.label}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <motion.div
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errors[0]}
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={step === 0}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Atrás
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 bg-accent hover:bg-accent/90 text-black"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
