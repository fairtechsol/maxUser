import { createReducer } from "@reduxjs/toolkit";
import {
  authReset,
  checkOldPassword,
  login,
  rulesModalShowFalse,
  rulesModalShowTrue,
} from "../actions/authAction";

const initialState = {
  success: false,
  loading: false,
  forceChangePassword: false,
  rulesPopShow: false,
  oldPasswordMatched: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.forceChangePassword = action?.payload?.forceChangePassword;
    })
    .addCase(login.rejected, (state) => {
      state.loading = false;
    })
    .addCase(checkOldPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(checkOldPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.oldPasswordMatched = action.payload;
    })
    .addCase(checkOldPassword.rejected, (state) => {
      state.loading = false;
    })
    .addCase(authReset, (state) => {
      // Reset the state to initial state
      return { ...state, success: false, forceChangePassword: false };
    })
    .addCase(rulesModalShowTrue, (state) => {
      // Reset the state to initial state
      return { ...state, rulesPopShow: true };
    })
    .addCase(rulesModalShowFalse, (state) => {
      // Reset the state to initial state
      return { ...state, rulesPopShow: false };
    });
});
