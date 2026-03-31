import { useRoute, Link } from 'wouter';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { blogPosts } from '@/lib/blogData';
import { Streamdown } from 'streamdown';

export default function BlogPost() {
  const [match, params] = useRoute('/blog/:slug');
  const [, navigate] = useLocation();

  // Scroll al inicio cuando se carga el artículo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.slug]);

  if (!match) return null;

  const post = blogPosts.find((p: any) => p.slug === params?.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Artículo no encontrado</h1>
          <Link href="/blog">
            <a className="text-accent hover:text-accent/80 transition-colors">
              Volver al blog
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p: any) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation with Logo */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663378157518/gFrpFQdKeQoQSkhk.png"
                alt="Metodo RESET"
                className="h-10 w-auto"
              />
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog">
              <a className="text-gray-400 hover:text-accent transition-colors">
                Blog
              </a>
            </Link>
            <Link href="/">
              <a className="text-accent hover:text-accent/80 transition-colors font-semibold">
                Volver a inicio
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="bg-background/50 border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/">
              <a className="text-accent hover:text-accent/80 transition-colors">Inicio</a>
            </Link>
            <span>/</span>
            <Link href="/blog">
              <a className="text-accent hover:text-accent/80 transition-colors">Blog</a>
            </Link>
            <span>/</span>
            <span className="text-gray-300 line-clamp-1">{post?.title}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <motion.div
        className="relative py-12 md:py-16 bg-gradient-to-b from-slate-900 to-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <Link href="/blog">
            <a className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </a>
          </Link>

          <h1 className="font-display text-4xl md:text-5xl text-white mb-6 font-bold">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-gray-400">
            <span className="text-xs font-bold text-accent uppercase bg-accent/10 px-3 py-1 rounded">
              {post.category}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} min de lectura
            </span>
          </div>
        </div>
      </motion.div>

      {/* Featured Image */}
      <motion.div
        className="relative w-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-green-500/20 min-h-[300px] md:min-h-[500px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          aspectRatio: '16 / 9',
        }}
      >
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-contain object-center"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="py-16 md:py-24 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <div className="prose prose-invert max-w-none">
            <Streamdown>{post.content}</Streamdown>
          </div>

          {/* Author Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-white font-semibold">{post.author}</p>
                <p className="text-gray-400 text-sm">Especialista en recuperación neuromuscular</p>
              </div>
            </div>
          </div>

          {/* SEO Keywords */}
          <div className="mt-8">
            <p className="text-gray-400 text-sm mb-2">Palabras clave:</p>
            <div className="flex flex-wrap gap-2">
              {post.seoKeywords?.map((keyword: string) => (                <span
                  key={keyword}
                  className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Steps / Related Products */}
      <motion.section
        className="py-16 md:py-24 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Próximos Pasos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="card-glass border border-border rounded-sm p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full mb-4">
                <span className="text-accent font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Evalúa tu Dolor</h3>
              <p className="text-gray-400 text-sm">
                Completa nuestra evaluación gratuita para entender tu tipo de dolor y severidad.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card-glass border border-border rounded-sm p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full mb-4">
                <span className="text-accent font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Recibe tu Plan</h3>
              <p className="text-gray-400 text-sm">
                Obtén un plan personalizado basado en tu situación específica y objetivos.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card-glass border border-border rounded-sm p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full mb-4">
                <span className="text-accent font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Comienza tu Recuperación</h3>
              <p className="text-gray-400 text-sm">
                Accede al Método RESET y comienza a notar mejoras en tu dolor en semanas.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Personalized Help CTA */}
      <motion.section
        className="py-16 md:py-24 bg-gradient-to-r from-accent/10 to-secondary/10 border-t border-b border-accent/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Tu caso es diferente?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Cada persona tiene un patrón de dolor único. Lo que funciona para otros podría no ser exactamente lo que necesitas. Por eso ofrecemos una evaluación personalizada gratuita donde analizamos tu situación específica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/quick-assessment')}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-8 rounded-sm btn-glow transition-all"
            >
              Solicitar Evaluación Personalizada
            </button>
            <a
              href="/blog"
              className="inline-flex items-center justify-center gap-2 border border-accent/50 hover:border-accent text-accent font-bold py-4 px-8 rounded-sm transition-all"
            >
              Explorar más artículos
            </a>
          </div>
        </div>
      </motion.section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <motion.section
          className="py-16 md:py-24 bg-gradient-to-b from-background to-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Artículos relacionados</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <a className="card-glass border border-border rounded-sm overflow-hidden hover:border-accent/50 transition-all group">
                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-blue-500/20 to-green-500/20">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white group-hover:text-accent transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      <motion.section
        className="py-16 md:py-24 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para recuperarte del dolor?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            El Método RESET combina ciencia neuromuscular con un programa práctico para eliminar tu dolor de forma definitiva.
          </p>
          <button
            onClick={() => navigate('/quick-assessment')}
            className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-8 rounded-sm btn-glow transition-all cursor-pointer"
          >
            Comenzar Evaluación Gratuita
          </button>
        </div>
      </motion.section>
    </div>
  );
}
