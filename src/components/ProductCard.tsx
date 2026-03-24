import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isLiked?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  isLiked = false, 
  onToggleWishlist 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-hover group"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <button 
          onClick={() => onToggleWishlist?.(product)}
          className={`absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 ${
            isLiked ? 'text-red-500 opacity-100 translate-y-0' : 'text-primary hover:text-red-500'
          }`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
        </button>
        {product.isTrending && (
          <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Trending
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{product.category}</span>
          <span className="text-[10px] font-bold text-secondary">{product.brand}</span>
        </div>
        <h3 className="font-bold text-primary mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-black text-primary">₹{product.price.toLocaleString('en-IN')}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors active:scale-90"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
