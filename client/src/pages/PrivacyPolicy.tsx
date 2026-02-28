import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

/**
 * Privacy Policy Page
 * Legal document for Be Stronger / Definido en Verano
 * GDPR and LOPDGDD compliant
 */

export default function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const sections = [
    {
      id: 1,
      title: 'RESPONSABLE DEL TRATAMIENTO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), se informa que los datos personales recabados a través de este sitio web y del servicio de entrenamiento online serán tratados por:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Marca comercial:</strong> Be Stronger</li>
            <li><strong>NIF:</strong> 17575419</li>
            <li><strong>Email de contacto:</strong> contacto@bestronger.es</li>
            <li><strong>Nº Colegiado COPLEF:</strong> 70.504</li>
          </ul>
        </div>
      ),
    },
    {
      id: 2,
      title: 'DATOS QUE SE RECABAN',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Se podrán recabar las siguientes categorías de datos:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Datos identificativos (nombre, apellidos).</li>
            <li>Datos de contacto (email, teléfono).</li>
            <li>Datos económicos necesarios para la contratación (gestionados por pasarela de pago).</li>
            <li>Datos técnicos (IP, dispositivo, navegador).</li>
            <li><strong>Datos de salud</strong> (lesiones, patologías, limitaciones físicas, historial deportivo).</li>
          </ul>
          <p className="mt-4">Los datos de salud tienen la consideración de categoría especial de datos conforme al artículo 9 del RGPD.</p>
        </div>
      ),
    },
    {
      id: 3,
      title: 'FINALIDAD DEL TRATAMIENTO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Los datos serán tratados con las siguientes finalidades:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Gestionar la contratación del servicio.</li>
            <li>Diseñar programas personalizados de ejercicio.</li>
            <li>Realizar seguimiento y soporte.</li>
            <li>Enviar comunicaciones relacionadas con el servicio.</li>
            <li>Enviar comunicaciones comerciales (si existe consentimiento).</li>
            <li>Cumplir obligaciones legales.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 4,
      title: 'BASE JURÍDICA',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El tratamiento se basa en:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>La ejecución del contrato de prestación de servicios.</li>
            <li>El consentimiento explícito del interesado para el tratamiento de datos de salud.</li>
            <li>El cumplimiento de obligaciones legales.</li>
            <li>El interés legítimo para garantizar la seguridad del servicio.</li>
          </ul>
          <p className="mt-4">El consentimiento para el tratamiento de datos de salud se presta mediante casilla independiente, específica y expresa antes del inicio del servicio.</p>
        </div>
      ),
    },
    {
      id: 5,
      title: 'DECLARACIÓN DE VERACIDAD Y RESPONSABILIDAD DEL USUARIO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El usuario declara que los datos facilitados son veraces, exactos y actualizados.</p>
          <p>La ocultación de información relevante de salud, así como la aportación de datos falsos o incompletos, exime al responsable de cualquier responsabilidad derivada de consecuencias físicas o contractuales.</p>
        </div>
      ),
    },
    {
      id: 6,
      title: 'CONSERVACIÓN DE LOS DATOS',
      content: (
        <div className="space-y-4 text-gray-300">
          <ul className="list-disc list-inside space-y-2">
            <li>Durante la vigencia de la relación contractual.</li>
            <li>Posteriormente, durante los plazos legales exigibles.</li>
            <li>Los datos de salud se conservarán únicamente mientras sean necesarios para la prestación del servicio.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 7,
      title: 'DESTINATARIOS',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>No se cederán datos a terceros salvo obligación legal.</p>
          <p className="font-semibold">Podrán tener acceso a datos, en calidad de encargados del tratamiento:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Proveedor de pasarela de pago (Stripe y métodos asociados).</li>
            <li>Proveedor de aplicación de entrenamiento.</li>
            <li>Proveedor de email marketing.</li>
            <li>Proveedor de alojamiento web.</li>
          </ul>
          <p className="mt-4">En caso de transferencias internacionales de datos, estas se realizarán conforme a garantías adecuadas previstas en el RGPD.</p>
        </div>
      ),
    },
    {
      id: 8,
      title: 'MEDIDAS DE SEGURIDAD',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El responsable aplica medidas técnicas y organizativas apropiadas para garantizar la confidencialidad, integridad y disponibilidad de los datos.</p>
          <p>No obstante, el usuario reconoce que la seguridad absoluta en Internet no puede garantizarse.</p>
        </div>
      ),
    },
    {
      id: 9,
      title: 'DERECHOS DEL INTERESADO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">El usuario podrá ejercer los siguientes derechos:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Acceso.</li>
            <li>Rectificación.</li>
            <li>Supresión.</li>
            <li>Oposición.</li>
            <li>Limitación del tratamiento.</li>
            <li>Portabilidad.</li>
            <li>Retirada del consentimiento en cualquier momento.</li>
          </ul>
          <p className="mt-4">Las solicitudes deberán enviarse a contacto@bestronger.es, adjuntando documento identificativo.</p>
          <p className="mt-4">Asimismo, el interesado puede presentar reclamación ante la Agencia Española de Protección de Datos si considera vulnerados sus derechos.</p>
        </div>
      ),
    },
    {
      id: 10,
      title: 'COMUNICACIONES COMERCIALES',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Solo se enviarán comunicaciones comerciales si el usuario ha prestado consentimiento expreso.</p>
          <p>El usuario podrá darse de baja en cualquier momento mediante el enlace habilitado en cada comunicación.</p>
        </div>
      ),
    },
    {
      id: 11,
      title: 'MENORES DE EDAD',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El servicio está dirigido exclusivamente a mayores de 18 años. No se tratan datos de menores.</p>
        </div>
      ),
    },
    {
      id: 12,
      title: 'LIMITACIÓN DE RESPONSABILIDAD',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">El responsable no será responsable de:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Daños derivados de datos inexactos proporcionados por el usuario.</li>
            <li>Uso fraudulento de credenciales por terceros.</li>
            <li>Brechas de seguridad no imputables por falta de diligencia razonable.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 13,
      title: 'MODIFICACIONES',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El responsable se reserva el derecho a modificar la presente política para adaptarla a novedades legislativas o jurisprudenciales.</p>
        </div>
      ),
    },
    {
      id: 14,
      title: 'ACEPTACIÓN EXPRESA',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El usuario declara haber leído y comprendido la presente Política de Privacidad y consiente expresamente el tratamiento de sus datos personales, incluidos los datos de salud, para las finalidades descritas.</p>
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
            Política de Privacidad
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Be Stronger
          </motion.p>
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
            Si tienes dudas sobre cómo tratamos tus datos, no dudes en contactarnos.
          </p>
          <a
            href="mailto:contacto@bestronger.es"
            className="inline-block px-8 py-3 bg-accent text-black font-bold rounded-sm hover:bg-accent/90 transition-colors"
          >
            Contactar
          </a>
        </motion.div>
      </div>
    </div>
  );
}
