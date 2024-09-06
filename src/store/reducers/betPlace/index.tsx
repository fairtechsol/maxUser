import { createSlice } from "@reduxjs/toolkit";
import {
  betsSuccessReset,
  getMyMarket,
  getPlacedBets,
  getPlacedBetsForAccountStatement,
  getRunAmount,
  resetRunAmount,
  resetRunAmountModal,
  updateBetsPlaced,
} from "../../actions/betPlace/betPlaceActions";
import {
  updateDeleteReasonBet,
  updatePlacedbetsDeleteReason,
  updateRunAmountOnDeleteBet,
} from "../../actions/user/userAction";

interface InitialState {
  placedBets: any;
  placedBetsAccountStatement: any;
  runAmount: any;
  myMarketList: any;
  success: boolean;
  loading: boolean;
  loadingMyMarket: boolean;
  error: any;
  runAmountModal: boolean;
}

const initialState: InitialState = {
  placedBets: [],
  placedBetsAccountStatement: [],
  runAmount: {},
  myMarketList: [],
  loading: false,
  loadingMyMarket: false,
  success: false,
  error: null,
  runAmountModal: false,
};

const placedBet = createSlice({
  name: "placedBet",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlacedBets.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getPlacedBets.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.placedBets = action.payload;
      })
      .addCase(getPlacedBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getPlacedBetsForAccountStatement.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.placedBetsAccountStatement = [];
      })
      .addCase(getPlacedBetsForAccountStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.placedBetsAccountStatement = action.payload;
      })
      .addCase(getPlacedBetsForAccountStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getRunAmount.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.runAmount = [];
      })
      .addCase(getRunAmount.fulfilled, (state, action) => {
        const { id, arr } = action.payload;
        console.log('first',arr)
        state.loading = false;
        state.success = true;
        let data = {
          betId: id,
          runAmountData: arr?.length > 0 ? arr : [],
        };
        state.runAmount = data;
      })
      .addCase(getRunAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMyMarket.pending, (state) => {
        state.loadingMyMarket = true;
        state.success = false;
        state.error = null;
        state.myMarketList = [];
      })
      .addCase(getMyMarket.fulfilled, (state, action) => {
        state.loadingMyMarket = false;
        state.success = true;
        state.myMarketList = action.payload;
      })
      .addCase(getMyMarket.rejected, (state, action) => {
        state.loadingMyMarket = false;
        state.error = action?.error?.message;
      })
      .addCase(updateBetsPlaced.fulfilled, (state, action) => {
        const betId = action.payload?.betId;

        const isBetAlreadyPlaced = state.placedBets?.some(
          (item: any) => item?.id === betId
        );
        if (!isBetAlreadyPlaced) {
          state.placedBets = [action.payload, ...state.placedBets];
        }
      })
      .addCase(betsSuccessReset, (state) => {
        return { ...state, success: false };
      })
      .addCase(updateDeleteReasonBet.fulfilled, (state, action) => {
        const { betPlacedId, deleteReason } = action.payload;
        const updateDeleteReason = (bet: any) => {
          if (betPlacedId?.includes(bet?.id)) {
            bet.deleteReason = deleteReason;
          }

          return bet;
        };

        const updatedBetPlaced = state.placedBets?.map(updateDeleteReason);

        state.placedBets = Array.from(new Set(updatedBetPlaced));
      })
      .addCase(updatePlacedbetsDeleteReason.fulfilled, (state, action) => {
        const { betIds, deleteReason } = action.payload;
        const updateDeleteReason = (bet: any) => {
          if (betIds?.includes(bet?.id)) {
            bet.deleteReason = deleteReason;
          }

          return bet;
        };

        const updatedBetPlaced = state.placedBets?.map(updateDeleteReason);

        state.placedBets = Array.from(new Set(updatedBetPlaced));
      })
      .addCase(updateRunAmountOnDeleteBet.fulfilled, (state, action) => {
        const { betId, profitLoss } = action.payload;
        if (betId === state.runAmount?.betId) {
          state.runAmount = {
            ...state.runAmount,
            runAmount: profitLoss?.betPlaced,
          };
        }
      })
      .addCase(resetRunAmount.fulfilled, (state, action) => {
        const { id } = action.payload;
        if (state.runAmount?.betId === id) {
          state.runAmount = {};
        }
        // return { ...state, runAmount: [] };
      })
      .addCase(resetRunAmountModal.fulfilled, (state, action) => {
        const { id, showModal } = action.payload;
        if (showModal) {
          state.runAmountModal = showModal;
        } else {
          if (state.runAmount?.betId === id) {
            state.runAmountModal = showModal;
          }
        }
      });
  },
});

export const placedBetReducer = placedBet.reducer;
