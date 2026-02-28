import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Circle, Mail, Download } from 'lucide-react';

interface ChecklistItem {
  day: number;
  title: string;
  description: string;
  completed: boolean;
}

const checklistItems: Omit<ChecklistItem, 'completed'>[] = [
  { day: 1, title: 'Establece tu objetivo claro', description: 'Define exactamente qué quieres lograr en 30 días' },
  { day: 2, title: 'Toma foto de referencia', description: 'Foto frontal, lateral y trasera (sin ropa) para comparar' },
  { day: 3, title: 'Calcula tus calorías', description: 'Usa nuestra calculadora para saber tu TDEE y macros' },
  { day: 4, title: 'Planifica tu nutrición', description: 'Prepara un menú semanal con tus alimentos favoritos' },
  { day: 5, title: 'Primer entrenamiento', description: 'Completa tu primer sesión de entrenamiento' },
  { day: 6, title: 'Registra tu peso', description: 'Pésate a la misma hora y en las mismas condiciones' },
  { day: 7, title: 'Revisa tu progreso semanal', description: 'Analiza cómo te has sentido y qué puedes mejorar' },
  { day: 8, title: 'Aumenta intensidad', description: 'Añade más peso o repeticiones a tus ejercicios' },
  { day: 9, title: 'Optimiza tu sueño', description: 'Duerme 7-9 horas y mantén horarios consistentes' },
  { day: 10, title: 'Hidratación constante', description: 'Bebe 3-4 litros de agua diarios' },
  { day: 11, title: 'Añade cardio ligero', description: 'Camina 20-30 minutos después de entrenar' },
  { day: 12, title: 'Ajusta tu nutrición', description: 'Si no ves cambios, reduce 200 calorías' },
  { day: 13, title: 'Entrena con intensidad', description: 'Busca el fallo muscular en tus series finales' },
  { day: 14, title: 'Revisa progreso a mitad', description: 'Toma nuevas fotos y compara con el día 1' },
  { day: 15, title: 'Varía tus ejercicios', description: 'Cambia ángulos y rangos de movimiento' },
  { day: 16, title: 'Mejora tu técnica', description: 'Grábate y corrige tu forma en los ejercicios' },
  { day: 17, title: 'Aumenta volumen de entrenamiento', description: 'Añade una serie más a tus ejercicios principales' },
  { day: 18, title: 'Monitorea tu energía', description: 'Asegúrate de tener energía suficiente para entrenar' },
  { day: 19, title: 'Suplementación básica', description: 'Considera proteína en polvo si no alcanzas macros' },
  { day: 20, title: 'Entrena con consistencia', description: 'No saltes entrenamientos, sigue el plan' },
  { day: 21, title: 'Revisa tu nutrición', description: 'Verifica que estés cumpliendo con tus macros' },
  { day: 22, title: 'Aumenta el déficit', description: 'Si no hay cambios, aumenta cardio o reduce calorías' },
  { day: 23, title: 'Mantén la disciplina', description: 'Evita comidas ultraprocesadas y alcohol' },
  { day: 24, title: 'Entrena con pasión', description: 'Visualiza tus objetivos antes de cada sesión' },
  { day: 25, title: 'Revisa tu progreso', description: 'Mide cintura, caderas y pecho' },
  { day: 26, title: 'Optimiza recuperación', description: 'Estira 10 minutos después de cada entrenamiento' },
  { day: 27, title: 'Mantén consistencia', description: 'Falta poco, no abandones ahora' },
  { day: 28, title: 'Aumenta intensidad final', description: 'Últimos entrenamientos con máxima intensidad' },
  { day: 29, title: 'Prepara fotos finales', description: 'Toma fotos en las mismas condiciones que el día 1' },
  { day: 30, title: '¡Celebra tu transformación!', description: 'Compara resultados y planifica los próximos 30 días' },
];

