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
              Ciao! Sono [Nome], una professionista appassionata nel campo del beauty e del makeup.
              Con [X] anni di esperienza, ho perfezionato le mie tecniche per garantire risultati 
              che valorizzano la bellezza naturale di ogni cliente.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              La mia filosofia è semplice: ogni persona è unica e merita un trattamento personalizzato.
              Mi impegno a creare look che rispecchiano la personalità e lo stile di chi si affida a me.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/path-to-your-profile-image.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#ea8f90]/10 rounded-full -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 