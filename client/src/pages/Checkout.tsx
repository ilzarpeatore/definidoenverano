import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Check, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

/**
 * Checkout Page - Payment Gateway
 * Design Philosophy: Trust, Security, Multiple Payment Options
 * - Clean, minimal design
 * - Stripe + PayPal integration
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
  const [orderId, setOrderId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const paypalContainerRef = useRef<HTMLDivElement>(null);

  // tRPC mutations
  const processPayPalMutation = trpc.payments.processPayPalPayment.useMutation();
  const createCheckoutSessionMutation = trpc.payments.createCheckoutSession.useMutation();

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'stripe',
      name: 'Tarjeta de Crédito',
      icon: '💳',
      description: 'Visa, Mastercard, Apple Pay, Google Pay',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Pago seguro con tu cuenta PayPal',
    },
  ];

  // Cargar orderId desde localStorage
  useEffect(() => {
    const savedOrderId = localStorage.getItem('currentOrderId');
    if (!savedOrderId) {
      toast.error('Error: No se encontró la orden. Vuelve al assessment.');
      navigate('/assessment');
      return;
    }
    setOrderId(savedOrderId);
  }, [navigate]);

  // Renderizar botón de PayPal cuando se selecciona
  useEffect(() => {
    const paypalWindow = window as any;
    if (selectedPayment === 'paypal' && paypalContainerRef.current && paypalWindow.paypal) {
      // Limpiar el contenedor
      paypalContainerRef.current.innerHTML = '';

      // Renderizar botón de PayPal
      paypalWindow.paypal
        .Buttons({
          createOrder: async () => {
            try {
              const response = await fetch('/api/trpc/payments.createPayPalOrder', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  orderId,
                  amount: 197,
                }),
              });
              const data = await response.json();
              return data.result.data.paypalOrderId;
            } catch (error) {
              console.error('Error creating PayPal order:', error);
              toast.error('Error al crear la orden de PayPal');
              throw error;
            }
          },
          onApprove: async (data: any) => {
            try {
              await processPayPalMutation.mutateAsync({
                orderId,
                paypalOrderId: data.orderID,
              });

              toast.success('¡Pago procesado exitosamente!');
              localStorage.setItem('successOrderId', orderId);

              setTimeout(() => {
                navigate('/success');
              }, 500);
            } catch (error) {
              console.error('Error processing PayPal payment:', error);
              toast.error('Error al procesar el pago. Intenta de nuevo.');
            }
          },
          onError: (err: any) => {
            console.error('PayPal error:', err);
            toast.error('Error con PayPal. Intenta de nuevo.');
          },
        })
        .render(paypalContainerRef.current);
    }
  }, [selectedPayment, orderId, navigate, processPayPalMutation]);

  const handleStripePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await createCheckoutSessionMutation.mutateAsync({
        email: 'test@example.com',
        phone: '+34 123 456 789',
        firstName: 'Test',
        lastName: 'User',
        assessment: {
          experienceLevel: 'intermediate',
          yearsTraining: 2,
          mainGoal: 'both',
          bodyAreasToImprove: ['chest'],
          musclesToDevelop: ['biceps'],
          availableTime: '45min',
          motivation: 'test',
        },
      });

      // Redirigir a Stripe Checkout
      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Error al crear la sesión de pago');
      setIsProcessing(false);
    }
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
          <h1 className="font-display text-3xl md:text-4xl text-white">Completa tu compra</h1>
          <p className="text-gray-400 mt-2">Acceso inmediato al programa Definido en Verano</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12">
        <motion.div
          className="container max-w-4xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Payment Methods */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <h2 className="font-display text-2xl text-white mb-6">Selecciona tu método de pago</h2>

            <div className="space-y-3 mb-8">
              {paymentMethods.map((method) => (
                <motion.button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full p-4 rounded-sm border-2 transition-all text-left ${
                    selectedPayment === method.id
                      ? 'border-accent bg-accent/10'
                      : 'border-border bg-card hover:border-accent/50'
                  }`}
                  variants={itemVariants}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl">{method.icon}</span>
                        <h3 className="font-bold text-white">{method.name}</h3>
                      </div>
                      <p className="text-sm text-gray-400">{method.description}</p>
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

            {/* Payment Form */}
            {selectedPayment === 'stripe' ? (
              <Button
                onClick={handleStripePayment}
                disabled={isProcessing}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 rounded-sm btn-glow disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Redirigiendo a Stripe...
                  </span>
                ) : (
                  'Pagar EUR197 con Stripe'
                )}
              </Button>
            ) : (
              <div ref={paypalContainerRef} className="w-full" />
            )}

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
                <p className="text-gray-300 mb-2">Definido en Verano Program</p>
                <p className="text-sm text-gray-400 mb-4">Acceso completo de por vida + actualizaciones</p>

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Precio original:</span>
                    <span className="line-through">€497</span>
                  </div>
                  <div className="flex justify-between text-accent font-bold">
                    <span>Descuento (60%):</span>
                    <span>-€300</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-gray-300">Total:</span>
                  <div>
                    <span className="font-display text-3xl text-accent font-bold">€197</span>
                    <span className="text-gray-400 text-sm ml-2">EUR</span>
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

              {/* Additional Benefits */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-accent" />
                  <span>Acceso inmediato</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-accent" />
                  <span>Soporte 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-accent" />
                  <span>Garantía de 30 días</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
