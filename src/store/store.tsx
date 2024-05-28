import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { matchReducer } from "./reducers/match";
import { userReducer } from "./reducers/user";
import { currentBetListReducer } from "./reducers/match/currentBetSlice";
import { placedBetReducer } from "./reducers/betPlace";
import { otherGamesReducer } from "./reducers/otherMatchReducers";
import { horseRacingReducer } from "./reducers/horseRacing";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    match: matchReducer,
    currentBetList: currentBetListReducer,
    bets: placedBetReducer,
    otherGames: otherGamesReducer,
    horseRacing: horseRacingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
