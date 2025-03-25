import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserBalanceOnPlaceBet = createAsyncThunk<any, any>(
  "/userBalance/onPlaceBetOtherGames",
  async (matchDetails) => {
    return matchDetails;
  }
);
