import { Member } from './member';
import { Product } from './products';

/* REACT APP STATE */
export interface AppRootState {
  homePage: HomaPageState;
  productsPage: ProductsPageState;
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
