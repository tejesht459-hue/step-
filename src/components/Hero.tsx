import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
    name: 'AIR MAX',
    color: 'secondary'
  },
  {
    url: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=1200',
    name: 'PRO RUNNER',
    color: 'blue-500'
  },
  {
    url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1200',
    name: 'TRAIL MASTER',
    color: 'green-500'
  }
];

export const Hero: React.FC<{ onShopClick: () => void }> = ({ onShopClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = HERO_IMAGES[currentIndex];

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

        <div className="relative hidden lg:block h-[500px]" style={{ perspective: 1000 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: 45, x: 100 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateY: 0,
                x: 0,
                y: [0, -20, 0],
              }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -45, x: -100 }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                rotateY: { duration: 0.5 },
                x: { duration: 0.5 },
                y: { 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-secondary rounded-full blur-[120px] opacity-20"></div>
              <motion.img 
                src={currentHero.url} 
                alt={currentHero.name}
                className="relative z-10 w-full h-auto drop-shadow-[0_35px_35px_rgba(255,122,0,0.3)]"
                referrerPolicy="no-referrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              
              {/* Floating 3D Badges */}
              <motion.div 
                animate={{ y: [0, 15, 0], rotateZ: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 z-20"
              >
                <span className="text-secondary font-black text-xl">{currentHero.name}</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, -15, 0], rotateZ: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-10 -left-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 z-20"
              >
                <span className="text-white font-bold">PREMIUM EDITION</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {/* Slider Indicators */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-secondary' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
