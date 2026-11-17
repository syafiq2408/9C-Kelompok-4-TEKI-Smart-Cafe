import React from 'react';
import { useCafe } from '../context/CafeContext';
import { PageId } from '../types';
import { Coffee, MapPin, Clock, Phone, Mail, Award, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, language, t } = useCafe();

  const handleNav = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800/80 pt-16 pb-12 text-stone-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/25">
                <Coffee size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-heading tracking-tight">
                  TEKI SMART CAFE
                </span>
                <p className="text-[10px] text-amber-400 font-mono">
                  {t.nav.tagline}
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {language === 'id'
                ? 'Pelopor kafe pintar generasi baru yang memadukan kopi artisanal spesialti, sistem IoT meja pintar, otomasi barista bertenaga AI, dan portal kasir mandiri terintegrasi.'
                : 'A pioneer next-gen smart cafe uniting specialty artisanal coffee, smart IoT table telemetry, AI barista automation, and an integrated self-service POS ecosystem.'}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{language === 'id' ? 'Sistem IoT & AI Barista Online' : 'IoT & AI Barista Systems Online'}</span>
            </div>
          </div>

          {/* Col 2: Creators Highlight */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold font-heading">
              <Award size={16} className="text-amber-400" />
              <h4 className="text-base text-stone-100">
                {language === 'id' ? 'Tim Pengembang & Pembuat' : 'Creators & Engineering Team'}
              </h4>
            </div>
            <p className="text-xs text-stone-400">
              Karya inovasi kolaboratif siswa berprestasi:
            </p>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="font-semibold text-white">Beryl Arkananta Zaidan</span>
                <span className="text-[10px] text-stone-400">(IoT Architect)</span>
              </li>
              <li className="flex items-center gap-2 text-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="font-semibold text-white">Farsya Azka</span>
                <span className="text-[10px] text-stone-400">(Creative Director)</span>
              </li>
              <li className="flex items-center gap-2 text-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="font-semibold text-white">Wistara Naufal Rabbani</span>
                <span className="text-[10px] text-stone-400">(Coffee AI Science)</span>
              </li>
              <li className="flex items-center gap-2 text-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="font-semibold text-white">Nadira Inaya Putri</span>
                <span className="text-[10px] text-stone-400">(Product UX Lead)</span>
              </li>
            </ul>
            <div className="pt-1">
              <span className="text-[11px] text-amber-300 font-medium bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800">
                SMPIT Citra Azzahra Innovation
              </span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-stone-100 font-heading">Navigasi Halaman</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleNav('home')}
                className="text-left hover:text-amber-400 transition-colors py-1"
              >
                Home
              </button>
              <button
                onClick={() => handleNav('about')}
                className="text-left hover:text-amber-400 transition-colors py-1"
              >
                About Us
              </button>
              <button
                onClick={() => handleNav('design')}
                className="text-left hover:text-amber-400 transition-colors py-1"
              >
                Our Cafe/Design
              </button>
              <button
                onClick={() => handleNav('menu')}
                className="text-left hover:text-amber-400 transition-colors py-1"
              >
                Menu Lengkap
              </button>
              <button
                onClick={() => handleNav('tech')}
                className="text-left hover:text-amber-400 transition-colors py-1"
              >
                Smart Technology
              </button>
              <button
                onClick={() => handleNav('business')}
                className="text-left hover:text-amber-400 transition-colors py-1"
              >
                Bisnis & Promo
              </button>
              <button
                onClick={() => handleNav('report')}
                className="text-left hover:text-amber-400 transition-colors py-1"
              >
                Report Text
              </button>
              <button
                onClick={() => handleNav('pembeli')}
                className="text-left text-amber-300 hover:text-amber-200 font-medium transition-colors py-1"
              >
                Portal Pembeli
              </button>
              <button
                onClick={() => handleNav('kasir')}
                className="text-left text-emerald-400 hover:text-emerald-300 font-medium transition-colors py-1"
              >
                Sistem Kasir POS
              </button>
            </div>
          </div>

          {/* Col 4: Location & Operating Hours */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-stone-100 font-heading">Lokasi & Jam Buka</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Jl. Citra Lestari No. 12, Smart Tech Innovation District, Jakarta Selatan
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-stone-200 font-medium">Buka Setiap Hari:</p>
                  <p className="text-stone-400">Senin - Minggu: 07.00 - 23.00 WIB</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <span>+62 812-TEKI-SMART</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <span>hello@tekismartcafe.id</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 TEKI Smart Cafe. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-1.5 text-stone-400">
            <span>Dirancang dengan</span>
            <Heart size={14} className="text-rose-500 fill-rose-500 inline" />
            <span>oleh Beryl, Farsya, Wistara, dan Nadira</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
