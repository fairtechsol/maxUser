import { dt6,dt20,dt2020,dtl20,A,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen, lucky7A, luck7B, abjlist, abjlist2 } from "../../assets/images";
import { dayteen,twentyteen,teencasino,teenplayer,testteen } from "../../assets/images";
export const ApiConstants = {
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  CHANGEPASSWORD: "user/changePassword",
  OLD_PASSWORD: "/user/check/oldPassword",
  MATCH: {
    MATCHLIST: "/match/list",
    MATCHSEARCHLIST: "/match/search",
    SEARCHLIST: "/user/searchlist",
    MATCHDETAILS: "/match/",
    OTHERMATCHDETAILS: "/match/other/",
    CURRENTBET: "/bet",
    PROFIT_LOSS_REPORT: "/bet/profitLoss",
  },
  USER: {
    MARQUEE: "/expert/notification",
    SET_BTN_VALUE: "/button/insert",
    GET_BTN_VALUE: "/button",
    GET_PROFILE: "/user/profile",
    ACCOUNT_STATEMENT: "/transaction/get/",
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
      PLACE_BET:"/bet/cardBetting"
    },
  },
};

export const Constants = {
  pageLimit: 15,
  apiBasePath: "https://devmaxbet9api.fairgame.club",
  expertSocketBasePath: "https://devexpertapi.fairgame.club",
  thirdParty: "https://devserviceapi.fairgame.club",
  localThird: "http://localhost:3200",
  localThirdCard: "https://3200dev.fairgame.club",
  WEBSOCKET: "websocket",
  POLLING: "polling",
  apiBasePathLive: "https://betfairapi.fairgame7.com",
  thirdPartyLive: "https://serviceapi.fairgame7.com",
  expertPathLive: "https://expertapi.fairgame7.com",
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
  quickbookmaker1: "quickbookmaker1",
  quickbookmaker2: "quickbookmaker2",
  quickbookmaker3: "quickbookmaker3",
  tiedMatch1: "tiedMatch1",
  tiedMatch2: "tiedMatch2",
  completeMatch: "completeMatch",
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
  [matchBettingType.tiedMatch1]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.tiedMatch2]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.completeMatch]: {
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
  greyhoundRacing: "greyhoundRacing",
};

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
      ? Constants.thirdParty
      : Constants.localThirdCard,
};

// use below baseUrl for live build

// export const baseUrls = {
//   socket:
//     process.env.NODE_ENV === "production"
//       ? Constants.apiBasePathLive
//       : Constants.localPath,
//   matchSocket:
//     process.env.NODE_ENV === "production"
//       ? Constants.thirdPartyLive
//       : Constants.localPathThird,
//   expertSocket:
//     process.env.NODE_ENV === "production"
//       ? Constants.expertPathLive
//       : Constants.localPathExpert,
// };

