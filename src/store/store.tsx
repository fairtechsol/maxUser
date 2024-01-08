import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { matchReducer } from "./reducers/match";
import { userReducer } from "./reducers/user";
import { currentBetListReducer } from "./reducers/match/currentBetSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    match: matchReducer,
    currentBetList: currentBetListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
