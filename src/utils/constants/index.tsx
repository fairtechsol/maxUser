import {
  A,
  abjlist,
  abjlist2,
  bac1,
  bac2,
  ball0,
  ball1,
  ball2,
  ball3,
  ball4,
  ball6,
  ballbyball,
  ballW,
  cards32A,
  cards32B,
  cmeter,
  crick5,
  dayteen,
  dt20,
  dt2020,
  dt6,
  dtl20,
  eight,
  eleven,
  five,
  four,
  img10,
  img2,
  img3,
  img4,
  img6,
  imgA,
  imgK,
  luck7B,
  lucky7A,
  nine,
  p1d,
  p20,
  p6,
  seven,
  six,
  superover,
  // teencasino,
  teenplayer,
  ten,
  testteen,
  thirteen,
  three,
  twelve,
  twentyteen,
  two,
} from "../../assets/images";
// import AmarAkbarAnthony from "../../pages/amarAkbarAnthony";

export const ApiConstants = {
  LiveCasinoGame: "/mac88/casino/list",
  LiveCasinoGameLogin: "/mac88/casino/login",
  LiveCasinoGameProvider: "/mac88/providers",
  LiveCasinoGameBets: "/mac88/bets",
  LOGIN: "auth/login",
  DEMO_LOGIN: "/user/loginWithDemo",
  LOGOUT: "auth/logout",
  CHANGEPASSWORD: "user/changePassword",
  OLD_PASSWORD: "/user/check/oldPassword",
  MATCH: {
    MATCHLIST: "/match/list",
    TABLIST: "/expert/blinkingTabs",
    MATCHSEARCHLIST: "/match/search",
    SEARCHLIST: "/user/searchlist",
    MATCHDETAILS: "/match/",
    OTHERMATCHDETAILS: "/match/other/",
    CURRENTBET: "/bet",
    PROFIT_LOSS_REPORT: "/bet/profitLoss",
    MARKET_MATCH_LIST_CRICKET:
      import.meta.env.VITE_THIRD_PARTY_BASE_URL + `/sportsList?type=cricket`,
    MARKET_MATCH_LIST_FOOTBALL:
      import.meta.env.VITE_THIRD_PARTY_BASE_URL + `/sportsList?type=football`,
    MARKET_MATCH_LIST_TENNIS:
      import.meta.env.VITE_THIRD_PARTY_BASE_URL + `/sportsList?type=tennis`,
  },
  USER: {
    MARQUEE: "/expert/notification",
    SET_BTN_VALUE: "/button/insert",
    GET_BTN_VALUE: "/button",
    GET_PROFILE: "/user/profile",
    ACCOUNT_STATEMENT: "/transaction/get/",
    CARD_REPORT: "/card/result/",
    LIVE_CASINO_BETS: "/mac88/bets",
    CASINO_GAME_PROVIDERS: "/mac88/providers",
  },
  EXPERT: {
    COMPETITIONLIST: "/expert/match/competitionList/",
    COMPETITIONDATES: "/expert/match/competition/dates/",
    COMPETITIONMATCHES: "/expert/match/competition/getMatch/",
  },
  BET: {
    PLACEBETSESSION: "bet/session",
    PLACEBETMATCHBETTING: "bet/matchBetting",
    PLACEBETMATCHBETTINGOTHER: "bet/other/matchBetting",
    PLACEBETRACEBETTING: "bet/raceBetting",
    PLACEBETTOURNAMENT: "bet/tournament",
    GETPLACEDBETS: "bet",
    RUN_AMOUNT: "bet/session/profitLoss",
    MY_MARKET: "bet/myMarket",
  },
  HORSERACING: {
    MATCH: {
      GET_COUNTRY_WISE_LIST: "/match/countryWiseList",
      GET_RACING_LIST: "/match/racing/list",
      DELETE_BET: "/bet/deleteMultipleBetForRace",
      GET_MATCH_DETAIL: "/match/racing",
    },
  },
  CARDS: {
    MATCH: {
      GET_CARD_DETAIL: "/match/card",
      GET_CARD_DETAIL_INITIAL: "/match/initial/card",
      PLACE_BET: "/bet/cardBetting",
      RESULT: "/card/result/detail",
    },
  },
  SCOREBOARD: {
    match: "/api/tunnel/casino/sport-score",
  },
  LIVESTREAM: {
    GET_CHANNEL_ID: "https://scoreapi.365cric.com/api/match/getStream",
    GET_VIDEO: "https://video.proexch.in/tv/static",
  },
  AUTHENTICATOR: {
    generateAuthToken: "/auth/generateAuthToken",
    verifyAuthToken: "/auth/verifyAuthToken",
    getAuthenticator: "/auth/getAuthenticator",
    resendToken: "/auth/resend/token",
    removeAuthenticator: "/auth/removeAuthenticator",
  },
};

export const marketApiConst = {
  cricket: ApiConstants.MATCH.MARKET_MATCH_LIST_CRICKET,
  football: ApiConstants.MATCH.MARKET_MATCH_LIST_FOOTBALL,
  tennis: ApiConstants.MATCH.MARKET_MATCH_LIST_TENNIS,
};

export const Constants = {
  pageLimit: 15,
  apiBasePath: "https://devmaxbet9api.fairgame.club",
  expertSocketBasePath: "https://devexpertapi.fairgame.club",
  thirdParty: "https://devserviceapi.fairgame.club",
  thirdPartyCard: "https://casinoserviceapi.fairgame.club",
  localThird: "http://localhost:3200",
  // localThirdCard: "https://3200dev.fairgame.club",
  // fdsfsdfsdsdfsd
  localThirdCard: "http://localhost:3201",
  WEBSOCKET: "websocket",
  POLLING: "polling",
  apiBasePathLive: "https://api.maxbet07.com",
  thirdPartyLive: "https://serviceapi.fairgame7.com",
  expertPathLive: "https://expertapi.fairgame7.com",
  thirdPartyCardLive: "https://casinoserviceapi.fairgame7.com",
  localPath: "http://localhost:5000",
  localPathExpert: "http://localhost:6060",
  randomeNumber: "JiskaPataNaLageG",
  publicNumber: `U2FsdGVkX1+7Lz0LzD8AsrBoHiQrViZiWhIWBqYuL4dgfGXwUbjJndfELn+Usn4xpSEl8s1RoIqzSS/EHUfPLYK/iq/6V0lKQpDaaK52maKES7/cOdFiuXYTVTGu+/HajYeHTly+Xgn1egPHG1NcK9wP6U3vTUDEkHaB2C4hNejgB/JPzdDD8pp60kc+VzCrkbxbRM2oiR4iEtCRQPac4vz0SdQFaSPaG1gexmBFdu/w5ZMSPoPxuSM2rSA0UvmYobUoP5VkQbkIlL1fZhlwOmJ2bm5AHUyfzfHU1njCgwYhB6eJswzg0Qr8lu2cstCaB6zmxeXmdYF41o157foAyeXgBT/TRYt4nwFQ4WuKngLRPPjM6/LD/sY9sZBFv58i`,
  privateNumber: `U2FsdGVkX19PB0k7pc6tsaolSzWPHY2kgJvHhevrMQ7JuPxXzoTJ/RVKBD6yBUt3xnPx4Nu+beP2YSbQ5GvSxw0ZJRzPMDNp1UOtOPzl5afvOf2wbvZLzhHSkW/qUmERYHLa7b24YLZDY0nIjS6PRLxc22qlRavxSa0/LCRGN0tWmTneiwD6aCgYPkD6YyzpL7qhBPCPSzCJ4CG05wknMfhg6kZSfNEYssJy3moQdlNTjr/6H923TMHCyE5GNfXeLgEYFdA2xxfbRiDJNvm9oJeDyhOiKOqM5kw7GceZQ4pHbtd4snOkfrMjVCY+ogpkXGpauvyTO+dJrqb2rDJ2OZlfHgXhCbWXlyq6CPFmmwqly5ZtJMDyOLhUZ/yJ2z4e/vLJYFuEcOFk4BQrpmnsAiVsCZyV9WGZER5mR11Wri0kWBw0Nya/mbGljAYWJzB8PcpUvZcwa3/Zoh6WgYzoSeAKWP8ftQvcHOQIa7XrFUWWYGH9DpHFJ4f2TnLb+azIMeFkdLXRTO0wETkf3G1H8uSND7B95tHn4L77wcXe5lHTguj4vFHs3dy+o+sqRKqilB6et/ehikfinAh6aBg2isbVnnp5BFzvfwwPKEMb1bKfMpFB3xg9ip8qsVKN6t3Igx5ur8E6ZQ/GpQ4IBUqFc/gkj3cA4v+inA/x/J4Al3RB2kw5V3Jm0Nq9cDf7pUY9AGOoTWZz+TOGKXCrctWBRolCLBmJRKMBGcPCZd7WgCTU3dMzqb4MB8e86QBVNQO8rAr1Nb4IQIcohAthGaFScD0VmWv1/omL0GxIvFY+tNl0IT9OK0rF9pAM+LjuCzP56MeMpEQx+K5LR8sUQtN9QXcHaQfmkBv8ThPmQGkyRKM7t6Pimf9j1niiUp3HArtIFCKFTzYpPEXHc0LeAYLr7TQ06zlLuQLsOcHsIim/0aNAjyXVUFcVvNX673sKA6wvaAMLdJOAzea54U+MVOgeP1t2WTJGjr7TiUKm8SWxVy0OhxRKyjFtJPGktUCYA/4h0oNtVb1atSBBGfcbtt6RubdtQzGfYGjjJHSc329dS17AgoCdlyu1FllcJ3MqGya6LySxBN29Jh9qM9N5Qw3cnvvkkhG/f0yj44Vcna3MjxS4gobAFa5jZacxQ8w0xGRkjETfN/22Kt7qUZnKwQ5f21iMeTDXDtNwN/Pld866Z9GVBQKekM6J9AhR0kWVZJQJ`,
};

export const sessionBettingType = {
  marketSession: "marketSession",
  manualSession: "manualSession",
  overByOver: "overByover",
  ballByBall: "ballByBall",
};

export const teamStatus = {
  suspended: "suspended",
  active: "active",
  apiActive: "",
  closed: "closed",
  ballStart: "ball start",
  ballStop: "ball stop",
  ballRunning: "ball running",
};

export const matchBettingType = {
  matchOdd: "matchOdd",
  bookmaker: "bookmaker",
  bookmaker2: "bookmaker2",
  quickbookmaker1: "quickbookmaker1",
  quickbookmaker2: "quickbookmaker2",
  quickbookmaker3: "quickbookmaker3",
  other: "other",
  tiedMatch1: "tiedMatch1",
  tiedMatch2: "tiedMatch2",
  tiedMatch3: "tiedMatch3",
  completeMatch: "completeMatch",
  completeMatch1: "completeMatch1",
  completeManual: "completeManual",
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`overUnder${curr}.5`] = `overUnder${curr}.5`;
      return prev;
    },
    {}
  ),
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`firstHalfGoal${curr}.5`] = `firstHalfGoal${curr}.5`;
      return prev;
    },
    {}
  ),
  halfTime: "halfTime",
};

export const profitLossDataForMatchConstants = {
  [matchBettingType.matchOdd]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.bookmaker]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.bookmaker2]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker1]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker2]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker3]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.other]: {
    A: "userTeamARateOther",
    B: "userTeamBRateOther",
    C: "userTeamCRateOther",
  },
  [matchBettingType.tiedMatch1]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.tiedMatch2]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.tiedMatch3]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.completeMatch]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.completeMatch1]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.completeManual]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`overUnder${curr}.5`] = {
        A: `yesRateUnderOver${curr}.5`,
        B: `noRateUnderOver${curr}.5`,
      };
      return prev;
    },
    {}
  ),
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`setWinner${curr}`] = {
        A: `userTeamARateSetWinner${curr}`,
        B: `userTeamBRateSetWinner${curr}`,
        C: `userTeamRateSetWinner${curr}`,
      };
      return prev;
    },
    {}
  ),
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`firstHalfGoal${curr}.5`] = {
        A: `yesRateFirstHalfGoal${curr}.5`,
        B: `noRateFirstHalfGoal${curr}.5`,
      };
      return prev;
    },
    {}
  ),
  [matchBettingType.halfTime]: {
    A: "userTeamARateHalfTime",
    B: "userTeamBRateHalfTime",
    C: "userTeamCRateHalfTime",
  },
};

export const transType = {
  add: "add",
  withDraw: "withDraw",
  win: "win",
  loss: "loss",
  creditRefer: "creditReference",
};

export const availableGameType: any = {
  cricket: "cricket",
  football: "football",
  tennis: "tennis",
  horseRacing: "horseRacing",
  greyHound: "greyHound",
  politics: "politics",
};

export const cardGamesType: any = {
  dragonTiger20: "dt20",
  andarBahar2: "abj",
  andarBahar1: "ab20",
  teen20: "teen20",
  card32: "card32",
  card32B: "card32eu",
  lucky7: "lucky7",
  dragonTiger202: "dt202",
  dragonTigerLion: "dtl20",
  teenOneDay: "teen",
  teenOpen: "teen8",
  teenTest: "teen9",
  dragonTigerOneDay: "dt6",
  lucky7B: "lucky7eu",
  casinoWar: "war",
  race20: "race20",
  superover: "superover",
  poker6: "poker6",
  poker1Day: "poker",
  poker20: "poker20",
  card3judge: "3cardj",
  baccarat: "baccarat",
  baccarat2: "baccarat2",
  cricketv3: "cricketv3",
  amarAkbarAnthony: "aaa",
  btable: "btable",
  worli: "worli2",
  cardj: "3cardj",
  cmatch20: "cmatch20",
  ballbyball: "ballbyball",
  cmeter: "cmeter",
  queen: "queen",
  worli1: "worli",
};

export const casinoKeywords = [
  "dt20",
  "abj",
  "ab20",
  "teen20",
  "card32",
  "card32eu",
  "lucky7",
  "dt202",
  "dtl20",
  "teen",
  "teen8",
  "teen9",
  "dt6",
  "lucky7eu",
  "war",
  "race20",
  "superover",
  "poker6",
  "poker",
  "poker20",
  "3cardj",
  "baccarat",
  "baccarat2",
  "cricketv3",
  "aaa",
  "btable",
  "worli2",
  "3cardj",
  "cmatch20",
  "ballbyball",
  "cmeter",
  "queen",
  "worli",
];
export const cardGamesId: any = {
  dragonTiger20: 3035,
  andarBahar2: 3043,
  andarBahar1: 3053,
  teen20: 3030,
  card32: 3055,
  card32B: 3034,
  lucky7: 3058,
  dragonTiger202: 3059,
  dragonTigerLion: 3047,
  teenOneDay: 3031,
  teenOpen: 3049,
  teenTest: 3048,
  dragonTigerOneDay: 3057,
  lucky7B: 3032,
  casinoWar: 3038,
  race20: 3036,
  superover: 3060,
  poker: 3050,
  poker1Day: 3051,
  poker20: 3052,
  cricketv3: 3042,
  baccarat: 3044,
  baccarat2: 3033,
  aaa: 3056,
  btable: 3041,
  worli: 3040,
  worli1: 3054,
  cardj: 3039,
  cmatch20: 3045,
  cmeter: 3046,
  ballbyball: 3061,
  queen: 3037,
};
export const navigateToGameDetail = {
  [availableGameType.cricket]: "/game-detail/",
  [availableGameType.football]: "/other-game-detail/",
  [availableGameType.tennis]: "/other-game-detail/",
  [availableGameType.horseRacing]: "/race/",
  [availableGameType.greyHound]: "/race/",
  [cardGamesType.teen20]: "teen20",
  [cardGamesType.card32]: "32cards-A",
  [cardGamesType.card32B]: "32cards-B",
  [cardGamesType.lucky7]: "lucky7-A",
  [cardGamesType.lucky7B]: "lucky7eu",
  [cardGamesType.andarBahar2]: "abj2",
  [cardGamesType.dragonTiger20]: "dt20",
  [cardGamesType.andarBahar1]: "ab20",
  [cardGamesType.race20]: "race20",
  [cardGamesType.dragonTiger202]: "dt202",
  [cardGamesType.dragonTigerLion]: "dtl20",
  [cardGamesType.teenOneDay]: "teen",
  [cardGamesType.teenOpen]: "teen8",
  [cardGamesType.teenTest]: "teen9",
  [cardGamesType.dragonTigerOneDay]: "dt6",
  [cardGamesType.superover]: "superover",
  [cardGamesType.poker6]: "poker6",
  [cardGamesType.poker1Day]: "poker",
  [cardGamesType.poker20]: "poker20",
  [cardGamesType.baccarat]: "baccarat",
  [cardGamesType.baccarat2]: "baccarat2",
  [cardGamesType.cricketv3]: "cricketv3",
  [cardGamesType.amarAkbarAnthony]: "aaa",
  [cardGamesType.btable]: "btable",
  [cardGamesType.worli]: "worli2",
  [cardGamesType.cardj]: "3cardj",
  [cardGamesType.cmatch20]: "cmatch20",
  [cardGamesType.cmeter]: "cmeter",
};

export const cardUrl = import.meta.env.VITE_CARD_VIDEO_BASE_URL;

export const cardUrlMain = import.meta.env.VITE_CARD_VIDEO_BASE_URL;
export const liveStreamCricketPageUrl = import.meta.env
  .VITE_CRICKET_LIVE_STREAM_BASE_URL;
export const tvApi = import.meta.env.VITE_TV_API;
export const liveStreamPageUrl = import.meta.env
  .VITE_OTHER_LIVE_STREAM_BASE_URL;
export const scoreBoardUrlMain = import.meta.env.VITE_SCORE_VITE_CARD_BASE_URL;

// export const scoreBoardUrlMain =
//   "https://dpmatka.in/dcasino/score.php?matchId=";

export const serviceUrl = import.meta.env.VITE_BASE_URL;

export const baseUrls = {
  cardSocket: import.meta.env.VITE_CARD_BASE_URL,
  socket: import.meta.env.VITE_BASE_URL,
  matchSocket: import.meta.env.VITE_THIRD_PARTY_BASE_URL,
  expertSocket: import.meta.env.VITE_EXPERT_BASE_URL,
};

