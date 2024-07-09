import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/constants";

export const getDragonTigerDetailHorseRacing = createAsyncThunk<any, any>(
  "horseRacing/matchDetail",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.CARDS.MATCH.GET_CARD_DETAIL}/${requestData}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
// export const deleteHorseRacingBets = createAsyncThunk<any, any>(
//   "horseRacing/deleteBet",
//   async (requestData, thunkApi) => {
//     try {
//       const resp = await service.post(
//         `${ApiConstants.HORSERACING.MATCH.DELETE_BET}`,
//         { requestData }
//       );
//       if (resp?.data) {
//         return resp?.data;
//       }
//     } catch (error) {
//       const err = error as AxiosError;
//       return thunkApi.rejectWithValue(err.response?.status);
//     }
//   }
// );
// export const updateMatchRatesForHorseRacing = createAsyncThunk<any, any>(
//   "horseRacing/matchRatesUpdate",
//   async (data) => {
//     return data;
//   }
// );
// export const updateTeamRatesForHorseRacing = createAsyncThunk<any, any>(
//   "horseRacing/teamRatesUpdate",
//   async (data) => {
//     return data;
//   }
// );
export const resultDragonTiger = createAsyncThunk<any, any>(
  "result/placeBetDragonTiger",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.CARDS.MATCH.RESULT}/${requestData}`
      );
      if (resp?.data) {
      
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
// export const updateTeamRatesForHorseRacingOnDelete = createAsyncThunk<any, any>(
//   "horseRacing/teamRatesUpdateOnDelete",
//   async (data) => {
//     return data;
//   }
// );
export const updateCardMatchRates = createAsyncThunk<any, any>(
  "dt20/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const update7CardMatchRates = createAsyncThunk<any, any>(
  "lucky7/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const update7BCardMatchRates = createAsyncThunk<any, any>(
  "lucky7B/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateTeenPattiMatchRates = createAsyncThunk<any, any>(
  "teen20/matchRatesUpdate",
  async (data) => {
    return data;
  }
);


export const updateTeenPatti1DMatchRates = createAsyncThunk<any, any>(
  "teen/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateTeenPattiOpenMatchRates = createAsyncThunk<any, any>(
  "teen8/matchRatesUpdate",
  async (data) => {
    return data;
  }
); 

export const updateTeenPattiTestMatchRates = createAsyncThunk<any, any>(
  "teen9/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCardAbjRates = createAsyncThunk<any, any>(
  "abj2/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCard32MatchRates = createAsyncThunk<any, any>(
  "card32/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateLiveGameResultTop10 = createAsyncThunk<any, any>(
  "update/LiveGameResultTop10",
  async (data) => {
    return data;
  }
);
export const updateBalanceOnBetPlaceCards = createAsyncThunk<any, any>(
  "update/balanceOnBetPlaceCards",
  async (data) => {
    return data;
  }
);
export const updateProfitLossCards = createAsyncThunk<any, any>(
  "update/profitLossCards",
  async (data) => {
    return data;
  }
);

export const updateDragonTigerLionRates = createAsyncThunk<any, any>(
  "dtl20/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateDragonTigerOneDayRates = createAsyncThunk<any, any>(
  "dtoneDay/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCard32BMatchRates = createAsyncThunk<any, any>(
  "card32B/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCardAbj1Rates = createAsyncThunk<any, any>(
  "abj1/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const casinoWarPattiMatchRates = createAsyncThunk<any, any>(
  "war/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateCardPoker6Rates = createAsyncThunk<any, any>(
  "poker6/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateCardRace20Rates = createAsyncThunk<any, any>(
  "race20/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCardPoker1DayRates = createAsyncThunk<any, any>(
  "poker1day/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateCardSuperoverRates = createAsyncThunk<any, any>(
  "superover/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateCardPoker20Rates = createAsyncThunk<any, any>(
  "poker20/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCricket5MatchRates = createAsyncThunk<any, any>(
  "cricket5/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateAmarAkbarAnthonyCardMatchRates = createAsyncThunk<any, any>(
  "aaa/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
