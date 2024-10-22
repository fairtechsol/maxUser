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
        const {
          apiSession,
          apiTiedMatch,
          apiTiedMatch2,
          other,
          bookmaker,
          bookmaker2,
          marketCompleteMatch,
          marketCompleteMatch1,
          matchOdd,
          sessionBettings,
          manualTideMatch,
          quickbookmaker,
          firstHalfGoal,
          halfTime,
          overUnder,
          setWinner,
          completeManual,
          tournament,
        } = action.payload;

        // let removedsessionBettings =
        //   state.matchDetails?.sessionBettings?.filter((item: any) => {
        //     return apiSession?.some(
        //       (apiItem: any) => apiItem?.id === JSON.parse(item)?.id
        //     );
        //   });

        // let newSessionBettings = removedsessionBettings?.filter((item: any) => {
        //   return sessionBettings?.some(
        //     (apiItem: any) => JSON.parse(apiItem)?.id === JSON.parse(item)?.id
        //   );
        // });

        // apiSession?.forEach((apiItem: any) => {
        //   if (
        //     !newSessionBettings?.some(
        //       (item: any) => JSON.parse(item)?.id === apiItem?.id
        //     )
        //   ) {
        //     newSessionBettings?.push(
        //       JSON.stringify({
        //         id: apiItem?.id,
        //         name: apiItem?.RunnerName,
        //         yesRate: apiItem?.BackPrice1,
        //         yesPercent: apiItem?.BackSize1,
        //         noRate: apiItem?.LayPrice1,
        //         noPercent: apiItem?.LaySize1,
        //         selectionId: apiItem?.SelectionId,
        //         minBet: apiItem?.min,
        //         maxBet: apiItem?.max,
        //         activeStatus: apiItem?.activeStatus,
        //         updatedAt: apiItem?.updatedAt,
        //         type: "session",
        //         isManual: false,
        //         status:
        //           apiItem?.GameStatus === "" ? "active" : apiItem?.GameStatus,
        //       })
        //     );
        //   }
        // });
        // sessionBettings?.forEach((apiItem: any) => {
        //   if (
        //     !newSessionBettings?.some(
        //       (item: any) => JSON.parse(item)?.id === apiItem?.id
        //     )
        //   ) {
        //     newSessionBettings?.push(apiItem);
        //   }
        // });
        state.loading = false;
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
        const updatedOther = state.matchDetails?.other?.map((item: any) => {
          const updatedItem = other.find(
            (newItem: any) => newItem.id === item.id
          );

          if (updatedItem) {
            return {
              ...item,
              ...updatedItem,
            };
          }

          return item;
        });
        state.matchDetails = {
          ...state.matchDetails,
          manualSessionActive:
            sessionBettings && sessionBettings?.length >= 0 ? true : false,
          apiSessionActive:
            apiSession && apiSession?.length >= 0 ? true : false,
          apiSession: apiSession,
          apiTideMatch: apiTiedMatch,
          apiTideMatch2: apiTiedMatch2,
          bookmaker: bookmaker,
          bookmaker2: bookmaker2,
          other,
          tournament: tournament,
          manualTiedMatch: manualTideMatch,
          marketCompleteMatch: marketCompleteMatch,
          marketCompleteMatch1: marketCompleteMatch1,
          manualCompleteMatch: completeManual,
          matchOdd: matchOdd,
          quickBookmaker: quickbookmaker,
          firstHalfGoal,
          halfTime,
          overUnder,
          setWinner,
          sessionBettings: stringifiedSessionBetting,
          // sessionBettings: newSessionBettings?.map((item: any) => {
          //   if (!JSON.parse(item)?.selectionId) {
          //     const parsedItem = JSON.parse(item);
          //     let id = parsedItem?.id;
          //     const matchingSession = sessionBettings?.find(
          //       (sessionItem: any) => JSON.parse(sessionItem)?.id === id
          //     );
          //     let parsedSession = JSON.parse(matchingSession);
          //     if (parsedSession) {
          //       return JSON.stringify({
          //         ...parsedItem,
          //         ...parsedSession,
          //       });
          //     } else return JSON.stringify(parsedItem);
          //   } else {
          //     const parsedItem = JSON.parse(item);
          //     let id = parsedItem?.id;
          //     const matchingApiSession = apiSession?.find(
          //       (sessionItem: any) => sessionItem?.id === id
          //     );
          //     if (matchingApiSession) {
          //       return JSON.stringify({
          //         ...parsedItem,
          //         yesRate: matchingApiSession?.BackPrice1,
          //         yesPercent: matchingApiSession?.BackSize1,
          //         noRate: matchingApiSession?.LayPrice1,
          //         noPercent: matchingApiSession?.LaySize1,
          //         activeStatus: matchingApiSession?.activeStatus,
          //         status:
          //           matchingApiSession?.GameStatus === ""
          //             ? "active"
          //             : matchingApiSession?.GameStatus,
          //       });
          //     } else {
          //       return JSON.stringify({
          //         ...parsedItem,
          //         noRate: 0,
          //         yesRate: 0,
          //         yesPercent: 0,
          //         noPercent: 0,
          //         activeStatus:
          //           parsedItem?.activeStatus === "live"
          //             ? "save"
          //             : parsedItem?.activeStatus,
          //         status:
          //           matchingApiSession?.GameStatus === ""
          //             ? "active"
          //             : matchingApiSession?.GameStatus,
          //       });
          //     }
          //   }
          // }),
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
                item?.gameId === items?.eventId || item?.gmid === items?.eventId
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
        const {
          newTeamRateData,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
          betId,
          matchBetType,
          matchId,
        } = action.payload;
        if (matchBetType === "tournament") {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              [betId + "_profitLoss_" + matchId]:
                JSON.stringify(newTeamRateData),
            },
          };
        } else {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              [teamArateRedisKey]: newTeamRateData?.teamA,
              [teamBrateRedisKey]: newTeamRateData?.teamB,
              [teamCrateRedisKey]: newTeamRateData?.teamC,
            },
          };
        }
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
        const {
          redisObject,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
        } = action.payload;
        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails?.profitLossDataMatch,
            [teamArateRedisKey]: redisObject[teamArateRedisKey],
            [teamBrateRedisKey]: redisObject[teamBrateRedisKey],
            [teamCrateRedisKey]: redisObject[teamCrateRedisKey],
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
