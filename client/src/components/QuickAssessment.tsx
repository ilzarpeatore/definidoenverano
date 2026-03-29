import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { useLocation } from 'wouter';

interface AssessmentAnswer {
  painLocation: string;
  painDuration: string;
  painSeverity: string;
  dailyImpact: string;
  previousTreatments: string;
  workType?: string;
  goal?: string;
}

interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function QuickAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer>({
    painLocation: '',
    painDuration: '',
    painSeverity: '',
    dailyImpact: '',
    previousTreatments: '',
  });
  const [personalData, setPersonalData] = useState<PersonalData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPersonalDataForm, setShowPersonalDataForm] = useState(false);
  const [, navigate] = useLocation();

  const questions = [
    {
      id: 'painLocation',
      title: '¿Dónde sientes el dolor?',
      type: 'single',
      options: [
        { value: 'lumbar', label: 'Espalda baja (zona lumbar)' },
        { value: 'cervical', label: 'Cuello (zona cervical)' },
        { value: 'both', label: 'Ambas zonas' },
        { value: 'other', label: 'Otra zona' },
      ],
    },
    {
      id: 'painDuration',
      title: '¿Cuánto tiempo llevas con este dolor?',
      type: 'single',
      options: [
        { value: 'less_2weeks', label: 'Menos de 2 semanas' },
        { value: '2_6weeks', label: '2-6 semanas' },
        { value: '6_12weeks', label: '6-12 semanas' },
        { value: 'more_3months', label: 'Más de 3 meses' },
      ],
    },
    {
      id: 'painSeverity',
      title: '¿Cuál es la intensidad de tu dolor? (0=sin dolor, 10=máximo dolor)',
      type: 'slider',
      min: 0,
      max: 10,
    },
    {
      id: 'dailyImpact',
      title: '¿Cómo afecta tu dolor a tu vida diaria?',
      type: 'single',
      options: [
        { value: 'minimal', label: 'Mínimo impacto, puedo hacer mis actividades' },
        { value: 'moderate', label: 'Impacto moderado, tengo limitaciones' },
        { value: 'significant', label: 'Impacto significativo, debo evitar actividades' },
        { value: 'severe', label: 'Impacto severo, afecta mi trabajo y vida personal' },
      ],
    },
    {
      id: 'previousTreatments',
      title: '¿Qué tratamientos ya has probado?',
      type: 'multiple',
      options: [
        { value: 'rest', label: 'Reposo' },
        { value: 'medications', label: 'Medicamentos (ibuprofeno, etc.)' },
        { value: 'physiotherapy', label: 'Fisioterapia' },
        { value: 'exercises', label: 'Ejercicios en casa' },
        { value: 'massage', label: 'Masajes' },
        { value: 'none', label: 'Ninguno' },
      ],
    },
    {
      id: 'workType',
      title: '¿Cuál es tu situación laboral?',
      type: 'single',
      options: [
        { value: 'office', label: 'Trabajo en oficina (sentado 8+ horas)' },
        { value: 'physical', label: 'Trabajo físico (de pie, movimiento)' },
        { value: 'mixed', label: 'Trabajo mixto' },
        { value: 'other', label: 'Otro / No aplica' },
      ],
    },
    {
      id: 'goal',
      title: '¿Cuál es tu objetivo principal?',
      type: 'single',
      options: [
        { value: 'eliminate_pain', label: 'Eliminar el dolor completamente' },
        { value: 'reduce_pain', label: 'Reducir el dolor significativamente' },
        { value: 'improve_mobility', label: 'Mejorar movilidad y flexibilidad' },
        { value: 'prevent_surgery', label: 'Evitar cirugía' },
      ],
    },
  ];

  const handleAnswer = (value: string | number) => {
    const currentQuestion = questions[currentStep];
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleMultipleAnswer = (value: string) => {
    const currentQuestion = questions[currentStep];
    const currentAnswers = (answers[currentQuestion.id as keyof AssessmentAnswer] as string)?.split(',') || [];
    
    if (currentAnswers.includes(value)) {
      const filtered = currentAnswers.filter(a => a !== value);
      setAnswers({
        ...answers,
        [currentQuestion.id]: filtered.join(','),
      });
    } else {
      setAnswers({
        ...answers,
        [currentQuestion.id]: [...currentAnswers, value].join(','),
      });
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setShowPersonalDataForm(true);
  };

  const handlePersonalDataChange = (field: keyof PersonalData, value: string) => {
    setPersonalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFinalSubmit = async () => {
    if (!personalData.firstName || !personalData.lastName || !personalData.email || !personalData.phone) {
      alert('Por favor completa todos los campos');
      return;
    }

    setIsSubmitted(true);
    
    sessionStorage.setItem('assessmentAnswers', JSON.stringify(answers));
    sessionStorage.setItem('personalData', JSON.stringify(personalData));
    
    setTimeout(() => {
      window.location.href = '/assessment-results';
    }, 1000);
  };

  const currentQuestion = questions[currentStep];
  const isAnswered = answers[currentQuestion.id as keyof AssessmentAnswer];
  const progress = showPersonalDataForm ? 100 : ((currentStep + 1) / questions.length) * 100;

  if (showPersonalDataForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-background to-slate-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Casi listo
              </h1>
              <p className="text-lg text-muted-foreground">
                Completa tus datos para recibir tu evaluación personalizada
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-lg p-8 mb-8"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Nombre</label>
                  <input
                    type="text"
                    value={personalData.firstName}
                    onChange={(e) => handlePersonalDataChange('firstName', e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-2 bg-slate-800 border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Apellidos</label>
                  <input
                    type="text"
                    value={personalData.lastName}
                    onChange={(e) => handlePersonalDataChange('lastName', e.target.value)}
                    placeholder="Tus apellidos"
                    className="w-full px-4 py-2 bg-slate-800 border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <input
                  type="email"
                  value={personalData.email}
                  onChange={(e) => handlePersonalDataChange('email', e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 bg-slate-800 border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={personalData.phone}
                  onChange={(e) => handlePersonalDataChange('phone', e.target.value)}
                  placeholder="+34 600 000 000"
                  className="w-full px-4 py-2 bg-slate-800 border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setShowPersonalDataForm(false)}
              className="flex-1"
            >
              Volver
            </Button>
            <Button
              onClick={handleFinalSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Ver Resultados <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-background to-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Evaluación Rápida de Dolor
            </h1>
            <p className="text-lg text-muted-foreground">
              Descubre tu nivel de dolor y recibe recomendaciones personalizadas en menos de 2 minutos
            </p>
          </motion.div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Pregunta {currentStep + 1} de {questions.length}
            </span>
            <span className="text-sm font-semibold text-accent">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">{currentQuestion.title}</h2>

          {currentQuestion.type === 'single' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    answers[currentQuestion.id as keyof AssessmentAnswer] === option.value
                      ? 'border-accent bg-accent/10'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{option.label}</span>
                    {answers[currentQuestion.id as keyof AssessmentAnswer] === option.value && (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'multiple' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => {
                const selected = (answers[currentQuestion.id as keyof AssessmentAnswer] as string)?.split(',').includes(option.value);
                return (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMultipleAnswer(option.value)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selected
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{option.label}</span>
                      {selected && <CheckCircle className="w-5 h-5 text-accent" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}

          {currentQuestion.type === 'slider' && (
            <div className="space-y-6">
              <input
                type="range"
                min={currentQuestion.min}
                max={currentQuestion.max}
                value={answers[currentQuestion.id as keyof AssessmentAnswer] || 5}
                onChange={(e) => handleAnswer(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Sin dolor</span>
                <div className="text-center">
                  <div className="text-5xl font-bold text-accent">
                    {(answers[currentQuestion.id as keyof AssessmentAnswer] as unknown as number) || 5}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {(answers[currentQuestion.id as keyof AssessmentAnswer] as unknown as number) <= 3 && 'Leve'}
                    {(answers[currentQuestion.id as keyof AssessmentAnswer] as unknown as number) > 3 && (answers[currentQuestion.id as keyof AssessmentAnswer] as unknown as number) <= 6 && 'Moderado'}
                    {(answers[currentQuestion.id as keyof AssessmentAnswer] as unknown as number) > 6 && (answers[currentQuestion.id as keyof AssessmentAnswer] as unknown as number) <= 8 && 'Severo'}
                    {(answers[currentQuestion.id as keyof AssessmentAnswer] as unknown as number) > 8 && 'Muy severo'}
                  </div>
                </div>
                <span className="text-muted-foreground">Máximo dolor</span>
              </div>
            </div>
          )}
        </motion.div>

        <div className="flex gap-4">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1"
            >
              Anterior
            </Button>
          )}
          <Button
            disabled={!isAnswered}
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            {currentStep === questions.length - 1 ? (
              <>
                Siguiente <ChevronRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Siguiente <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Tus respuestas son confidenciales y se utilizarán para personalizar tu evaluación
        </p>
      </div>
    </div>
  );
}
