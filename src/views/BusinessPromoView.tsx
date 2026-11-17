import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { PROMOTIONS } from '../data/cafeData';
import { PromoItem } from '../types';
import {
  Percent,
  Copy,
  Check,
  Tag,
  Briefcase,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Gift,
} from 'lucide-react';

export const BusinessPromoView: React.FC = () => {
  const { applyPromoCode, setCurrentPage } = useCafe();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

  const handleCopyAndApply = (promo: PromoItem) => {
    navigator.clipboard?.writeText(promo.code);
    setCopiedCode(promo.code);
    const res = applyPromoCode(promo.code);
    setPromoFeedback(res.message);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Percent size={14} className="text-amber-400" />
          <span>Promo & Strategi Bisnis Cerdas</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
          Penawaran Eksklusif & Model Bisnis Berkelanjutan
        </h1>
        <p className="text-base text-stone-300 leading-relaxed">
          Manfaatkan kupon potongan harga spesial pelajar dan umum, serta pelajari skema waralaba
          kafe cerdas dengan efisiensi operasional hingga 40%.
        </p>
      </div>

      {/* PROMO FEEDBACK ALERT */}
      {promoFeedback && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold text-center animate-fadeIn flex items-center justify-center gap-2">
          <Sparkles size={16} />
          <span>{promoFeedback}</span>
        </div>
      )}

      {/* ACTIVE PROMOTION CARDS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white font-heading">Voucher & Promo Aktif</h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Klik "Pasang Voucher" untuk menerapkan diskon langsung pada keranjang Anda.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROMOTIONS.map((promo) => (
            <div
              key={promo.id}
              className="bg-stone-900/80 border border-stone-800 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-xl"
            >
              <div className="relative h-44 overflow-hidden bg-stone-950">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-500/20">
                  {promo.discountType === 'percentage'
                    ? `HEMAT ${promo.discountValue}%`
                    : `POTONGAN RP ${promo.discountValue.toLocaleString('id-ID')}`}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">{promo.title}</h3>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                    {promo.description}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-2 font-mono">
                    Berlaku: {promo.validUntil}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-950 border border-dashed border-amber-500/50">
                    <Tag size={13} className="text-amber-400" />
                    <span className="font-mono font-bold text-amber-300 text-xs tracking-wider">
                      {promo.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyAndApply(promo)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all shadow-md active:scale-95"
                  >
                    {copiedCode === promo.code ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedCode === promo.code ? 'Terpasang!' : 'Pasang Voucher'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LOYALTY PROGRAM SMART CLUB */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/20 border border-stone-800 space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Gift size={16} />
            <span>TEKI Smart Membership</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Tingkatan Keanggotaan & Keuntungan IoT
          </h3>
          <p className="text-xs text-stone-400">
            Setiap transaksi tercatat otomatis di cloud ID pembeli untuk poin cashback dan prioritas
            pesanan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-3">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-800 text-stone-300">
              TIER 1
            </span>
            <h4 className="text-lg font-bold text-white font-heading">Silver Member</h4>
            <p className="text-xs text-stone-400">Untuk pendaftaran baru melalui portal pembeli.</p>
            <ul className="text-xs text-stone-300 space-y-1.5 pt-2 border-t border-stone-800">
              <li>• Diskon 5% setiap hari Senin</li>
              <li>• Akses Wi-Fi Gigabit Kafe</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-stone-950/70 border border-amber-500/40 space-y-3 shadow-lg shadow-amber-500/10">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500 text-stone-950">
              POPULER
            </span>
            <h4 className="text-lg font-bold text-amber-400 font-heading">Gold Innovator</h4>
            <p className="text-xs text-stone-400">Setelah 5x transaksi kopi atau makanan.</p>
            <ul className="text-xs text-stone-300 space-y-1.5 pt-2 border-t border-stone-800">
              <li>• Gratis upgrade Susu Oat / Almond</li>
              <li>• Diskon 15% bundling Brownies & Kopi</li>
              <li>• Reservasi smart study pod 1 jam sebelum tiba</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-3">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-800 text-stone-300">
              TIER VIP
            </span>
            <h4 className="text-lg font-bold text-white font-heading">Platinum Visionary</h4>
            <p className="text-xs text-stone-400">Pengunjung setia & pendukung riset.</p>
            <ul className="text-xs text-stone-300 space-y-1.5 pt-2 border-t border-stone-800">
              <li>• Antrean Prioritas AI Barista #1</li>
              <li>• Undangan cupping kopi single-origin baru</li>
              <li>• Merchandise spesial TEKI Creators</li>
            </ul>
          </div>
        </div>
      </div>

      {/* BUSINESS & FRANCHISE PROPOSITION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-stone-900/50 border border-stone-800 rounded-3xl p-8 sm:p-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Briefcase size={16} />
            <span>Peluang Kemitraan & Waralaba</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Model Waralaba Kafe Otonom Terstandarisasi
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Sistem TEKI dirancang modular dan siap diimplementasikan pada kampus, sekolah, gedung
            perkantoran, atau area publik. Pengelola cabang mendapatkan paket terpadu: modul IoT
            meja cerdas, perangkat lunak Kasir POS multi-cabang, serta resep terkalibrasi AI.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <TrendingUp size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white">Efisiensi Tenaga Kerja & Bahan</h5>
                <p className="text-xs text-stone-400">
                  Otomasi alur pesanan mengurangi beban kerja barista dan menekan kesalahan input
                  hingga 99%.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white">Standar Rasa Konsisten Multi-Cabang</h5>
                <p className="text-xs text-stone-400">
                  Profil ekstraksi tersimpan di cloud, menjamin cita rasa latte dan brownies selalu
                  sama di mana pun.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form for partnership */}
        <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
          <h4 className="text-base font-bold text-white font-heading">
            Konsultasi Kemitraan & Lisensi
          </h4>
          <p className="text-xs text-stone-400">
            Tertarik membuka cabang TEKI Smart Cafe di lokasi Anda? Hubungi tim inovator kami.
          </p>
          <div className="space-y-3 text-xs">
            <input
              type="text"
              placeholder="Nama Lengkap / Instansi"
              className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-stone-200 focus:outline-none focus:border-amber-500"
            />
            <input
              type="email"
              placeholder="Alamat Email / Nomor WhatsApp"
              className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-stone-200 focus:outline-none focus:border-amber-500"
            />
            <textarea
              placeholder="Rencana Lokasi & Bentuk Kemitraan..."
              rows={3}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-stone-200 focus:outline-none focus:border-amber-500"
            ></textarea>
            <button
              onClick={() =>
                alert('Terima kasih atas minat kemitraan Anda! Tim TEKI akan segera menghubungi.')
              }
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-colors"
            >
              Kirim Permintaan Informasi Bisnis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
