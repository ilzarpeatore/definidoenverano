import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, BookOpen, Calculator, CheckCircle2, X } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface ResourceDownloadModalProps {
  resource: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    url: string;
  };
  onClose: () => void;
  savedEmail: string | null;
  onEmailSaved: (email: string) => void;
}

function ResourceDownloadModal({ resource, onClose, savedEmail, onEmailSaved }: ResourceDownloadModalProps) {
  const [email, setEmail] = useState(savedEmail || '');
  const [isLoading, setIsLoading] = useState(false);

  const createLeadMutation = trpc.leads.createLeadFromResource.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Por favor ingresa tu email');
      return;
    }

    setIsLoading(true);

    try {
      // Save lead to database
      const result = await createLeadMutation.mutateAsync({
        firstName: 'Guest',
        lastName: 'User',
        email: email,
        resourceType: resource.id as "guide_7_errors" | "calculator_macros" | "checklist_30_days",
      });

      if (result.success) {
        // Save email to localStorage for future access
        localStorage.setItem('resourceEmail', email);
        onEmailSaved(email);
        
        // Open resource in new window
        window.open(resource.url, '_blank');
        
        toast.success('¡Acceso otorgado! Abriendo recurso...');
        onClose();
      } else {
        toast.error('Error al procesar. Intenta de nuevo.');
      }
    } catch (error) {
      toast.error('Error al acceder al recurso. Intenta de nuevo.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card border border-border rounded-lg max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 p-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {resource.icon}
              <h2 className="text-xl font-bold text-white">{resource.title}</h2>
            </div>
            <p className="text-gray-300 text-sm">{resource.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {savedEmail ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-100">
                ✓ Email guardado: <span className="font-semibold">{savedEmail}</span>
              </p>
              <p className="text-xs text-green-100/70 mt-1">
                Usaremos este email para todos los recursos
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tu Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                disabled={isLoading}
                required
              />
              <p className="text-xs text-gray-400 mt-2">
                Guarda tu email para acceder a todos los recursos sin volver a escribirlo
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Download size={18} />
            {isLoading ? 'Procesando...' : 'Acceder al Recurso'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-gray-400 hover:text-white transition-colors py-2"
          >
            Cerrar
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function FreeResourcesSection() {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [savedEmail, setSavedEmail] = useState<string | null>(null);

  // Load saved email from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('resourceEmail');
    if (stored) {
      setSavedEmail(stored);
    }
  }, []);

  const resources = [
    {
      id: 'guide_7_errors',
      title: 'Guía: 7 Errores que Impiden tu Definición',
      description: 'Descubre los 7 errores más comunes que sabotean tu transformación corporal.',
      icon: <BookOpen className="w-6 h-6 text-accent" />,
      color: 'from-blue-500/10 to-blue-600/10',
      url: '/guide',
    },
    {
      id: 'calculator_macros',
      title: 'Calculadora de Macros Personalizada',
      description: 'Calcula tus macronutrientes ideales basado en tu peso y objetivo.',
      icon: <Calculator className="w-6 h-6 text-accent" />,
      color: 'from-purple-500/10 to-purple-600/10',
      url: '/calculadora',
    },
    {
      id: 'checklist_30_days',
      title: 'Checklist: 30 Días para Empezar',
      description: 'Plan de acción día a día para los primeros 30 días de transformación.',
      icon: <CheckCircle2 className="w-6 h-6 text-accent" />,
      color: 'from-green-500/10 to-green-600/10',
      url: '/checklist-30-dias',
    },
  ];

  const handleResourceClick = (resourceId: string) => {
    // If email is already saved, directly open the resource
    if (savedEmail) {
      const resource = resources.find(r => r.id === resourceId);
      if (resource) {
        window.open(resource.url, '_blank');
        toast.success('¡Abriendo recurso!');
      }
    } else {
      // Otherwise show modal to collect email
      setSelectedResource(resourceId);
    }
  };

  return (
    <section className="relative py-6 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Recursos Gratuitos
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Accede a herramientas y guías que acelerarán tu transformación. Sin costo, sin compromiso.
          </p>
          {savedEmail && (
            <p className="text-accent text-sm mt-3">
              ✓ Email guardado: <span className="font-semibold">{savedEmail}</span> · 
              <button 
                onClick={() => {
                  localStorage.removeItem('resourceEmail');
                  setSavedEmail(null);
                  toast.success('Email eliminado');
                }}
                className="ml-2 text-accent hover:underline"
              >
                Cambiar
              </button>
            </p>
          )}
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-gradient-to-br ${resource.color} border border-border rounded-lg p-6 hover:border-accent transition-all duration-300 cursor-pointer group`}
              onClick={() => handleResourceClick(resource.id)}
            >
              <div className="mb-4">{resource.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {resource.title}
              </h3>
              <p className="text-gray-400 text-sm mb-6">{resource.description}</p>

              <button className="w-full bg-accent hover:bg-accent/90 text-black font-bold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                <Download size={16} />
                {savedEmail ? 'Acceder Ahora' : 'Descargar Gratis'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust Message */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            ✓ Sin spam · ✓ Sin compromisos · ✓ Acceso inmediato
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedResource && (
        <ResourceDownloadModal
          resource={resources.find((r) => r.id === selectedResource)!}
          onClose={() => setSelectedResource(null)}
          savedEmail={savedEmail}
          onEmailSaved={setSavedEmail}
        />
      )}
    </section>
  );
}
