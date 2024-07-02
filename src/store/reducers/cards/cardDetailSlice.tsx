import { createSlice } from "@reduxjs/toolkit";
import {
  getDragonTigerDetailHorseRacing,
  resultDragonTiger,
  update7BCardMatchRates,
  update7CardMatchRates,
  updateCard32BMatchRates,
  updateCard32MatchRates,
  updateCardAbj1Rates,
  updateCardAbjRates,
  updateCardMatchRates,
  updateDragonTigerLionRates,
  updateDragonTigerOneDayRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
  updateTeenPattiMatchRates,
  updateTeenPatti1DMatchRates,
  updateTeenPattiOpenMatchRates,
  updateTeenPattiTestMatchRates,
} from "../../actions/cards/cardDetail";

interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
  dragonTigerDetail: any;
  lucky7Detail: any;
  lucky7BDetail: any;
  liveGameResultTop10: any;
  cards32Detail: any;
  resultData: any;
}

const initialState: InitialState = {
  loading: false,
  success: false,
  error: null,
  dragonTigerDetail: [],
  lucky7Detail: [],
  lucky7BDetail: [],
  liveGameResultTop10: [],
  cards32Detail: [],
  resultData: null,
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
        state.success = true;
        state.dragonTigerDetail = action.payload;
        state.liveGameResultTop10 = action.payload.topTenResult;
      })
      .addCase(getDragonTigerDetailHorseRacing.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateCardMatchRates.fulfilled, (state, action) => {
        const { t1, t2 } = action.payload;
        state.loading = false;
        const videoInfo = { ...t1[0] };
        const tiePair = t2.slice(0, 4);
        const dragonOdds = t2.slice(4, 8);
        const dragonCards = t2.slice(8, 21);
        const tigerOdds = t2.slice(21, 25);
        const tigerCards = t2.slice(25, 38);

        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          profitLoss:
            t1[0]?.mid === 0 ? {} : { ...state.dragonTigerDetail.profitLoss },
          videoInfo,
          tiePair,
          dragonOdds,
          dragonCards,
          tigerOdds,
          tigerCards,
        };
      })
      .addCase(update7CardMatchRates.fulfilled, (state, action) => {
        const { t1, t2 } = action.payload;
        state.loading = false;
        const videoInfo = { ...t1[0] };
        const lowHigh = t2.slice(0, 2);
        const redBlack = t2.slice(2, 4);
        const luckOdds = t2.slice(4, 6);
        const luckyCards = t2.slice(6, 19);
        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          videoInfo,
          lowHigh,
          redBlack,
          luckOdds,
          luckyCards,
        };
      })
      .addCase(update7BCardMatchRates.fulfilled, (state, action) => {
        const { t1, t2 } = action.payload;
        state.loading = false;
        const videoInfo = { ...t1[0] };
        const lowHigh = t2.slice(0, 2);
        const redBlack = t2.slice(2, 4);
        const luckOdds = t2.slice(4, 6);
        const luckyCards = t2.slice(6, 19);
        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          videoInfo,
          lowHigh,
          redBlack,
          luckOdds,
          luckyCards,
        };
      })
      .addCase(updateCardAbjRates.fulfilled, (state, action) => {
        const { t1, t2 } = action.payload;
        state.loading = false;
        const videoInfo = { ...t1[0] };
        const abjSa = t2.slice(0, 3);
        const abjSb = t2.slice(3, 6);
        const oddEven = t2.slice(23, 25);
        const abjCards = t2.slice(19, 23);
        const cards = t2.slice(6, 19);
        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          videoInfo,
          abjSa,
          abjSb,
          oddEven,
          abjCards,
          cards,
        };
      })
      .addCase(updateLiveGameResultTop10.fulfilled, (state, action) => {
        state.liveGameResultTop10 = action.payload;
      })
      .addCase(updateProfitLossCards.fulfilled, (state, action) => {
        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          profitLoss: {
            ...state.dragonTigerDetail.profitLoss,
            ...action.payload,
          },
        };
      })
      .addCase(updateTeenPattiMatchRates.fulfilled, (state, action) => {
        const { t1, t2 } = action.payload;
        state.loading = false;
        const videoInfo = { ...t1[0] };
        const playerA = t2.slice(0, 2);
        const playerB = t2.slice(2, 4);
        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          videoInfo,
          playerA,
          playerB,
        };
      })
      .addCase(updateTeenPatti1DMatchRates.fulfilled, (state, action) => {
        const { t1 } = action.payload;
        state.loading = false;

        const videoInfo = {
          ...t1[0],
          C4: t1[1].C1,
          C5: t1[1].C2,
          C6: t1[1].C3,
        };
        const playerA = t1.slice(0, 1);
        const playerB = t1.slice(1, 2);

        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          videoInfo,
          playerA,
          playerB,
        };
      })

      .addCase(updateTeenPattiOpenMatchRates.fulfilled, (state, action) => {
        const { t1, t2 } = action.payload;
        console.log("first", action.payload);
        state.loading = false;

        // Extract videoInfo from t1
        const videoInfo = { ...t1[0] };

        const player1 = t2.slice(0, 1)[0];
        const player2 = t2.slice(1, 2)[0];
        const player3 = t2.slice(2, 3)[0];
        const player4 = t2.slice(3, 4)[0];
        const player5 = t2.slice(4, 5)[0];
        const player6 = t2.slice(5, 6)[0];
        const player7 = t2.slice(6, 7)[0];
        const player8 = t2.slice(7, 8)[0];

        const pairPlus1 = t2.slice(8, 9)[0];
        const pairPlus2 = t2.slice(9, 10)[0];
        const pairPlus3 = t2.slice(10, 11)[0];
        const pairPlus4 = t2.slice(11, 12)[0];
        const pairPlus5 = t2.slice(12, 13)[0];
        const pairPlus6 = t2.slice(13, 14)[0];
        const pairPlus7 = t2.slice(14, 15)[0];
        const pairPlus8 = t2.slice(15, 16)[0];

        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          videoInfo,
          players: {
            player1,
            player2,
            player3,
            player4,
            player5,
            player6,
            player7,
            player8,
          },
          pairsPlus: {
            pairPlus1,
            pairPlus2,
            pairPlus3,
            pairPlus4,
            pairPlus5,
            pairPlus6,
            pairPlus7,
            pairPlus8,
          },
        };
      })

      .addCase(updateTeenPattiTestMatchRates.fulfilled, (state, action) => {
        // console.log("First", action.payload);
        const { t1, t2 } = action.payload;
        state.loading = false;

        const videoInfo = { ...t1[0] };

        const sections = [
          t2.slice(0, 1)[0],
          t2.slice(1, 2)[0],
          t2.slice(2, 3)[0],
          t2.slice(3, 4)[0],
          t2.slice(4, 5)[0],
          t2.slice(5, 6)[0],
        ];

        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          videoInfo,
          sections,
        };
      })

      .addCase(updateCard32MatchRates.fulfilled, (state, action) => {
        const { t1, t2 } = action.payload;
        state.loading = false;
        const videoInfo = { ...t1[0] };
        const set1 = t2.slice(0, 2);
        const set2 = t2.slice(2, 4);

        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          videoInfo,
          set1,
          set2,
        };
      })
      .addCase(updateDragonTigerLionRates.fulfilled, (state, action) => {
        const { t1, t2 } = action.payload;
        state.loading = false;
        const videoInfo = { ...t1[0] };
        const dragonData = t2.slice(0, 18);
        const tigerData = t2.slice(18, 36);
        const lionData = t2.slice(36, 54);

        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          profitLoss:
            t1[0]?.mid === 0 ? {} : { ...state.dragonTigerDetail.profitLoss },
          videoInfo,
          dragonData,
          tigerData,
          lionData,
        };
      })
      .addCase(updateDragonTigerOneDayRates.fulfilled, (state, action) => {
        const { t1, t2 } = action.payload;
        state.loading = false;
        const videoInfo = { ...t1[0] };
        const pair = { ...t2[2] };
        const matchOddsData = t2.slice(0, 2);
        const dragonData = t2.slice(3, 11);
        const tigerData = t2.slice(11, 19);

        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          profitLoss:
            t1[0]?.mid === 0 ? {} : { ...state.dragonTigerDetail.profitLoss },
          videoInfo,
          dragonData,
          tigerData,
          matchOddsData,
          pair,
        };
      })

      .addCase(updateCard32BMatchRates.fulfilled, (state, action) => {
        const { t1, t2 } = action.payload;
        state.loading = false;
        const videoInfo = { ...t1[0] };
        const matchOdd = t2.slice(0, 4);
        const oddEven = t2.slice(4, 12);
        const redBlack = [t2[12], t2[13], t2[26]];
        const singleCard = t2.slice(14, 24);
        const cardtotal = t2.slice(24, 26);

        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          videoInfo,
          matchOdd,
          oddEven,
          redBlack,
          singleCard,
          cardtotal,
        };
      })
      .addCase(updateCardAbj1Rates.fulfilled, (state, action) => {
        const { t1, t2, t3 } = action.payload;
        state.loading = false;
        const videoInfo = { ...t1[0] };
        const cardInfo = { ...t3[0] };
        const ander = t2.slice(0, 13);
        const bahar = t2.slice(13, 26);
        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          videoInfo,
          cardInfo,
          ander,
          bahar,
        };
      })
      .addCase(resultDragonTiger.pending, (state) => {
        // state.loading = true;
        state.error = null;
        state.resultData = [];
      })
      .addCase(resultDragonTiger.fulfilled, (state, action) => {
        state.resultData = action.payload;
      })
      .addCase(resultDragonTiger.rejected, (state, action) => {
        // state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const cardDetailReducers = cardDetail.reducer;
