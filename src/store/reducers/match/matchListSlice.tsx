import { createSlice } from "@reduxjs/toolkit";
import {
  SearchList,
  SearchListReset,
  getMatchList,
  matchDetailAction,
  matchListReset,
  searchListReset,
  selectedBetAction,
  updateMatchOddRates,
  updateMatchRates,
} from "../../actions/match/matchListAction";
import {
  updateBalance,
  updateBetDataOnDeclare,
  updateBetDataOnUndeclare,
  updateMaxLossForBet,
  updateProfitLossOnDeleteSession,
  updateTeamRatesOnDeleteMatch,
} from "../../actions/user/userAction";
import { profitLossDataForMatchConstants } from "../../../utils/constants";

interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
  matchList: any;
  getMatchListBySearch: any;
  matchDetails: any;
  selectedBet: any;
  searchedMatchList: any;
}

const initialState: InitialState = {
  matchList: [],
  getMatchListBySearch: [],
  loading: false,
  success: false,
  error: null,
  matchDetails: null,
  selectedBet: null,
  searchedMatchList: null,
};

const matchListSlice = createSlice({
  name: "match",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchList.pending, (state) => {
        state.loading = true;
        state.success = false;
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
      .addCase(matchDetailAction.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(matchDetailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchDetails = action.payload;
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

        let removedsessionBettings =
          state.matchDetails?.sessionBettings?.filter((item: any) => {
            return apiSession?.some(
              (apiItem: any) => apiItem?.id === JSON.parse(item)?.id
            );
          });

        let newSessionBettings = removedsessionBettings?.filter((item: any) => {
          return sessionBettings?.some(
            (apiItem: any) => JSON.parse(apiItem)?.id === JSON.parse(item)?.id
          );
        });

        apiSession?.forEach((apiItem: any) => {
          if (
            !newSessionBettings?.some(
              (item: any) => JSON.parse(item)?.id === apiItem?.id
            )
          ) {
            newSessionBettings?.push(
              JSON.stringify({
                id: apiItem?.id,
                name: apiItem?.RunnerName,
                yesRate: apiItem?.BackPrice1,
                yesPercent: apiItem?.BackSize1,
                noRate: apiItem?.LayPrice1,
                noPercent: apiItem?.LaySize1,
                selectionId: apiItem?.SelectionId,
                minBet: apiItem?.min,
                maxBet: apiItem?.max,
                activeStatus: apiItem?.activeStatus,
                updatedAt: apiItem?.updatedAt,
                type: "session",
                isManual: false,
                status:
                  apiItem?.GameStatus === "" ? "active" : apiItem?.GameStatus,
              })
            );
          }
        });
        sessionBettings?.forEach((apiItem: any) => {
          if (
            !newSessionBettings?.some(
              (item: any) => JSON.parse(item)?.id === apiItem?.id
            )
          ) {
            newSessionBettings?.push(apiItem);
          }
        });

        state.matchDetails = {
          ...state.matchDetails,
          manualSessionActive:
            sessionBettings && sessionBettings?.length >= 0 ? true : false,
          apiSessionActive:
            apiSession && apiSession?.length >= 0 ? true : false,
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
                  activeStatus: matchingApiSession?.activeStatus,
                  status:
                    matchingApiSession?.GameStatus === ""
                      ? "active"
                      : matchingApiSession?.GameStatus,
                });
              } else {
                return JSON.stringify({
                  ...parsedItem,
                  noRate: 0,
                  yesRate: 0,
                  yesPercent: 0,
                  noPercent: 0,
                  activeStatus:
                    parsedItem?.activeStatus === "live"
                      ? "save"
                      : parsedItem?.activeStatus,
                  status:
                    matchingApiSession?.GameStatus === ""
                      ? "active"
                      : matchingApiSession?.GameStatus,
                });
              }
            }
          }),
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
        const { matchBetType, newTeamRateData } = action.payload;
        if (["tiedMatch1", "tiedMatch2"].includes(matchBetType)) {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              yesRateTie: newTeamRateData?.teamA,
              noRateTie: newTeamRateData?.teamB,
            },
          };
        } else if (["completeMatch"].includes(matchBetType)) {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              yesRateComplete: newTeamRateData?.teamA,
              noRateComplete: newTeamRateData?.teamB,
            },
          };
        } else {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              teamARate: newTeamRateData?.teamA,
              teamBRate: newTeamRateData?.teamB,
              teamCRate: newTeamRateData?.teamC,
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
          matchBetType,
          redisObject,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
        } = action.payload;
        if (redisObject[teamCrateRedisKey]) {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails?.profitLossDataMatch,
              [profitLossDataForMatchConstants[matchBetType].A]:
                redisObject[teamArateRedisKey],
              [profitLossDataForMatchConstants[matchBetType].B]:
                redisObject[teamBrateRedisKey],
              [profitLossDataForMatchConstants[matchBetType].C]:
                redisObject[teamCrateRedisKey],
            },
          };
        } else {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails?.profitLossDataMatch,
              [profitLossDataForMatchConstants[matchBetType].A]:
                redisObject[teamArateRedisKey],
              [profitLossDataForMatchConstants[matchBetType].B]:
                redisObject[teamBrateRedisKey],
            },
          };
        }
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
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