// use below baseUrl for live build

// export const cardUrl = "https://video.proexch.in/route/?id=";
// export const cardUrl = "https://maxbet9.fairgame.club/videoPage/";

// export const serviceUrl =
//   process.env.NODE_ENV === "production"
//     ? Constants.apiBasePathLive
//     : Constants.localPath;

// export const baseUrls = {
//   socket:
//     process.env.NODE_ENV === "production"
//       ? Constants.apiBasePathLive
//       : Constants.localPath,
//   matchSocket:
//     process.env.NODE_ENV === "production"
//       ? Constants.thirdPartyLive
//       : Constants.localThird,
//   expertSocket:
//     process.env.NODE_ENV === "production"
//       ? Constants.expertPathLive
//       : Constants.localPathExpert,
//   cardSocket:
//     process.env.NODE_ENV === "production"
//       ? Constants.thirdPartyCardLive
//       : Constants.localThirdCard,
// };

//Rules casino
export const cardData = [
  {
    team: "AUS",
    cards: [
      { label: "A", imgSrc: imgA, value: "1 Run" },
      { label: "2", imgSrc: img2, value: "2 Run" },
      { label: "3", imgSrc: img3, value: "3 Run" },
      { label: "4", imgSrc: img4, value: "4 Run" },
      { label: "6", imgSrc: img6, value: "6 Run" },
      { label: "10", imgSrc: img10, value: "0 Run" },
      { label: "K", imgSrc: imgK, value: "Wicket" },
    ],
  },
  {
    team: "IND",
    cards: [
      { label: "A", imgSrc: imgA, value: "1 Run" },
      { label: "2", imgSrc: img2, value: "2 Run" },
      { label: "3", imgSrc: img3, value: "3 Run" },
      { label: "4", imgSrc: img4, value: "4 Run" },
      { label: "6", imgSrc: img6, value: "6 Run" },
      { label: "10", imgSrc: img10, value: "0 Run" },
      { label: "K", imgSrc: imgK, value: "Wicket" },
    ],
  },
];

export const rulesData = [
  {
    cardImage: imgA,
    count: 5,
    valueImage: ball1,
  },
  {
    cardImage: img2,
    count: 5,
    valueImage: ball2,
  },
  {
    cardImage: img3,
    count: 5,
    valueImage: ball3,
  },
  {
    cardImage: img4,
    count: 5,
    valueImage: ball4,
  },
  {
    cardImage: img6,
    count: 5,
    valueImage: ball6,
  },
  {
    cardImage: img10,
    count: 5,
    valueImage: ball0,
  },
  {
    cardImage: imgK,
    count: 5,
    valueImage: ballW,
    valueText: "Wicket",
  },
];

