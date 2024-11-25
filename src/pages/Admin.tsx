import React from 'react';
import GalleryManager from '../components/GalleryManager';

const Admin = () => {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">Gestione Galleria</h1>
        <GalleryManager />
      </div>
    </div>
  );
};

export default Admin;