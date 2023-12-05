import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../service";

interface LoginData {
    userName: string;
    password: string;
    loginType:string;
  }

export const login=createAsyncThunk<any, LoginData>("auth/login",async (requestData, thunkApi)=>{
    try{
        const response=await service.post("/auth/login",requestData);
        return response.data;
    }
    catch(error){
        const err=error as AxiosError;
        return thunkApi.rejectWithValue(err.response?.status);
    }
});

export const authReset = createAction('auth/reset');
