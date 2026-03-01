import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trpc } from '@/lib/trpc';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function FreeWeekLanding() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    objective: '',
    experience: '',
    availableTime: '',
    yearsTraining: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createFreeWeekMutation = trpc.freeWeek.create.useMutation({
    onSuccess: () => {
      setStep('success');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    },
    onError: (error: any) => {
      setErrors({ submit: error.message });
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'Email requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido';

    if (!formData.firstName) newErrors.firstName = 'Nombre requerido';
    if (!formData.objective) newErrors.objective = 'Selecciona tu objetivo';
    if (!formData.experience) newErrors.experience = 'Selecciona tu experiencia';
    if (!formData.availableTime) newErrors.availableTime = 'Selecciona tu disponibilidad';
    if (!formData.yearsTraining) newErrors.yearsTraining = 'Selecciona tus años de entrenamiento';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      createFreeWeekMutation.mutate(formData);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center border-gold/30 bg-card/50">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-gold" />
          <h1 className="text-2xl font-bold mb-2">¡Bienvenido!</h1>
          <p className="text-foreground/80 mb-4">
            Hemos enviado tu acceso a la semana gratuita a <strong>{formData.email}</strong>
          </p>
          <p className="text-sm text-foreground/60">
            Redirigiendo a la landing en unos segundos...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gold">7 Días Gratis</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-2">
            Acceso completo al Protocolo APEX 90™
          </p>
          <p className="text-foreground/60">
            Sin tarjeta de crédito. Sin compromiso. Solo resultados.
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-gold/30 bg-card/50 p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email and Name */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 bg-background/50 border-border/50"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="firstName" className="text-foreground">Nombre</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="mt-2 bg-background/50 border-border/50"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
            </div>

            {/* Objective */}
            <div>
              <Label className="text-foreground mb-3 block">¿Cuál es tu objetivo principal?</Label>
              <RadioGroup value={formData.objective} onValueChange={(value) => setFormData({ ...formData, objective: value })}>
                <div className="space-y-2">
                  {['Perder grasa', 'Ganar músculo', 'Mejorar rendimiento', 'Transformación completa'].map((opt) => (
                    <div key={opt} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt} id={`obj-${opt}`} />
                      <Label htmlFor={`obj-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
              {errors.objective && <p className="text-red-500 text-sm mt-2">{errors.objective}</p>}
            </div>

            {/* Experience Level */}
            <div>
              <Label htmlFor="experience" className="text-foreground">¿Cuál es tu nivel de experiencia?</Label>
              <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                <SelectTrigger id="experience" className="mt-2 bg-background/50 border-border/50">
                  <SelectValue placeholder="Selecciona tu nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="principiante">Principiante (0-1 año)</SelectItem>
                  <SelectItem value="intermedio">Intermedio (1-3 años)</SelectItem>
                  <SelectItem value="avanzado">Avanzado (3+ años)</SelectItem>
                </SelectContent>
              </Select>
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>

            {/* Available Time */}
            <div>
              <Label htmlFor="availableTime" className="text-foreground">¿Cuánto tiempo puedes dedicar por semana?</Label>
              <Select value={formData.availableTime} onValueChange={(value) => setFormData({ ...formData, availableTime: value })}>
                <SelectTrigger id="availableTime" className="mt-2 bg-background/50 border-border/50">
                  <SelectValue placeholder="Selecciona tu disponibilidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="menos-3">Menos de 3 horas</SelectItem>
                  <SelectItem value="3-5">3-5 horas</SelectItem>
                  <SelectItem value="5-7">5-7 horas</SelectItem>
                  <SelectItem value="mas-7">Más de 7 horas</SelectItem>
                </SelectContent>
              </Select>
              {errors.availableTime && <p className="text-red-500 text-sm mt-1">{errors.availableTime}</p>}
            </div>

            {/* Years Training */}
            <div>
              <Label htmlFor="yearsTraining" className="text-foreground">¿Cuántos años llevas entrenando?</Label>
              <Select value={formData.yearsTraining} onValueChange={(value) => setFormData({ ...formData, yearsTraining: value })}>
                <SelectTrigger id="yearsTraining" className="mt-2 bg-background/50 border-border/50">
                  <SelectValue placeholder="Selecciona tu experiencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Nunca he entrenado</SelectItem>
                  <SelectItem value="1">Menos de 1 año</SelectItem>
                  <SelectItem value="2">1-2 años</SelectItem>
                  <SelectItem value="5">2-5 años</SelectItem>
                  <SelectItem value="10">5-10 años</SelectItem>
                  <SelectItem value="10+">Más de 10 años</SelectItem>
                </SelectContent>
              </Select>
              {errors.yearsTraining && <p className="text-red-500 text-sm mt-1">{errors.yearsTraining}</p>}
            </div>

            {/* Legal Notice */}
            <div className="bg-background/50 border border-border/30 rounded-lg p-4 text-sm text-foreground/70">
              <p className="mb-2">
                ✓ Al registrarte, aceptas recibir información sobre el Protocolo APEX 90™ y promociones especiales.
              </p>
              <p>
                Puedes darte de baja en cualquier momento. <a href="/privacy-policy" className="text-gold hover:underline">Ver política de privacidad</a>
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={createFreeWeekMutation.isPending}
              className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-6 text-lg"
            >
              {createFreeWeekMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                'ACCESO INMEDIATO A 7 DÍAS GRATIS'
              )}
            </Button>

            {errors.submit && <p className="text-red-500 text-center">{errors.submit}</p>}
          </form>
        </Card>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: '✓', title: 'Acceso Completo', desc: 'App + Entrenamientos + Nutrición' },
            { icon: '✓', title: 'Sin Tarjeta', desc: 'No requiere datos de pago' },
            { icon: '✓', title: 'Sin Compromiso', desc: 'Cancela cuando quieras' },
          ].map((benefit, idx) => (
            <Card key={idx} className="border-border/30 bg-background/50 p-4 text-center">
              <div className="text-2xl text-gold mb-2">{benefit.icon}</div>
              <h3 className="font-bold mb-1">{benefit.title}</h3>
              <p className="text-sm text-foreground/60">{benefit.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
