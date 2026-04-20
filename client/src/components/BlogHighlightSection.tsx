import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogPosts, type BlogPost } from '@/lib/blogData';

export default function BlogHighlightSection() {
  const [highlightedPosts, setHighlightedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Obtener 3 artículos aleatorios
    const shuffled = [...blogPosts].sort(() => Math.random() - 0.5).slice(0, 3);
    setHighlightedPosts(shuffled);
  }, []);

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
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-slate-900 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="text-accent font-bold text-sm tracking-widest uppercase">
              Recursos Informativos
            </span>
          </motion.div>
          <motion.h2
            className="font-display text-4xl md:text-5xl text-white mb-6 font-bold"
            variants={itemVariants}
          >
            Blog Método RESET
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Artículos científicos y prácticos sobre dolor lumbar, cervical y recuperación neuromuscular
          </motion.p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {highlightedPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <motion.div
                key={post.id}
                className="card-glass border border-border rounded-sm overflow-hidden hover:border-accent/50 transition-all group cursor-pointer block"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-blue-500/20 to-green-500/20">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-accent uppercase bg-accent/10 px-2 py-1 rounded w-fit">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-semibold">
                    Leer más
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/blog">
            <div className="inline-flex items-center gap-2 bg-accent/10 hover:bg-accent/20 border border-accent/50 text-accent font-bold py-3 px-8 rounded-sm transition-all cursor-pointer">
              Ver todos los artículos
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
