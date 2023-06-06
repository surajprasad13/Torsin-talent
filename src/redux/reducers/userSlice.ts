import {createSlice} from '@reduxjs/toolkit';
import {
  addProposal,
  addService,
  addSkill,
  fetchService,
  fetchSkill,
  getAccepted,
  getProposalStatus,
  jobCorrespondSkill,
  notJobCorrespondSkill,
} from '../actions/userAction';
import {JobDetail, Service} from '../../types/user';
import {searchJob} from '../actions/userAction';

enum Status {
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

interface UserInterface {
  loading: boolean;
  error: null | string | any;
  success: boolean;
  status: null | Status;
  registerSuccess: false;
  skills: Array<string>;
  services: Array<Service>;
  correspond: Array<JobDetail>;
  notCorrespond: Array<JobDetail>;
  search: Array<JobDetail>;
  addSuccess: string;
  acceptList: Array<any>;
  proposalStatus: Array<any>;
}

const initialState: UserInterface = {
  loading: false,
  error: null,
  success: false,
  status: null,
  registerSuccess: false,
  skills: [],
  services: [],
  correspond: [],
  notCorrespond: [],
  search: [],
  addSuccess: '',
  acceptList: [],
  proposalStatus: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSuccess: state => {
      state.success = false;
      state.error = '';
    },
    resetSuccess: state => {
      state.addSuccess = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addService.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //skill
      .addCase(addSkill.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch Skills
      .addCase(fetchSkill.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload.response;
      })
      .addCase(fetchSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch service
      .addCase(fetchService.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.response;
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // job correspond Skills
      .addCase(jobCorrespondSkill.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(jobCorrespondSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.correspond = action.payload.response;
      })
      .addCase(jobCorrespondSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // not job correspond Skills
      .addCase(notJobCorrespondSkill.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(notJobCorrespondSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.notCorrespond = action.payload.response;
      })
      .addCase(notJobCorrespondSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // not job correspond Skills
      .addCase(searchJob.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(searchJob.fulfilled, (state, action) => {
        state.loading = false;
        state.search = action.payload;
      })
      .addCase(searchJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add propsal
      .addCase(addProposal.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(addProposal.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.addSuccess = action.payload.response.message.successMessage;
      })
      .addCase(addProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Accepted
      .addCase(getAccepted.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(getAccepted.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.acceptList = action.payload.response;
      })
      .addCase(getAccepted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Proposal Status
      .addCase(getProposalStatus.pending, (state, action) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(getProposalStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.proposalStatus = action.payload.response;
      })
      .addCase(getProposalStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {updateSuccess, resetSuccess} = userSlice.actions;

export default userSlice.reducer;
