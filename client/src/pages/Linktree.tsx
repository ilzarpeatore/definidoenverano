import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, BookOpen, Zap, Mail } from 'lucide-react';
import { blogPosts } from '@/lib/blogData';

export default function Linktree() {
  const [expandedBlog, setExpandedBlog] = useState(false);

  const mainButtons = [
    {
      id: 'info',
      icon: Zap,
      label: 'Información del Método RESET',
      description: 'Descubre cómo funciona nuestro programa',
      href: '/#solution',
      color: 'from-blue-600 to-blue-700',
    },
    {
      id: 'assessment',
      icon: Mail,
      label: 'Evaluación Rápida',
      description: 'Descubre tu nivel de dolor en 2 minutos',
      href: '/quick-assessment',
      color: 'from-green-600 to-green-700',
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'Contactar por WhatsApp',
      description: 'Habla directamente con nuestro equipo',
      href: 'https://wa.me/34666777888?text=Hola%2C%20me%20gustaría%20conocer%20más%20sobre%20el%20Método%20RESET',
      color: 'from-green-500 to-green-600',
      external: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-background to-slate-900 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center">
              <div className="text-center">
                <div className="text-white font-bold text-sm leading-tight">
                  MÉTODO<br />RESET
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Método RESET
          </h1>
          <p className="text-muted-foreground text-lg">
            Recupera tu espalda, recupera tu vida
          </p>
        </motion.div>

        {/* Main Buttons */}
        <div className="space-y-4 mb-8">
          {mainButtons.map((button, idx) => {
            const Icon = button.icon;
            return (
              <motion.a
                key={button.id}
                href={button.href}
                target={button.external ? '_blank' : undefined}
                rel={button.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`block p-4 rounded-lg bg-gradient-to-r ${button.color} text-white font-semibold transition-all hover:shadow-lg`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-semibold">{button.label}</div>
                    <div className="text-xs opacity-90">{button.description}</div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Blog Expandable Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-card border border-border rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setExpandedBlog(!expandedBlog)}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-accent flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-white">Blog</div>
                <div className="text-xs text-muted-foreground">
                  {blogPosts.length} artículos disponibles
                </div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expandedBlog ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-accent" />
            </motion.div>
          </button>

          {/* Blog Posts List */}
          <AnimatePresence>
            {expandedBlog && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-border bg-slate-800/30"
              >
                <div className="max-h-96 overflow-y-auto">
                  {blogPosts.map((post, idx) => (
                    <motion.a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      className="block p-3 border-b border-border/50 last:border-b-0 hover:bg-slate-800/50 transition-colors group"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(post.date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View All Blog Button */}
          {expandedBlog && (
            <motion.a
              href="/blog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="block w-full p-3 text-center text-accent font-semibold border-t border-border hover:bg-slate-800/50 transition-colors"
            >
              Ver todos los artículos →
            </motion.a>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-xs text-muted-foreground">
            © 2026 Método RESET. Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="/privacy" className="text-xs text-muted-foreground hover:text-accent transition-colors">
              Privacidad
            </a>
            <a href="/terms" className="text-xs text-muted-foreground hover:text-accent transition-colors">
              Términos
            </a>
            <a href="/refund-policy" className="text-xs text-muted-foreground hover:text-accent transition-colors">
              Reembolsos
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
