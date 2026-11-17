import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { MenuItem, Order, OrderStatus } from '../types';
import {
  Laptop,
  Clock,
  CheckCircle2,
  Receipt,
  DollarSign,
  Coffee,
  Search,
  Plus,
  Trash2,
  Camera,
  Image as ImageIcon,
  Upload,
  X,
  RotateCcw,
  Sparkles,
  Edit3,
} from 'lucide-react';

export const CashierView: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    updateOrderPayment,
    setActiveReceiptOrder,
    createOrder,
    addToCart,
    t,
    language,
    menuItems,
    addCustomMenuItem,
    updateMenuItemImage,
    resetMenuToDefault,
  } = useCafe();

  const isEn = language === 'en';

  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);

  // Custom Cashier Profile / Banner Photo
  const [customCashierImage, setCustomCashierImage] = useState<string>(() => {
    try {
      return (
        localStorage.getItem('teki_custom_cashier_img') ||
        'https://images.unsplash.com/photo-1556742049-0a67d553c253?auto=format&fit=crop&w=1000&q=80'
      );
    } catch {
      return 'https://images.unsplash.com/photo-1556742049-0a67d553c253?auto=format&fit=crop&w=1000&q=80';
    }
  });

  // Modal for Customizing / Adding Photos
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState(false);
  const [selectedItemToEdit, setSelectedItemToEdit] = useState<MenuItem | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string>('');
  const [photoFeedback, setPhotoFeedback] = useState<string | null>(null);

  // New Menu Item State
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'coffee' | 'dessert' | 'savory' | 'non-coffee'>('coffee');
  const [newItemPrice, setNewItemPrice] = useState<number>(25000);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImage, setNewItemImage] = useState<string>('');

  // Manual Quick Order State for Cashier
  const [manualCustomer, setManualCustomer] = useState('Pelanggan Kasir');
  const [manualTable, setManualTable] = useState<number>(1);
  const [manualType, setManualType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [manualPayment, setManualPayment] = useState<'QRIS' | 'Cash' | 'Debit/Card'>('Cash');
  const [quickCart, setQuickCart] = useState<{ item: MenuItem; qty: number }[]>([]);

  // Analytics calculation
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled' && o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);

  const activeOrdersCount = orders.filter(
    (o) => o.status === 'pending' || o.status === 'brewing'
  ).length;

  const totalCupsSold = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce(
      (sum, o) =>
        sum +
        o.items
          .filter((ci) => ci.item.category === 'coffee' || ci.item.category === 'non-coffee')
          .reduce((cSum, ci) => cSum + ci.quantity, 0),
      0
    );

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = statusFilter === 'all' || o.status === statusFilter;
    const matchesQuery =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.tableNumber && o.tableNumber.toString().includes(searchQuery));
    return matchesFilter && matchesQuery;
  });

  const handleAddQuickItem = (item: MenuItem) => {
    setQuickCart((prev) => {
      const idx = prev.findIndex((p) => p.item.id === item.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx].qty += 1;
        return next;
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const handleRemoveQuickItem = (itemId: string) => {
    setQuickCart((prev) => prev.filter((p) => p.item.id !== itemId));
  };

  const handleProcessManualOrder = () => {
    if (quickCart.length === 0) return;

    quickCart.forEach((qc) => {
      addToCart(qc.item, {}, qc.qty);
    });

    setTimeout(() => {
      createOrder({
        customerName: manualCustomer.trim() || (isEn ? 'POS Guest' : 'Tamu Kasir'),
        orderType: manualType,
        tableNumber: manualType === 'dine-in' ? manualTable : undefined,
        paymentMethod: manualPayment,
        paymentStatus: 'paid',
      });
      setQuickCart([]);
      setIsQuickOrderOpen(false);
    }, 50);
  };

  // Cashier Avatar Upload from device file
  const handleCashierAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomCashierImage(result);
        try {
          localStorage.setItem('teki_custom_cashier_img', result);
        } catch {}
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload Photo for Menu Item from file
  const handleItemPhotoFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedPhotoUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // New Item Image Upload from file
  const handleNewItemImageFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setNewItemImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveItemPhoto = () => {
    if (!selectedItemToEdit || !uploadedPhotoUrl) return;
    updateMenuItemImage(selectedItemToEdit.id, uploadedPhotoUrl);
    setPhotoFeedback(
      isEn
        ? `Photo updated successfully for ${selectedItemToEdit.name}!`
        : `Foto untuk "${selectedItemToEdit.name}" berhasil disimpan!`
    );
    setTimeout(() => {
      setPhotoFeedback(null);
      setSelectedItemToEdit(null);
      setUploadedPhotoUrl('');
    }, 2000);
  };

  const handleCreateNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) {
      alert(isEn ? 'Please enter item name.' : 'Silakan masukkan nama menu.');
      return;
    }

    const fallbackImg =
      newItemCategory === 'coffee'
        ? 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
        : newItemCategory === 'dessert'
        ? 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80';

    const newItem: MenuItem = {
      id: `custom-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      price: newItemPrice || 25000,
      description: newItemDesc.trim() || (isEn ? 'Fresh artisanal specialty menu item.' : 'Menu spesial artisanal segar dari TEKI Smart Cafe.'),
      image: newItemImage.trim() || fallbackImg,
      tags: [isEn ? 'Cashier Added' : 'Menu Kasir', 'Baru'],
      prepTime: '3 min',
    };

    addCustomMenuItem(newItem);
    setPhotoFeedback(
      isEn
        ? `New menu item "${newItem.name}" added successfully!`
        : `Menu baru "${newItem.name}" berhasil ditambahkan ke kafe!`
    );

    // Reset form
    setNewItemName('');
    setNewItemPrice(25000);
    setNewItemDesc('');
    setNewItemImage('');
    setIsAddingNewItem(false);

    setTimeout(() => setPhotoFeedback(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Top Header & Custom Image Uploader for Cashier */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-1.5">
            <Laptop size={14} />
            <span>{t.cashier.badge}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            {t.cashier.title}
          </h1>
          <p className="text-xs text-stone-400">
            {t.cashier.subtitle}
          </p>
        </div>

        {/* Action Buttons: Manage Photos & Walk-in Order */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Custom Photo Management Button */}
          <button
            onClick={() => {
              setIsPhotoManagerOpen(true);
              setPhotoFeedback(null);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 text-xs font-bold transition-all shadow-md active:scale-95"
            title={isEn ? 'Customize or upload menu images' : 'Atur dan unggah foto menu'}
          >
            <Camera size={16} />
            <span>{isEn ? 'Manage / Add Photos' : 'Kelola / Ganti Foto Menu'}</span>
          </button>

          {/* Walk-in Order Button */}
          <button
            onClick={() => setIsQuickOrderOpen(!isQuickOrderOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <Plus size={16} />
            <span>{t.cashier.walkInBtn}</span>
          </button>
        </div>
      </div>

      {/* PHOTO MANAGER MODAL (Add / Edit Photos directly from Cashier mode) */}
      {isPhotoManagerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Camera size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    {isEn ? 'Cashier Menu & Photo Manager' : 'Pengaturan & Unggah Foto Menu Kasir'}
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    {isEn
                      ? 'Upload custom photos from your device or paste URLs to replace menu images.'
                      : 'Unggah foto langsung dari laptop/HP Anda atau masukkan link gambar untuk mengganti foto menu.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsPhotoManagerOpen(false);
                  setSelectedItemToEdit(null);
                  setUploadedPhotoUrl('');
                }}
                className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Notification alert */}
            {photoFeedback && (
              <div className="p-3 bg-emerald-950/60 border-b border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                <span>{photoFeedback}</span>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              {/* Top Selector: Edit existing or Add new */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsAddingNewItem(false);
                      setSelectedItemToEdit(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                      !isAddingNewItem
                        ? 'bg-amber-500 text-stone-950 shadow'
                        : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                    }`}
                  >
                    {isEn ? '1. Edit Existing Photos' : '1. Ganti Foto Menu Yang Ada'}
                  </button>

                  <button
                    onClick={() => {
                      setIsAddingNewItem(true);
                      setSelectedItemToEdit(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                      isAddingNewItem
                        ? 'bg-emerald-500 text-stone-950 shadow'
                        : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                    }`}
                  >
                    {isEn ? '2. + Add New Item With Photo' : '2. + Tambah Menu Baru Dengan Foto'}
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (confirm(isEn ? 'Reset all menu photos to default?' : 'Kembalikan seluruh foto menu ke bawaan?')) {
                      resetMenuToDefault();
                      setPhotoFeedback(isEn ? 'Reset to default successfully!' : 'Foto berhasil dikembalikan ke bawaan!');
                      setTimeout(() => setPhotoFeedback(null), 2500);
                    }
                  }}
                  className="flex items-center gap-1.5 text-stone-500 hover:text-amber-400 transition-colors text-[11px]"
                >
                  <RotateCcw size={13} />
                  <span>{isEn ? 'Reset to Defaults' : 'Reset ke Foto Bawaan'}</span>
                </button>
              </div>

              {/* CASHIER STORE BANNER PHOTO UPLOAD */}
              <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={customCashierImage}
                    alt="Cashier Banner"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/50 shadow"
                  />
                  <div>
                    <span className="font-bold text-white block">
                      {isEn ? 'Cashier / Store Profile Photo' : 'Foto Avatar / Header Terminal Kasir'}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      {isEn
                        ? 'Upload a photo representing your cafe counter or barista.'
                        : 'Unggah foto profil kasir atau suasana bar kafe Anda sendiri.'}
                    </span>
                  </div>
                </div>

                <label className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold transition-all shadow-md shrink-0">
                  <Upload size={14} />
                  <span>{isEn ? 'Upload Photo' : 'Pilih Foto dari Perangkat'}</span>
                  <input type="file" accept="image/*" onChange={handleCashierAvatarUpload} className="hidden" />
                </label>
              </div>

              {/* MODE 1: EDIT EXISTING MENU PHOTO */}
              {!isAddingNewItem && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                      {isEn ? 'Select a menu item to change its image:' : 'Pilih menu yang ingin diganti fotonya:'}
                    </h4>
                    <span className="text-stone-500 text-[11px]">
                      {menuItems.length} {isEn ? 'items available' : 'menu tersedia'}
                    </span>
                  </div>

                  {/* Grid of existing menu items */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-56 overflow-y-auto pr-1">
                    {menuItems.map((item) => {
                      const isSelected = selectedItemToEdit?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedItemToEdit(item);
                            setUploadedPhotoUrl(item.image);
                          }}
                          className={`p-2 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500 shadow-lg'
                              : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                          }`}
                        >
                          <div className="relative h-20 w-full rounded-xl overflow-hidden bg-stone-900">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            <span className="absolute bottom-1 right-1 p-1 rounded-md bg-black/60 text-white">
                              <Edit3 size={11} />
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-white block truncate text-[11px]">{item.name}</span>
                            <span className="text-[10px] text-amber-400 font-mono">
                              Rp {item.price.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Item Editor Panel */}
                  {selectedItemToEdit && (
                    <div className="p-5 rounded-2xl bg-stone-950 border border-amber-500/40 space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">
                            {isEn ? 'Editing Image for:' : 'Mengubah Foto Untuk:'}{' '}
                            <strong className="text-amber-400">{selectedItemToEdit.name}</strong>
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono">
                          ID: {selectedItemToEdit.id}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        {/* Preview */}
                        <div className="md:col-span-4 text-center space-y-1.5">
                          <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-stone-900 shadow-xl">
                            <img
                              src={uploadedPhotoUrl || selectedItemToEdit.image}
                              alt="New Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[10px] text-stone-400 block font-mono">
                            {isEn ? 'Live Image Preview' : 'Pratinjau Foto Baru'}
                          </span>
                        </div>

                        {/* Controls */}
                        <div className="md:col-span-8 space-y-3">
                          {/* File input button */}
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-300 mb-1.5">
                              {isEn ? 'Option 1: Upload from Device' : 'Opsi 1: Unggah Foto dari Komputer/HP'}
                            </label>
                            <label className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl border border-dashed border-stone-700 hover:border-amber-500 bg-stone-900/60 cursor-pointer text-stone-300 hover:text-white transition-colors">
                              <Upload size={14} className="text-amber-400" />
                              <span className="font-medium">
                                {isEn ? 'Choose File from Computer/Phone' : 'Pilih File Gambar dari Perangkat'}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleItemPhotoFilePick}
                                className="hidden"
                              />
                            </label>
                          </div>

                          {/* URL input */}
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-300 mb-1.5">
                              {isEn ? 'Option 2: Paste Direct Image URL' : 'Opsi 2: Atau Tempel URL Gambar Web'}
                            </label>
                            <input
                              type="url"
                              placeholder="https://images.unsplash.com/photo-..."
                              value={uploadedPhotoUrl}
                              onChange={(e) => setUploadedPhotoUrl(e.target.value)}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500 font-mono"
                            />
                          </div>

                          <button
                            onClick={handleSaveItemPhoto}
                            disabled={!uploadedPhotoUrl}
                            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                          >
                            <CheckCircle2 size={15} />
                            <span>{isEn ? 'Save & Update Photo' : 'Simpan & Terapkan Foto Baru'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2: ADD NEW MENU ITEM WITH OWN PHOTO */}
              {isAddingNewItem && (
                <form onSubmit={handleCreateNewItem} className="p-5 rounded-2xl bg-stone-950 border border-emerald-500/40 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                    <h4 className="text-sm font-bold text-white font-heading">
                      {isEn ? 'Create New Item with Custom Image' : 'Tambah Menu Baru dengan Foto Sendiri'}
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {isEn ? 'Auto syncs with Menu & Customer Portal' : 'Tersinkron otomatis ke Menu & Portal Pembeli'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                        {isEn ? 'Menu Name' : 'Nama Menu'}
                      </label>
                      <input
                        type="text"
                        placeholder={isEn ? 'e.g. Vanilla Hazelnut Cold Brew' : 'Contoh: Iced Hazelnut Oat Latte'}
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        required
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                        {isEn ? 'Category' : 'Kategori'}
                      </label>
                      <select
                        value={newItemCategory}
                        onChange={(e: any) => setNewItemCategory(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="coffee">{isEn ? 'Coffee' : 'Kopi Pilihan'}</option>
                        <option value="dessert">{isEn ? 'Dessert & Sweets' : 'Dessert & Manis'}</option>
                        <option value="savory">{isEn ? 'Savory & Warm Bites' : 'Makanan Hangat & Mac'}</option>
                        <option value="non-coffee">{isEn ? 'Non-Coffee & Tea' : 'Non-Kopi & Teh'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                        {isEn ? 'Price (IDR)' : 'Harga (Rupiah)'}
                      </label>
                      <input
                        type="number"
                        step={1000}
                        value={newItemPrice}
                        onChange={(e) => setNewItemPrice(Number(e.target.value))}
                        required
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-100 font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                        {isEn ? 'Description' : 'Deskripsi Sajian'}
                      </label>
                      <input
                        type="text"
                        placeholder={isEn ? 'Brief ingredients and flavor notes...' : 'Bahan baku dan cita rasa kopi...'}
                        value={newItemDesc}
                        onChange={(e) => setNewItemDesc(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Photo picker for new item */}
                  <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-3">
                    <span className="font-bold text-white block text-xs">
                      {isEn ? 'Upload or Pick Photo for New Item:' : 'Foto Untuk Menu Baru:'}
                    </span>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {newItemImage && (
                        <img
                          src={newItemImage}
                          alt="New Item Preview"
                          className="w-20 h-20 rounded-xl object-cover border border-emerald-500/50 shrink-0"
                        />
                      )}

                      <div className="flex-1 space-y-2 w-full">
                        <label className="flex items-center justify-center gap-2 p-2 rounded-xl border border-dashed border-stone-700 hover:border-emerald-500 bg-stone-950 cursor-pointer text-stone-300 text-xs">
                          <Upload size={14} className="text-emerald-400" />
                          <span>{isEn ? 'Upload Image File from Device' : 'Unggah File Foto dari Laptop/HP'}</span>
                          <input type="file" accept="image/*" onChange={handleNewItemImageFilePick} className="hidden" />
                        </label>

                        <input
                          type="url"
                          placeholder={isEn ? 'Or paste web image URL...' : 'Atau tempel URL gambar web...'}
                          value={newItemImage}
                          onChange={(e) => setNewItemImage(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 placeholder-stone-600 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    <span>{isEn ? 'Add Menu Item to Cafe' : 'Simpan & Tambahkan ke Menu Kafe'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => {
                  setIsPhotoManagerOpen(false);
                  setSelectedItemToEdit(null);
                  setUploadedPhotoUrl('');
                }}
                className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs transition-colors"
              >
                {isEn ? 'Close Window' : 'Selesai & Tutup'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REVENUE & STATS BAR */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>{t.cashier.revenueToday}</span>
            <DollarSign size={16} className="text-emerald-400" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </p>
          <span className="text-[10px] text-stone-500">
            {isEn ? 'From all settled orders' : 'Dari seluruh pesanan lunas'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>{t.cashier.activeOrders}</span>
            <Clock size={16} className="text-amber-400" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
            {activeOrdersCount} {isEn ? 'Orders' : 'Antrean'}
          </p>
          <span className="text-[10px] text-stone-500">
            {isEn ? 'In brewing or prep queue' : 'Perlu diracik barista'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>{t.cashier.cupsSold}</span>
            <Coffee size={16} className="text-amber-400" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-white font-mono">
            {totalCupsSold} {isEn ? 'Cups' : 'Cangkir'}
          </p>
          <span className="text-[10px] text-stone-500">
            {isEn ? 'Americano & Latte top' : 'Americano & Latte teratas'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>{t.cashier.gatewayStatus}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-white font-mono">ONLINE</p>
          <span className="text-[10px] text-emerald-400">
            {isEn ? '0.28s Sync to Tables' : 'Latensi 0.28s ke Meja'}
          </span>
        </div>
      </div>

      {/* QUICK ORDER DRAWER / MODAL (FOR WALK-IN GUESTS) */}
      {isQuickOrderOpen && (
        <div className="p-6 rounded-3xl bg-stone-900 border border-amber-500/40 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                {isEn ? 'Walk-In Order Register' : 'Mode Input Pesanan Langsung di Kasir'}
              </h3>
              <p className="text-xs text-stone-400">
                {isEn
                  ? 'Select items below to take walk-in orders at the register.'
                  : 'Pilih menu di bawah untuk mencatat tamu yang memesan manual di kasir.'}
              </p>
            </div>
            <button
              onClick={() => setIsQuickOrderOpen(false)}
              className="text-xs text-stone-400 hover:text-white"
            >
              {isEn ? 'Close ✕' : 'Tutup ✕'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Menu Selection using dynamic menuItems */}
            <div className="md:col-span-2 space-y-3">
              <span className="text-xs font-semibold text-stone-400 uppercase">
                {isEn ? 'Select Items:' : 'Pilih Menu Cepat:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAddQuickItem(item)}
                    className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/60 text-left transition-all text-xs flex items-center gap-2.5 group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-stone-200 block truncate">
                        {isEn && item.nameEn ? item.nameEn : item.name}
                      </span>
                      <span className="text-amber-400 font-mono text-[11px]">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Order Cart Summary */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {isEn ? 'Order Specifications' : 'Rincian Pesanan Kasir'}
              </h4>

              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  placeholder={isEn ? 'Customer Name...' : 'Nama Tamu...'}
                  value={manualCustomer}
                  onChange={(e) => setManualCustomer(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs text-stone-200"
                />

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={manualType}
                    onChange={(e: any) => setManualType(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs text-stone-200"
                  >
                    <option value="dine-in">{isEn ? 'Dine In' : 'Dine-In'}</option>
                    <option value="takeaway">{isEn ? 'Takeaway' : 'Takeaway'}</option>
                  </select>

                  {manualType === 'dine-in' && (
                    <select
                      value={manualTable}
                      onChange={(e) => setManualTable(Number(e.target.value))}
                      className="bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs text-stone-200"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((tNum) => (
                        <option key={tNum} value={tNum}>
                          {isEn ? `Table #${tNum}` : `Meja #${tNum}`}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <select
                  value={manualPayment}
                  onChange={(e: any) => setManualPayment(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs text-stone-200"
                >
                  <option value="Cash">{isEn ? 'Cash' : 'Tunai (Cash)'}</option>
                  <option value="QRIS">QRIS Contactless</option>
                  <option value="Debit/Card">{isEn ? 'Debit / Card' : 'Debit / Kartu'}</option>
                </select>
              </div>

              {/* Selected items list */}
              <div className="max-h-32 overflow-y-auto space-y-1.5 text-xs border-t border-stone-800 pt-2">
                {quickCart.length === 0 ? (
                  <p className="text-stone-500 text-[11px] text-center py-2">
                    {isEn ? 'No items selected.' : 'Belum ada menu dipilih.'}
                  </p>
                ) : (
                  quickCart.map((qc) => (
                    <div
                      key={qc.item.id}
                      className="flex items-center justify-between text-[11px] text-stone-300"
                    >
                      <span className="truncate pr-1">
                        {qc.qty}x {qc.item.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400">
                          Rp {(qc.item.price * qc.qty).toLocaleString('id-ID')}
                        </span>
                        <button
                          onClick={() => handleRemoveQuickItem(qc.item.id)}
                          className="text-stone-500 hover:text-rose-400"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={handleProcessManualOrder}
                disabled={quickCart.length === 0}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                  quickCart.length === 0
                    ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-md'
                }`}
              >
                {isEn ? 'Process Order' : 'Simpan & Proses Transaksi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FILTER & SEARCH CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-900 border border-stone-800 text-xs overflow-x-auto w-full sm:w-auto scrollbar-none">
          {(
            [
              { id: 'all', label: t.cashier.all },
              { id: 'pending', label: t.cashier.pending },
              { id: 'brewing', label: t.cashier.brewing },
              { id: 'ready', label: t.cashier.ready },
              { id: 'completed', label: t.cashier.completed },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder={isEn ? 'Search Order / Table / Name...' : 'Cari No. Order / Meja / Nama...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* ORDERS LIST / CARDS */}
      {filteredOrders.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-stone-900/40 border border-stone-800 space-y-2">
          <p className="text-stone-400 text-sm">
            {isEn ? 'No orders in this category.' : 'Tidak ada pesanan pada kategori ini.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((ord) => {
            const statusConfig = {
              pending: {
                label: isEn ? 'Pending Confirmation' : 'Menunggu Konfirmasi',
                badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
              },
              brewing: {
                label: isEn ? 'Brewing / Preparing' : 'Sedang Diracik',
                badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
              },
              ready: {
                label: isEn ? 'Ready to Serve' : 'Siap Disajikan',
                badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
              },
              completed: {
                label: isEn ? 'Completed' : 'Selesai',
                badgeBg: 'bg-stone-800 text-stone-400 border-stone-700',
              },
              cancelled: {
                label: isEn ? 'Cancelled' : 'Dibatalkan',
                badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
              },
            };

            const cfg = statusConfig[ord.status] || statusConfig.pending;

            return (
              <div
                key={ord.id}
                className="p-5 rounded-3xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between space-y-4 shadow-xl"
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-amber-400 font-mono tracking-wider">
                      {ord.orderNumber}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cfg.badgeBg}`}
                    >
                      {cfg.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-300">
                    <span className="font-semibold text-white">{ord.customerName}</span>
                    <span className="font-mono text-stone-400">
                      {ord.orderType === 'dine-in'
                        ? isEn
                          ? `Table #${ord.tableNumber}`
                          : `Meja #${ord.tableNumber}`
                        : 'Takeaway'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono">
                    <span>
                      {isEn ? 'Time:' : 'Waktu:'} {ord.createdAt} WIB
                    </span>
                    <span
                      className={`font-semibold uppercase ${
                        ord.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {ord.paymentStatus === 'paid' ? '✓ PAID' : 'UNPAID'} ({ord.paymentMethod})
                    </span>
                  </div>
                </div>

                {/* Items List with thumbnails */}
                <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-2 max-h-44 overflow-y-auto">
                  {ord.items.map((ci) => (
                    <div key={ci.cartItemId} className="flex items-center gap-2.5 text-xs">
                      <img
                        src={ci.item.image}
                        alt={ci.item.name}
                        className="w-9 h-9 rounded-lg object-cover shrink-0 border border-stone-800"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between font-medium text-stone-200">
                          <span className="truncate pr-1">
                            <strong className="text-amber-400 mr-1">{ci.quantity}x</strong>
                            {ci.item.name}
                          </span>
                          <span className="font-mono text-[11px] text-stone-400">
                            Rp {ci.itemTotalPrice.toLocaleString('id-ID')}
                          </span>
                        </div>
                        {ci.options && (
                          <p className="text-[10px] text-stone-500 truncate">
                            {[
                              ci.options.sugarLevel && `Sugar: ${ci.options.sugarLevel}`,
                              ci.options.iceLevel && `Ice: ${ci.options.iceLevel}`,
                              ci.options.milkType && `${ci.options.milkType}`,
                              ci.options.extraShot && '+Shot',
                              ci.options.notes && `"${ci.options.notes}"`,
                            ]
                              .filter(Boolean)
                              .join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Total */}
                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-medium">
                    {isEn ? 'Total Bill:' : 'Total Tagihan:'}
                  </span>
                  <span className="text-base font-extrabold text-amber-400 font-mono">
                    Rp {ord.total.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Quick Action Buttons */}
                <div className="space-y-2 pt-1">
                  <div className="grid grid-cols-2 gap-2">
                    {ord.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'brewing')}
                        className="col-span-2 py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-stone-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Coffee size={14} />
                        <span>{t.cashier.startBrewingBtn}</span>
                      </button>
                    )}

                    {ord.status === 'brewing' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'ready')}
                        className="col-span-2 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 size={14} />
                        <span>{t.cashier.markReadyBtn}</span>
                      </button>
                    )}

                    {ord.status === 'ready' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'completed')}
                        className="col-span-2 py-2 px-3 rounded-xl bg-stone-700 hover:bg-stone-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 size={14} />
                        <span>{t.cashier.markDoneBtn}</span>
                      </button>
                    )}
                  </div>

                  {/* Payment toggle if unpaid */}
                  {ord.paymentStatus === 'unpaid' && (
                    <button
                      onClick={() => updateOrderPayment(ord.id, ord.paymentMethod, 'paid')}
                      className="w-full py-1.5 px-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-[11px] hover:bg-emerald-900 transition-colors"
                    >
                      {t.cashier.markPaidBtn}
                    </button>
                  )}

                  {/* Print Thermal Receipt Button */}
                  <button
                    onClick={() => setActiveReceiptOrder(ord)}
                    className="w-full py-1.5 px-3 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500 text-stone-300 hover:text-white text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Receipt size={13} className="text-amber-400" />
                    <span>{t.cashier.printReceiptBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
