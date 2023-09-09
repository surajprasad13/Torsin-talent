import {createSlice} from '@reduxjs/toolkit';
import {
  userLogin,
  registerIndivisual,
  registerBusiness,
  userUpdate,
  sendOtp,
  verifyOtp,
  profileDetail,
  resetOtpSent,
  otpverify,
  resetPassword,
  changePassword,
} from '../actions/authAction';
import {LoginResponseData} from '../../types/auth';

interface AuthState {
  loading: boolean;
  userInfo: null | LoginResponseData;
  userToken: null | string;
  error: null | any;
  success: null | object | boolean;
  otpVerified: boolean;
  status: null | string;
  registerSuccess: boolean;
  message: null | string;
  emailVerified: boolean;
  mobileVerified: boolean;
  isFirstOpen: boolean;
  expired: boolean;
  withoutRegister: boolean;
}

const initialState: AuthState = {
  loading: false,
  userInfo: null, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  status: null,
  registerSuccess: false,
  message: '',
  emailVerified: false,
  mobileVerified: false,
  isFirstOpen: true,
  expired: false,
  otpVerified: false,
  withoutRegister: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateExpire: state => {
      state.expired = true;
    },

    updateWithoutRegister: state => {
      state.withoutRegister = true;
    },

    loginValue: state => {
      state.error = '';
      state.loading = false;
    },
    logout: state => {
      state.userToken = null;
      state.userInfo = null;
    },
    resetMessage: state => {
      state.message = '';
    },
    resetSuccess: state => {
      state.success = false;
    },
    resetEmailVerified: state => {
      state.emailVerified = false;
    },
    resetMobileVerified: state => {
      state.mobileVerified = false;
    },
    phoneVerified: state => {
      state.mobileVerified = true;
    },
    resetOtpVerified: state => {
      state.otpVerified = false;
    },
    resetFirst: state => {
      state.isFirstOpen = false;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: builder => {
    //login
    builder
      .addCase(userLogin.pending, state => {
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
      .addCase(registerIndivisual.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerIndivisual.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.userToken = action.payload.response.data.token.access;
        state.userInfo = action.payload.response.data;
      })
      .addCase(registerIndivisual.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // bussiness registration
      .addCase(registerBusiness.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.userToken = action.payload.response.data.token.access;
        state.userInfo = action.payload.response.data;
      })
      .addCase(registerBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update user
      .addCase(userUpdate.pending, state => {
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
      })
      // verify email
      .addCase(sendOtp.pending, state => {
        state.error = null;
        state.loading = true;
        state.success = false;
        state.message = '';
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.response.message.successMessage;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      })
      // verify otp
      .addCase(verifyOtp.pending, state => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.message = action.payload.response.message.successMessage;
        state.emailVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      })

      // user profile detail
      .addCase(profileDetail.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(profileDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.response.data;
      })
      .addCase(profileDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      });

    //reset otp sent
    builder
      .addCase(resetOtpSent.pending, state => {
        state.error = null;
        state.loading = true;
        state.message = '';
      })
      .addCase(resetOtpSent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.response.message.successMessage;
      })
      .addCase(resetOtpSent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // verify otp
      .addCase(otpverify.pending, state => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(otpverify.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.response.message.successMessage;
        state.otpVerified = true;
      })
      .addCase(otpverify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      })

      //resetPassword
      .addCase(resetPassword.pending, state => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.message = action.payload.response.message.successMessage;
        state.emailVerified = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      })

      .addCase(changePassword.pending, state => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
        state.message = action.payload.response.message.successMessage;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = '';
      });
  },
});

export const {
  updateExpire,
  loginValue,
  logout,
  resetSuccess,
  resetEmailVerified,
  resetMobileVerified,
  phoneVerified,
  resetFirst,
  resetOtpVerified,
  updateUserInfo,
  resetMessage,
  updateWithoutRegister,
} = authSlice.actions;

export default authSlice.reducer;
