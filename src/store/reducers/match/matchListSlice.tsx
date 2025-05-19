import { createSlice } from "@reduxjs/toolkit";
import {
  SearchList,
  SearchListReset,
  getMatchList,
  getMatchListSearch,
  getTabList,
  matchDetailAction,
  matchDetailReset,
  matchListReset,
  resetMarketId,
  resetMatchListSuccess,
  searchListReset,
  selectedBetAction,
  updateMatchDetailFromMatchList,
  updateMatchRates,
  updateMatchRatesFromApiOnList,
} from "../../actions/match/matchListAction";
import {
  updateBalance,
  updateBetDataOnDeclare,
  updateBetDataOnUndeclare,
  updateMaxLossForBet,
  updateProfitLossOnDeleteSession,
  updateTeamRateOnUndeclare,
  updateTeamRatesOnDeleteMatch,
} from "../../actions/user/userAction";

interface InitialState {
  success: boolean;
  matchListSuccess: boolean;
  loading: boolean;
  error: any;
  matchList: any;
  matchListCricket: any;
  matchListFootball: any;
  matchListTennis: any;
  tabList: any;
  getMatchListBySearch: any;
  matchDetails: any;
  selectedBet: any;
  searchedMatchList: any;
  marketId: string;
  liveScoreBoardData?: any;
}

const initialState: InitialState = {
  matchList: [],
  matchListCricket: [],
  matchListFootball: [],
  matchListTennis: [],
  tabList: [],
  getMatchListBySearch: [],
  loading: false,
  success: false,
  matchListSuccess: false,
  error: null,
  matchDetails: null,
  selectedBet: null,
  searchedMatchList: null,
  marketId: "",
  liveScoreBoardData: null,
};

