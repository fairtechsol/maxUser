import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/constants";

export const getMatchList = createAsyncThunk<any, any>(
  "/match/list",
  async ({ type, searchKeyword, matchType }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.MATCHLIST}?sort=match.startAt:ASC${type == "search"
          ? `&searchBy=title&keyword=${searchKeyword || ""}`
          : ""
        }${matchType ? `&match.matchType=${matchType}` : ""}`
      );
      if (resp) {
        return { data: resp?.data?.matches, type: type };
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getTabList = createAsyncThunk<any, any>(
  "/tab/list",
  async ({ }, thunkApi) => {
    try {
      const resp = await service.get(`${ApiConstants.MATCH.TABLIST}`);
      if (resp) {
        return { data: resp?.data };
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMatchListSearch = createAsyncThunk<any, any>(
  "/match/search",
  async ({ searchKeyword }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.MATCHSEARCHLIST}/${searchKeyword || ""}`
      );
      if (resp) {
        return resp;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const SearchList = createAsyncThunk<any, any>(
  "/match/searchlist",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.MATCHLIST}?searchBy=title&keyword=${requestData?.title ? requestData?.title : ""
        }`
      );
      if (resp) {
        return resp?.data?.matches;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);



export const matchDetailAction = createAsyncThunk<any, any>(
  "/match/details",
  async (matchId, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.MATCHDETAILS}${matchId}`
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

export const setButtonValue = createAsyncThunk<any, any>(
  "/setButtonValues",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.SET_BTN_VALUE}`,
        requestData
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

export const SearchListReset = createAction("searchList/reset");

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
export const betReportList = createAsyncThunk<any, any>(
  "/betReport/",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.CURRENTBET}?status=${requestData.status
        }&betPlaced.eventType=${requestData?.matchType}&keyword=${requestData?.keyword || ""
        }${requestData?.filter || ""}&page=${requestData.page || 1}&limit=${requestData.limit || 10
        }`
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
export const getProfitLossReport = createAsyncThunk<any, any>(
  "/profitLoss/report",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.MATCH.PROFIT_LOSS_REPORT}`,
        requestData
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
export const settleUnsettleMatch = createAsyncThunk<any, any>(
  "/unsettled/bet/",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.CURRENTBET}?${requestData}`
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
        let data = {
          data: resp?.data,
          matchType: requestData?.matchType,
        };
        return data;
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
export const updateMatchOddRates = createAsyncThunk<any, any>(
  "/matchOdd/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);
export const updateMatchDetailFromMatchList = createAsyncThunk<any, any>(
  "/matchDetailFromList/rates",
  async (data) => {
    return data;
  }
);
export const updateMatchRatesFromApiOnList = createAsyncThunk<any, any>(
  "/updateMatchRatesFromApiOnList/rates",
  async (data) => {
    return data;
  }
);

export const searchListReset = createAction("search/list");
export const matchListReset = createAction("matchList/reset");
export const resetDataUnsettledMatch = createAction("dataUnsettledMatch/reset");
export const resetReportBetListData = createAction("resetReportBetListData/reset");
export const resetMarketId = createAction("marketId/reset");
export const matchDetailReset = createAction("matchDetail/reset");
