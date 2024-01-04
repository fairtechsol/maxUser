import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/constants";

export const getMatchList = createAsyncThunk<any, any>(
  "/match/list",
  async ({ type, searchKeyword, matchType }) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.MATCHLIST}${
          type == "search"
            ? `?searchBy=title&keyword=${searchKeyword || ""}`
            : ""
        }${matchType ? `?match.matchType=${matchType}` : ""}`
      );
      if (resp) {
        return { data: resp?.data?.matches, type: type };
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

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

export const selectedBetAction = createAsyncThunk<any, any>(
  "/match/selectedBet",
  async (data) => {
    return data;
  }
);

export const getCompetitionList = createAsyncThunk<any, any>(
  "competition/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.EXPERT.COMPETITIONLIST}${requestData}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getCompetitionDates = createAsyncThunk<any, any>(
  "competition/dates",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.EXPERT.COMPETITIONDATES}${requestData}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getCompetitionMatches = createAsyncThunk<any, any>(
  "competition/matches",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.EXPERT.COMPETITIONMATCHES}${requestData?.id}/${requestData?.date}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateMatchRates = createAsyncThunk<any, any>(
  "/match/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);

export const searchListReset = createAction("search/list");
