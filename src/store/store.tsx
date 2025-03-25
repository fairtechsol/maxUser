import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { placedBetReducer } from "./reducers/betPlace";
import { cardDetailReducers } from "./reducers/cards/cardDetailSlice";
import { horseRacingReducer } from "./reducers/horseRacing";
import { matchReducer } from "./reducers/match";
import { currentBetListReducer } from "./reducers/match/currentBetSlice";
import { userReducer } from "./reducers/user";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    match: matchReducer,
    currentBetList: currentBetListReducer,
    bets: placedBetReducer,
    horseRacing: horseRacingReducer,
    card: cardDetailReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
