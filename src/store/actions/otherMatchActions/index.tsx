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
