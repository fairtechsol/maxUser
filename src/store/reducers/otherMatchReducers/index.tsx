import { combineReducers } from "@reduxjs/toolkit";
import { matchDetailReducers } from "./matchDetailSlice";

export const otherGamesReducer = combineReducers({
  matchDetail: matchDetailReducers,
});
