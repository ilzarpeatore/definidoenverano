import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogPosts, type BlogPost } from '@/lib/blogData';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post: BlogPost) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = ['all', ...Array.from(new Set(blogPosts.map((post: BlogPost) => post.category)))];

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
    <div className="min-h-screen bg-background">
      {/* Navigation with Logo */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663378157518/gFrpFQdKeQoQSkhk.png"
                alt="Método RESET"
                className="h-10 w-auto"
              />
            </a>
          </Link>
          <Link href="/">
            <a className="text-accent hover:text-accent/80 transition-colors font-semibold">
              Volver a inicio
            </a>
          </Link>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="bg-background/50 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/">
              <a className="text-accent hover:text-accent/80 transition-colors">Inicio</a>
            </Link>
            <span>/</span>
            <span className="text-gray-300">Blog</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-900 to-background">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-6xl text-white mb-4 font-bold">
              Blog Método RESET
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Recursos informativos sobre dolor lumbar, cervical y recuperación neuromuscular
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-sm text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="flex flex-wrap gap-2 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card border border-border text-gray-300 hover:border-accent'
                }`}
              >
                {category === 'all' ? 'Todos' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-400 text-lg">No se encontraron artículos</p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts.map((post: BlogPost) => (
                <motion.div
                  key={post.id}
                  className="card-glass border border-border rounded-sm overflow-hidden hover:border-accent/50 transition-all group"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-green-500/20">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-accent uppercase bg-accent/10 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('es-ES')}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <Link href={`/blog/${post.slug}`}>
                      <a className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-semibold">
                        Leer más
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