const matchListSlice = createSlice({
  name: "match",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMatchList.fulfilled, (state, action) => {
        const { type, data, matchType } = action.payload;
        state.loading = false;
        state.matchListSuccess = true;
        if (type == "search") {
          state.searchedMatchList = data;
        } else if (matchType === "cricket") {
          state.matchListCricket = data;
        } else if (matchType === "football") {
          state.matchListFootball = data;
        } else if (matchType === "tennis") {
          state.matchListTennis = data;
        } else {
          state.matchList = data;
        }
      })
      .addCase(getMatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetMatchListSuccess, (state) => {
        state.matchListSuccess = false;
      })
      .addCase(getTabList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTabList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tabList = action.payload?.data;
      })
      .addCase(getTabList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(SearchList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(SearchList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.getMatchListBySearch = action.payload;
      })
      .addCase(SearchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(SearchListReset, (state) => {
        state.success = false;
        state.getMatchListBySearch = [];
      })
      .addCase(updateMatchDetailFromMatchList.fulfilled, (state, action) => {
        state.matchDetails = action.payload;
      })
      .addCase(matchDetailAction.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(matchDetailAction.fulfilled, (state, action) => {
        state.success = true;
        state.matchDetails = {
          ...state.matchDetails,
          isBookmaker: action.payload.isBookmaker,
          marketId: action.payload?.marketId,
          rateThan100: action.payload?.rateThan100,
          title: action.payload?.title,
          manualSessionActive: action.payload?.manualSessionActive,
          eventId: action.payload?.eventId,
          isTv: action.payload?.isTv,
          matchType: action.payload?.matchType,
          betFairSessionMinBet: action.payload?.betFairSessionMinBet,
          competitionId: action.payload?.competitionId,
          teamB: action.payload?.teamB,
          teamA: action.payload?.teamA,
          teamC: action.payload?.teamC ?? null,
          betFairSessionMaxBet: action.payload?.betFairSessionMaxBet,
          startAt: action.payload?.startAt,
          apiSessionActive: action.payload?.apiSessionActive,
          competitionName: action.payload?.competitionName,
          id: action.payload?.id,
          isFancy: action.payload?.isFancy,
          teamRates: action.payload?.teamRates,
          profitLossDataSession: action.payload?.profitLossDataSession,
          profitLossDataMatch: action.payload?.profitLossDataMatch,
          stopAt: action.payload?.stopAt ?? null,
        };
        state.marketId = action.payload?.marketId;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        state.loading = false;
        const { apiSession, sessionBettings, tournament, scoreBoard } =
          action.payload;

        state.liveScoreBoardData = scoreBoard?.data;

        state.matchDetails = {
          ...state.matchDetails,
          gmid: action.payload?.gmid,
          manualSessionActive:
            sessionBettings && sessionBettings?.length >= 0 ? true : false,
          apiSessionActive:
            apiSession && apiSession?.length >= 0 ? true : false,
          apiSession: apiSession,
          tournament: tournament?.sort((a: any, b: any) => {
            if (a.sno !== b.sno) {
              return a.sno - b.sno;
            }
            if (a.parentBetId === null && b.parentBetId !== null) return -1;
            if (a.parentBetId !== null && b.parentBetId === null) return 1;
            return 0;
          }),
          sessionBettings: sessionBettings,
        };
      })
      .addCase(updateMatchRatesFromApiOnList.fulfilled, (state, action) => {
        let { data, matchType } = action.payload;
        const ArrayToMap =
          matchType === "cricket"
            ? state.matchListCricket
            : matchType === "football"
            ? state.matchListFootball
            : state.matchListTennis;
        if (ArrayToMap.length > 0) {
          const updatedData = ArrayToMap?.map((items: any) => {
            const itemToUpdate = data?.find(
              (item: any) =>
                +item?.gameId === +items?.eventId ||
                +item?.gmid === +items?.eventId
            );
            return {
              ...items,
              ...itemToUpdate,
            };
          });
          if (matchType === "cricket") {
            state.matchListCricket = updatedData;
          }
          if (matchType === "football") {
            state.matchListFootball = updatedData;
          }
          if (matchType === "tennis") {
            state.matchListTennis = updatedData;
          }
        }
      })
      .addCase(matchListReset, (state) => {
        state.matchList = [];
      })
      .addCase(matchDetailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(selectedBetAction.fulfilled, (state, action) => {
        state.selectedBet = action.payload;
      })
      .addCase(searchListReset, (state) => {
        state.searchedMatchList = null;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        const { newTeamRateData, betId, matchId } = action.payload;
        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails.profitLossDataMatch,
            [betId + "_profitLoss_" + matchId]: JSON.stringify(newTeamRateData),
          },
        };
      })
      .addCase(updateTeamRateOnUndeclare.fulfilled, (state, action) => {
        const { profitLoss, betId, matchId } = action.payload;
        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails.profitLossDataMatch,
            [betId + "_profitLoss_" + matchId]: JSON.stringify(profitLoss),
          },
        };
      })
      .addCase(updateMaxLossForBet.fulfilled, (state, action) => {
        const { betPlaced, profitLossData } = action.payload;
        if (state?.matchDetails?.id === betPlaced?.placedBet?.matchId) {
          const updatedProfitLossDataSession =
            state.matchDetails?.profitLossDataSession?.map((item: any) => {
              if (item?.betId !== betPlaced?.placedBet?.betId) return item;
              return {
                ...item,
                maxLoss: JSON.parse(profitLossData)?.maxLoss,
                totalBet: +item?.totalBet + 1,
                profitLoss: JSON.parse(profitLossData)?.betPlaced,
              };
            });

          const betIndex = updatedProfitLossDataSession?.findIndex(
            (item: any) => item?.betId === betPlaced?.placedBet?.betId
          );
          if (betIndex === -1) {
            updatedProfitLossDataSession?.push({
              betId: betPlaced?.placedBet?.betId,
              maxLoss: JSON.parse(profitLossData)?.maxLoss,
              profitLoss: JSON.parse(profitLossData)?.betPlaced,
              totalBet: 1,
            });
          }

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateBetDataOnDeclare.fulfilled, (state, action) => {
        const { betId, matchId } = action.payload;
        if (state?.matchDetails?.id === matchId) {
          const updatedProfitLossDataSession =
            state.matchDetails?.profitLossDataSession?.filter(
              (item: any) => item?.betId !== betId
            );

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateBetDataOnUndeclare.fulfilled, (state, action) => {
        const { betId, profitLoss, matchId } = action.payload;
        if (state?.matchDetails?.id === matchId) {
          const isBetIdPresent =
            state.matchDetails?.profitLossDataSession?.find(
              (item: any) => item?.betId === betId
            );

          const updatedProfitLossDataSession = isBetIdPresent
            ? state.matchDetails?.profitLossDataSession?.map((item: any) =>
                item?.betId === betId
                  ? {
                      ...item,
                      maxLoss: JSON.parse(profitLoss)?.maxLoss,
                      totalBet: JSON.parse(profitLoss)?.totalBet,
                    }
                  : item
              )
            : [
                ...state.matchDetails?.profitLossDataSession,
                {
                  betId: betId,
                  maxLoss: JSON.parse(profitLoss)?.maxLoss,
                  totalBet: JSON.parse(profitLoss)?.totalBet,
                },
              ];

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateTeamRatesOnDeleteMatch.fulfilled, (state, action) => {
        const { teamRate, betId, matchId } = action.payload;

        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails.profitLossDataMatch,
            [betId + "_profitLoss_" + matchId]: JSON.stringify(teamRate),
          },
        };
      })
      .addCase(updateProfitLossOnDeleteSession.fulfilled, (state, action) => {
        const { betId, profitLoss, matchId } = action.payload;
        if (state?.matchDetails?.id === matchId) {
          const updatedProfitLossDataSession =
            state.matchDetails?.profitLossDataSession?.map((item: any) => {
              if (item?.betId !== betId) return item;
              return {
                ...item,
                maxLoss: profitLoss?.maxLoss,
                totalBet: profitLoss?.totalBet,
              };
            });

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(getMatchListSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMatchListSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.searchedMatchList = action.payload?.data;
      })
      .addCase(getMatchListSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetMarketId, (state) => {
        state.marketId = "";
      })
      .addCase(matchDetailReset, (state) => {
        state.matchDetails = null;
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
