import {createSlice} from '@reduxjs/toolkit';
import {addService} from '../actions/userAction';

enum Status {
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

interface UserInterface {
  loading: boolean;
  error: null | string | any;
  success: boolean; // for monitoring the registration process.
  status: null | Status;
  registerSuccess: false;
}

const initialState: UserInterface = {
  loading: false,
  error: null,
  success: false,
  status: null,
  registerSuccess: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSuccess: state => {
      state.success = false;
    },
  },
  extraReducers: builder => {
    //login
    builder
      .addCase(addService.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {updateSuccess} = userSlice.actions;

export default userSlice.reducer;
