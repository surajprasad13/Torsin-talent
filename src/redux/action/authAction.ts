// authActions.js
import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api';

const registerIndivisual = createAsyncThunk(
  'auth/register/indivisual',
  async (data: any, {rejectWithValue}) => {
    try {
      const {data: responseData} = await api.post(
        `individual/registration`,
        data,
      );
      return responseData;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

const registerBusiness = createAsyncThunk(
  'auth/register/business',
  async ({firstName, email, password}: any, {rejectWithValue}) => {
    try {
      await api.post(`business/registration`, {firstName, email, password});
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

const userLogin = createAsyncThunk(
  'auth/login',
  async ({email, password}: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`login`, {email, password});
      // store user's token in local storage
      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export {userLogin, registerIndivisual, registerBusiness};

export default {};
