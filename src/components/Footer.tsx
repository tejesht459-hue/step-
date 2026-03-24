import React from 'react';
import { Footprints, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-secondary p-1.5 rounded-lg text-white">
                <Footprints size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight">StepZone</span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium footwear for every step of your journey. Experience comfort and style like never before.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-6">Shop</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-secondary transition-colors">Men's Collection</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Women's Collection</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Kids' Footwear</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Sports & Casual</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Pricing & Offers</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Help & FAQ</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-secondary outline-none"
              />
              <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-secondary/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>© 2026 StepZone Footwear. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
