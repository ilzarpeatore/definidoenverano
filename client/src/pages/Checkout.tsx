import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
import { PricingProgressBar } from '@/components/PricingProgressBar';
import { usePricing } from '@/contexts/PricingContext';

/**
 * Checkout Page - Stripe Payment Gateway
 * Design Philosophy: Trust, Security, Simple Payment Flow
 * - Single payment button
 * - Stripe handles all payment methods
 * - Security badges
 * - Clear pricing and guarantee
 */

export default function Checkout() {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const pricing = usePricing();

  // Track checkout page view for retargeting
  useEffect(() => {
    // Meta Pixel - ViewContent event
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Checkout Page',
        content_type: 'product',
        value: 197,
        currency: 'EUR',
      });
    }
    // Google Ads - Page view
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: '/checkout',
        page_title: 'Checkout',
      });
    }
  }, []);

  const handleStripePayment = async () => {
    if (!consentAccepted) {
      toast.error('Debes aceptar el consentimiento informado para continuar');
      return;
    }

    setIsLoading(true);

    try {
      // Track AddToCart event for retargeting
      if (window.fbq) {
        window.fbq('track', 'AddToCart', {
          content_name: 'Definido en Verano Program',
          content_type: 'product',
          value: 197,
          currency: 'EUR',
        });
      }

      // Get checkout URL from localStorage (saved by Assessment)
      const checkoutUrl = localStorage.getItem('checkoutUrl');
      
      if (checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = checkoutUrl;
        return;
      }

      // Fallback: if no checkoutUrl, show error
      toast.error('Error: Sesión de pago no encontrada. Por favor, completa el assessment de nuevo.');
      setIsLoading(false);
      setTimeout(() => navigate('/quick-assessment'), 2000);
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Error al procesar el pago. Intenta de nuevo.');
      setIsLoading(false);
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
            onClick={() => navigate('/quick-assessment')}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <h1 className="font-display text-3xl md:text-4xl text-white">
            Completa tu compra
          </h1>
          <p className="text-gray-400 mt-2">
            Acceso inmediato al programa Definido en Verano
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
            {/* Payment Section */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <h2 className="font-display text-2xl text-white mb-6">
                Selecciona tu método de pago
              </h2>

              <motion.div
                className="p-6 rounded-sm border-2 border-accent bg-accent/5 card-glass"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">💳</span>
                  <div>
                    <h3 className="font-heading text-white font-bold text-lg">
                      Tarjeta de Crédito & Más
                    </h3>
                    <p className="text-sm text-gray-400">
                      Visa, Mastercard, Apple Pay, Google Pay, PayPal, Klarna
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mt-4">
                  Podrás elegir tu método de pago preferido en la siguiente pantalla. Stripe soporta múltiples opciones de pago seguras.
                </p>
              </motion.div>

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
                  <p className="text-sm text-gray-400 mb-4">
                    Acceso de 3 meses al programa completo
                  </p>

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Precio actual:</span>
                      <span className="font-bold text-white">€{pricing.currentPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Progress */}
                {pricing && (
                  <div className="mb-6">
                    <PricingProgressBar />
                  </div>
                )}

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-gray-300">Total:</span>
                    <div>
                      <span className="font-display text-3xl text-orange-400 font-bold">
                        €{pricing.currentPrice}
                      </span>
                      <span className="text-gray-400 text-sm ml-2">EUR</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Pago único - Acceso de 3 meses</p>
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

                {/* Informed Consent Checkbox */}
                <motion.div
                  className="mb-6 p-4 bg-accent/5 border border-accent/30 rounded-sm"
                  variants={itemVariants}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      className="w-5 h-5 accent-accent rounded mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-300">
                        Acepto el{' '}
                        <a href="/informed-consent" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-semibold">
                          Consentimiento Informado
                        </a>
                        {' '}para la practica de ejercicio fisico
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Declaro que he leido y acepto los terminos del consentimiento informado
                      </p>
                    </div>
                  </label>
                </motion.div>

                {/* Payment Button */}
                <div className="flex gap-4">
                  <Button
                    onClick={() => navigate('/assessment-results')}
                    variant="outline"
                    className="flex-1 py-6 rounded-sm"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver
                  </Button>
                  <Button
                    onClick={handleStripePayment}
                    disabled={isLoading || !consentAccepted}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 rounded-sm btn-glow disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Redirigiendo...
                      </span>
                    ) : (
                      `Pagar €${pricing.currentPrice}`
                    )}
                  </Button>
                </div>

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
