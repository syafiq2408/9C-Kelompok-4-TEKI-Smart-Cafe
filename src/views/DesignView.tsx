import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { CAFE_ZONES } from '../data/cafeData';
import {
  Layers,
  Sun,
  Moon,
  Sparkles,
  Wifi,
  Volume2,
  Maximize2,
  Check,
  Eye,
} from 'lucide-react';

export const DesignView: React.FC = () => {
  const { lightingTheme, setLightingTheme, t, language } = useCafe();
  const [activeZone, setActiveZone] = useState<number>(0);

  const themeStyles = {
    amber: {
      name: language === 'id' ? 'Warm Amber (2700K)' : 'Warm Amber (2700K)',
      desc:
        language === 'id'
          ? 'Mode malam & santai. Memberikan efek relaksasi mendalam dan kehangatan kayu alami.'
          : 'Evening cozy mode. Provides deep relaxation and warm natural timber aesthetics.',
      glow: 'from-amber-900/40 via-amber-950/20 to-transparent',
      accent: 'border-amber-500/50 text-amber-400 bg-amber-500/10',
    },
    cyber: {
      name: language === 'id' ? 'Cyber Neon (4500K)' : 'Cyber Neon (4500K)',
      desc:
        language === 'id'
          ? 'Mode sore & ide kreatif. Nuansa futuristik dengan pendaran aksen teal-neon dan ambient smart LED.'
          : 'Afternoon creative mode. Futuristic ambiance with teal-neon accents and smart LED illumination.',
      glow: 'from-cyan-900/40 via-teal-950/20 to-transparent',
      accent: 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10',
    },
    daylight: {
      name: language === 'id' ? 'Daylight Focus (6000K)' : 'Daylight Focus (6000K)',
      desc:
        language === 'id'
          ? 'Mode pagi & jam belajar produktif. Spektrum cahaya alami tanpa kedip (flicker-free) anti lelah mata.'
          : 'Morning & deep study mode. Natural flicker-free spectrum reducing eye strain during work.',
      glow: 'from-sky-900/30 via-slate-900/20 to-transparent',
      accent: 'border-sky-400/50 text-sky-300 bg-sky-400/10',
    },
  };

  const currentTheme = themeStyles[lightingTheme];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Layers size={14} className="text-amber-400" />
          <span>{t.design.badge}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
          {t.design.title}
        </h1>
        <p className="text-base text-stone-300 leading-relaxed">
          {t.design.subtitle}
        </p>
      </div>

      {/* INTERACTIVE LIGHTING SIMULATOR */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-800 bg-stone-900/70 p-6 sm:p-10 transition-all duration-700 shadow-2xl">
        {/* Dynamic theme background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentTheme.glow} pointer-events-none transition-all duration-700`}
        />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                {t.design.simBadge}
              </span>
              <h2 className="text-2xl font-bold text-white font-heading">
                {t.design.simTitle}
              </h2>
            </div>

            {/* Toggle Buttons */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-950/90 border border-stone-800">
              {(['amber', 'cyber', 'daylight'] as const).map((tBtn) => (
                <button
                  key={tBtn}
                  onClick={() => setLightingTheme(tBtn)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    lightingTheme === tBtn
                      ? 'bg-white text-stone-950 shadow-md scale-105'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {tBtn === 'amber' && <Moon size={13} className="text-amber-600" />}
                  {tBtn === 'cyber' && <Sparkles size={13} className="text-cyan-600" />}
                  {tBtn === 'daylight' && <Sun size={13} className="text-sky-600" />}
                  <span className="capitalize">{tBtn}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white font-heading">{currentTheme.name}</h4>
              <p className="text-xs text-stone-400 mt-0.5">{currentTheme.desc}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-xl text-xs font-semibold border ${currentTheme.accent}`}
            >
              {t.design.activeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* 4 INTERACTIVE CAFE ZONES */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {t.design.zonesTitle}
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              {t.design.zonesSubtitle}
            </p>
          </div>

          {/* Zone Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {CAFE_ZONES.map((zone, idx) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeZone === idx
                    ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {zone.name.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Zone Display */}
        {(() => {
          const zone = CAFE_ZONES[activeZone];
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-10 animate-fadeIn">
              {/* Photo */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden h-80 sm:h-96 border border-stone-800">
                <img
                  src={zone.image}
                  alt={zone.name}
                  className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30 font-semibold">
                    Zona #{activeZone + 1}
                  </span>
                  <span className="text-stone-300 font-mono">Sensory Architecture</span>
                </div>
              </div>

              {/* Text Specs */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    {zone.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-white font-heading mt-1">{zone.name}</h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed">
                    {zone.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-800">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                    Fitur Ergonomis & IoT:
                  </span>
                  <ul className="space-y-2 text-xs text-stone-300">
                    {zone.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <Check size={14} className="text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Highlight Card */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                  <span className="font-bold text-amber-400 block mb-1">Inovasi Sensor:</span>
                  {zone.techHighlight}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* DESIGN SPEC SHEET */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-3xl bg-stone-900/50 border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Volume2 size={20} />
          </div>
          <h4 className="text-base font-bold text-white font-heading">Akustik Seimbang (42 dB)</h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Dinding panel kayu berserat mikro menyerap dengung suara mesin grinder sehingga Anda
            tetap bisa berbincang dengan nyaman atau fokus belajar.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-stone-900/50 border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Wifi size={20} />
          </div>
          <h4 className="text-base font-bold text-white font-heading">Meja Pengisian Nirkabel</h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Ditanam modul fast charging Qi 15W di balik lapisan kayu oak pada semua 12 meja kafe,
            menghilangkan kekacauan kabel stopkontak.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-stone-900/50 border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <Sun size={20} />
          </div>
          <h4 className="text-base font-bold text-white font-heading">Udara Sejuk Alami</h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Sensor CO2 dan kualitas udara VOC memicu ventilasi mikro otomatis saat ruangan padat,
            memastikan kadar oksigen otak selalu prima.
          </p>
        </div>
      </div>
    </div>
  );
};
