import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { uploadImage, getImagesFromFolder } from '../services/cloudinary';
import { Loader2 } from 'lucide-react';

interface Category {
  name: string;
  folder: string;
  preview?: string;
  images: string[];
}

const GalleryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Funzione per creare una nuova categoria
  const createCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const folderName = newCategoryName.toLowerCase().replace(/\s+/g, '-');
      
      const newCategory: Category = {
        name: newCategoryName,
        folder: folderName,
        images: []
      };

      setCategories(prev => [...prev, newCategory]);
      setNewCategoryName('');
      
      // Salva la lista aggiornata delle categorie in localStorage
      localStorage.setItem('gallery_categories', JSON.stringify([...categories, newCategory]));
    } catch (error) {
      console.error('Errore nella creazione della categoria:', error);
      alert('Errore nella creazione della categoria');
    }
  };

  // Funzione per eliminare una categoria
  const deleteCategory = (folderToDelete: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questa categoria?')) {
      try {
        setCategories(prev => prev.filter(cat => cat.folder !== folderToDelete));
        // Aggiorna localStorage
        const updatedCategories = categories.filter(cat => cat.folder !== folderToDelete);
        localStorage.setItem('gallery_categories', JSON.stringify(updatedCategories));
      } catch (error) {
        console.error('Errore nella cancellazione della categoria:', error);
        alert('Errore nella cancellazione della categoria');
      }
    }
  };

  // Carica le immagini
  const handleImageUpload = async (files: FileList) => {
    if (!selectedCategory) {
      alert('Seleziona prima una categoria');
      return;
    }

    setIsLoading(true);
    setUploadError(null);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`Il file ${file.name} è troppo grande. Massimo 10MB`);
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'elegance_preset');
        formData.append('folder', selectedCategory);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dbghm9912/image/upload`,
          {
            method: 'POST',
            body: formData
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Risposta Cloudinary:', errorData);
          throw new Error(errorData.error?.message || 'Errore durante l\'upload');
        }

        const data = await response.json();
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      // Aggiorna le categorie con le nuove immagini
      setCategories(prev => prev.map(cat => {
        if (cat.folder === selectedCategory) {
          return {
            ...cat,
            images: [...cat.images, ...uploadedUrls],
            preview: cat.preview || uploadedUrls[0]
          };
        }
        return cat;
      }));

      // Aggiorna localStorage
      const updatedCategories = categories.map(cat => {
        if (cat.folder === selectedCategory) {
          return {
            ...cat,
            images: [...cat.images, ...uploadedUrls],
            preview: cat.preview || uploadedUrls[0]
          };
        }
        return cat;
      });
      localStorage.setItem('gallery_categories', JSON.stringify(updatedCategories));

      alert('Upload completato con successo!');
    } catch (error) {
      console.error('Errore dettagliato:', error);
      setUploadError(error instanceof Error ? error.message : 'Errore durante l\'upload');
    } finally {
      setIsLoading(false);
    }
  };

  // Carica le categorie al mount
  useEffect(() => {
    const savedCategories = localStorage.getItem('gallery_categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Creazione categoria */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-serif font-bold mb-4">Crea Nuova Categoria</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nome categoria"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
          />
          <button
            onClick={createCategory}
            className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors"
          >
            Crea
          </button>
        </div>
      </div>

      {/* Upload immagini */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-serif font-bold mb-4">Carica Immagini</h2>
        <div className="space-y-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">Seleziona categoria</option>
            {categories.map(cat => (
              <option key={cat.folder} value={cat.folder}>{cat.name}</option>
            ))}
          </select>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
            className="w-full"
            disabled={isLoading || !selectedCategory}
          />

          {isLoading && (
            <div className="flex items-center justify-center text-gray-600">
              <Loader2 className="animate-spin mr-2" />
              Caricamento in corso...
            </div>
          )}

          {uploadError && (
            <div className="text-red-500 text-sm mt-2">
              {uploadError}
            </div>
          )}
        </div>
      </div>

      {/* Preview categorie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <motion.div
            key={category.folder}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-lg shadow-md relative"
          >
            <button
              onClick={() => deleteCategory(category.folder)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <h3 className="font-serif font-bold mb-2">{category.name}</h3>
            {category.preview && (
              <img
                src={category.preview}
                alt={category.name}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <p className="text-sm text-gray-600 mt-2">
              {category.images.length} foto
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager; 