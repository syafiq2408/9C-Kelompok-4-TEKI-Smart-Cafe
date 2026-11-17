import React from 'react';
import { useCafe } from '../context/CafeContext';
import { Order } from '../types';
import { X, Printer, CheckCircle2, QrCode } from 'lucide-react';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  const { language } = useCafe();
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const isEn = language === 'en';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Action Bar */}
        <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span className="text-xs font-semibold text-stone-200">
              {isEn ? 'Official Cashier Receipt' : 'Struk Transaksi Kasir'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold transition-colors"
            >
              <Printer size={14} />
              <span>{isEn ? 'Print' : 'Cetak'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Realistic Thermal Receipt Body */}
        <div className="p-6 overflow-y-auto bg-amber-50 text-stone-900 font-mono text-xs select-all">
          {/* Header */}
          <div className="text-center pb-4 border-b border-dashed border-stone-400">
            <h2 className="text-xl font-extrabold tracking-wider font-sans text-stone-950">
              TEKI SMART CAFE
            </h2>
            <p className="text-[11px] text-stone-600 mt-0.5">The Autonomous Coffee & Dining</p>
            <p className="text-[10px] text-stone-500 mt-1">
              Jl. Citra Lestari No. 12, Smart Tech Innovation Hub
            </p>
            <p className="text-[10px] text-stone-500">Telp/WA: +62 812-TEKI-SMART</p>
          </div>

          {/* Metadata */}
          <div className="py-3 border-b border-dashed border-stone-400 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-stone-600">No. Order:</span>
              <span className="font-bold text-stone-900">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Waktu:</span>
              <span>{order.createdAt} WIB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Pelanggan:</span>
              <span className="font-semibold">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Tipe Pesanan:</span>
              <span className="uppercase font-semibold">
                {order.orderType === 'dine-in' ? `Dine In (Meja #${order.tableNumber})` : 'Takeaway'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Kasir/Sistem:</span>
              <span>AI Smart POS v2.6</span>
            </div>
          </div>

          {/* Items */}
          <div className="py-3 border-b border-dashed border-stone-400 space-y-2.5">
            {order.items.map((ci) => (
              <div key={ci.cartItemId} className="space-y-0.5">
                <div className="flex justify-between font-semibold text-stone-900">
                  <span className="truncate pr-2">{ci.item.name}</span>
                  <span className="whitespace-nowrap">
                    Rp {ci.itemTotalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-stone-600">
                  <span>
                    {ci.quantity} x Rp {(ci.itemTotalPrice / ci.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
                {ci.options && (
                  <div className="text-[9.5px] text-stone-500 pl-2 italic">
                    {[
                      ci.options.sugarLevel && `Sugar: ${ci.options.sugarLevel}`,
                      ci.options.iceLevel && `Ice: ${ci.options.iceLevel}`,
                      ci.options.milkType && `${ci.options.milkType}`,
                      ci.options.extraShot && '+Extra Shot',
                      ci.options.notes && `"${ci.options.notes}"`,
                    ]
                      .filter(Boolean)
                      .join(' • ')}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="py-3 border-b border-dashed border-stone-400 space-y-1.5 text-[11px]">
            <div className="flex justify-between text-stone-700">
              <span>Subtotal</span>
              <span>Rp {order.subtotal.toLocaleString('id-ID')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Diskon Promo {order.appliedPromo ? `(${order.appliedPromo})` : ''}</span>
                <span>-Rp {order.discount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-700">
              <span>PB1 Resto (10%)</span>
              <span>Rp {order.tax.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-stone-950 pt-1 border-t border-stone-300">
              <span>TOTAL BAYAR</span>
              <span>Rp {order.total.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-stone-700 pt-1">
              <span>Metode Pembayaran</span>
              <span className="font-semibold uppercase">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-stone-700">
              <span>Status Pembayaran</span>
              <span
                className={`font-bold ${
                  order.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {order.paymentStatus === 'paid' ? 'LUNAS (PAID)' : 'MENUNGGU PEMBAYARAN'}
              </span>
            </div>
          </div>

          {/* QR Code & Creators Signature */}
          <div className="pt-4 text-center space-y-2">
            <div className="w-24 h-24 mx-auto p-1.5 bg-white border border-stone-300 rounded-lg flex items-center justify-center">
              <QrCode size={78} className="text-stone-900" />
            </div>
            <p className="text-[9.5px] text-stone-600">Scan untuk bukti struk digital & loyalty points</p>
            <div className="pt-2 text-[9px] text-stone-500 border-t border-dotted border-stone-400">
              <p className="font-semibold text-stone-800">Dibuat dengan bangga oleh Tim Inovasi:</p>
              <p>Beryl Arkananta Zaidan • Farsya Azka</p>
              <p>Wistara Naufal Rabbani • Nadira Inaya Putri</p>
              <p className="mt-1 text-stone-400">Terima kasih atas kunjungan Anda ke TEKI!</p>
            </div>
          </div>
        </div>

        {/* Footer Close */}
        <div className="p-3 bg-stone-950 border-t border-stone-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
