import {createSlice} from '@reduxjs/toolkit';
import {userLogin} from '../action/authAction';

enum Status {
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

interface AuthState {
  loading: boolean;
  userInfo: Object;
  userToken: null | string;
  error: null | any;
  success: null | Object;
  status: null | string;
}

const initialState: AuthState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  status: null,
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
    },
  },
  extraReducers: builder => {
    //login
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.userToken = action.payload.response.data.token.access;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {loginValue} = authSlice.actions;

export default authSlice.reducer;
