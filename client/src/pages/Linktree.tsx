import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, BookOpen, Zap, Mail, Sparkles, ArrowRight } from 'lucide-react';
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
      color: 'from-blue-600 via-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      id: 'assessment',
      icon: Mail,
      label: 'Evaluación Rápida',
      description: 'Descubre tu nivel de dolor en 2 minutos',
      href: '/quick-assessment',
      color: 'from-green-600 via-emerald-500 to-teal-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'Contactar por WhatsApp',
      description: 'Habla directamente con nuestro equipo',
      href: 'https://wa.me/34666777888?text=Hola%2C%20me%20gustaría%20conocer%20más%20sobre%20el%20Método%20RESET',
      color: 'from-green-500 via-emerald-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      external: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Header with animated logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            {/* Animated Logo */}
            <div className="mb-8 flex justify-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-full blur-2xl opacity-40" />
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center border-2 border-white/10 shadow-2xl">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-white mx-auto mb-1" />
                    <div className="text-white font-bold text-xs leading-tight">
                      MÉTODO<br />RESET
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
            >
              Método RESET
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-300 font-light"
            >
              Recupera tu espalda, recupera tu vida
            </motion.p>
          </motion.div>

          {/* Main Buttons */}
          <motion.div
            className="space-y-4 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {mainButtons.map((button) => {
              const Icon = button.icon;
              return (
                <motion.a
                  key={button.id}
                  href={button.href}
                  target={button.external ? '_blank' : undefined}
                  rel={button.external ? 'noopener noreferrer' : undefined}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative block p-5 rounded-xl border-2 ${button.borderColor} ${button.bgColor} backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl`}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${button.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${button.color} text-white shadow-lg group-hover:shadow-xl transition-all`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text" style={{
                        backgroundImage: `linear-gradient(to right, var(--color-start), var(--color-end))`,
                      }}>
                        {button.label}
                      </div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        {button.description}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Blog Expandable Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-accent/30 rounded-xl overflow-hidden backdrop-blur-sm hover:border-accent/50 transition-all shadow-xl"
          >
            <button
              onClick={() => setExpandedBlog(!expandedBlog)}
              className="w-full p-5 flex items-center justify-between hover:bg-slate-800/30 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white group-hover:text-accent transition-colors">
                    Blog
                  </div>
                  <div className="text-sm text-gray-400">
                    {blogPosts.length} artículos disponibles
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedBlog ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-accent group-hover:text-green-400 transition-colors" />
              </motion.div>
            </button>

            {/* Blog Posts List */}
            <AnimatePresence>
              {expandedBlog && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-accent/20 bg-slate-900/30"
                >
                  <div className="max-h-96 overflow-y-auto">
                    {blogPosts.map((post, idx) => (
                      <motion.a
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.03 }}
                        whileHover={{ x: 5 }}
                        className="block p-4 border-b border-accent/10 last:border-b-0 hover:bg-slate-800/50 transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex-shrink-0 mt-2" />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">
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
                whileHover={{ scale: 1.02 }}
                className="block w-full p-4 text-center text-accent font-semibold border-t border-accent/20 hover:bg-slate-800/50 transition-all group flex items-center justify-center gap-2"
              >
                Ver todos los artículos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-xs text-gray-500 mb-6">
              © 2026 Método RESET. Todos los derechos reservados.
            </p>
            <div className="flex justify-center gap-6">
              <a href="/privacy" className="text-xs text-gray-500 hover:text-accent transition-colors font-medium">
                Privacidad
              </a>
              <span className="text-gray-700">•</span>
              <a href="/terms" className="text-xs text-gray-500 hover:text-accent transition-colors font-medium">
                Términos
              </a>
              <span className="text-gray-700">•</span>
              <a href="/refund-policy" className="text-xs text-gray-500 hover:text-accent transition-colors font-medium">
                Reembolsos
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
