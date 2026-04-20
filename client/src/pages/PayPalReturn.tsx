import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function PayPalReturn() {
  const [, navigate] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [orderData, setOrderData] = useState<any>(null);

  const paypalCaptureOrder = trpc.paypal.captureOrder.useMutation();

  useEffect(() => {
    const capturePayment = async () => {
      try {
        // Get token from URL params
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (!token) {
          setStatus('error');
          setMessage('No se encontró el token de PayPal');
          return;
        }

        // Capture the order
        const result = await paypalCaptureOrder.mutateAsync({
          orderId: token,
        });

        if (result.success) {
          setStatus('success');
          setMessage('¡Pago completado exitosamente!');
          setOrderData(result);

          // Redirect to success page after 3 seconds
          setTimeout(() => {
            navigate('/payment-success');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(result.error || 'Error al procesar el pago');
        }
      } catch (error) {
        console.error('Capture error:', error);
        setStatus('error');
        setMessage('Error al procesar el pago. Intenta de nuevo.');
      }
    };

    capturePayment();
  }, [paypalCaptureOrder, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 bg-slate-900/50 border-slate-700 text-center">
            {status === 'loading' && (
              <div className="space-y-4">
                <Loader2 className="w-16 h-16 mx-auto text-amber-400 animate-spin" />
                <h2 className="text-2xl font-bold">Procesando pago...</h2>
                <p className="text-gray-400">Por favor espera mientras confirmamos tu pago</p>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4">
                <CheckCircle className="w-16 h-16 mx-auto text-green-400" />
                <h2 className="text-2xl font-bold">¡Pago Completado!</h2>
                <p className="text-gray-400">{message}</p>
                {orderData?.email && (
                  <p className="text-sm text-gray-300">
                    Confirmación enviada a: <span className="font-bold">{orderData.email}</span>
                  </p>
                )}
                <p className="text-sm text-gray-400 mt-4">
                  Redirigiendo a la página de éxito...
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <AlertCircle className="w-16 h-16 mx-auto text-red-400" />
                <h2 className="text-2xl font-bold">Error en el Pago</h2>
                <p className="text-gray-400">{message}</p>
                <Button
                  onClick={() => navigate('/price')}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold"
                >
                  Volver a Intentar
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
