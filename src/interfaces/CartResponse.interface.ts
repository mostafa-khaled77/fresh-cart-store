import { Product } from '@/interfaces/product.interface';
export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: Product; 
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[]; 
  totalCartPrice: number;

}

export interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}