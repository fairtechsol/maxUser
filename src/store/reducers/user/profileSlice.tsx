import { createSlice } from "@reduxjs/toolkit";
import {
  getButtonValue,
  getProfile,
  marqueeNotification,
  setButtonValue,
} from "../../actions/user/userAction";

interface InitialState {
  transactionPassword: string;
  profileDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
  marqueeNotification: any;
  getProfile: any;
  buttonValues: any;
  setButtonValue: any;
}

const initialState: InitialState = {
  getProfile: null,
  marqueeNotification: null,
  transactionPassword: "",
  buttonValues: [],
  setButtonValue: null,
  profileDetail: null,
  loading: false,
  success: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(marqueeNotification.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(marqueeNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.marqueeNotification = action.payload;
      })
      .addCase(marqueeNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.getProfile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(setButtonValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setButtonValue.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setButtonValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getButtonValue.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getButtonValue.fulfilled, (state, action) => {
        state.buttonValues = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getButtonValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const profileReducer = profileSlice.reducer;
