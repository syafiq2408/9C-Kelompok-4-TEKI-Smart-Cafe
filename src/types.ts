export type Language = 'id' | 'en';

export type PageId =
  | 'home'
  | 'about'
  | 'design'
  | 'menu'
  | 'tech'
  | 'business'
  | 'report'
  | 'kasir'
  | 'pembeli';

export type MenuCategory = 'all' | 'coffee' | 'dessert' | 'savory' | 'non-coffee';

export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string;
  category: 'coffee' | 'dessert' | 'savory' | 'non-coffee';
  price: number;
  description: string;
  descriptionEn?: string;
  image: string;
  isPopular?: boolean;
  isSmartSpecial?: boolean;
  calories?: string;
  prepTime?: string;
  prepTimeEn?: string;
  tags: string[];
  tagsEn?: string[];
}

export interface CartItemOption {
  sugarLevel?: '0%' | '25%' | '50%' | '100%';
  iceLevel?: 'No Ice' | 'Less Ice' | 'Normal Ice';
  milkType?: 'Fresh Milk' | 'Oat Milk (+Rp 6.000)' | 'Almond Milk (+Rp 7.000)';
  extraShot?: boolean;
  notes?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  options: CartItemOption;
  itemTotalPrice: number;
}

export type OrderStatus = 'pending' | 'brewing' | 'ready' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  orderType: 'dine-in' | 'takeaway';
  tableNumber?: number;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'QRIS' | 'Cash' | 'Debit/Card';
  paymentStatus: 'paid' | 'unpaid';
  createdAt: string;
  estimatedMinutes: number;
  appliedPromo?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  skills: string[];
  quote: string;
}

export interface PromoItem {
  id: string;
  code: string;
  title: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  description: string;
  validUntil: string;
  minSpend: number;
  bannerColor: string;
  image: string;
}
