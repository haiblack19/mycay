export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'noodles' | 'toppings' | 'snacks' | 'combos';
  image: string;
  isPopular?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  spiceLevel?: number; // for noodles category, 0 to 7
}

export interface Testimonial {
  name: string;
  avatar: string;
  comment: string;
  rating: number;
  date: string;
}
