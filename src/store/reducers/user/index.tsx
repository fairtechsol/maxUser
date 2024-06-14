import { combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "./profileSlice";
import { reportSliceReducers } from "./reportSlice";
// import { userListReducers } from "./userListSlice";
// import { userUpdateReducer } from "./userUpdateSlice";

export const userReducer = combineReducers({
  profile: profileReducer,
  report: reportSliceReducers,
  //   userUpdate: userUpdateReducer,
  //   userList: userListReducers,
});
