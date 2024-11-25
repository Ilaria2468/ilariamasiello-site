import React from 'react';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-pink-50 pt-12 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-800">Contact Us</h3>
            <div className="space-y-3">
              <a 
                href="tel:+1234567890" 
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 active:text-pink-700 touch-manipulation"
              >
                <Phone className="h-5 w-5" />
                <span className="text-sm sm:text-base">(123) 456-7890</span>
              </a>
              <a 
                href="mailto:info@elegance.com" 
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 active:text-pink-700 touch-manipulation"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm sm:text-base">info@elegance.com</span>
              </a>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">123 Beauty Lane, Style City</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-800">Hours</h3>
            <div className="space-y-2 text-gray-600 text-sm sm:text-base">
              <p>Monday - Friday: 9am - 7pm</p>
              <p>Saturday: 9am - 5pm</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-800">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-600 hover:text-pink-600 active:text-pink-700 transition-colors touch-manipulation p-2 -m-2"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-pink-600 active:text-pink-700 transition-colors touch-manipulation p-2 -m-2"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Elegance Hair Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;