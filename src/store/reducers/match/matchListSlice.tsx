import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchList,
  matchDetailAction,
} from "../../actions/match/matchListAction";

interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
  getMatchList: any;
  matchDetails: any;
}

const initialState: InitialState = {
  getMatchList: null,
  loading: false,
  success: false,
  error: null,
  matchDetails: null,
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
        state.getMatchList = action.payload;
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
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
