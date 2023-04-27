import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { actions as channelActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(channelActions.removeChannel, (state, { payload }) => {
      const channelId = payload;
      const restEntities = Object.values(state.entities).filter((message) => (
        message.channelId !== channelId));
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export default messagesSlice.reducer;
export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const getMessagesOfCurrentChannel = (state) => {
  const { currentChannelId } = state.channels;
  const allMessages = selectors.selectAll(state);
  const messagesOfCurrentChannel = allMessages.filter((message) => (
    message.channelId === currentChannelId));
  return messagesOfCurrentChannel;
};
