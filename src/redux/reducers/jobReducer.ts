import {createSlice} from '@reduxjs/toolkit';
import {fetchActiveJobAndContract} from '../actions/jobAction';

type JobType = {
  error: string;
  message: string;
  loading: boolean;
  success: boolean;
  jobs: any[];
};

const initialState: JobType = {
  error: '',
  message: '',
  loading: false,
  success: false,
  jobs: [],
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchActiveJobAndContract.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(fetchActiveJobAndContract.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.jobs = action.payload.response;
      })
      .addCase(fetchActiveJobAndContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = jobSlice.actions;

export default jobSlice.reducer;
