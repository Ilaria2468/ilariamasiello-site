import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GalleryManager from '../components/GalleryManager';

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPassword = 'Ilaria2468@.';

  useEffect(() => {
    const checkAuth = () => {
      const password = prompt('Inserisci la password per accedere all\'area riservata:');
      
      if (password === correctPassword) {
        setIsAuthenticated(true);
      } else if (password === null) {
        navigate('/');
      } else {
        alert('Password non corretta');
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">Gestione Galleria</h1>
          <GalleryManager />
        </div>
      </div>
    );
  }

  return null;
};

export default Admin;