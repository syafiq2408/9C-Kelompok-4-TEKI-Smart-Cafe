import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem, MenuCategory } from '../types';
import { ItemCustomizeModal } from '../components/ItemCustomizeModal';
import {
  Coffee,
  Search,
  Sparkles,
  ShoppingBag,
  Flame,
  Clock,
  ArrowRight,
  Plus,
} from 'lucide-react';

export const MenuView: React.FC = () => {
  const { addToCart, setCurrentPage, cartItemCount, cartTotal, t, language, menuItems } = useCafe();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  const categories: { id: MenuCategory; label: string; icon: string }[] = [
    { id: 'all', label: t.menu.categories.all, icon: '✨' },
    { id: 'coffee', label: t.menu.categories.coffee, icon: '☕' },
    { id: 'dessert', label: t.menu.categories.dessert, icon: '🍰' },
    { id: 'savory', label: t.menu.categories.savory, icon: '🧀' },
    { id: 'non-coffee', label: t.menu.categories.nonCoffee, icon: '🍵' },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Coffee size={14} className="text-amber-400" />
          <span>{t.menu.badge}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
          {t.menu.title}
        </h1>
        <p className="text-base text-stone-300 leading-relaxed">
          {t.menu.subtitle}
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder={t.menu.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-900 border border-stone-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MENU GRID */}
      {filteredItems.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-stone-900/40 border border-stone-800 space-y-3">
          <p className="text-base font-semibold text-stone-300">
            Tidak ada menu yang sesuai dengan pencarian "{searchQuery}"
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-stone-900/80 border border-stone-800 rounded-3xl overflow-hidden hover:border-amber-500/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Tags */}
              <div className="relative h-52 bg-stone-950 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30 uppercase">
                    {item.category}
                  </span>
                  {item.isPopular && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-stone-950">
                      FAVORIT
                    </span>
                  )}
                  {item.isSmartSpecial && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-stone-950">
                      SMART RECIPE
                    </span>
                  )}
                </div>

                {item.prepTime && (
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] text-stone-300 flex items-center gap-1 border border-white/10">
                    <Clock size={11} className="text-amber-400" />
                    <span>{item.prepTime}</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-heading group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1.5 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-stone-950 text-stone-400 border border-stone-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 block font-mono">{t.menu.price}</span>
                    <span className="text-base font-extrabold text-amber-400">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedItemForModal(item)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 active:scale-95"
                  >
                    <Plus size={14} className="stroke-[3]" />
                    <span>{t.menu.orderBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Bottom Cart Bar (if items in cart) */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4 animate-bounce-short">
          <div className="p-4 rounded-3xl bg-stone-900 border border-amber-500/40 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                <ShoppingBag size={20} />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  {cartItemCount} {t.menu.floatingCartTitle}
                </span>
                <span className="text-xs text-amber-400 font-bold font-mono">
                  Total: Rp {cartTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('pembeli')}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20"
            >
              <span>{t.menu.proceedToPay}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Item Customization Modal */}
      <ItemCustomizeModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={(item, options, qty) => addToCart(item, options, qty)}
      />
    </div>
  );
};
