import { createSlice } from "@reduxjs/toolkit";
import {
  betsSuccessReset,
  getMyMarket,
  getPlacedBets,
  getPlacedBetsForAccountStatement,
  getRunAmount,
  getRunAmountMeter,
  resetRunAmount,
  resetRunAmountModal,
  resetRunAmountModal1,
  runAmountReset,
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
  runAmountModal1: boolean;
  title?:any;
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
  runAmountModal1: false,
  title: null
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
        let dataArr:any=[]
        state.loading = false;
        state.success = true;
        // dataArr=arr?.slice(1)
        // console.log(arr,'dataArr',dataArr)
        if(arr.every((bet:any) => bet.profitLoss >= 0) || arr.every((bet:any) => bet.profitLoss >= 0)){
          if(arr?.length > 8){
            dataArr=arr?.slice(4,arr?.length-4)
          }else{
            dataArr=arr
          }
        }else{
          if(arr?.length > 8){
            const findTransitionIndex = (arr:any) => {
              for (let i = 1; i < arr.length; i++) {
                if (
                  (arr[i - 1].profitLoss < 0 && arr[i].profitLoss >= 0) || 
                  (arr[i - 1].profitLoss >= 0 && arr[i].profitLoss < 0)   
                ) {
                    // console.log('first',i)
                      return i;
                  }
              }
              return -1; 
          };
          const transitionIndex = findTransitionIndex(arr);
          if(transitionIndex>4){
            let count = arr?.length-transitionIndex > 4 ? 4 : arr?.length-transitionIndex
            dataArr=arr?.slice(4,arr?.length-count)
          }else{
            dataArr=arr?.slice(transitionIndex-1,arr?.length-4)
          }
          }else{
            dataArr=arr
          }
         
        }
        // const modifiedBets= arr?.slice(4,arr?.length-5)
        // console.log('arrz',arr?.slice(1))
        let data = {
          betId: id,
          runAmountData: dataArr?.length > 0 ? dataArr : [],
        };
        state.runAmount = data;
      })
      .addCase(getRunAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getRunAmountMeter.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.runAmount = [];
      })
      .addCase(getRunAmountMeter.fulfilled, (state, action) => {
        const { id, arr } = action.payload;
        const modifiedBets= arr
        state.loading = false;
        state.success = true;
        let data = {
          betId: id,
          runAmountData: modifiedBets?.length > 0 ? modifiedBets : [],
        };
        state.runAmount = data;
      })
      .addCase(getRunAmountMeter.rejected, (state, action) => {
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
        const { id, showModal, title } = action.payload;
        if (showModal) {
          state.runAmountModal = showModal;
          state.title = title;
        } else {
          if (state.runAmount?.betId === id) {
            state.runAmountModal = showModal;
          }
          state.title = null;

        }
      })
      .addCase(runAmountReset, (state) => {
        state.runAmount = {};
      })
      .addCase(resetRunAmountModal1.fulfilled, (state, action) => {
        // console.log('first',action.payload)
        const { id, showModal } = action.payload;
        if (showModal) {
          state.runAmountModal1 = showModal;
        } else {
          if (state.runAmount?.betId === id) {
            state.runAmountModal1 = showModal;
          }
        }
      });
  },
});

export const placedBetReducer = placedBet.reducer;
