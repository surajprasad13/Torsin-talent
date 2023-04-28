// authSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {
  registerBusiness,
  registerIndivisual,
  userLogin,
} from '../action/authAction';

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // login user
    [userLogin.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },

    // register Indivisual
    [registerIndivisual.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [registerIndivisual.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerIndivisual.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },

    // register Bussiness
    [registerBusiness.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [registerBusiness.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerBusiness.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export default authSlice.reducer;
