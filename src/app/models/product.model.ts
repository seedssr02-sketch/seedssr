export type ProductCategory =
  | 'feminizadas'
  | 'autoflorescentes'
  | 'cbd'
  | 'cali'
  | 'atacado'
  | 'headshop';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  genetics?: string;
  thc?: string;
  cbd?: string;
  predominance?: string;
  medicinal?: string;
  effects?: string;
  height?: string;
  flowering?: string;
  flavor?: string;
  yield?: string;
  type?: string;
  price: number;
  oldPrice?: number;
  image: string;
  shortDescription: string;
  description: string;
  bestSeller?: boolean;
  promo?: boolean;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