export default function ChecklistDay30() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('checklist30days');
    if (saved) {
      setChecklist(JSON.parse(saved));
    } else {
      setChecklist(checklistItems.map(item => ({ ...item, completed: false })));
    }
  }, []);

  // Save to localStorage whenever checklist changes
  useEffect(() => {
    if (checklist.length > 0) {
      localStorage.setItem('checklist30days', JSON.stringify(checklist));
    }
  }, [checklist]);

  const toggleItem = (day: number) => {
    setChecklist(prev =>
      prev.map(item =>
        item.day === day ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = checklist.filter(item => item.completed).length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      // Send email with progress
      const response = await fetch('/api/trpc/system.notifyOwner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Progreso Checklist 30 Días`,
          content: `Usuario ${email} ha completado ${completedCount}/30 tareas (${progressPercent}%)`,
        }),
      });

      if (response.ok) {
        setEmailSubmitted(true);
        setTimeout(() => {
          setShowEmailForm(false);
          setEmailSubmitted(false);
          setEmail('');
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving email:', error);
    }
  };

  const downloadPDF = () => {
    const content = checklist
      .map(item => `${item.completed ? '✓' : '○'} Día ${item.day}: ${item.title}`)
      .join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `checklist-30-dias-${progressPercent}porciento.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#b8860b] to-[#d4af37] py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Checklist de 30 Días
        </h1>
        <p className="text-lg text-black/80 max-w-2xl mx-auto">
          Tu hoja de ruta para la transformación. Marca cada tarea completada y sigue tu progreso día a día.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Progress Section */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-foreground">Tu Progreso</h2>
            <span className="text-3xl font-bold text-[#d4af37]">{progressPercent}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-background rounded-full h-4 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#b8860b] to-[#d4af37] h-4 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <p className="text-foreground/70">
            {completedCount} de 30 tareas completadas
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 flex-wrap">
            <Button
              onClick={downloadPDF}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Descargar Progreso
            </Button>
            <Button
              onClick={() => setShowEmailForm(!showEmailForm)}
              className="flex items-center gap-2 bg-[#d4af37] text-black hover:bg-[#b8860b]"
            >
              <Mail className="w-4 h-4" />
              Guardar por Email
            </Button>
          </div>

          {/* Email Form */}
          {showEmailForm && (
            <form onSubmit={handleSaveEmail} className="mt-6 p-4 bg-background rounded-lg border border-border">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-[#d4af37]"
                  required
                />
                <Button
                  type="submit"
                  className="bg-[#d4af37] text-black hover:bg-[#b8860b]"
                  disabled={emailSubmitted}
                >
                  {emailSubmitted ? '✓ Enviado' : 'Enviar'}
                </Button>
              </div>
              <p className="text-xs text-foreground/60 mt-2">
                Recibirás tu progreso y recordatorios para mantener la motivación
              </p>
            </form>
          )}
        </div>

        {/* Checklist Items */}
        <div className="space-y-3">
          {checklist.map(item => (
            <div
              key={item.day}
              onClick={() => toggleItem(item.day)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                item.completed
                  ? 'bg-[#d4af37]/10 border-[#d4af37]'
                  : 'bg-card border-border hover:border-[#d4af37]/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {item.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-[#d4af37] flex-shrink-0" />
                  ) : (
                    <Circle className="w-6 h-6 text-foreground/30 flex-shrink-0" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#d4af37]">Día {item.day}</span>
                    <h3 className={`font-semibold ${item.completed ? 'line-through text-foreground/50' : 'text-foreground'}`}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground/70">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-[#d4af37] to-[#b8860b] rounded-lg text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            Acelera tu transformación
          </h2>
          <p className="text-black/80 mb-6 max-w-xl mx-auto">
            Este checklist es tu guía básica. Nuestro programa completo te da el entrenamiento científico, nutrición personalizada y soporte directo para garantizar resultados.
          </p>
          <Button
            size="lg"
            className="bg-black text-[#d4af37] hover:bg-black/80 font-bold"
            onClick={() => window.location.href = '/checkout'}
          >
            Acceder al Programa Completo <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <p className="text-black/70 text-sm mt-4">
            Garantía de 30 días. Si no ves resultados, devolvemos tu dinero.
          </p>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-card border border-border rounded-lg p-8">
          <h3 className="text-lg font-bold text-foreground mb-4">💡 Tips para el Éxito</h3>
          <ul className="space-y-3 text-foreground/80">
            <li className="flex gap-3">
              <span className="text-[#d4af37]">•</span>
              <span>Marca cada tarea apenas la completes, no esperes al final del día</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#d4af37]">•</span>
              <span>Tu progreso se guarda automáticamente en tu navegador</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#d4af37]">•</span>
              <span>Si cambias de dispositivo, usa "Guardar por Email" para recuperar tu progreso</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#d4af37]">•</span>
              <span>No abandones aunque falles un día. La consistencia es lo que cuenta</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
