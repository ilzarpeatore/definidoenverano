import { useLocation } from 'wouter';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StripeCancel() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
        <h1 className="text-2xl font-bold mb-2">Pago Cancelado</h1>
        <p className="text-gray-300 mb-6">
          Has cancelado el proceso de pago. No se ha realizado ningún cargo en tu cuenta.
        </p>
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
      </div>
    </div>
  );
}
