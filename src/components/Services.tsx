import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    { title: 'Makeup', description: 'Trucco personalizzato per ogni occasione speciale' },
    { title: 'Acconciature', description: 'Creazioni eleganti e personalizzate per eventi speciali' },
    { title: 'Styling', description: 'Tagli moderni e pieghe perfette per ogni occasione' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-[#ea8f90] mb-4">
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
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <h3 className="text-xl font-serif font-bold text-[#ea8f90] mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600">
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