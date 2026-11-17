import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  QrCode,
  Banknote,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Coffee,
  Receipt,
  FileCheck,
  Tag,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CustomerPortalView: React.FC = () => {
  const {
    cart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartTotal,
    appliedPromo,
    applyPromoCode,
    removePromo,
    createOrder,
    orders,
    selectedTable,
    setSelectedTable,
    customerName,
    setCustomerName,
    setCurrentPage,
    setActiveReceiptOrder,
    t,
    language,
  } = useCafe();

  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Cash'>('QRIS');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastCreatedOrderNum, setLastCreatedOrderNum] = useState<string>('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = applyPromoCode(promoInput);
    if (result.success) {
      setPromoMsg({ type: 'success', text: result.message });
      setPromoInput('');
    } else {
      setPromoMsg({ type: 'error', text: result.message });
    }
    setTimeout(() => setPromoMsg(null), 4000);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (orderType === 'dine-in' && !selectedTable) {
      alert(language === 'id' ? 'Silakan pilih nomor meja Anda terlebih dahulu.' : 'Please select your table number first.');
      return;
    }

    const order = createOrder({
      customerName: customerName.trim() || (language === 'id' ? 'Tamu TEKI' : 'TEKI Guest'),
      orderType,
      tableNumber: orderType === 'dine-in' ? selectedTable ?? undefined : undefined,
      paymentMethod,
      paymentStatus: paymentMethod === 'QRIS' ? 'paid' : 'unpaid',
    });

    setLastCreatedOrderNum(order.orderNumber);
    setShowSuccessModal(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }
  };

  // Filter recent orders made by customer
  const customerRecentOrders = orders.filter(
    (o) => o.customerName.toLowerCase() === (customerName || '').toLowerCase() || o.tableNumber === selectedTable
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <ShoppingBag size={14} className="text-amber-400" />
            <span>{t.customer.badge}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            {t.customer.title}
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            {t.customer.subtitle}
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('menu')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500 text-xs text-stone-200 font-semibold transition-all self-start sm:self-auto"
        >
          <Plus size={15} className="text-amber-400" />
          <span>{t.customer.addMore}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Customer Info, Table Select, Cart Items */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order Details: Dine In / Takeaway & Table Selection */}
          <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-5">
            <h3 className="text-base font-bold text-white font-heading">
              1. Identitas & Tempat Duduk
            </h3>

            {/* Type selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('dine-in')}
                className={`py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  orderType === 'dine-in'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'bg-stone-950 text-stone-400 border border-stone-800'
                }`}
              >
                <span>Makan di Tempat (Dine In)</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  orderType === 'takeaway'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'bg-stone-950 text-stone-400 border border-stone-800'
                }`}
              >
                <span>Bawa Pulang (Takeaway)</span>
              </button>
            </div>

            {/* Customer Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                Nama Pemesan
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Masukkan nama Anda..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Table Selection Grid (if Dine-in) */}
            {orderType === 'dine-in' && (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Pilih Nomor Meja Anda (1 - 12):
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((tbl) => (
                    <button
                      key={tbl}
                      type="button"
                      onClick={() => setSelectedTable(tbl)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedTable === tbl
                          ? 'bg-amber-500 text-stone-950 font-extrabold shadow-md'
                          : 'bg-stone-950 text-stone-400 border border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      #{tbl}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-base font-bold text-white font-heading">
                2. Keranjang Menu ({cart.length} Jenis)
              </h3>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
                >
                  <Trash2 size={13} />
                  <span>Kosongkan</span>
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <Coffee size={36} className="text-stone-600 mx-auto" />
                <p className="text-stone-400 text-xs">Keranjang Anda masih kosong.</p>
                <button
                  onClick={() => setCurrentPage('menu')}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs inline-flex items-center gap-1.5"
                >
                  <span>Lihat Pilihan Menu</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ) : (
              <div className="space-y-3 divide-y divide-stone-800/60">
                {cart.map((ci) => (
                  <div key={ci.cartItemId} className="pt-3 first:pt-0 flex items-start gap-4">
                    <img
                      src={ci.item.image}
                      alt={ci.item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {ci.item.name}
                      </h4>
                      <p className="text-xs text-amber-400 font-semibold font-mono">
                        Rp {ci.itemTotalPrice.toLocaleString('id-ID')}
                      </p>

                      {/* Options info */}
                      {ci.options && (
                        <div className="text-[10px] text-stone-400 space-x-1.5 mt-0.5">
                          {ci.options.sugarLevel && <span>Gula: {ci.options.sugarLevel}</span>}
                          {ci.options.iceLevel && <span>• Es: {ci.options.iceLevel}</span>}
                          {ci.options.milkType && <span>• {ci.options.milkType}</span>}
                          {ci.options.extraShot && <span>• Extra Shot</span>}
                          {ci.options.notes && (
                            <span className="block text-stone-500 italic">
                              "{ci.options.notes}"
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-stone-950 border border-stone-800 rounded-xl p-1">
                      <button
                        onClick={() => updateCartItemQuantity(ci.cartItemId, -1)}
                        className="p-1 text-stone-400 hover:text-white"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-white">
                        {ci.quantity}
                      </span>
                      <button
                        onClick={() => updateCartItemQuantity(ci.cartItemId, 1)}
                        className="p-1 text-stone-400 hover:text-white"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(ci.cartItemId)}
                      className="p-1.5 text-stone-500 hover:text-rose-400 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Payment, Voucher, Summary & Status */}
        <div className="lg:col-span-5 space-y-6">
          {/* Voucher Code Box */}
          <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <Tag size={16} className="text-amber-400" />
              <span>Voucher Diskon</span>
            </h3>

            {appliedPromo ? (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-amber-300 font-mono">{appliedPromo.code}</span>
                  <p className="text-[11px] text-stone-300">{appliedPromo.title}</p>
                </div>
                <button
                  onClick={removePromo}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
                >
                  Hapus
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kode voucher (cth: TEKIPINTAR)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 font-mono uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors"
                >
                  Pasang
                </button>
              </form>
            )}

            {promoMsg && (
              <p
                className={`text-xs ${
                  promoMsg.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {promoMsg.text}
              </p>
            )}

            <div className="text-[10px] text-stone-500 flex items-center gap-1">
              <span>Tips: Gunakan kode</span>
              <span className="text-amber-400 font-mono font-bold">TEKIPINTAR</span>
              <span>atau</span>
              <span className="text-amber-400 font-mono font-bold">BERYLFARSYA</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4">
            <h3 className="text-base font-bold text-white font-heading">Metode Pembayaran</h3>

            <div className="grid grid-cols-2 gap-3">
              <label
                onClick={() => setPaymentMethod('QRIS')}
                className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${
                  paymentMethod === 'QRIS'
                    ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-lg'
                    : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <QrCode size={18} className="text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">
                    INSTAN
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold block text-white">QRIS Contactless</span>
                  <span className="text-[10px] text-stone-400">BCA, GoPay, Dana, OVO</span>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('Cash')}
                className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${
                  paymentMethod === 'Cash'
                    ? 'border-amber-500 bg-amber-500/10 text-white shadow-lg'
                    : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Banknote size={18} className="text-amber-400" />
                  <span className="text-[10px] font-bold text-stone-400 bg-stone-900 px-1.5 py-0.5 rounded">
                    KASIR
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold block text-white">Tunai di Kasir</span>
                  <span className="text-[10px] text-stone-400">Bayar langsung saat siap</span>
                </div>
              </label>
            </div>
          </div>

          {/* Price Summary & Submit Button */}
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4">
            <h3 className="text-base font-bold text-white font-heading">Ringkasan Pembayaran</h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Subtotal Menu</span>
                <span>Rp {cartSubtotal.toLocaleString('id-ID')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Diskon Voucher</span>
                  <span>-Rp {cartDiscount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-400">
                <span>PB1 Pajak Resto (10%)</span>
                <span>Rp {cartTax.toLocaleString('id-ID')}</span>
              </div>
              <div className="pt-2 border-t border-stone-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">TOTAL AKHIR</span>
                <span className="text-xl font-extrabold text-amber-400 font-mono">
                  Rp {cartTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${
                cart.length === 0
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/25 active:scale-[0.99]'
              }`}
            >
              <Sparkles size={16} />
              <span>
                Kirim Pesanan Sekarang • Rp {cartTotal.toLocaleString('id-ID')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS TRACKER SECTION */}
      {customerRecentOrders.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                Status Antrean Pesanan Anda
              </h3>
              <p className="text-xs text-stone-400">
                Monitor proses pembuatan pesanan Anda secara real-time.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {customerRecentOrders.slice(0, 3).map((ord) => {
              const statusConfig = {
                pending: {
                  label: 'Menunggu Konfirmasi Kasir',
                  color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
                  step: 1,
                },
                brewing: {
                  label: 'Sedang Diracik AI Barista',
                  color: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
                  step: 2,
                },
                ready: {
                  label: 'Siap Diambil / Diantar ke Meja!',
                  color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
                  step: 3,
                },
                completed: {
                  label: 'Selesai & Dinikmati',
                  color: 'text-stone-400 bg-stone-800 border-stone-700',
                  step: 4,
                },
                cancelled: {
                  label: 'Dibatalkan',
                  color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
                  step: 0,
                },
              };

              const currentConfig = statusConfig[ord.status] || statusConfig.pending;

              return (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-extrabold text-amber-400 font-mono">
                        {ord.orderNumber}
                      </span>
                      <span className="text-xs text-stone-300">
                        {ord.orderType === 'dine-in' ? `Meja #${ord.tableNumber}` : 'Takeaway'}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {ord.createdAt} WIB
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${currentConfig.color}`}
                      >
                        {currentConfig.label}
                      </span>
                      <button
                        onClick={() => setActiveReceiptOrder(ord)}
                        className="px-3 py-1 rounded-xl bg-stone-900 border border-stone-800 hover:bg-stone-800 text-[11px] text-stone-300 flex items-center gap-1"
                      >
                        <Receipt size={13} />
                        <span>Struk</span>
                      </button>
                    </div>
                  </div>

                  {/* Stepper progress */}
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {['Diterima', 'Meracik', 'Siap', 'Selesai'].map((stepName, sIdx) => {
                      const isPast = currentConfig.step >= sIdx + 1;
                      return (
                        <div key={stepName} className="space-y-1 text-center">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              isPast ? 'bg-amber-400' : 'bg-stone-800'
                            }`}
                          />
                          <span
                            className={`text-[10px] block ${
                              isPast ? 'text-stone-200 font-semibold' : 'text-stone-600'
                            }`}
                          >
                            {stepName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUCCESS MODAL AFTER ORDER */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Pesanan Berhasil Dikirim ke Kasir
              </span>
              <h3 className="text-2xl font-bold text-white font-heading">
                Nomor Antrean: {lastCreatedOrderNum}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Terima kasih, <strong>{customerName}</strong>! Pesanan Anda telah diterima oleh
                sistem TEKI Smart POS dan sedang disiapkan dengan cermat.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-left space-y-1.5 text-stone-400">
              <div className="flex justify-between">
                <span>Tempat:</span>
                <span className="text-stone-200 font-medium">
                  {orderType === 'dine-in' ? `Meja #${selectedTable}` : 'Bawa Pulang'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pembayaran:</span>
                <span className="text-stone-200 font-medium">{paymentMethod}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  const lastOrd = orders[0];
                  if (lastOrd) setActiveReceiptOrder(lastOrd);
                }}
                className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors"
              >
                Lihat Struk
              </button>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors"
              >
                Tutup & Pantau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
