import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 5,
};

const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export default slice.reducer;
export const { increment } = slice.actions;
