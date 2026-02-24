import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Check, Download, Mail, Users } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

/**
 * Success Page - Post-Purchase Confirmation
 * Design Philosophy: Celebration, Next Steps, Community
 * - Confirmation of purchase
 * - Immediate access information
 * - Next steps guidance
 * - Community access
 */

interface OrderData {
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
}

export default function Success() {
  const [, navigate] = useLocation();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [clientInfo, setClientInfo] = useState({ email: '', firstName: '' });

  const getOrderStatusQuery = trpc.payments.getOrderStatus.useQuery(
    { orderId: orderData?.orderId || '' },
    { enabled: !!orderData?.orderId }
  );

  useEffect(() => {
    // Cargar datos de localStorage
    const successOrderId = localStorage.getItem('successOrderId');
    const savedClientInfo = localStorage.getItem('clientInfo');

    if (!successOrderId) {
      toast.error('Error: No se encontró la orden. Vuelve al inicio.');
      navigate('/');
      return;
    }

    if (savedClientInfo) {
      const parsed = JSON.parse(savedClientInfo);
      setClientInfo({
        email: parsed.email,
        firstName: parsed.firstName,
      });
    }

    // Simular datos de orden (en producción, esto vendría del backend)
    setOrderData({
      orderId: successOrderId,
      amount: 19700,
      currency: 'EUR',
      status: 'completed',
      paymentMethod: 'stripe',
    });

    // Limpiar localStorage
    localStorage.removeItem('successOrderId');
    localStorage.removeItem('currentOrderId');
    localStorage.removeItem('assessmentData');
    localStorage.removeItem('clientInfo');
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const nextSteps = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Revisa tu email',
      description: 'Hemos enviado tus credenciales de acceso a tu correo',
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'Descarga el programa',
      description: 'Acceso a todos los entrenamientos, nutrición y guías',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Únete a la comunidad',
      description: 'Conecta con otros hombres en tu mismo camino',
    },
  ];

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Success Header */}
      <motion.div
        className="flex-1 flex items-center justify-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container max-w-2xl mx-auto px-4 text-center">
          {/* Success Icon */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="w-24 h-24 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center">
              <Check className="w-12 h-12 text-accent" />
            </div>
          </motion.div>

          {/* Main Message */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="font-display text-5xl md:text-6xl text-white mb-4"
              variants={itemVariants}
            >
              ¡Bienvenido, {clientInfo.firstName || 'campeón'}!
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8"
              variants={itemVariants}
            >
              Tu compra fue exitosa. Tu transformación comienza ahora.
            </motion.p>

            {/* Order Details */}
            {orderData && (
              <motion.div
                className="card-glass border border-border p-8 rounded-sm mb-12"
                variants={itemVariants}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-left">
                    <p className="text-gray-400 text-sm mb-2">Número de orden</p>
                    <p className="font-mono text-white font-bold">#{orderData.orderId.substring(0, 12).toUpperCase()}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-gray-400 text-sm mb-2">Monto pagado</p>
                    <p className="font-display text-3xl text-accent font-bold">
                      €{formatPrice(orderData.amount)}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Estado del pago:</span>
                    <span className="flex items-center gap-2 text-accent font-bold">
                      <Check className="w-4 h-4" />
                      {orderData.status === 'completed' ? 'Completado' : 'Procesando'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next Steps */}
            <motion.div
              className="mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="font-display text-2xl text-white mb-8">Próximos pasos</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="card-glass border border-border p-6 rounded-sm text-center"
                    variants={itemVariants}
                  >
                    <div className="flex justify-center mb-4 text-accent">
                      {step.icon}
                    </div>
                    <h3 className="font-heading text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Access Info */}
            <motion.div
              className="bg-accent/10 border border-accent/30 rounded-sm p-8 mb-12"
              variants={itemVariants}
            >
              <h3 className="font-heading text-white mb-4 text-lg">Tu acceso incluye:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-200">Programa completo de 12 semanas</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-200">Entrenamientos personalizados</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-200">Plan de nutrición adaptado</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-200">Comunidad privada</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-200">Soporte directo del coach</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-200">Actualizaciones de por vida</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col md:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Button
                onClick={() => navigate('/')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 px-8 rounded-sm btn-glow"
              >
                Acceder a la plataforma
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="font-bold py-6 px-8 rounded-sm"
              >
                Volver al inicio
              </Button>
            </motion.div>

            {/* Support Info */}
            <motion.p
              className="text-sm text-gray-400 mt-12"
              variants={itemVariants}
            >
              ¿Preguntas? Contacta a nuestro equipo de soporte en{' '}
              <a href="mailto:support@definidoenverano.com" className="text-accent hover:text-accent/80">
                support@definidoenverano.com
              </a>
              {' '}o por WhatsApp
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Guarantee Badge */}
      <div className="bg-card border-t border-border py-6">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            <span className="text-accent font-bold">✓ Garantía de 30 días</span> - Si no estás satisfecho, devolvemos tu dinero sin preguntas
          </p>
        </div>
      </div>
    </div>
  );
}
