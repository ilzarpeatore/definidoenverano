import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

/**
 * Informed Consent Page
 * Legal document for training services
 */

export default function InformedConsent() {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const sections = [
    {
      id: 1,
      title: 'DECLARACIÓN GENERAL',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            El presente documento tiene por objeto dejar constancia expresa de que el cliente ha sido informado de la naturaleza del servicio de entrenamiento online y de los riesgos inherentes a la práctica de ejercicio físico.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: 'NATURALEZA DEL SERVICIO',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>El servicio consiste en la prescripción de ejercicio físico personalizado a distancia.</p>
          <p>No constituye acto sanitario, diagnóstico médico ni tratamiento clínico.</p>
        </div>
      ),
    },
    {
      id: 3,
      title: 'DECLARACIÓN DE SALUD',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">Declaro bajo mi responsabilidad que:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Soy mayor de 18 años.</li>
            <li>He completado el cuestionario de salud de forma veraz.</li>
            <li>No padezco patología que impida la práctica de ejercicio físico.</li>
            <li>He informado de lesiones, dolencias o limitaciones existentes.</li>
            <li>Consultaré con un médico si tengo dudas sobre mi aptitud.</li>
          </ul>
          <p className="mt-4">La ocultación o falsedad de información médica exime de responsabilidad al prestador.</p>
        </div>
      ),
    },
    {
      id: 4,
      title: 'ASUNCIÓN EXPRESA DE RIESGOS',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">Reconozco que la práctica de ejercicio físico implica riesgos inherentes, incluyendo:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Lesiones musculares.</li>
            <li>Lesiones articulares.</li>
            <li>Sobrecargas.</li>
            <li>Eventos cardiovasculares.</li>
          </ul>
          <p className="mt-4">Entiendo que el entrenamiento se realiza sin supervisión presencial directa y que la correcta ejecución técnica depende exclusivamente de mí.</p>
          <p className="mt-4">Asumo voluntariamente todos los riesgos derivados de la práctica del ejercicio siguiendo las pautas recibidas.</p>
        </div>
      ),
    },
    {
      id: 5,
      title: 'LIMITACIÓN DE RESPONSABILIDAD',
      content: (
        <div className="space-y-4 text-gray-300">
          <p className="font-semibold">Exonero expresamente a Be Stronger de cualquier responsabilidad por:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Lesiones derivadas de ejecución incorrecta.</li>
            <li>Uso inadecuado de material.</li>
            <li>Incumplimiento de las pautas indicadas.</li>
            <li>Entrenamientos simultáneos no supervisados.</li>
            <li>Ocultación de información médica relevante.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 6,
      title: 'DATOS DE SALUD',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            Autorizo expresamente el tratamiento de mis datos de salud conforme al Reglamento (UE) 2016/679 (RGPD) para la correcta prestación del servicio.
          </p>
        </div>
      ),
    },
    {
      id: 7,
      title: 'ACEPTACIÓN EXPRESA',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Declaro haber leído íntegramente el presente documento, comprender su contenido y aceptar voluntariamente sus términos.</p>
          <p>Acepto expresamente la práctica de ejercicio físico bajo mi exclusiva responsabilidad.</p>
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
            Consentimiento Informado
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Para Entrenamiento Online - Be Stronger
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
            Este documento será aceptado durante el proceso de compra del programa de entrenamiento.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-accent text-black font-bold rounded-sm hover:bg-accent/90 transition-colors"
          >
            Volver al inicio
          </a>
        </motion.div>
      </div>
    </div>
  );
}
