import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';

const Home = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Hero onScrollToContact={scrollToContact} />
      <About />
      <Services />
      
      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-[#ea8f90]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-playfair font-bold text-[#800020] mb-4">
              Prenota un Appuntamento
            </h2>
            <div className="w-24 h-1 bg-[#ea8f90] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sono qui per aiutarti a realizzare il look dei tuoi sogni. 
              Compila il form sottostante e ti risponderò il prima possibile.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;