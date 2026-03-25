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
      className="card-hover group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button 
            onClick={() => onToggleWishlist?.(product)}
            className={`p-2 bg-white/80 backdrop-blur-sm rounded-full transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 ${
              isLiked ? 'text-red-500 opacity-100 translate-y-0' : 'text-primary hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>
          
          {product.modelUrl && (
            <button 
              onClick={() => onView3D?.(product)}
              className="p-2 bg-secondary text-white rounded-full transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 delay-75 shadow-lg hover:scale-110 active:scale-90"
              title="View in 3D"
            >
              <Box size={18} />
            </button>
          )}
        </div>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isTrending && (
            <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Trending
            </span>
          )}
          {product.modelUrl && (
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
              <Box size={10} /> 3D
            </span>
          )}
        </div>

        {/* Size Selector Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-[10px] font-bold text-white/80 uppercase mb-2">Select Size (UK)</p>
          <div className="flex flex-wrap gap-1.5">
            {product.availableSizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  selectedSize === size 
                    ? 'bg-secondary text-white shadow-lg scale-110' 
                    : 'bg-white/20 text-white hover:bg-white/40 backdrop-blur-md'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{product.category}</span>
          <span className="text-[10px] font-bold text-secondary">{product.brand}</span>
        </div>
        <h3 className="font-bold text-primary mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-primary ml-1">{product.rating}</span>
          <span className="text-[10px] text-gray-400">({product.reviewsCount.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-black text-primary">₹{product.price.toLocaleString('en-IN')}</span>
          <button 
            onClick={() => {
              if (selectedSize) {
                onAddToCart(product, selectedSize);
              } else {
                // Shake effect or tooltip could go here, for now just alert
                alert('Please select a size first');
              }
            }}
            className={`p-2 rounded-lg transition-all active:scale-90 flex items-center gap-2 ${
              selectedSize 
                ? 'bg-primary text-white hover:bg-secondary' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span className="text-xs font-bold">{selectedSize ? `Size ${selectedSize}` : 'Select Size'}</span>
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
