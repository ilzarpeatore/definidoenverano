import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

/**
 * Footer - Trust & Accessibility
 * Design Philosophy: Professional, minimal, accessible
 * - Legal compliance
 * - Contact information
 * - Trust signals
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border py-12 md:py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl text-accent font-bold mb-2">
              SUMMER SHRED
            </h3>
            <p className="text-gray-400 text-sm">
              Transformación en 3 meses para hombres ocupados.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-white mb-4">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />\n                <a href="mailto:support@summershred.com" className="hover:text-accent transition-colors">
                  support@summershred.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />\n                <span>Disponible 24/7</span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-white mb-4">Legal</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">\n                Términos de Servicio\n              </a>
              <br />
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">\n                Política de Privacidad\n              </a>
              <br />
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">\n                Garantía de Devolución\n              </a>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-border mb-8"></div>

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} Definido en Verano. Todos los derechos reservados.</p>
          <p className="mt-4 md:mt-0">
            Hecho con determinación para hombres comprometidos.
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Garantía de 30 días
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Acceso de por vida
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Soporte 24/7
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
