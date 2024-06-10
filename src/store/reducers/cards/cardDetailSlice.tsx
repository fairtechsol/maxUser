import { createSlice } from "@reduxjs/toolkit";
import { getDragonTigerDetailHorseRacing, updateCardMatchRates } from "../../actions/cards/cardDetail";

interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
  dragonTigerDetail:any;
}

const initialState: InitialState = {
  loading: false,
  success: false,
  error: null,
  dragonTigerDetail:[],
};

const cardDetail = createSlice({
  name: "match",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDragonTigerDetailHorseRacing.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getDragonTigerDetailHorseRacing.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.dragonTigerDetail = action.payload;
      })
      .addCase(getDragonTigerDetailHorseRacing.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateCardMatchRates.fulfilled, (state, action) => {
        const {t1,t2}=action.payload
        const videoInfo = { ...t1[0] };
        const tiePair = t2.slice(0, 4);
        const dragonOdds = t2.slice(4, 8);
        const dragonCards = t2.slice(8, 21);
        const tigerOdds = t2.slice(21, 25);
        const tigerCards = t2.slice(25, 38);
        state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            tiePair,
            dragonOdds,
            dragonCards,
            tigerOdds,
            tigerCards
        };
      });
  },
});

export const cardDetailReducers = cardDetail.reducer;
