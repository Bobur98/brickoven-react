import { Member } from './member';
import { Order } from './orders';
import { Product } from './products';

/* REACT APP STATE */
export interface AppRootState {
  homePage: HomaPageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

/* HOMEPAGE PAGE */
export interface HomaPageState {
  topUsers: Member[];
  newDishes: Product[];
  popularDishes: Product[];
}

/* PRODUCTS PAGE */
export interface ProductsPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/* ORDERS PAGE */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}