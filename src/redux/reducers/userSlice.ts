import {createSlice} from '@reduxjs/toolkit';
import {
  addService,
  addSkill,
  fetchService,
  fetchSkill,
} from '../actions/userAction';
import {Service} from '../../types/user';

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
  skills: Array<string>;
  services: Array<Service>;
}

const initialState: UserInterface = {
  loading: false,
  error: null,
  success: false,
  status: null,
  registerSuccess: false,
  skills: [],
  services: [],
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
      })

      //skill
      .addCase(addSkill.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch Skills
      .addCase(fetchSkill.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload.response;
      })
      .addCase(fetchSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch service
      .addCase(fetchService.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.response;
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {updateSuccess} = userSlice.actions;

export default userSlice.reducer;
