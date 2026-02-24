import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Check, Lock, ArrowLeft } from 'lucide-react';

/**
 * Checkout Page - Payment Gateway
 * Design Philosophy: Trust, Security, Multiple Payment Options
 * - Clean, minimal design
 * - Multiple payment methods
 * - Security badges
 * - Clear pricing and guarantee
 */

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export default function Checkout() {
  const [, navigate] = useLocation();
  const [selectedPayment, setSelectedPayment] = useState<string>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'stripe',
      name: 'Tarjeta de Crédito',
      icon: '💳',
      description: 'Visa, Mastercard, American Express',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Pago seguro con tu cuenta PayPal',
    },
    {
      id: 'klarna',
      name: 'Klarna',
      icon: '📦',
      description: 'Compra ahora, paga después',
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: '🍎',
      description: 'Pago rápido y seguro',
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: '🔵',
      description: 'Pago con tu cuenta Google',
    },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    setTimeout(() => {
      console.log(`Procesando pago con: ${selectedPayment}`);
      // Aquí iría la integración real con la pasarela de pago
      // Por ahora, redirigimos a una página de éxito simulada
      navigate('/success');
      setIsProcessing(false);
    }, 2000);
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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border py-6">
        <div className="container max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate('/assessment')}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <h1 className="font-display text-3xl md:text-4xl text-white">
            Completa tu compra
          </h1>
          <p className="text-gray-400 mt-2">
            Acceso inmediato al programa Summer Shred
          </p>
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
            {/* Payment Methods */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <h2 className="font-display text-2xl text-white mb-6">
                Selecciona tu método de pago
              </h2>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full p-6 rounded-sm border-2 transition-all text-left card-glass ${
                      selectedPayment === method.id
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{method.icon}</span>
                        <div>
                          <h3 className="font-heading text-white font-bold">
                            {method.name}
                          </h3>
                          <p className="text-sm text-gray-400">{method.description}</p>
                        </div>
                      </div>
                      {selectedPayment === method.id && (
                        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                          <Check className="w-4 h-4 text-accent-foreground" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Security Info */}
              <motion.div
                className="mt-8 p-6 bg-card border border-border rounded-sm"
                variants={itemVariants}
              >
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading text-white mb-2">Pago 100% Seguro</h3>
                    <p className="text-sm text-gray-400">
                      Todos los pagos están encriptados y protegidos. Usamos los estándares de seguridad más altos de la industria.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Order Summary */}
            <motion.div variants={itemVariants}>
              <div className="card-glass border border-border p-6 rounded-sm sticky top-4">
                <h3 className="font-display text-xl text-white mb-6">Resumen de compra</h3>

                {/* Product */}
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-gray-300 mb-2">Summer Shred Program</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Acceso completo de por vida + actualizaciones
                  </p>

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Precio original:</span>
                      <span className="line-through">$497</span>
                    </div>
                    <div className="flex justify-between text-accent font-bold">
                      <span>Descuento (60%):</span>
                      <span>-$300</span>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-gray-300">Total:</span>
                    <div>
                      <span className="font-display text-3xl text-accent font-bold">
                        $197
                      </span>
                      <span className="text-gray-400 text-sm ml-2">USD</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Pago único - Acceso de por vida</p>
                </div>

                {/* Guarantee Badge */}
                <motion.div
                  className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-sm text-center"
                  variants={itemVariants}
                >
                  <p className="text-sm text-accent font-bold mb-1">✓ Garantía de 30 días</p>
                  <p className="text-xs text-gray-400">
                    Devolvemos tu dinero sin preguntas si no estás satisfecho
                  </p>
                </motion.div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 rounded-sm btn-glow disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Procesando...
                    </span>
                  ) : (
                    `Pagar $197 con ${paymentMethods.find(m => m.id === selectedPayment)?.name}`
                  )}
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

      {/* Footer Info */}
      <div className="bg-card border-t border-border py-6">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <p className="text-sm text-gray-400">
                <span className="text-accent font-bold">✓</span> Acceso inmediato
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">
                <span className="text-accent font-bold">✓</span> Soporte 24/7
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">
                <span className="text-accent font-bold">✓</span> Garantía de 30 días
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
