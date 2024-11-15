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
      "https://marketsarket.qnsports.live/getcricketmatches",
    MARKET_MATCH_LIST_FOOTBALL:
      "https://marketsarket.qnsports.live/getsoccerallmatches2",
    MARKET_MATCH_LIST_TENNIS:
      "https://marketsarket.qnsports.live/gettennisallmatches2",
  },
  USER: {
    MARQUEE: "/expert/notification",
    SET_BTN_VALUE: "/button/insert",
    GET_BTN_VALUE: "/button",
    GET_PROFILE: "/user/profile",
    ACCOUNT_STATEMENT: "/transaction/get/",
    CARD_REPORT: "/card/result/",
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

export const cardUrl =
  process.env.NODE_ENV === "production"
    ? "https://maxbet07.com/videoPage/"
    : "https://maxbet07.com/videoPage/";

export const cardUrlMain = "https://maxbet07.com/videoPage/";
export const liveStreamCricketPageUrl =
  "https://maxbet07.com/liveStreamCricket/";
export const liveStreamPageUrl = "https://maxbet07.com/liveStream/";
export const scoreBoardUrlMain = "https://maxbet07.com/scoreBoardPage/";

// export const scoreBoardUrlMain =
//   "https://dpmatka.in/dcasino/score.php?matchId=";

export const serviceUrl =
  process.env.NODE_ENV === "production"
    ? Constants.apiBasePath
    : Constants.localPath;

export const baseUrls = {
  socket:
    process.env.NODE_ENV === "production"
      ? Constants.apiBasePath
      : Constants.localPath,
  expertSocket:
    process.env.NODE_ENV === "production"
      ? Constants.expertSocketBasePath
      : Constants.localPathExpert,
  matchSocket:
    process.env.NODE_ENV === "production"
      ? Constants.thirdParty
      : Constants.localThird,
  cardSocket:
    process.env.NODE_ENV === "production"
      ? Constants.thirdPartyCard
      : Constants.localThirdCard,
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
    url: "/ballbyball",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/ballbyball.jpg",
    name: "Ball By Ball",
  },
  {
    url: "/superover",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/superover.jpg",
    name: "Super Over",
  },
  {
    url: "/race20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/race20.png",
    name: "Race 20-20",
  },
  {
    url: "/queen",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/queen.jpg",
    name: "Casino Queen",
  },
  {
    url: "/cricketv3",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cricketv3.jpg",
    name: "5Five Cricket",
  },
  {
    url: "/abj2", //
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar2.jpg",
    name: "Andar Bahar 2",
  },
  {
    url: "/dt202", //
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt202.jpg",
    name: "20-20 Dragon Tiger 2",
  },
  {
    url: "/baccarat2",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat2.jpg",
    name: "Baccarat 2",
  },
  {
    url: "/baccarat",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat.png",
    name: "Baccarat",
  },
  {
    url: "/lucky7eu", //
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7eu.jpg",
    name: "Lucky 7 - B",
  },
  // {
  //   url: "",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teencasino.jpg",
  //   name: "Teenpatti 2.0",
  // },
  {
    url: "/cmatch20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cc-20.jpg",
    name: "20-20 Cricket Match",
  },
  {
    url: "/cmeter",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cmeter.jpg",
    name: "Casino Meter",
  },
  {
    url: "/war",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/war.jpg",
    name: "Casino War",
  },
  {
    url: "/dtl20", //
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dtl.jpg",
    name: "20-20 DTL",
  },
  {
    url: "/teen9",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
    name: "Test Teenpatti",
  },
  {
    url: "/teen8",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
    name: "Open Teenpatti",
  },
  {
    url: "/teen", //
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
    name: "1 Day Teenpatti",
  },
  {
    url: "/teen20", //
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
    name: "20-20 Teenpatti",
  },
  {
    url: "/poker6",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
    name: "6 Player Poker",
  },
  {
    url: "/poker",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
    name: "1 Day Poker",
  },
  {
    url: "/poker20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
    name: "20-20 Poker",
  },
  {
    url: "/ab20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar.jpg",
    name: "Andar Bahar",
  },
  {
    url: "",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/worli.jpg",
    name: "Worli Matka",
  },
  {
    url: "/worli2",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/worli.jpg",
    name: "Instant Worli",
  },
  {
    url: "/3cardj",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/3cardsJ.jpg",
    name: "3 Cards Judgement",
  },
  {
    url: "/32cards-A", //
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsA.jpg",
    name: "32 Cards A",
  },
  {
    url: "/32cards-B",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsB.jpg",
    name: "32 Cards B",
  },
  {
    url: "/aaa",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/aaa.jpg",
    name: "Amar Akbar Anthony",
  },
  {
    url: "/btable",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/bollywood-casino.jpg",
    name: "Bollywood Casino",
  },
  {
    url: "/dt20", //
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg",
    name: "20-20 Dragon Tiger",
  },
  {
    url: "/dt6", //
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg",
    name: "1 Day Dragon Tiger",
  },
  // {
  //   url: "",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lottery.jpg",
  //   name: "Lottery",
  // },
  {
    url: "/lucky7-A", //
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7.jpg",
    name: "Lucky 7 - A",
  },
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
