import React from 'react';
import { Search, ShoppingCart, User, Footprints, Menu, X, Heart } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartCount: number;
  wishlistCount: number;
  onCartOpen: () => void;
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  setCurrentPage, 
  cartCount, 
  wishlistCount,
  onCartOpen,
  isLoggedIn
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for footwear..."
                className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-secondary focus:bg-white transition-all outline-none text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 outline-none text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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
