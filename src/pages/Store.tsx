import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, TrendingUp, X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';

const storeItems = [
  { id: 1, title: "Official Match Ball", price: "$165.00", category: "Equipment", img: "abstract", badge: "Best Seller" },
  { id: 2, title: "Argentina Authentic Home Jersey", price: "$150.00", category: "Apparel", img: "clothes", badge: "New" },
  { id: 3, title: "FIFA World Cup 26™ Logo Tee", price: "$35.00", category: "Apparel", img: "fashion" },
  { id: 4, title: "USA Away Replica Jersey", price: "$90.00", category: "Apparel", img: "man" },
  { id: 5, title: "Official Tournament Scarf", price: "$25.00", category: "Accessories", img: "texture" },
  { id: 6, title: "Limited Edition Collector's Pin", price: "$15.00", category: "Collectibles", img: "architecture" },
  { id: 7, title: "Mexico Quarter-Zip Training Top", price: "$85.00", category: "Apparel", img: "people" },
  { id: 8, title: "Mini Replica Trophy Coaster Set", price: "$40.00", category: "Home", img: "nature" }
];

// ✅ AGENT COMPLETED: Fully responsive Official Store layout mapping
const Store = () => {
  const { addItem, cart, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-transparent text-slate-900 pb-24 relative overflow-hidden">
      <Helmet>
        <title>Official Store | FIFA World Cup 2026™ Merchandise</title>
        <meta name="description" content="Shop the official FIFA World Cup 2026™ collection. Authentic jerseys, match balls, and exclusive memorabilia available now." />
      </Helmet>
      
      {/* Store Hero */}
      <div className="bg-slate-900 pt-28 pb-20 relative px-4 md:px-8 overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem]">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 opacity-50 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <div className="inline-block px-5 py-2.5 glass-card/10 backdrop-blur-md rounded-lg text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-white/10">
              AUTHENTIC TOURNAMENT GEAR
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.9]">
              The Official <br/><span className="text-emerald-400">Store.</span>
            </h1>
            <p className="text-slate-300 font-bold text-lg max-w-md mb-8 leading-relaxed">
              The definitive collection of authentic match jerseys, elite training apparel, and limited-edition FIFA World Cup 26™ memorabilia.
            </p>
            <button className="shining-button bg-transparent text-slate-900 font-black uppercase tracking-[0.2em] px-10 py-5 rounded-xl text-[10px] hover:bg-slate-900/10 transition-all flex items-center gap-3">
              <ShoppingBag className="w-4 h-4" />
              Shop New Arrivals
            </button>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            <div className="h-48 md:h-64 bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative group">
              <img src="https://picsum.photos/seed/merch1/400/500" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Merch" />
            </div>
            <div className="h-48 md:h-64 bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative group translate-y-8">
              <img src="https://picsum.photos/seed/merch2/400/500" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Merch" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <div className="flex justify-between items-end mb-12 border-b border-slate-900/5 pb-6">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-emerald-500" />
            Curated Selection
          </h2>
          <button className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-600">
            View All Collection →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {storeItems.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="bg-slate-50 rounded-[2rem] aspect-[4/5] relative overflow-hidden mb-6 flex items-center justify-center p-8 transition-all group-hover:shadow-2xl group-hover:shadow-slate-200/50 border border-slate-900/5">
                {item.badge && (
                  <div className="absolute top-4 left-4 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg z-10">
                    {item.badge}
                  </div>
                )}
                <img 
                  src={`https://picsum.photos/seed/${item.img}/400/500`} 
                  alt={item.title} 
                  className="w-full h-full object-cover absolute inset-0 mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Floating Add Button */}
                <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={(e) => { e.stopPropagation(); addItem(item); setIsCartOpen(true); }}
                    className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-xl shadow-emerald-500/20 hover:bg-emerald-400"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="px-2 flex flex-col flex-grow">
                <span className="text-[10px] text-slate-800 font-black uppercase tracking-widest mb-1.5">{item.category}</span>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight mb-3 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-base font-black text-slate-900 font-mono-data">{item.price}</span>
                  <div className="flex gap-0.5 text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CART BUTTON (FLOATING) ──────────────────── */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 left-8 z-40 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl flex items-center gap-4 group hover:scale-105 transition-all"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-emerald-500 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900">
              {totalItems}
            </span>
          )}
        </div>
        <div className="flex flex-col items-start pr-2">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">My Bag</span>
          <span className="text-sm font-black text-emerald-400 leading-tight">${totalPrice.toFixed(2)}</span>
        </div>
      </button>

      {/* ── CART DRAWER OVERLAY ─────────────────────────── */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[110]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[120] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-900/5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6 text-emerald-500" />
                    Official Bag
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">{totalItems} items selected</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
                {showSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20"
                    >
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Order Confirmed!</h3>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed mb-8 px-8">
                      Your official tournament gear is on its way. <span className="text-slate-900">#FIFA-{Math.floor(Math.random() * 90000) + 10000}</span>
                    </p>
                    <button 
                      onClick={() => { setIsCartOpen(false); setTimeout(() => setShowSuccess(false), 500); }}
                      className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-600 border-b-2 border-emerald-500/20 pb-2 transition-all"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                      <ShoppingBag className="w-10 h-10 text-slate-200" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Your Bag is Empty</h3>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed px-12">Looks like you haven't added any tournament gear yet.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-6 group">
                        <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden border border-slate-900/5 shrink-0 relative">
                          <img src={`https://picsum.photos/seed/${item.img}/200/200`} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow flex flex-col justify-center">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-xs font-black uppercase tracking-tight text-slate-900 leading-tight pr-4">{item.title}</h4>
                            <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">{item.category}</span>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-900/5">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-xs font-black">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-black text-slate-900 text-sm">{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && !showSuccess && (
                <div className="p-8 border-t border-slate-900/5 bg-slate-50/50">
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <span>Standard Shipping</span>
                      <span>FREE</span>
                    </div>
                    <div className="flex justify-between text-lg font-black uppercase tracking-tighter text-slate-900 border-t border-slate-900/5 pt-4">
                      <span>Total Amount</span>
                      <span className="text-emerald-600 font-mono-data">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCheckingOut(true);
                      setTimeout(() => {
                        setIsCheckingOut(false);
                        setShowSuccess(true);
                        clearCart();
                      }, 1500);
                    }}
                    disabled={isCheckingOut}
                    className="w-full shining-button bg-slate-900 text-white font-black uppercase tracking-[0.3em] py-5 rounded-xl flex items-center justify-center gap-4 shadow-xl shadow-slate-900/10 text-[10px] disabled:opacity-50"
                  >
                    {isCheckingOut ? 'Processing Securely...' : 'Proceed to Checkout'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Store;
