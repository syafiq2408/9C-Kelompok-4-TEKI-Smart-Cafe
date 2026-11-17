import React from 'react';
import { useCafe } from '../context/CafeContext';
import { CREATORS } from '../data/cafeData';
import {
  Sparkles,
  Target,
  Compass,
  Cpu,
  Layers,
  Award,
  Coffee,
  CheckCircle2,
  Users,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { t, language } = useCafe();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Sparkles size={14} className="text-amber-400" />
          <span>{t.about.badge}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
          {t.about.title}
        </h1>
        <p className="text-base text-stone-300 leading-relaxed">
          {t.about.subtitle}
        </p>
      </div>

      {/* Story & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-stone-900/60 border border-stone-800 rounded-3xl p-8 sm:p-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Compass size={16} />
            <span>{t.about.storyBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {t.about.storyTitle}
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            {t.about.storyPara1}
          </p>
          <p className="text-sm text-stone-300 leading-relaxed">
            {t.about.storyPara2}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
              <span className="text-2xl font-black text-amber-400 font-mono">100%</span>
              <p className="text-xs text-stone-400 mt-1">
                {language === 'id' ? 'Otomasi Alur Pesanan Real-Time' : 'Real-Time Order Automation'}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
              <span className="text-2xl font-black text-emerald-400 font-mono">0.1°C</span>
              <p className="text-xs text-stone-400 mt-1">
                {language === 'id' ? 'Presisi Termal Ekstraksi Kopi' : 'Thermal Extraction Precision'}
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-stone-800 h-80 sm:h-96">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
            alt="Barista & Tech Collaboration"
            className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs text-stone-200">
            <span className="font-bold text-amber-300 block mb-0.5">Integrasi Manusia & Mesin</span>
            Barista kami berfokus pada keramahan pelayanan, sementara rutinitas repetitif dikelola
            oleh modul IoT cerdas.
          </div>
        </div>
      </div>

      {/* Meet the Creators (Required in prompt) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Users size={16} />
            <span>{language === 'id' ? 'Profil Lengkap Tim Pembuat' : 'Full Team Profiles'}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-heading">
            {t.about.teamTitle}
          </h2>
          <p className="text-xs text-stone-400">
            {t.about.teamSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CREATORS.map((member) => (
            <div
              key={member.name}
              className="p-6 sm:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-6 shadow-lg group"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative shrink-0">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500 shadow-xl group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-amber-500 text-stone-950 shadow">
                    <Sparkles size={12} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-amber-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-amber-400 mt-0.5">{member.role}</p>
                  <p className="text-[11px] text-stone-400 mt-1 font-mono">
                    SMPIT Citra Azzahra Innovator
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">{member.bio}</p>

              {/* Skills */}
              <div>
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                  {language === 'id' ? 'Keahlian & Fokus Riset:' : 'Skills & Research Focus:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="p-3.5 rounded-xl bg-stone-950/70 border-l-2 border-amber-500 text-stone-300 italic text-xs">
                {member.quote}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-stone-900/50 border border-stone-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Target size={24} />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">{t.about.visionTitle}</h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {t.about.visionDesc}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-stone-900/50 border border-stone-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">{t.about.missionTitle}</h3>
          <ul className="text-xs sm:text-sm text-stone-300 space-y-2.5 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>{t.about.mission1}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>{t.about.mission2}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>{t.about.mission3}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
