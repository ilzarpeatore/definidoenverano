import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, AlertCircle } from 'lucide-react';

interface PayPalContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PayPalContactModal({ isOpen, onClose }: PayPalContactModalProps) {
  const whatsappNumber = '34677177641';
  const whatsappMessage = encodeURIComponent(
    'Hola, me gustaría pagar el programa RESET por PayPal. ¿Puedo hacerlo en un solo pago o en cuotas fraccionadas?'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-400">
            Pago con PayPal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Main Message */}
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-100">
              <p className="font-semibold mb-2">Estamos configurando PayPal</p>
              <p className="mb-3">
                Para pagar con PayPal en un solo pago o en cuotas fraccionadas, por favor contacta con nosotros vía WhatsApp.
              </p>
              <p className="text-xs text-blue-200">
                Nuestro equipo te ayudará a configurar tu pago de forma rápida y segura.
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Opciones de pago:</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">•</span>
                  <span>Pago único de €197</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">•</span>
                  <span>Cuotas fraccionadas (sin intereses)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-300 mb-3">Contacta con nosotros por:</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Additional Info */}
          <div className="text-center text-xs text-gray-400">
            <p>Responderemos en menos de 1 hora</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <Button
            onClick={onClose}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
