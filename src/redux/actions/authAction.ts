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
      const {data} = await api.post(`business/registration`, value);
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
      const {data} = await api.post(`user/login`, value);
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

const userUpdate = createAsyncThunk(
  'auth/update',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.put(`user/update`, value.inputs, {
        headers: {Authorization: `Bearer ${value.userToken}`},
      });
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

export {userLogin, registerIndivisual, registerBusiness, userUpdate};

export default {};
