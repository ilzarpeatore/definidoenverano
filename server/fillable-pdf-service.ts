import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

interface PDFOptions {
  userName: string;
  userEmail: string;
  profileType: string;
  resourceType: string;
}

/**
 * Helper function to generate PDF and return as Buffer
 */
function generatePDFBuffer(callback: (doc: PDFKit.PDFDocument) => void): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const buffers: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    try {
      callback(doc);
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Generate fillable PDF for Ejecutivo Atrapado - Pausas Activas
 */
export async function generatePausasActivasPDF(options: PDFOptions): Promise<Buffer> {
  return generatePDFBuffer((doc) => {
    // Header
    doc.fontSize(28).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('🏃 Pausas Activas', { align: 'center' });
    doc.fontSize(14).font('Helvetica').fillColor('#64748b');
    doc.text('Movimiento cada 2 horas para eliminar el dolor', { align: 'center' });

    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#1e40af').font('Helvetica-Bold');
    doc.text(`Generado para: ${options.userName}`);
    doc.text(`Email: ${options.userEmail}`);
    doc.text(`Perfil: ${options.profileType}`);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`);

    doc.moveTo(50, doc.y + 10).lineTo(545, doc.y + 10).stroke('#1e40af');
    doc.moveDown(1);

    // Introduction
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('¿Por qué las pausas activas?');
    doc.fontSize(11).font('Helvetica').fillColor('#0f172a');
    doc.text(
      'Estar sentado 8+ horas al día causa dolor. Las pausas activas cada 2 horas previenen rigidez, mejoran circulación y aceleran recuperación.',
      { align: 'left' }
    );
    doc.moveDown(0.5);

    // 5 Exercises Section
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('5 Ejercicios Clave (5 minutos cada uno)');
    doc.moveDown(0.3);

    const exercises = [
      {
        name: '1. Rotación de Cuello',
        instructions: 'Gira lentamente tu cuello en círculos. 10 rotaciones en cada dirección.',
        reps: '[ ] Completado',
      },
      {
        name: '2. Estiramiento de Hombros',
        instructions: 'Lleva tu brazo derecho sobre tu pecho. Mantén 15 segundos. Repite con el izquierdo.',
        reps: '[ ] Completado',
      },
      {
        name: '3. Flexión de Tronco',
        instructions: 'De pie, inclínate hacia adelante lentamente. Mantén 20 segundos.',
        reps: '[ ] Completado',
      },
      {
        name: '4. Círculos de Brazos',
        instructions: 'Extiende los brazos y haz círculos grandes. 10 hacia adelante, 10 hacia atrás.',
        reps: '[ ] Completado',
      },
      {
        name: '5. Marcha en el Lugar',
        instructions: 'Camina en el lugar levantando las rodillas. 1 minuto.',
        reps: '[ ] Completado',
      },
    ];

    exercises.forEach((exercise) => {
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#10b981');
      doc.text(exercise.name);
      doc.fontSize(10).font('Helvetica').fillColor('#0f172a');
      doc.text(exercise.instructions);
      doc.fontSize(10).fillColor('#64748b');
      doc.text(exercise.reps);
      doc.moveDown(0.4);
    });

    doc.moveDown(0.5);

    // Weekly Schedule
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('Horario Recomendado');
    doc.moveDown(0.3);

    const schedule = [
      '9:00 AM - Pausa 1',
      '11:00 AM - Pausa 2',
      '1:00 PM - Pausa 3 (después de almuerzo)',
      '3:00 PM - Pausa 4',
      '5:00 PM - Pausa 5',
    ];

    schedule.forEach((time) => {
      doc.fontSize(10).fillColor('#0f172a');
      doc.text(`☐ ${time}`);
    });

    doc.moveDown(0.5);

    // Tracking Checklist
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('Checklist de Implementación (4 Semanas)');
    doc.moveDown(0.3);

    const weeks = [
      'Semana 1: Hago pausas 3 veces al día',
      'Semana 2: Hago pausas 4 veces al día',
      'Semana 3: Hago pausas 5 veces al día (completo)',
      'Semana 4: Las pausas son automáticas, sin recordatorio',
    ];

    weeks.forEach((week) => {
      doc.fontSize(10).fillColor('#0f172a');
      doc.text(`☐ ${week}`);
    });

    doc.moveDown(1);

    // Footer
    doc.fontSize(9).fillColor('#64748b');
    doc.text('© 2026 Método RESET. Todos los derechos reservados.', { align: 'center' });
    doc.text('Este documento es confidencial. Prohibida su distribución.', { align: 'center' });
  });
}

/**
 * Generate fillable PDF for Ejecutivo Atrapado - Técnicas de Respiración
 */
export async function generateTecnicasRespiracionPDF(options: PDFOptions): Promise<Buffer> {
  return generatePDFBuffer((doc) => {
    // Header
    doc.fontSize(28).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('🧘 Técnicas de Respiración', { align: 'center' });
    doc.fontSize(14).font('Helvetica').fillColor('#64748b');
    doc.text('Reduce estrés y ansiedad en 5 minutos', { align: 'center' });

    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#1e40af').font('Helvetica-Bold');
    doc.text(`Generado para: ${options.userName}`);
    doc.text(`Email: ${options.userEmail}`);
    doc.text(`Perfil: ${options.profileType}`);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`);

    doc.moveTo(50, doc.y + 10).lineTo(545, doc.y + 10).stroke('#1e40af');
    doc.moveDown(1);

    // Introduction
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('¿Por qué la respiración controlada?');
    doc.fontSize(11).font('Helvetica').fillColor('#0f172a');
    doc.text(
      'El estrés crónico causa tensión muscular y dolor. La respiración controlada activa el sistema nervioso parasimpático, reduciendo estrés en minutos.',
      { align: 'left' }
    );
    doc.moveDown(0.5);

    // 4 Techniques
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('4 Técnicas de Respiración');
    doc.moveDown(0.3);

    const techniques = [
      {
        name: '1. Respiración Diafragmática 4-7-8',
        steps: ['Inhala por 4 segundos', 'Mantén por 7 segundos', 'Exhala por 8 segundos', 'Repite 4 veces'],
      },
      {
        name: '2. Respiración Cuadrada (Box Breathing)',
        steps: ['Inhala por 4 segundos', 'Mantén por 4 segundos', 'Exhala por 4 segundos', 'Mantén por 4 segundos'],
      },
      {
        name: '3. Respiración Alternada (Nadi Shodhana)',
        steps: ['Cierra fosa nasal derecha, inhala por izquierda', 'Cambia, exhala por derecha', 'Inhala por derecha', 'Exhala por izquierda'],
      },
      {
        name: '4. Respiración de Energía (Ujjayi)',
        steps: ['Inhala profundamente por la nariz', 'Exhala lentamente por la boca', 'Repite 10 veces', 'Siente la energía'],
      },
    ];

    techniques.forEach((tech) => {
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#10b981');
      doc.text(tech.name);
      doc.fontSize(10).font('Helvetica').fillColor('#0f172a');
      tech.steps.forEach((step) => {
        doc.text(`  • ${step}`);
      });
      doc.moveDown(0.3);
    });

    doc.moveDown(0.5);

    // When to use
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('¿Cuándo usar cada técnica?');
    doc.moveDown(0.3);

    const uses = [
      '☐ Mañana: Respiración de Energía (activar)',
      '☐ Trabajo: Respiración Cuadrada (calmar)',
      '☐ Antes de dormir: Respiración 4-7-8 (relajar)',
      '☐ Cualquier momento: Respiración Alternada (equilibrar)',
    ];

    uses.forEach((use) => {
      doc.fontSize(10).fillColor('#0f172a');
      doc.text(use);
    });

    doc.moveDown(1);

    // Footer
    doc.fontSize(9).fillColor('#64748b');
    doc.text('© 2026 Método RESET. Todos los derechos reservados.', { align: 'center' });
    doc.text('Este documento es confidencial. Prohibida su distribución.', { align: 'center' });
  });
}

