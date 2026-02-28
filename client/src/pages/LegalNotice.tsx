import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

/**
 * Legal Notice Page
 * LSSI-CE Compliant
 * Legal document for Be Stronger / Definido en Verano
 */

export default function LegalNotice() {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const sections = [
    {
      id: 1,
      title: 'DATOS IDENTIFICATIVOS',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que el presente sitio web es titularidad de:</p>
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
      title: 'OBJETO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El presente Aviso Legal regula el acceso, navegación y uso del sitio web, así como las responsabilidades derivadas de la utilización de sus contenidos.</p>
        </div>
      ),
    },
    {
      id: 3,
      title: 'CONDICIONES DE USO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El acceso al sitio web atribuye la condición de usuario e implica la aceptación plena y sin reservas del presente Aviso Legal.</p>
          <p className="font-semibold">El usuario se compromete a:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Hacer un uso adecuado y lícito del sitio web.</li>
            <li>No realizar actividades ilícitas o contrarias a la buena fe.</li>
            <li>No dañar, inutilizar o sobrecargar el sitio web.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 4,
      title: 'PROPIEDAD INTELECTUAL',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Todos los contenidos del sitio web (textos, imágenes, logotipos, diseño, estructura, código fuente, metodología y materiales formativos) son titularidad exclusiva de Be Stronger.</p>
          <p>Queda prohibida su reproducción, distribución o comunicación pública sin autorización expresa.</p>
        </div>
      ),
    },
    {
      id: 5,
      title: 'EXCLUSIÓN DE RESPONSABILIDAD',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">Be Stronger no se responsabiliza de:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Errores u omisiones en los contenidos.</li>
            <li>Daños derivados del uso del sitio web.</li>
            <li>Interrupciones técnicas o fallos de disponibilidad.</li>
            <li>Uso indebido de la información publicada.</li>
          </ul>
          <p className="mt-4">El contenido del sitio web tiene carácter meramente informativo y no constituye asesoramiento médico o sanitario.</p>
        </div>
      ),
    },
    {
      id: 6,
      title: 'ENLACES A TERCEROS',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El sitio web puede contener enlaces a páginas externas. Be Stronger no se responsabiliza de sus contenidos ni políticas.</p>
        </div>
      ),
    },
    {
      id: 7,
      title: 'PROTECCIÓN DE DATOS',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El tratamiento de datos personales se rige por la <a href="/privacy" className="text-accent hover:underline">Política de Privacidad</a> disponible en el sitio web.</p>
        </div>
      ),
    },
    {
      id: 8,
      title: 'LEGISLACIÓN APLICABLE',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El presente Aviso Legal se rige por la legislación española.</p>
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
            Aviso Legal
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
            Si tienes dudas sobre nuestro aviso legal, no dudes en contactarnos.
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
