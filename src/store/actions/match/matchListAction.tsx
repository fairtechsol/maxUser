import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
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

export const SearchList = createAsyncThunk<any, any>("/match/searchlist", async (requestData) => {
  try {
    const resp = await service.get(`${ApiConstants.MATCH.MATCHLIST}?searchBy=title&keyword=${requestData?.title ? requestData?.title : ""
      }`);
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


export const SearchListReset = createAction("searchList/reset");
