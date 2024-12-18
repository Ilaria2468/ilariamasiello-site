import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onScrollToContact: () => void;
}

const Hero = ({ onScrollToContact }: HeroProps) => {
  return (
    <section 
      className="h-screen relative flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: `url('/images/hero.jpg')`
      }}
    >
      <motion.div 
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 text-[#B8860B]">
          Ilaria Masiello
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-[#B8860B]">
          Trasforma il tuo look con un tocco di professionalità
        </p>
        <button
          onClick={onScrollToContact}
          className="bg-[#ea8f90] hover:bg-[#ea8f90]/90 text-white px-8 py-3 rounded-full text-lg font-medium transition-all transform hover:scale-105"
        >
          Contattami Ora
        </button>
      </motion.div>
    </section>
  );
};

export default Hero; 