export const sportsRules = [
  {
    sportName: "Motor Sport",
    rules: [
      {
        category: "Bookmaker",
        description: [
          "All race bets are settled on the official classification from the Federation Internationale de l’Automobile (FIA), the sport’s governing body, at the time of podium presentation.",
          "If a race is postponed (either before the start or via an interruption mid-race) but is concluded within 72 hours of the original scheduled start time, then all bets will stand.",
          "Our exchange management decision will be the final decision.",
          "Any query about the result should be contacted within 7 days of the specific event; the same will not be considered valid post 7 days from the event.",
        ],
      },
    ],
  },
  {
    sportName: "Handball",
    rules: [
      {
        category: "Match",
        description: [
          "Match Odds: - Predict which team will be the winner. Bets will be void if the match is not completed.",
          "Next Goal: - Predict which team will score the X-th goal.",
          "Highest Scoring Half: - Predict which half will have the most goals scored (1st, 2nd, or Draw). Bet will be settled on regulation time only and exclude overtime if played:",
          "Halftime/Fulltime: - Predict the result of a match at halftime and at the end of regular time. If a game is abandoned, bets will be void. Example: If you choose 1/X, you bet on the home team to lead in the first half and the match to end in a draw. Extra time doesn’t count.",
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
          "All individual race markets will be determined according to the official result at the time of the 'weigh-in' announcement (or equivalent). Subsequent disqualifications, appeals or amendments to the result will be disregarded.",
          "If a race is abandoned or otherwise declared void, or in the event of a walkover, all bets on that race will be void.",
          "If the scheduled venue is changed after the market has been loaded by us, all bets will be void.",
          "Where a race does not take part on its scheduled day, all bets will be void.",
          "If a scheduled surface type is changed (e.g., turf to dirt) all bets will stand.",
        ],
      },
      {
        category: "Non-Runner Rule",
        description: [
          // ... add the non-runner rules for Horse Racing here
          "Our's non-runner rule relates to the adjustment of odds-on bets already matched when a horse in a race is declared a non-runner. To adjust We apply a reduction factor to the remaining runners. The reduction factor allocated to a non-runner is a calculation (the details of which are described below) of that horse's chances of winning (or being placed, etc as appropriate) and is applied to bets already matched on the other runners in the relevant market or markets.",
          // ... continue with the rest of the non-runner rules
        ],
      },
      {
        category: "How the Reductions are applied to Exchange markets",
        description: [
          // ... add rules for how reductions are applied to Exchange markets
          "In the win market, reductions will be made on the traded price. For example: if the non-runners final reduction factor is 25% the traded price on all previously matched bets on other horses will be reduced by 25% - the traded price of 8.0 would become 6.0 etc. And these might be further reduced if another horse is subsequently declared a non-runner.",
          // ... continue with the rest of the rules
        ],
      },
      {
        category: "Additional rules",
        description: [
          "Card numbers are posted as a guide only: bets are placed on a named horse.",
          "Horses will not be coupled.",
          "Where any horse(s) runs for purse money only it is deemed a non-runner for betting purposes. Should this result in the number of possible winners stated in the relevant Market Information being equal to or greater than the number of runners in the relevant Betfair market, all bets in the market will be void.",
          // ... add more additional rules if needed
        ],
      },
    ],
  },
  {
    sportName: "Table Tennis",
    rules: [
      {
        category: "Match Odds",
        description: [
          "Predict which player will win the match. In the event of any of the named players in a match changing before the match starts, then all bets are void.",
          "In the event of a match starting but not being completed, all bets will be void.",
        ],
      },
      {
        category: "Set Winner",
        description: [
          "The specified set must be completed for bets to stand unless the specific market outcome is already determined.",
        ],
      },
      {
        category: "Under / Over Points",
        description: [
          "For example, a game is abandoned at 9-7: bets on Over/Under 16.5 Game - Total Points are settled as winners/losers respectively, since any natural conclusion to the game would have yielded at least 18 points.",
        ],
      },
    ],
  },
  {
    sportName: "Basketball",
    rules: [
      {
        category: "Match Odds",
        description: [
          "Predict which team will be the winner. There must be 5 minutes or less of scheduled game time left for bets to have action.",
        ],
      },
      {
        category: "Quarter Winner",
        description: [
          "The quarter must be completed for bets to have action, unless settlement of bets is already determined.",
        ],
      },
      {
        category: "1st Half Winner / 2nd Half Winner",
        description: [
          "The first half must be completed for first half bets to stand.",
          "If a game is postponed or cancelled after the start, for game and second half bets there must be 5 minutes or less remaining for bets to have action, unless settlement of bets is already determined. (Including Overtime if played.)",
        ],
      },
      {
        category: "Highest Scoring Half",
        description: [
          "Predict in which half most points will be scored. OT is not included in 2nd Half.",
        ],
      },
    ],
  },
  {
    sportName: "Volleyball",
    rules: [
      {
        category: "Match",
        description: [
          "Match odds: - Predict which team will be the winner. Bets will be void if the match is not completed.",
        ],
      },
      {
        category: "Set Winner",
        description: [
          "In the event of the set not being completed bets will be void. Exceptions are made for bets on sets that are already over, in this case, the bets will be settled.",
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
          "Match Odds Including overtime/shootouts: - Predict the winner of the match including overtime and penalties. The game must be completed for bets to have action.",
        ],
      },
      {
        category: "Period Winner",
        description: [
          "Predict the winner of the relevant period. The relevant period must be completed for bets to have action unless the specific market outcome is already determined.",
        ],
      },
      {
        category: "Highest Scoring Period",
        description: [
          "If 2 or more periods have the same score Tie will be settled as the winner. (Exclude overtime/shootouts for settlement purposes)",
        ],
      },
    ],
  },
  {
    sportName: "Football",
    rules: [
      {
        category: "Bookmaker",
        description: [
          "If the match will not take place within 48 hours of the original kick-off time, bets will be void.",
          "If the selection is in a multiple bet or accumulator, any refund must be requested before the kick-off of the first leg of the multiple bets.",
          "Where a confirmed postponed match features as part of a multiple bet, the bet will stand on the remaining selections in the multiple.",
          "Games that have their kick-off altered well in advance to accommodate live TV or to ease fixture congestion will not be classed as postponed.",
          "If a match is forfeited or a team is given a walkover victory without the match having kicked off, then all bets will be void. Any subsequently awarded scoreline will not count for settlement purposes.",
        ],
      },
      {
        category: "Fancy",
        description: [
          "Tournament Total Goals, Team Total Goals FT: - Goals scored in 90 minutes or extra time will count. Goals scored in penalty shootouts do not count.",
          "Tournament Corners - Only corners taken in 90 minutes count.",
          "Tournament Penalties Missed/Converted - Penalties taken in 90 minutes, extra time, and penalty shootouts all count. If a penalty has to be re-taken, the previous disallowed penalty(ies) do not count.",
        ],
      },
      {
        category: "Match",
        description: [
          "Match Odds: - All bets apply to the relevant full 'regular time' period including stoppage time. Any extra-time and/or penalty shoot-out is not included.",
          "For the cancellation of a goal, due to VAR, bets matched between the time of the goal being scored and the time at which the video assistant referee finishes the review will be voided.",
          "For the cancellation of a red card, due to VAR, bets matched after the time at which the video assistant referee commences the review will be voided.",
        ],
      },
      {
        category: "Under_Over Goals",
        description: [
          "In the event of a match starting but not being completed, all bets will be void unless the specific market outcome is already determined.",
        ],
      },
      {
        category: "1st Period Winner",
        description: [
          "Bets will be void if the match is abandoned before half-time.",
        ],
      },
      {
        category: "Next Goal",
        description: ["Own goals count to the side credited with the goal."],
      },
      {
        category: "Draw No Bet",
        description: [
          "Predict which team will be the winner. In case of a draw, all bets will be void. If a game is abandoned, bets will be void.",
          "Both Teams to Score: - Predict whether both teams will score at least one goal in the game. Own goals count towards the team credited with the goal. If a game is abandoned, bets will be void, unless the outcome of these bets is already determined. Yes” – meaning that both teams will score. “No” – means that either team will not score.",
          "Total Corners: - Predict which team will take the named corner in the game. If this specific corner is not taken in the game, bets will be void. For example, the game finishes or is abandoned with 8 corners taken – all bets on any corner after the 8th will be void (9th, 10th, etc.)",
          "Goals Odd/Even: - Any match resulting in 0-0 will be settled on an even number of goals. For Team Odd/Even markets, if the specified team does not score then we will settle on an even number of goals. In the event of an abandoned match then bets for that match will be void.",
          "1X2 Corners: - Predict which team will get more corners in a match. Awarded, but not taken corners (there is a corner, but before it is taken the referee signals for the end of the first half or the match) will not count for settlement purposes. Also, if a corner needs to be re-taken for any reason, it will be counted as 1 corner",
          "Under/Over Card in Match (Number of cards): - Predict the number of cards that will be shown in a match. If a player is sent off for 2 yellow cards, this counts as 2 yellow cards and 1 red card for betting purpose es. If the match is abandoned for any reason, all bets will be void unless the market is already determined, e.g., Team 1 over 2,5 yellow cards - 3 yellow cards awarded to Team 1 before abandonment is settled as a winner. Cards for non-players (already substituted players, managers, and players on the bench who are not substituted) are not considered. The settlement will be made concerning all available evidence to cards shown during the scheduled 90 minutes play. Any card shown after the full-time whistle-blow will be disregarded.",
          "First Half Under/Over Goals: - How many goals will be scored in the first half of this match? All bets apply to Full Time according to the match officials, plus any stoppage time. Extra-time/penalty shoot-outs are not included.",
          "Penalty Taken? : - Will a penalty be awarded and taken during this match? All bets apply to Full Time according to the match officials, plus any stoppage time. Extra-time/penalty shoot-outs are not included.",
          "Correct Score: - Predict the score of this match. This market will not be partially settled during the fixture and will be fully settled full-time. All bets apply to Full Time according to the match officials, plus any stoppage time. Extra-time/penalty shoot-outs are not included.",
          "Team A/B +1/2/3: - Who will win this match with the stated handicap applied? All bets apply to Full Time according to the match officials, plus any stoppage time. Extra-time/penalty shoot-outs are not included.",
          "HT/FT: - Bets will be void if the match is abandoned. Extra-time and penalty shootouts do not count.",
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
          "Match Odds: - If 1st set has been not completed at the time of the retirement or disqualification, then all bets relating to that individual match will be void.",
        ],
      },
      {
        category: "Game Winner",
        description: [
          "Predict which player will win the stated game. The nominated game will be featured in the name of the bet type, for example, 2nd set – 7th game – Winner.",
          "If a game is not completed for any reason, bets on it will be void. Tiebreak points will not be counted for this bet type unless the specific market outcome is already determined.",
        ],
      },
      {
        category: "Under / Over Games",
        description: [
          "Finished set stands; the unfinished set can be played to its natural conclusion and settled as in the example:",
          "Example: A set is abandoned at 4-4. I win if I placed a bet on Over 9.5 (since any natural conclusion to the set would have at least 10 games); I lose the bet if I placed a bet on Under 9.5 (since any natural conclusion to the set would have at least 10 games); I get my stake back if I placed a bet on O/U 10.5 (it is undecided, the set could have ended 6-4).",
        ],
      },
    ],
  },
  {
    sportName: "Snooker",
    rules: [
      {
        category: "Match Odds",
        description: [
          "Predict which player will win the match. In the event of a match starting but not being completed, the player progressing to the next round or being awarded the victory will be deemed the winner for settlement purposes.",
          "In the event of a match not starting at all, all bets are refunded.",
        ],
      },
      {
        category: "Frame Winner",
        description: [
          "If the nominated frame is not played, bets will be void.",
          "Similarly, if the nominated frame is awarded to a player without a shot being played, then all bets will be void.",
        ],
      },
    ],
  },
  {
    sportName: "E-Games",
    rules: [
      {
        category: "Match",
        description: [
          "In the event of a match starting but not being completed, then all bets will be void.",
        ],
      },
    ],
  },
  {
    sportName: "Futsal",
    rules: [
      {
        category: "Match Odds",
        description: ["Bets will be void if the match is not completed."],
      },
      {
        category: "Next Goal",
        description: ["Predict which team will score the X-th goal."],
      },
      {
        category: "1st Half Winner",
        description: [
          "Half bets will be settled at the end of the 1st half. In the event of the 1st half not being completed, bets will be void.",
        ],
      },
      {
        category: "Highest Scoring Half",
        description: ["Predict in which event part will be scored most."],
      },
    ],
  },
  {
    sportName: "Big Bash League",
    rules: [
      {
        category: "Total Match 1st Over Run",
        description: [
          "Average 6 runs will be given if total 20 overs are not played. Only 1st innings will be considered as valid.",
        ],
      },
      {
        category: "Highest Innings Run",
        description: ["Only the first innings is valid."],
      },
    ],
  },
  {
    sportName: "Lunch Favourite",
    rules: [
      {
        category: "Lunch Favourite Team",
        description: [
          "The team which is favourite at lunch will be considered as lunch favourite or the team which is favourite after the first inning last ball will be considered as lunch favourite in our exchange.",
        ],
      },
      {
        category: "Management Decision",
        description: [
          "In any circumstances management decision will be final.",
        ],
      },
      {
        category: "Tie in T20 or One Day",
        description: [
          "In case of a tie in T20 or one day in lunch favourite game, all bets will be deleted in our exchange.",
        ],
      },
      {
        category: "Reduced Overs",
        description: [
          "In case overs are reduced in a match, the team which is favourite at lunch will be considered as lunch favourite.",
        ],
      },
      {
        category: "Weather Interruption",
        description: [
          "In case of weather, 1st innings match overs are reduced and direct target is given to the team which will bat in the 2nd inning then lunch favourite will be considered after the target is given at lunch.",
        ],
      },
    ],
  },
  {
    sportName: "Bookmaker",
    rules: [
      {
        category: "General Rules",
        description: [
          "Due to any reason, any team will be getting an advantage or disadvantage, and we are not concerned.",
          "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example, in case of VPN/robot-use/multiple entries from the same IP/multiple bets at the same time (Punching) and others. Note: only winning bets will be voided.",
          "Any query about the result or rates should be contacted within 7 days of the specific event; the same will not be considered valid post 7 days from the event.",
          "If two teams end up with equal points, then the result will be given based on the official point table.",
        ],
      },
      {
        category: "Cricket-Specific Rules",
        description: [
          "We will simply compare both teams' 25 overs score; higher score team will be declared the winner in ODI (25 over comparison).",
          "We will simply compare both teams' 10 overs score; higher score team will be declared the winner in T20 matches (10 over comparison).",
        ],
      },
    ],
  },
  {
    sportName: "CricketCasino",
    rules: [
      {
        category: "Game Validity",
        description: [
          "Completed game is valid; in case due to rain overs are reduced or match abandoned, the particular game will be deleted.",
        ],
      },
      {
        category: "Penalty Runs",
        description: [
          "Helmet penalty run will be counted; rest other penalty runs will not be counted in the game of our exchange.",
        ],
      },
      {
        category: "Management Decision",
        description: [
          "In any circumstances, management decision will be final.",
        ],
      },
      {
        category: "Last Digit Rule",
        description: [
          "The last digit of the run in all games will be valid in our exchange.",
        ],
      },
      {
        category: "Single Last Digit Game",
        description: [
          "For example: 6 over run Ind: 47 runs, so the result will be given as 7 for single last digit game in our exchange.",
        ],
      },
      {
        category: "Double Last Digit Game",
        description: [
          "For example: 6 over run & 10 over run Ind: 45 runs & 83 runs respectively, so the result will be given as 53 for double last digit game in our exchange.",
        ],
      },
      {
        category: "Triple Last Digit Game",
        description: [
          "For example: 6 over run, 10 over run & 15 over run Ind: 43 runs, 80 runs, and 125 respectively, so the result will be given as 305 for triple last digit game in our exchange.",
          "For example: 6 over run, 10 over run & Lambi run Ind: 43 runs, 80 runs, and 187 respectively, so the result will be given as 307 for triple last digit game in our exchange.",
        ],
      },
    ],
  },
  {
    sportName: "Fancy Market 1",
    rules: [
      {
        category: "Odd/Even Rules",
        description: [
          "Advance events will be valid if overs are reduced before the match starts. For example: In T20, if overs are reduced to 16 overs, only up to 16 overs will be valid, and the remaining overs will be deleted.",
          "All bets regarding Odd/Even sessions will be deleted if the particular session is incomplete. For example, if a team is all out in the 15.4th over, it will be considered as 16 overs completed, and the remaining overs will be deleted.",
          "All bets regarding ODD/EVEN player/partnership are valid if one legal delivery is being played; otherwise, the bets will be deleted. Player odd/even advance bets will be valid if one legal delivery is being played in the match; otherwise, voided.",
          "Innings run Odd/Even session will be valid if overs are reduced due to weather conditions.",
          "In any circumstances, management decision will be final.",
        ],
      },
      {
        category: "Top Batsman Rules",
        description: [
          "If any player does not come as per the playing eleven, then all bets will be deleted for the particular player.",
          "If two players score the same runs in a single match, both player settlements will be done at 50 percent (50%, 50%) rate on their original value given by our exchange.",
          "Top batsman only 1st inning is valid.",
          "For one day, 50 overs, and for T20 match, 20 overs must be played for the top batsmen; otherwise, all bets will be deleted.",
        ],
      },
      {
        category: "Man of the Match Rules",
        description: [
          "All bets will be deleted if the match is abandoned or over reduced.",
          "All bets will be deleted if the mentioned player is not included in playing 11.",
          "In case Man of the Match is shared between two players, then the Dead heat rule will be applicable. For example, K Perera and T Iqbal share the Man of the Match; then the settlement will be done 50% of the rates accordingly.",
          "Rules similar to our Top Batsman rules.",
        ],
      },
      {
        category: "Maximum Sixes by Team",
        description: [
          "All bets will be deleted if the match is abandoned or over reduced.",
          "All bets will be deleted if both teams hit the same number of sixes.",
          "Super over will not be considered.",
        ],
      },
      {
        category: "Maximum 6 or 10 Over Runs",
        description: [
          "All bets will be deleted if the match is abandoned or over reduced.",
          "All bets will be deleted if both teams' scores are the same (Runs scored in 6 or 10 overs).",
          "6 overs for T20 and 10 overs for ODI.",
          "Both innings are valid.",
          "This fancy will be valid for the 1st 6 overs of both innings for T20 and the 1st 10 overs of both innings for ODI.",
        ],
      },
      {
        category: "Batsman Match",
        description: [
          "All bets will be deleted if any one of the mentioned players is not included in playing 11.",
          "All bets will be deleted unless one ball is being played by both the mentioned players.",
          "All bets will be deleted if overs are reduced or match abandoned.",
          "All bets will be deleted if both players score the same run. For example, H Amla and J Bairstow are the batsman matched; both scored 38 runs, then all bets will be deleted.",
          "Both innings will be valid.",
        ],
      },
      {
        category: "Opening Pair",
        description: [
          "Bets for Favourite opening pair from the two mentioned opening pair.",
          "Runs made by both the opening player will be added. For example: J Roy scored 20 runs and J Bairstow scored 30 runs; result will be 50 runs.",
          "Highest run made by the pair will be declared as winner. For example: Opening pair ENG total is 70 runs and Opening pair SA is 90 runs, then SA 90 runs will be declared as winner.",
          "Both innings will be valid.",
        ],
      },
      {
        category: "Our Exchange Special",
        description: [
          "All bets will be deleted if the mentioned player is not included in playing 11.",
          "All bets will be deleted if the match is abandoned or over reduced.",
          "Both innings will be valid.",
        ],
      },
      {
        category: "Direction of First Boundary",
        description: [
          "All bets will be deleted if the mentioned batsman is not included in playing 11.",
          "All bets will be deleted if the match is abandoned or over reduced.",
          "The boundary hit through off side of the stump will be considered as off side four.",
          "The boundary hit through leg side of the stump will be considered as leg side four.",
          "Boundaries through extras (byes, leg byes, wide, overthrow) will not be considered as valid.",
          "Only 1st Inning will be considered.",
        ],
      },
      {
        category: "Fifty & Century by Batsman",
        description: [
          "All bets will be deleted if the match is abandoned or over reduced.",
          "All bets will be deleted if the mentioned batsman is not included in playing 11.",
          "All bets will be deleted unless the batsman faces one legal ball.",
          "Both Innings will be valid.",
        ],
      },
      {
        category: "1st Over Fancy",
        description: [
          "Boundaries through extras (byes, leg byes, wide, overthrow) will not be considered.",
          "Only 1st inning will be valid.",
        ],
      },
      {
        category: "Odd Even Fancy",
        description: [
          "Incomplete games will be deleted. Over reduced or abandoned, all bets will be deleted.",
          "For example: 275 run SL bhav must be played 50 over if rain comes or any condition; otherwise, 275 run SL bets will be deleted.",
        ],
      },
      {
        category: "Next Man Out",
        description: [
          "Next man out fancy advance & in regular. Both innings will be valid.",
          "If any player does not come in the opening then all bets will be deleted.",
          "If overs reduced or abandoned then all bets will be deleted.",
        ],
      },
      {
        category: "Caught Out",
        description: [
          "Caught out fancy in advance & in regular. Both innings will be valid.",
          "If overs reduced or match abandoned then all bets will be deleted.",
        ],
      },
      {
        category: "Wkt & All Out Fancy",
        description: [
          "5 wkt in 10 over & All out in 20 over fancy is valid for both innings.",
          "If match abandoned or over reduced, all bets will be deleted.",
        ],
      },
      {
        category: "Test Match: Game Completed Fancy",
        description: [
          "This is the fancy for the match to be won/completed in which day & session (Completed: Game has to be completed).",
          "If the match is drawn then all the sessions will be considered as lost.",
        ],
      },
      {
        category: "Meter Fancy",
        description: [
          "In case match abandoned or over reduced, mid-point rule will be applicable.",
          "For example: If Dhoni meter is 75 / 77 and the match abandoned or over reduced, then the result will be 76.",
          "In case of a single difference, the result will be given for the higher rate of the final rate (e.g., 53/54) and match gets abandoned then the result will be given as 54.",
          "Midpoint rule is applicable for a test match also. However, for lambi meter/ inning meter, 70 overs have to be played only then the same will be considered as valid.",
        ],
      },
      {
        category: "Maximum Boundaries",
        description: [
          "If the number of fours or sixes of both the team is equal, then all bets of the respective event will get voided.",
        ],
      },
      {
        category: "Khado: Test",
        description: [
          "Minimum 70 overs have to be played by the particular team only then the Khado of the team will be considered as valid, else the same will be voided.",
        ],
      },
      {
        category: "Common Market",
        description: [
          "In the future, if any circumstances happen like a covid issue, natural disasters, or any reasons series will be postponed or canceled then at that moment, the result will be given to the difference of opening rate to present rate.",
          "Due to any reasons, the company has rights to take final decisions.",
        ],
      },
    ],
  },
  {
    sportName: "Football Fancy",
    rules: [
      {
        category: "Tournament Total Goals",
        description: [
          "Goals scored in 90 minutes or in extra-time will count.",
          "Goals scored in penalty shootouts do not count.",
        ],
      },
      {
        category: "Tournament Corners",
        description: ["Only corners taken in 90 minutes count."],
      },
      {
        category: "Tournament Penalties Missed/Converted",
        description: [
          "Penalties taken in 90 minutes, extra-time, and penalty shootouts all count.",
          "If a penalty has to be re-taken, the previous disallowed penalty(ies) do not count.",
        ],
      },
      {
        category: "Match Odds",
        description: [
          "All bets apply to the relevant full 'regular time' period, including stoppage time.",
          "Any extra-time and/or penalty shoot-out is not included.",
          "For the cancellation of a goal, due to VAR, bets matched between the time of the goal being scored and the time at which the video assistant referee finishes the review will be voided.",
          "For the cancellation of a red card, due to VAR, bets matched after the time at which the video assistant referee commences the review will be voided.",
        ],
      },
      {
        category: "Corners Number/Odds",
        description: [
          "How many corners will be taken in the match?",
          "Only corners that are taken will be counted.",
          "All bets apply to Full Time according to the match officials, plus any stoppage time.",
          "Extra-time/penalty shoot-outs are not included.",
        ],
      },
    ],
  },
  {
    sportName: "IPL",
    rules: [
      {
        category: "General Rules",
        description: [
          "If IPL fixture of 74 matches gets reduced due to any reason, then all the special fancies will be voided (Match abandoned due to rain/bad light will not be considered in this)",
          "Management decision will be final",
        ],
      },
      {
        category: "Total 1st Over Runs",
        description: [
          "Average 5 runs will be given in case match abandoned or over reduced (only 1st innings valid)",
        ],
      },
      {
        category: "Total 1st 6 Over Run",
        description: [
          "Average 46 runs will be given in case match abandoned or over reduced (Only 1st Innings valid)",
        ],
      },
      {
        category: "Total Fours",
        description: [
          "Average 25 fours will be given in case match abandoned or over reduced",
        ],
      },
      {
        category: "Total Sixes",
        description: [
          "Average 13 sixes will be given in case match abandoned or over reduced",
        ],
      },
      {
        category: "Total Wickets",
        description: [
          "Average will 12 Wickets be given in case match abandoned or over reduced",
        ],
      },
      {
        category: "Total Wides",
        description: [
          "Average 8 wides will be given in case match abandoned or over reduced",
        ],
      },
      {
        category: "Total Extras",
        description: [
          "Average 17 extras will be given in case match abandoned or over reduced",
        ],
      },
      {
        category: "Total Fifties",
        description: [
          "Average 2 fifties will be given in case match abandoned or over reduced",
        ],
      },
      {
        category: "Total Caught Outs",
        description: [
          "Average 8 caught out will be given in case match abandoned or over reduced",
        ],
      },
      {
        category: "Total Bowled Outs",
        description: [
          "Average 2 bowled out will be given in case match abandoned or over reduced",
        ],
      },
      {
        category: "Total LBW",
        description: [
          "Average 1 LBW will be given in case match abandoned or over reduced",
        ],
      },
      {
        category: "Total Run Out",
        description: [
          "Average 1 Run out will be given in case match abandoned or over reduced",
        ],
      },
      {
        category: "Total No Ball",
        description: [
          "Average 1 No ball will be given in case match abandoned or over reduced",
        ],
      },
      {
        category: "Result and Cancellation",
        description: [
          "At any situation if the result is given for any particular event based on the rates given for the same, then the particular result will be considered valid, similarly if the tournament gets canceled due to any reason the previously given result will be considered valid",
        ],
      },
      {
        category: "How Many Matches Win by a Team",
        description: [
          "Only valid for league stage matches. Ex. For CSK, How many matches CSK win during league stages only considered. Playoffs matches not considered in this.",
        ],
      },
      {
        category: "Most 4's by Individual Batsman of IPL",
        description: [
          "Maximum Number of Fours Hit By A Batsman in the full Tournament. Ex. Last Season (2021) R Gaikwad Hit 64 Fours in 16 Matches. So, 64 was the Result for the last season.",
        ],
      },
      {
        category: "Most 4's by Individual Batsman in an Inning of IPL",
        description: [
          "Maximum Number of Fours Hit By A Batsman in one Innings. Ex. Last Season (2021) S Yadav Hit 13 Fours in the 55th league Match. So, 13 was the Result for the last season.",
        ],
      },
      {
        category: "Most 6's by Individual Batsman of IPL",
        description: [
          "Maximum Number of Sixes Hit By A Batsman in the full Tournament. Ex. Last Season (2021) KL Rahul Hit 30 Sixes in 13 Matches. So, 30 was the Result for the last season.",
        ],
      },
      {
        category: "Most 6's by Individual Batsman in an Inning of IPL",
        description: [
          "Maximum Number of Sixes Hit By A Batsman in one Innings. Ex. Last Season (2021) K Pollard Hit 8 Sixes in the 27th league Match. So, 8 was the Result for the last season.",
        ],
      },
      {
        category: "Most Runs Given by Bowler in an Inning of IPL",
        description: [
          "Maximum How much Runs conceded by an individual Bowler in an Innings. Ex: Last Season (2021) L Ngidi conceded 62 runs in 4 overs of the 27th Match. So, 62 was the Result for the last season.",
        ],
      },
      {
        category: "Most Wickets by Bowler in an Inning of IPL",
        description: [
          "Maximum How much Wickets taken by an individual Bowler in an Innings. Ex: Last Season (2021) H Patel took 5 wickets in the 1st Match. So, 5 was the Result for the last season.",
        ],
      },
      {
        category: "Most 50's by Individual Batsman of IPL",
        description: [
          "Maximum Number of Fifties Hit By A Batsman in the full Tournament. Ex. Last Season (2021) Faf duPlessis Hit 6 fifties in 16 Matches. So, 6 was the Result for the last season.",
        ],
      },
      {
        category: "Highest Total Runs in Individual Match of IPL",
        description: [
          "Maximum total runs of both Teams in an individual match. Ex. Last Season (2021) RR vs PBKS match both teams Total runs 438 (4th League Match). So, 438 was the Result for the Last Season.",
        ],
      },
      {
        category: "Highest Innings Run",
        description: ["Both innings are valid"],
      },
      {
        category: "Lowest Innings Run",
        description: ["Only the first innings is valid"],
      },
      {
        category: "Highest Over Run",
        description: ["Both innings are valid"],
      },
      {
        category: "Highest Match 1st Over Run in Individual Match",
        description: ["Only the first innings is valid"],
      },
      {
        category: "Highest Fours in Individual Match",
        description: ["Both innings are valid"],
      },
      {
        category: "Highest Sixes in Individual Match",
        description: ["Both innings are valid"],
      },
      {
        category: "Highest Extras in Individual Match",
        description: ["Both innings are valid"],
      },
      {
        category: "Highest Wicket in Individual Match",
        description: ["Both innings are valid"],
      },
      {
        category: "Highest 6 Over Run",
        description: [
          "Both innings are valid",
          "Super over will not be included",
        ],
      },
      {
        category: "Fastest Fifty",
        description: [
          "In fastest fifty always the first 50 runs will be considered, for example, if R Sharma scores 1st fifty in 17 balls and scores 100 in next 14 balls, fastest 50 will be given based on the balls for the 1st fifty runs",
        ],
      },
    ],
  },
  {
    sportName: "Kabaddi",
    rules: [
      {
        category: "General Rules",
        description: [
          "In any circumstances, management decision will be final related to all Fancy of kabaddi of our exchange.",
          "All fancy bets will be validated when the match has been tied.",
          "The results Result of individual player of fancy will be validated only when the player plays that match.",
          "In any case wrong rate has been given in fancy that particular bets will be deleted.",
        ],
      },
      {
        category: "Playoffs Final Result",
        description: [
          "For Playoffs, Final Result Of 40 Minutes Of Two Halves Will Be Valid In Our Exchange",
        ],
      },
    ],
  },
  {
    sportName: "World Cup",
    rules: [
      {
        category: "General Rules",
        description: [
          "In case of any circumstances, management decision will be final for all the fancies under the World Cup.",
          "If World Cup fixture of 48 matches gets reduced due to any reason, then all the special fancies will be voided (Match abandoned due to rain/bad light will not be considered in this).",
          "Super over will not be included.",
          "At any situation, if the result is given for any particular event based on the rates given for the same, then the particular result will be considered valid. Similarly, if the tournament gets canceled due to any reason, the previously given result will be considered valid.",
        ],
      },
      {
        category: "Match 1st Over Run",
        description: [
          "This fancy is valid only for the first innings of the match.",
          "Average 4 runs will be given in case of match abandoned or the entire 50 over is not played.",
        ],
      },
      {
        category: "Highest Inning Run",
        description: [
          "This fancy is valid only for the first innings of the match.",
        ],
      },
    ],
  },
  {
    sportName: "Khado",
    rules: [
      {
        category: "General Rules",
        description: [
          "Only the first inning is valid for T20 and one day matches.",
          "Same will work like Lambi. If the match is abandoned or over reduced, all bets will be deleted.",
          "You can choose your own value in this event.",
        ],
      },
    ],
  },
  {
    sportName: "Election",
    rules: [
      {
        category: "General Rules",
        description: [
          "The final result declared by the Election Commission of India for Loksabha election 2019 will be valid in our exchange.",
          "Accidental issues during Loksabha election 2019 will not be counted in our exchange.",
        ],
      },
    ],
  },
  {
    sportName: "Fancy",
    rules: [
      {
        category: "General",
        description: [
          "All fancy bets will be validated when the match has been tied.",
          "All advance fancy will be suspended before toss or weather condition. All advance fancy will be voided if overs are reduced before the match starts.",
          "In case of a technical error or any circumstances where any fancy is suspended and does not resume, results will be given and all previous bets will be valid (based on haar/jeet).",
          "If a wrong rate has been given in fancy, those particular bets will be cancelled.",
          "In any circumstance, management decision will be final related to all exchange items. Our scorecard will be considered as valid if there is any mismatch in the online portal.",
          "If a customer makes bets in the wrong fancy, we are not liable to delete, no changes will be made, and bets will be considered as confirm bets.",
          "Due to any technical error, if the market is open and the result has come, all bets after the result will be deleted.",
          "Manual bets are not accepted in our exchange.",
          "Our exchange will provide a 5-second delay in our TV.",
          "The company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example, in case of VPN/robot-use/multiple entries from the same IP/multiple bets at the same time (Punching) and others. Note: only winning bets will be voided. For example, if we find such entries (above mentioned) from any ID and their bets are (200000 lay in a 6 over session for the rate 40 and 200000 back for the rate of 48) and the actual score is 38, bets of 40 lay will be voided, and the bets for 48 back will be considered valid.",
          "The company reserves the right to void any bets (only winning bets) of any event at any point of the match if the company believes there is any cheating/wrong doing in that particular event by the players (either batsman/bowler).",
          "Once our exchange gives a username and password, it is your responsibility to change the password.",
          "Penalty runs will not be counted in any fancy.",
          "Warning: live scores and other data on this site are sourced from third-party feeds and may be subject to time delays and/or be inaccurate. If you rely on this data to place bets, you do so at your own risk. Our exchange does not accept responsibility for loss suffered as a result of reliance on this data.",
          "Traders will block the user ID if any misinterpret activities are found. No queries accepted regarding this.",
          "Our exchange is not responsible for misuse of client ID.",
        ],
      },
    ],
  },
  {
    sportName: "Match",
    rules: [
      {
        category: "Tennis Match Odds",
        description: [
          "If the 1st set has not been completed at the time of the retirement or disqualification, then all bets relating to that individual match will be void.",
        ],
      },
      {
        category: "Football Match Odds",
        description: [
          "All bets apply to the relevant full 'regular time' period including stoppage time. Any extra-time and/or penalty shoot-out is not included.",
          "For the cancellation of a goal, due to VAR, bets matched between the time of the goal being scored and the time at which the video assistant referee finishes the review will be voided.",
          "For the cancellation of a red card, due to VAR, bets matched after the time at which the video assistant referee commences the review will be voided.",
        ],
      },
      {
        category: "Football Under/Over Goals",
        description: [
          "In the event of a match starting but not being completed, all bets will be void unless the specific market outcome is already determined.",
        ],
      },
      {
        category: "All sports",
        description: [
          "The company reserves the right to suspend/void any ID/bets if the same is found to be illegitimate. For example, in case of VPN/robot-use/multiple entry from the same or different IP and others. Note: only winning bets will be voided.",
        ],
      },
      {
        category: "Badminton Match Odds",
        description: [
          "Predict which player will win the match. In the event of any of the named players in a match changing before the match starts, then all bets are void.",
          "In the event of a match starting but not being completed, then all bets will be void.",
        ],
      },
      {
        category: "Badminton Set Winner",
        description: [
          "The set must be completed for bets to stand unless the specific market outcome is already determined.",
        ],
      },
    ],
  },
  {
    sportName: "Binary",
    rules: [
      {
        category: "General Rules",
        description: [
          "All session's bets will be confirmed at market rate only.",
          "All session's settlement price means the result can be checked from the exchange's official sites.",
          "All session's result will be the settlement price provided by the exchange after market close.",
          "Every product has two types of prices SPOT and FUTURE. We provide only near month's FUTURE price in Binary Session. You can check it from the official website of that product.",
        ],
      },
      {
        category: "Session Timings",
        description: [
          "NFY, B-NFY, AXS, ICI, RIL, SBI, TT STL - Monday to Friday 10:00 a.m. to 2:30 p.m.",
          "GOLD, SILVER, CRUDE - Monday to Friday 11:30 a.m. to 10:30 p.m.",
          "CMX CRUDE, DOWJONES, NASDAQ, SNP - Monday to Friday 7:30 p.m. to 12:00 a.m.",
        ],
      },
      {
        category: "Betting Rules",
        description: [
          "Same bets same time from multiple IDs not allowed.",
          "Operating and market making bets (cheating/line/chamka bets) are not allowed.",
          "If any case wrong rate has been given in fancy that particular bet will be cancelled.",
          "Deleted bets will be removed under 24 hours, and clients will be notified.",
        ],
      },
    ],
  },
];

