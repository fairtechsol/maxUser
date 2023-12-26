import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

// interface RequestData {
//   userName?: string;
//   currentPage?: number;
//   url?: any;
// }

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

// export const userChangePassword = createAsyncThunk<any, any>(
//   "user/changePassword",
//   async (requestData) => {
//     try {
//       const resp = await service.post("/user/changePassword", requestData);
//       if (resp) {
//         return resp?.data;
//       }
//     } catch (error: any) {
//       const err = error as AxiosError;
//       throw err;
//     }
//   }
// );

export const setCreditRefference = createAsyncThunk<any, any>(
  "user/update/creditreferrence",
  async (requestData) => {
    try {
      const resp = await service.post(
        `${requestData.url}`,
        requestData.payload
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

export const setExposureLimit = createAsyncThunk<any, any>(
  "user/update/exposurelimit",
  async (requestData) => {
    try {
      const resp = await service.post(
        `${requestData.url}`,
        requestData.payload
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

export const setButtonValue = createAsyncThunk<any, any>(
  "/setButtonValues",
  async (requestData) => {
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
      throw err;
    }
  }
);

export const changePasswordReset = createAction("changePassword/reset");
export const profileReset = createAction("profile/reset");
export const updateReset = createAction("update/reset");
