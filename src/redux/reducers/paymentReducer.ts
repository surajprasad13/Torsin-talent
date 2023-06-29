import {createSlice} from '@reduxjs/toolkit';
import {
  generateLink,
  getBankAccountDeail,
  getStripeAccountInfo,
} from '../actions/paymentAction';

interface AccountDetail {
  instanceId: number;
  stripeAccountId: string;
  accountStatus: string;
}

interface AccountOnboarding {
  object: string;
  created: number;
  expires_at: number;
  url: string;
}

interface InitialStateProp {
  error: string | any;
  message: string;
  success: string;
  loading: boolean;
  accountDetail: AccountDetail | null;
  accountOnboarding: AccountOnboarding | null;
  bankAccountDetail: null | any;
}

const initialState: InitialStateProp = {
  error: '',
  message: '',
  success: '',
  loading: false,
  accountDetail: null,
  accountOnboarding: null,
  bankAccountDetail: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // Get Account Info

      .addCase(getStripeAccountInfo.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(getStripeAccountInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetail = action.payload.response.accountDetail;
      })
      .addCase(getStripeAccountInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Generate Link

      .addCase(generateLink.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(generateLink.fulfilled, (state, action) => {
        state.loading = false;
        state.accountOnboarding = action.payload.response.accountOnboarding;
      })
      .addCase(generateLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Account Detail
      .addCase(getBankAccountDeail.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(getBankAccountDeail.fulfilled, (state, action) => {
        state.loading = false;
        state.bankAccountDetail = action.payload.response;
      })
      .addCase(getBankAccountDeail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
