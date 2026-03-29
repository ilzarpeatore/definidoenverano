import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock, Zap, Award } from 'lucide-react';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';

/**
 * Assessment Results Page - Personalized Value Proposition
 * Design Philosophy: Build urgency, show personalized benefits, create desire
 * - Display personalized assessment results
 * - Show specific benefits based on user's goals
 * - Create urgency with limited-time offer
 * - Clear CTA to checkout
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

interface ClientInfo {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}

export default function AssessmentResults() {
  const [, navigate] = useLocation();
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    // Load assessment data from localStorage
    const savedAssessment = localStorage.getItem('assessmentData');
    const savedClientInfo = localStorage.getItem('clientInfo');

    if (!savedAssessment || !savedClientInfo) {
      navigate('/assessment');
      return;
    }

    setAssessmentData(JSON.parse(savedAssessment));
    setClientInfo(JSON.parse(savedClientInfo));

    // Track retargeting event
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Assessment Results',
        content_type: 'page',
      });
    }
  }, [navigate]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getPersonalizedBenefits = () => {
    const benefits = [];

    if (assessmentData?.mainGoal === 'lose-fat') {
      benefits.push('Plan de déficit calórico optimizado para tu metabolismo');
      benefits.push('Rutinas de entrenamiento enfocadas en quemar grasa');
    } else if (assessmentData?.mainGoal === 'gain-muscle') {
      benefits.push('Programa de hipertrofia diseñado para máximo crecimiento muscular');
      benefits.push('Guía de nutrición para ganar volumen de forma limpia');
    } else if (assessmentData?.mainGoal === 'both') {
      benefits.push('Recomposición corporal: pierde grasa y gana músculo simultáneamente');
      benefits.push('Estrategia de entrenamiento balanceada para ambos objetivos');
    }

    if (assessmentData?.timeAvailable === '30min') {
      benefits.push('Entrenamientos eficientes de 30 minutos (máximo impacto)');
    } else if (assessmentData?.timeAvailable === '45min') {
      benefits.push('Rutinas optimizadas de 45 minutos con máxima intensidad');
    } else {
      benefits.push('Entrenamientos completos con todo el volumen que necesitas');
    }

    if (assessmentData?.motivation === 'summer') {
      benefits.push('Transformación visible en 12 semanas (listo para verano)');
    } else if (assessmentData?.motivation === 'confidence') {
      benefits.push('Cambio de mentalidad + cuerpo para aumentar confianza');
    }

    return benefits;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  if (!assessmentData || !clientInfo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header with Urgency */}
      <div className="bg-gradient-to-r from-accent/20 to-accent/10 border-b border-accent/30 py-6">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl md:text-4xl text-white mb-2">
              ¡Perfecto, {clientInfo.firstName}! 🎯
            </h1>
            <p className="text-gray-300 mb-4">
              Hemos diseñado un programa personalizado basado en tu perfil
            </p>

            {/* Urgency Timer */}
            <div className="inline-block bg-accent/20 border border-accent px-4 py-2 rounded-sm">
              <p className="text-sm text-accent font-bold">
                ⏰ Oferta especial válida por: <span className="text-lg">{formatTime(timeLeft)}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left: Personalized Benefits */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <h2 className="font-display text-2xl text-white mb-6">
                Tu Plan Personalizado Incluye:
              </h2>

              <div className="space-y-4">
                {getPersonalizedBenefits().map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4 p-4 bg-card border border-border rounded-sm hover:border-accent/50 transition-colors"
                    variants={itemVariants}
                  >
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">{benefit}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Features */}
              <motion.div className="mt-8 p-6 bg-card border border-border rounded-sm" variants={itemVariants}>
                <h3 className="font-heading text-lg text-white mb-4">Acceso Completo a:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-300">12 Semanas de Entrenamientos</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Award className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-300">Guía de Nutrición Personalizada</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-300">Acceso de Por Vida</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-300">Actualizaciones Futuras</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social Proof */}
              <motion.div className="mt-8 p-6 bg-accent/5 border border-accent/20 rounded-sm" variants={itemVariants}>
                <p className="text-sm text-gray-300 mb-3">
                  <span className="text-accent font-bold">+250 hombres</span> ya están transformando su cuerpo con Método RESET
                </p>
                <p className="text-xs text-gray-400">
                  Promedio de transformación: <span className="text-accent font-bold">-8kg grasa + 4kg músculo en 12 semanas</span>
                </p>
              </motion.div>
            </motion.div>

            {/* Right: CTA Section */}
            <motion.div variants={itemVariants}>
              <div className="card-glass border border-accent/50 p-6 rounded-sm sticky top-4 bg-accent/5">
                <h3 className="font-display text-xl text-white mb-4">Resumen de tu Compra</h3>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Precio original:</span>
                    <span className="line-through text-gray-500">€497</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-accent font-bold">Descuento (60%):</span>
                    <span className="text-accent font-bold">-€300</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-300">Total:</span>
                    <div>
                      <span className="font-display text-3xl text-accent font-bold">€197</span>
                      <span className="text-gray-400 text-sm ml-2">EUR</span>
                    </div>
                  </div>
                </div>

                {/* Guarantee */}
                <motion.div
                  className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-sm text-center"
                  variants={itemVariants}
                >
                  <p className="text-sm text-accent font-bold mb-1">✓ Garantía de 30 días</p>
                  <p className="text-xs text-gray-400">
                    Devolvemos tu dinero sin preguntas si no estás satisfecho
                  </p>
                </motion.div>

                {/* CTA Button */}
                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 rounded-sm btn-glow mb-4"
                >
                  <span className="flex items-center gap-2">
                    Proceder al Pago
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>

                {/* Back Button */}
                <Button
                  onClick={() => navigate('/assessment')}
                  variant="outline"
                  className="w-full"
                >
                  Volver a Editar
                </Button>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-gray-500 text-center mb-3">Pagos seguros con:</p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    <span className="text-xs bg-card px-2 py-1 rounded border border-border text-gray-400">
                      🔒 SSL Encriptado
                    </span>
                    <span className="text-xs bg-card px-2 py-1 rounded border border-border text-gray-400">
                      ✓ PCI Compliant
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
