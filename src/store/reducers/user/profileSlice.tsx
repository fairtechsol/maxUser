import { createSlice } from "@reduxjs/toolkit";
import {
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
}

const initialState: InitialState = {
  marqueeNotification: null,
  transactionPassword: "",
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
      });
  },
});

export const profileReducer = profileSlice.reducer;
