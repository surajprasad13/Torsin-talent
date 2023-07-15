import {createSlice} from '@reduxjs/toolkit';
import {
  fetchActiveJobAndContract,
  fetchNewJobAndContract,
  fetchPastJobAndContract,
} from '../actions/jobAction';

type JobType = {
  error: string;
  message: string;
  loading: boolean;
  success: boolean;
  jobs: any[];
  pastjob: any[];
  newjob: any[];
};

const initialState: JobType = {
  error: '',
  message: '',
  loading: false,
  success: false,
  jobs: [],
  pastjob: [],
  newjob: [],
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
      })

      .addCase(fetchNewJobAndContract.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(fetchNewJobAndContract.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.newjob = action.payload.response;
      })
      .addCase(fetchNewJobAndContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = jobSlice.actions;

export default jobSlice.reducer;
