import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

/**
 * Testimonial Section - Social Proof & Credibility
 * Design Philosophy: Authentic transformation stories
 * - Real numbers and specific results
 * - Relatable contexts (age, profession, challenges)
 * - Visual hierarchy with images and quotes
 * - Reduces perceived risk
 */

export default function TestimonialSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const testimonials = [
    {
      name: 'Carlos M.',
      age: 34,
      role: 'Ejecutivo',
      quote:
        'Llegué pensando que era imposible con mi agenda. En 12 semanas perdí 10 kg de grasa y gané músculo visible. Mi confianza cambió completamente.',
      image:
        'https://private-us-east-1.manuscdn.com/sessionFile/mRmfCjNnpCQhVJQwdHAGRn/sandbox/ED1tvYEdp9wDXpJKe0YIa9-img-5_1771949420000_na1fn_c3VjY2Vzcy1jZWxlYnJhdGlvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbVJtZkNqTm5wQ1FoVkpRd2RIQUdSbi9zYW5kYm94L0VEMXR2WUVkcDl3RFhwSktlMFlJYTktaW1nLTVfMTc3MTk0OTQyMDAwMF9uYTFmbl9jM1ZqWTJWemN5MWpaV3hsWW5KaGRHbHZiZy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ER0mk25ECNTYnbkzKmCop7RABpJfMs~0Q1rBuCIkJB~hjjHv8ue49gwQ2rvunvLbkpPAcKzAch65jfG7EL-HwbaA2QvqyRpgvy9Zb9n27r7IUBCg7RCArcSveExsXk79A-phIpJEOJEL7hbTuM~CHOMl3970594oQxcoMC6gxWVPXnWV2wl2GcrHUqrcel4Q~0oHkTGluRkO2tLNlivulCrcu2DIUoS4xnD6tweWGUKYZaWhihNawnhji6KKrk7GMkSKqATeF34Jl16rFADnnipWnGPKNyleGHt63uk6QdD11AjQqyif9X5BVGtoMaNJVo1eAPrufebTDZndI5Evmw__',
      results: '10 kg grasa',
      rating: 5,
    },
    {
      name: 'Juan P.',
      age: 41,
      role: 'Padre de dos hijos',
      quote:
        'No creía en los programas online. Pero el sistema de Summer Shred es diferente. Entrenamientos cortos, resultados reales. Recomendado 100%.',
      image:
        'https://private-us-east-1.manuscdn.com/sessionFile/mRmfCjNnpCQhVJQwdHAGRn/sandbox/ED1tvYEdp9wDXpJKe0YIa9-img-4_1771949422000_na1fn_dHJhaW5pbmctaW50ZW5zaXR5.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbVJtZkNqTm5wQ1FoVkpRd2RIQUdSbi9zYW5kYm94L0VEMXR2WUVkcDl3RFhwSktlMFlJYTktaW1nLTRfMTc3MTk0OTQyMjAwMF9uYTFmbl9kSEpoYVc1cGJtY3RhVzUwWlc1emFYUjUucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=O9daKmkt4BURF3JVI57EoegGBCBjvAu5f5ncG1x3e09~xD-PKDeYq24OwG0oMJwhnwhnyanRSNU2mQ9QClOxQn93YWDVv4MKLVwNcYnU73ffgg1rtnGOxiY~3wx5Hh0uz09cQ5YR8XNflxLOUol7wFeI~M9EVxsEyj1RtBDZK6e~x90Pw1ezS1OV~Mc1YbFR6cbllueaFVbkiwUbXR7Oe2RhNkZPsdljz36eBwG675vDDo-9MkM9AWRrQX2GFu8ZfXAkuGbSc49ziSzVZKydHXuzjIhk2uWA~aaZdTLW3-X9tSLdkdNWEAoc4hUvj3CCc85qD2IcDRsskgoNrqgQhg__',
      results: '8 kg grasa + músculo definido',
      rating: 5,
    },
    {
      name: 'Miguel R.',
      age: 28,
      role: 'Emprendedor',
      quote:
        'Pensé que necesitaba 2 horas en el gym. Con Summer Shred logré más en 45 minutos. Eficiencia pura. Ahora tengo el cuerpo que siempre quise.',
      image:
        'https://private-us-east-1.manuscdn.com/sessionFile/mRmfCjNnpCQhVJQwdHAGRn/sandbox/ED1tvYEdp9wDXpJKe0YIa9-img-1_1771949422000_na1fn_aGVyby1tdXNjdWxhci1kYXJr.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbVJtZkNqTm5wQ1FoVkpRd2RIQUdSbi9zYW5kYm94L0VEMXR2WUVkcDl3RFhwSktlMFlJYTktaW1nLTFfMTc3MTk0OTQyMjAwMF9uYTFmbl9hR1Z5YnkxdGRYTmpkV3hoY2kxa1lYSnIucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qTN9S9Kv3LPIM80nVNyuBFUjQRGaJoqxl7Ql~tshgqot6WsHY-CTunxWEEWDgFAIS9GirkfCAjhdUfOaFquhO7NmHwa43lzxRufY4xASumAXGStmGWUp6pu-B29J7eHYW07NszJdM9gn0n-mcrCJBEVnbQY5EqvpyO0i1BWAUqiC9fXNyq44dbjv9Wk75Yp-xfS1SmPZyKPInIgontmduit5MZqdd6yELloJWXl-krYwInar82MKlj4OWD2dhu~rZy8DWPHqqQMsS5jdoRfmqOP79iDebLcAVsvlltHQNb0UDyiivOZkb1QfNzhCmTkuneUi3Nw3QZFA0FqelLaFgg__',
      results: '12 kg transformación',
      rating: 5,
    },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-4">
            <span className="text-accent font-display text-2xl font-bold">2,847 hombres transformados</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white">
            En 18 meses
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="card-glass p-8 flex flex-col"
              variants={itemVariants}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-200 text-sm mb-6 flex-grow italic">
                "{testimonial.quote}"
              </p>

              {/* Divider */}
              <div className="h-px bg-border mb-6"></div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border border-accent/30"
                />
                <div>
                  <p className="font-heading text-white text-sm">{testimonial.name}</p>
                  <p className="text-gray-400 text-xs">{testimonial.age} años • {testimonial.role}</p>
                  <p className="text-accent text-xs font-bold mt-1">{testimonial.results}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="divider-gold"></div>
      </div>
    </section>
  );
}
