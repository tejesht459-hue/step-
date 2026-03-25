import React from 'react';
import { ShoppingCart, Heart, Star, Box } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: number) => void;
  isLiked?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onView3D?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  isLiked = false, 
  onToggleWishlist,
  onView3D
}) => {
  const [selectedSize, setSelectedSize] = React.useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -10,
        rotateX: 5,
        rotateY: -5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      viewport={{ once: true }}
      className="glass-card group h-full flex flex-col"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button 
            onClick={() => onToggleWishlist?.(product)}
            className={`p-2 bg-white/10 backdrop-blur-md rounded-full transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 border border-white/20 ${
              isLiked ? 'text-red-500 opacity-100 translate-y-0' : 'text-white hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>
          
          {product.modelUrl && (
            <button 
              onClick={() => onView3D?.(product)}
              className="p-2 bg-secondary text-white rounded-full transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 delay-75 shadow-lg hover:scale-110 active:scale-90 border border-white/20"
              title="View in 3D"
            >
              <Box size={18} />
            </button>
          )}
        </div>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isTrending && (
            <span className="bg-secondary text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shadow-lg">
              Trending
            </span>
          )}
        </div>

        {/* Size Selector Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-[10px] font-black text-white/80 uppercase mb-2 tracking-widest">Select Size (UK)</p>
          <div className="flex flex-wrap gap-1.5">
            {product.availableSizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 rounded-lg text-xs font-black transition-all border ${
                  selectedSize === size 
                    ? 'bg-secondary text-white border-secondary shadow-lg scale-110' 
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/30 backdrop-blur-md'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-black">{product.category}</span>
          <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{product.brand}</span>
        </div>
        <h3 className="font-black text-white mb-2 line-clamp-1 uppercase tracking-tight">{product.name}</h3>
        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center text-secondary">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                className={i < Math.floor(product.rating) ? "" : "text-white/20"}
              />
            ))}
          </div>
          <span className="text-xs font-black text-white ml-1">{product.rating}</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-black text-white tracking-tighter">₹{product.price.toLocaleString('en-IN')}</span>
          <button 
            onClick={() => {
              if (selectedSize) {
                onAddToCart(product, selectedSize);
              } else {
                alert('Please select a size first');
              }
            }}
            className={`p-2.5 rounded-xl transition-all active:scale-95 flex items-center gap-2 border ${
              selectedSize 
                ? 'bg-secondary text-white border-secondary hover:shadow-[0_0_20px_rgba(255,99,33,0.4)]' 
                : 'bg-white/5 text-white/30 border-white/10 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
