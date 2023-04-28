// authActions.js
import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({firstName, email, password}: any, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await api.post(`user/registration`, {firstName, email, password}, config);
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

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({email, password}: any, {rejectWithValue}) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const {data} = await api.post(`login`, {email, password}, config);
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
