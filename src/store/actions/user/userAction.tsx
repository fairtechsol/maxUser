import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/constants";

export const marqueeNotification = createAsyncThunk<any>(
  "user/notification",
  async () => {
    try {
      const resp = await service.get(`${ApiConstants.USER.MARQUEE}`);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);
export const getBannerImage = createAsyncThunk<string, any>(
  "/user/bannerImage",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.MARQUEE}?type=banner${requestData}`
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

export const getProfile = createAsyncThunk<any>("/user/profile", async () => {
  try {
    const resp = await service.get(`${ApiConstants.USER.GET_PROFILE}`);
    if (resp) {
      return resp?.data;
    }
  } catch (error: any) {
    const err = error as AxiosError;
    throw err;
  }
});

export const getAccountStatement = createAsyncThunk<any, any>(
  "user/account/statement",
  async ({ userId, page, limit, searchBy, keyword, filter }) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.ACCOUNT_STATEMENT}${userId}?page=${
          page || 1
        }&limit=${limit || 15}&searchBy=${searchBy}&keyword=${
          keyword || ""
        }&sort=transaction.createdAt:DESC,transaction.uniqueId:DESC${filter}`
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
export const getCardReport = createAsyncThunk<any, any>(
  "user/card/report",
  async ({ type, page, limit, searchBy, keyword, filter }) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.CARD_REPORT}${type}?page=${page || 1}&limit=${
          limit || 15
        }&searchBy=${searchBy}&keyword=${
          keyword || ""
        }&sort=cardResult.createdAt:DESC${filter}`
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

export const getButtonValue = createAsyncThunk<any>(
  "user/getButtonValue",
  async () => {
    try {
      const { data } = await service.get(
        `${ApiConstants.USER.GET_BTN_VALUE}?type=Match`
      );
      return data[0];
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);
export const getCasinoButtonValue = createAsyncThunk<any>(
  "user/getCasinoButtonValue",
  async () => {
    try {
      const { data } = await service.get(
        `${ApiConstants.USER.GET_BTN_VALUE}?type=Casino`
      );
      return data[0];
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);
export const setButtonValue = createAsyncThunk<any, any>(
  "/setButtonValues",
  async (requestData) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.SET_BTN_VALUE}`,
        requestData
      );
      if (resp) {
        let data = {
          id: requestData?.id,
          type: requestData?.type,
          value: resp?.data,
        };
        return data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const getProfileInMatchDetail = createAsyncThunk<any>(
  "/user/profileInMatchDetail",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(`${ApiConstants.USER.GET_PROFILE}`);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getCasinoReportGameList = createAsyncThunk<any>(
  "casino/report/gameList",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.USER.CASINO_GAME_PROVIDERS);
      if (resp?.data) {
        return resp?.data?.map((item: any) => ({
          label: item,
          value: item,
        }));
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getLiveCasinoBets = createAsyncThunk<any, any>(
  "LiveCasinoBets/report",
  async ({ id, page, limit, searchBy, keyword, filter, sort }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.LIVE_CASINO_BETS}/${id}?page=${page || 1}&limit=${
          limit || 15
        }&searchBy=${searchBy}&keyword=${keyword}${filter ? filter : ""}&sort=${
          sort ? sort : ""
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
export const updateBalance = createAsyncThunk<any, any>(
  "/user/balance",
  async (balance) => {
    return balance;
  }
);

export const updateBalanceOnSessionBet = createAsyncThunk<any, any>(
  "/user/balanceOnSessionBetUpdate",
  async (balance) => {
    return balance;
  }
);

export const updateBalanceOnSessionResult = createAsyncThunk<any, any>(
  "/user/balanceOnSessionResult",
  async (balance) => {
    return balance;
  }
);
export const updateBetDataOnDeclare = createAsyncThunk<any, any>(
  "/user/betData/declare",
  async (balance) => {
    return balance;
  }
);

export const updateBetDataOnUndeclare = createAsyncThunk<any, any>(
  "/user/betData/undeclare",
  async (data) => {
    return data;
  }
);

export const betDataFromSocket = createAsyncThunk<any, any>(
  "/betData/update",
  async (data) => {
    return data;
  }
);
export const updateMaxLossForBet = createAsyncThunk<any, any>(
  "/maxLoss/update",
  async (data) => {
    return data;
  }
);

export const updateBalanceOnBetDelete = createAsyncThunk<any, any>(
  "/user/balanceOnBetDelete",
  async (data) => {
    return data;
  }
);

export const updateTeamRatesOnDeleteMatch = createAsyncThunk<any, any>(
  "/user/profitLoss/deleteMatchBets",
  async (data) => {
    return data;
  }
);
export const updateTeamRatesOnDeleteMatchOther = createAsyncThunk<any, any>(
  "/user/profitLoss/deleteMatchBetsOther",
  async (data) => {
    return data;
  }
);

export const updateDeleteReasonBet = createAsyncThunk<any, any>(
  "/deleteReason/bets",
  async (placedBets) => {
    return placedBets;
  }
);
export const updatePlacedbetsDeleteReason = createAsyncThunk<any, any>(
  "/updatePlacedbetsDeleteReason/bets",
  async (data) => {
    return data;
  }
);

export const updateProfitLossOnDeleteSession = createAsyncThunk<any, any>(
  "/user/profitLoss/deleteSession",
  async (data) => {
    return data;
  }
);

export const updateRunAmountOnDeleteBet = createAsyncThunk<any, any>(
  "/runAmount/updateOnDeleteSessionBet",
  async (data) => {
    return data;
  }
);

export const updateBalanceFromSocket = createAsyncThunk<any, any>(
  "/user/balanceFromSocket",
  async (data) => {
    return data;
  }
);

export const updateMatchRatesOnMarketUndeclare = createAsyncThunk<any, any>(
  "/teamRates/marketUndeclare",
  async (data) => {
    return data;
  }
);

export const changePasswordReset = createAction("changePassword/reset");
export const profileReset = createAction("profile/reset");
export const updateReset = createAction("update/reset");
export const resetCardReport = createAction("cardReport/reset");
