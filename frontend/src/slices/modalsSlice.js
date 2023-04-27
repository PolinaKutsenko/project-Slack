import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  isOpen: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type } = action.payload;
      state.type = type;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.type = null;
      state.isOpen = false;
    },
  },
});

export default modalsSlice.reducer;
export const { actions } = modalsSlice;
export const getModalOpenedStatus = (state) => state.modals.isOpen;
export const getModalType = (state) => state.modals.type;
