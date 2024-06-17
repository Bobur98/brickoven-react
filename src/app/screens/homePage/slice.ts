// Slice is used to store data into Store

import { createSlice } from '@reduxjs/toolkit';
import { HomaPageState } from '../../../lib/types/screen';

const initialState: HomaPageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

// 1. homepageSlicedagi action property qaydan kelyabti? homePageSlice.reducers bolishi keragmasmidi?

export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
