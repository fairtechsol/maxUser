import { createSlice } from "@reduxjs/toolkit";
import { getCardReport, resetCardReport } from "../../actions/user/userAction";

interface INITIALSTATE {
  cardReport: any;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: INITIALSTATE = {
  cardReport: null,
  loading: false,
  success: false,
  error: null,
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
        state.error == action?.error?.message;
      })
      .addCase(resetCardReport, (state) => {
        state.cardReport = null;
      });
  },
});

export const reportSliceReducers = reportSlice.reducer;
