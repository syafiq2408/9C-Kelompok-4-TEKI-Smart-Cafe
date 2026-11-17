import React from 'react';
import { useCafe } from '../context/CafeContext';
import { MENU_ITEMS } from '../data/menuData';
import { CREATORS } from '../data/cafeData';
import {
  Sparkles,
  ArrowRight,
  Coffee,
  Cpu,
  Laptop,
  ShoppingBag,
  Zap,
  CheckCircle,
  Radio,
  Clock,
  Flame,
  Award,
  ChevronRight,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setCurrentPage, addToCart, t, language, menuItems } = useCafe();

  const featuredItems = menuItems.filter((i) => i.isPopular || i.isSmartSpecial).slice(0, 4);

  return (
    <div className="min-h-screen space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden border-b border-stone-800/60">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/10 blur-[130px] -z-10 rounded-full pointer-events-none" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-500/10 blur-[110px] -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-inner">
                <Sparkles size={14} className="text-amber-400" />
                <span>{t.home.badge}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="text-stone-400">TEKI 2026</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
                {t.home.heroTitle1}{' '}
                <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                  {t.home.heroTitle2}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
                {t.home.heroSubtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentPage('pembeli')}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-xl shadow-amber-500/25 active:scale-95"
                >
                  <ShoppingBag size={18} />
                  <span>{t.home.orderFromTable}</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => setCurrentPage('kasir')}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-emerald-400 font-bold text-sm border border-emerald-500/30 transition-all hover:border-emerald-500/60"
                >
                  <Laptop size={18} />
                  <span>{t.home.openCashier}</span>
                </button>

                <button
                  onClick={() => setCurrentPage('menu')}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-stone-900/60 hover:bg-stone-800 text-stone-300 hover:text-white font-medium text-sm border border-stone-800 transition-all"
                >
                  <Coffee size={18} />
                  <span>{t.home.viewMenu}</span>
                </button>
              </div>

              {/* Creator Credit Badge */}
              <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center gap-3 text-xs text-stone-400">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Award size={15} />
                  <span>{t.home.creatorsLabel}</span>
                </div>
                <span>Beryl Arkananta Zaidan</span>
                <span>•</span>
                <span>Farsya Azka</span>
                <span>•</span>
                <span>Wistara Naufal Rabbani</span>
                <span>•</span>
                <span>Nadira Inaya Putri</span>
              </div>
            </div>

            {/* Right Interactive Telemetry & Cafe Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-stone-800 bg-stone-900/80 shadow-2xl p-2">
                {/* Hero Featured Image */}
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
                    alt="TEKI Smart Cafe Interior"
                    className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                  {/* Status Overlay */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-white font-medium">{t.home.interiorStatus}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs text-amber-400 font-mono uppercase tracking-wider font-semibold">
                      {language === 'id' ? 'Suasana & Desain Cerdas' : 'Smart Spatial Experience'}
                    </p>
                    <h3 className="text-lg font-bold text-white font-heading">
                      {t.home.interiorTitle}
                    </h3>
                  </div>
                </div>

                {/* Live Telemetry Ticker */}
                <div className="grid grid-cols-3 gap-2 p-3 mt-1 bg-stone-950/90 rounded-2xl border border-stone-800 text-center">
                  <div className="p-2 rounded-xl bg-stone-900/60">
                    <p className="text-[10px] text-stone-400 uppercase font-mono">{t.home.extractionBar}</p>
                    <p className="text-sm font-bold text-amber-400 font-mono">9.0 BAR</p>
                    <p className="text-[9px] text-emerald-400">PID ±0.1°C</p>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-900/60">
                    <p className="text-[10px] text-stone-400 uppercase font-mono">{t.home.occupiedTables}</p>
                    <p className="text-sm font-bold text-white font-mono">8 / 12</p>
                    <p className="text-[9px] text-amber-400">Ultrasonic ON</p>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-900/60">
                    <p className="text-[10px] text-stone-400 uppercase font-mono">{t.home.posSystem}</p>
                    <p className="text-sm font-bold text-emerald-400 font-mono">0.28s</p>
                    <p className="text-[9px] text-stone-400">{language === 'id' ? 'Sinkron Cepat' : 'Low Latency'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FEATURE TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => setCurrentPage('pembeli')}
            className="group p-6 rounded-3xl bg-stone-900/70 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-900 transition-all cursor-pointer shadow-lg space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag size={24} />
            </div>
            <h3 className="text-lg font-bold text-white font-heading group-hover:text-amber-400 transition-colors flex items-center justify-between">
              <span>{t.home.quickTiles.buyerTitle}</span>
              <ChevronRight size={18} className="text-stone-500 group-hover:text-amber-400" />
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t.home.quickTiles.buyerDesc}
            </p>
          </div>

          <div
            onClick={() => setCurrentPage('kasir')}
            className="group p-6 rounded-3xl bg-stone-900/70 border border-stone-800 hover:border-emerald-500/50 hover:bg-stone-900 transition-all cursor-pointer shadow-lg space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Laptop size={24} />
            </div>
            <h3 className="text-lg font-bold text-white font-heading group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>{t.home.quickTiles.cashierTitle}</span>
              <ChevronRight size={18} className="text-stone-500 group-hover:text-emerald-400" />
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t.home.quickTiles.cashierDesc}
            </p>
          </div>

          <div
            onClick={() => setCurrentPage('tech')}
            className="group p-6 rounded-3xl bg-stone-900/70 border border-stone-800 hover:border-blue-500/50 hover:bg-stone-900 transition-all cursor-pointer shadow-lg space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cpu size={24} />
            </div>
            <h3 className="text-lg font-bold text-white font-heading group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>{t.home.quickTiles.techTitle}</span>
              <ChevronRight size={18} className="text-stone-500 group-hover:text-blue-400" />
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t.home.quickTiles.techDesc}
            </p>
          </div>
        </div>
      </section>

      {/* POPULAR MENU HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Flame size={16} />
              <span>{t.home.popularSubtitle}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white font-heading">
              {t.home.popularTitle}
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('menu')}
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors"
          >
            <span>{t.home.viewAllMenu}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-stone-900/80 border border-stone-800 rounded-3xl overflow-hidden hover:border-amber-500/40 hover:shadow-xl transition-all flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-stone-950">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/20">
                  {item.category.toUpperCase()}
                </span>
                {item.isPopular && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full bg-amber-500 text-stone-950">
                    {language === 'id' ? 'BEST SELLER' : 'POPULAR'}
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white font-heading group-hover:text-amber-400 transition-colors">
                    {language === 'en' && item.nameEn ? item.nameEn : item.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                    {language === 'en' && item.descriptionEn ? item.descriptionEn : item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 block">
                      {language === 'id' ? 'Harga' : 'Price'}
                    </span>
                    <span className="text-base font-extrabold text-amber-400">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(item);
                      setCurrentPage('pembeli');
                    }}
                    className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-stone-950 transition-all font-semibold text-xs flex items-center gap-1.5"
                  >
                    <ShoppingBag size={14} />
                    <span>{language === 'id' ? 'Pesan' : 'Order'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEET THE CREATORS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900/90 to-amber-950/30 border border-stone-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Award size={16} />
              <span>{language === 'id' ? 'Inovasi Siswa Berbakat' : 'Student Innovation Showcase'}</span>
            </div>

            <div className="max-w-3xl space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                {t.home.creatorsBannerTitle}
              </h2>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                {t.home.creatorsBannerDesc}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {CREATORS.map((member) => (
                <div
                  key={member.name}
                  className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 hover:border-amber-500/40 transition-all text-center space-y-2.5"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-14 h-14 rounded-full mx-auto object-cover border-2 border-amber-500/50 shadow-md"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white font-heading">{member.name}</h4>
                    <p className="text-[10px] text-amber-400 mt-0.5">{member.role.split('&')[0]}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-start">
              <button
                onClick={() => setCurrentPage('about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors"
              >
                <span>{t.home.creatorsButton}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* REPORT TEXT PROMO CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-stone-900/50 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Cpu size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-heading">
                {t.home.reportCalloutTitle}
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                {t.home.reportCalloutDesc}
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage('report')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shrink-0 transition-colors"
          >
            {t.home.reportCalloutBtn}
          </button>
        </div>
      </section>
    </div>
  );
};
