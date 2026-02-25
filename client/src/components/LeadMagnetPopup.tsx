import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function LeadMagnetPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const createLeadMutation = trpc.leads.createLeadFromPopup.useMutation();

  // Mostrar popup después de 15 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      // Verificar si el usuario ya ha cerrado el popup
      const hasClosedPopup = localStorage.getItem('leadMagnetPopupClosed');
      if (!hasClosedPopup) {
        setIsOpen(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Guardar que el usuario cerró el popup (no mostrar de nuevo en 7 días)
    localStorage.setItem('leadMagnetPopupClosed', new Date().toISOString());
  };

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
      });

      if (result.success) {
        toast.success('¡Email registrado! Accede a tu semana gratis en tu app.');
        setFormData({ firstName: '', lastName: '', email: '' });
        handleClose();
      } else {
        toast.error(result.message || 'Error al registrar el email');
      }
    } catch (error) {
      toast.error('Error al registrar. Intenta de nuevo.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-card border border-border rounded-lg max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent/20 to-accent/10 p-6 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold text-white mb-2">
                Semana Gratis de Entrenamiento
              </h2>
              <p className="text-gray-300 text-sm">
                Accede a tu primera semana completa del programa "Definido en Verano" sin costo.
              </p>
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
                className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? 'Registrando...' : 'Acceder a Semana Gratis'}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Accederás a tu semana gratis en la app. Sin tarjeta de crédito requerida.
              </p>
            </form>

            {/* Benefits */}
            <div className="px-6 pb-6 border-t border-border">
              <p className="text-xs font-semibold text-accent mb-3">Lo que incluye:</p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>4 entrenamientos completos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Guía de nutrición básica</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Vídeos de técnica y forma</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
