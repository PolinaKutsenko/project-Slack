import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export const fetchChannels = createAsyncThunk('channels/fetchChannels', async (header) => {
  const result = await axios.get(routes.dataPath(), { headers: header });
  console.log(result.data);
  return result.data;
});

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
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
export const { increment } = channelsSlice.actions;
