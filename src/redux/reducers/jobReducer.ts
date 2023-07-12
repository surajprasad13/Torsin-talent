import {createSlice} from '@reduxjs/toolkit';
import {
  fetchActiveJobAndContract,
  fetchPastJobAndContract,
} from '../actions/jobAction';

type JobType = {
  error: string;
  message: string;
  loading: boolean;
  success: boolean;
  jobs: any[];
  pastjob: any[];
};

const initialState: JobType = {
  error: '',
  message: '',
  loading: false,
  success: false,
  jobs: [],
  pastjob: [],
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
      })

      .addCase(fetchPastJobAndContract.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(fetchPastJobAndContract.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pastjob = action.payload.response;
      })
      .addCase(fetchPastJobAndContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = jobSlice.actions;

export default jobSlice.reducer;
