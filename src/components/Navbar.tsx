import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { PageId, Language } from '../types';
import {
  Coffee,
  Sparkles,
  ShoppingBag,
  Laptop,
  Menu as MenuIcon,
  X,
  Cpu,
  Layers,
  FileText,
  Percent,
  Compass,
  Globe,
  Check,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cartItemCount,
    newOrdersBadge,
    clearOrdersBadge,
    language,
    setLanguage,
    t,
  } = useCafe();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.nav.home, icon: <Compass size={15} /> },
    { id: 'about', label: t.nav.about, icon: <Sparkles size={15} /> },
    { id: 'design', label: t.nav.design, icon: <Layers size={15} /> },
    { id: 'menu', label: t.nav.menu, icon: <Coffee size={15} /> },
    { id: 'tech', label: t.nav.tech, icon: <Cpu size={15} /> },
    { id: 'business', label: t.nav.business, icon: <Percent size={15} /> },
    { id: 'report', label: t.nav.report, icon: <FileText size={15} /> },
  ];

  const handleNavClick = (id: PageId) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCashierClick = () => {
    clearOrdersBadge();
    setCurrentPage('kasir');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyerClick = () => {
    setCurrentPage('pembeli');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800/80 bg-stone-950/95 backdrop-blur-md">
      {/* TOP UTILITY STRIP: PENGATURAN BAHASA DI UJUNG KIRI ATAS */}
      <div className="w-full bg-stone-950 border-b border-stone-800/60 py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* UJUNG KIRI ATAS (TOP-LEFT CORNER): LANGUAGE SETTING SELECTOR */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-stone-400 font-medium">
              <Globe size={13} className="text-amber-400" />
              <span className="hidden sm:inline text-[11px] font-mono uppercase tracking-wider text-stone-400">
                {language === 'id' ? 'Pengaturan Bahasa:' : 'Language Setting:'}
              </span>
            </div>

            <div className="flex items-center p-0.5 rounded-xl bg-stone-900 border border-stone-800 text-[11px]">
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  language === 'id'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
                title="Pilih Bahasa Indonesia"
              >
                <span>🇮🇩</span>
                <span className="font-semibold">Bahasa Indonesia</span>
                {language === 'id' && <Check size={12} className="stroke-[3] ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
                title="Choose English"
              >
                <span>🇬🇧</span>
                <span className="font-semibold">Bahasa Inggris (English)</span>
                {language === 'en' && <Check size={12} className="stroke-[3] ml-0.5" />}
              </button>
            </div>
          </div>

          {/* TOP RIGHT: Live System Ticker */}
          <div className="hidden md:flex items-center gap-4 text-[11px] text-stone-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>IoT Network: Online</span>
            </span>
            <span className="text-stone-500">|</span>
            <span>07.00 - 23.00 WIB</span>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
            <Coffee size={24} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                TEKI
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-stone-950 uppercase tracking-widest">
                SMART
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-mono tracking-wider">
              {t.nav.tagline}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-stone-900/60 p-1.5 rounded-full border border-stone-800/80 text-xs">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Dual Mode Portals: Pembeli & Kasir */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Pembeli Portal Button */}
          <button
            onClick={handleBuyerClick}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              currentPage === 'pembeli'
                ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/20'
                : 'bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/30'
            }`}
          >
            <ShoppingBag size={16} />
            <span>{t.nav.customerPortal}</span>
            {cartItemCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-[10px] font-extrabold rounded-full bg-amber-400 text-stone-950 shadow">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Kasir POS Button */}
          <button
            onClick={handleCashierClick}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              currentPage === 'kasir'
                ? 'bg-emerald-500 text-stone-950 ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-500/20'
                : 'bg-stone-900 hover:bg-stone-800 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            <Laptop size={16} />
            <span>{t.nav.cashierPos}</span>
            {newOrdersBadge > 0 && (
              <span className="flex items-center justify-center px-1.5 h-5 text-[10px] font-extrabold rounded-full bg-rose-500 text-white animate-pulse">
                +{newOrdersBadge} {t.nav.newBadge}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={handleBuyerClick}
            className="p-2.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 relative"
            title={t.nav.customerPortal}
          >
            <ShoppingBag size={18} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-[9px] font-black text-stone-950 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          <button
            onClick={handleCashierClick}
            className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 relative"
            title={t.nav.cashierPos}
          >
            <Laptop size={18} />
            {newOrdersBadge > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-black text-white flex items-center justify-center animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-stone-800 bg-stone-950/98 px-4 py-4 space-y-3 animate-fadeIn">
          {/* Mobile Language Switcher */}
          <div className="p-2.5 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-center justify-between text-xs">
            <span className="text-stone-400 flex items-center gap-1.5">
              <Globe size={14} className="text-amber-400" />
              <span>Bahasa / Language:</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('id')}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                  language === 'id' ? 'bg-amber-500 text-stone-950' : 'text-stone-300'
                }`}
              >
                🇮🇩 ID
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                  language === 'en' ? 'bg-amber-500 text-stone-950' : 'text-stone-300'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={handleBuyerClick}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl font-bold text-xs ${
                currentPage === 'pembeli'
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-900 text-amber-300 border border-amber-500/20'
              }`}
            >
              <ShoppingBag size={15} />
              <span>{t.nav.customerPortal} ({cartItemCount})</span>
            </button>
            <button
              onClick={handleCashierClick}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl font-bold text-xs ${
                currentPage === 'kasir'
                  ? 'bg-emerald-500 text-stone-950'
                  : 'bg-stone-900 text-emerald-400 border border-emerald-500/20'
              }`}
            >
              <Laptop size={15} />
              <span>{t.nav.cashierPos} {newOrdersBadge > 0 ? `(+${newOrdersBadge})` : ''}</span>
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-stone-900 text-amber-400 font-bold border-l-4 border-amber-500 pl-3'
                      : 'text-stone-300 hover:bg-stone-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                  {isActive && <span className="text-xs text-amber-400">●</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
