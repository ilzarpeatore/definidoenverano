import { readFileSync } from 'fs';
import { join } from 'path';
import PDFDocument from 'pdfkit';

interface PDFOptions {
  userName: string;
  userEmail: string;
  profileType: string;
  resourceType: string;
}

/**
 * Map resource types to HTML template files
 */
const resourceTemplateMap: Record<string, string> = {
  // Ejecutivo Atrapado
  'pausas_activas': 'pausas-activas-template.html',
  'tecnicas_respiracion': 'tecnicas-respiracion-template.html',
  'fortalecimiento': 'fortalecimiento-ejecutivo-template.html',
  'postura_escritorio': 'pdf-template.html',
  
  // Emprendedor Quemado
  'limites_trabajo': 'limites-trabajo-template.html',
  'recuperacion_intensiva': 'recuperacion-intensiva-template.html',
  'consulta_especialista': 'consulta-especialista-template.html',
  'movimiento_diario': 'movimiento-diario-template.html',
  
  // Atleta Lesionado
  'rehabilitacion_progresiva': 'rehabilitacion-progresiva-template.html',
  'fortalecimiento_especifico': 'fortalecimiento-especifico-template.html',
  'vuelta_actividad': 'vuelta-deporte-template.html',
  'seguimiento_progreso': 'seguimiento-autoevaluacion-template.html',
  
  // Recién Diagnosticado
  'movilidad_basica': 'movilidad-basica-template.html',
  'factores_riesgo': 'factores-riesgo-template.html',
  'rutina_prevencion': 'rutina-prevencion-template.html',
  'educacion_postura': 'educacion-postura-template.html',
};

/**
 * Extract text from HTML by removing tags
 */
function extractTextFromHTML(html: string): string {
  // Remove script and style tags
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Replace common HTML tags with newlines
  text = text.replace(/<h[1-6][^>]*>/gi, '\n\n');
  text = text.replace(/<\/h[1-6]>/gi, '\n');
  text = text.replace(/<p[^>]*>/gi, '\n');
  text = text.replace(/<\/p>/gi, '\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<li[^>]*>/gi, '• ');
  text = text.replace(/<\/li>/gi, '\n');
  text = text.replace(/<[^>]+>/g, '');
  
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  
  // Clean up multiple spaces and newlines
  text = text.replace(/\n\s*\n/g, '\n\n');
  text = text.replace(/  +/g, ' ');
  
  return text.trim();
}

/**
 * Read HTML template and personalize it with user data
 */
function personalizeHTMLTemplate(htmlContent: string, options: PDFOptions): string {
  let personalized = htmlContent;
  
  // Replace placeholders with user data
  personalized = personalized.replace(/{{NOMBRE_USUARIO}}/g, options.userName);
  personalized = personalized.replace(/{{USER_NAME}}/g, options.userName);
  personalized = personalized.replace(/{{USUARIO}}/g, options.userName);
  personalized = personalized.replace(/{{EMAIL}}/g, options.userEmail);
  personalized = personalized.replace(/{{PERFIL}}/g, options.profileType);
  personalized = personalized.replace(/{{FECHA}}/g, new Date().toLocaleDateString('es-ES'));
  personalized = personalized.replace(/{{PROFILE_TYPE}}/g, options.profileType);
  personalized = personalized.replace(/{{DATE}}/g, new Date().toLocaleDateString('es-ES'));
  
  return personalized;
}

/**
 * Generate PDF from HTML template using pdfkit
 */
export async function generatePDFFromTemplate(options: PDFOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const templateFileName = resourceTemplateMap[options.resourceType];
      
      if (!templateFileName) {
        reject(new Error(`No template found for resource type: ${options.resourceType}`));
        return;
      }
      
      // Read the HTML template file
      const templatePath = join(process.cwd(), templateFileName);
      console.log(`[PDF] Reading template from: ${templatePath}`);
      let htmlContent = readFileSync(templatePath, 'utf-8');
      console.log(`[PDF] Template content length: ${htmlContent.length} bytes`);
      
      // Personalize the HTML with user data
      htmlContent = personalizeHTMLTemplate(htmlContent, options);
      
      // Extract text from HTML
      const textContent = extractTextFromHTML(htmlContent);
      console.log(`[PDF] Extracted text length: ${textContent.length} characters`);
      
      // Create PDF document
      const doc = new PDFDocument({
        size: 'A4',
        margin: 40,
      });
      
      // Collect PDF data
      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });
      
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        console.log(`[PDF] Generated PDF size: ${pdfBuffer.length} bytes`);
        if (pdfBuffer.length === 0) {
          reject(new Error(`PDF buffer is empty for ${options.resourceType}`));
        } else {
          resolve(pdfBuffer);
        }
      });
      
      doc.on('error', (err) => {
        console.error(`[PDF] Error in PDF generation:`, err);
        reject(err);
      });
      
      // Add content to PDF
      doc.fontSize(16).font('Helvetica-Bold').text('Método RESET', { align: 'center' });
      doc.fontSize(12).font('Helvetica').text(`Guía: ${options.resourceType.replace(/_/g, ' ').toUpperCase()}`, { align: 'center' });
      doc.moveDown();
      
      doc.fontSize(10).font('Helvetica').text(`Generado para: ${options.userName}`);
      doc.text(`Email: ${options.userEmail}`);
      doc.text(`Perfil: ${options.profileType}`);
      doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`);
      doc.moveDown();
      
      // Add main content
      doc.fontSize(11).text(textContent);
      doc.moveDown();
      
      // Add footer
      doc.fontSize(8).font('Helvetica').text('© 2026 Método RESET. Todos los derechos reservados.', { align: 'center' });
      doc.text('Prohibida la distribución sin autorización.', { align: 'center' });
      
      console.log(`[PDF] PDF generation completed for ${options.resourceType}`);
      doc.end();
    } catch (error) {
      console.error('Error generating PDF from template:', error);
      reject(new Error(`Error al generar PDF para ${options.resourceType}: ${error instanceof Error ? error.message : 'Unknown error'}`));
    }
  });
}

/**
 * Get all available resource types
 */
export function getAvailableResourceTypes(): string[] {
  return Object.keys(resourceTemplateMap);
}
