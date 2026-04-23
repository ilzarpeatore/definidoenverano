import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

interface PDFOptions {
  userName: string;
  userEmail: string;
  profileType: string;
  resourceType: string;
}

/**
 * Generate fillable PDF for Ejecutivo Atrapado - Pausas Activas
 */
export function generatePausasActivasPDF(options: PDFOptions): Buffer {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const buffers: Buffer[] = [];

  doc.on('data', (chunk: Buffer) => buffers.push(chunk));

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

  weeks.forEach((week, index) => {
    doc.fontSize(10).fillColor('#0f172a');
    doc.text(`☐ ${week}`);
  });

  doc.moveDown(1);

  // Footer
  doc.fontSize(9).fillColor('#64748b');
  doc.text('© 2026 Método RESET. Todos los derechos reservados.', { align: 'center' });
  doc.text('Este documento es confidencial. Prohibida su distribución.', { align: 'center' });

  doc.end();

  return Buffer.concat(buffers);
}

/**
 * Generate fillable PDF for Ejecutivo Atrapado - Técnicas de Respiración
 */
export function generateTecnicasRespiracionPDF(options: PDFOptions): Buffer {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const buffers: Buffer[] = [];

  doc.on('data', (chunk: Buffer) => buffers.push(chunk));

  // Header
  doc.fontSize(28).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text('🫁 Técnicas de Respiración', { align: 'center' });
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
  doc.text('¿Por qué la respiración importa?');
  doc.fontSize(11).font('Helvetica').fillColor('#0f172a');
  doc.text(
    'La respiración controlada activa tu sistema nervioso parasimpático. Esto reduce estrés, baja presión arterial y acelera recuperación del dolor.',
    { align: 'left' }
  );
  doc.moveDown(0.5);

  // 4 Breathing Techniques
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text('4 Técnicas de Respiración');
  doc.moveDown(0.3);

  const techniques = [
    {
      name: '1. Respiración Diafragmática 4-7-8',
      steps: [
        'Inhala por 4 segundos',
        'Sostén por 7 segundos',
        'Exhala por 8 segundos',
        'Repite 5 veces',
      ],
      use: 'Para ansiedad y estrés',
    },
    {
      name: '2. Respiración Cuadrada (Box Breathing)',
      steps: [
        'Inhala por 4 segundos',
        'Sostén por 4 segundos',
        'Exhala por 4 segundos',
        'Sostén por 4 segundos',
      ],
      use: 'Para enfoque y calma',
    },
    {
      name: '3. Respiración Alternada (Nadi Shodhana)',
      steps: [
        'Cierra fosa nasal derecha, inhala por la izquierda',
        'Cierra la izquierda, exhala por la derecha',
        'Inhala por la derecha, exhala por la izquierda',
        'Repite 10 veces',
      ],
      use: 'Para equilibrio y energía',
    },
  ];

  techniques.forEach((tech) => {
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#10b981');
    doc.text(tech.name);
    doc.fontSize(10).font('Helvetica').fillColor('#0f172a');
    tech.steps.forEach((step) => {
      doc.text(`• ${step}`);
    });
    doc.fontSize(10).fillColor('#1e40af').font('Helvetica-Bold');
    doc.text(`Cuándo usar: ${tech.use}`);
    doc.moveDown(0.3);
  });

  doc.moveDown(0.5);

  // Daily Practice Schedule
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text('Plan de Práctica Diaria');
  doc.moveDown(0.3);

  const dailyPlan = [
    '☐ Mañana (5 min): Respiración Diafragmática 4-7-8',
    '☐ Mediodía (5 min): Respiración Cuadrada',
    '☐ Tarde (5 min): Respiración Alternada',
    '☐ Noche (5 min): Respiración Diafragmática 4-7-8',
  ];

  dailyPlan.forEach((item) => {
    doc.fontSize(10).fillColor('#0f172a');
    doc.text(item);
  });

  doc.moveDown(0.5);

  // Tracking
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text('Registro de Práctica (Marca cada día)');
  doc.moveDown(0.3);

  const weeks = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
  weeks.forEach((week) => {
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#0f172a');
    doc.text(`${week}: ☐ Lun ☐ Mar ☐ Mié ☐ Jue ☐ Vie ☐ Sab ☐ Dom`);
  });

  doc.moveDown(1);

  // Footer
  doc.fontSize(9).fillColor('#64748b');
  doc.text('© 2026 Método RESET. Todos los derechos reservados.', { align: 'center' });
  doc.text('Este documento es confidencial. Prohibida su distribución.', { align: 'center' });

  doc.end();

  return Buffer.concat(buffers);
}

