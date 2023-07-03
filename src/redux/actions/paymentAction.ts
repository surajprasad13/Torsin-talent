import {createAsyncThunk} from '@reduxjs/toolkit';

import api from '../../api';

const getStripeAccountInfo = createAsyncThunk(
  'payment/getStripeAccountInfo',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`talent/account/create`);
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

const generateLink = createAsyncThunk(
  'payment/generate-link',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`talent/account/linkgenerate`, {
        instanceId: value,
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

const getBankAccountDeail = createAsyncThunk(
  'payment/get-bank-details',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`talent/account/details`);
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

export {getStripeAccountInfo, generateLink, getBankAccountDeail};
