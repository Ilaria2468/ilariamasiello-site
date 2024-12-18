import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    { title: 'Makeup', description: 'Trucco personalizzato per ogni occasione speciale' },
    { title: 'Acconciature', description: 'Creazioni eleganti e personalizzate per eventi speciali' },
    { title: 'Styling', description: 'Tagli moderni e pieghe perfette per ogni occasione' }
  ];

  return (
    <section 
      className="py-20 bg-cover bg-center bg-fixed relative"
      style={{ 
        backgroundImage: `url('/images/hero.jpg')`
      }}
    >
      <div className="absolute inset-0 bg-white/60"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-playfair font-bold text-[#800020] mb-4">
            Le Mie Specialità
          </h2>
          <div className="w-24 h-1 bg-[#ea8f90] mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#ea8f90]/20 p-6 rounded-lg shadow-lg text-center"
            >
              <h3 className="text-xl font-playfair font-bold text-[#800020] mb-4">
                {service.title}
              </h3>
              <p className="text-[#800020]/80">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 