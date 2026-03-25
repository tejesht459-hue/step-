import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: number, delta: number) => void;
  onRemove: (id: string, size: number) => void;
  userName?: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  userName
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    const phoneNumber = '9182916604'; // Updated to user's requested number
    let message = `👟 *New Order from StepZone*\n`;
    if (userName) message += `👤 *Customer:* ${userName}\n`;
    message += '\n';
    
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Size: UK ${item.selectedSize}\n`;
      message += `   Qty: ${item.quantity}\n`;
      message += `   Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });

    message += `*Total Amount: ₹${total.toLocaleString('en-IN')}*\n\n`;
    message += 'Please confirm my order. Thank you!';

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-secondary" />
                <h2 className="text-xl font-black text-primary uppercase">Your Cart</h2>
                <span className="bg-secondary/10 text-secondary text-xs font-bold px-2 py-1 rounded-full">
                  {items.length} Items
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-gray-50 p-6 rounded-full">
                    <ShoppingBag size={48} className="text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">Your cart is empty</h3>
                  <p className="text-gray-500 text-sm max-w-[200px]">Looks like you haven't added any footwear yet.</p>
                  <button 
                    onClick={onClose}
                    className="btn-secondary px-8 py-3"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-primary line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => onRemove(item.id, item.selectedSize)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-400 uppercase tracking-wider">{item.brand}</p>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <p className="text-xs font-bold text-secondary">UK {item.selectedSize}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                            disabled={item.quantity <= 1}
                            className="p-1 hover:bg-white rounded-md transition-all disabled:opacity-30"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                            className="p-1 hover:bg-white rounded-md transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-black text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-2xl font-black text-primary">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-gray-400 text-center">Your order details will be sent via WhatsApp for confirmation</p>
                <button 
                  onClick={handleWhatsAppCheckout}
                  className="btn-secondary w-full py-4 text-lg flex items-center justify-center gap-2"
                >
                  Buy via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
