import React from 'react';
import { useCafe } from '../context/CafeContext';
import { REPORT_TEXT_DATA } from '../data/cafeData';
import {
  FileText,
  BookOpen,
  Printer,
  Sparkles,
  Info,
} from 'lucide-react';

export const ReportTextView: React.FC = () => {
  const { language, setLanguage } = useCafe();
  const isEnglish = language === 'en';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fadeIn">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <FileText size={14} className="text-amber-400" />
            <span>Academic Factual Report Text</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            {isEnglish
              ? 'Scientific Report Text: TEKI Smart Cafe'
              : 'Teks Laporan Ilmiah: TEKI Smart Cafe'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400">
            {isEnglish
              ? 'Academic descriptive factual report following standard curriculum structure (General Classification & Descriptions).'
              : 'Laporan ilmiah faktual berstruktur kurikulum resmi (General Classification & Descriptions).'}
          </p>
        </div>

        {/* Language Switcher & Print Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-2xl bg-stone-900 border border-stone-800 text-xs font-bold">
            <button
              onClick={() => setLanguage('id')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                !isEnglish
                  ? 'bg-amber-500 text-stone-950 shadow font-extrabold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              🇮🇩 Bahasa Indonesia
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                isEnglish
                  ? 'bg-amber-500 text-stone-950 shadow font-extrabold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              🇬🇧 English Text
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <Printer size={15} />
            <span>{isEnglish ? 'Print / PDF' : 'Cetak / PDF'}</span>
          </button>
        </div>
      </div>

      {/* METADATA SHEET */}
      <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
        <div>
          <span className="text-stone-500 block">
            {isEnglish ? 'Research Context:' : 'Konteks Riset:'}
          </span>
          <span className="font-semibold text-stone-200">{REPORT_TEXT_DATA.schoolContext}</span>
        </div>
        <div>
          <span className="text-stone-500 block">
            {isEnglish ? 'Authors & Innovators:' : 'Penulis & Inovator:'}
          </span>
          <span className="font-semibold text-amber-300">{REPORT_TEXT_DATA.authors}</span>
        </div>
        <div>
          <span className="text-stone-500 block">
            {isEnglish ? 'Genre:' : 'Jenis Teks:'}
          </span>
          <span className="font-semibold text-stone-200">
            Factual Report Text (Applied Gastronomy & IoT)
          </span>
        </div>
      </div>

      {/* REPORT TEXT BODY */}
      <article className="bg-stone-900/40 border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-10 shadow-2xl">
        {/* Title */}
        <div className="text-center pb-6 border-b border-stone-800 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {REPORT_TEXT_DATA.title}
          </h2>
          <p className="text-xs text-stone-400 italic">
            {isEnglish
              ? 'An academic analysis of intelligent autonomous hospitality infrastructure'
              : 'Kajian ilmiah tentang infrastruktur perhotelan dan kafe otonom cerdas'}
          </p>
        </div>

        {/* 1. General Classification */}
        <section className="space-y-3 relative pl-4 border-l-2 border-amber-500">
          <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Generic Structure: General Classification
          </span>
          <p className="text-sm text-stone-200 leading-relaxed text-justify">
            {isEnglish
              ? REPORT_TEXT_DATA.generalClassification.en
              : REPORT_TEXT_DATA.generalClassification.id}
          </p>
        </section>

        {/* 2. Detailed Descriptions */}
        <section className="space-y-8 pt-4">
          <div className="flex items-center gap-2 text-stone-400 text-xs uppercase tracking-wider font-semibold">
            <BookOpen size={15} className="text-amber-400" />
            <span>Generic Structure: Descriptions (Components & Functional Dynamics)</span>
          </div>

          <div className="space-y-6">
            {REPORT_TEXT_DATA.descriptions.map((desc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2.5 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-amber-300 font-heading">
                    {isEnglish ? desc.headingEn : desc.headingId}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                    Paragraph #{idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed text-justify">
                  {isEnglish ? desc.textEn : desc.textId}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* VOCABULARY & GLOSSARY BANK */}
      <section className="space-y-4 pb-8">
        <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
          <Sparkles size={18} className="text-amber-400" />
          <span>
            {isEnglish
              ? 'Technical Vocabulary Glossary'
              : 'Glosarium Istilah Teknis (Technical Vocabulary Bank)'}
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REPORT_TEXT_DATA.vocabulary.map((item) => (
            <div
              key={item.word}
              className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-1 hover:border-amber-500/30 transition-colors"
            >
              <h5 className="text-xs font-bold text-amber-400 font-mono">{item.word}</h5>
              <p className="text-xs text-stone-300 leading-relaxed">{item.meaning}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
