import { createSlice } from '@reduxjs/toolkit';
import { ProductsPageState } from '../../../lib/types/screen';

const initialState: ProductsPageState = {
  restaurant: null,
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: 'productsPage',
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setChoosenProduct: (state, action) => {
      state.restaurant = action.payload;
    },
    setProducts: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

export const { setChoosenProduct, setProducts, setRestaurant } =
  productsPageSlice.actions;

export const ProductsPageReducer = productsPageSlice.reducer;
