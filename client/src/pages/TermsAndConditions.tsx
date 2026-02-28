import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

/**
 * Terms and Conditions Page
 * Legal document for Be Stronger / Definido en Verano
 */

export default function TermsAndConditions() {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const sections = [
    {
      id: 1,
      title: 'IDENTIFICACIÓN DEL TITULAR',
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>Marca comercial:</strong> Be Stronger</li>
          <li><strong>NIF:</strong> 17575419</li>
          <li><strong>Email de contacto:</strong> contacto@bestronger.es</li>
          <li><strong>Nº Colegiado COPLEF:</strong> 70.504</li>
        </ul>
      ),
    },
    {
      id: 2,
      title: 'NATURALEZA DEL SERVICIO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Be Stronger presta un servicio de prescripción de ejercicio físico online, personalizado y a distancia.</p>
          <p className="font-semibold">El servicio:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>No constituye acto sanitario.</li>
            <li>No sustituye tratamiento médico, fisioterapéutico o psicológico.</li>
            <li>No implica supervisión presencial directa.</li>
            <li>No garantiza resultados físicos, estéticos o de rendimiento.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: 'REQUISITOS DE CONTRATACIÓN',
      content: (
        <div className="space-y-4 text-gray-300">
          <ul className="list-disc list-inside space-y-2">
            <li>Ser mayor de 18 años.</li>
            <li>Tener capacidad legal para contratar.</li>
            <li>Declarar estar apto para la práctica de ejercicio físico.</li>
          </ul>
          <p>La contratación implica la aceptación expresa de estas condiciones mediante casilla de verificación obligatoria.</p>
        </div>
      ),
    },
    {
      id: 4,
      title: 'MODALIDAD Y DURACIÓN',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El servicio se ofrece en modalidad de membresía trimestral (3 meses).</p>
          <ul className="list-disc list-inside space-y-2">
            <li>No existe permanencia obligatoria.</li>
            <li>Finaliza automáticamente al término del periodo.</li>
            <li>Solo se renueva si el cliente manifiesta voluntad expresa de continuar.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 5,
      title: 'PRECIO Y FORMA DE PAGO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Los pagos se gestionan mediante Stripe y sus pasarelas asociadas (PayPal, Klarna, Apple Pay, Google Pay).</p>
          <p>Be Stronger no almacena datos financieros del cliente.</p>
        </div>
      ),
    },
    {
      id: 6,
      title: 'DERECHO DE DESISTIMIENTO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El cliente dispone de un plazo de 30 días naturales para desistir del contrato.</p>
          <p className="font-semibold">Si el cliente solicita el inicio inmediato del servicio y este comienza durante el plazo de desistimiento, acepta que:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>El servicio puede ejecutarse totalmente.</li>
            <li>Puede perder el derecho de desistimiento una vez ejecutado.</li>
            <li>No procederán devoluciones si el programa ha sido diseñado y entregado.</li>
          </ul>
          <p className="mt-4">Fuera de dicho plazo no se realizan devoluciones.</p>
        </div>
      ),
    },
    {
      id: 7,
      title: 'DECLARACIÓN DE SALUD Y APTITUD FÍSICA',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">El cliente declara bajo su responsabilidad que:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Ha completado el cuestionario de salud (PAR-Q).</li>
            <li>No padece patologías incompatibles con el ejercicio físico.</li>
            <li>Ha informado de cualquier lesión o limitación.</li>
            <li>Consultará con un médico en caso de duda.</li>
          </ul>
          <p className="mt-4">La ocultación de información médica exime completamente de responsabilidad al prestador.</p>
        </div>
      ),
    },
    {
      id: 8,
      title: 'ASUNCIÓN EXPRESA DE RIESGOS',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El cliente reconoce que la práctica de ejercicio físico implica riesgos inherentes, incluyendo lesiones musculares, articulares o cardiovasculares.</p>
          <p>El servicio se presta sin supervisión física presencial, por lo que la correcta ejecución técnica depende exclusivamente del cliente.</p>
          <p>El cliente asume voluntariamente todos los riesgos derivados de la práctica del ejercicio siguiendo las pautas recibidas.</p>
        </div>
      ),
    },
    {
      id: 9,
      title: 'LIMITACIÓN DE RESPONSABILIDAD',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">Be Stronger no será responsable de:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Lesiones derivadas de ejecución incorrecta.</li>
            <li>Uso inadecuado de material.</li>
            <li>Incumplimiento de instrucciones.</li>
            <li>Ocultación de información médica.</li>
            <li>Entrenamientos simultáneos no supervisados.</li>
          </ul>
          <p className="mt-4">En cualquier caso, la responsabilidad máxima quedará limitada al importe abonado por el cliente en el último periodo contratado.</p>
        </div>
      ),
    },
    {
      id: 10,
      title: 'PROGRAMAS ADAPTADOS A DOLOR O PATOLOGÍAS',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Los programas adaptados no constituyen diagnóstico clínico ni tratamiento sanitario.</p>
          <p>No se garantiza la eliminación del dolor.</p>
          <p>Puede requerirse autorización médica previa.</p>
        </div>
      ),
    },
    {
      id: 11,
      title: 'PROPIEDAD INTELECTUAL',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Todos los contenidos (rutinas, vídeos, metodología, textos y materiales descargables) son propiedad exclusiva de Be Stronger.</p>
          <p className="font-semibold">Queda prohibido:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Compartir claves de acceso.</li>
            <li>Reproducir o distribuir contenidos.</li>
            <li>Utilizar el material con fines profesionales.</li>
            <li>Crear programas derivados basados en la metodología.</li>
          </ul>
          <p className="mt-4">El acceso es personal e intransferible.</p>
        </div>
      ),
    },
    {
      id: 12,
      title: 'PROTECCIÓN DE DATOS',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Los datos se tratan conforme al Reglamento (UE) 2016/679 (RGPD).</p>
          <p className="font-semibold">Se podrán recoger:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Datos identificativos.</li>
            <li>Datos de contacto.</li>
            <li>Datos de salud (categoría especial).</li>
          </ul>
          <p className="mt-4">Los datos de salud se tratan exclusivamente para la correcta prestación del servicio y no se cederán a terceros salvo obligación legal.</p>
          <p>El cliente podrá ejercer sus derechos enviando solicitud a contacto@bestronger.es.</p>
        </div>
      ),
    },
    {
      id: 13,
      title: 'PRESTACIÓN INTERNACIONAL',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El servicio puede contratarse desde cualquier país.</p>
          <p>El contrato se rige por la legislación española.</p>
        </div>
      ),
    },
    {
      id: 14,
      title: 'JURISDICCIÓN',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>En caso de conflicto, si el cliente tiene condición de consumidor, serán competentes los tribunales de su domicilio. En los demás casos, los juzgados del domicilio del titular.</p>
        </div>
      ),
    },
    {
      id: 15,
      title: 'ACEPTACIÓN EXPRESA',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">El cliente declara haber leído íntegramente estas condiciones y comprender que:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>El ejercicio físico implica riesgos.</li>
            <li>No existe supervisión presencial directa.</li>
            <li>No se garantizan resultados.</li>
            <li>Asume voluntariamente la práctica del ejercicio.</li>
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
            Términos y Condiciones
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
            Si tienes dudas sobre nuestros términos y condiciones, no dudes en contactarnos.
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
