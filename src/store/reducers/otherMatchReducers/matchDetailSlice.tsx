import { createSlice } from "@reduxjs/toolkit";
import {
  SearchList,
  SearchListReset,
  searchListReset,
  selectedBetAction,
} from "../../actions/match/matchListAction";
import {
  updateBalance,
  updateMaxLossForBet,
} from "../../actions/user/userAction";
import {
  otherMatchDetailAction,
  updateMatchRates,
} from "../../actions/otherMatchActions";

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
          sessionBettings: newSessionBettings?.map((item: any) => {
            if (!JSON.parse(item)?.selectionId) {
              const parsedItem = JSON.parse(item);
              let id = parsedItem?.id;
              const matchingSession = sessionBettings.find(
                (sessionItem: any) => JSON.parse(sessionItem).id === id
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
              const matchingApiSession = apiSession.find(
                (sessionItem: any) => sessionItem.id === id
              );
              if (matchingApiSession) {
                return JSON.stringify({
                  ...parsedItem,
                  yesRate: matchingApiSession.BackPrice1,
                  yesPercent: matchingApiSession.BackSize1,
                  noRate: matchingApiSession.LayPrice1,
                  noPercent: matchingApiSession.LaySize1,
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
      .addCase(updateBalance.fulfilled, (state, action) => {
        const { matchBetType, newTeamRateData } = action.payload;
        if (["tiedMatch1", "tiedMatch2"].includes(matchBetType)) {
          state.otherMatchDetails = {
            ...state.otherMatchDetails,
            profitLossDataMatch: {
              ...state.otherMatchDetails.profitLossDataMatch,
              yesRateTie: newTeamRateData.teamA,
              noRateTie: newTeamRateData.teamB,
            },
          };
        } else if (["completeMatch"].includes(matchBetType)) {
          state.otherMatchDetails = {
            ...state.otherMatchDetails,
            profitLossDataMatch: {
              ...state.otherMatchDetails.profitLossDataMatch,
              yesRateComplete: newTeamRateData.teamA,
              noRateComplete: newTeamRateData.teamB,
            },
          };
        } else {
          state.otherMatchDetails = {
            ...state.otherMatchDetails,
            profitLossDataMatch: {
              ...state.otherMatchDetails.profitLossDataMatch,
              teamARate: newTeamRateData.teamA,
              teamBRate: newTeamRateData.teamB,
              teamCRate: newTeamRateData.teamC,
            },
          };
        }
      })
      .addCase(updateMaxLossForBet.fulfilled, (state, action) => {
        const { betPlaced, profitLossData } = action.payload;
        if (state?.otherMatchDetails?.id === betPlaced?.placedBet?.matchId) {
          const updatedProfitLossDataSession =
            state.otherMatchDetails?.profitLossDataSession.map((item: any) => {
              if (item?.betId === betPlaced?.placedBet?.betId) {
                return {
                  ...item,
                  maxLoss: JSON.parse(profitLossData)?.maxLoss,
                  totalBet: +item?.totalBet + 1,
                };
              }
              return item;
            });

          const betIndex = updatedProfitLossDataSession.findIndex(
            (item: any) => item?.betId === betPlaced?.placedBet?.betId
          );
          if (betIndex === -1) {
            updatedProfitLossDataSession.push({
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

export const matchDetailReducers = otherMatchDetail.reducer;
