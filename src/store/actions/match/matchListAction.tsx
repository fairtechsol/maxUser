import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/constants";

export const getMatchList = createAsyncThunk<any>("/match/list", async () => {
  try {
    const resp = await service.get(`${ApiConstants.MATCH.MATCHLIST}`);
    if (resp) {
      return resp?.data?.matches;
    }
  } catch (error: any) {
    const err = error as AxiosError;
    throw err;
  }
});

export const matchDetailAction = createAsyncThunk<any, any>(
  "/match/details",
  async (matchId) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.MATCHDETAILS}${matchId}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);
