import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

// interface RequestData {
//   userName?: string;
//   currentPage?: number;
//   url?: any;
// }

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

export const getButtonValue = createAsyncThunk<any>(
  "user/getButtonValue",
  async () => {
    try {
      const resp = await service.get(`${ApiConstants.USER.GET_BTN_VALUE}`);
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

// export const handleExport = createAsyncThunk<any, string>(
//   "user/export",
//   async (type) => {
//     try {
//       const response = await service.get(
//         `${ApiConstants.USER.LIST}?type=${type}`
//       );

//       const fileData = response?.data;

//       let blob = new Blob();
//       if (type == "pdf") {
//         // window.open(`data:application/pdf;base64,${fileData}`, '_blank');
//         const binaryData = new Uint8Array(
//           atob(fileData)
//             .split("")
//             .map((char) => char.charCodeAt(0))
//         );
//         blob = new Blob([binaryData], { type: "application/pdf" });
//       } else if (type == "excel") {
//         const binaryData = new Uint8Array(
//           atob(fileData)
//             .split("")
//             .map((char) => char.charCodeAt(0))
//         );
//         // Create a Blob from the Uint8Array
//         blob = new Blob([binaryData], {
//           type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         });
//       }
//       // Create a temporary URL for the Blob
//       const url = window.URL.createObjectURL(blob);
//       // Create an <a> element and trigger the download
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "temp";
//       link.click();
//       // Clean up by revoking the URL
//       window.URL.revokeObjectURL(url);
//     } catch (error: any) {
//       const err = error as AxiosError;
//       throw err;
//     }
//   }
// );

export const changePasswordReset = createAction("changePassword/reset");
export const profileReset = createAction("profile/reset");
export const updateReset = createAction("update/reset");
