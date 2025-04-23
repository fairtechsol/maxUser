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
  searchListReset,
  selectedBetAction,
  updateMatchDetailFromMatchList,
  updateMatchOddRates,
  updateMatchRates,
  updateMatchRatesFromApiOnList,
} from "../../actions/match/matchListAction";
import {
  updateBalance,
  updateBetDataOnDeclare,
  updateBetDataOnUndeclare,
  updateMaxLossForBet,
  updateProfitLossOnDeleteSession,
  updateTeamRatesOnDeleteMatch,
} from "../../actions/user/userAction";

interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
  matchList: any;
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
  tabList: [],
  getMatchListBySearch: [],
  loading: false,
  success: false,
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
        // state.success = false;
        state.error = null;
      })
      .addCase(getMatchList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (action.payload?.type == "search") {
          state.searchedMatchList = action.payload?.data;
        } else {
          state.matchList = action.payload?.data;
        }
      })
      .addCase(getMatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getTabList.pending, (state) => {
        state.loading = true;
        // state.success = false;
        state.error = null;
      })
      .addCase(getTabList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tabList = action.payload?.data;
      })
      .addCase(getTabList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(SearchList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(SearchList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.getMatchListBySearch = action?.payload;
      })
      .addCase(SearchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(SearchListReset, (state) => {
        // Reset the state to initial state
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
        // state.marketId = "";
        // state.matchDetails = null;
      })
      .addCase(matchDetailAction.fulfilled, (state, action) => {
        // state.loading = false;
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
        const { apiSession, sessionBettings, tournament, scoreBoard } =
          action.payload;

        state.loading = false;
        state.liveScoreBoardData = scoreBoard?.data;
        let parsedSessionBettings =
          state.matchDetails?.sessionBettings?.map(JSON.parse) || [];
        const apiParsedSessionBettings = sessionBettings?.map(JSON.parse) || [];
        parsedSessionBettings = apiParsedSessionBettings
          ?.filter(
            (item2: any) =>
              !parsedSessionBettings?.some(
                (item1: any) => item1?.id === item2?.id
              )
          )
          .map((item: any) => item?.id);
        apiParsedSessionBettings.forEach((apiItem: any) => {
          const index = parsedSessionBettings.findIndex(
            (parsedItem: any) => parsedItem.id === apiItem.id
          );
          if (index !== -1) {
            parsedSessionBettings[index] = {
              ...parsedSessionBettings[index],
              ...apiItem,
            };
          } else {
            parsedSessionBettings.push(apiItem);
          }
        });

        const stringifiedSessionBetting = parsedSessionBettings.map(
          JSON.stringify
        );
        state.matchDetails = {
          ...state.matchDetails,
          gmid: action.payload?.gmid,
          manualSessionActive:
            sessionBettings && sessionBettings?.length >= 0 ? true : false,
          apiSessionActive:
            apiSession && apiSession?.length >= 0 ? true : false,
          apiSession: apiSession,
          tournament: tournament?.sort((a: any, b: any) => {
            // Primary sort by sno (ascending)
            if (a.sno !== b.sno) {
              return a.sno - b.sno;
            }
            // If sno values are equal, sort so that null parentId comes first
            if (a.parentBetId === null && b.parentBetId !== null) return -1;
            if (a.parentBetId !== null && b.parentBetId === null) return 1;
            return 0;
          }),
          sessionBettings: stringifiedSessionBetting,
        };
      })
      .addCase(updateMatchOddRates.fulfilled, (state, action) => {
        const { id, matchOdd } = action.payload;
        const indexOfItemToUpdate = state.matchList?.findIndex(
          (item: any) => item?.id === id
        );
        if (indexOfItemToUpdate !== -1) {
          if (state.matchList) {
            state.matchList[indexOfItemToUpdate].matchOdds[0] = matchOdd;
          }
        }
      })
      .addCase(updateMatchRatesFromApiOnList.fulfilled, (state, action) => {
        let matchListFromApi = action.payload;
        if (state.matchList.length > 0) {
          state.matchList = state.matchList?.map((items: any) => {
            const itemToUpdate = matchListFromApi?.find(
              (item: any) =>
                +item?.gameId === +items?.eventId ||
                +item?.gmid === +items?.eventId
            );
            return {
              ...items,
              ...itemToUpdate,
            };
          });
        }
      })
      .addCase(matchListReset, (state) => {
        state.matchList = [];
      })
      .addCase(matchDetailAction.rejected, (state, action) => {
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
        const { newTeamRateData, betId, matchId } = action.payload;
        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails.profitLossDataMatch,
            [betId + "_profitLoss_" + matchId]: JSON.stringify(newTeamRateData),
          },
        };
      })
      .addCase(updateMaxLossForBet.fulfilled, (state, action) => {
        const { betPlaced, profitLossData } = action.payload;
        if (state?.matchDetails?.id === betPlaced?.placedBet?.matchId) {
          const updatedProfitLossDataSession =
            state.matchDetails?.profitLossDataSession?.map((item: any) => {
              if (item?.betId === betPlaced?.placedBet?.betId) {
                return {
                  ...item,
                  maxLoss: JSON.parse(profitLossData)?.maxLoss,
                  totalBet: +item?.totalBet + 1,
                  profitLoss: JSON.parse(profitLossData)?.betPlaced,
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
              profitLoss: JSON.parse(profitLossData)?.betPlaced,
              totalBet: 1,
              // Add other properties as necessary
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
              if (item?.betId === betId) {
                return {
                  ...item,
                  maxLoss: profitLoss?.maxLoss,
                  totalBet: profitLoss?.totalBet,
                };
              }
              return item;
            });

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(getMatchListSearch.pending, (state) => {
        state.loading = true;
        // state.success = false;
        state.error = null;
      })
      .addCase(getMatchListSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.searchedMatchList = action.payload?.data;
      })
      .addCase(getMatchListSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
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