/**
 * Generate fillable PDF for Ejecutivo Atrapado - Fortalecimiento
 */
export function generateFortalecimientoPDF(options: PDFOptions): Buffer {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const buffers: Buffer[] = [];

  doc.on('data', (chunk: Buffer) => buffers.push(chunk));

  // Header
  doc.fontSize(28).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text('💪 Fortalecimiento 3x Semana', { align: 'center' });
  doc.fontSize(14).font('Helvetica').fillColor('#64748b');
  doc.text('Construye fuerza y elimina el dolor', { align: 'center' });

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
    'Músculos débiles = Articulaciones sobrecargadas = Dolor. El fortalecimiento protege tus articulaciones y acelera recuperación.',
    { align: 'left' }
  );
  doc.moveDown(0.5);

  // 5 Key Exercises
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text('5 Ejercicios Clave (30 minutos, 3x/semana)');
  doc.moveDown(0.3);

  const exercises = [
    { name: 'Superman', reps: '3 series x 10 reps', notes: '☐ Lunes ☐ Miércoles ☐ Viernes' },
    { name: 'Flexiones de Pared', reps: '3 series x 12 reps', notes: '☐ Lunes ☐ Miércoles ☐ Viernes' },
    { name: 'Planchas', reps: '3 series x 30 seg', notes: '☐ Lunes ☐ Miércoles ☐ Viernes' },
    { name: 'Remo Invertido', reps: '3 series x 10 reps', notes: '☐ Lunes ☐ Miércoles ☐ Viernes' },
    { name: 'Puente de Glúteos', reps: '3 series x 15 reps', notes: '☐ Lunes ☐ Miércoles ☐ Viernes' },
  ];

  exercises.forEach((ex) => {
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#10b981');
    doc.text(ex.name);
    doc.fontSize(10).font('Helvetica').fillColor('#0f172a');
    doc.text(`Repeticiones: ${ex.reps}`);
    doc.text(ex.notes);
    doc.moveDown(0.3);
  });

  doc.moveDown(0.5);

  // Weekly Checklist
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text('Checklist de Progresión (12 Semanas)');
  doc.moveDown(0.3);

  const progressWeeks = [
    'Semanas 1-4: Semana 1 - Construir base',
    'Semanas 5-8: Semana 2 - Aumentar reps',
    'Semanas 9-12: Semana 3 - Aumentar dificultad',
  ];

  progressWeeks.forEach((week) => {
    doc.fontSize(10).fillColor('#0f172a');
    doc.text(`☐ ${week}`);
  });

  doc.moveDown(0.5);

  // Notes Section
  doc.fontSize(12).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text('Notas de Progreso');
  doc.rect(50, doc.y + 5, 495, 100).stroke('#1e40af');
  doc.fontSize(10).fillColor('#64748b');
  doc.text('Escribe aquí tu progreso, cómo te sientes, cambios notados:', 55, doc.y + 10);

  doc.moveDown(1);

  // Footer
  doc.fontSize(9).fillColor('#64748b');
  doc.text('© 2026 Método RESET. Todos los derechos reservados.', { align: 'center' });
  doc.text('Este documento es confidencial. Prohibida su distribución.', { align: 'center' });

  doc.end();

  return Buffer.concat(buffers);
}

/**
 * Generate fillable PDF for Emprendedor Quemado - Límites de Trabajo
 */
