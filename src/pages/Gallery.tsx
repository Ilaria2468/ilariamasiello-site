import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/images/background.jpg';

interface Category {
  name: string;
  folder: string;
  preview?: string;
  images: string[];
}

const Gallery = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const savedCategories = localStorage.getItem('gallery_categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  return (
    <div 
      className="min-h-screen pt-24 bg-cover bg-center bg-fixed relative"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">
            Le Nostre Gallerie
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.folder}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/gallery/${category.folder}`}>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-[#ea8f90]/20 transition-all duration-300">
                  {category.preview ? (
                    <div className="aspect-square">
                      <img
                        src={category.preview}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Nessuna immagine</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-serif font-bold text-[#ea8f90]">
                      {category.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {category.images.length} foto
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;