import { createSlice } from "@reduxjs/toolkit";
import { getMatchList } from "../../actions/match/matchListAction";

interface InitialState {
  transactionPassword: string;
  profileDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
  marqueeNotification: any;
  getProfile: any;
  getMatchList: any;
}

const initialState: InitialState = {
  getProfile: null,
  getMatchList: null,
  marqueeNotification: null,
  transactionPassword: "",
  profileDetail: null,
  loading: false,
  success: false,
  error: null,
};

const matchListSlice = createSlice({
  name: "profile",
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
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