export function generateLimitesTrabajoPDF(options: PDFOptions): Buffer {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const buffers: Buffer[] = [];

  doc.on('data', (chunk: Buffer) => buffers.push(chunk));

  // Header
  doc.fontSize(28).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text('🚪 Establecer Límites de Trabajo', { align: 'center' });
  doc.fontSize(14).font('Helvetica').fillColor('#64748b');
  doc.text('Recupera tu vida personal. Evita el burnout.', { align: 'center' });

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
  doc.text('¿Por qué los límites son críticos?');
  doc.fontSize(11).font('Helvetica').fillColor('#0f172a');
  doc.text(
    'Sin límites, trabajas 24/7. Resultado: Burnout, dolor crónico, depresión. Los límites no son egoísmo. Son supervivencia.',
    { align: 'left' }
  );
  doc.moveDown(0.5);

  // 4 Types of Limits
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text('4 Tipos de Límites');
  doc.moveDown(0.3);

  const limits = [
    { type: 'Límite de Horario', action: 'Trabajo de 9-18h. Después, OFF.', status: '☐ Implementado' },
    { type: 'Límite de Comunicación', action: 'No respondo emails después de 18h.', status: '☐ Implementado' },
    { type: 'Límite de Espacial', action: 'Oficina separada de hogar.', status: '☐ Implementado' },
    { type: 'Límite Mental', action: 'No pienso en trabajo fuera de horario.', status: '☐ Implementado' },
  ];

  limits.forEach((limit) => {
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#10b981');
    doc.text(limit.type);
    doc.fontSize(10).font('Helvetica').fillColor('#0f172a');
    doc.text(limit.action);
    doc.text(limit.status);
    doc.moveDown(0.3);
  });

  doc.moveDown(0.5);

  // Implementation Plan
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text('Plan de Implementación (4 Semanas)');
  doc.moveDown(0.3);

  const weeks = [
    'Semana 1: Establece horario de trabajo. Comunica a tu equipo.',
    'Semana 2: Configura auto-respuesta de email. Apaga notificaciones después de 18h.',
    'Semana 3: Crea espacio de trabajo separado. Desconéctate mentalmente.',
    'Semana 4: Monitorea cumplimiento. Ajusta según sea necesario.',
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

  doc.end();

  return Buffer.concat(buffers);
}

/**
 * Generate generic fillable PDF for any resource type
 */
export function generateGenericFillablePDF(options: PDFOptions, title: string, content: string): Buffer {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const buffers: Buffer[] = [];

  doc.on('data', (chunk: Buffer) => buffers.push(chunk));

  // Header
  doc.fontSize(24).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text(title, { align: 'center' });

  doc.moveDown(0.5);
  doc.fontSize(10).fillColor('#1e40af').font('Helvetica-Bold');
  doc.text(`Generado para: ${options.userName}`);
  doc.text(`Email: ${options.userEmail}`);
  doc.text(`Perfil: ${options.profileType}`);
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`);

  doc.moveTo(50, doc.y + 10).lineTo(545, doc.y + 10).stroke('#1e40af');
  doc.moveDown(1);

  // Content
  doc.fontSize(11).font('Helvetica').fillColor('#0f172a');
  doc.text(content, { align: 'left', width: 495 });

  doc.moveDown(1);

  // Tracking Section
  doc.fontSize(12).font('Helvetica-Bold').fillColor('#1e40af');
  doc.text('Mi Progreso');
  doc.rect(50, doc.y + 5, 495, 80).stroke('#1e40af');
  doc.fontSize(10).fillColor('#64748b');
  doc.text('Registra tu progreso aquí:', 55, doc.y + 10);

  doc.moveDown(1);

  // Footer
  doc.fontSize(9).fillColor('#64748b');
  doc.text('© 2026 Método RESET. Todos los derechos reservados.', { align: 'center' });
  doc.text('Este documento es confidencial. Prohibida su distribución.', { align: 'center' });

  doc.end();

  return Buffer.concat(buffers);
}
