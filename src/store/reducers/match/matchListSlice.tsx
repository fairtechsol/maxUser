import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchList,
  matchDetailAction,
  searchListReset,
  selectedBetAction,
} from "../../actions/match/matchListAction";

interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
  getMatchList: any;
  matchDetails: any;
  selectedBet: any;
  searchedMatchList: any;
}

const initialState: InitialState = {
  getMatchList: null,
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
          state.searchedMatchList = action.payload.data;
        } else {
          state.getMatchList = action.payload.data;
        }
      })
      .addCase(getMatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
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
      .addCase(matchDetailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(selectedBetAction.fulfilled, (state, action) => {
        state.selectedBet = action.payload;
      })
      .addCase(searchListReset, (state) => {
        state.searchedMatchList = null;
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
