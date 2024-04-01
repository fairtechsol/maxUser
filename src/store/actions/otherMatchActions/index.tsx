import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { ApiConstants } from "../../../utils/constants";
import { AxiosError } from "axios";

export const otherMatchDetailAction = createAsyncThunk<any, any>(
  "/other/match/details",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.OTHERMATCHDETAILS}${requestData?.matchId}?matchType=${requestData?.matchType}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateMatchRates = createAsyncThunk<any, any>(
  "/match/ratesOtherGames",
  async (matchDetails) => {
    return matchDetails;
  }
);

export const updateTeamRatesOnPlaceBet = createAsyncThunk<any, any>(
  "/team/ratesOnPlaceBetOtherGames",
  async (matchDetails) => {
    return matchDetails;
  }
);
export const updateUserBalanceOnPlaceBet = createAsyncThunk<any, any>(
  "/userBalance/onPlaceBetOtherGames",
  async (matchDetails) => {
    return matchDetails;
  }
);
