import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link 
              to="/" 
              className="text-[#B8860B] hover:text-[#DAA520] transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/gallery" 
              className="text-[#B8860B] hover:text-[#DAA520] transition-colors font-medium"
            >
              Gallery
            </Link>
          </div>

          {/* Menu Mobile */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#ea8f90] hover:text-[#DAA520] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Content */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="sm:hidden overflow-hidden bg-white"
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 text-[#B8860B] hover:text-[#DAA520] transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/gallery"
            className="block px-3 py-2 text-[#B8860B] hover:text-[#DAA520] transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Gallery
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;