/**
 * Generate fillable PDF for Ejecutivo Atrapado - Fortalecimiento
 */
export async function generateFortalecimientoPDF(options: PDFOptions): Promise<Buffer> {
  return generatePDFBuffer((doc) => {
    // Header
    doc.fontSize(28).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('💪 Fortalecimiento', { align: 'center' });
    doc.fontSize(14).font('Helvetica').fillColor('#64748b');
    doc.text('3 sesiones de 30 minutos por semana', { align: 'center' });

    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#1e40af').font('Helvetica-Bold');
    doc.text(`Generado para: ${options.userName}`);
    doc.text(`Email: ${options.userEmail}`);
    doc.text(`Perfil: ${options.profileType}`);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`);

    doc.moveTo(50, doc.y + 10).lineTo(545, doc.y + 10).stroke('#1e40af');
    doc.moveDown(1);

    // Introduction
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('¿Por qué el fortalecimiento?');
    doc.fontSize(11).font('Helvetica').fillColor('#0f172a');
    doc.text(
      'La debilidad muscular causa dolor. El fortalecimiento progresivo de espalda, cuello y core elimina el dolor de forma permanente.',
      { align: 'left' }
    );
    doc.moveDown(0.5);

    // 5 Exercises
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('5 Ejercicios de Fortalecimiento');
    doc.moveDown(0.3);

    const exercises = [
      { name: '1. Superman', reps: '3 series × 10 repeticiones' },
      { name: '2. Flexiones de Pared', reps: '3 series × 12 repeticiones' },
      { name: '3. Planchas', reps: '3 series × 30 segundos' },
      { name: '4. Remo Invertido', reps: '3 series × 10 repeticiones' },
      { name: '5. Puente de Glúteos', reps: '3 series × 15 repeticiones' },
    ];

    exercises.forEach((ex) => {
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#10b981');
      doc.text(ex.name);
      doc.fontSize(10).font('Helvetica').fillColor('#0f172a');
      doc.text(`Repeticiones: ${ex.reps}`);
      doc.text('☐ Completado');
      doc.moveDown(0.3);
    });

    doc.moveDown(0.5);

    // Schedule
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('Horario Semanal');
    doc.moveDown(0.3);

    const schedule = ['☐ Lunes: 30 minutos', '☐ Miércoles: 30 minutos', '☐ Viernes: 30 minutos'];

    schedule.forEach((day) => {
      doc.fontSize(10).fillColor('#0f172a');
      doc.text(day);
    });

    doc.moveDown(1);

    // Footer
    doc.fontSize(9).fillColor('#64748b');
    doc.text('© 2026 Método RESET. Todos los derechos reservados.', { align: 'center' });
    doc.text('Este documento es confidencial. Prohibida su distribución.', { align: 'center' });
  });
}

/**
 * Generate fillable PDF for Emprendedor Quemado - Límites de Trabajo
 */
export async function generateLimitesTrabajoPDF(options: PDFOptions): Promise<Buffer> {
  return generatePDFBuffer((doc) => {
    // Header
    doc.fontSize(28).font('Helvetica-Bold').fillColor('#dc2626');
    doc.text('🚫 Establecer Límites de Trabajo', { align: 'center' });
    doc.fontSize(14).font('Helvetica').fillColor('#64748b');
    doc.text('Urgente: Tu salud depende de esto', { align: 'center' });

    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#dc2626').font('Helvetica-Bold');
    doc.text(`Generado para: ${options.userName}`);
    doc.text(`Email: ${options.userEmail}`);
    doc.text(`Perfil: ${options.profileType}`);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`);

    doc.moveTo(50, doc.y + 10).lineTo(545, doc.y + 10).stroke('#dc2626');
    doc.moveDown(1);

    // Introduction
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#dc2626');
    doc.text('¿Por qué los límites son críticos?');
    doc.fontSize(11).font('Helvetica').fillColor('#0f172a');
    doc.text(
      'Sin límites, el trabajo consume tu vida. El burnout causa dolor crónico, depresión y problemas de salud graves. Los límites son no negociables.',
      { align: 'left' }
    );
    doc.moveDown(0.5);

    // 4 Types of Limits
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#dc2626');
    doc.text('4 Tipos de Límites');
    doc.moveDown(0.3);

    const limits = [
      { type: 'Horario', action: 'Trabajo de 9am-6pm. No responder después.' },
      { type: 'Comunicación', action: 'No responder Slack/email en fines de semana.' },
      { type: 'Espacial', action: 'Trabajo en oficina. No trabajar desde cama.' },
      { type: 'Mental', action: 'No pensar en trabajo después de las 6pm.' },
    ];

    limits.forEach((limit) => {
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#dc2626');
      doc.text(`☐ ${limit.type}`);
      doc.fontSize(10).font('Helvetica').fillColor('#0f172a');
      doc.text(limit.action);
      doc.moveDown(0.3);
    });

    doc.moveDown(0.5);

    // Implementation Plan
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#dc2626');
    doc.text('Plan de Implementación (Esta Semana)');
    doc.moveDown(0.3);

    const plan = [
      '☐ Día 1: Comunica tu horario a tu equipo',
      '☐ Día 2: Configura respuesta automática después de las 6pm',
      '☐ Día 3: Desactiva notificaciones de trabajo en el móvil',
      '☐ Día 4: Toma tu primer fin de semana sin trabajo',
    ];

    plan.forEach((step) => {
      doc.fontSize(10).fillColor('#0f172a');
      doc.text(step);
    });

    doc.moveDown(1);

    // Footer
    doc.fontSize(9).fillColor('#64748b');
    doc.text('© 2026 Método RESET. Todos los derechos reservados.', { align: 'center' });
    doc.text('Este documento es confidencial. Prohibida su distribución.', { align: 'center' });
  });
}

