import { atom } from 'jotai';

export interface ProductInfo {
  id: string;
  code: any;
  product_name: string;
  price: string;
  store_name: string;
  quantity: number;
  total_selling: number;
  category: string;
  description: string;
  country: string;
  location: string;
  image_url: string;
}

export const listCurrentProduct = atom<ProductInfo[] | null>(null);
