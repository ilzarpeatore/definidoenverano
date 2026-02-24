import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

/**
 * Problem Section - Amplify Pain & Agitation
 * Design Philosophy: Emotional resonance through recognition
 * - Dark background with subtle gold accents
 * - Direct, confrontational copy
 * - Visual hierarchy that emphasizes pain points
 * - Before/After transformation imagery
 */

export default function ProblemSection() {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const painPoints = [
    'Rutinas genéricas que no funcionan',
    'Entrenamientos de 2 horas que no tienes',
    'Dietas complicadas que abandonas',
    'La culpa de no estar donde deberías estar',
  ];

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Before/After Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://private-us-east-1.manuscdn.com/sessionFile/mRmfCjNnpCQhVJQwdHAGRn/sandbox/ED1tvYEdp9wDXpJKe0YIa9-img-2_1771949425000_na1fn_dHJhbnNmb3JtYXRpb24tYmVmb3JlLWFmdGVy.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbVJtZkNqTm5wQ1FoVkpRd2RIQUdSbi9zYW5kYm94L0VEMXR2WUVkcDl3RFhwSktlMFlJYTktaW1nLTJfMTc3MTk0OTQyNTAwMF9uYTFmbl9kSEpoYm5ObWIzSnRZWFJwYjI0dFltVm1iM0psTFdGbWRHVnkucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nKoL56U11-L9T7H-QvWiq-L~bS4NHPdXPZgKIn8l~nVgi3DQGfKSey0QdENq3s-2AiejmzxxIexTW5UI1ktU1-TXnFjoEDK85amCBS5fPb8JPjvtYrGa8wiRufhKeGr1VtElICi6Nm2uleyq8eBTd0TwxhS3IRtpgZD18w7MVXoTxeTmKgkuPERTWFSD6GS7wAr9Cvo3LGVD8hmLS8M1TYH~C7W-x-UANbjIQpkS3xOnjv04spi7aARtQcc67~NMzGwVo-eNjUQk-96hK1rkjYHG~NXMwCsntQcDws7KUw3fHOKh1b7Wnotpo49lk-x1rqnydvKwe5lSPq7P4Vpdlw__"
              alt="Transformación antes y después"
              className="w-full rounded-sm"
            />
            {/* Gold Border Accent */}
            <div className="absolute inset-0 border-2 border-accent/30 rounded-sm pointer-events-none"></div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Te miras al espejo
              </h2>
              <p className="text-gray-300 text-lg">
                Y ves lo que podrías ser. Pero entre tú y ese cuerpo hay...
              </p>
            </motion.div>

            {/* Pain Points */}
            <motion.div className="space-y-4">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-card rounded-sm border border-border hover:border-accent/50 transition-colors"
                  variants={itemVariants}
                >
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-gray-200 font-body">{point}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Urgency Statement */}
            <motion.div
              className="pt-4 border-t border-border"
              variants={itemVariants}
            >
              <p className="text-xl text-accent font-display font-bold">
                Cada día que pasa, es otro día perdido.
              </p>
              <p className="text-gray-400 mt-2">
                El verano no espera.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-gold mt-20"></div>
    </section>
  );
}
