import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC<{ onShopClick: () => void }> = ({ onShopClick }) => {
  return (
    <section className="relative h-[600px] flex items-center overflow-hidden bg-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-secondary/20 text-secondary font-bold text-xs px-3 py-1 rounded-full uppercase tracking-widest mb-6">
            New Collection 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            STEP INTO <br />
            <span className="text-secondary">THE FUTURE</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-md">
            Discover the perfect blend of performance and style. Our new arrivals are designed to keep you moving forward.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onShopClick}
              className="btn-secondary flex items-center gap-2 group"
            >
              Shop Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-white/10 transition-all">
              View Lookbook
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-secondary rounded-full blur-[120px] opacity-20"></div>
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200" 
            alt="Featured Shoe"
            className="relative z-10 w-full h-auto drop-shadow-[0_35px_35px_rgba(255,122,0,0.3)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
};
