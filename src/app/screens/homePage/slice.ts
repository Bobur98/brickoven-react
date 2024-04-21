// Slice is used to store data into Store

import { createSlice } from '@reduxjs/toolkit';
import { HomaPageState } from '../../../lib/data/types/screen';

const initialState: HomaPageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: 'HomePage',
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

console.log(homePageSlice.actions, 'actions');

export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
