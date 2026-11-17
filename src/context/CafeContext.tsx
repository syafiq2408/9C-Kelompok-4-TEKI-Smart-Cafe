import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageId, CartItem, CartItemOption, MenuItem, Order, OrderStatus, PromoItem, Language } from '../types';
import { PROMOTIONS } from '../data/cafeData';
import { MENU_ITEMS } from '../data/menuData';
import { TRANSLATIONS } from '../data/translations';

interface CafeContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof TRANSLATIONS)['id'];
  cart: CartItem[];
  addToCart: (item: MenuItem, options?: CartItemOption, quantity?: number) => void;
  updateCartItemQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartTotal: number;
  cartItemCount: number;
  appliedPromo: PromoItem | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  orders: Order[];
  createOrder: (orderPayload: {
    customerName: string;
    orderType: 'dine-in' | 'takeaway';
    tableNumber?: number;
    paymentMethod: 'QRIS' | 'Cash' | 'Debit/Card';
    paymentStatus: 'paid' | 'unpaid';
  }) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  updateOrderPayment: (orderId: string, method: 'QRIS' | 'Cash' | 'Debit/Card', status: 'paid') => void;
  selectedTable: number | null;
  setSelectedTable: (table: number | null) => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  newOrdersBadge: number;
  clearOrdersBadge: () => void;
  activeReceiptOrder: Order | null;
  setActiveReceiptOrder: (order: Order | null) => void;
  lightingTheme: 'amber' | 'cyber' | 'daylight';
  setLightingTheme: (theme: 'amber' | 'cyber' | 'daylight') => void;
  menuItems: MenuItem[];
  addCustomMenuItem: (item: MenuItem) => void;
  updateMenuItemImage: (itemId: string, newImageUrl: string) => void;
  resetMenuToDefault: () => void;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

// Initial demo orders for Cashier POS
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'TK-101',
    customerName: 'Rayhan S.',
    orderType: 'dine-in',
    tableNumber: 3,
    items: [
      {
        cartItemId: 'init-1',
        item: MENU_ITEMS[1], // Velvet Cafe Latte
        quantity: 1,
        options: { sugarLevel: '50%', iceLevel: 'Less Ice', milkType: 'Fresh Milk' },
        itemTotalPrice: 28000,
      },
      {
        cartItemId: 'init-2',
        item: MENU_ITEMS[8], // Fudgy Brownies
        quantity: 1,
        options: {},
        itemTotalPrice: 26000,
      },
    ],
    subtotal: 54000,
    tax: 5400,
    discount: 0,
    total: 59400,
    status: 'brewing',
    paymentMethod: 'QRIS',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 8 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    estimatedMinutes: 3,
  },
  {
    id: 'ord-102',
    orderNumber: 'TK-102',
    customerName: 'Alya Putri',
    orderType: 'dine-in',
    tableNumber: 7,
    items: [
      {
        cartItemId: 'init-3',
        item: MENU_ITEMS[13], // Truffle Mac and Cheese
        quantity: 1,
        options: { notes: 'Extra crispy cheese topping please' },
        itemTotalPrice: 38000,
      },
      {
        cartItemId: 'init-4',
        item: MENU_ITEMS[0], // Artisan Americano
        quantity: 1,
        options: { sugarLevel: '0%', iceLevel: 'Normal Ice' },
        itemTotalPrice: 24000,
      },
    ],
    subtotal: 62000,
    tax: 6200,
    discount: 10000,
    total: 58200,
    status: 'ready',
    paymentMethod: 'Cash',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    estimatedMinutes: 0,
  },
  {
    id: 'ord-103',
    orderNumber: 'TK-103',
    customerName: 'Kak Beryl',
    orderType: 'takeaway',
    items: [
      {
        cartItemId: 'init-5',
        item: MENU_ITEMS[3], // Gold Caramel Macchiato
        quantity: 2,
        options: { sugarLevel: '50%', extraShot: true },
        itemTotalPrice: 74000,
      },
      {
        cartItemId: 'init-6',
        item: MENU_ITEMS[9], // Choco Lava Cookies
        quantity: 2,
        options: {},
        itemTotalPrice: 44000,
      },
    ],
    subtotal: 118000,
    tax: 11800,
    discount: 23600,
    total: 106200,
    status: 'completed',
    paymentMethod: 'QRIS',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 32 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    estimatedMinutes: 0,
  },
];

