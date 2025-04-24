import { createSlice } from "@reduxjs/toolkit";
import {
    getCardReport,
    getCasinoReportGameList,
    getLiveCasinoBets,
    resetCardReport,
} from "../../actions/user/userAction";

interface INITIALSTATE {
  cardReport: any;
  loading: boolean;
  success: boolean;
  error: any;
  casinoReportGameList: any;
  liveCasinoBets: any;
}

const initialState: INITIALSTATE = {
  cardReport: null,
  loading: false,
  success: false,
  error: null,
  casinoReportGameList: [],
  liveCasinoBets: null,
};

const reportSlice = createSlice({
  name: "cardReportSlice",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCardReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCardReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cardReport = action.payload;
      })
      .addCase(getCardReport.rejected, (state, action) => {
        state.loading = false;
        state.error == action.error?.message;
      })
      .addCase(resetCardReport, (state) => {
        state.cardReport = null;
      })
      .addCase(getCasinoReportGameList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getCasinoReportGameList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.casinoReportGameList = action.payload;
      })
      .addCase(getCasinoReportGameList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getLiveCasinoBets.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getLiveCasinoBets.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.liveCasinoBets = action.payload;
      })
      .addCase(getLiveCasinoBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export const reportSliceReducers = reportSlice.reducer;
