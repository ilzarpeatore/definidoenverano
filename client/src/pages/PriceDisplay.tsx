import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CreditCard, Wallet, Zap, Loader2 } from 'lucide-react';
import { BorderBeam } from 'border-beam';
import { trpc } from '@/lib/trpc';
import { useLocation } from 'wouter';
import BizumModal from '@/components/BizumModal';

type PaymentMethod = 'paypal' | 'card' | 'bizum' | null;

export default function PriceDisplay() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBizumModal, setShowBizumModal] = useState(false);
  const [customerData, setCustomerData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [, navigate] = useLocation();
  const price = 197; // Changed to €197

  const paypalCreateOrder = trpc.paypal.createOrder.useMutation();
  const stripeCreateCheckout = trpc.stripe.createCheckoutSession.useMutation();
  const createPayment = trpc.payment.createBizumPayment.useMutation();

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    // For Bizum, show the modal instead of redirecting
    if (selectedMethod === 'bizum') {
      setShowBizumModal(true);
      return;
    }

    setIsLoading(true);

    try {
      const origin = window.location.origin;
      const returnUrl = `${origin}/stripe-return`;
      const cancelUrl = `${origin}/stripe-cancel`;

      if (selectedMethod === 'paypal') {
        const paypalReturnUrl = `${origin}/paypal-return`;
        const paypalCancelUrl = `${origin}/paypal-cancel`;

        const result = await paypalCreateOrder.mutateAsync({
          amount: price,
          returnUrl: paypalReturnUrl,
          cancelUrl: paypalCancelUrl,
        });

        if (result.success && result.approvalUrl) {
          window.location.href = result.approvalUrl;
        } else {
          alert(`Error: ${result.error || 'No se pudo crear la orden de PayPal'}`);
        }
      } else if (selectedMethod === 'card') {
        const result = await stripeCreateCheckout.mutateAsync({
          amount: price,
          paymentMethod: 'card',
          returnUrl,
          cancelUrl,
        });

        if (result.success && result.checkoutUrl) {
          window.location.href = result.checkoutUrl;
        } else {
          alert(`Error: ${result.error || 'No se pudo crear la sesión de pago'}`);
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Error al procesar el pago. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBizumConfirm = async () => {
    try {
      setIsLoading(true);

      // Create payment record for Bizum
      const result = await createPayment.mutateAsync({
        email: customerData.email,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        phone: customerData.phone,
        amount: price,
        paymentMethod: 'bizum',
      });

      if (result.success) {
        setShowBizumModal(false);
        alert('¡Gracias! Tu información ha sido registrada. Recibirás un email de confirmación en las próximas 24 horas.');
        // Reset form
        setSelectedMethod(null);
        setCustomerData({
          email: '',
          firstName: '',
          lastName: '',
          phone: '',
        });
      } else {
        alert(`Error: ${result.error || 'No se pudo registrar el pago'}`);
      }
    } catch (error) {
      console.error('Bizum confirmation error:', error);
      alert('Error al confirmar el pago. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Tu Plan Personalizado</h1>
          <p className="text-gray-300 text-lg">
            Acceso completo al Método RESET por solo
          </p>
          <div className="mt-6 text-5xl font-bold text-amber-400">
            €{price.toFixed(2)}
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          {/* PayPal */}
          <div
            onClick={() => setSelectedMethod('paypal')}
            className={`relative cursor-pointer transition-all ${
              selectedMethod === 'paypal' ? 'ring-2 ring-amber-400' : ''
            }`}
          >
            <BorderBeam colorVariant="sunset" size="md" theme="dark">
              <Card className="p-6 bg-slate-900/50 border-slate-700 hover:border-amber-400/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Wallet className="w-8 h-8 text-amber-400" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">PayPal</h3>
                    <p className="text-gray-400 text-sm">Paga en cuotas sin intereses</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">€{price.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">Pago único o cuotas</div>
                  </div>
                </div>
              </Card>
            </BorderBeam>
          </div>

          {/* Credit Card */}
          <div
            onClick={() => setSelectedMethod('card')}
            className={`relative cursor-pointer transition-all ${
              selectedMethod === 'card' ? 'ring-2 ring-blue-400' : ''
            }`}
          >
            <BorderBeam colorVariant="ocean" size="md" theme="dark">
              <Card className="p-6 bg-slate-900/50 border-slate-700 hover:border-blue-400/50 transition-colors">
                <div className="flex items-center gap-4">
                  <CreditCard className="w-8 h-8 text-blue-400" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Tarjeta de Crédito</h3>
                    <p className="text-gray-400 text-sm">Visa, Mastercard, Amex</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">€{price.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">Pago único</div>
                  </div>
                </div>
              </Card>
            </BorderBeam>
          </div>

          {/* Bizum */}
          <div
            onClick={() => setSelectedMethod('bizum')}
            className={`relative cursor-pointer transition-all ${
              selectedMethod === 'bizum' ? 'ring-2 ring-purple-400' : ''
            }`}
          >
            <BorderBeam colorVariant="colorful" size="md" theme="dark">
              <Card className="p-6 bg-slate-900/50 border-slate-700 hover:border-purple-400/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Zap className="w-8 h-8 text-purple-400" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Bizum</h3>
                    <p className="text-gray-400 text-sm">Transferencia instantánea</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">€{price.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">Pago único</div>
                  </div>
                </div>
              </Card>
            </BorderBeam>
          </div>
        </motion.div>

        {/* Payment Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <Button
            onClick={handlePayment}
            disabled={!selectedMethod || isLoading}
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Procesando...
              </>
            ) : (
              'Proceder al Pago'
            )}
          </Button>

          <p className="text-center text-sm text-gray-400">
            Tu información está protegida con encriptación SSL de 256 bits
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-3 gap-4 text-center"
        >
          <div>
            <div className="text-2xl font-bold text-amber-400 mb-2">✓</div>
            <p className="text-sm text-gray-300">Acceso inmediato</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400 mb-2">✓</div>
            <p className="text-sm text-gray-300">Garantía 30 días</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400 mb-2">✓</div>
            <p className="text-sm text-gray-300">Soporte 24/7</p>
          </div>
        </motion.div>
      </div>

      {/* Bizum Modal */}
      <BizumModal
        isOpen={showBizumModal}
        onClose={() => setShowBizumModal(false)}
        onConfirm={handleBizumConfirm}
      />
    </div>
  );
}
