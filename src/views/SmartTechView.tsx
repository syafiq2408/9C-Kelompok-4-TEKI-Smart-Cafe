import React, { useState, useEffect } from 'react';
import { useCafe } from '../context/CafeContext';
import { SMART_TECH_FEATURES } from '../data/cafeData';
import {
  Cpu,
  Radio,
  Zap,
  Sun,
  TrendingDown,
  QrCode,
  Play,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Activity,
  Layers,
} from 'lucide-react';

export const SmartTechView: React.FC = () => {
  const { t, language } = useCafe();
  // Barista Extraction Simulator State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [simTemp, setSimTemp] = useState(92.4);
  const [simPressure, setSimPressure] = useState(0);
  const [simWeight, setSimWeight] = useState(0);

  // Table sensor map
  const [tableStatus, setTableStatus] = useState<boolean[]>([
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
  ]);

  useEffect(() => {
    let timer: any;
    if (isSimulating) {
      timer = setInterval(() => {
        setSimProgress((prev) => {
          if (prev >= 100) {
            setIsSimulating(false);
            return 100;
          }
          const next = prev + 5;
          // Calculate realistic pressure & weight
          const pressure = next < 20 ? (next / 20) * 9.0 : 9.0 + (Math.random() * 0.2 - 0.1);
          setSimPressure(Number(pressure.toFixed(1)));
          setSimWeight(Number(((next / 100) * 36).toFixed(1)));
          setSimTemp(Number((92.4 + (Math.random() * 0.1 - 0.05)).toFixed(1)));
          return next;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  const startBrewSimulation = () => {
    setSimProgress(0);
    setSimPressure(0);
    setSimWeight(0);
    setSimTemp(92.4);
    setIsSimulating(true);
  };

  const toggleTable = (index: number) => {
    setTableStatus((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const activeTablesCount = tableStatus.filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Cpu size={14} className="text-amber-400" />
          <span>{t.tech.badge}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
          {t.tech.title}
        </h1>
        <p className="text-base text-stone-300 leading-relaxed">
          {t.tech.subtitle}
        </p>
      </div>

      {/* INTERACTIVE AI BARISTA EXTRACTION LAB */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Activity size={16} />
              <span>{t.tech.simBadge}</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">
              {t.tech.simTitle}
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              {t.tech.simSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={startBrewSimulation}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-lg ${
                isSimulating
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/20 active:scale-95'
              }`}
            >
              <Play size={14} />
              <span>{isSimulating ? t.tech.extracting : t.tech.startExtraction}</span>
            </button>
            <button
              onClick={() => {
                setIsSimulating(false);
                setSimProgress(0);
                setSimPressure(0);
                setSimWeight(0);
              }}
              className="p-2.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Telemetry Gauge Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
            <span className="text-[10px] text-stone-400 uppercase font-mono block mb-1">
              PID Boiler Temp
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-white font-mono">{simTemp}</span>
              <span className="text-amber-400 font-bold">°C</span>
            </div>
            <span className="text-[10px] text-emerald-400 mt-1 block">Presisi ±0.1°C Stabil</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
            <span className="text-[10px] text-stone-400 uppercase font-mono block mb-1">
              Tekanan Pompa Hidrolik
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-amber-400 font-mono">
                {simPressure}
              </span>
              <span className="text-stone-300 font-bold">BAR</span>
            </div>
            <span className="text-[10px] text-amber-300 mt-1 block">Target Ideal 9.0 Bar</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
            <span className="text-[10px] text-stone-400 uppercase font-mono block mb-1">
              Digital Scale Yield
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-white font-mono">{simWeight}</span>
              <span className="text-stone-300 font-bold">gram</span>
            </div>
            <span className="text-[10px] text-stone-400 mt-1 block">Rasio 1:2 (18g in / 36g out)</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
            <span className="text-[10px] text-stone-400 uppercase font-mono block mb-1">
              Kemajuan Siklus
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                {simProgress}%
              </span>
            </div>
            <span className="text-[10px] text-stone-400 mt-1 block">
              {simProgress === 100 ? 'Ekstraksi Selesai (Emas Crema)' : 'Menganalisis Flow Rate...'}
            </span>
          </div>
        </div>

        {/* Progress Bar Visual */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-stone-400 font-mono">
            <span>Pre-Infusion (3s)</span>
            <span>Ramp to 9 Bar (6s)</span>
            <span>Steady Flow (18s)</span>
            <span>Cut-off Presisi</span>
          </div>
          <div className="w-full h-3 rounded-full bg-stone-950 overflow-hidden p-0.5 border border-stone-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-emerald-400 transition-all duration-150"
              style={{ width: `${simProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* IOT TABLE OCCUPANCY MAP SIMULATOR */}
      <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Radio size={16} />
              <span>Smart Seating Telemetry Map</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-heading mt-1">
              Denah Sensor Meja IoT (12 Meja)
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Klik meja untuk mensimulasikan kedatangan atau kepulangan tamu kafe secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-emerald-500"></span>
              <span className="text-stone-300">Terisi ({activeTablesCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-stone-800 border border-stone-700"></span>
              <span className="text-stone-400">Kosong ({12 - activeTablesCount})</span>
            </div>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {tableStatus.map((isOccupied, idx) => (
            <button
              key={idx}
              onClick={() => toggleTable(idx)}
              className={`p-4 rounded-2xl border text-center transition-all ${
                isOccupied
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/10'
                  : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:border-stone-700'
              }`}
            >
              <span className="text-[10px] font-mono block text-stone-500">SEAT IOT</span>
              <span className="text-lg font-bold font-heading block my-1">Meja #{idx + 1}</span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block ${
                  isOccupied
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-stone-800 text-stone-500'
                }`}
              >
                {isOccupied ? 'Terisi (Ada Tamu)' : 'Tersedia'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 6 CORE SMART TECH PILLARS */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white font-heading text-center">
          6 Pilar Arsitektur Cerdas TEKI
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SMART_TECH_FEATURES.map((tech) => (
            <div
              key={tech.id}
              className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-stone-950 text-amber-400 border border-stone-800 uppercase">
                    {tech.category}
                  </span>
                  <span className="text-sm font-black text-white font-mono">{tech.stat}</span>
                </div>
                <h4 className="text-base font-bold text-white font-heading">{tech.name}</h4>
                <p className="text-xs text-stone-400 leading-relaxed">{tech.description}</p>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>{tech.statLabel}</span>
                <CheckCircle2 size={14} className="text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
