import { createSlice } from "@reduxjs/toolkit";
import { placeBet } from "../../actions/betPlace/betPlaceActions";

interface InitialState {
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  loading: false,
  success: false,
  error: null,
};

const betPlace = createSlice({
  name: "betPlace",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeBet.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(placeBet.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(placeBet.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const betPlaceReducers = betPlace.reducer;
