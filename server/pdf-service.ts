import { renderToString } from 'react-dom/server';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generate personalized PDF from HTML template
 * Uses weasyprint to convert HTML to PDF
 */
export async function generatePDF(
  htmlContent: string,
  fileName: string,
  userName?: string
): Promise<Buffer> {
  try {
    // Create temporary HTML file with personalization
    const tempDir = path.join(__dirname, '..', '.temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempHtmlPath = path.join(tempDir, `${fileName}-${Date.now()}.html`);
    const tempPdfPath = path.join(tempDir, `${fileName}-${Date.now()}.pdf`);

    // Personalize HTML if userName provided
    let personalizedHtml = htmlContent;
    if (userName) {
      // Add personalization to the header or footer
      personalizedHtml = htmlContent.replace(
        '<div class="profile-badge">Perfil:',
        `<div class="profile-badge">Generado para: <strong>${userName}</strong><br/>Perfil:`
      );
    }

    // Write temporary HTML file
    fs.writeFileSync(tempHtmlPath, personalizedHtml, 'utf-8');

    // Convert HTML to PDF using weasyprint (command line)
    // weasyprint is pre-installed in the Manus environment
    try {
      execSync(`weasyprint "${tempHtmlPath}" "${tempPdfPath}"`, {
        timeout: 30000,
        stdio: 'pipe'
      });
    } catch (error) {
      console.error('[PDF Generation] Weasyprint error:', error);
      // Fallback: try with python if weasyprint command fails
      try {
        execSync(`python3 -m weasyprint "${tempHtmlPath}" "${tempPdfPath}"`, {
          timeout: 30000,
          stdio: 'pipe'
        });
      } catch (pythonError) {
        console.error('[PDF Generation] Python weasyprint error:', pythonError);
        throw new Error('PDF generation failed');
      }
    }

    // Read the generated PDF
    const pdfBuffer = fs.readFileSync(tempPdfPath);

    // Clean up temporary files
    fs.unlinkSync(tempHtmlPath);
    fs.unlinkSync(tempPdfPath);

    return pdfBuffer;
  } catch (error) {
    console.error('[PDF Service] Error generating PDF:', error);
    throw error;
  }
}

/**
 * Get PDF template HTML by resource type
 */
export function getPDFTemplate(resourceType?: string): string {
  let templateName = 'pdf-template.html';
  
  // Map resource types to template files
  const resourceMap: Record<string, string> = {
    // Ejecutivo Atrapado
    'pausas_activas': 'pausas-activas-template.html',
    'tecnicas_respiracion': 'tecnicas-respiracion-template.html',
    'fortalecimiento': 'fortalecimiento-ejecutivo-template.html',
    'postura_escritorio': 'pdf-template.html', // Placeholder
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
  
  if (resourceType && resourceMap[resourceType]) {
    templateName = resourceMap[resourceType];
  }
  
  const templatePath = path.join(__dirname, '..', templateName);
  
  if (!fs.existsSync(templatePath)) {
    console.warn(`[PDF Service] Template not found: ${templatePath}, using default`);
    const defaultPath = path.join(__dirname, '..', 'pdf-template.html');
    return fs.readFileSync(defaultPath, 'utf-8');
  }
  
  return fs.readFileSync(templatePath, 'utf-8');
}

/**
 * Generate PDF with custom content
 */
export async function generateCustomPDF(
  title: string,
  content: string,
  userName?: string
): Promise<Buffer> {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --background: #0f172a;
          --foreground: #ffffff;
          --card: #1e293b;
          --accent: #1e40af;
          --border: #334155;
          --muted: #64748b;
        }

        @page {
          size: A4;
          margin: 0.75in 1.25in 0.75in 1.25in;
          @bottom-center {
            content: "Página " counter(page) " de " counter(pages);
            font-size: 11px;
            color: var(--muted);
          }
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background-color: var(--background);
          color: var(--foreground);
          line-height: 1.7;
          font-size: 16px;
        }

        .pdf-container {
          padding: 0 1.5rem;
          max-width: 100%;
        }

        .pdf-header {
          background: linear-gradient(135deg, var(--accent) 0%, #1e40af 100%);
          color: white;
          padding: 2rem 1.5rem;
          margin-bottom: 2rem;
          border-radius: 8px;
        }

        .pdf-header h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .pdf-header .subtitle {
          font-size: 16px;
          opacity: 0.95;
          font-weight: 500;
        }

        .pdf-header .profile-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 12px;
          margin-top: 1rem;
          font-weight: 600;
        }

        .content {
          line-height: 1.8;
        }

        .pdf-footer {
          background-color: var(--card);
          border-top: 2px solid var(--accent);
          padding: 1.5rem;
          margin-top: 2rem;
          border-radius: 4px;
          font-size: 14px;
          color: var(--muted);
        }
      </style>
    </head>
    <body>
      <div style="height: 1.5rem;"></div>
      <div class="pdf-container">
        <div class="pdf-header">
          <h1>${title}</h1>
          <div class="profile-badge">Generado para: <strong>${userName || 'Usuario'}</strong></div>
        </div>
      </div>

      <div class="pdf-container">
        <div class="content">
          ${content}
        </div>
      </div>

      <div class="pdf-container">
        <div class="pdf-footer">
          <p><strong>© 2026 Método RESET. Todos los derechos reservados.</strong></p>
          <p>Este documento es confidencial y está destinado únicamente al usuario que lo recibió.</p>
        </div>
      </div>

      <div style="height: 1.5rem;"></div>
    </body>
    </html>
  `;

  return generatePDF(htmlTemplate, 'custom-pdf', userName);
}
