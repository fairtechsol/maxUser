import { createSlice } from "@reduxjs/toolkit";
import { profitLossDataForMatchConstants } from "../../../utils/constants";
import {
  // SearchList,
  // SearchListReset,
  searchListReset,
  selectedBetAction,
} from "../../actions/match/matchListAction";
import {
  otherMatchDetailAction,
  updateMatchRates,
  updateTeamRatesOnPlaceBet,
} from "../../actions/otherMatchActions";
import {
  updateMatchRatesOnMarketUndeclare,
  // updateTeamRatesOnDeleteMatch,
  updateTeamRatesOnDeleteMatchOther,
} from "../../actions/user/userAction";

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
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const {
          apiSession,
          apiTiedMatch,
          bookmaker,
          marketCompleteMatch,
          matchOdd,
          sessionBettings,
          manualTideMatch,
          quickbookmaker,
          firstHalfGoal,
          halfTime,
          overUnder,
          setWinner,
        } = action.payload;

        let newSessionBettings = sessionBettings;
        state.otherMatchDetails = {
          ...state.otherMatchDetails,
          manualSessionActive: sessionBettings?.length >= 0 ? true : false,
          apiSessionActive: apiSession?.length >= 0 ? true : false,
          apiSession: apiSession,
          apiTideMatch: apiTiedMatch,
          bookmaker: bookmaker,
          manualTiedMatch: manualTideMatch,
          marketCompleteMatch: marketCompleteMatch,
          matchOdd: matchOdd,
          quickBookmaker: quickbookmaker,
          firstHalfGoal,
          halfTime,
          overUnder,
          setWinner,
          sessionBettings: newSessionBettings?.map((item: any) => {
            if (!JSON.parse(item)?.selectionId) {
              const parsedItem = JSON.parse(item);
              let id = parsedItem?.id;
              const matchingSession = sessionBettings?.find(
                (sessionItem: any) => JSON.parse(sessionItem)?.id === id
              );
              let parsedSession = JSON.parse(matchingSession);
              if (parsedSession) {
                return JSON.stringify({
                  ...parsedItem,
                  ...parsedSession,
                });
              } else return JSON.stringify(parsedItem);
            } else {
              const parsedItem = JSON.parse(item);
              let id = parsedItem?.id;
              const matchingApiSession = apiSession?.find(
                (sessionItem: any) => sessionItem?.id === id
              );
              if (matchingApiSession) {
                return JSON.stringify({
                  ...parsedItem,
                  yesRate: matchingApiSession?.BackPrice1,
                  yesPercent: matchingApiSession?.BackSize1,
                  noRate: matchingApiSession?.LayPrice1,
                  noPercent: matchingApiSession?.LaySize1,
                  activeStatus: "live",
                });
              } else {
                return JSON.stringify({
                  ...parsedItem,
                  noRate: 0,
                  yesRate: 0,
                  yesPercent: 0,
                  noPercent: 0,
                  activeStatus:
                    parsedItem.activeStatus === "live"
                      ? "save"
                      : parsedItem.activeStatus,
                });
              }
            }
          }),
        };
      })
      .addCase(selectedBetAction.fulfilled, (state, action) => {
        state.selectedBet = action.payload;
      })
      .addCase(searchListReset, (state) => {
        state.searchedMatchList = null;
      })
      .addCase(updateTeamRatesOnPlaceBet.fulfilled, (state, action) => {
        const { matchBetType, newTeamRateData } = action.payload;
        if ("teamC" in newTeamRateData) {
          state.otherMatchDetails = {
            ...state.otherMatchDetails,
            profitLossDataMatch: {
              ...state.otherMatchDetails.profitLossDataMatch,
              [profitLossDataForMatchConstants[matchBetType]?.A]:
                newTeamRateData?.teamA,
              [profitLossDataForMatchConstants[matchBetType]?.B]:
                newTeamRateData?.teamB,
              [profitLossDataForMatchConstants[matchBetType]?.C]:
                newTeamRateData?.teamC,
            },
          };
        } else {
          state.otherMatchDetails = {
            ...state.otherMatchDetails,
            profitLossDataMatch: {
              ...state.otherMatchDetails.profitLossDataMatch,
              [profitLossDataForMatchConstants[matchBetType]?.A]:
                newTeamRateData?.teamA,
              [profitLossDataForMatchConstants[matchBetType]?.B]:
                newTeamRateData?.teamB,
            },
          };
        }
      })
      .addCase(updateTeamRatesOnDeleteMatchOther.fulfilled, (state, action) => {
        const {
          matchBetType,
          redisObject,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
        } = action.payload;
        state.otherMatchDetails = {
          ...state.otherMatchDetails,
          profitLossDataMatch: {
            ...state.otherMatchDetails?.profitLossDataMatch,
            [profitLossDataForMatchConstants[matchBetType].A]:
              redisObject[teamArateRedisKey],
            [profitLossDataForMatchConstants[matchBetType].B]:
              redisObject[teamBrateRedisKey],
            [profitLossDataForMatchConstants[matchBetType].C]:
              redisObject[teamCrateRedisKey],
          },
        };
      })
      .addCase(updateMatchRatesOnMarketUndeclare.fulfilled, (state, action) => {
        const {
          profitLossData,
          betType,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
        } = action?.payload;

        state.otherMatchDetails.profitLossDataMatch = {
          ...state.otherMatchDetails.profitLossDataMatch,
          [profitLossDataForMatchConstants[betType].A]:
            profitLossData[teamArateRedisKey],
          [profitLossDataForMatchConstants[betType].B]:
            profitLossData[teamBrateRedisKey],
          [profitLossDataForMatchConstants[betType].C]:
            profitLossData[teamCrateRedisKey],
        };
      });
  },
});

export const matchDetailReducers = otherMatchDetail.reducer;
