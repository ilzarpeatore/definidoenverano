import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export default function PayPalCancel() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 bg-slate-900/50 border-slate-700 text-center space-y-4">
            <XCircle className="w-16 h-16 mx-auto text-red-400" />
            <h2 className="text-2xl font-bold">Pago Cancelado</h2>
            <p className="text-gray-400">
              Has cancelado el proceso de pago. No se ha realizado ningún cargo en tu cuenta.
            </p>
            
            <div className="space-y-3 pt-4">
              <Button
                onClick={() => navigate('/price')}
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold"
              >
                Volver a Intentar
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
              >
                Volver al Inicio
              </Button>
            </div>

            <p className="text-sm text-gray-400 pt-4">
              Si tienes problemas, contacta con nosotros por WhatsApp
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
