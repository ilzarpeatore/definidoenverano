import { motion } from 'framer-motion';
import { Mail, BookOpen, ExternalLink } from 'lucide-react';

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
              DEFINIDO EN VERANO
            </h3>
            <p className="text-gray-400 text-sm">
              Transformación en 12 semanas para hombres ocupados. Sin excusas, sin restricciones.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href="mailto:contacto@bestronger.es"
                  className="hover:text-accent transition-colors"
                >
                  contacto@bestronger.es
                </a>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href="https://bestronger.es/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  Blog de Fitness
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-400 hover:text-accent transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="block text-gray-400 hover:text-accent transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="block text-gray-400 hover:text-accent transition-colors">
                Garantía de Devolución
              </a>
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
          <p>&copy; {currentYear} Definido en Verano · BeStronger. Todos los derechos reservados.</p>
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
