export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Sports' | 'Formal' | 'Casual' | 'Kids';
  image: string;
  brand: string;
  isTrending?: boolean;
  rating: number;
  reviewsCount: number;
  modelUrl?: string;
  availableSizes: number[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}

export type Page = 'home' | 'shop' | 'contact' | 'profile' | 'wishlist' | 'about' | 'login';
