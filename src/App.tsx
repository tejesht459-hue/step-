import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { PRODUCTS, CATEGORIES, BRANDS } from './constants';
import { Product, Page, CartItem, User } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ChevronRight, Mail, Phone, MapPin, Send, Footprints, User as UserIcon, Package, Settings, LogOut } from 'lucide-react';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user] = useState<User>({
    name: 'Tejesh T',
    email: 'tejesht459@gmail.com',
    phone: '9182916604',
    address: '45, MG Road, Indiranagar, Bengaluru, Karnataka 560038',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200'
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [profileTab, setProfileTab] = useState<'main' | 'orders' | 'addresses'>('main');

  // Reset profile tab when navigating away from profile
  React.useEffect(() => {
    if (currentPage !== 'profile') {
      setProfileTab('main');
    }
  }, [currentPage]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const brandMatch = selectedBrand === 'All' || p.brand === selectedBrand;
      const priceMatch = p.price <= priceRange;
      return categoryMatch && brandMatch && priceMatch;
    });
  }, [selectedCategory, selectedBrand, priceRange]);

  const trendingProducts = PRODUCTS.filter(p => p.isTrending);

  const renderHome = () => (
    <div className="space-y-20 pb-20">
      <Hero onShopClick={() => setCurrentPage('shop')} />
      
      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-primary">SHOP BY CATEGORY</h2>
            <div className="h-1 w-20 bg-secondary mt-2"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => { setSelectedCategory(cat); setCurrentPage('shop'); }}
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img 
                src={`https://images.unsplash.com/photo-${idx === 0 ? '1542291026-7eec264c27ff' : idx === 1 ? '1533867617858-e7b97e060509' : idx === 2 ? '1525966222134-fcfa99b8ae77' : '1514989940723-e8e51635b782'}?auto=format&fit=crop&q=80&w=600`}
                alt={cat}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl">{cat}</h3>
                <div className="flex items-center gap-2 text-secondary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ChevronRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-primary uppercase">Trending Now</h2>
              <p className="text-gray-500 mt-2">The most popular picks of the season</p>
            </div>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="text-secondary font-bold flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
                isLiked={wishlist.some(p => p.id === product.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-secondary rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10 text-white max-w-lg">
            <h2 className="text-4xl font-black mb-4">JOIN THE CLUB & GET 20% OFF</h2>
            <p className="text-white/80 mb-8">Sign up for our newsletter and get exclusive access to new drops and special promotions.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white rounded-lg px-6 py-3 text-primary w-full outline-none"
              />
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors whitespace-nowrap">
                Sign Up
              </button>
            </div>
          </div>
          <div className="relative z-10 hidden md:block">
            <Footprints size={180} className="text-white/10 rotate-12" />
          </div>
        </div>
      </section>
    </div>
  );

  const renderShop = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          <div className="flex items-center gap-2 text-primary font-bold text-xl mb-6">
            <Filter size={20} />
            Filters
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Category</h4>
            <div className="space-y-2">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`block text-sm transition-colors ${selectedCategory === 'All' ? 'text-secondary font-bold' : 'text-gray-500 hover:text-primary'}`}
              >
                All Categories
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block text-sm transition-colors ${selectedCategory === cat ? 'text-secondary font-bold' : 'text-gray-500 hover:text-primary'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Brand</h4>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setSelectedBrand('All')}
                className={`text-xs p-2 rounded border transition-all ${selectedBrand === 'All' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-200 hover:border-primary'}`}
              >
                All
              </button>
              {BRANDS.map(brand => (
                <button 
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`text-xs p-2 rounded border transition-all ${selectedBrand === brand ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-200 hover:border-primary'}`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-sm uppercase tracking-wider">Price Range</h4>
              <span className="text-xs font-bold text-secondary">Up to ₹{priceRange.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="15000" 
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-2">
              <span>₹500</span>
              <span>₹15,000</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-500 text-sm">Showing <span className="font-bold text-primary">{filteredProducts.length}</span> products</p>
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-secondary">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  isLiked={wishlist.some(p => p.id === product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setPriceRange(200); }}
                className="mt-6 text-secondary font-bold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-4xl font-black text-primary mb-6">GET IN TOUCH</h2>
          <p className="text-gray-500 mb-12">Have questions about our products or your order? Our team is here to help you find the perfect fit.</p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-primary">Email Us</h4>
                <p className="text-gray-500 text-sm">support@stepzone.in</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-primary">Call Us</h4>
                <p className="text-gray-500 text-sm">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-primary">Visit Us</h4>
                <p className="text-gray-500 text-sm">45, MG Road, Indiranagar, Bengaluru, Karnataka 560038</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">First Name</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition-all" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Last Name</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition-all" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Email Address</label>
              <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition-all" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Message</label>
              <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition-all resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <button className="btn-secondary w-full py-4 flex items-center justify-center gap-2 group">
              Send Message
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );

  const renderProfile = () => {
    const orders = [
      { id: 'ORD-8291', date: '2024-03-15', total: 12499, status: 'Delivered', items: 2 },
      { id: 'ORD-7102', date: '2024-02-28', total: 8999, status: 'Delivered', items: 1 },
      { id: 'ORD-6543', date: '2024-01-10', total: 15600, status: 'Delivered', items: 3 },
    ];

    const addresses = [
      { id: 1, type: 'Home', address: '45, MG Road, Indiranagar, Bengaluru, Karnataka 560038', isDefault: true },
      { id: 2, type: 'Office', address: '12th Floor, Tech Park, Whitefield, Bengaluru, Karnataka 560066', isDefault: false },
    ];

    const handleLogout = () => {
      // Mock logout
      setCurrentPage('home');
      setCartItems([]);
      setWishlist([]);
      alert('Logged out successfully!');
    };

    if (profileTab === 'orders') {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setProfileTab('main')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <h2 className="text-3xl font-black text-primary uppercase">Order History</h2>
            </div>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-primary">{order.id}</span>
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">{order.status}</span>
                    </div>
                    <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                  </div>
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-lg font-black text-primary">₹{order.total.toLocaleString('en-IN')}</span>
                    <button className="text-secondary font-bold text-sm hover:underline">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (profileTab === 'addresses') {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setProfileTab('main')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <h2 className="text-3xl font-black text-primary uppercase">Saved Addresses</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {addresses.map(addr => (
                <div key={addr.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative">
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Default</span>
                  )}
                  <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-secondary" />
                    {addr.type}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed pr-20">{addr.address}</p>
                  <div className="flex gap-4 mt-4">
                    <button className="text-secondary text-xs font-bold hover:underline">Edit</button>
                    {!addr.isDefault && <button className="text-primary text-xs font-bold hover:underline">Set as Default</button>}
                  </div>
                </div>
              ))}
              <button className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-secondary hover:text-secondary transition-all flex items-center justify-center gap-2">
                + Add New Address
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-secondary/20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full shadow-lg">
                <Settings size={16} />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-primary">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold">Gold Member</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">12 Orders</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <UserIcon size={20} className="text-secondary" />
                Personal Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                  <p className="text-primary font-medium">{user.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Default Address</label>
                  <p className="text-primary font-medium">{user.address}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <Package size={20} className="text-secondary" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => setProfileTab('orders')}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <span className="font-bold text-primary">Order History</span>
                  <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setProfileTab('addresses')}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <span className="font-bold text-primary">Saved Addresses</span>
                  <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group"
                >
                  <span className="font-bold text-red-600">Logout</span>
                  <LogOut size={18} className="text-red-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAbout = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-4xl font-black text-primary mb-6 uppercase tracking-tight">Our Story</h2>
          <div className="h-1.5 w-24 bg-secondary rounded-full mb-8"></div>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Founded in 2024, StepZone was born out of a passion for high-quality, stylish, and comfortable footwear. We believe that the right pair of shoes can not only complete an outfit but also boost your confidence and elevate your performance.
          </p>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Our mission is to provide a curated selection of the world's best footwear brands, ensuring that our customers have access to the latest trends and timeless classics. Whether you're a professional athlete, a fashion enthusiast, or someone who simply values comfort, we have something for you.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <h4 className="text-3xl font-black text-secondary">50+</h4>
              <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">Global Brands</p>
            </div>
            <div>
              <h4 className="text-3xl font-black text-secondary">10k+</h4>
              <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">Happy Customers</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800" 
              alt="Our Workshop" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
            <div className="flex items-center gap-4">
              <div className="bg-secondary p-3 rounded-2xl text-white">
                <Footprints size={32} />
              </div>
              <div>
                <h4 className="font-bold text-primary">Quality First</h4>
                <p className="text-sm text-gray-500">Every pair is inspected</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight">Our Values</h2>
          <div className="h-1 w-20 bg-secondary mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Innovation', desc: 'We stay ahead of the curve by embracing new technologies and design trends.', icon: <Settings size={24} /> },
            { title: 'Sustainability', desc: 'We are committed to reducing our environmental footprint through responsible sourcing.', icon: <Package size={24} /> },
            { title: 'Customer First', desc: 'Your satisfaction is our top priority. We go above and beyond to ensure a great experience.', icon: <UserIcon size={24} /> }
          ].map((value, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-secondary mx-auto mb-6">
                {value.icon}
              </div>
              <h4 className="text-xl font-bold text-primary mb-4">{value.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl font-black text-primary mb-4 uppercase tracking-tight">Your Watch List</h2>
        <div className="h-1.5 w-24 bg-secondary rounded-full"></div>
        <p className="text-gray-500 mt-6 max-w-lg">Keep track of the styles you love. Add them to your cart whenever you're ready to step up your game.</p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
              isLiked={true}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserIcon size={40} className="text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-2">Your list is empty</h3>
          <p className="text-gray-500 mb-8">Explore our collection and heart the items you like!</p>
          <button 
            onClick={() => setCurrentPage('shop')}
            className="btn-primary px-8 py-3"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        wishlistCount={wishlist.length}
        onCartOpen={() => setIsCartOpen(true)}
      />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && renderHome()}
            {currentPage === 'shop' && renderShop()}
            {currentPage === 'contact' && renderContact()}
            {currentPage === 'profile' && renderProfile()}
            {currentPage === 'wishlist' && renderWishlist()}
            {currentPage === 'about' && renderAbout()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        userName={user.name}
      />
    </div>
  );
}
