import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { AxiosError } from "axios";
import { ApiConstants } from "../../../utils/constants";

export const placeBet = createAsyncThunk<any, any>(
  "/placeBet",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(`${requestData.url}`, requestData.data);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getPlacedBets = createAsyncThunk<any, any>(
  "placed/bet",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.BET.GETPLACEDBETS}?result=inArr${JSON.stringify([
          "PENDING",
          "UNDECLARE",
        ])}&betPlaced.matchId=${id}&sort=betPlaced.createdAt:DESC`
      );
      if (resp) {
        return resp?.data?.rows;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getPlacedBetsForAccountStatement = createAsyncThunk<any, any>(
  "placed/betForAccountStatement",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.BET.GETPLACEDBETS}?betId=inArr${JSON.stringify(
          requestData.betId
        )}&createBy=eq${requestData.userId}&status=${
          requestData.status
        }&sort=betPlaced.createdAt:DESC&isCurrentBets=true`
      );
      if (resp) {
        return resp?.data?.rows;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getRunAmount = createAsyncThunk<any, any>(
  "/runAmount",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(`${ApiConstants.BET.RUN_AMOUNT}/${id}`);
      if (resp?.data?.profitLoss) {
        let data = {
          id: id,
          arr: JSON.parse(resp?.data?.profitLoss[0])
            ? JSON.parse(resp?.data?.profitLoss).betPlaced
            : [],
        };
        return data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMyMarket = createAsyncThunk<any>(
  "/myMarket",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(`${ApiConstants.BET.MY_MARKET}`);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateBetsPlaced: any = createAsyncThunk<any, any>(
  "/placed/bets",
  async (placedBets) => {
    return placedBets;
  }
);
export const resetRunAmountModal: any = createAsyncThunk<any, any>(
  "/resetRunAmountModal/reset",
  async (placedBets) => {
    return placedBets;
  }
);
export const resetRunAmount: any = createAsyncThunk<any, any>(
  "/resetRunAmount/reset",
  async (placedBets) => {
    return placedBets;
  }
);
export const betsSuccessReset = createAction("success/reset");
export const betPlaceSuccessReset = createAction("betPlaceSuccess/reset");
