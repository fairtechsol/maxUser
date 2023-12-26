import { combineReducers } from "@reduxjs/toolkit";
import { matchListReducer } from "./matchListSlice";
// import { userListReducers } from "./userListSlice";
// import { userUpdateReducer } from "./userUpdateSlice";

export const matchReducer = combineReducers({
  matchList: matchListReducer,

  //   userUpdate: userUpdateReducer,
  //   userList: userListReducers,
});
