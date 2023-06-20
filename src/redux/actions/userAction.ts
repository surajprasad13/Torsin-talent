import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api';

const addService = createAsyncThunk(
  'user/addSerice',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`talent/add/service`, value.inputs);
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
      const {data} = await api.get(`talent/skill/detail`);
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
      const {data} = await api.get(`talent/service/detail`);
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

const jobCorrespondSkill = createAsyncThunk(
  'skill/corresponding/job',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`skill/corresponding/job`);
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

const notJobCorrespondSkill = createAsyncThunk(
  'skill/exclude/job',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`skill/exclude/job`);
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

const searchJob = createAsyncThunk(
  'user/searchJob',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`job/list`, {
        params: {
          search: value.search,
        },
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

const addProposal = createAsyncThunk(
  'user/addProposal',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`talent/proposal/job`, value.inputs);

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

const getAccepted = createAsyncThunk(
  'user/proposal/accept',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`talent/proposal/accept`);
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

const getProposalStatus = createAsyncThunk(
  'user/proposal/status',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`talent/proposal/status`);
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

const getContract = createAsyncThunk(
  'user/contract/list',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`talent/talent_contract_list`);
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

export {
  addService,
  addSkill,
  fetchSkill,
  fetchService,
  jobCorrespondSkill,
  notJobCorrespondSkill,
  searchJob,
  addProposal,
  getAccepted,
  getProposalStatus,
  getContract,
};

export default {};
