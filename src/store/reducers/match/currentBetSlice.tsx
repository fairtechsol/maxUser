import { createSlice } from "@reduxjs/toolkit";
import {
  betReportList,
  resetDataUnsettledMatch,
  settleUnsettleMatch,
} from "../../actions/match/matchListAction";

interface InitialState {
  ReportBetList: any;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  ReportBetList: [],
  loading: false,
  success: false,
  error: null,
};

const currentBetListSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(betReportList.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(betReportList.fulfilled, (state, action) => {
        state.success = true;
        state.ReportBetList = action.payload;
        state.loading = false;
      })
      .addCase(betReportList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(settleUnsettleMatch.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(settleUnsettleMatch.fulfilled, (state, action) => {
        state.success = true;
        state.ReportBetList = action.payload;
        state.loading = false;
      })
      .addCase(settleUnsettleMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(resetDataUnsettledMatch, (state) => {
        return { ...state, ReportBetList: [], success: false };
      });
  },
});

export const currentBetListReducer = currentBetListSlice.reducer;
