import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StripeReturn() {
  const [, navigate] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  const verifyCheckout = trpc.stripe.verifyCheckout.useMutation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');

        if (!sessionId) {
          setStatus('error');
          setMessage('No se encontró la sesión de pago');
          return;
        }

        const result = await verifyCheckout.mutateAsync({ sessionId });

        if (result.success) {
          setStatus('success');
          setMessage('¡Pago completado exitosamente! Accede a tu cuenta para comenzar.');
          
          // Redirect to success page after 3 seconds
          setTimeout(() => {
            navigate('/payment-success');
          }, 3000);
        } else {
          setStatus('error');
          const errorMsg = 'error' in result ? (result as any).error : 'No se pudo verificar el pago';
          setMessage(errorMsg || 'No se pudo verificar el pago');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('Error al verificar el pago');
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-amber-400" />
            <h1 className="text-2xl font-bold mb-2">Verificando pago...</h1>
            <p className="text-gray-300">Por favor espera mientras procesamos tu pago</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
            <h1 className="text-2xl font-bold mb-2">¡Pago Completado!</h1>
            <p className="text-gray-300 mb-6">{message}</p>
            <Button
              onClick={() => navigate('/payment-success')}
              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3"
            >
              Continuar
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <h1 className="text-2xl font-bold mb-2">Error en el Pago</h1>
            <p className="text-gray-300 mb-6">{message}</p>
            <div className="space-y-2">
              <Button
                onClick={() => navigate('/price')}
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3"
              >
                Intentar de Nuevo
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full border-gray-400 text-gray-300 hover:bg-slate-800 py-3"
              >
                Volver al Inicio
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
