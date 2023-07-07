// authActions.js
import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api';

const registerIndivisual = createAsyncThunk(
  'auth/register/indivisual',
  async (data: any, {rejectWithValue}) => {
    try {
      const {data: responseData} = await api.post(
        `talent/individual/registration`,
        data,
      );
      return responseData;
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const registerBusiness = createAsyncThunk(
  'auth/register/business',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`talent/business/registration`, value);
      return data;
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const userLogin = createAsyncThunk(
  'auth/login',
  async (value: any, {rejectWithValue}) => {
    try {
      // const token = await messaging().getToken();
      // console.log(token);
      const {data} = await api.post(`talent/user/login`, value);
      // const ref = database().ref(`/Tokens/u2id${data.response.data.id}`);
      // await ref.update({device_token: token});

      return data;
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const userUpdate = createAsyncThunk(
  'auth/update',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.put(`talent/user/update`, value.inputs);
      return data;
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`verify/email`, value.inputs);
      return data;
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`verify/otp`, value);
      return data;
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const profileDetail = createAsyncThunk(
  'user/profileDetail',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`user/details`);
      return data;
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const resetOtpSent = createAsyncThunk(
  'auth/lostPassword',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`talent/lostPassword/otpsent`, value);
      console.log(data);
      return data;
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const otpverify = createAsyncThunk(
  'auth/lostPassword/otpverify',
  async (value: any, {rejectWithValue}) => {
    console.log(value);
    try {
      const {data} = await api.post(`talent/lostPassword/otpverify`, value);
      console.log(data, 'data');
      return data;
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

export {
  userLogin,
  registerIndivisual,
  registerBusiness,
  userUpdate,
  sendOtp,
  verifyOtp,
  profileDetail,
  resetOtpSent,
  otpverify,
};

export default {};