export const sportsRules = [
  {
    sportName: "Football",
    rules: [
      {
        category: "Bookmaker",
        description: [
          {
            text: "If the match will not take place within 48 hours of the original kick-off time, bets will be void.",
            color: null,
          },
          {
            text: "If the selection is in a multiple bet or accumulator, any refund must be requested before the kick-off of the first leg of the multiple bet.",
            color: "red",
          },
          {
            text: "Games which have their kick-off altered well in advance to accommodate live TV or ease fixture congestion will not be classed as postponed.",
            color: null,
          },
          {
            text: "If a match is forfeited or a team is given a walkover victory without the match having kicked off, then all bets will be void. Any subsequently awarded scoreline will not count for settlement purposes.",
            color: "red",
          },
          {
            text: "Where a confirmed postponed match features as part of a multiple bet, the bet will stand on the remaining selections in the multiple.",
            color: "red",
          },
        ],
      },
      {
        category: "Fancy",
        description: [
          {
            text: "Tournament Total Goals, Team Total Goals: Goals scored in 90 minutes or in extra-time will count. Goals scored in penalty shootouts do not count.",
            color: "red",
          },
          {
            text: "Tournament Corners: Only corners taken in 90 minutes count.",
            color: "red",
          },
          {
            text: "Tournament Penalties Missed/Converted: Penalties taken in 90 minutes, extra-time, and penalty shootouts all count. If a penalty has to be re-taken, the previous disallowed penalty(ies) do not count.",
            color: "red",
          },
        ],
      },
      {
        category: "Match",
        description: [
          {
            text: "Match Odds: All bets apply to the full 'regular time' period including stoppage time. Extra-time and/or penalty shoot-out is not included. Bets matched between the time of a VAR review and its outcome will be voided.",
            color: null,
          },
          {
            text: "Under/Over Goals: In the event of a match starting but not being completed, all bets will be void unless the specific market outcome is already determined.",
            color: null,
          },
          {
            text: "1st Period Winner: Bets will be void if the match is abandoned before half-time.",
            color: null,
          },
          {
            text: "Next Goal: Own goals count to the side credited with the goal.",
            color: null,
          },
          {
            text: "Draw No Bet: Predict which team will be the winner. In case of a draw, all bets will be void. If a game is abandoned, bets will be void.",
            color: null,
          },
          {
            text: "Both Teams to Score: Predict whether both teams will score at least one goal in the game. Own goals count towards the credited team. If a game is abandoned, bets will be void unless already determined.",
            color: null,
          },
          {
            text: "Total Corners: Predict which team will take the named corner in the game. If this specific corner is not taken, bets will be void.",
            color: null,
          },
          {
            text: "Goals Odd/Even: Any match resulting in 0-0 will be settled as an even number of goals. For Team Odd/Even markets, if the specified team does not score, it is settled as even.",
            color: null,
          },
          {
            text: "1X2 Corners: Predict which team will get more corners. Awarded but untaken corners do not count. Re-taken corners count as one.",
            color: null,
          },
          {
            text: "Under/Over Card in Match: Predict the number of cards in a match. Cards shown after the full-time whistle do not count.",
            color: null,
          },
          {
            text: "HT/FT: Bets will be void if the match is abandoned. Extra-time and penalty shootouts do not count.",
            color: null,
          },
          {
            text: "First Half Under/Over Goals: All bets apply to Full Time according to match officials. Extra-time and penalty shootouts are excluded.",
            color: null,
          },
          {
            text: "Penalty Taken?: Predict if a penalty will be awarded and taken during the match. Extra-time and penalty shootouts are excluded.",
            color: null,
          },
          {
            text: "Correct Score: Predict the final score of the match. Extra-time and penalty shootouts are excluded.",
            color: null,
          },
          {
            text: "Corners Number/Odds: Predict how many corners will be taken in the match. Only corners that are taken count.",
            color: null,
          },
          {
            text: "Team_A/B +1/2/3: Predict who will win the match with the stated handicap applied. Extra-time and penalty shootouts are excluded.",
            color: null,
          },
          {
            text: "Live Streaming & Animation: Data may be subject to time delay and/or inaccuracies. Users relying on this data do so at their own risk.",
            color: null,
          },
          {
            text: "Company reserves the right to suspend/void any bets deemed illegitimate. Only winning bets will be voided in such cases.",
            color: "red",
          },
        ],
      },
    ],
  },
  {
    sportName: "Horse Racing",
    rules: [
      {
        category: "General",
        description: [
          {
            text: "All individual race markets will be determined according to the official result at the time of the 'weigh-in' announcement (or equivalent). Subsequent disqualifications, appeals or amendments to the result will be disregarded.",
            color: null,
          },
          {
            text: "If a race is abandoned or otherwise declared void, or in the event of a walkover, all bets on that race will be void.",
            color: null,
          },
          {
            text: "If the scheduled venue is changed after the market has been loaded by us, all bets will be void.",
            color: null,
          },
          {
            text: "Where a race does not take part on its scheduled day, all bets will be void.",
            color: null,
          },
          {
            text: "If a scheduled surface type is changed (e.g. turf to dirt) all bets will stand.",
            color: null,
          },
        ],
      },
      {
        category: "Non-Runner Rule",
        description: [
          {
            text: "Our non-runner rule relates to the adjustment of odds on bets already matched when a horse in a race is declared a non-runner.",
            color: null,
          },
          {
            text: "Any horse listed when the relevant market is loaded which does not subsequently come under starter's orders is deemed a non-runner.",
            color: null,
          },
          {
            text: "For Australian racing, reduction factors may be updated periodically at the discretion of Us based on trading in the market, but after approximately five minutes from the scheduled off time of a given race they will be updated only in exceptional circumstances.",
            color: null,
          },
          {
            text: "Once a non-runner is declared each selection in the market will be given an appropriate reduction factor.",
            color: null,
          },
        ],
      },
      {
        category: "Reductions in Exchange Markets",
        description: [
          {
            text: "In the win market, reductions will be made on the traded price.",
            color: null,
          },
          {
            text: "In the place market, reductions will be made to the potential winnings on the bet only, and not the traded price.",
            color: null,
          },
          {
            text: "Reserves: A reserve runner may appear in the relevant markets but will have a non-applicable reduction factor until we receive confirmation that it is a confirmed runner.",
            color: null,
          },
        ],
      },
      {
        category: "Additional Rules",
        description: [
          {
            text: "Card numbers are posted as a guide only: bets are placed on a named horse.",
            color: null,
          },
          { text: "Horses will not be coupled.", color: null },
          {
            text: "If a runner is not included in a market because of an error, we reserve the right to introduce the missing runner into the market at any time prior to settlement.",
            color: null,
          },
          {
            text: "Company reserves the right to suspend/void any illegitimate bets (e.g., due to VPN/robot use). Only winning bets will be voided.",
            color: "red",
          },
        ],
      },
      {
        category: "Live Streaming & Animation",
        description: [
          {
            text: "Data may be subject to time delay and/or inaccuracies. Users relying on this data do so at their own risk.",
            color: null,
          },
        ],
      },
    ],
  },
  {
    sportName: "E Games",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "In the event of a match starting but not being completed, then all bets will be void.",
            color: "red",
          },
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: 'For live streaming and animation: Although the current score, time elapsed, video, and other data provided on this site is sourced from "live" feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.',
            color: null,
          },
        ],
      },
    ],
  },
  {
    sportName: "BasketBall",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Match Odds :- Predict which team will be the winner. There must be 5 minutes or less of scheduled game time left for bets to have action.",
          },
          {
            text: "Quarter Winner :- The quarter must be completed for bets to have action, unless settlement of bets is already determined.",
          },
          {
            text: "1st Half Winner / 2nd Half Winner :- The first half must be completed for first half bets to stand. If a game is postponed or cancelled after the start, for game and second half bets there must be 5 minutes or less remaining for bets to have action, unless settlement of bets is already determined. (Including Overtime if played.)",
          },
          {
            text: "Highest Scoring Half :- Predict in which half most points will be scored. OT is not included in 2nd Half.",
          },
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "MotoGP",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Chess",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "VolleyBall",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Match odds :- Predict which team will be the winner. Bets will be void if the match is not completed.",
            color: "black",
          },
          {
            text: "Set Winner:- In the event of the set not being completed bets will be void. Exceptions are made for bets on sets which are already over, in this case the bets will be settled.",
            color: "black",
          },
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Ice Hockey",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Match Odds Including overtime/shootouts :- Predict the winner of the match including overtime and penalties. The game must be completed for bets to have action.",
            color: "black",
          },
          {
            text: "Period Winner :- Predict the winner of the relevant period. The relevant period must be completed for bets to have action, unless the specific market outcome is already determined.",
            color: "black",
          },
          {
            text: "Highest Scoring Period:- If 2 or more periods have the same score Tie will be settled as the winner. (exclude overtime/shootouts for settlement purposes)",
            color: "black",
          },
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Tennis",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Match Odds :- If 1st set has been not completed at the time of the retirement or disqualification, then all bets relating to that individual match will be void. After completion of 1st set in case of retirement the opponent player will be given the winner for match winner bets.",
            color: "black",
          },
          {
            text: "Game Winner :- Predict which player will win the stated game. The nominated game will be featured in the name of the bet type, for example: 2nd set – 7th game – Winner. If a game is not completed for any reason, bets on it will be void. Tie break points will not be counted for this bet type unless the specific market outcome is already determined.",
            color: "black",
          },
          {
            text: "Under / Over Games :- Finished set stand, the unfinished set can be played to its natural conclusion and settled as in the example: Example: A set is abandoned at 4-4. I win if I placed a bet on Over 9.5 (since any natural conclusion to the set would have at least 10 games); I lost the bet if I placed a bet on Under 9.5 (since any natural conclusion to the set would have at least 10 games); I get my stake back if I placed a bet on O/U 10.5 (it is undecided, the set could have ended 6-4).",
            color: "black",
          },
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "Badminton",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "Match Odds:- Predict which player will win the match. In the event of any of the named players in a match changing before the match starts then all bets are void. In the event of a match starting but not being completed, then all bets will be void.",
            color: "black",
          },
          {
            text: "Set Winner:- The Set must be completed for bets to stand, unless the specific market outcome is already determined.",
            color: "black",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "Cycling",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Mixed Martial Arts",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "MotorBikes",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Athletics",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "BasketBall 3X3",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Sumo",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Virtual Sports",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "HandBall",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Match Odds:- Predict which team will be the winner. Bets will be void if the match is not completed.",
            color: "black",
          },
          {
            text: "Next Goal:- Predict which team will score the X-th goal.",
            color: "black",
          },
          {
            text: "Highest Scoring Half:- Predict which half will have the most goals scored (1st, 2nd or Draw). Bet will be settled on regulation time only and exclude overtime if played.",
            color: "black",
          },
          {
            text: "Halftime/Fulltime:- Predict the result of a match at halftime and at the end of regular time. If a game is abandoned, bets will be void. Example: If you choose 1/X, you bet on the home team to lead in the first half and the match to end in a draw. Extra time doesn’t count.",
            color: "black",
          },
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
        ],
      },
    ],
  },

  {
    sportName: "Cricket",
    rules: [
      {
        category: "bookmaker",
        description: [
          {
            text: "1. Due to any reason any team will be getting advantage or disadvantage we are not concerned.",
            color: "red",
          },
          {
            text: "2. We will simply compare both teams 25 overs score higher score team will be declared winner in ODI (If both teams same score means, low wickets team will be declared winner. In case, both teams same score & same wickets means highest boundaries team will be declared winner.If all same then will be declared No result)",
            color: "red",
          },
          {
            text: "3. We will simply compare both teams 10 overs higher score team will be declared winner in T20 matches (If both teams same score means, low wickets team will be declared winner. In case, both teams same score & same wickets means highest boundaries team will be declared winner.If all same then will be declared No result)",
            color: "red",
          },
          {
            text: "4. Any query about the result or rates should be contacted within 7 days of the specific event, the same will not be considered valid post 7 days from the event.",
            color: "red",
          },
          {
            text: "5. Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example incase of vpn/robot-use/multiple entry from same IP/ multiple bets at the same time (Punching) and others. Note : only winning bets will be voided.",
            color: "red",
          },
          {
            text: "6. In case, company will find Ground bets, Group betting, Punching bets, Multiple entries with same IP or any fraud or unusual activities are detected then Company will be void winning bets and charge penalty of 2X (Two times) from winning amount.",
            color: "red",
          },
          {
            text: "7. If two team ends up with equal points, then result will be given based on the official point table",
            color: "red",
          },
        ],
      },
      {
        category: "fancy",
        description: [
          {
            text: "1. All fancy bets will be validated when match has been tied.",
            color: "red",
          },
          {
            text: "2. All advance fancy will be suspended before toss or weather condition. All advance fancy will be voided if over reduced before match start.",
            color: "red",
          },
          {
            text: "3. In case technical error or any circumstances any fancy is suspended and does not resume result will be given all previous bets will be valid (based on haar/jeet).",
            color: "red",
          },
          {
            text: "4. If any case wrong rate has been given in fancy that particular bets will be cancelled.",
            color: "red",
          },
          {
            text: "5. In any circumstances management decision will be final related to all exchange items. Our scorecard will be considered as valid if there is any mismatch in online portal.",
            color: "red",
          },
          {
            text: "6. In case customer make bets in wrong fancy we are not liable to delete. No changes will be made and bets will be consider as confirm bet.",
            color: "red",
          },
          {
            text: "7. Due to any technical error market is open and result has came all bets after result will be deleted.",
            color: "red",
          },
          {
            text: "8. Manual bets are not accepted in our exchange.",
            color: "red",
          },
          {
            text: "9.Our exchange will provide 5 second delay in our TV.",
            color: "red",
          },
          {
            text: "10. Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example incase of VPN/robot-use/multiple entry from same IP and others. Note : only winning bets will be voided.",
            color: "red",
          },
          {
            text: "12. Once our exchange give username and password it is your responsibility to change a password.",
            color: "red",
          },
          {
            text: "13. Penalty runs will be counted in all fancy. (This rule applicable from 20th March 2024)",
            color: "red",
          },
          {
            text: "14. Warning:- live scores and other data on this site is sourced from third party feeds and may be subject to time delays and/or be inaccurate. If you rely on this data to place bets, you do so at your own risk. Our exchange does not accept responsibility for loss suffered as a result of reliance on this data.",
            color: "red",
          },
          {
            text: "15. Traders will be block the user ID if find any misinterpret activities, No queries accept regarding.",
            color: "red",
          },
          {
            text: "TEST",
            color: "red",
          },
          {
            text: "1 Session:-",
            color: "red",
          },
          {
            text: "1.1 Complete session valid in test.",
            color: "black",
          },
          {
            text: "1.2 Middle session and Session is not completed due to Innings declared or all out so that particular over considered as completed and remaining over counted in next team Innings for ex:- In case of Innings declared or all out In 131.5th over Considered as 132 over completed remaining 1 over counted for 133 over middle session and 3 over counted for 135 over session from next team Innings and One over session and Only over session is not completed due to innings declared so that Particular over session bets will be deleted and all out considered as valid for ex:- In case of Innings declared In 131.5th over so 132 over will be deleted and if all out then 132 over and Only 132 over will be Valid.",
            color: "black",
          },
          {
            text: "1.3 1st day 1st session run minimum 25 over will be played then result is given otherwise 1st day 1st session will be deleted.",
            color: "black",
          },
          {
            text: "1.4 1st day 2nd session run minimum 25 over will be played then result is given otherwise 1st day 2nd session will be deleted.",
            color: "black",
          },
          {
            text: "1.5 1st day total run minimum 80 over will be played then result is given otherwise 1st day total run will be deleted. If a team get All Out before the day stumps, the other team's 1st day score will be added to 1st day total run event. (i.e. AUSTRALIA got all out at 251 before the day stumps, then ENGLAND hit 100 runs in the remaining overs of 1st day, so the result of 1st day total run event will be 351)",
            color: "black",
          },
          {
            text: "1.6 Test match both advance session is valid.",
            color: "black",
          },
          {
            text: "2 Test lambi/ Inning run:-",
            color: "red",
          },
          {
            text: "2.1 Mandatory 70 over played in test lambi paari/ Innings run. If any team all-out or declaration lambi paari/ innings run is valid.",
            color: "black",
          },
          {
            text: "2.2 In case due to weather situation match has been stopped all lambi trades will be deleted.",
            color: "black",
          },
          {
            text: "2.3 In test both lambi paari / inning run is valid in advance fancy.",
            color: "black",
          },
          {
            text: "3 Test batsman:-",
            color: "red",
          },
          {
            text: "3.1 In case batsmen is injured he/she is made 34 runs the result will be given 34 runs.",
            color: "black",
          },
          {
            text: "3.2 Batsman 50/100 run if batsman is injured or declaration the result will be given on particular run.",
            color: "black",
          },
          {
            text: "3.3 In next men out fancy if player is injured particular fancy will be deleted.",
            color: "black",
          },
          {
            text: "3.4 In advance fancy opening batsmen is only valid if same batsmen came in opening the fancy will be valid in case one batsmen is changed that particular player fancy will be deleted.",
            color: "black",
          },
          {
            text: "3.5 Test match both advance fancy batsmen run is valid.",
            color: "black",
          },
          {
            text: "4 Test partnership:-",
            color: "red",
          },
          {
            text: "4.1 In partnership one batsman is injured or Retired out means partnership will continued in next batsman.",
            color: "black",
          },
          {
            text: "4.2 Partnership and player runs due to weather condition or match abandoned or match completed, then the result will be given as per score.",
            color: "black",
          },
          {
            text: "4.3 Advance partnership is valid in case both players are different or same.",
            color: "black",
          },
          {
            text: "4.4 Test match both advance fancy partnership is valid.",
            color: "black",
          },
          {
            text: "5 Other fancy advance (test):-",
            color: "red",
          },
          {
            text: "5.1 Four, sixes, wide, wicket, extra run, total run, highest over and top batsmen is valid only if 300 overs has been played or the match has been won by any team otherwise all these fancy will be deleted. Additionally all events are valid only for 1st innings( this is applicable to all individual team events also)",
            color: "black",
          },
          {
            text: "2 Odi rule:-",
            color: "red",
          },
          {
            text: "Session:-",
            color: "red",
          },
          {
            text: "Match 1st over run advance fancy only 1st innings run will be counted.",
            color: "black",
          },
          {
            text: "Complete session is valid in case due to rain or match abandoned particular session will be deleted.",
            color: "black",
          },
          {
            text: "For example:- 35 over run team a is playing any case team A is all-out in 33 over team a has made 150 run the session result is validated on particular run.",
            color: "black",
          },
          {
            text: "Advance session is valid in only 1st innings.",
            color: "black",
          },
          {
            text: "50 over runs:-",
            color: "red",
          },
          {
            text: "In case 50 over is not completed all bet will be deleted due to weather or any condition.",
            color: "black",
          },
          {
            text: "Advance 50 over runs is valid in only 1st innings.",
            color: "black",
          },
          {
            text: "Odi batsman runs:-",
            color: "red",
          },
          {
            text: "In case batsman is injured he/she is made 34 runs the result will be given 34 runs.",
            color: "black",
          },
          {
            text: "In next men out fancy if player is injured particular fancy will be deleted.",
            color: "black",
          },
          {
            text: "In advance fancy opening batsmen is only valid if same batsmen came in opening the fancy will be valid in case one batsmen is changed that particular player fancy will be deleted.",
            color: "black",
          },
          {
            text: "Odi partnership runs:-",
            color: "red",
          },
          {
            text: "In partnership one batsman is injured or Retired out means partnership will continued in next batsman.",
            color: "black",
          },
          {
            text: "Advance partnership is valid in case both players are different or same.",
            color: "black",
          },
          {
            text: "Both team advance partnerships are valid in particular match.",
            color: "black",
          },
          {
            text: "Other fancy:-",
            color: "red",
          },
          {
            text: "Four, sixes, wide, wicket, extra run, total run, highest over ,top batsman,maiden over,caught-out,no-ball,run-out,fifty and century are valid only match has been completed in case due to rain over has been reduced all other fancy will be deleted.",
            color: "black",
          },
          {
            text: "T20:-",
            color: "red",
          },
          {
            text: "Session:-",
            color: "red",
          },
          {
            text: "Match 1st over run advance fancy only 1st innings run will be counted.",
            color: "black",
          },
          {
            text: "Complete session is valid in case due to rain or match abandoned particular session will be deleted.",
            color: "black",
          },
          {
            text: "For example :- 15 over run team a is playing any case team a is all-out in 13 over team A has made 100 run the session result is validated on particular run.",
            color: "black",
          },
          {
            text: "Advance session is valid in only 1st innings.",
            color: "black",
          },
          {
            text: "20 Over Runs",
            color: "red",
          },
          {
            text: "Advance 20 over run is valid only in 1st innings.",
            color: "black",
          },
          {
            text: "20 over run will not be considered as valid if 20 overs is not completed due to any situation.",
            color: "black",
          },
          {
            text: "T20 Batsman Runs",
            color: "red",
          },
          {
            text: "In case batsman is injured he/she is made 34 runs the result will be given 34 runs.",
            color: "black",
          },
          {
            text: "In next men out fancy if player is injured particular fancy will be deleted.",
            color: "black",
          },
          {
            text: "In advance fancy opening batsmen is only valid if same batsmen came in opening the fancy will be valid in case one batsmen is changed that particular player fancy will be deleted.",
            color: "black",
          },
          {
            text: "1st, 2nd, 3rd, and 4th Wicket Runs (T20/ODI)",
            color: "red",
          },
          {
            text: "Advance event is valid in only 1st Innings.",
            color: "black",
          },
          {
            text: "If over reduced due to rain or weather condition or match abandoned or match completed, then the result will be given as per score.",
            color: "black",
          },
          {
            text: "Other Fancy",
            color: "red",
          },
          {
            text: "T-20, One day and Test match: in case current innings player and partnership are running in between match has been called off or abandoned that situation all current player and partnership results are valid.",
            color: "black",
          },
          {
            text: "Four, sixes, wide, wicket, extra run, total run, highest over and top batsman, maiden over, caught-out, no-ball, run-out, fifty and century are valid only if match has been completed. In case due to rain over has been reduced all other fancy will be deleted.",
            color: "black",
          },
          {
            text: "1st 6 over dot ball and 20 over dot ball fancy are valid only in the 1st innings.",
            color: "black",
          },
          {
            text: "Concussion (Test)",
            color: "red",
          },
          {
            text: "All bets of one over session will be deleted in test scenario, in case session is incomplete. For example innings declared or match suspended to bad light or any other conditions.",
            color: "black",
          },
          {
            text: "All bets will be considered as valid if a player has been replaced under concussion substitute, result will be given for the runs scored by the mentioned player. For example DM Bravo gets retired hurt at 23 runs, then result will be given for 23.",
            color: "black",
          },
          {
            text: "Bets of both the player will be valid under concussion substitute.",
            color: "black",
          },
          {
            text: "Limited Over Events (Test/ODI)",
            color: "red",
          },
          {
            text: "This event will be considered valid only if the number of overs defined on the particular event has been bowled, otherwise all bets related to this event will get void. 0-50 over events will be valid only if 50 over completed, if the team batting first get all out prior to 50 over the balance over will be counted from second innings. For example if team batting first gets all out in 35 over balance 15 over will be counted from second innings, the same applies for all events if team gets all out before the defined number of overs.",
            color: "black",
          },
          {
            text: "The events which remains incomplete will be voided if over gets reduced in the match due to any situation, for example if match interrupted in 15 overs due to rain/badlight and post this over gets reduced. Events for 0-10 will be valid, all other events related to this type will get deleted.",
            color: "black",
          },
          {
            text: "This events will be valid only if the defined number of over is completed. For example team batting first gets all out in 29.4 over then the same will be considered as 30 over, the team batting second must complete 20 overs only then 0-50 over events will be considered as valid. In case team batting second gets all out in 19.4 over then 0-50 over event will not be considered as valid, This same is valid for 1st Innings only.",
            color: "black",
          },
          {
            text: "Bowler event- ODI:-",
            color: "red",
          },
          {
            text: "The mentioned bowler has to complete the defined number of overs, else the bets related to that particular event will get void. For example if the mentioned bowler has bowled 8 overs, then 5 over run of that particular bowler will be considered as valid and the 10 over run will get void.",
            color: "black",
          },
          {
            text: "Both innings are valid",
            color: "black",
          },
          {
            text: "Other event:- T20",
            color: "red",
          },
          {
            text: "The events for 1-10 over and 11-20 over will be considered valid only if the number of over mentioned has been played completely. However if the over got reduced before the particular event then the same will be voided, if the team batting first get all out prior to 20 over the balance over will be counted from second innings. For example if team batting first gets all out in 17 over balance 3 over will be counted from second innings and that 3 over all events are counted. This same is valid for 1st Innings only.",
            color: "black",
          },
          {
            text: "If over got reduced in between any running event, then the same will be considered valid and the rest will be voided. For example.., match started and due to rain/bad light or any other situation match got interrupted at 4 over and later over got reduced. Then events for 1-10 is valid rest all will be voided",
            color: "black",
          },
          {
            text: "Bowler Session: Bowler session advance events only valid for 1st inning. This event is valid only if the bowler has completed his maximum quota of overs, else the same will be voided. However if the match has resulted and the particular bowler has already started bowling his final over then result will be given even if he haven't completed the over. For example B Kumar is bowling his final over and at 3.4 the match has resulted then result will be given for B Kumar over runs",
            color: "black",
          },
          {
            text: "Incase of DLS, the over got reduced then the bowler who has already bowled his maximum quota of over that result will be considered as valid and the rest will be voided",
            color: "black",
          },
          {
            text: "Boundary on Match 1st Free hit",
            color: "red",
          },
          {
            text: "Both innings are valid",
            color: "black",
          },
          {
            text: "Boundary hit on Free hit only be considered as valid",
            color: "black",
          },
          {
            text: "Bets will be deleted if there is no Free hit in the mentioned match",
            color: "black",
          },
          {
            text: "Boundary by bat will be considered as valid",
            color: "black",
          },
          {
            text: "Boundaries by Player",
            color: "red",
          },
          {
            text: "Both Four and six are valid",
            color: "black",
          },
          {
            text: "Total Match - Events (Test):-",
            color: "red",
          },
          {
            text: "World Cup:-",
            color: "red",
          },
          {
            text: "11. Company reserves the right to void any bets (only winning bets) of any event at any point of the match if the company believes there is any cheating/wrong doing in that particular event by the players (either batsman/bowler)",
            color: "red",
          },
          {
            text: "16.In case, company will find Ground bets, Group betting, Punching bets, Multiple entries with same IP or any fraud or unusual activities are detected then Company will be void winning bets and charge penalty of 2X (Two times) from winning amount.",
            color: "red",
          },
          {
            text: "Special Events:",
            color: "red",
          },
          {
            text: "Pakistan Super League (PSL)",
            color: "red",
          },
          {
            text: "At any situation if result is given for any particular event based on the rates given for the same, then the particular result will be considered valid, similarly if the tournament gets canceled due to any reason the previously given result will be considered valid",
            color: "red",
          },
          {
            text: "No Boundaries Event:",
            color: "red",
          },
          {
            text: "Both Four and Six are valid",
            color: "black",
          },
          {
            text: "Batsman bat boundaries only considered as valid",
            color: "black",
          },
          {
            text: "Free hit boundaries also valid",
            color: "black",
          },
          {
            text: "Bets will be voided if that particular ball not completed",
            color: "black",
          },
          {
            text: "Result will be given 0 or 4 (No or Yes). For Example batsman hit boundary in particular ball means Result is 0 otherwise Result is 4.",
            color: "black",
          },
          {
            text: "Dot ball Event:",
            color: "red",
          },
          {
            text: "Only No run will count as dot ball.",
            color: "black",
          },
          {
            text: "If wicket means that will not count as dot ball.",
            color: "black",
          },
          {
            text: "Power Surge Rule in Big Bash",
            color: "red",
          },
          {
            text: "Power Play First Four Overs + Power Surge Two Overs-Batters Choice",
            color: "black",
          },
          {
            text: "The batting side chooses when to take control with the addition of the Power Surge.",
            color: "black",
          },
          {
            text: "There’s still a four-over power play at the start of the innings, but now the batting team can take the other two Power Surge overs any time from the 11th over onwards.",
            color: "black",
          },
          {
            text: "Bowler Session:",
            color: "red",
          },
          {
            text: "The mentioned bowler has to complete the defined number of overs, else the bets related to that particular event will get void. For example if the mentioned bowler has bowled 8 overs, then 5 over run of that particular bowler will be considered as valid and the 10 over run will get void.",
            color: "black",
          },
          {
            text: "Wide & No ball runs will be counted in bowler Session.",
            color: "black",
          },
          {
            text: "Byes & Leg byes runs will not be counted in bowler Session.",
            color: "black",
          },
          {
            text: "Indoor Cricket T10 League",
            color: "red",
          },
          {
            text: "9 Players squad with 7 players a side Over Arm Box Cricket Championship",
            color: "black",
          },
          {
            text: "Scoring Rules :",
            color: "red",
          },
          {
            text: "Hitting the ball in Zone A (the front net, i.e., the net behind the wicket keeper) won't get you any bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits the net in Zone B (side nets between the striker's end and halfway down the pitch), you get 1 bonus run.",
            color: "black",
          },
          {
            text: "If the ball hits the net in Zone C (side nets between the bowler's end and halfway), you score 2 bonus runs.",
            color: "black",
          },
          {
            text: "Hitting the ball in Zone D (the back net, i.e., the net behind the bowler) allows you to score 4 or 6 bonus runs depending on how the ball hits the back net. If the ball hits the net after bouncing, you get 4 bonus runs. If the ball hits the net without bouncing on the ground, you score 6 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "Remember that at least one physical run must be taken for any bonus runs to be scored. Whatever bonus runs you get will be added to the physical runs. For example, if you strike the ball into the front net for 1 bonus run and take 2 physical runs, you score a total of 3 runs off the ball.",
            color: "black",
          },
          {
            text: "Game Format :",
            color: "red",
          },
          {
            text: "10 over a-side innings",
            color: "black",
          },
          {
            text: "Power Play for the 1st 3 overs. Only 1 player allowed beyond the Inner box marking. After the end of power play over, only 2 players can be outside the Inner Box.",
            color: "black",
          },
          {
            text: "No Ball & Wide balls as per normal cricketing rules.",
            color: "black",
          },
          {
            text: "If the ball touches the upper net and if any player catches the ball, the batsman is considered out.",
            color: "black",
          },
          {
            text: "If the Ball Touches the Upper Net and lands safely on the field, then the batsman have to take a physical run if they want, if no physical run is taken there will be no runs.",
            color: "black",
          },
          {
            text: "Zone A shall concede 0 runs.",
            color: "black",
          },
          {
            text: "If the player hits the net after the middle line (Zone C) its 2 bonus runs. (only taken into consideration if the players take a physical run)",
            color: "black",
          },
          {
            text: "If the player hits the net before the middle line (Zone B) its 1 bonus run. (only taken into consideration if the players take a physical run",
            color: "black",
          },
          {
            text: "If the ball goes straight to the boundary (Zone D) without a bounce, it’s a SIX.",
            color: "black",
          },
          {
            text: "If the ball bounces and goes to the boundary (Zone D) it’s a FOUR",
            color: "black",
          },
          {
            text: "If the ball hits the upper net and goes straight to the boundary (Zone D) it’s a 6.",
            color: "black",
          },
          {
            text: "If the ball hits the upper net and bounces and goes straight to the boundary (Zone D) it’s a 4.",
            color: "black",
          },
          {
            text: "Note: Bonus Runs are only applied if the ball hits or touches the Side Nets of that particular zone (B&C) and taken into consideration if the players take a physical Run.",
            color: "black",
          },
          {
            text: "The bowler is not allowed to touch the front line or the side line of the Crease, in case they do so it will be counted as a no ball and 2 runs will be given to the batting team and the ball will not be counted.",
            color: "black",
          },
          {
            text: "If a bowler bowls a no or a wide ball, the delivery will not be counted and each wide or no ball will be given 2 runs to the batting team total. ",
            color: "black",
          },
          {
            text: "If the batsman is a right hander and if the ball goes out of the white wide line it will be given as a wide ball & if the ball is going leg side and is inside the Leg Side line the ball is counted.",
            color: "black",
          },
          {
            text: "Dismissals in Indoor Cricket are as followed: Bowled, Run Out, Catch Out, Stumping and Handling the Ball.",
            color: "black",
          },
          {
            text: "If the bowler is bowling directly above waist and one bounce above shoulder level it is counted as a no ball, but the batter has to play the ball from the crease, in case the batter is outside the crease and plays the ball it will be termed as a good ball.",
            color: "black",
          },
          {
            text: "Incomplete action or throwing the ball to the stump will be termed as a no ball and 2 runs will be given to the batting team.",
            color: "black",
          },
          {
            text: "If the batsman does not hit the ball after it is bowled it is considered as a Dot Ball, the batsman gets 0 runs.",
            color: "black",
          },
          {
            text: "If the batsman hits the ball and the fielders or the wicket-keeper catch it without it touching the floor, the batsman will be dismissed as Catch Out.",
            color: "black",
          },
          {
            text: "If the ball touches a fielder and then hits the nets (zones), the bonus runs will be counted, if the physical runs are taken by the batter.",
            color: "black",
          },
          {
            text: "No runs for overthrow.",
            color: "black",
          },
          {
            text: "If the ball is caught directly after touching the zones (B/C), it will be treated as NOT OUT and bonus runs are applicable if physical run is taken.",
            color: "black",
          },
          {
            text: "If the ball touches the bonus run zones and the fielder accomplishes a run out, the batter will be OUT and no bonus runs will be counted. Physical run will be counted if 1 run is taken and run out happens during the second run",
            color: "black",
          },
          {
            text: "When a batter gets out, the next player coming in will take the strike.",
            color: "black",
          },
          {
            text: "Run out will ONLY be at the batter’s end.",
            color: "black",
          },
          {
            text: "When 6 wickets of a team fall, the last batter will be allowed to bat. The team will send a runner at non-striker’s end. After every physical run taken, the last batsman will have to go back to strike to face the next ball. Run out for the runner will mean dismissal for the last batsman.",
            color: "black",
          },
          {
            text: "Inning Run Bhav Event :",
            color: "red",
          },
          {
            text: "Inning run bhav bets are valid if over reduced due to rain or weather condition or match abandoned the result will be given as per official result.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "If the ball hits Zone B or C onto Zone D, you score 3 bonus runs.",
            color: "black",
          },
          {
            text: "Inning run Bhav bets are valid if over reduced due to rain or weather condition or match abandoned the result will be given as per official result.",
            color: "black",
          },
          {
            text: "Settlement occurs once the stipulated conditions are met, which involves either completion of the allotted overs or the batting team's dismissal, including weather disturbances.",
            color: "black",
          },
          {
            text: "In the event of a weather-shortened match, all Bhav Bets placed in the Inning Run Bhav market will be settled according to the official result. For limited overs matches, this includes results determined by the Duckworth Lewis method.",
            color: "black",
          },
          {
            text: "In case of pitch vandalism, player safety concerns, stadium damage, acts of terrorism, or acts of God, the company holds the authority to nullify all bets, with the exception of those related to markets that have already been conclusively settled.",
            color: "black",
          },
          {
            text: "Bets made during instances of incorrect scorecard updates, inaccurate commentary, delays in suspending the Bhav Bets of Total Innings Runs market, or erroneous updates of rates and odds for Bhav Bets in Total Innings Runs will be removed and deleted from user accounts.",
            color: "black",
          },
          {
            text: "Example: 1st inning run Bhav (ENG v AUS), 2nd Inning run Bhav (ENG v AUS) - England vs Australia T20 Match",
            color: "black",
          },
          {
            text: "Total Match 30s: How many batsman's scored 30 to 49 runs in the full match. If a Player reached 50 means, Not considered in this Event.",
            color: "black",
          },
          {
            text: "Total Boundaries in 1st Power play: Number of Boundaries Scored in 1st Power play, 1st Innings only Valid In T20/ODI Both",
            color: "black",
          },
          {
            text: "Total Dot balls in 1st Power play: Number of Dot balls coming in 1st Power play, 1st Innings only Valid In T20/ODI Both",
            color: "black",
          },
          {
            text: "Total match Wicket keeper's Dismissals: Wicket keepers Caught outs and Stumping Only Considered In T20/ODI Both",
            color: "black",
          },
          {
            text: "1st Inn Death Over Runs: Runs Scored, Last Over Only Considered, 1st Innings only Valid",
            color: "black",
          },
          {
            text: "Total Match Single Digit Scores By Players: Duck outs Not Considered in this Event. If Not out Batsman/Injured Batsman facing One Legal Delivery and nothing scored ('0') means Considered as Single Digit.",
            color: "black",
          },
          {
            text: "Most Balls Faced By a Batsman: Maximum Balls Faced by an Individual Batsman in Match.",
            color: "black",
          },
          {
            text: "High Partnership Boundaries in the Match: Maximum Number of Boundaries Scored during any Partnership.",
            color: "black",
          },
          {
            text: "In case of any circumstances, management decision will be final for all the fancies under World Cup.",
            color: "red",
          },
          {
            text: "WC: WORLD CUP.",
            color: "red",
          },
          {
            text: "MOM: MAN OF THE MATCH.",
            color: "red",
          },
          {
            text: "If World Cup fixture of 48 matches gets reduced due to any reason, then all the special fancies will be voided (Match abandoned due to rain/bad light will not be considered in this)",
            color: "red",
          },
          {
            text: "Super over will not be included",
            color: "red",
          },
          {
            text: "At any situation if result is given for any particular event based on the rates given for the same, then the particular result will be considered valid, similarly if the tournament gets canceled due to any reason the previously given result will be considered valid",
            color: "red",
          },
          {
            text: "Total Match 1st over runs: Average 4 runs will be given in case match abandoned or over reduced (Only First Innings is Valid).",
            color: "black",
          },
          {
            text: "Total Match 1st over Dot Ball: Average 4 runs will be given in case match abandoned or over reduced (Only First Innings is Valid).",
            color: "black",
          },
          {
            text: "Total Match 1st 10 over run: Average 50 runs will be given in case match abandoned or over reduced (Only First Innings is Valid).",
            color: "black",
          },
          {
            text: "Total fours: Average 45 fours will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total sixes: Average 11 sixes will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total Wickets: Average 15 Wickets will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total Wides: Average 16 Wides will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total No balls: Average 2 No ball will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total Extras: Average 26 extras will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total Caught outs: Average 9 caught out will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total Bowled: Average 3 Bowled out will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total LBW: Average 2 LBW will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total Run out: Average 1 Run out will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total Fifties: Average 3 fifties will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total 100s: Average 1 Hundred will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total Ducks: Average 1 Duck out will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total Maidens: Average 4 Maidens will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total 50+ Partnerships: Average 3 Fifty plus Partnerships will be given in case match abandoned or over reduced. 50 and 50 Above Partnerships All Counted in this.",
            color: "black",
          },
          {
            text: "Highest 1st over run in individual match: Only First Innings is Valid.",
            color: "black",
          },
          {
            text: "Highest 1st 10 over run in individual match: Only First Innings is Valid.",
            color: "black",
          },
          {
            text: "Highest Fours in individual match: Both innings are valid.",
            color: "black",
          },
          {
            text: "Highest Sixes in individual match: Both innings are valid.",
            color: "black",
          },
          {
            text: "Highest Wicket in individual match: Both innings are valid.",
            color: "black",
          },
          {
            text: "Highest Extras in individual match: Both innings are valid.",
            color: "black",
          },
          {
            text: "Highest Scoring runs in Over: Both innings are valid.",
            color: "black",
          },
          {
            text: "Highest Run Scorer: Total Runs Scored by An Individual Batsman in Full Tournament.",
            color: "black",
          },
          {
            text: "Highest Wicket Taker: Total Wickets Taken by a Bowler in Full Tournament.",
            color: "black",
          },
          {
            text: "Most Balls Faced By a Batsman in the Match: Maximum Balls Faced by an Individual Batsman in any Single Match.",
            color: "black",
          },
          {
            text: "Most 4s by a Batsman in the Match: Maximum 4s Hitted by an Individual Batsman in any Single Match.",
            color: "black",
          },
          {
            text: "Most 6s by a Batsman in the Match: Maximum 6s Hitted by an Individual Batsman in any Single Match.",
            color: "black",
          },
          {
            text: "Most Dot balls By a Bowler in an Inning: Maximum Dot balls Bowled by a Bowler in his Quota of Innings.",
            color: "black",
          },
          {
            text: "Most runs given by Bowler in an Inning: Maximum Runs conceded by an individual Bowler in an Innings.",
            color: "black",
          },
          {
            text: "Most wickets by Bowler in an inning: Maximum Wickets taken by an individual Bowler in an Innings.",
            color: "black",
          },
          {
            text: "Total 50 Plus Partnership runs: 50 and above 50 runs partnership will be counted in this event.",
            color: "black",
          },
          {
            text: "In fastest fifty always the first 50 runs will be considered, for example, if R Sharma scores 1st fifty in 17 balls and scores 100 in next 14 balls, fastest 50 will be given based on the balls for the 1st fifty runs.",
            color: "black",
          },
          {
            text: "Super over will not be included.",
            color: "black",
          },
          {
            text: "Women's Premier League (WPL): If WPL fixture of 22 matches gets reduced due to any reason, then all the special fancies will be voided (Match abandoned due to rain/bad light will not be considered in this).",
            color: "black",
          },
          {
            text: "Total matches 1st over runs: Average 5 runs will be given in case match abandoned or over reduced (only 1st innings valid).",
            color: "black",
          },
          {
            text: "Total matches 1st 6 over runs: Average 40 runs will be given in case match abandoned or over reduced (Only 1st Innings valid).",
            color: "black",
          },
          {
            text: "Total 4's: Average 32 fours will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total 30's: Average 2 sixes will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total 50's: Average 1 fifties will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Total Wickets: Average 12 Wickets will be given in case match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "At any situation if result is given for any particular event based on the rates given for the same, then the particular result will be considered valid. Similarly, if the tournament gets canceled due to any reason, the previously given result will be considered valid.",
            color: "black",
          },
          {
            text: "Highest innings run: Both innings are valid.",
            color: "black",
          },
          {
            text: "Lowest innings run: Only first innings is valid.",
            color: "black",
          },
          {
            text: "Highest Match 1st over runs in the match: Only first innings is valid.",
            color: "black",
          },
          {
            text: "Highest 1st 6 over runs: Only first innings is valid.",
            color: "black",
          },
          {
            text: "Highest 4's in individual match: Both innings are valid.",
            color: "black",
          },
          {
            text: "Highest Wickets in individual match: Both innings are valid.",
            color: "black",
          },
          {
            text: "Highest over runs: Both innings are valid.",
            color: "black",
          },
          {
            text: "Most Balls Faced By a Batsman: Maximum Balls Faced by a batsman in one Innings.",
            color: "black",
          },
          {
            text: "Most 4's by an individual batsman in an Inning: Maximum Number of Fours Hit By A Batsman in one Innings.",
            color: "black",
          },
          {
            text: "Most Dot balls By a Bowler in an Inning: Maximum Dot balls Bowled by a Bowler in his Quota of Innings.",
            color: "black",
          },
          {
            text: "Most runs given by Bowler in an Inning: Maximum Runs conceded by an individual Bowler in an Innings.",
            color: "black",
          },
          {
            text: "Most wickets by Bowler in an inning: Maximum Wickets taken by an individual Bowler in an Innings.",
            color: "black",
          },
          {
            text: "In fastest fifty always the first 50 runs will be considered, for example, if S Mandhana scores 1st fifty in 17 balls and scores 100 in next 14 balls, fastest 50 will be given based on the balls for the 1st fifty runs.",
            color: "black",
          },
          {
            text: "Super over will not be included.",
            color: "black",
          },
          {
            text: "Total runs: This market is based on how many runs will be scored in the match across both team's innings combined.",
            color: "black",
          },
          {
            text: "Total Overs: This market is based on how many overs will be played in the match across both team's innings combined. (If an Inning completed in 83.4 overs then that calculated as 84 overs).",
            color: "black",
          },
          {
            text: "Total Bowlers Giving 100 runs: Number of Bowlers Giving 100 runs and above per innings. Both innings will be counted.",
            color: "black",
          },
          {
            text: "Any query regarding result or rate has to be contacted within 7 days from the event; query after 7 days from the event will not be considered as valid.",
            color: "black",
          },
          {
            text: "Total Impact overs: Number of overs scored 10 runs or above. Team wise only 1st inning are valid and Match wise both innings are valid.",
            color: "black",
          },
          {
            text: "Total Match Four Hitters: Number of Batsman hitting Fours in full match.",
            color: "black",
          },
          {
            text: "Total Match Six Hitters: Number of Batsman hitting Sixes in full match.",
            color: "black",
          },
          {
            text: "Total Match Wicket Takers: Number of bowlers taking wickets in full match.",
            color: "black",
          },
          {
            text: "100 balls Event: The events for 1 to 100 balls will be considered valid only if the number of balls mentioned has been played completely. However, if the balls got reduced before the particular event then the same will be voided. If the team batting first gets all out prior to 100 balls, the balance balls will be counted from second innings. For example, if team batting first gets all out in 81 balls, balance 19 balls will be counted from second innings and that 19 balls all events are counted. This same is valid for 1st Innings only.",
            color: "black",
          },
        ],
      },
      {
        category: "khado",
        description: [
          {
            text: "Only First inning valid for T20 and one day matches.",
            color: "black",
          },
          {
            text: "Same will be work like Lambi. If match abandoned or over reduced, all bets will be deleted.",
            color: "black",
          },
          {
            text: "You can choose your own value in this event.",
            color: "black",
          },
        ],
      },
      {
        category: "fancy1",
        description: [
          {
            text: "1. Odd/Even Rules. (W.e.f 5th January 2024)",
            color: "red",
          },
          {
            text: "1.1 Advance events will be valid if over reduced before match start. For Ex: - In T20, If over reduced to 16 over so up to 16 over valid remaining over will be deleted.",
            color: "black",
          },
          {
            text: "1.4 All bets regarding to ODD/EVEN player/partnership are valid if one legal delivery is being played, else the bets will be deleted. Player odd/even all advance bets will be valid if one legal delivery is being played in match otherwise voided.",
            color: "black",
          },
          {
            text: "1.6 In any circumstances management decision will be final.",
            color: "black",
          },
          {
            text: "2 Top batsman rules:-",
            color: "red",
          },
          {
            text: "2.1 If any player does not come as per playing eleven then all bets will be get deleted for the particular player.",
            color: "red",
          },
          {
            text: "2.2 two players done the same run in a single match (M Agarwal 30 runs and A Rayudu 30 runs, whole inning top batsmen score also 30 run) then both player settlement to be get done 50 percent (50% , 50%)rate on their original value which given by our exchange.",
            color: "black",
          },
          {
            text: "Suppose we have opened value of M Agarwal 3.75 back and customer place bets on 10000 @ 3.75 rates and A Rayudu 3.0 back and customer place bets on 10000 @ 3.0 rates.",
            color: "black",
          },
          {
            text: "Whole inning result announces 30 run by both player then",
            color: "black",
          },
          {
            text: "Rule of top batsman:-if you bet on M Agarwal you will be get half amount of this rate (10000*3.75/2=18750 you will get)",
            color: "red",
          },
          {
            text: "Rule of top batsman:-if you bet on A Rayudu you will be get half amount of this rate (10000*3.00/2=15000 you will get)",
            color: "red",
          },
          {
            text: "Top batsman only 1st inning valid.",
            color: "black",
          },
          {
            text: "For one day 50 over and for T20 match 20 overs must be played for top batsmen otherwise all bets will be deleted.",
            color: "black",
          },
          {
            text: "Man of the Match Rules",
            color: "black",
          },
          {
            text: "1. All bets will be deleted in case the match is abandoned or over reduced.",
            color: "black",
          },
          {
            text: "2. All bets will be deleted if the mentioned player is not included in playing 11.",
            color: "black",
          },
          {
            text: "3. In case Man of the Match is shared between two players then Dead heat rule will be applicable. For example, K Perera and T Iqbal share the Man of the Match, then the settlement will be done 50% of the rates accordingly.",
            color: "black",
          },
          {
            text: "4. Rules similar to our Top Batsman rules.",
            color: "black",
          },
          {
            text: "Maximum Sixes by Team",
            color: "black",
          },
          {
            text: "1. All bets will be deleted if match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "2. All bets will be deleted if both the teams hit the same number of sixes.",
            color: "black",
          },
          {
            text: "3. Super over will not be considered.",
            color: "black",
          },
          {
            text: "Maximum 6 or 10 over runs",
            color: "black",
          },
          {
            text: "1. All bets will be deleted if match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "2. All the bets will be deleted if both the teams score is the same (Runs scored in 6 or 10 overs).",
            color: "black",
          },
          {
            text: "3. 6 overs for T20 and 10 overs for ODI.",
            color: "black",
          },
          {
            text: "4. Both the innings are valid.",
            color: "black",
          },
          {
            text: "5. This fancy will be valid for 1st 6 overs of both innings for T20 and 1st 10 overs of both innings for ODI.",
            color: "black",
          },
          {
            text: "Batsman Match",
            color: "black",
          },
          {
            text: "Bets for Favourite batsman from the two batsman matched.",
            color: "black",
          },
          {
            text: "All bets will be deleted if any one of the mentioned players is not included in playing 11.",
            color: "black",
          },
          {
            text: "All bets will be deleted unless one ball is played by both the mentioned players.",
            color: "black",
          },
          {
            text: "All bets will be deleted if over reduced or Match abandoned.",
            color: "black",
          },
          {
            text: "All bets will be deleted if both the players scored the same runs. For example, H Amla and J Bairstow are the batsmen matched, H Amla and J Bairstow both scored 38 runs then all bets will be deleted.",
            color: "black",
          },
          {
            text: "Both innings will be valid.",
            color: "black",
          },
          {
            text: "Opening Pair",
            color: "black",
          },
          {
            text: "1. Bets for Favourite opening pair from the two mentioned opening pairs.",
            color: "black",
          },
          {
            text: "2. Runs made by both the opening players will be added. For example, J Roy scored 20 runs and J Bairstow scored 30 runs; the result will be 50 runs.",
            color: "black",
          },
          {
            text: "3. The highest run made by the pair will be declared as winner. For example, Opening pair ENG total is 70 runs and Opening pair SA is 90 runs, then SA 90 runs will be declared as winner.",
            color: "black",
          },
          {
            text: "Both innings will be valid.",
            color: "black",
          },
          {
            text: "Our exchange Special",
            color: "black",
          },
          {
            text: "All bets will be deleted if the mentioned player is not included in playing 11.",
            color: "black",
          },
          {
            text: "All bets will be deleted if match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "Both innings will be valid.",
            color: "black",
          },
          {
            text: "Direction of First Boundary",
            color: "black",
          },
          {
            text: "All bets will be deleted if the mentioned batsman is not included in playing 11.",
            color: "black",
          },
          {
            text: "All bets will be deleted if match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "The boundary hit through the off side of the stump will be considered as off side four.",
            color: "black",
          },
          {
            text: "The boundary hit through the leg side of the stump will be considered as leg side four.",
            color: "black",
          },
          {
            text: "Boundaries through extras (byes, leg byes, wide, overthrow) will not be considered as valid.",
            color: "black",
          },
          {
            text: "Only 1st Inning will be considered.",
            color: "black",
          },
          {
            text: "Fifty & Century by Batsman",
            color: "black",
          },
          {
            text: "All bets will be deleted if match abandoned or over reduced.",
            color: "black",
          },
          {
            text: "All bets will be deleted if the mentioned batsman is not included in playing 11.",
            color: "black",
          },
          {
            text: "All bets will be deleted unless the batsman faces one legal ball.",
            color: "black",
          },
          {
            text: "Both Innings will be valid.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "Politics",
    rules: [
      {
        category: "Fancy",
        description: [
          {
            text: "This event is to decide the winner of various legislative assemblies of India.",
            color: "black",
          },
          {
            text: "The final result declared by the Election Commission of India for assembly elections of various states of India for a particular year will be valid in our exchange. The customers are entirely responsible for their bets at all times.",
            color: "black",
          },
          {
            text: "All bets will be voided if the election doesn't take place in the given time by the Election Commission or as per our exchange management decision.",
            color: "black",
          },
          {
            text: "Company reserves the right to suspend/void any bets on this event at any time if we find the same not to be legitimate with the certainty of the outcome.",
            color: "black",
          },
          {
            text: "Accidental issues during assembly elections will not be counted in our exchange. If required, additional candidates may be added on request.",
            color: "black",
          },
          {
            text: "Kindly be informed no candidates will be partially settled and will remain in the market until it is fully settled. This is to ensure that all customers can continue trading for the candidates that they have positions on, since each candidate is still a valid runner in this market.",
            color: "black",
          },
          {
            text: "Please be informed that the transmissions described as 'live' by few broadcasters may actually be delayed due to multiple scenarios.",
            color: "black",
          },
          {
            text: "If any candidate withdraws for any reason, including death, all bets on the market will be valid and be settled as per the defined rules.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "Golf",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Motor Sports",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation: Although the current score, time elapsed, video and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. Provides this data AS IS with no warranty as to the accuracy, completeness or timeliness of such data and accepts no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
      {
        category: "Bookmaker",
        description: [
          {
            text: "All race bets are settled on the official classification from the Federation Internationale de l’Automobile (FIA), the sport’s governing body, at the time of podium presentation.",
            color: "black",
          },
          {
            text: "If a race is postponed (either before the start or via an interruption mid-race) but is concluded within 72 hours of the original scheduled start time, then all bets will stand.",
            color: "black",
          },
          {
            text: "Our exchange management decision will be the final decision.",
            color: "black",
          },
          {
            text: "Any query about the result should be contacted within 7 days of the specific event, the same will not be considered valid post 7 days from the event.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "BaseBall",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Rugby Union",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "Rugby League",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "Darts",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "American FootBall",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Snooker",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Match Odds: Predict which player will win the match. In the event of a match starting but not being completed, the player progressing to the next round or being awarded the victory will be deemed the winner for settlement purposes. In the event of a match not starting at all, all bets are refunded.",
            color: "black",
          },
          {
            text: "Frame Winner: If the nominated frame is not played, bets will be void. Similarly, if the nominated frame is awarded to a player without a shot being played, then all bets will be void.",
            color: "black",
          },
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation: Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. Provides this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accepts no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Boxing",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Soccer",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "E sports",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "GreyHound Racing",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Kabaddi",
    rules: [
      {
        category: "Fancy",
        description: [
          {
            text: "In any circumstances, management decision will be final related to all Fancy of kabaddi of our exchange.",
            color: "black",
          },
          {
            text: "All fancy bets will be validated when the match has been tied.",
            color: "black",
          },
          {
            text: "Result of individual player of fancy will be validated only when player plays that match.",
            color: "black",
          },
          {
            text: "In any case wrong rate has been given in fancy, that particular bet will be deleted.",
            color: "black",
          },
          {
            text: "For Playoffs, Final Result of 40 minutes of two halves will be valid in our exchange.",
            color: "black",
          },
          {
            text: "In case, the company detects Ground bets, Group betting, Punching bets, Multiple entries with the same IP or any fraud or unusual activities, the company will void winning bets and charge a penalty of 2X (Two times) from the winning amount.",
            color: "red",
          },
          {
            text: "If any player gets injured during the match, then all the bets will be valid for that individual player.",
            color: "black",
          },
        ],
      },
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example, in case of VPN/robot-use/multiple entries from the same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation: Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. Provides this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accepts no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
      {
        category: "Bookmaker",
        description: [
          {
            text: "In case, the company detects Ground bets, Group betting, Punching bets, Multiple entries with the same IP or any fraud or unusual activities, the company will void winning bets and charge a penalty of 2X (Two times) from the winning amount.",
            color: "red",
          },
        ],
      },
    ],
  },
  {
    sportName: "Boat Racing",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "Esoccer",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "Beach VollyBall",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example in case of VPN/robot-use/multiple entry from same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation :- Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. We provide this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accept no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },
  {
    sportName: "Table Tennis",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Match odds: Predict which player will win the match. In the event of any of the named players in a match changing before the match starts, then all bets are void. In the event of a match starting but not being completed, all bets will be void.",
            color: "black",
          },
          {
            text: "Set Winner: The specified set must be completed for bets to stand, unless the specific market outcome is already determined.",
            color: "black",
          },
          {
            text: "Under / Over Points: For example, a game is abandoned at 9-7: bets on Over/Under 16.5 Game - Total Points are settled as winners/losers respectively, since any natural conclusion to the game would have yielded at least 18 points.",
            color: "black",
          },
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example, in case of VPN/robot-use/multiple entries from the same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation: Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. Provides this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accepts no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },

  {
    sportName: "Futsal",
    rules: [
      {
        category: "Match",
        description: [
          {
            text: "Match Odds: Bets will be void if the match is not completed.",
            color: "red",
          },
          {
            text: "Next Goal: Predict which team will score the X-th goal.",
            color: "black",
          },
          {
            text: "1st Half Winner: Half bets will be settled at the end of the 1st half. In the event of a 1st half not being completed, bets will be void.",
            color: "black",
          },
          {
            text: "Highest Scoring Half: Predict in which Event Part will be scored most.",
            color: "black",
          },
          {
            text: "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example, in case of VPN/robot-use/multiple entries from the same or different IP and others. Note: only winning bets will be voided.",
            color: "red",
          },
          {
            text: "For live streaming and animation: Although the current score, time elapsed, video, and other data provided on this site is sourced from 'live' feeds provided by third parties, you should be aware that this data may be subject to a time delay and/or be inaccurate. Please also be aware that other customers may have access to data that is faster and/or more accurate than the data shown on the site. If you rely on this data to place bets, you do so entirely at your own risk. Provides this data AS IS with no warranty as to the accuracy, completeness, or timeliness of such data and accepts no responsibility for any loss (direct or indirect) suffered by you as a result of your reliance on it.",
            color: "black",
          },
        ],
      },
    ],
  },
];

export const casinoIcons = [
  {
    game_id: "1",
    url: "/ballbyball",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/ballbyball.jpg",
    name: "Ball By Ball",
  },
  {
    game_id: "2",
    url: "/superover",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/superover.jpg",
    name: "Super Over",
  },
  {
    game_id: "3",
    url: "/race20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/race20.png",
    name: "Race 20-20",
  },
  {
    game_id: "4",
    url: "/queen",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/queen.jpg",
    name: "Casino Queen",
  },
  {
    game_id: "5",
    url: "/cricketv3",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cricketv3.jpg",
    name: "5Five Cricket",
  },
  {
    game_id: "6",
    url: "/abj2",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar2.jpg",
    name: "Andar Bahar 2",
  },
  {
    game_id: "7",
    url: "/dt202",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt202.jpg",
    name: "20-20 Dragon Tiger 2",
  },
  {
    game_id: "8",
    url: "/baccarat2",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat2.jpg",
    name: "Baccarat 2",
  },
  {
    game_id: "9",
    url: "/baccarat",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat.png",
    name: "Baccarat",
  },
  {
    game_id: "10",
    url: "/lucky7eu",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7eu.jpg",
    name: "Lucky 7 - B",
  },
  {
    game_id: "11",
    url: "/cmatch20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cc-20.jpg",
    name: "20-20 Cricket Match",
  },
  {
    game_id: "12",
    url: "/cmeter",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cmeter.jpg",
    name: "Casino Meter",
  },
  {
    game_id: "13",
    url: "/war",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/war.jpg",
    name: "Casino War",
  },
  {
    game_id: "14",
    url: "/dtl20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dtl.jpg",
    name: "20-20 DTL",
  },
  {
    game_id: "15",
    url: "/teen9",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
    name: "Test Teenpatti",
  },
  {
    game_id: "16",
    url: "/teen8",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
    name: "Open Teenpatti",
  },
  {
    game_id: "17",
    url: "/teen",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
    name: "1 Day Teenpatti",
  },
  {
    game_id: "18",
    url: "/teen20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
    name: "20-20 Teenpatti",
  },
  {
    game_id: "19",
    url: "/poker6",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
    name: "6 Player Poker",
  },
  {
    game_id: "20",
    url: "/poker",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
    name: "1 Day Poker",
  },
  {
    game_id: "21",
    url: "/poker20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
    name: "20-20 Poker",
  },
  {
    game_id: "22",
    url: "/ab20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar.jpg",
    name: "Andar Bahar",
  },
  // {
  //   url: "",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/worli.jpg",
  //   name: "Worli Matka",
  // },
  {
    game_id: "24",
    url: "/worli2",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/worli.jpg",
    name: "Instant Worli",
  },
  {
    game_id: "25",
    url: "/3cardj",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/3cardsJ.jpg",
    name: "3 Cards Judgement",
  },
  {
    game_id: "26",
    url: "/32cards-A",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsA.jpg",
    name: "32 Cards A",
  },
  {
    game_id: "27",
    url: "/32cards-B",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsB.jpg",
    name: "32 Cards B",
  },
  {
    game_id: "28",
    url: "/aaa",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/aaa.jpg",
    name: "Amar Akbar Anthony",
  },
  {
    game_id: "29",
    url: "/btable",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/bollywood-casino.jpg",
    name: "Bollywood Casino",
  },
  {
    game_id: "30",
    url: "/dt20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg",
    name: "20-20 Dragon Tiger",
  },
  {
    game_id: "31",
    url: "/dt6",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg",
    name: "1 Day Dragon Tiger",
  },
  {
    game_id: "32",
    url: "/lucky7-A",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7.jpg",
    name: "Lucky 7 - A",
  },
];

// export const liveCasinoGameList = [
//   { name: "AVIATORX", id: 1 },
//   { name: "Aviator Blue", id: 2 },
//   { name: "Sic Bo", id: 3 },
//   { name: "Lankesh", id: 4 },
//   { name: "Ball By Ball", id: 5 },
//   { name: "Super Over", id: 6 },
//   { name: "10 - 10 cricket", id: 7 },
//   { name: "Queen", id: 8 },
//   { name: "Casino Queen", id: 9 },
//   { name: "Race 20", id: 10 },
//   { name: "Race 20-20", id: 11 },
//   { name: "5Five Cricket", id: 12 },
//   { name: "5 Five Cricket", id: 13 },
//   { name: "Amar Akbar Anthony", id: 14 },
//   { name: "Teenpatti One Day", id: 15 },
//   { name: "Teenpatti 20 20", id: 16 },
//   { name: "Muflis Teenpatti", id: 17 },
//   { name: "Open Teen patti", id: 18 },
//   { name: "INSTANT 2 CARDS TEENPATTI", id: 19 },
//   { name: "Muflis Teenpatti One Day", id: 20 },
//   { name: "Two Card Teenpatti One Day", id: 21 },
//   { name: "Test Teenpatti", id: 22 },
//   { name: "Dragon Tiger Vivo", id: 23 },
//   { name: "Dragon Tiger 2", id: 24 },
//   { name: "1 Day Dragon Tiger", id: 25 },
//   { name: "Test Teenpatti", id: 999 },
//   { name: "DTL", id: 26 },
//   { name: "Andar Bahar", id: 27 },
//   { name: "Andar Bahar 2", id: 28 },
//   { name: "TRAP", id: 29 },
//   { name: "Bollywood Casino B", id: 30 },
//   { name: "Bollywood Casino", id: 31 },
//   { name: "Race to 2nd", id: 32 },
//   { name: "Race to 17", id: 33 },
//   { name: "Casino War", id: 34 },
//   { name: "Lottery", id: 35 },
//   { name: "Bacarrat", id: 36 },
//   { name: "29 Baccarat", id: 37 },
//   { name: "Baccarat 2", id: 38 },
//   { name: "Baccarat One Day", id: 39 },
//   { name: "32 Cards A", id: 40 },
//   { name: "32 Cards B", id: 41 },
//   { name: "Trio", id: 42 },
//   { name: "High Low", id: 43 },
//   { name: "Poker 1 day", id: 44 },
//   { name: "Six Player Poker", id: 45 },
//   { name: "Poker", id: 46 },
//   { name: "20-20 Poker", id: 47 },
//   { name: "3 Cards Judgement", id: 48 },
//   { name: "One Card One Day", id: 49 },
//   { name: "One Card 20-20", id: 50 },
//   { name: "1 Day Dragon Tiger", id: 51 },
//   { name: "20-20 DTL", id: 52 },
//   { name: "Lucky7", id: 53 },
//   { name: "Lucky 7 - B", id: 54 },
//   { name: "Roulette", id: 55 },
//   { name: "One Card Meter", id: 56 },
//   { name: "Cricket 2020", id: 57 },
//   { name: "20-20 Dragon Tiger 2", id: 58 },
//   { name: "Foot Ball Studio", id: 59 },
//   { name: "Dus ka Dum", id: 60 },
//   { name: "Lucky 7 - A", id: 61 },
//   { name: "20-20 Cricket Match", id: 62 },
//   { name: "6 Player Poker", id: 63 },
//   { name: "Casino Meter", id: 64 },
//   { name: "Open Teenpatti", id: 65 },
//   { name: "1 Day Teenpatti", id: 66 },
//   { name: "20-20 Teenpatti", id: 67 },
//   { name: "Instant Worli", id: 68 },
//   { name: "V-2 Card TP", id: 69 },
//   { name: "V-Casino Meter", id: 70 },
//   { name: "V-Bollywood Casino", id: 71 },
//   { name: "V-Mulfis Teenpatti", id: 72 },
//   { name: "V-Worli Matka", id: 73 },
//   { name: "V-Trio", id: 74 },
//   { name: "V-Dragon Tiger", id: 75 },
//   { name: "V-Amar Akbar Anthony", id: 76 },
//   { name: "Limbo", id: 77 },
//   { name: "V-Queen Race", id: 78 },
//   { name: "V-Lucky 7", id: 79 },
//   { name: "V-32 Cards", id: 80 },
//   { name: "V-29 card bacarrat", id: 81 },
//   { name: "Mines", id: 82 },
//   { name: "V-20-20 DTL", id: 83 },
//   { name: "V-Super over", id: 84 },
//   { name: "1 Day Poker", id: 85 },
//   { name: "V-Poker", id: 86 },
//   { name: "V-20-20 Teenpatti", id: 87 },
//   { name: "V-Andar Bahar", id: 88 },
//   { name: "V-Auto Roulette", id: 89 },
//   { name: "Plinko", id: 90 },
//   { name: "Crash", id: 91 },
//   { name: "V-Race T20", id: 92 },
//   { name: "V-High low", id: 93 },
//   { name: "Diamonds", id: 94 },
//   { name: "Dice", id: 95 },
//   { name: "Hilo", id: 96 },
//   { name: "X-Roulette", id: 97 },
// ];

export const liveCasinoGameList: any = [
  {
    game_id: "150063",
    game_name: "Dream Wheel",
    category: "live game show",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dw.webp",
    game_code: "MAC88-YLGS101",
  },
  {
    game_id: "150046",
    game_name: "Cricket Match 20-20",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/cricket2020.webp",
    game_code: "MAC88-XCM101",
  },
  {
    game_id: "150637",
    game_name: "Cricket Match 20-20",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/cm.webp",
    game_code: "ME-BCM101",
  },
  {
    game_id: "150001",
    game_name: "Dragon Tiger",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dt_mac88.webp",
    game_code: "MAC88-YDT102",
  },
  {
    game_id: "150013",
    game_name: "DTL",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dtl_20_20.webp",
    game_code: "MAC88-YDTL101",
  },
  {
    game_id: "150036",
    game_name: "1 Day Dragon Tiger",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dt_1day.webp",
    game_code: "MAC88-X1DT101",
  },
  {
    game_id: "150067",
    game_name: "Dragon Tiger 2",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dt2.webp",
    game_code: "MAC88-DT2101",
  },
  {
    game_id: "150600",
    game_name: "Dragon Tiger",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/dt.webp",
    game_code: "ME-BDT101",
  },
  {
    game_id: "150609",
    game_name: "Dragon Tiger Lion",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/dtl.webp",
    game_code: "ME-BDTL101",
  },
  {
    game_id: "150628",
    game_name: "1 Day Dragon Tiger",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/dt1d.webp",
    game_code: "ME-B1DT101",
  },
  {
    game_id: "150646",
    game_name: "Dragon Tiger 2",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/dt2.webp",
    game_code: "ME-BDT2101",
  },
  {
    game_id: "150041",
    game_name: "6 Player Poker",
    category: "Poker",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/6pp.webp",
    game_code: "MAC88-X6PP101",
  },
  {
    game_id: "150005",
    game_name: "Poker 20-20",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/20_20_poker.webp",
    game_code: "MAC88-XPOK101",
  },
  {
    game_id: "150032",
    game_name: "Poker 1-Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/poker_1_day.webp",
    game_code: "MAC88-Y1POK101",
  },
  {
    game_id: "150604",
    game_name: "Poker 20-20",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/2020poker.webp",
    game_code: "ME-BPOK101",
  },
  {
    game_id: "150624",
    game_name: "Poker 1-Day",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/1dpoker.webp",
    game_code: "ME-B1POK101",
  },
  {
    game_id: "150633",
    game_name: "6 Player Poker",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/6pp.webp",
    game_code: "ME-B6PP101",
  },
  {
    game_id: "150056",
    game_name: "Instant Teen Patti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/itp.webp",
    game_code: "MAC88-ZITP101",
  },

  {
    game_id: "150070",
    game_name: "AK47 Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/ak47tp.webp",
    game_code: "MAC88-XAK47101",
  },
  {
    game_id: "150054",
    game_name: "Muflis Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/mtp.webp",
    game_code: "MAC88-ZMTP101",
  },
  {
    game_id: "150066",
    game_name: "20 20 Teenpatti 2",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/2020tp2.webp",
    game_code: "MAC88-TPTT2101",
  },
  {
    game_id: "150009",
    game_name: "Teenpatti One Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/tp1d.webp",
    game_code: "MAC88-X1TP101",
  },
  {
    game_id: "150023",
    game_name: "Test Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/teenpatti_test.webp",
    game_code: "MAC88-YTTP102",
  },
  {
    game_id: "150042",
    game_name: "Instant 2 Cards Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/2_card_tp.webp",
    game_code: "MAC88-X2TP101",
  },
  {
    game_id: "150030",
    game_name: "Muflis Teenpatti 1 Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/muflis_teenpati.webp",
    game_code: "MAC88-Y1MTP101",
  },
  {
    game_id: "150033",
    game_name: "20-20 Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/20_20_teenpatti.webp",
    game_code: "MAC88-YTPTT101",
  },
  {
    game_id: "150028",
    game_name: "Two Card Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/2_cards_teenpatti.webp",
    game_code: "MAC88-Y12TP101",
  },
  {
    game_id: "150049",
    game_name: "Open Teen patti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/open_teen_patti.webp",
    game_code: "MAC88-YOTP101",
  },
  {
    game_id: "150607",
    game_name: "Teenpatti One Day",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/tp1d.webp",
    game_code: "ME-B1TP101",
  },
  {
    game_id: "150617",
    game_name: "Test Teenpatti",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/ttp.webp",
    game_code: "ME-BTTP102",
  },
  {
    game_id: "150621",
    game_name: "Two Card Teenpatti",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/2ctp.webp",
    game_code: "ME-B12TP101",
  },
  {
    game_id: "150622",
    game_name: "Muflis Teenpatti One Day",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/mtp1d.webp",
    game_code: "ME-B1MTP101",
  },
  {
    game_id: "150625",
    game_name: "20-20 Teenpatti",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/2020tp.webp",
    game_code: "ME-BTPTT101",
  },
  {
    game_id: "150634",
    game_name: "Instant 2 Cards Teenpatti",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/instant_2ctp.webp",
    game_code: "ME-B2TP101",
  },
  {
    game_id: "150640",
    game_name: "Open Teen patti",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/otp.webp",
    game_code: "ME-BOTP101",
  },
  {
    game_id: "150645",
    game_name: "20 20 Teenpatti 2",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/2020tp2.webp",
    game_code: "ME-BTPTT2101",
  },
  {
    game_id: "150647",
    game_name: "Muflis Teenpatti",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/mtp.webp",
    game_code: "ME-BMTP101",
  },
  {
    game_id: "150649",
    game_name: "AK47 Teenpatti",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/ak47tp.webp",
    game_code: "ME-BAK47101",
  },
  {
    game_id: "150057",
    game_name: "Andar Bahar 50",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/ab50.webp",
    game_code: "MAC88-ZABL101",
  },
  {
    game_id: "150007",
    game_name: "Andar Bahar",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/andar_bahar.webp",
    game_code: "MAC88-XAB101",
  },
  {
    game_id: "150606",
    game_name: "Andar Bahar",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/ab.webp",
    game_code: "ME-BAB101",
  },
  {
    game_id: "150656",
    game_name: "Andar Bahar 50",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/ab50.webp",
    game_code: "ME-BABL101",
  },
  {
    game_id: "150068",
    game_name: "Lucky 5",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lucky5.webp",
    game_code: "MAC88-XLK5101",
  },
  {
    game_id: "150006",
    game_name: "Lucky7",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lucky_7.webp",
    game_code: "MAC88-YLK7101",
  },
  {
    game_id: "150605",
    game_name: "Lucky 7",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/l7.webp",
    game_code: "ME-BLK7101",
  },
  {
    game_id: "150651",
    game_name: "Lucky 5",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/lucky5.webp",
    game_code: "ME-BLK5101",
  },
  {
    game_id: "150002",
    game_name: "Bacarrat",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/baccarat_mac88.webp",
    game_code: "MAC88-XBAC101",
  },
  {
    game_id: "150026",
    game_name: "29 Baccarat",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/29b.webp",
    game_code: "MAC88-X29BC101",
  },
  {
    game_id: "150601",
    game_name: "Baccarat",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/baccarat.webp",
    game_code: "ME-BBAC101",
  },
  {
    game_id: "150620",
    game_name: "29 Baccarat",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/29b.webp",
    game_code: "ME-B29BC101",
  },
  {
    game_id: "150643",
    game_name: "Baccarat One Day",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/b1d.webp",
    game_code: "ME-B1BAC101",
  },
  {
    game_id: "150016",
    game_name: "Queen Race",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/queen.webp",
    game_code: "MAC88-YQR102",
  },
  {
    game_id: "150612",
    game_name: "Queen Race",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/queen.webp",
    game_code: "ME-BQR102",
  },
  {
    game_id: "150017",
    game_name: "Race 20",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/race_20.webp",
    game_code: "MAC88-YRTT102",
  },
  {
    game_id: "150613",
    game_name: "Race 20",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/r20.webp",
    game_code: "ME-BRTT102",
  },
  {
    game_id: "150043",
    game_name: "Race to 17",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/race_17.webp",
    game_code: "MAC88-XRT17101",
  },
  {
    game_id: "150635",
    game_name: "Race to 17",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/race17.webp",
    game_code: "ME-BRT17101",
  },
  {
    game_id: "150048",
    game_name: "Race to 2nd",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/race_2.webp",
    game_code: "MAC88-X1RTS101",
  },
  {
    game_id: "150639",
    game_name: "Race to 2nd",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/race2.webp",
    game_code: "ME-B1RTS101",
  },
  {
    game_id: "150059",
    game_name: "Center card",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/cc.webp",
    game_code: "MAC88-ZCC101",
  },

  {
    game_id: "150050",
    game_name: "Center Card One Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/center_card_one_day.webp",
    game_code: "MAC88-Y1CC101",
  },
  {
    game_id: "150650",
    game_name: "Center Card",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/cc.webp",
    game_code: "ME-BCC101",
  },
  {
    game_id: "150641",
    game_name: "Center Card One Day",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/cc1d.webp",
    game_code: "ME-B1CC101",
  },

  {
    game_id: "150003",
    game_name: "Sic Bo",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/sicbo_mac88.webp",
    game_code: "MAC88-XSB101",
  },
  {
    game_id: "150602",
    game_name: "Sic Bo",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/sb.webp",
    game_code: "ME-BSB101",
  },
  {
    game_id: "150051",
    game_name: "High Low",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/high_low.webp",
    game_code: "MAC88-YHL101",
  },
  {
    game_id: "150642",
    game_name: "High Low",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/hl.webp",
    game_code: "ME-BHL101",
  },
  {
    game_id: "150058",
    game_name: "Super Over",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/so.webp",
    game_code: "MAC88-ZSP101",
  },
  {
    game_id: "150654",
    game_name: "Instant Super Over",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/iso.webp",
    game_code: "ME-BSP101",
  },
  {
    game_id: "150020",
    game_name: "Lottery",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lottery.webp",
    game_code: "MAC88-XLOT101",
  },
  {
    game_id: "150616",
    game_name: "Lottery",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/lottery.webp",
    game_code: "ME-BLOT101",
  },

  {
    game_id: "150061",
    game_name: "Side Bet city",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/sbc.webp",
    game_code: "MAC88-ZSBC101",
  },
  {
    game_id: "150652",
    game_name: "Side Bet City",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/sbc.webp",
    game_code: "ME-BSBC101",
  },
  {
    game_id: "150019",
    game_name: "Worli Matka",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/worli_matka.webp",
    game_code: "MAC88-YWM102",
  },
  {
    game_id: "150055",
    game_name: "Instant worli",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/iw.webp",
    game_code: "MAC88-ZIW101",
  },
  {
    game_id: "150653",
    game_name: "Instant Worli",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/iw.webp",
    game_code: "ME-BIW101",
  },
  {
    game_id: "150004",
    game_name: "Roulette",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/roulette_mac88.webp",
    game_code: "MAC88-XRT101",
  },
  {
    game_id: "150603",
    game_name: "Roulette",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/roulette.webp",
    game_code: "ME-BRT101",
  },

  {
    game_id: "150014",
    game_name: "Amar Akbar Anthony",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/amar_akbar_anthony.webp",
    game_code: "MAC88-YA3101",
  },
  {
    game_id: "150610",
    game_name: "Amar Akbar Anthony",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/aaa.webp",
    game_code: "ME-BA3101",
  },
  {
    game_id: "150015",
    game_name: "3 Cards Judgement",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/3cj.webp",
    game_code: "MAC88-X3CJ101",
  },
  {
    game_id: "150611",
    game_name: "3 Cards Judgement",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/3cj.webp",
    game_code: "ME-B3CJ101",
  },
  {
    game_id: "150018",
    game_name: "Casino War",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/casino_war.webp",
    game_code: "MAC88-XCAW101",
  },
  {
    game_id: "150614",
    game_name: "Casino War",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/cw.webp",
    game_code: "ME-BCAW101",
  },

  {
    game_id: "150025",
    game_name: "Trio",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/trio.webp",
    game_code: "MAC88-XTRI101",
  },
  {
    game_id: "150619",
    game_name: "Trio",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/trio.webp",
    game_code: "ME-BTRI101",
  },
  {
    game_id: "150031",
    game_name: "Bollywood Casino B",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/bollywood_casino.webp",
    game_code: "MAC88-YBOC102",
  },
  {
    game_id: "150623",
    game_name: "Bollywood Casino",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/bc.webp",
    game_code: "ME-BBOC102",
  },
  {
    game_id: "150037",
    game_name: "Dus Ka Dum",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/10kadum.webp",
    game_code: "MAC88-X1DKD101",
  },
  {
    game_id: "150629",
    game_name: "Dus Ka Dum",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/dkd.webp",
    game_code: "ME-B1DKD101",
  },
  {
    game_id: "150040",
    game_name: "One Card One Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/1c1d.webp",
    game_code: "MAC88-X10C101",
  },
  {
    game_id: "150648",
    game_name: "One Card One Day",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/1c1d.webp",
    game_code: "ME-B1OC101",
  },
  {
    game_id: "150045",
    game_name: "Note Number",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/notenumber.webp",
    game_code: "MAC88-X1NN101",
  },
  {
    game_id: "150636",
    game_name: "Note Number",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/nn.webp",
    game_code: "ME-B1NN101",
  },
  {
    game_id: "150053",
    game_name: "10 - 10 cricket ",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/10_10_cricket.webp",
    game_code: "MAC88-YXC101",
  },
  {
    game_id: "150010",
    game_name: "32 Cards",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/32_cards.webp",
    game_code: "MAC88-Y32CA102",
  },
  {
    game_id: "150657",
    game_name: "FootBall Studio Dice",
    category: "Game Shows",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/fsd.webp",
    game_code: "ME-BFBS101",
  },
  {
    game_id: "150630",
    game_name: "One Card 20 20",
    category: "Live",
    provider_name: "MAC Excite",
    sub_provider_name: "MAC Excite",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/macexcite/1c.webp",
    game_code: "ME-BCTT101",
  },

  {
    game_id: "151083",
    game_name: "Ball by Ball VR",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/bbb.webp",
    game_code: "MAC88-BB101",
  },
  {
    game_id: "151081",
    game_name: "Lucky 15",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lucky15.webp",
    game_code: "MAC88-L15101",
  },
  {
    game_id: "151026",
    game_name: "Lankesh",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lankesh.jpeg",
    game_code: "MAC88-VTGLN101",
  },
  // {
  //   game_id: "151027",
  //   game_name: "Aviator X",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/aviatorx.webp",
  //   game_code: "MAC88-CAV101-VR",
  // }, //
  // {
  //   game_id: "151067",
  //   game_name: "AviatorX2",
  //   category: "Crash Games",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/aviatorx2.webp",
  //   game_code: "MAC88-CAVB101",
  // }, //
  // {
  //   game_id: "150003",
  //   game_name: "Sic Bo",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/sicbo_mac88.webp",
  //   game_code: "MAC88-XSB101",
  // }, //
  // {
  //   game_id: 1,
  //   url: "/ballbyball",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/ballbyball.jpg",
  //   game_name: "Ball By Ball",
  // }, //
  // {
  //   game_id: 2,
  //   url: "/superover",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/superover.jpg",
  //   game_name: "Super Over",
  // }, //
  // {
  //   game_id: "150016",
  //   game_name: "Queen Race",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/queen.webp",
  //   game_code: "MAC88-YQR102",
  // }, //
  // {
  //   game_id: 4,
  //   url: "/queen",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/queen.jpg",
  //   game_name: "Casino Queen",
  // }, //
  // {
  //   game_id: "150017",
  //   game_name: "Race 20",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/race_20.webp",
  //   game_code: "MAC88-YRTT102",
  // }, //
  // {
  //   game_id: 3,
  //   url: "/race20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/race20.png",
  //   game_name: "Race 20-20",
  // }, //
  // {
  //   game_id: 5,
  //   url: "/cricketv3",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cricketv3.jpg",
  //   game_name: "5Five Cricket",
  // }, //
  // {
  //   game_id: "150035",
  //   game_name: "5 Five Cricket",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/5_five_cricket.webp",
  //   game_code: "MAC88-Y15C101",
  // }, //
  // {
  //   game_id: "150014",
  //   game_name: "Amar Akbar Anthony",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/amar_akbar_anthony.webp",
  //   game_code: "MAC88-YA3101",
  // }, //
  // {
  //   game_id: "28",
  //   url: "/aaa",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/aaa.jpg",
  //   game_name: "Amar Akbar Anthony",
  // }, //

  // {
  //   game_id: "150009",
  //   game_name: "Teenpatti One Day",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/tp1d.webp",
  //   game_code: "MAC88-X1TP101",
  // }, //
  // {
  //   game_id: "150033",
  //   game_name: "20-20 Teenpatti",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/20_20_teenpatti.webp",
  //   game_code: "MAC88-YTPTT101",
  // }, //
  // {
  //   game_id: "150049",
  //   game_name: "Open Teen patti",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/open_teen_patti.webp",
  //   game_code: "MAC88-YOTP101",
  // }, //
  // {
  //   game_id: "150042",
  //   game_name: "Instant 2 Cards Teenpatti",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/2_card_tp.webp",
  //   game_code: "MAC88-X2TP101",
  // }, //
  // {
  //   game_id: "150028",
  //   game_name: "Two Card Teenpatti",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/2_cards_teenpatti.webp",
  //   game_code: "MAC88-Y12TP101",
  // }, //
  // {
  //   game_id: "150023",
  //   game_name: "Test Teenpatti",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/teenpatti_test.webp",
  //   game_code: "MAC88-YTTP102",
  // }, //
  // {
  //   game_id: 10,
  //   url: "/lucky7eu",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7eu.jpg",
  //   game_name: "Lucky 7 - B",
  // }, //
  // {
  //   game_id: "150001",
  //   game_name: "Dragon Tiger",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/dt_mac88.webp",
  //   game_code: "MAC88-YDT102",
  // }, //
  // {
  //   game_id: "150067",
  //   game_name: "Dragon Tiger 2",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/dt2.webp",
  //   game_code: "MAC88-DT2101",
  // }, //
  // {
  //   game_id: 31,
  //   url: "/dt6",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg",
  //   game_name: "1 Day Dragon Tiger",
  // }, //
  // {
  //   game_id: "150013",
  //   game_name: "DTL",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/dtl_20_20.webp",
  //   game_code: "MAC88-YDTL101",
  // }, //
  // {
  //   game_id: 6,
  //   url: "/abj2",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar2.jpg",
  //   game_name: "Andar Bahar 2",
  // }, //
  // {
  //   game_id: 22,
  //   url: "/ab20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar.jpg",
  //   game_name: "Andar Bahar",
  // }, //
  // {
  //   game_id: "150024",
  //   game_name: "The Trap",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/trap.webp",
  //   game_code: "MAC88-XTRP101",
  // }, //
  // {
  //   game_id: "150031",
  //   game_name: "Bollywood Casino B",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/bollywood_casino.webp",
  //   game_code: "MAC88-YBOC102",
  // }, //
  // {
  //   game_id: 29,
  //   url: "/btable",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/bollywood-casino.jpg",
  //   game_name: "Bollywood Casino",
  // }, //
  // {
  //   game_id: "150048",
  //   game_name: "Race to 2nd",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/race_2.webp",
  //   game_code: "MAC88-X1RTS101",
  // }, //
  // {
  //   game_id: "150043",
  //   game_name: "Race to 17",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/race_17.webp",
  //   game_code: "MAC88-XRT17101",
  // }, //
  // {
  //   game_id: "150018",
  //   game_name: "Casino War",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/casino_war.webp",
  //   game_code: "MAC88-XCAW101",
  // }, //
  // {
  //   game_id: 13,
  //   url: "/war",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/war.jpg",
  //   game_name: "Casino War",
  // }, //
  // {
  //   game_id: "150019",
  //   game_name: "Worli Matka",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/worli_matka.webp",
  //   game_code: "MAC88-YWM102",
  // }, //
  // {
  //   game_id: "150020",
  //   game_name: "Lottery",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/lottery.webp",
  //   game_code: "MAC88-XLOT101",
  // }, //
  // {
  //   game_id: "150002",
  //   game_name: "Bacarrat",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/baccarat_mac88.webp",
  //   game_code: "MAC88-XBAC101",
  // }, //
  // {
  //   game_id: "150026",
  //   game_name: "29 Baccarat",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/29b.webp",
  //   game_code: "MAC88-X29BC101",
  // }, //
  // {
  //   game_id: 8,
  //   url: "/baccarat2",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat2.jpg",
  //   game_name: "Baccarat 2",
  // }, //
  // {
  //   game_id: "150052",
  //   game_name: "Baccarat One Day",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/baccarat_one_day.webp",
  //   game_code: "MAC88-Y1BAC101",
  // }, //
  // {
  //   game_id: "150010",
  //   game_name: "32 Cards",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/32_cards.webp",
  //   game_code: "MAC88-Y32CA102",
  // }, //
  // {
  //   game_id: 27,
  //   url: "/32cards-B",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsB.jpg",
  //   game_name: "32 Cards B",
  // }, //
  // {
  //   game_id: "150025",
  //   game_name: "Trio",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/trio.webp",
  //   game_code: "MAC88-XTRI101",
  // }, //
  // {
  //   game_id: "150032",
  //   game_name: "Poker 1 Day",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/poker_1_day.webp",
  //   game_code: "MAC88-Y1POK101",
  // }, //
  // {
  //   game_id: "150005",
  //   game_name: "Poker 20-20",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/20_20_poker.webp",
  //   game_code: "MAC88-XPOK101",
  // }, //
  // {
  //   game_id: 21,
  //   url: "/poker20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
  //   game_name: "20-20 Poker",
  // }, //
  // {
  //   game_id: "150015",
  //   game_name: "3 Cards Judgement",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/3cj.webp",
  //   game_code: "MAC88-X3CJ101",
  // }, //
  // {
  //   game_id: 25,
  //   url: "/3cardj",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/3cardsJ.jpg",
  //   game_name: "3 Cards Judgement",
  // }, //
  // {
  //   game_id: "150040",
  //   game_name: "One Card One Day",
  //   category: "Others",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/1c1d.webp",
  //   game_code: "MAC88-X10C101",
  // }, //
  // {
  //   game_id: "150038",
  //   game_name: "One Card 20-20",
  //   category: "Others",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/1_card_20_20.webp",
  //   game_code: "MAC88-XCTT101",
  // }, //
  // {
  //   game_id: "150036",
  //   game_name: "1 Day Dragon Tiger",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/dt_1day.webp",
  //   game_code: "MAC88-X1DT101",
  // }, //
  // {
  //   game_id: 14,
  //   url: "/dtl20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dtl.jpg",
  //   game_name: "20-20 DTL",
  // }, //
  // {
  //   game_id: 26,
  //   url: "/32cards-A",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsA.jpg",
  //   game_name: "32 Cards A",
  // }, //
  // {
  //   game_id: "150045",
  //   game_name: "Note Number",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/notenumber.webp",
  //   game_code: "MAC88-X1NN101",
  // }, //
  // {
  //   game_id: "150006",
  //   game_name: "Lucky7",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/lucky_7.webp",
  //   game_code: "MAC88-YLK7101",
  // }, //
  // {
  //   game_id: "150004",
  //   game_name: "Roulette",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/roulette_mac88.webp",
  //   game_code: "MAC88-XRT101",
  // }, //
  // {
  //   game_id: "150039",
  //   game_name: "One Card Meter",
  //   category: "Others",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/1_card_meter.webp",
  //   game_code: "MAC88-XOCM101",
  // }, //
  // {
  //   game_id: 9,
  //   url: "/baccarat",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat.png",
  //   game_name: "Baccarat",
  // }, //
  // {
  //   game_id: 7,
  //   url: "/dt202",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt202.jpg",
  //   game_name: "20-20 Dragon Tiger 2",
  // }, //
  // {
  //   game_id: "150037",
  //   game_name: "Dus Ka Dum",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/10kadum.webp",
  //   game_code: "MAC88-X1DKD101",
  // }, //
  // {
  //   game_id: 32,
  //   url: "/lucky7-A",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7.jpg",
  //   game_name: "Lucky 7 - A",
  // }, //
  // {
  //   game_id: "11",
  //   url: "/cmatch20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cc-20.jpg",
  //   name: "20-20 Cricket Match",
  // }, //
  // {
  //   game_id: 15,
  //   url: "/teen9",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
  //   game_name: "Test Teenpatti",
  // }, //
  // {
  //   game_id: 19,
  //   url: "/poker6",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
  //   game_name: "6 Player Poker",
  // }, //
  // {
  //   game_id: "12",
  //   url: "/cmeter",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cmeter.jpg",
  //   name: "Casino Meter",
  // }, //
  // {
  //   game_id: 16,
  //   url: "/teen8",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
  //   game_name: "Open Teenpatti",
  // }, //
  // {
  //   game_id: "17",
  //   url: "/teen",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
  //   name: "1 Day Teenpatti",
  // }, //
  // {
  //   game_id: 18,
  //   url: "/teen20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
  //   game_name: "20-20 Teenpatti",
  // }, //
  // {
  //   game_id: 24,
  //   url: "/worli2",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/worli.jpg",
  //   game_name: "Instant Worli",
  // }, //
  // {
  //   game_id: 30,
  //   url: "/dt20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg",
  //   game_name: "20-20 Dragon Tiger",
  // }, //
  // {
  //   game_id: "151015",
  //   game_name: "VR 2 Card TP",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_2ctp.webp",
  //   game_code: "MAC88-VTG2TP101",
  // }, //
  // {
  //   game_id: "151010",
  //   game_name: "VR Casino Meter",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_casinometer.webp",
  //   game_code: "MAC88-VTGCAM101",
  // }, //
  // {
  //   game_id: "151007",
  //   game_name: "VR Bollywood Casino",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_bc.webp",
  //   game_code: "MAC88-VTGBC101",
  // }, //
  // {
  //   game_id: "151006",
  //   game_name: "VR Mulfis Teenpatti",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_mtp.webp",
  //   game_code: "MAC88-VTGMT101",
  // }, //
  // {
  //   game_id: "151021",
  //   game_name: "VR Worli Matka",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_worlimatka.webp",
  //   game_code: "MAC88-VTGWM101",
  // }, //
  // {
  //   game_id: "151004",
  //   game_name: "VR Trio",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_trio.webp",
  //   game_code: "MAC88-VTGTRI101",
  // }, //
  // {
  //   game_id: "151009",
  //   game_name: "VR Dragon Tiger",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_dragontiger.webp",
  //   game_code: "MAC88-VTGDT101",
  // }, //
  // {
  //   game_id: "151008",
  //   game_name: "VR Amar Akbar Anthony",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_aaa.webp",
  //   game_code: "MAC88-VTGA3101",
  // }, //
  // {
  //   game_id: "230004",
  //   game_name: "Limbo",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/limbo.webp",
  //   game_code: "monk88_limbo",
  // }, //
  // {
  //   game_id: "151016",
  //   game_name: "VR Queen Race",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_queen.webp",
  //   game_code: "MAC88-VTGQR101",
  // }, //
  // {
  //   game_id: "151003",
  //   game_name: "VR Lucky 7",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_lucky7.webp",
  //   game_code: "MAC88-VTGLK7101",
  // }, //
  // {
  //   game_id: "151012",
  //   game_name: "VR 32 Cards",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_32cards.webp",
  //   game_code: "MAC88-VTG32C101",
  // }, //
  // {
  //   game_id: "151022",
  //   game_name: "VR 29 card bacarrat",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_29b.webp",
  //   game_code: "MAC88-VTG29B101",
  // }, //
  // {
  //   game_id: "230005",
  //   game_name: "Mines",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/mines.webp",
  //   game_code: "monk88_mines",
  // }, //
  // {
  //   game_id: "151005",
  //   game_name: "VR 20-20 DTL",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_2020_dtl.webp",
  //   game_code: "MAC88-VTGDTL101",
  // }, //
  // {
  //   game_id: 20,
  //   url: "/poker",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
  //   game_name: "1 Day Poker",
  // }, //
  // {
  //   game_id: "151017",
  //   game_name: "VR Poker",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_poker.webp",
  //   game_code: "MAC88-VTGPOK101",
  // }, //
  // {
  //   game_id: "151011",
  //   game_name: "VR 20-20 Teenpatti",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_tp2020.webp",
  //   game_code: "MAC88-VTGTP101",
  // }, //
  // {
  //   game_id: "151014",
  //   game_name: "VR Andar Bahar",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_ab.webp",
  //   game_code: "MAC88-VTGAB101",
  // }, //
  // {
  //   game_id: "151019",
  //   game_name: "VR Auto Roulette",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_roulette.webp",
  //   game_code: "MAC88-VTGRT101",
  // }, //
  // {
  //   game_id: "230006",
  //   game_name: "Plinko",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/plinko.webp",
  //   game_code: "monk88_plinko",
  // }, //
  // {
  //   game_id: "230001",
  //   game_name: "Crash",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/crash.webp",
  //   game_code: "monk88_crash",
  // }, //
  // {
  //   game_id: "151018",
  //   game_name: "VR Race T20",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_race_20.webp",
  //   game_code: "MAC88-VTGRTT101",
  // }, //
  // {
  //   game_id: "151020",
  //   game_name: "VR High low",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_hilo.webp",
  //   game_code: "MAC88-VTGHL101",
  // }, //
  // {
  //   game_id: "230002",
  //   game_name: "Diamonds",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/diamonds.webp",
  //   game_code: "monk88_diamonds",
  // }, //
  // {
  //   game_id: "230003",
  //   game_name: "Dice",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/dice.webp",
  //   game_code: "monk88_dice",
  // }, //
  // {
  //   game_id: "230008",
  //   game_name: "Hilo",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/hilo.webp",
  //   game_code: "monk88_hilo",
  // }, //
  // {
  //   game_id: "230007",
  //   game_name: "X-Roulette",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/roulette.webp",
  //   game_code: "monk88_slide",
  // }, //
];

export const card3 = {
  dragonTiger: [
    {
      id: 1,
      url: "/dt202",
      imgSrc: dt2020,
      name: "20-20 DRAGON TIGER 2",
    },
    { id: 2, url: "/dtl20", imgSrc: dtl20, name: "20-20 DRAGON TIGER LION" },
    { id: 3, url: "/dt6", imgSrc: dt6, name: "1 DAY DRAGON TIGER" },
    { id: 4, url: "/dt20", imgSrc: dt20, name: "20-20 DRAGON TIGER" },
  ],
  teenPatti: [
    { id: 6, url: "/teen20", imgSrc: twentyteen, name: "20-20 TEENPATTI" },
    { id: 7, url: "/teen", imgSrc: dayteen, name: "1 DAY TEENPATTI" },
    { id: 8, url: "/teen9", imgSrc: testteen, name: "TEST TEENPATTI" },
    { id: 9, url: "/teen8", imgSrc: teenplayer, name: "OPEN TEENPATTI" },
  ],
  lucky7: [
    { id: 10, url: "/lucky7-A", imgSrc: lucky7A, name: "Lucky 7 A" },
    { id: 11, url: "/lucky7eu", imgSrc: luck7B, name: "Lucky 7 B" },
  ],
  cards32: [
    { id: 12, url: "/32cards-A", imgSrc: cards32A, name: "32cards A" },
    { id: 13, url: "/32cards-B", imgSrc: cards32B, name: "32cards B" },
  ],
  abj: [
    { id: 14, url: "/abj2", imgSrc: abjlist2, name: "ANDAR BAHAR 2" },
    { id: 15, url: "/ab20", imgSrc: abjlist, name: "ANDAR BAHAR" },
  ],
  poker: [
    { id: 16, url: "/poker6", imgSrc: p6, name: "POKER 6" },
    { id: 17, url: "/poker", imgSrc: p1d, name: "POKER 1 DAY" },
    { id: 18, url: "/poker20", imgSrc: p20, name: "POKER 20 20" },
  ],
  sportCasino: [
    { id: 19, url: "/ballbyball", imgSrc: ballbyball, name: "BALL BY BALL" },
    { id: 20, url: "/superover", imgSrc: superover, name: "SUPER OVER" },
    { id: 21, url: "/cricketv3", imgSrc: crick5, name: "5 5 Cricket" },
    { id: 21, url: "/cmeter", imgSrc: cmeter, name: "CASINO METER" },
    {
      id: 22,
      url: "/cmatch20",
      imgSrc:
        "https://dataobj.ecoassetsservice.com/casino-icons/lc/cmatch20.jpg",
      name: "Cricket Match 20-20",
    },
  ],
  baccarat: [
    {
      url: "/baccarat2",
      imgSrc: bac1,
      name: "BACCARAT2",
    },
    {
      url: "/baccarat",
      imgSrc: bac2,
      name: "BACCARAT",
    },
  ],
  bollywoodCasino: [
    {
      id: 23,
      url: "/aaa",
      imgSrc:
        "https://ik.imagekit.io/bmaxmbpyx/https://247maharaja.com/assets/images/game-icon/-1016.webp",
      name: "AMAR AKHBAR ANTHONY",
    },
    {
      id: 24,
      url: "/btable",
      imgSrc:
        "https://ik.imagekit.io/bmaxmbpyx/https://247maharaja.com/assets/images/game-icon/-1015.webp",
      name: "BOLLYWOOD TABLE",
    },
  ],
  worli: [
    {
      id: 25,
      url: "/worli2",
      imgSrc:
        "https://ik.imagekit.io/bmaxmbpyx/https://247maharaja.com/assets/images/game-icon/-1013.webp",
      name: "Worli",
    },
    // {
    //   id: 26,
    //   url: "/worli",
    //   imgSrc:
    //     "https://ik.imagekit.io/bmaxmbpyx/https://247maharaja.com/assets/images/game-icon/-1013.webp",
    //   name: "Worli",
    // },
  ],

  "3cardj": [
    {
      id: 26,
      url: "/3cardj",
      imgSrc: "https://dataobj.ecoassetsservice.com/casino-icons/lc/3cardj.jpg",
      name: "3 Cards Judgement",
    },
  ],
};
export const dragonTigerCards = [
  {
    code: 0,
    imgSrc: A,
    value: 0,
  },
  {
    code: 1,
    imgSrc: two,
    value: 0,
  },
  {
    code: 2,
    imgSrc: three,
    value: 0,
  },
  {
    code: 3,
    imgSrc: four,
    value: 0,
  },
  {
    code: 4,
    imgSrc: five,
    value: 0,
  },
  {
    code: 5,
    imgSrc: six,
    value: 0,
  },
  {
    code: 6,
    imgSrc: seven,
    value: 0,
  },
  {
    code: 7,
    imgSrc: eight,
    value: 0,
  },
  {
    code: 8,
    imgSrc: nine,
    value: 0,
  },
  {
    code: 9,
    imgSrc: ten,
    value: 0,
  },
  {
    code: 10,
    imgSrc: eleven,
    value: 0,
  },
  {
    code: 11,
    imgSrc: twelve,
    value: 0,
  },
  {
    code: 12,
    imgSrc: thirteen,
    value: 0,
  },
];

export const bollywoodTableCards = [
  {
    code: 10,
    imgSrc: eleven,
    value: 0,
  },
  {
    code: 11,
    imgSrc: twelve,
    value: 0,
  },
  {
    code: 12,
    imgSrc: thirteen,
    value: 0,
  },
  {
    code: 0,
    imgSrc: A,
    value: 0,
  },
];

export const casinoItems = [
  { id: "1", name: "All Casino", link: "/contact-admin" },
  { id: "2", name: "Roulette", link: "/contact-admin" },
  { id: "3", name: "Teenpatti", link: "/contact-admin" },
  { id: "4", name: "Poker", link: "/contact-admin" },
  { id: "5", name: "Bacarrat", link: "/contact-admin" },
  { id: "6", name: "Dragon Tiger", link: "/contact-admin" },
  { id: "7", name: "32 Cards", link: "/contact-admin" },
  { id: "8", name: "Andar Bahar", link: "/contact-admin" },
  { id: "9", name: "Luck-7", link: "/contact-admin" },
  { id: "10", name: "3 Card Judgement", link: "/contact-admin" },
  { id: "11", name: "Casino war", link: "/contact-admin" },
  { id: "12", name: "worli", link: "/contact-admin" },
  { id: "13", name: "sports", link: "/contact-admin" },
  { id: "14", name: "Bollywood", link: "/contact-admin" },
  { id: "15", name: "Queen", link: "/contact-admin" },
];

export const cardGames = [
  { value: "", label: "Select Casino Type", disabled: true },
  {
    value: "dt20",
    label: "20-20 Dragon Tiger", //
  },
  {
    value: "ab20",
    label: "Andar Bahar 1",
  },
  {
    value: "abj",
    label: "Andar Bahar 2", //
  },
  {
    value: "teen20",
    label: "20-20 Teen Patti", //
  },
  {
    value: "teen",
    label: "Teen Patti One Day", //
  },
  {
    value: "teen8",
    label: "Open Teen Patti",
  },
  {
    value: "teen9",
    label: "Test Teen Patti",
  },
  {
    value: "card32",
    label: "32 Cards - A", //
  },
  {
    value: "card32eu",
    label: "32 Cards - B",
  },
  {
    value: "lucky7",
    label: "Lucky 7 - A", //
  },
  {
    value: "lucky7eu",
    label: "Lucky 7 - B", //
  },
  {
    value: "dt202",
    label: "20-20 Dragon Tiger 2", //
  },
  {
    value: "dtl20",
    label: "Dragon Tiger Lion", //
  },
  {
    value: "dt6",
    label: "Dragon Tiger 1 Day", //
  },
  {
    value: "aaa",
    label: "Amar Akbar Anthony",
  },
  {
    value: "cricketv3",
    label: "Fve-Five Cricket",
  },
  {
    value: "superover",
    label: "Superover",
  },
  {
    value: "race20",
    label: "Race 20",
  },
  {
    value: "war",
    label: "Casino War",
  },
  {
    value: "3cardj",
    label: "3 Card Judgement",
  },
  {
    value: "worli2",
    label: "Instant Worli",
  },
  // {
  //   value: "worli",
  //   label: "Worli Matka",
  // },
  {
    value: "poker",
    label: "Poker 1-day",
  },
  {
    value: "poker20",
    label: "Poker 20-20",
  },
  {
    value: "poker6",
    label: "Poker 6 Players",
  },
  {
    value: "btable",
    label: "Bollywood Casino",
  },
  {
    value: "cmatch20",
    label: "CRICKET MATCH 20-20",
  },
  {
    value: "baccarat",
    label: "BACCARAT",
  },
  {
    value: "baccarat2",
    label: "BACCARAT2",
  },
  {
    value: "ballbyball",
    label: "Ball By Ball",
  },
  {
    value: "queen",
    label: "Casino Queen",
  },
  {
    value: "cmeter",
    label: "Casino Meter",
  },
];

export const title = {
  dt20: "20-20 Dragon Tiger",
  dt6: "1 DAY DRAGON TIGER",
  teen20: "20-20 Teenpatti",
  lucky7: "Lucky 7 - A",
  lucky7eu: "LUCKY 7 - B",
  card32: "32 Cards A",
  card32b: "32 Cards B",
  abj: "Andar Bahar 1",
  abj2: "Andar Bahar 2",
  teen: "1 Day Teen Patti",
  teen8: "Open Teen Patti",
  teen9: "Test Teen Patti",
  ab20: "Andar Bahar 1",
  poker1Day: "Poker 1 Day",
  aaa: "Amar Akbar Anthony",
  war: "Casino War",
  btable: "Bollywood Table",
  worli2: "Instant Worli",
  cmatch20: "Cricket Match 20-20",
  queen: "Casino Queen",
  poker6: "Poker 6 Player",
  poker1: "Poker 1 Day",
  superover: "Super Over",
  cricketv3: "FIVE FIVE CRICKET",
  dt202: "20-20 DRAGON TIGER 2",
  dtl20: "20-20 D T L",
  race20: "RACE 20",
  cardj3: "3 CARDS JUDGEMENT",
  baccarat: "Baccarat",
  Baccarat2: "Baccarat 2",
  cmeter: "Casino Meter",
  ballbyball: "Ball By Ball",
};

export const mac88ListJSON = [
  {
    game_id: "150001",
    game_name: "Dragon Tiger Vivo",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dt_mac88.webp",
    game_code: "MAC88-YDT102",
  },
  {
    game_id: "150002",
    game_name: "Bacarrat",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/baccarat_mac88.webp",
    game_code: "MAC88-XBAC101",
  },
  {
    game_id: "150003",
    game_name: "Sic Bo",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/sicbo_mac88.webp",
    game_code: "MAC88-XSB101",
  },
  {
    game_id: "150004",
    game_name: "Roulette",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/roulette_mac88.webp",
    game_code: "MAC88-XRT101",
  },
  {
    game_id: "150005",
    game_name: "Poker",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/poker20_mac88.webp",
    game_code: "MAC88-XPOK101",
  },
  {
    game_id: "150006",
    game_name: "Lucky7",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lucky_7.webp",
    game_code: "MAC88-YLK7101",
  },
  {
    game_id: "150007",
    game_name: "Andar Bahar",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/andar_bahar.webp",
    game_code: "MAC88-XAB101",
  },
  {
    game_id: "150009",
    game_name: "Teenpatti One Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/tp1d.webp",
    game_code: "MAC88-X1TP101",
  },
  {
    game_id: "150010",
    game_name: "32 Cards A",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/32_cards.webp",
    game_code: "MAC88-Y32CA102",
  },
  {
    game_id: "150013",
    game_name: "DTL",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dtl_20_20.webp",
    game_code: "MAC88-YDTL101",
  },
  {
    game_id: "150014",
    game_name: "Amar Akbar Anthony",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/amar_akbar_anthony.webp",
    game_code: "MAC88-YA3101",
  },
  {
    game_id: "150015",
    game_name: "3 Cards Judgement",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/3cj.webp",
    game_code: "MAC88-X3CJ101",
  },
  {
    game_id: "150016",
    game_name: "Queen",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/queen.webp",
    game_code: "MAC88-YQR102",
  },
  {
    game_id: "150017",
    game_name: "Race 20",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/race_20.webp",
    game_code: "MAC88-YRTT102",
  },
  {
    game_id: "150018",
    game_name: "Casino War",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/casino_war.webp",
    game_code: "MAC88-XCAW101",
  },
  {
    game_id: "150019",
    game_name: "Worli Matka",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/worli_matka.webp",
    game_code: "MAC88-YWM102",
  },
  {
    game_id: "150020",
    game_name: "Lottery",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lottery.webp",
    game_code: "MAC88-XLOT101",
  },
  {
    game_id: "150022",
    game_name: "Muflis Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/muflis_teenpati.webp",
    game_code: "MAC88-YMTP102",
  },
  {
    game_id: "150023",
    game_name: "Test Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/teenpatti_test.webp",
    game_code: "MAC88-YTTP102",
  },
  {
    game_id: "150024",
    game_name: "TRAP",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/trap.webp",
    game_code: "MAC88-XTRP101",
  },
  {
    game_id: "150025",
    game_name: "Trio",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/trio.webp",
    game_code: "MAC88-XTRI101",
  },
  {
    game_id: "150026",
    game_name: "29 Baccarat",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/trio.webp",
    game_code: "MAC88-X29BC101",
  },
  {
    game_id: "150028",
    game_name: "Two Card Teenpatti One Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/2_cards_teenpatti.webp",
    game_code: "MAC88-Y12TP101",
  },
  {
    game_id: "150029",
    game_name: "Foot Ball Studio",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/rg/football_studio.webp",
    game_code: "MAC88-ZFBS101",
  },
  {
    game_id: "150030",
    game_name: "Muflis Teenpatti One Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/muflis_teenpati.webp",
    game_code: "MAC88-Y1MTP101",
  },
  {
    game_id: "150031",
    game_name: "Bollywood Casino B",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/bollywood_casino.webp",
    game_code: "MAC88-YBOC102",
  },
  {
    game_id: "150032",
    game_name: "Poker 1 day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/poker20_mac88.webp",
    game_code: "MAC88-Y1POK101",
  },
  {
    game_id: "150033",
    game_name: "Teenpatti 20 20",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/20_20_teenpatti.webp",
    game_code: "MAC88-YTPTT101",
  },
  {
    game_id: "150034",
    game_name: "Super Over",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/super_over.webp",
    game_code: "MAC88-Y1SPO101",
  },
  {
    game_id: "150035",
    game_name: "5 Five Cricket",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/5_five_cricket.webp",
    game_code: "MAC88-Y15C101",
  },
  {
    game_id: "150036",
    game_name: "1 Day Dragon Tiger",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dt_mac88.webp",
    game_code: "MAC88-X1DT101",
  },
  {
    game_id: "150037",
    game_name: "Dus ka Dum",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/10kadum.webp",
    game_code: "MAC88-X1DKD101",
  },
  {
    game_id: "150038",
    game_name: "One Card 20-20",
    category: "Others",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/1_card_20_20.webp",
    game_code: "MAC88-XCTT101",
  },
  {
    game_id: "150039",
    game_name: "One Card Meter",
    category: "Others",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/1_card_meter.webp",
    game_code: "MAC88-XOCM101",
  },
  {
    game_id: "150040",
    game_name: "One Card One Day",
    category: "Others",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/1c1d.webp",
    game_code: "MAC88-X10C101",
  },
  {
    game_id: "150041",
    game_name: "Six Player Poker",
    category: "Others",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/6pp.webp",
    game_code: "MAC88-X6PP101",
  },
  {
    game_id: "150042",
    game_name: "INSTANT 2 CARDS TEENPATTI",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/2_card_tp.webp",
    game_code: "MAC88-X2TP101",
  },
  {
    game_id: "150043",
    game_name: "Race to 17",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/race_17.webp",
    game_code: "MAC88-XRT17101",
  },
  {
    game_id: "150045",
    game_name: "Note number",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/notenumber.webp",
    game_code: "MAC88-X1NN101",
  },
  {
    game_id: "150046",
    game_name: "Cricket 2020",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/cricket2020.webp",
    game_code: "MAC88-XCM101",
  },
  {
    game_id: "150048",
    game_name: "Race to 2nd",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/race_2.webp",
    game_code: "MAC88-X1RTS101",
  },
  {
    game_id: "150049",
    game_name: "Open Teen patti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/open_teen_patti.webp",
    game_code: "MAC88-YOTP101",
  },
  {
    game_id: "150050",
    game_name: "Center card One day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/center_card_one_day.webp",
    game_code: "MAC88-Y1CC101",
  },
  {
    game_id: "150051",
    game_name: "High Low",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/high_low.webp",
    game_code: "MAC88-YHL101",
  },
  {
    game_id: "150052",
    game_name: "Baccarat One Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/baccarat_one_day.webp",
    game_code: "MAC88-Y1BAC101",
  },
  {
    game_id: "150053",
    game_name: "10 - 10 cricket ",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/10_10_cricket.webp",
    game_code: "MAC88-YXC101",
  },
  {
    game_id: "150067",
    game_name: "Dragon Tiger 2",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dt2.webp",
    game_code: "MAC88-DT2101",
  },
  {
    game_id: "151002",
    game_name: "V-Lucky 7",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_lucky7_vr.webp",
    game_code: "MAC88-VTGLK7101",
  },
  {
    game_id: "151003",
    game_name: "V-Trio",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_trio_vr.webp",
    game_code: "MAC88-VTGTRI101",
  },
  {
    game_id: "151004",
    game_name: "V-20-20 DTL",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_dtl_vr.webp",
    game_code: "MAC88-VTGDTL101",
  },
  {
    game_id: "151005",
    game_name: "V-Mulfis Teenpatti",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb:
      "https://royal-gaming.s3.eu-west-2.amazonaws.com/rg_muflis_tp_vr.jpg",
    game_code: "MAC88-VTGMT101",
  },
  {
    game_id: "151006",
    game_name: "V-Bollywood Casino",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_bollywood_casino_vr.webp",
    game_code: "MAC88-VTGBC101",
  },
  {
    game_id: "151007",
    game_name: "V-Amar Akbar Anthony",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_a3_vr.webp",
    game_code: "MAC88-VTGA3101",
  },
  {
    game_id: "151008",
    game_name: "V-Dragon Tiger",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_dragon_tiger_vr.webp",
    game_code: "MAC88-VTGDT101",
  },
  {
    game_id: "151009",
    game_name: "V-Casino Meter",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_casino_meter_vr.webp",
    game_code: "MAC88-VTGCAM101",
  },
  {
    game_id: "151010",
    game_name: "V-20-20 Teenpatti",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_teen_patti_vr.webp",
    game_code: "MAC88-VTGTP101",
  },
  {
    game_id: "151011",
    game_name: "V-32 Cards",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_32cards_vr.webp",
    game_code: "MAC88-VTG32C101",
  },
  {
    game_id: "151012",
    game_name: "V-Super over",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_super_over_vr.webp",
    game_code: "MAC88-VTGSO101",
  },
  {
    game_id: "151013",
    game_name: "V-Andar Bahar",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_andar_bahar_vr.webp",
    game_code: "MAC88-VTGAB101",
  },
  {
    game_id: "151014",
    game_name: "V-2 Card TP",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_2card_tp_vr.webp",
    game_code: "MAC88-VTG2TP101",
  },
  {
    game_id: "151015",
    game_name: "V-Queen Race",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/rg/queen_race_vr.webp",
    game_code: "MAC88-VTGQR101",
  },
  {
    game_id: "151016",
    game_name: "V-Poker",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_poker_vr.webp",
    game_code: "MAC88-VTGPOK101",
  },
  {
    game_id: "151017",
    game_name: "V-Race T20",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_king_race_vr.webp",
    game_code: "MAC88-VTGRTT101",
  },
  {
    game_id: "151018",
    game_name: "V-Auto Roulette",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.royalgaming.online/rg_vr_roulette.jpg",
    game_code: "MAC88-VTGRT101",
  },
  {
    game_id: "151019",
    game_name: "V-High low",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/rg/high_card_vr.webp",
    game_code: "MAC88-VTGHL101",
  },
  {
    game_id: "151020",
    game_name: "V-Worli Matka",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamcasino.live/rg_worli_matka_vr.webp",
    game_code: "MAC88-VTGWM101",
  },
  {
    game_id: "151021",
    game_name: "V-29 card bacarrat",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/rg/29_card_baccarat_vr.webp",
    game_code: "MAC88-VTG29B101",
  },
  {
    game_id: "151022",
    game_name: "Lankesh",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lankesh.jpeg",
    game_code: "MAC88-VTGLN101",
  },
  {
    game_id: "151053",
    game_name: "AVIATORX",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/monk88/aviatorx.webp",
    game_code: "MAC88-CAV101-VR",
  },
  {
    game_id: "151067",
    game_name: "Aviator Blue",
    category: "Crash Games",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/monk88/aviatorx.webp",
    game_code: "MAC88-CAVB101",
  },
  {
    game_id: "230001",
    game_name: "Crash",
    category: "slot",
    provider_name: "DC",
    sub_provider_name: "Monk88",
    status: "ACTIVE",
    url_thumb: "https://launch.monk88.com/images/crash.png",
    game_code: "monk88_crash",
  },
  {
    game_id: "230002",
    game_name: "Diamonds",
    category: "slot",
    provider_name: "DC",
    sub_provider_name: "Monk88",
    status: "ACTIVE",
    url_thumb: "https://launch.monk88.com/images/diamonds.png",
    game_code: "monk88_diamonds",
  },
  {
    game_id: "230003",
    game_name: "Dice",
    category: "slot",
    provider_name: "DC",
    sub_provider_name: "Monk88",
    status: "ACTIVE",
    url_thumb: "https://launch.monk88.com/images/dice.png",
    game_code: "monk88_dice",
  },
  {
    game_id: "230004",
    game_name: "Hilo",
    category: "slot",
    provider_name: "DC",
    sub_provider_name: "Monk88",
    status: "ACTIVE",
    url_thumb: "https://launch.monk88.com/images/hilo.png",
    game_code: "monk88_hilo",
  },
  {
    game_id: "230005",
    game_name: "Limbo",
    category: "slot",
    provider_name: "DC",
    sub_provider_name: "Monk88",
    status: "ACTIVE",
    url_thumb: "https://launch.monk88.com/images/limbo.png",
    game_code: "monk88_limbo",
  },
  {
    game_id: "230006",
    game_name: "Mines",
    category: "slot",
    provider_name: "DC",
    sub_provider_name: "Monk88",
    status: "ACTIVE",
    url_thumb: "https://launch.monk88.com/images/mines.png",
    game_code: "monk88_mines",
  },
  {
    game_id: "230007",
    game_name: "Plinko",
    category: "slot",
    provider_name: "DC",
    sub_provider_name: "Monk88",
    status: "ACTIVE",
    url_thumb: "https://launch.monk88.com/images/plinko.png",
    game_code: "monk88_plinko",
  },
  {
    game_id: "230008",
    game_name: "X-Roulette",
    category: "slot",
    provider_name: "DC",
    sub_provider_name: "Monk88",
    status: "ACTIVE",
    url_thumb: "https://launch.monk88.com/images/x-roulette.png",
    game_code: "monk88_slide",
  },
];

export const liveCasinoPics = {
  All: "https://tezcdn.io/casino/int-casino-icon/all.webp",
  "dragon tiger": "https://tezcdn.io/casino/int-casino-icon/dragon-tiger.webp",
  baccarat: "https://tezcdn.io/casino/int-casino-icon/baccarat.webp",
  sicbo: "https://tezcdn.io/casino/int-casino-icon/sicbo.webp",
  roulette: "https://tezcdn.io/casino/int-casino-icon/roulette.webp",
  poker: "https://tezcdn.io/casino/int-casino-icon/poker.webp",
  lucky7: "https://tezcdn.io/casino/int-casino-icon/lucky7.webp",
  andarbahar: "https://tezcdn.io/casino/int-casino-icon/andarbahar.webp",
  teenpatti: "https://tezcdn.io/casino/int-casino-icon/teenpatti.webp",
  "32cards": "https://tezcdn.io/casino/int-casino-icon/32cards.webp",
  others: "https://tezcdn.io/casino/int-casino-icon/others.webp",
  lottery: "https://tezcdn.io/casino/int-casino-icon/lottery.webp",
  cricketwar: "https://tezcdn.io/casino/int-casino-icon/cricketwar.webp",
  "hi low": "https://tezcdn.io/casino/int-casino-icon/hi-low.webp",
  "fun games": "https://tezcdn.io/casino/int-casino-icon/fun-games.webp",
  crash: "https://tezcdn.io/casino/int-casino-icon/crash.webp",
  aviator: "https://tezcdn.io/casino/int-casino-icon/aviator.webp",
  mines: "https://tezcdn.io/casino/int-casino-icon/mines.webp",
  slots: "https://tezcdn.io/casino/int-casino-icon/slots.webp",
  "live game show":
    "https://tezcdn.io/casino/int-casino-icon/live-game-show.webp",
  "color prediction":
    "https://tezcdn.io/casino/int-casino-icon/color-prediction.webp",
  "sic bo": "https://tezcdn.io/casino/int-casino-icon/sic-bo.webp",
  "bac bo": "https://tezcdn.io/casino/int-casino-icon/bac-bo.webp",
  "fan tan": "https://tezcdn.io/casino/int-casino-icon/fan-tan.webp",
  craps: "https://tezcdn.io/casino/int-casino-icon/craps.webp",
  blackjack: "https://tezcdn.io/casino/int-casino-icon/blackjack.webp",
  "casino holdem":
    "https://tezcdn.io/casino/int-casino-icon/casino-holdem.webp",
  "double hand casino holdem poker":
    "https://tezcdn.io/casino/int-casino-icon/double-hand-casino-holdem-poker.webp",
  "video poker": "https://tezcdn.io/casino/int-casino-icon/video-poker.webp",
  "extreme texas holdem":
    "https://tezcdn.io/casino/int-casino-icon/extreme-texas-holdem.webp",
  "triple card poker":
    "https://tezcdn.io/casino/int-casino-icon/triple-card-poker.webp",
};

export const homeCasinoListIcons = {
  aviator: "https://tezcdn.io/casino/casino-highlight/aviator-730-280.gif",
  mines: "https://tezcdn.io/casino/casino-highlight/evoplay-730-280.gif",
  "fun games": "https://tezcdn.io/casino/casino-highlight/fungames-730_280.gif",
  "color prediction":
    "https://tezcdn.io/casino/casino-highlight/wingogames-730-280.gif",
};