/**
 * Generate generic fillable PDF for other resource types
 */
export async function generateGenericFillablePDF(
  options: PDFOptions,
  title: string,
  description: string
): Promise<Buffer> {
  return generatePDFBuffer((doc) => {
    // Header
    doc.fontSize(28).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text(title, { align: 'center' });
    doc.fontSize(14).font('Helvetica').fillColor('#64748b');
    doc.text(description, { align: 'center' });

    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#1e40af').font('Helvetica-Bold');
    doc.text(`Generado para: ${options.userName}`);
    doc.text(`Email: ${options.userEmail}`);
    doc.text(`Perfil: ${options.profileType}`);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`);

    doc.moveTo(50, doc.y + 10).lineTo(545, doc.y + 10).stroke('#1e40af');
    doc.moveDown(1);

    // Content placeholder
    doc.fontSize(12).font('Helvetica').fillColor('#0f172a');
    doc.text('Contenido de tu guía personalizada:', { underline: true });
    doc.moveDown(0.5);

    // Tracking section
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#1e40af');
    doc.text('Monitorea tu Progreso');
    doc.moveDown(0.3);

    for (let i = 1; i <= 4; i++) {
      doc.fontSize(10).fillColor('#0f172a');
      doc.text(`☐ Semana ${i}: `);
    }

    doc.moveDown(1);

    // Footer
    doc.fontSize(9).fillColor('#64748b');
    doc.text('© 2026 Método RESET. Todos los derechos reservados.', { align: 'center' });
    doc.text('Este documento es confidencial. Prohibida su distribución.', { align: 'center' });
  });
}
