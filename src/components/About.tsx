import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-[#ea8f90] mb-4">
            Chi Sono
          </h2>
          <div className="w-24 h-1 bg-[#ea8f90] mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-gray-700 leading-relaxed">
            Ciao! Sono Ilaria, una professionista appassionata nel mondo del beauty. La mia missione è far sentire ogni persona speciale, creando look che esaltano la bellezza naturale e riflettono la loro unicità.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
            Amo combinare creatività, tecnica e attenzione ai dettagli per realizzare trucchi e acconciature che lasciano il segno, perfetti per ogni occasione. Per me, ogni cliente è una storia da raccontare attraverso il suo stile.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            {/* Contenitore principale dell'immagine */}
            <div className="relative">
              {/* Immagine principale */}
              <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/images/ilariafoto.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Elementi decorativi */}
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-[#ea8f90]/10 rounded-full -z-10"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#ea8f90]/5 rounded-full -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 