import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function LeadMagnetPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    painLevel: '5',
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
    
    if (!formData.firstName || !formData.email) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);

    try {
      const result = await createLeadMutation.mutateAsync({
        firstName: formData.firstName,
        lastName: '',
        email: formData.email,
      });

      if (result.success) {
        toast.success('¡Perfecto! Recibirás tu valoración personalizada en tu email.');
        setFormData({ firstName: '', email: '', painLevel: '5' });
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
            <div className="bg-gradient-to-r from-accent/20 to-secondary/20 p-6 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold text-white mb-2">
                Valoración Personalizada Gratuita
              </h2>
              <p className="text-gray-300 text-sm">
                Descubre cómo el Método RESET puede aliviar tu dolor lumbar en 6 semanas.
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

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  ¿Cuál es tu nivel de dolor? (1-10)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.painLevel}
                    onChange={(e) => setFormData({ ...formData, painLevel: e.target.value })}
                    className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                    disabled={isLoading}
                  />
                  <span className="text-white font-bold text-lg w-8 text-center">
                    {formData.painLevel}
                  </span>
                </div>
              </div>

              {/* Acceptance text */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 mb-3">
                <p className="text-xs text-gray-300 leading-relaxed">
                  Al registrarte, aceptas recibir tu valoración personalizada y consejos sobre el Método RESET. Puedes darte de baja en cualquier momento. Lee nuestros <a href="/terms" target="_blank" className="text-accent hover:underline">Términos y Condiciones</a> para más información.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? 'Enviando...' : 'Recibir Valoración Gratuita'}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Respuesta en menos de 24 horas. Sin compromiso.
              </p>
            </form>

            {/* Benefits */}
            <div className="px-6 pb-6 border-t border-border">
              <p className="text-xs font-semibold text-accent mb-3">Tu valoración incluye:</p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">✓</span>
                  <span>Análisis de tu tipo de dolor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">✓</span>
                  <span>Plan personalizado para ti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">✓</span>
                  <span>Acceso a recursos exclusivos</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
