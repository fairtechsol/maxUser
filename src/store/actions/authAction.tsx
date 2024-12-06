import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../service";
import { ApiConstants } from "../../utils/constants";

interface LoginData {
  userName: string;
  password: string;
  loginType: string;
}

interface ChangePassword {
  userId?: string;
  newPassword: string;
  confirmPassword: string;
  transactionPassword: string;
}

export const login = createAsyncThunk<any, LoginData>(
  "auth/login",
  async (requestData, thunkApi) => {
    try {
      const { data } = await service.post(ApiConstants.LOGIN, requestData);
      if (data) {
        const { token, userId } = data;
        sessionStorage.setItem("jwtMaxUser", token);
        sessionStorage.setItem("key", userId);
        return data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const loginWithDemo = createAsyncThunk<LoginData>(
  "auth/loginWithDemo",
  async (_, thunkApi) => {
    try {
      const { data } = await service.post(ApiConstants.DEMO_LOGIN);
      if (data) {
        const { token } = data;
        sessionStorage.setItem("jwtMaxUser", token);
        sessionStorage.setItem("isDemo", "true");
        return data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const changePassword = createAsyncThunk<any, ChangePassword>(
  "user/changePassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(ApiConstants.CHANGEPASSWORD, requestData);
      if (resp) {
        sessionStorage.clear();
        window.location.replace("/login");
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const checkOldPassword = createAsyncThunk<any, any>(
  "check/oldPassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(ApiConstants.OLD_PASSWORD, requestData);
      if (resp) {
        return resp?.data?.isPasswordMatch;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const logout = createAsyncThunk<any>(
  `${ApiConstants.LOGOUT}`,
  async (_, thunkApi) => {
    try {
      const response = await service.post("/auth/logout");
      sessionStorage.clear();
      window.location.replace("/login");
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const generateAuthToken = createAsyncThunk<any>(
  "generateAuthToken",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(
        ApiConstants.AUTHENTICATOR.generateAuthToken
      );
      return resp.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const authReset = createAction("auth/reset");
export const rulesModalShowFalse = createAction("auth/rulesModalShowFalse");
export const rulesModalShowTrue = createAction("auth/rulesModalShowTrue");
