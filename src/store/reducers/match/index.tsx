import { combineReducers } from "@reduxjs/toolkit";
import { matchListReducer } from "./matchListSlice";
import { sidebarListReducer } from "./sidebarListSlice";

export const matchReducer = combineReducers({
  matchList: matchListReducer,
  sidebarList: sidebarListReducer,
});
