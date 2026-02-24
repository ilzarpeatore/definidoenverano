import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

/**
 * Hero Section - Dark Gym Aesthetic
 * Design Philosophy: Minimalist Industrial with Gold Accents
 * - Black background with subtle texture
 * - Large, aggressive typography (Space Mono)
 * - Gold metallic accents and glow effects
 * - Immediate emotional impact: Power, Exclusivity, Transformation
 */

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://private-us-east-1.manuscdn.com/sessionFile/mRmfCjNnpCQhVJQwdHAGRn/sandbox/ED1tvYEdp9wDXpJKe0YIa9-img-1_1771949422000_na1fn_aGVyby1tdXNjdWxhci1kYXJr.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbVJtZkNqTm5wQ1FoVkpRd2RIQUdSbi9zYW5kYm94L0VEMXR2WUVkcDl3RFhwSktlMFlJYTktaW1nLTFfMTc3MTk0OTQyMjAwMF9uYTFmbl9hR1Z5YnkxdGRYTmpkV3hoY2kxa1lYSnIucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qTN9S9Kv3LPIM80nVNyuBFUjQRGaJoqxl7Ql~tshgqot6WsHY-CTunxWEEWDgFAIS9GirkfCAjhdUfOaFquhO7NmHwa43lzxRufY4xASumAXGStmGWUp6pu-B29J7eHYW07NszJdM9gn0n-mcrCJBEVnbQY5EqvpyO0i1BWAUqiC9fXNyq44dbjv9Wk75Yp-xfS1SmPZyKPInIgontmduit5MZqdd6yELloJWXl-krYwInar82MKlj4OWD2dhu~rZy8DWPHqqQMsS5jdoRfmqOP79iDebLcAVsvlltHQNb0UDyiivOZkb1QfNzhCmTkuneUi3Nw3QZFA0FqelLaFgg__"
          alt="Muscular transformation"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container max-w-4xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Headline */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-white"
          variants={itemVariants}
        >
          3 MESES.
          <br />
          <span className="text-gradient-gold">UN CUERPO</span>
          <br />
          COMPLETAMENTE
          <br />
          DIFERENTE.
        </motion.h1>

        {/* Divider Line */}
        <motion.div className="gradient-line w-24 mx-auto my-8" variants={itemVariants}></motion.div>

        {/* Subheadline */}
        <motion.p
          className="font-body text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          De hombre ocupado a máquina de verano. Sin excusas, sin tiempo perdido.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mb-12">
          <Button
            size="lg"
            className="btn-glow bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-sm"
          >
            ACCESO INMEDIATO
          </Button>
          <p className="text-sm text-gray-400 mt-4">Garantía de 30 días. Sin preguntas.</p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity as any }}
        >
          <ChevronDown className="w-6 h-6 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
