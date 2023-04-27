import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const DEFAULT_CHANNEL_ID = '1';

export const fetchChannels = createAsyncThunk('channels/fetchChannels', async (header) => {
  const result = await axios.get(routes.dataPath(), { headers: header });
  return result.data;
});

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: DEFAULT_CHANNEL_ID, loadingStatus: 'idle', error: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default channelsSlice.reducer;
export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const getCurrentChannel = (state) => {
  const { currentChannelId } = state.channels;
  console.log('currentChannelId', currentChannelId);
  const currentChannel = selectors.selectById(state, currentChannelId);
  return currentChannel;
};