export const casinoIcons = [
  {
    url: "/casino/ball_by_ball",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/ballbyball.jpg",
    name: "Ball By Ball",
  },
  {
    url: "/casino/superover",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/superover.jpg",
    name: "Super Over",
  },
  {
    url: "/casino/race/t20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/race20.png",
    name: "Race 20-20",
  },
  {
    url: "/casino/queen",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/queen.jpg",
    name: "Casino Queen",
  },
  {
    url: "/casino/cricketv3",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cricketv3.jpg",
    name: "5Five Cricket",
  },
  {
    url: "/abj2",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar2.jpg",
    name: "Andar Bahar 2",
  },
  {
    url: "/dt202",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt202.jpg",
    name: "20-20 Dragon Tiger 2",
  },
  {
    url: "/casino/baccarat2",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat2.jpg",
    name: "Baccarat 2",
  },
  {
    url: "/casino/baccarat",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat.png",
    name: "Baccarat",
  },
  {
    url: "/casino/lucky7eu",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7eu.jpg",
    name: "Lucky 7 - B",
  },
  {
    url: "/casino/teenpatti-list/teen6",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teencasino.jpg",
    name: "Teenpatti 2.0",
  },
  {
    url: "/casino/cc20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cc-20.jpg",
    name: "20-20 Cricket Match",
  },
  {
    url: "/casino/cmeter",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cmeter.jpg",
    name: "Casino Meter",
  },
  {
    url: "/casino/war",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/war.jpg",
    name: "Casino War",
  },
  {
    url: "/casino/dtl20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dtl.jpg",
    name: "20-20 DTL",
  },
  {
    url: "/casino/teenpatti/test",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
    name: "Test Teenpatti",
  },
  {
    url: "/casino/teenpatti/open",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
    name: "Open Teenpatti",
  },
  {
    url: "/casino/teenpatti/oneday",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
    name: "1 Day Teenpatti",
  },
  {
    url: "/teenPatti20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
    name: "20-20 Teenpatti",
  },
  {
    url: "/casino/poker/6player",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
    name: "6 Player Poker",
  },
  {
    url: "/casino/poker/oneday",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
    name: "1 Day Poker",
  },
  {
    url: "/casino/poker/t20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
    name: "20-20 Poker",
  },
  {
    url: "/casino/ab20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar.jpg",
    name: "Andar Bahar",
  },
  {
    url: "/casino/worli",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/worli.jpg",
    name: "Worli Matka",
  },
  {
    url: "/casino/worli2",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/worli.jpg",
    name: "Instant Worli",
  },
  {
    url: "/casino/3cardj",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/3cardsJ.jpg",
    name: "3 Cards Judgement",
  },
  {
    url: "/casino/card32a",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsA.jpg",
    name: "32 Cards A",
  },
  {
    url: "/casino/card32b",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsB.jpg",
    name: "32 Cards B",
  },
  {
    url: "/casino/aaa",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/aaa.jpg",
    name: "Amar Akbar Anthony",
  },
  {
    url: "/casino/ddb",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/bollywood-casino.jpg",
    name: "Bollywood Casino",
  },
  {
    url: "/dt20",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg",
    name: "20-20 Dragon Tiger",
  },
  {
    url: "/casino/dt6",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg",
    name: "1 Day Dragon Tiger",
  },
  {
    url: "/casino/lottery",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lottery.jpg",
    name: "Lottery",
  },
  {
    url: "/lucky7-A",
    imgSrc:
      "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7.jpg",
    name: "Lucky 7 - A",
  },
];
export const card3 = {
  dragonTiger: [
    {
      url: "/dt202",
      imgSrc:dt2020,
      name: "20-20 DRAGON TIGER 2",
    },
    {
      url: "/contact-admin",
      imgSrc:dtl20,
      name: "20-20 DRAGON TIGER LION",
    },
    {
      url: "/contact-admin",
      imgSrc:dt6,
      name: "1 DAY DRAGON TIGER",
    },
    {
      url: "/dt20",
      imgSrc:dt20,
      name: "20-20 DRAGON TIGER",
    },
  ],
  teenPatti: [
    {
      url: "/contact-admin",
      imgSrc:teencasino,
      name: "TEENPATTI 2.0",
    },
    {
      url: "/teenPatti20",
      imgSrc:twentyteen,
      name: "20-20 TEENPATTI",
    },
    {
      url: "/contact-admin",
      imgSrc:dayteen,
      name: "1 DAY TEENPATTI",
    },
    {
      url: "/contact-admin",
      imgSrc:testteen,
      name: "TEST TEENPATTI",
    },
    {
      url: "/contact-admin",
      imgSrc:teenplayer,
      name: "OPEN TEENPATTI",
    },
  ],
  lucky7: [
    {
      url: "/lucky7-A",
      imgSrc:lucky7A,
      name: "Lucky 7 A",
    },
    {
      url: "/contact-admin",
      imgSrc:luck7B,
      name: "Lucky 7 B",
    },

  ],
  abj : [
    {
      url: "/abj2",
      imgSrc:abjlist2,
      name: "ANDAR BAHAR 2",
    },
    {
      url: "/contact-admin",
      imgSrc:abjlist,
      name: "ANDAR BAHAR",
    },
  ]
};
export const  dragonTigerCards= [
  {
    code: 0,
    imgSrc:A,
    value: 0,
  },
  {
    code: 1,
    imgSrc:two,
    value: 0,
  },
  {
    code: 2,
    imgSrc:three,
    value: 0,
  },
  {
    code: 3,
    imgSrc:four,
    value: 0,
  },
  {
    code: 4,
    imgSrc:five,
    value: 0,
  },
  {
    code: 5,
    imgSrc:six,
    value: 0,
  },
  {
    code: 6,
    imgSrc:seven,
    value: 0,
  },
  {
    code: 7,
    imgSrc:eight,
    value: 0,
  },
  {
    code: 8,
    imgSrc:nine,
    value: 0,
  },
  {
    code: 9,
    imgSrc:ten,
    value: 0,
  },
  {
    code: 10,
    imgSrc:eleven,
    value: 0,
  },
  {
    code: 11,
    imgSrc:twelve,
    value: 0,
  },
  {
    code: 12,
    imgSrc:thirteen,
    value: 0,
  },
]

