import { createSlice } from '@reduxjs/toolkit';
import { IHomePageState } from './type';

const initialState: IHomePageState = {
  topCars: [],
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setTopCars: (state, action) => {
      state.topCars = action.payload.cars;
    },
  },
});

export const { setTopCars } = homePageSlice.actions;
export default homePageSlice.reducer;
