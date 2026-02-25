import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, BookOpen, Calculator, CheckCircle2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface ResourceDownloadModalProps {
  resource: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  onClose: () => void;
}

function ResourceDownloadModal({ resource, onClose }: ResourceDownloadModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const createLeadMutation = trpc.leads.createLeadFromResource.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);

    try {
      const result = await createLeadMutation.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        resourceType: resource.id as "guide_7_errors" | "calculator_macros" | "checklist_30_days",
      });

      if (result.success) {
        toast.success('¡Recurso descargado! Revisa tu email.');
        setFormData({ firstName: '', lastName: '', email: '' });
        onClose();
      } else {
        toast.error('Error al descargar el recurso');
      }
    } catch (error) {
      toast.error('Error al descargar. Intenta de nuevo.');
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
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            {resource.icon}
            <h2 className="text-xl font-bold text-white">{resource.title}</h2>
          </div>
          <p className="text-gray-300 text-sm">{resource.description}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Tu nombre"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Apellido
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Tu apellido"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="tu@email.com"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Download size={18} />
            {isLoading ? 'Descargando...' : 'Descargar Recurso'}
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

  const resources = [
    {
      id: 'guide_7_errors',
      title: 'Guía: 7 Errores que Impiden tu Definición',
      description: 'Descubre los 7 errores más comunes que sabotean tu transformación corporal.',
      icon: <BookOpen className="w-6 h-6 text-accent" />,
      color: 'from-blue-500/10 to-blue-600/10',
    },
    {
      id: 'calculator_macros',
      title: 'Calculadora de Macros Personalizada',
      description: 'Calcula tus macronutrientes ideales basado en tu peso y objetivo.',
      icon: <Calculator className="w-6 h-6 text-accent" />,
      color: 'from-purple-500/10 to-purple-600/10',
    },
    {
      id: 'checklist_30_days',
      title: 'Checklist: 30 Días para Empezar',
      description: 'Plan de acción día a día para los primeros 30 días de transformación.',
      icon: <CheckCircle2 className="w-6 h-6 text-accent" />,
      color: 'from-green-500/10 to-green-600/10',
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-background">
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
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-gradient-to-br ${resource.color} border border-border rounded-lg p-6 hover:border-accent transition-all duration-300 cursor-pointer group`}
              onClick={() => setSelectedResource(resource.id)}
            >
              <div className="mb-4">{resource.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {resource.title}
              </h3>
              <p className="text-gray-400 text-sm mb-6">{resource.description}</p>

              <button className="w-full bg-accent hover:bg-accent/90 text-black font-bold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                <Download size={16} />
                Descargar Gratis
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
        />
      )}
    </section>
  );
}