export const CafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('teki_lang');
      return saved === 'en' || saved === 'id' ? saved : 'id';
    } catch {
      return 'id';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('teki_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = TRANSLATIONS[language];

  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<PromoItem | null>(null);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('teki_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [selectedTable, setSelectedTable] = useState<number | null>(4);
  const [customerName, setCustomerName] = useState<string>('Pelanggan TEKI');
  const [newOrdersBadge, setNewOrdersBadge] = useState<number>(0);
  const [activeReceiptOrder, setActiveReceiptOrder] = useState<Order | null>(null);
  const [lightingTheme, setLightingTheme] = useState<'amber' | 'cyber' | 'daylight'>('amber');

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('teki_custom_menu');
      return saved ? JSON.parse(saved) : MENU_ITEMS;
    } catch {
      return MENU_ITEMS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('teki_custom_menu', JSON.stringify(menuItems));
    } catch {
      // ignore
    }
  }, [menuItems]);

  const addCustomMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [item, ...prev]);
  };

  const updateMenuItemImage = (itemId: string, newImageUrl: string) => {
    setMenuItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, image: newImageUrl } : i))
    );
  };

  const resetMenuToDefault = () => {
    setMenuItems(MENU_ITEMS);
    try {
      localStorage.removeItem('teki_custom_menu');
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('teki_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const addToCart = (item: MenuItem, options: CartItemOption = {}, quantity: number = 1) => {
    let extraPrice = 0;
    if (options.milkType && options.milkType.includes('Oat')) extraPrice += 6000;
    if (options.milkType && options.milkType.includes('Almond')) extraPrice += 7000;
    if (options.extraShot) extraPrice += 5000;

    const unitPrice = item.price + extraPrice;
    const itemTotalPrice = unitPrice * quantity;

    setCart((prev) => {
      // Check if identical item with exact same options already exists
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.item.id === item.id &&
          ci.options.sugarLevel === options.sugarLevel &&
          ci.options.iceLevel === options.iceLevel &&
          ci.options.milkType === options.milkType &&
          ci.options.extraShot === options.extraShot &&
          ci.options.notes === options.notes
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const existing = next[existingIndex];
        const newQty = existing.quantity + quantity;
        next[existingIndex] = {
          ...existing,
          quantity: newQty,
          itemTotalPrice: (existing.itemTotalPrice / existing.quantity) * newQty,
        };
        return next;
      }

      return [
        ...prev,
        {
          cartItemId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          item,
          quantity,
          options,
          itemTotalPrice,
        },
      ];
    });
  };

  const updateCartItemQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.cartItemId !== cartItemId) return ci;
          const newQty = ci.quantity + delta;
          if (newQty <= 0) return null;
          const unitPrice = ci.itemTotalPrice / ci.quantity;
          return {
            ...ci,
            quantity: newQty,
            itemTotalPrice: unitPrice * newQty,
          };
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, curr) => acc + curr.itemTotalPrice, 0);

  let cartDiscount = 0;
  if (appliedPromo && cartSubtotal >= appliedPromo.minSpend) {
    if (appliedPromo.discountType === 'percentage') {
      cartDiscount = Math.round((cartSubtotal * appliedPromo.discountValue) / 100);
    } else {
      cartDiscount = appliedPromo.discountValue;
    }
  }

  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  // PB1 resto tax 10%
  const cartTax = Math.round(taxableAmount * 0.1);
  const cartTotal = taxableAmount + cartTax;
  const cartItemCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = PROMOTIONS.find((p) => p.code.toUpperCase() === clean);
    if (!found) {
      return { success: false, message: 'Kode voucher tidak valid atau sudah kadaluarsa.' };
    }
    if (cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Minimal pembelanjaan untuk kode ini adalah Rp ${found.minSpend.toLocaleString('id-ID')}.`,
      };
    }
    setAppliedPromo(found);
    return { success: true, message: `Voucher "${found.code}" berhasil diterapkan!` };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const createOrder = (orderPayload: {
    customerName: string;
    orderType: 'dine-in' | 'takeaway';
    tableNumber?: number;
    paymentMethod: 'QRIS' | 'Cash' | 'Debit/Card';
    paymentStatus: 'paid' | 'unpaid';
  }): Order => {
    const nextNum = 100 + orders.length + 1;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `TK-${nextNum}`,
      customerName: orderPayload.customerName || 'Tamu TEKI',
      orderType: orderPayload.orderType,
      tableNumber: orderPayload.orderType === 'dine-in' ? orderPayload.tableNumber : undefined,
      items: [...cart],
      subtotal: cartSubtotal,
      tax: cartTax,
      discount: cartDiscount,
      total: cartTotal,
      status: 'pending',
      paymentMethod: orderPayload.paymentMethod,
      paymentStatus: orderPayload.paymentStatus,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: Math.min(12, Math.max(3, cartItemCount * 2)),
      appliedPromo: appliedPromo ? appliedPromo.code : undefined,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setNewOrdersBadge((prev) => prev + 1);
    clearCart();
    setAppliedPromo(null);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const updateOrderPayment = (
    orderId: string,
    method: 'QRIS' | 'Cash' | 'Debit/Card',
    status: 'paid'
  ) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId ? { ...ord, paymentMethod: method, paymentStatus: status } : ord
      )
    );
  };

  const clearOrdersBadge = () => {
    setNewOrdersBadge(0);
  };

  return (
    <CafeContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        language,
        setLanguage,
        t,
        cart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartTax,
        cartTotal,
        cartItemCount,
        appliedPromo,
        applyPromoCode,
        removePromo,
        orders,
        createOrder,
        updateOrderStatus,
        updateOrderPayment,
        selectedTable,
        setSelectedTable,
        customerName,
        setCustomerName,
        newOrdersBadge,
        clearOrdersBadge,
        activeReceiptOrder,
        setActiveReceiptOrder,
        lightingTheme,
        setLightingTheme,
        menuItems,
        addCustomMenuItem,
        updateMenuItemImage,
        resetMenuToDefault,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
