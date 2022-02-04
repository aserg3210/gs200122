import { v4 as uuid4 } from 'uuid';

export interface IBasketItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export interface IBasket {
  id: string;
  items: IBasketItem[];
}

export class Basket implements IBasket{
  id = uuid4();
  items: IBasketItem[] = [];

}

export interface IBasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}
