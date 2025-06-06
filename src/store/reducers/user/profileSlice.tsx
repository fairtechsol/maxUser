import { createSlice } from "@reduxjs/toolkit";
import {
  getAccountStatement,
  getBannerImage,
  getButtonValue,
  getCasinoButtonValue,
  getProfile,
  getProfileInMatchDetail,
  marqueeNotification,
  setButtonValue,
  updateBalance,
  updateBalanceFromSocket,
  updateBalanceOnBetDelete,
  updateBalanceOnSessionBet,
  updateBalanceOnSessionResult,
} from "../../actions/user/userAction";
import { updateUserBalanceOnPlaceBet } from "../../actions/otherMatchActions";
import { updateBalanceOnHorseBetPlace } from "../../actions/horseRacing/horseMatchDetailActions";
import { updateBalanceOnBetPlaceCards } from "../../actions/cards/cardDetail";

interface InitialState {
  transactionPassword: string;
  profileDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
  bannerImage: any;
  marqueeNotification: any;
  getProfile: any;
  buttonValues: any;
  buttonValues2: any;
  setButtonValue: any;
  transactions: any;
  isBanner: boolean;
}

const initialState: InitialState = {
  getProfile: null,
  marqueeNotification: null,
  bannerImage: "",
  transactionPassword: "",
  buttonValues: [],
  buttonValues2: [],
  setButtonValue: null,
  profileDetail: null,
  transactions: null,
  loading: false,
  success: false,
  error: null,
  isBanner: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(marqueeNotification.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(marqueeNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.marqueeNotification = action.payload;
      })
      .addCase(marqueeNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getBannerImage.pending, (state) => {
        state.loading = true;
        state.isBanner = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getBannerImage.fulfilled, (state, action) => {
        state.loading = false;
        state.isBanner = true;
        state.success = true;
        state.bannerImage = action.payload;
      })
      .addCase(getBannerImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.getProfile = action.payload?.[0]?.[0];
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getAccountStatement.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAccountStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.transactions = action.payload;
      })
      .addCase(getAccountStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getButtonValue.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getButtonValue.fulfilled, (state, action) => {
        state.buttonValues = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getButtonValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getCasinoButtonValue.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getCasinoButtonValue.fulfilled, (state, action) => {
        state.buttonValues2 = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getCasinoButtonValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(setButtonValue.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(setButtonValue.fulfilled, (state, action) => {
        const updatedValue = action.payload;

        if (updatedValue?.type === "Match" || updatedValue?.type === "match") {
          state.buttonValues = updatedValue;
        } else if (
          updatedValue?.type === "Casino" ||
          updatedValue?.type === "casino"
        ) {
          state.buttonValues2 = updatedValue;
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(setButtonValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getProfileInMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getProfileInMatchDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.getProfile = action.payload?.[0]?.[0];
      })
      .addCase(getProfileInMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.getProfile = {
          ...state.getProfile,
          userBal: {
            ...state?.getProfile?.userBal,
            exposure:
              action.payload?.newUserExposure ?? action.payload?.exposure,
          },
        };
      })
      .addCase(updateBalanceOnHorseBetPlace.fulfilled, (state, action) => {
        state.getProfile = {
          ...state.getProfile,
          userBal: {
            ...state?.getProfile?.userBal,
            exposure:
              action.payload?.newUserExposure ?? action.payload?.exposure,
          },
        };
      })
      .addCase(updateUserBalanceOnPlaceBet.fulfilled, (state, action) => {
        state.getProfile = {
          ...state.getProfile,
          userBal: {
            ...state?.getProfile?.userBal,
            exposure:
              action.payload?.newUserExposure ?? action.payload?.exposure,
          },
        };
      })
      .addCase(updateBalanceOnSessionBet.fulfilled, (state, action) => {
        state.getProfile = {
          ...state.getProfile,
          userBal: {
            ...state?.getProfile?.userBal,
            exposure:
              action.payload?.newUserExposure ?? action.payload?.exposure,
          },
        };
      })
      .addCase(updateBalanceOnSessionResult.fulfilled, (state, action) => {
        state.getProfile = {
          ...state.getProfile,
          userBal: {
            ...state?.getProfile?.userBal,
            exposure: action.payload?.exposure,
            currentBalance: action.payload?.currentBalance,
          },
        };
      })
      .addCase(updateBalanceOnBetDelete.fulfilled, (state, action) => {
        state.getProfile = {
          ...state.getProfile,
          userBal: {
            ...state?.getProfile?.userBal,
            exposure: action.payload?.exposure,
            currentBalance: action.payload?.currentBalance,
          },
        };
      })
      .addCase(updateBalanceFromSocket.fulfilled, (state, action) => {
        state.getProfile = {
          ...state.getProfile,
          userBal: {
            ...state?.getProfile?.userBal,
            currentBalance: action.payload?.currentBalance,
            profitLoss: action.payload?.profitLoss,
          },
        };
      })
      .addCase(updateBalanceOnBetPlaceCards.fulfilled, (state, action) => {
        state.getProfile = {
          ...state.getProfile,
          userBal: {
            ...state?.getProfile?.userBal,
            exposure:
              action.payload?.newUserExposure ?? action.payload?.exposure,
          },
        };
      });
  },
});

export const profileReducer = profileSlice.reducer;
