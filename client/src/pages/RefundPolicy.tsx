import { motion } from 'framer-motion';
import { ChevronUp, Shield, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

/**
 * Refund Policy Page
 * Guarantee and Return Conditions
 */

export default function RefundPolicy() {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const sections = [
    {
      id: 1,
      title: 'NATURALEZA DEL SERVICIO DIGITAL',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            El servicio ofrecido por Be Stronger consiste en contenido digital personalizado, accesible de forma inmediata tras la contratación, incluyendo acceso a aplicación, programación individualizada y recursos formativos.
          </p>
          <p>
            El cliente reconoce que se trata de contenido digital que puede ser descargado, visualizado o reproducido desde el momento del acceso.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: 'DERECHO DE DESISTIMIENTO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El cliente dispone de un plazo de 30 días naturales para ejercer su derecho de desistimiento.</p>
          <p className="font-semibold">No obstante, conforme a la normativa aplicable en materia de consumidores, el cliente acepta expresamente que:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>El servicio comienza inmediatamente tras la contratación.</li>
            <li>El acceso a la aplicación y al contenido supone la ejecución del contrato.</li>
            <li>Una vez iniciado el acceso al contenido digital, puede perder su derecho de desistimiento.</li>
          </ul>
          <p className="mt-4">El ejercicio del desistimiento no será válido si el cliente ha accedido de manera efectiva al contenido digital o ha recibido programación personalizada.</p>
        </div>
      ),
    },
    {
      id: 3,
      title: 'CONDICIONES DE LA GARANTÍA',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">Be Stronger ofrece garantía sujeta a las siguientes condiciones acumulativas:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Haber seguido el programa conforme a las indicaciones recibidas.</li>
            <li>Haber completado al menos el 80% de las sesiones prescritas.</li>
            <li>Haber registrado actividad en la aplicación.</li>
            <li>Haber comunicado incidencias durante el proceso.</li>
          </ul>
          <p className="mt-4">La falta de cumplimiento de estas condiciones invalidará cualquier solicitud de devolución basada en ausencia de resultados.</p>
        </div>
      ),
    },
    {
      id: 4,
      title: 'AUSENCIA DE GARANTÍA DE RESULTADOS',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">El cliente reconoce que los resultados físicos dependen de múltiples factores ajenos al prestador, incluyendo:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Adherencia al programa.</li>
            <li>Descanso.</li>
            <li>Alimentación.</li>
            <li>Condiciones médicas individuales.</li>
            <li>Constancia y disciplina personal.</li>
          </ul>
          <p className="mt-4">No se garantiza la obtención de resultados físicos, estéticos o de rendimiento concretos.</p>
          <p className="mt-4">La mera ausencia de resultados no constituye incumplimiento contractual.</p>
        </div>
      ),
    },
    {
      id: 5,
      title: 'PROTECCIÓN DE PROPIEDAD INTELECTUAL Y ABUSO DE GARANTÍA',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El acceso al contenido digital es personal e intransferible.</p>
          <p className="font-semibold mt-4">Queda expresamente prohibido:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Realizar capturas, grabaciones o reproducciones del contenido con fines de conservación tras solicitar devolución.</li>
            <li>Compartir el contenido con terceros.</li>
            <li>Descargar o almacenar sistemáticamente materiales con fines distintos al uso personal.</li>
          </ul>
          <p className="mt-4">Be Stronger podrá auditar registros de acceso, actividad en la aplicación y consumo de contenidos.</p>
          <p className="mt-4">Si se detecta uso abusivo, copia de contenido o consumo sustancial del servicio antes de solicitar devolución, la garantía quedará automáticamente anulada.</p>
        </div>
      ),
    },
    {
      id: 6,
      title: 'PREVENCIÓN DE FRAUDE Y CHARGEBACK',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>La contratación implica la aceptación expresa de estas condiciones.</p>
          <p className="font-semibold mt-4">En caso de disputa bancaria o chargeback tras haber accedido al servicio:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Se aportarán registros de acceso, IP, actividad en la app y aceptación contractual.</li>
            <li>Se podrá reclamar el importe por vía legal si se acredita uso efectivo del servicio.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 7,
      title: 'LIMITACIÓN DE RESPONSABILIDAD',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>La responsabilidad máxima de Be Stronger quedará limitada al importe efectivamente abonado por el cliente en el periodo contratado.</p>
          <p className="font-semibold mt-4">No procederán indemnizaciones por:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Expectativas subjetivas no cumplidas.</li>
            <li>Resultados no alcanzados por falta de adherencia.</li>
            <li>Interpretaciones erróneas del servicio ofrecido.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 8,
      title: 'PROCEDIMIENTO DE SOLICITUD',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">Toda solicitud de devolución deberá realizarse por escrito a contacto@bestronger.es dentro del plazo aplicable, indicando:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Nombre completo.</li>
            <li>Fecha de contratación.</li>
            <li>Motivo detallado.</li>
            <li>Declaración responsable de no conservación de materiales.</li>
          </ul>
          <p className="mt-4">Be Stronger podrá requerir información adicional para verificar el cumplimiento de las condiciones de garantía.</p>
        </div>
      ),
    },
    {
      id: 9,
      title: 'ACEPTACIÓN EXPRESA',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">El cliente declara comprender que:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>El servicio es digital y de acceso inmediato.</li>
            <li>El consumo del contenido puede invalidar el desistimiento.</li>
            <li>Los resultados dependen de su implicación personal.</li>
            <li>El uso abusivo de la garantía podrá dar lugar a acciones legales.</li>
          </ul>
        </div>
      ),
    },
  ];

  const toggleSection = (id: number) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-b from-black to-background py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <motion.h1
            className="font-display text-5xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Garantía y Devolución
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Condiciones de garantía y política de devolución - Be Stronger
          </motion.p>
        </div>
      </motion.div>

      {/* Guarantee Highlights */}
      <motion.div
        className="bg-accent/10 border-b border-accent/30 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-1">30 Días</h3>
                <p className="text-sm text-gray-400">Período de desistimiento</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-1">Protegido</h3>
                <p className="text-sm text-gray-400">Garantía de satisfacción</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-1">Transparente</h3>
                <p className="text-sm text-gray-400">Condiciones claras</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="border border-accent/30 rounded-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 bg-accent/10 hover:bg-accent/20 transition-colors flex items-center justify-between"
              >
                <h3 className="font-heading text-lg text-white text-left">
                  {section.id}. {section.title}
                </h3>
                <ChevronUp
                  className={`w-5 h-5 text-accent transition-transform ${
                    expandedSections.includes(section.id) ? '' : 'rotate-180'
                  }`}
                />
              </button>

              {expandedSections.includes(section.id) && (
                <motion.div
                  className="px-6 py-4 bg-background border-t border-accent/30"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {section.content}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          className="mt-16 p-8 bg-accent/10 border border-accent/30 rounded-sm text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-300 mb-6">
            ¿Tienes dudas sobre la garantía o el proceso de devolución?
          </p>
          <a
            href="mailto:contacto@bestronger.es"
            className="inline-block px-8 py-3 bg-accent text-black font-bold rounded-sm hover:bg-accent/90 transition-colors"
          >
            Contactar Soporte
          </a>
        </motion.div>
      </div>
    </div>
  );
}
