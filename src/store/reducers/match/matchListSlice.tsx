import { createSlice } from "@reduxjs/toolkit";
import { SearchList, SearchListReset, getMatchList } from "../../actions/match/matchListAction";

interface InitialState {
  transactionPassword: string;
  profileDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
  marqueeNotification: any;
  getProfile: any;
  getMatchList: any;
  getMatchListBySearch: any;
}

const initialState: InitialState = {
  getProfile: null,
  getMatchList: null,
  getMatchListBySearch: [],
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
      })
      .addCase(SearchList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(SearchList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.getMatchListBySearch = action.payload;
      })
      .addCase(SearchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(SearchListReset, (state) => {
        // Reset the state to initial state
        return { ...state, success: false, getMatchListBySearch: [] };
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
