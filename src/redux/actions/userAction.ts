import {createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';
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
      const {data} = await api.post(`talent/add/skill`, value);
      return data;
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrosng');
      }
    }
  },
);

const fetchSkill = createAsyncThunk(
  'user/fetchSkill',
  async (_, {rejectWithValue}) => {
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

const fetchAdminService = createAsyncThunk(
  'user/fetchAdminService',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`admin/services`, {
        params: {
          serviceName: value,
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
      let _data: any = [];
      for (let index = 0; index < data.response.length; index++) {
        const element = data.response[index];
        const length = await fetchDataFromDatabase(element, value.id);
        _data.push({
          ...element,
          read: length,
        });
      }

      return _data;
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
  async (_, {rejectWithValue}) => {
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

const getProposalDetail = createAsyncThunk(
  'user/proposal/detail',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`talent/proposal/status`, {
        params: {
          proposalId: value,
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

const getContract = createAsyncThunk(
  'user/contract/list',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(
        `talent/talent_contract_list/?status=${value}`,
      );
      return {response: data.response.data, status: value};
    } catch (error: any) {
      if (error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error.errorMessage);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

const getContractDetail = createAsyncThunk(
  'get_contract_details/',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`talent/get_contract_details/${value}/`);
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

const updateContract = createAsyncThunk(
  'update_contract/',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.patch(
        `talent/update_contract_status/${value.id}/`,
        value.inputs,
      );
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

const fetchNotification = createAsyncThunk(
  'fetch_notification/',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`talent/get_notification_list/`);
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

async function fetchDataFromDatabase(item: any, userId: number) {
  try {
    const snapshot = await database()
      .ref(`Chat/jobid${item.jobId}-proposalid${item.proposalId}`)
      .once('value');
    const _messages = snapshot.val();

    if (_messages) {
      const messageList = Object.keys(_messages)
        .map(key => ({
          ..._messages[key],
        }))
        .sort((a, b) => b.id - a.id)
        .filter(_item => _item.user._id !== userId)
        .filter(a => a.read === false);
      return messageList.length;
    }

    return 0; // Return 0 if no messages found
  } catch (error) {
    console.error('Error fetching data from database:', error);
    throw error;
  }
}

const getRating = createAsyncThunk(
  'rating/get',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`common/rating/get`);
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

const createRating = createAsyncThunk(
  'rating/create',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`common/rating/create`, value);
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

const getAdminPercentage = createAsyncThunk(
  'admin/percentage',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`admin/percentage`);
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
const filterCity = createAsyncThunk(
  'country/city',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`city/filter`, {
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

const getFeedList = createAsyncThunk(
  '/feed/list',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`/feed/list`);
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

const getHelpSupport = createAsyncThunk(
  'support/topic/list',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`support/topic/list`);
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

const createSupport = createAsyncThunk(
  'support/ticket/initiate',
  async (value: {topicId: string; description: string}, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`support/ticket/initiate`, value);
      console.log(value, 'success');
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
  getContractDetail,
  updateContract,
  fetchNotification,
  getRating,
  createRating,
  getAdminPercentage,
  filterCity,
  fetchAdminService,
  getProposalDetail,
  getFeedList,
  getHelpSupport,
  createSupport,
};

export default {};
