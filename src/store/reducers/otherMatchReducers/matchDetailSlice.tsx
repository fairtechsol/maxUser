import { createSlice } from "@reduxjs/toolkit";
import {
  // SearchList,
  // SearchListReset,
  searchListReset,
  selectedBetAction,
} from "../../actions/match/matchListAction";
import {
  updateBalance,
  updateMaxLossForBet,
} from "../../actions/user/userAction";
import { otherMatchDetailAction } from "../../actions/otherMatchActions";

interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
  matchList: any;
  getMatchListBySearch: any;
  otherMatchDetails: any;
  selectedBet: any;
  searchedMatchList: any;
}

const initialState: InitialState = {
  matchList: [],
  getMatchListBySearch: [],
  loading: false,
  success: false,
  error: null,
  otherMatchDetails: null,
  selectedBet: null,
  searchedMatchList: null,
};

const otherMatchDetail = createSlice({
  name: "match",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(otherMatchDetailAction.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(otherMatchDetailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.otherMatchDetails = action.payload;
      })
      .addCase(otherMatchDetailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(selectedBetAction.fulfilled, (state, action) => {
        state.selectedBet = action.payload;
      })
      .addCase(searchListReset, (state) => {
        state.searchedMatchList = null;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        const { matchBetType, newTeamRateData } = action.payload;
        if (["tiedMatch1", "tiedMatch2"].includes(matchBetType)) {
          state.otherMatchDetails = {
            ...state.otherMatchDetails,
            profitLossDataMatch: {
              ...state.otherMatchDetails.profitLossDataMatch,
              yesRateTie: newTeamRateData?.teamA,
              noRateTie: newTeamRateData?.teamB,
            },
          };
        } else if (["completeMatch"].includes(matchBetType)) {
          state.otherMatchDetails = {
            ...state.otherMatchDetails,
            profitLossDataMatch: {
              ...state.otherMatchDetails.profitLossDataMatch,
              yesRateComplete: newTeamRateData?.teamA,
              noRateComplete: newTeamRateData?.teamB,
            },
          };
        } else {
          state.otherMatchDetails = {
            ...state.otherMatchDetails,
            profitLossDataMatch: {
              ...state.otherMatchDetails.profitLossDataMatch,
              teamARate: newTeamRateData?.teamA,
              teamBRate: newTeamRateData?.teamB,
              teamCRate: newTeamRateData?.teamC,
            },
          };
        }
      })
      .addCase(updateMaxLossForBet.fulfilled, (state, action) => {
        const { betPlaced, profitLossData } = action.payload;
        if (state?.otherMatchDetails?.id === betPlaced?.placedBet?.matchId) {
          const updatedProfitLossDataSession =
            state.otherMatchDetails?.profitLossDataSession?.map((item: any) => {
              if (item?.betId === betPlaced?.placedBet?.betId) {
                return {
                  ...item,
                  maxLoss: JSON.parse(profitLossData)?.maxLoss,
                  totalBet: +item?.totalBet + 1,
                };
              }
              return item;
            });

          const betIndex = updatedProfitLossDataSession?.findIndex(
            (item: any) => item?.betId === betPlaced?.placedBet?.betId
          );
          if (betIndex === -1) {
            updatedProfitLossDataSession?.push({
              betId: betPlaced?.placedBet?.betId,
              maxLoss: JSON.parse(profitLossData)?.maxLoss,
              totalBet: 1,
              // Add other properties as necessary
            });
          }

          state.otherMatchDetails = {
            ...state.otherMatchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        } else {
          return state.otherMatchDetails;
        }
      });
  },
});

export const OtherMatchDetailReducers = otherMatchDetail.reducer;
