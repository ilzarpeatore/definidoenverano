import { readFileSync } from 'fs';
import { join } from 'path';

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
  'postura_escritorio': 'pdf-template.html', // Fallback
  
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
 * Generate PDF from HTML template using Puppeteer (headless Chrome)
 */
export async function generatePDFFromTemplate(options: PDFOptions): Promise<Buffer> {
  try {
    const templateFileName = resourceTemplateMap[options.resourceType];
    
    if (!templateFileName) {
      throw new Error(`No template found for resource type: ${options.resourceType}`);
    }
    
    // Read the HTML template file
    const templatePath = join(process.cwd(), templateFileName);
    let htmlContent = readFileSync(templatePath, 'utf-8');
    
    // Personalize the HTML with user data
    htmlContent = personalizeHTMLTemplate(htmlContent, options);
    
    // Use Puppeteer to convert HTML to PDF
    const puppeteer = await import('puppeteer');
    const browser = await puppeteer.default.launch({ headless: true });
    const page = await browser.newPage();
    
    // Set content and wait for images to load
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfUint8Array = await page.pdf({
      format: 'A4',
      margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
      printBackground: true,
    });
    
    await browser.close();
    
    // Convert Uint8Array to Buffer
    return Buffer.from(pdfUint8Array);
  } catch (error) {
    console.error('Error generating PDF from template:', error);
    throw new Error(`Error al generar PDF para ${options.resourceType}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get all available resource types
 */
export function getAvailableResourceTypes(): string[] {
  return Object.keys(resourceTemplateMap);
}
