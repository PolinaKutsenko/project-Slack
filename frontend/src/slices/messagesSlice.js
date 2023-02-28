import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export default messagesSlice.reducer;
export const { increment } = messagesSlice.actions;
