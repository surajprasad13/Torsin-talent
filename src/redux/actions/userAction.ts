import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api';

const addService = createAsyncThunk(
  'user/addSerice',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`talent/add/service`, value.inputs, {
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

const addSkill = createAsyncThunk(
  'user/addSkill',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`talent/add/skill`, value.inputs, {
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

const fetchSkill = createAsyncThunk(
  'user/fetchSkill',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`talent/skill/detail`, {
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
const fetchService = createAsyncThunk(
  'user/fetchService',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`talent/service/detail`, {
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
)

const jobCorrespondSkill = createAsyncThunk(
  'skill/corresponding/job',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`skill/corresponding/job`, {
        headers: {Authorization: `Bearer ${value}`},
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
)

const notJobCorrespondSkill = createAsyncThunk(
  'skill/exclude/job',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`skill/exclude/job`, {
        headers: {Authorization: `Bearer ${value}`},
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

export {addService, addSkill, fetchSkill, fetchService, jobCorrespondSkill, notJobCorrespondSkill};

export default {};
