import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X } from 'lucide-react';

interface Category {
  name: string;
  folder: string;
  images: string[];
}

const CategoryGallery = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Carica la categoria dal localStorage
    const savedCategories = localStorage.getItem('gallery_categories');
    if (savedCategories) {
      const categories = JSON.parse(savedCategories);
      const currentCategory = categories.find((c: Category) => c.folder === slug);
      if (currentCategory) {
        setCategory(currentCategory);
      }
    }
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen pt-24 px-4 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <p>Categoria non trovata</p>
          <Link to="/gallery" className="text-pink-600 hover:text-pink-700">
            Torna alla galleria
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center">
          <Link 
            to="/gallery" 
            className="flex items-center text-[#B8860B] hover:text-[#DAA520] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Torna alla galleria
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#ea8f90] ml-4">
            {category.name}
          </h1>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.images.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="aspect-square cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image} 
                alt={`${category.name} ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <motion.img 
                src={selectedImage} 
                alt="Selected work"
                className="max-w-full max-h-[90vh] object-contain"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Images Message */}
        {category.images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Nessuna immagine in questa categoria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryGallery;