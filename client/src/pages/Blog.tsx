import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'como-perder-grasa-sin-perder-musculo',
    title: 'Cómo Perder Grasa Sin Perder Músculo: La Guía Definitiva para Hombres',
    excerpt: 'Descubre las estrategias científicamente probadas para quemar grasa mientras mantienes (o incluso ganas) masa muscular. Sin mitos, sin dietas de moda.',
    content: '',
    author: 'Equipo Definido en Verano',
    date: '15 Febrero 2025',
    readTime: '8 min',
    category: 'Entrenamiento',
    tags: ['pérdida de grasa', 'masa muscular', 'definición'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  },
  {
    id: '2',
    slug: 'nutricion-sin-restricciones-para-definicion',
    title: 'Nutrición Sin Restricciones: Come Lo Que Te Gusta y Aún Así Define Tu Cuerpo',
    excerpt: 'El enfoque flexible de nutrición que te permite disfrutar de la comida mientras alcanzas tus objetivos de definición muscular.',
    content: '',
    author: 'Equipo Definido en Verano',
    date: '1 Febrero 2025',
    readTime: '6 min',
    category: 'Nutrición',
    tags: ['nutrición flexible', 'dieta', 'definición'],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  },
  {
    id: '3',
    slug: 'rutina-entrenamiento-hombres-ocupados',
    title: 'La Rutina de Entrenamiento Perfecta para Hombres con Poco Tiempo',
    excerpt: 'Solo 45 minutos, 3-4 días a la semana. Descubre cómo maximizar tus resultados cuando el tiempo es tu mayor limitación.',
    content: '',
    author: 'Equipo Definido en Verano',
    date: '20 Enero 2025',
    readTime: '7 min',
    category: 'Entrenamiento',
    tags: ['rutina', 'poco tiempo', 'eficiencia'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  },
  {
    id: '4',
    slug: 'suplementos-que-realmente-funcionan',
    title: 'Los Únicos 3 Suplementos que Realmente Funcionan (y los que son un Engaño)',
    excerpt: 'La industria de los suplementos está llena de promesas vacías. Aquí la verdad basada en ciencia sobre qué tomar y qué evitar.',
    content: '',
    author: 'Equipo Definido en Verano',
    date: '10 Enero 2025',
    readTime: '5 min',
    category: 'Nutrición',
    tags: ['suplementos', 'proteína', 'creatina'],
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80',
  },
  {
    id: '5',
    slug: 'descanso-recuperacion-muscular',
    title: 'Por Qué el Descanso es Tan Importante Como el Entrenamiento',
    excerpt: 'El músculo no crece en el gym, crece mientras descansas. Aprende a optimizar tu recuperación para resultados 2x más rápidos.',
    content: '',
    author: 'Equipo Definido en Verano',
    date: '5 Enero 2025',
    readTime: '6 min',
    category: 'Recuperación',
    tags: ['descanso', 'recuperación', 'sueño'],
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80',
  },
  {
    id: '6',
    slug: 'mentalidad-transformacion-corporal',
    title: 'La Mentalidad que Separa a los que Transforman su Cuerpo de los que Abandonan',
    excerpt: 'El 80% del éxito en fitness es mental. Descubre las estrategias psicológicas que usan los atletas de élite para mantener la motivación.',
    content: '',
    author: 'Equipo Definido en Verano',
    date: '28 Diciembre 2024',
    readTime: '9 min',
    category: 'Mentalidad',
    tags: ['motivación', 'mentalidad', 'hábitos'],
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80',
  },
];

const CATEGORIES = ['Todos', 'Entrenamiento', 'Nutrición', 'Recuperación', 'Mentalidad'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/">
            <span className="font-display text-xl text-accent cursor-pointer">Definido en Verano</span>
          </Link>
          <Link href="/">
            <span className="text-gray-400 hover:text-white text-sm cursor-pointer">← Volver al inicio</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="font-display text-5xl md:text-6xl text-white mb-4">
          Blog de <span className="text-accent">Fitness</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl">
          Artículos basados en ciencia para hombres que quieren transformar su cuerpo sin sacrificar su vida.
        </p>
      </div>

      {/* Featured Post */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="relative rounded-sm overflow-hidden group cursor-pointer">
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block px-3 py-1 bg-accent text-black text-xs font-bold rounded-sm mb-3">
              {featuredPost.category}
            </span>
            <h2 className="font-display text-3xl text-white mb-3 max-w-2xl">
              {featuredPost.title}
            </h2>
            <p className="text-gray-300 mb-4 max-w-xl">{featuredPost.excerpt}</p>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1"><User size={14} />{featuredPost.author}</span>
              <span className="flex items-center gap-1"><Clock size={14} />{featuredPost.readTime}</span>
              <span>{featuredPost.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold rounded-sm transition-colors ${
                  activeCategory === cat
                    ? 'bg-accent text-black'
                    : 'bg-card border border-border text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-card border border-border text-white placeholder-gray-500 rounded-sm focus:outline-none focus:border-accent text-sm w-full md:w-64"
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {filteredPosts.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No se encontraron artículos.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <article key={post.id} className="card-glass border border-border rounded-sm overflow-hidden group cursor-pointer hover:border-accent/50 transition-colors">
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-semibold rounded-sm">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                      <Clock size={12} />{post.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2 leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">{post.date}</span>
                    <span className="text-accent text-sm flex items-center gap-1 font-semibold">
                      Leer más <ArrowRight size={14} />
                    </span>
                  </div>
                  {/* Tags */}
                  <div className="flex gap-1 mt-3 flex-wrap">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-500 flex items-center gap-0.5">
                        <Tag size={10} />#{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="font-display text-3xl text-white mb-4">
            ¿Listo para transformar tu cuerpo?
          </h2>
          <p className="text-gray-400 mb-8">
            Deja de leer y empieza a actuar. El programa Definido en Verano te da todo lo que necesitas.
          </p>
          <Link href="/">
            <button className="btn-gold px-8 py-4 font-bold text-black">
              VER EL PROGRAMA →
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
