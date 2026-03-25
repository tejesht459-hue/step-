import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, User, Footprints, Menu, X, Heart, ArrowRight } from 'lucide-react';
import { Page, Product } from '../types';
import { PRODUCTS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartCount: number;
  wishlistCount: number;
  onCartOpen: () => void;
  isLoggedIn: boolean;
  onProductSelect?: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  setCurrentPage, 
  cartCount, 
  wishlistCount,
  onCartOpen,
  isLoggedIn,
  onProductSelect
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (product: Product) => {
    setSearchQuery('');
    setShowSuggestions(false);
    if (onProductSelect) {
      onProductSelect(product);
    } else {
      // Default behavior if no specific handler: go to shop
      setCurrentPage('shop');
    }
  };

  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="bg-secondary p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform">
              <Footprints size={24} />
            </div>
            <span className="text-2xl font-bold text-primary tracking-tight">StepZone</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full" ref={searchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                placeholder="Search for footwear..."
                className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-secondary focus:bg-white transition-all outline-none text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-2">Suggestions</p>
                      {suggestions.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleSuggestionClick(product)}
                          className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors group text-left"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-primary truncate group-hover:text-secondary transition-colors">{product.name}</p>
                            <p className="text-[10px] text-gray-500">{product.brand} • {product.category}</p>
                          </div>
                          <div className="text-xs font-black text-primary">₹{product.price.toLocaleString('en-IN')}</div>
                          <ArrowRight size={14} className="text-gray-300 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                    {suggestions.length === 5 && (
                      <button 
                        onClick={() => { setCurrentPage('shop'); setShowSuggestions(false); }}
                        className="w-full p-3 bg-gray-50 text-center text-xs font-bold text-secondary hover:bg-gray-100 transition-colors border-t border-gray-100"
                      >
                        View all results
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-secondary' : 'text-primary hover:text-secondary'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className={`text-sm font-medium transition-colors ${currentPage === 'about' ? 'text-secondary' : 'text-primary hover:text-secondary'}`}
            >
              About Us
            </button>
            <div className="relative group">
              <button 
                onClick={() => setCurrentPage('shop')}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${currentPage === 'shop' ? 'text-secondary' : 'text-primary hover:text-secondary'}`}
              >
                Shop Categories
              </button>
              <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl p-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-100">
                <div className="flex flex-col gap-2">
                  <button onClick={() => { setCurrentPage('shop'); }} className="text-left text-sm hover:text-secondary transition-colors">Men</button>
                  <button onClick={() => { setCurrentPage('shop'); }} className="text-left text-sm hover:text-secondary transition-colors">Women</button>
                  <button onClick={() => { setCurrentPage('shop'); }} className="text-left text-sm hover:text-secondary transition-colors">Kids</button>
                  <hr className="border-gray-100" />
                  <button onClick={() => { setCurrentPage('shop'); }} className="text-left text-sm hover:text-secondary transition-colors">Sports</button>
                  <button onClick={() => { setCurrentPage('shop'); }} className="text-left text-sm hover:text-secondary transition-colors">Casual</button>
                  <button onClick={() => { setCurrentPage('shop'); }} className="text-left text-sm hover:text-secondary transition-colors">Formal</button>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setCurrentPage('contact')}
              className={`text-sm font-medium transition-colors ${currentPage === 'contact' ? 'text-secondary' : 'text-primary hover:text-secondary'}`}
            >
              Contact Us
            </button>
            
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
              <button 
                onClick={() => setCurrentPage('wishlist')}
                className={`transition-colors relative ${currentPage === 'wishlist' ? 'text-secondary' : 'text-primary hover:text-secondary'}`}
              >
                <Heart size={22} fill={currentPage === 'wishlist' ? "currentColor" : "none"} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button 
                onClick={onCartOpen}
                className="text-primary hover:text-secondary transition-colors relative"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              {isLoggedIn ? (
                <button 
                  onClick={() => setCurrentPage('profile')}
                  className={`transition-colors ${currentPage === 'profile' ? 'text-secondary' : 'text-primary hover:text-secondary'}`}
                >
                  <User size={22} />
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentPage('login')}
                  className={`text-sm font-bold px-4 py-2 rounded-lg transition-all ${currentPage === 'login' ? 'bg-secondary text-white' : 'bg-primary text-white hover:bg-secondary'}`}
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={onCartOpen}
              className="text-primary relative"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4 px-4 space-y-4">
          <div className="relative" ref={searchRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
              placeholder="Search..."
              className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 outline-none text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            
            {/* Mobile Suggestions */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {suggestions.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => { handleSuggestionClick(product); setIsMenuOpen(false); }}
                        className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-primary truncate">{product.name}</p>
                          <p className="text-[8px] text-gray-500 uppercase tracking-tighter">{product.brand}</p>
                        </div>
                        <div className="text-[10px] font-black text-primary">₹{product.price.toLocaleString('en-IN')}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-4">
            <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="text-left font-medium">Home</button>
            <button onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }} className="text-left font-medium">About Us</button>
            <button onClick={() => { setCurrentPage('shop'); setIsMenuOpen(false); }} className="text-left font-medium">Shop</button>
            <button onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }} className="text-left font-medium">Contact Us</button>
            <button onClick={() => { setCurrentPage('wishlist'); setIsMenuOpen(false); }} className="text-left font-medium flex items-center gap-2">
              <Heart size={18} /> Wishlist
            </button>
            {isLoggedIn ? (
              <button onClick={() => { setCurrentPage('profile'); setIsMenuOpen(false); }} className="text-left font-medium flex items-center gap-2">
                <User size={18} /> Profile
              </button>
            ) : (
              <button onClick={() => { setCurrentPage('login'); setIsMenuOpen(false); }} className="text-left font-medium flex items-center gap-2">
                <User size={18} /> Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
