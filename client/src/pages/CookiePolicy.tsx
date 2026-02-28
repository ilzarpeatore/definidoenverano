import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

/**
 * Cookie Policy Page
 * AEPD 2023 compliant
 * Legal document for Be Stronger / Definido en Verano
 */

export default function CookiePolicy() {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const sections = [
    {
      id: 1,
      title: '¿QUÉ SON LAS COOKIES?',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario al visitar un sitio web. Permiten reconocer al usuario, mejorar la experiencia de navegación y obtener información estadística.</p>
        </div>
      ),
    },
    {
      id: 2,
      title: 'RESPONSABLE',
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>Marca comercial:</strong> Be Stronger</li>
          <li><strong>NIF:</strong> 17575419</li>
          <li><strong>Email:</strong> contacto@bestronger.es</li>
        </ul>
      ),
    },
    {
      id: 3,
      title: 'TIPOS DE COOKIES UTILIZADAS',
      content: (
        <div className="space-y-6 text-gray-300">
          <div>
            <h4 className="font-semibold text-white mb-3">3.1 Cookies técnicas (necesarias)</h4>
            <p className="mb-3">Son aquellas imprescindibles para el funcionamiento del sitio web y la prestación de los servicios ofrecidos. No requieren consentimiento.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Gestión de sesión.</li>
              <li>Configuración de privacidad.</li>
              <li>Seguridad y prevención de fraude.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">3.2 Cookies analíticas</h4>
            <p className="mb-3">Permiten analizar el comportamiento de los usuarios para mejorar el servicio.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Google Analytics</li>
            </ul>
            <p className="mt-3">Estas cookies solo se instalarán si el usuario presta su consentimiento expreso.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">3.3 Cookies publicitarias o de marketing</h4>
            <p className="mb-3">Permiten mostrar publicidad personalizada y medir la efectividad de campañas.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Meta (Facebook/Instagram Ads)</li>
              <li>Google Ads</li>
            </ul>
            <p className="mt-3">Estas cookies requieren consentimiento previo y expreso.</p>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'BASE JURÍDICA',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>La instalación de cookies técnicas se basa en el interés legítimo y la necesidad técnica para prestar el servicio.</p>
          <p>La instalación de cookies analíticas y publicitarias se basa en el consentimiento del usuario conforme al artículo 22 de la LSSI-CE y al RGPD.</p>
        </div>
      ),
    },
    {
      id: 5,
      title: 'GESTIÓN DEL CONSENTIMIENTO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Al acceder por primera vez al sitio web, el usuario visualizará un banner de cookies que permite:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Aceptar todas las cookies.</li>
            <li>Rechazar todas las cookies no necesarias.</li>
            <li>Configurar preferencias de manera granular.</li>
          </ul>
          <p>Las cookies no necesarias no se instalarán hasta que el usuario haya otorgado su consentimiento.</p>
        </div>
      ),
    },
    {
      id: 6,
      title: 'RETIRADA DEL CONSENTIMIENTO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El usuario puede retirar su consentimiento en cualquier momento accediendo al panel de configuración de cookies disponible en el sitio web.</p>
          <p>Asimismo, puede eliminar cookies desde la configuración de su navegador (Chrome, Firefox, Safari, Edge).</p>
        </div>
      ),
    },
    {
      id: 7,
      title: 'TRANSFERENCIAS INTERNACIONALES',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Algunas cookies de terceros pueden implicar transferencias internacionales de datos fuera del Espacio Económico Europeo.</p>
          <p>Estas transferencias se realizan conforme a las garantías adecuadas previstas en el RGPD, incluyendo cláusulas contractuales tipo aprobadas por la Comisión Europea.</p>
        </div>
      ),
    },
    {
      id: 8,
      title: 'PLAZO DE CONSERVACIÓN',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Las cookies se conservarán durante el tiempo necesario para cumplir su finalidad o hasta que el usuario retire su consentimiento.</p>
        </div>
      ),
    },
    {
      id: 9,
      title: 'MODIFICACIONES',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>La presente Política de Cookies podrá actualizarse para adaptarse a cambios normativos o técnicos.</p>
        </div>
      ),
    },
    {
      id: 10,
      title: 'INFORMACIÓN ADICIONAL',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Para más información sobre el tratamiento de datos personales, consulte nuestra <a href="/privacy" className="text-accent hover:underline">Política de Privacidad</a>.</p>
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
            Política de Cookies
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Be Stronger - AEPD 2023 Compliant
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
            Si tienes dudas sobre nuestra política de cookies, no dudes en contactarnos.
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
