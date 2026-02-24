import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronRight, ChevronLeft } from 'lucide-react';

/**
 * Assessment Page - Client Qualification
 * Design Philosophy: Conversational, empathetic, builds trust
 * - Multi-step form that feels like a conversation
 * - Validates client fit for the program
 * - Collects data for personalization
 * - Maintains Dark Gym Aesthetic
 */

interface AssessmentData {
  experience: string;
  yearsTraining: string;
  mainGoal: string;
  bodyParts: string[];
  muscleGroups: string[];
  timeAvailable: string;
  motivation: string;
}

export default function Assessment() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AssessmentData>({
    experience: '',
    yearsTraining: '',
    mainGoal: '',
    bodyParts: [],
    muscleGroups: [],
    timeAvailable: '',
    motivation: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const steps = [
    {
      title: '¿Cuál es tu nivel de experiencia en el entrenamiento?',
      subtitle: 'Esto nos ayuda a personalizar el programa',
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
      title: '¿Cuál es tu objetivo principal?',
      subtitle: 'Queremos saber qué te motiva',
      type: 'radio',
      field: 'mainGoal',
      options: [
        { value: 'lose-fat', label: 'Perder grasa y definirme' },
        { value: 'gain-muscle', label: 'Ganar músculo y volumen' },
        { value: 'both', label: 'Ambos: perder grasa y ganar músculo' },
        { value: 'strength', label: 'Aumentar fuerza' },
      ],
    },
    {
      title: '¿Qué parte de tu cuerpo te gustaría mejorar más?',
      subtitle: 'Puedes seleccionar varias',
      type: 'checkbox',
      field: 'bodyParts',
      options: [
        { value: 'abdomen', label: 'Abdomen y core' },
        { value: 'chest', label: 'Pecho' },
        { value: 'arms', label: 'Brazos' },
        { value: 'back', label: 'Espalda' },
        { value: 'legs', label: 'Piernas' },
        { value: 'shoulders', label: 'Hombros' },
      ],
    },
    {
      title: '¿Qué músculos quieres desarrollar más?',
      subtitle: 'Esto nos ayuda a priorizar tu entrenamiento',
      type: 'checkbox',
      field: 'muscleGroups',
      options: [
        { value: 'biceps', label: 'Bíceps' },
        { value: 'triceps', label: 'Tríceps' },
        { value: 'pectorales', label: 'Pectorales' },
        { value: 'espalda', label: 'Espalda ancha' },
        { value: 'cuadriceps', label: 'Cuádriceps' },
        { value: 'glúteos', label: 'Glúteos' },
      ],
    },
    {
      title: '¿Cuánto tiempo puedes dedicar al entrenamiento?',
      subtitle: 'Summer Shred es flexible con tu agenda',
      type: 'radio',
      field: 'timeAvailable',
      options: [
        { value: '30min', label: '30 minutos al día' },
        { value: '45min', label: '45 minutos al día' },
        { value: '60min', label: '1 hora al día' },
        { value: '90min', label: 'Más de 1 hora' },
      ],
    },
    {
      title: '¿Qué te motiva más en este momento?',
      subtitle: 'Queremos entender tu "por qué"',
      type: 'radio',
      field: 'motivation',
      options: [
        { value: 'summer', label: 'Lucir bien en verano' },
        { value: 'confidence', label: 'Aumentar mi confianza' },
        { value: 'health', label: 'Mejorar mi salud' },
        { value: 'challenge', label: 'Aceptar un desafío personal' },
      ],
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    // Validar que el campo actual está completo
    const fieldValue = data[currentStep.field as keyof AssessmentData];
    if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
      setErrors(['Por favor, selecciona una opción']);
      return;
    }
    setErrors([]);
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setErrors([]);
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleRadioChange = (value: string) => {
    setData({ ...data, [currentStep.field]: value });
    setErrors([]);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const field = currentStep.field as keyof AssessmentData;
    const currentArray = data[field] as string[];
    if (checked) {
      setData({ ...data, [field]: [...currentArray, value] });
    } else {
      setData({ ...data, [field]: currentArray.filter(item => item !== value) });
    }
    setErrors([]);
  };

  const handleCheckout = () => {
    // Aquí iría la redirección a Stripe o pasarela de pago
    // Por ahora, mostramos los datos recopilados
    console.log('Assessment Data:', data);
    // TODO: Redirigir a pasarela de pago con datos
    alert('Redirigiendo a pasarela de pago...\n\nDatos recopilados:\n' + JSON.stringify(data, null, 2));
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border py-6">
        <div className="container max-w-2xl mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl text-white mb-2">
            Personaliza tu programa
          </h1>
          <p className="text-gray-400">
            Queremos conocerte para diseñar el mejor plan para ti
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border py-4">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Paso {step + 1} de {steps.length}
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
          key={step}
        >
          {/* Question */}
          <div className="mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-white mb-2">
              {currentStep.title}
            </h2>
            <p className="text-gray-400 text-lg">{currentStep.subtitle}</p>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-12">
            {currentStep.type === 'radio' && (
              <RadioGroup value={data[currentStep.field as keyof AssessmentData] as string} onValueChange={handleRadioChange}>
                {currentStep.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-4 rounded-sm border border-border hover:border-accent/50 cursor-pointer transition-colors card-glass">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer text-gray-200">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentStep.type === 'checkbox' && (
              <div className="space-y-3">
                {currentStep.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 p-4 rounded-sm border border-border hover:border-accent/50 cursor-pointer transition-colors card-glass"
                  >
                    <Checkbox
                      id={option.value}
                      checked={(data[currentStep.field as keyof AssessmentData] as string[]).includes(option.value)}
                      onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
                    />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer text-gray-200">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {errors.length > 0 && (
            <motion.div
              className="mb-8 p-4 bg-destructive/10 border border-destructive/50 rounded-sm text-destructive text-sm"
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
              onClick={handlePrevious}
              disabled={step === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Atrás
            </Button>

            {!isLastStep ? (
              <Button
                onClick={handleNext}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold flex items-center justify-center gap-2"
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleCheckout}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold btn-glow"
              >
                Ir a Pago
              </Button>
            )}
          </div>

          {/* Trust Message */}
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>
              ✓ Tus datos están seguros y serán usados solo para personalizar tu programa
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
