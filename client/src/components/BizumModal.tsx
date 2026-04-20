import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface BizumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  firstName?: string;
  lastName?: string;
}

export default function BizumModal({ isOpen, onClose, onConfirm, firstName = '', lastName = '' }: BizumModalProps) {
  const [copied, setCopied] = useState(false);
  const bizumNumber = '+34 677 177 641';
  const amount = '€197,00';
  const conceptText = firstName && lastName ? `RESET ${firstName} ${lastName}` : 'RESET + Tu nombre y apellidos';

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(bizumNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-400">
            Pago por Bizum
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Instructions */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-400/20 text-amber-400">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white">Abre tu app de Bizum</h3>
                <p className="text-sm text-gray-300">
                  En tu banco o app de Bizum
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-400/20 text-amber-400">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white">Envía el pago a este número</h3>
                <div className="mt-2 flex items-center gap-2">
                  <code className="flex-1 bg-slate-800 px-3 py-2 rounded text-sm font-mono text-amber-400">
                    {bizumNumber}
                  </code>
                  <button
                    onClick={handleCopyNumber}
                    className="p-2 hover:bg-slate-800 rounded transition-colors"
                    title="Copiar número"
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-400/20 text-amber-400">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white">Cantidad a enviar</h3>
                <p className="text-sm text-gray-300 mt-1">
                  <span className="text-lg font-bold text-amber-400">{amount}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-400/20 text-amber-400">
                  4
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white">En el concepto escribe</h3>
                <code className="block mt-2 bg-slate-800 px-3 py-2 rounded text-sm text-amber-400">
                  {conceptText}
                </code>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-100">
              <p className="font-semibold mb-1">Importante</p>
              <p>
                Después de enviar el Bizum, tu acceso será confirmado a lo largo del día (generalmente en minutos).
                Recibirás un email con tus credenciales de acceso.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-300 mb-2">¿Problemas con el pago?</p>
            <a
              href="https://wa.me/34677177641"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <span>Contacta por WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-800"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold"
          >
            He enviado el Bizum
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
