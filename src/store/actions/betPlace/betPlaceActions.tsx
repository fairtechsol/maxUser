import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { AxiosError } from "axios";

export const placeBet = createAsyncThunk<any, any>(
  "/placeBet",
  async (requestData) => {
    try {
      const resp = await service.post(`${requestData.url}`, requestData.data);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);
