import { createReducer } from "@reduxjs/toolkit";
import {
  authReset,
  checkOldPassword,
  login,
  loginWithDemo,
  rulesModalShowFalse,
  rulesModalShowTrue,
} from "../actions/authAction";

const initialState = {
  success: false,
  loading: false,
  loadingDemo: false,
  forceChangePassword: false,
  rulesPopShow: false,
  oldPasswordMatched: false,
  demoDetails: null,
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
    .addCase(loginWithDemo.pending, (state) => {
      state.loadingDemo = true;
    })
    .addCase(loginWithDemo.fulfilled, (state, action) => {
      state.loadingDemo = false;
      state.success = true;
      state.demoDetails = action?.payload;
    })
    .addCase(loginWithDemo.rejected, (state) => {
      state.loadingDemo = false;
    })
    .addCase(checkOldPassword.pending, (state) => {
      state.loading = true;
      state.oldPasswordMatched = false;
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
      state.success = false;
      state.forceChangePassword = false;
    })
    .addCase(rulesModalShowTrue, (state) => {
      // Reset the state to initial state
      state.rulesPopShow = true;
    })
    .addCase(rulesModalShowFalse, (state) => {
      // Reset the state to initial state
      state.rulesPopShow = false;
    });
});
