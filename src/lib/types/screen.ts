import { Member } from './member';
import { Product } from './products';

/* REACT APP STATE */
export interface AppRootState {
  homePage: HomaPageState;
}

/* HOMEPAGE PAGE */
export interface HomaPageState {
  topUsers: Member[];
  newDishes: Product[];
  popularDishes: Product[];
}

/* PRODUCTS PAGE */

/* ORDERS PAGE */
