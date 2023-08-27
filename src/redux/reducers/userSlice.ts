import {createSlice} from '@reduxjs/toolkit';
import {
  TicketList,
  addProposal,
  addService,
  addSkill,
  createRating,
  createSupport,
  fetchAdminService,
  fetchNotification,
  fetchService,
  fetchSkill,
  filterCity,
  filterUser,
  getAccepted,
  getAdminPercentage,
  getContract,
  getContractDetail,
  getFeedList,
  getHelpSupport,
  getPaymentDetails,
  getPaymentStatus,
  getProposalDetail,
  getProposalStatus,
  getRating,
  jobCorrespondSkill,
  notJobCorrespondSkill,
  supportChat,
  supportPostChat,
  updateContract,
} from '../actions/userAction';
import {
  Feed,
  Help,
  JobDetail,
  PaymentDetails,
  ProposalDetail,
  Rating,
  Service,
  Ticket,
  UserTag,
} from '../../types/user';
import {searchJob} from '../actions/userAction';
import {Contract} from '../../types/contract';

enum Status {
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

interface UserInterface {
  loading: boolean;
  error: null | string | any;
  message: string | null;
  addMessage: string;
  success: boolean;
  status: null | Status;
  registerSuccess: false;
  skills: Array<string>;
  adminService: Array<{id: number; serviceName: string}> | string;
  services: Array<Service>;
  correspond: Array<JobDetail>;
  notCorrespond: Array<JobDetail>;
  search: Array<JobDetail>;
  city: [];
  user: UserTag[];
  addSuccess: string;
  acceptList: Array<any>;
  proposalStatus: Array<any>;
  paymentStatus: Array<any>;
  proposalDetail: null | ProposalDetail;
  paymentDetail: null | PaymentDetails;
  contracts: {
    accepted: Array<any>;
    rejected: Array<any>;
    archived: Array<any>;
  };
  notification: Array<any>;
  contractDetail: null | Contract;
  rating: Array<Rating>;
  help: Array<Help>;
  feed: Array<Feed>;
  ticket: Array<Ticket>;
  created: boolean;
  adminPercentage: number;
  support: [];
}

const initialState: UserInterface = {
  loading: false,
  message: '',
  addMessage: '',
  created: false,
  error: null,
  success: false,
  status: null,
  registerSuccess: false,
  skills: [],
  adminService: [],
  services: [],
  correspond: [],
  notCorrespond: [],
  search: [],
  city: [],
  user: [],
  addSuccess: '',
  acceptList: [],
  proposalStatus: [],
  paymentStatus: [],
  proposalDetail: null,
  paymentDetail: null,
  contracts: {
    accepted: [],
    rejected: [],
    archived: [],
  },
  notification: [],
  contractDetail: null,
  rating: [],
  feed: [],
  help: [],
  ticket: [],
  adminPercentage: 0,
  support: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSuccess: state => {
      state.success = false;
      state.error = '';
    },
    resetMessage: state => {
      state.message = '';
      state.addMessage = '';
    },
    resetSuccess: state => {
      state.addSuccess = '';
    },
    resetAdminService: state => {
      state.adminService = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addService.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(addService.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //skill
      .addCase(addSkill.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(addSkill.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch Skills
      .addCase(fetchSkill.pending, state => {
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
      .addCase(fetchService.pending, state => {
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

      // admin service
      .addCase(fetchAdminService.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchAdminService.fulfilled, (state, action) => {
        state.loading = false;
        state.adminService = action.payload.response;
      })
      .addCase(fetchAdminService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // job correspond Skills
      .addCase(jobCorrespondSkill.pending, state => {
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
      .addCase(notJobCorrespondSkill.pending, state => {
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
      .addCase(searchJob.pending, state => {
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
      .addCase(addProposal.pending, state => {
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
      .addCase(getAccepted.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAccepted.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.acceptList = action.payload;
      })
      .addCase(getAccepted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Proposal Status
      .addCase(getProposalStatus.pending, state => {
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
      })

      // proposal detail
      .addCase(getProposalDetail.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getProposalDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.proposalDetail = action.payload.response[0];
      })
      .addCase(getProposalDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // contracts list
      .addCase(getContract.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getContract.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (action.payload.status == 1) {
          state.contracts.accepted = action.payload.response;
        } else if (action.payload.status == 2) {
          state.contracts.rejected = action.payload.response;
        } else if (action.payload.status == 3) {
          state.contracts.archived = action.payload.response;
        } else {
        }
      })
      .addCase(getContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update contract status
      .addCase(updateContract.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateContract.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Notification
      .addCase(fetchNotification.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload.response;
      })
      .addCase(fetchNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get contract deatils
      .addCase(getContractDetail.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getContractDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.contractDetail = action.payload.response.data;
      })
      .addCase(getContractDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //rating
      .addCase(getRating.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getRating.fulfilled, (state, action) => {
        state.loading = false;
        state.rating = action.payload.response;
      })
      .addCase(getRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //createRating
      .addCase(createRating.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createRating.fulfilled, state => {
        state.loading = false;
        state.created = true;
      })
      .addCase(createRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // admin Percentage
      .addCase(getAdminPercentage.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAdminPercentage.fulfilled, (state, action) => {
        state.loading = false;
        state.adminPercentage = action.payload.response[0].adminPercentage;
      })
      .addCase(getAdminPercentage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Filter City
      .addCase(filterCity.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(filterCity.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload;
      })
      .addCase(filterCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //feed
      .addCase(getFeedList.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getFeedList.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload.response;
      })
      .addCase(getFeedList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //help
      .addCase(getHelpSupport.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getHelpSupport.fulfilled, (state, action) => {
        state.loading = false;
        state.help = action.payload.response;
      })
      .addCase(getHelpSupport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create help
      .addCase(createSupport.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createSupport.fulfilled, (state, action) => {
        state.loading = false;
        state.created = true;
        state.message = action.payload.response.message.successMessage;
      })
      .addCase(createSupport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //TicketList
      .addCase(TicketList.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(TicketList.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload.response;
      })
      .addCase(TicketList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Support Chat
      .addCase(supportChat.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(supportChat.fulfilled, (state, action) => {
        state.loading = false;
        state.support = action.payload.response;
      })
      .addCase(supportChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create support chat
      .addCase(supportPostChat.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(supportPostChat.fulfilled, state => {
        state.loading = false;
        state.created = true;
      })
      .addCase(supportPostChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // payment Status
      .addCase(getPaymentStatus.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.paymentStatus = action.payload.response;
      })
      .addCase(getPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // proposal detail
      .addCase(getPaymentDetails.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getPaymentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.paymentDetail = action.payload.response[0];
      })
      .addCase(getPaymentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // search user
      .addCase(filterUser.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(filterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.response;
      })
      .addCase(filterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {updateSuccess, resetSuccess, resetAdminService, resetMessage} =
  userSlice.actions;

export default userSlice.reducer;
