import {createSlice} from '@reduxjs/toolkit';
import {
  userLogin,
  registerIndivisual,
  registerBusiness,
  userUpdate,
} from '../actions/authAction';
import {LoginResponseData} from '../../types/auth';

enum Status {
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

interface AuthState {
  loading: boolean;
  userInfo: null | LoginResponseData;
  userToken: null | string;
  error: null | any;
  success: null | Object | boolean;
  status: null | string;
  registerSuccess: boolean;
}

const initialState: AuthState = {
  loading: false,
  userInfo: null, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  status: null,
  registerSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginValue: state => {
      state.error = '';
    },
    logout: state => {
      state.userToken = null;
      state.userInfo = null;
    },
    resetSuccess: state => {
      state.success = false;
    },
  },
  extraReducers: builder => {
    //login
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.userToken = action.payload.response.data.token.access;
        state.userInfo = action.payload.response.data;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  indivisual registration
      .addCase(registerIndivisual.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(registerIndivisual.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.userToken = action.payload.response.data.token.access;
      })
      .addCase(registerIndivisual.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // bussiness registration
      .addCase(registerBusiness.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(registerBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.userToken = action.payload.response.data.token.access;
      })
      .addCase(registerBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update user
      .addCase(userUpdate.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.userInfo = action.payload.response.userData;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {loginValue, logout, resetSuccess} = authSlice.actions;

export default authSlice.reducer;
