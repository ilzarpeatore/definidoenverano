import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Download, MessageCircle } from 'lucide-react';
import { useLocation } from 'wouter';

export default function PaymentSuccess() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <CheckCircle className="w-20 h-20 mx-auto text-green-400 mb-4" />
          <h1 className="text-4xl font-bold mb-4">¡Pago Completado!</h1>
          <p className="text-xl text-gray-300">
            Bienvenido al Método RESET
          </p>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          {/* Email Confirmation */}
          <Card className="p-6 bg-slate-900/50 border-slate-700">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500/20">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Confirmación por Email</h3>
                <p className="text-gray-400">
                  Hemos enviado un email de confirmación con los detalles de tu compra
                </p>
              </div>
            </div>
          </Card>

          {/* Access Credentials */}
          <Card className="p-6 bg-slate-900/50 border-slate-700">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500/20">
                  <MessageCircle className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Datos de Acceso</h3>
                <p className="text-gray-400">
                  En breve recibirás por WhatsApp tus credenciales de acceso a la app
                </p>
              </div>
            </div>
          </Card>

          {/* Download Resources */}
          <Card className="p-6 bg-slate-900/50 border-slate-700">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500/20">
                  <Download className="h-6 w-6 text-amber-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Recursos Disponibles</h3>
                <p className="text-gray-400">
                  Acceso inmediato a todos los materiales del programa
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          <Button
            onClick={() => window.open('https://apps.apple.com/es/app/hubfit/id6448201245', '_blank')}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-6"
          >
            Descargar App iOS
          </Button>
          <Button
            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.hubfitapp&pcampaignid=web_share', '_blank')}
            className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-6"
          >
            Descargar App Android
          </Button>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-slate-900/30 border border-slate-700 rounded-lg p-6 mb-8"
        >
          <h3 className="font-bold text-lg mb-4">¿Qué sigue?</h3>
          <ol className="space-y-3 text-gray-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold text-amber-400">1.</span>
              <span>Descarga la app HubFit en tu dispositivo</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold text-amber-400">2.</span>
              <span>Espera el mensaje de WhatsApp con tus credenciales</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold text-amber-400">3.</span>
              <span>Inicia sesión con tus datos en la app</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold text-amber-400">4.</span>
              <span>¡Comienza tu transformación!</span>
            </li>
          </ol>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-4">¿Tienes preguntas?</p>
          <Button
            onClick={() => window.open('https://wa.me/34643991086', '_blank')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            Contactar por WhatsApp
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
