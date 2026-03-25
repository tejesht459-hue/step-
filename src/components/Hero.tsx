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
    <section className="relative h-[700px] flex items-center overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-white/10 backdrop-blur-md text-secondary font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-[0.3em] mb-8 border border-white/20 shadow-xl">
            New Collection 2026
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 text-3d tracking-tighter uppercase">
            STEP INTO <br />
            <span className="text-secondary drop-shadow-[0_0_15px_rgba(255,99,33,0.5)]">THE FUTURE</span>
          </h1>
          <p className="text-white/70 text-lg mb-10 max-w-md font-medium leading-relaxed">
            Discover the perfect blend of performance and style. Our new arrivals are designed to keep you moving forward with cutting-edge 3D technology.
          </p>
          <div className="flex flex-wrap gap-6">
            <button 
              onClick={onShopClick}
              className="btn-secondary flex items-center gap-3 group px-8 py-4"
            >
              Shop Now
              <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-2xl font-black text-white border border-white/20 hover:bg-white/10 transition-all uppercase tracking-widest text-sm backdrop-blur-sm">
              View Lookbook
            </button>
          </div>
        </motion.div>

        <div className="relative hidden lg:block h-[550px]" style={{ perspective: 1500 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: 45, x: 100 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateY: 0,
                x: 0,
                y: [0, -30, 0],
              }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -45, x: -100 }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                rotateY: { duration: 0.5 },
                x: { duration: 0.5 },
                y: { 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-secondary/30 rounded-full blur-[150px] opacity-40 animate-pulse"></div>
              <motion.img 
                src={currentHero.url} 
                alt={currentHero.name}
                className="relative z-10 w-full h-auto drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)] filter brightness-110"
                referrerPolicy="no-referrer"
                whileHover={{ scale: 1.15, rotate: 8, z: 100 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              
              {/* Floating 3D Badges */}
              <motion.div 
                animate={{ y: [0, 20, 0], rotateZ: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 glass-card p-6 z-20 border-white/30"
              >
                <span className="text-secondary font-black text-2xl tracking-tighter">{currentHero.name}</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, -20, 0], rotateZ: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-10 -left-10 glass-card p-6 z-20 border-white/30"
              >
                <span className="text-white font-black tracking-widest text-xs uppercase">PREMIUM EDITION</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {/* Slider Indicators */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentIndex === idx ? 'w-12 bg-secondary shadow-[0_0_15px_rgba(255,99,33,0.8)]' : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
