import React, { useState } from 'react';
import { MenuItem, CartItemOption } from '../types';
import { X, Plus, Minus, Coffee, Sparkles } from 'lucide-react';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, options: CartItemOption, quantity: number) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const isCoffee = item.category === 'coffee';
  const [quantity, setQuantity] = useState<number>(1);
  const [sugarLevel, setSugarLevel] = useState<'0%' | '25%' | '50%' | '100%'>('50%');
  const [iceLevel, setIceLevel] = useState<'No Ice' | 'Less Ice' | 'Normal Ice'>('Normal Ice');
  const [milkType, setMilkType] = useState<
    'Fresh Milk' | 'Oat Milk (+Rp 6.000)' | 'Almond Milk (+Rp 7.000)'
  >('Fresh Milk');
  const [extraShot, setExtraShot] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  let extraPrice = 0;
  if (isCoffee) {
    if (milkType.includes('Oat')) extraPrice += 6000;
    if (milkType.includes('Almond')) extraPrice += 7000;
    if (extraShot) extraPrice += 5000;
  }

  const unitPrice = item.price + extraPrice;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    const options: CartItemOption = {
      notes: notes.trim() || undefined,
    };
    if (isCoffee) {
      options.sugarLevel = sugarLevel;
      options.iceLevel = iceLevel;
      options.milkType = milkType;
      options.extraShot = extraShot;
    }
    onAddToCart(item, options, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header Image & Close */}
        <div className="relative h-48 w-full bg-stone-950 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/40" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-stone-300 hover:text-white hover:bg-black/80 transition-colors"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                {item.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-1.5 font-heading drop-shadow-md">
                {item.name}
              </h3>
            </div>
            <p className="text-lg font-bold text-amber-400">
              Rp {unitPrice.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          <p className="text-stone-300 leading-relaxed">{item.description}</p>

          {isCoffee && (
            <div className="space-y-4 pt-2 border-t border-stone-800/80">
              {/* Sugar Level */}
              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Tingkat Kemanisan (Sugar Level)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['0%', '25%', '50%', '100%'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSugarLevel(lvl)}
                      className={`py-2 px-3 rounded-xl font-medium text-xs transition-all ${
                        sugarLevel === lvl
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20'
                          : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      {lvl === '0%' ? 'No Sugar' : lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ice Level */}
              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Kadar Es (Ice Level)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['No Ice', 'Less Ice', 'Normal Ice'] as const).map((ice) => (
                    <button
                      key={ice}
                      type="button"
                      onClick={() => setIceLevel(ice)}
                      className={`py-2 px-3 rounded-xl font-medium text-xs transition-all ${
                        iceLevel === ice
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20'
                          : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      {ice}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Options */}
              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Pilihan Susu (Dairy / Plant-based)
                </label>
                <div className="space-y-2">
                  {(
                    [
                      'Fresh Milk',
                      'Oat Milk (+Rp 6.000)',
                      'Almond Milk (+Rp 7.000)',
                    ] as const
                  ).map((m) => (
                    <label
                      key={m}
                      onClick={() => setMilkType(m)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        milkType === m
                          ? 'border-amber-500/60 bg-amber-500/10 text-white'
                          : 'border-stone-800 bg-stone-800/40 text-stone-300 hover:bg-stone-800/70'
                      }`}
                    >
                      <span className="font-medium">{m}</span>
                      <input
                        type="radio"
                        name="milk"
                        checked={milkType === m}
                        onChange={() => setMilkType(m)}
                        className="text-amber-500 focus:ring-0"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Extra Espresso Shot */}
              <div className="pt-2">
                <label
                  onClick={() => setExtraShot(!extraShot)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    extraShot
                      ? 'border-amber-500/60 bg-amber-500/10 text-white'
                      : 'border-stone-800 bg-stone-800/40 text-stone-300 hover:bg-stone-800/70'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Coffee size={16} className="text-amber-400" />
                    <span className="font-medium">Extra Espresso Shot (+Rp 5.000)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={extraShot}
                    onChange={() => setExtraShot(!extraShot)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
              Catatan Khusus (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Tolong panaskan brownies, saus pisah, dll."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 text-xs"
            />
          </div>
        </div>

        {/* Footer with Quantity & Add Button */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-2xl p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="w-9 text-center font-bold text-white text-base">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99]"
          >
            <Sparkles size={16} />
            <span>Tambah ke Pesanan • Rp {totalPrice.toLocaleString('id-ID')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
