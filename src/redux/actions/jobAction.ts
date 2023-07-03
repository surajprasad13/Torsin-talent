import {createAsyncThunk} from '@reduxjs/toolkit';

import api from '../../api';

const fetchActiveJobAndContract = createAsyncThunk(
  'job/activeJobAndContract',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`talent/activeJobandContract`);
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

export {fetchActiveJobAndContract};
