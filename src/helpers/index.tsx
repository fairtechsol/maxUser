import service from "../service";
import { ApiConstants } from "../utils/constants";

export const getChannelId = async (eventId: number) => {
  try {
    const res: any = await service.get(
      `${ApiConstants.LIVESTREAM.GET_CHANNEL_ID}?Cno=${eventId}`
    );
    if (res) {
      return res?.result;
    }
  } catch (error) {
    console.log(error);
  }
};

export const customSortOnName = (a: any, b: any) => {
  let nameA = a.name;
  let nameB = b.name;

  let numA = parseFloat(nameA.match(/[\d.]+$/));
  let numB = parseFloat(nameB.match(/[\d.]+$/));

  if (isNaN(numA)) numA = 0;
  if (isNaN(numB)) numB = 0;

  return numA - numB;
};

export const calculateMaxLoss = (profitLossDataSession: any, betId: any) => {
  if (!profitLossDataSession || !Array.isArray(profitLossDataSession)) {
    return 0;
  }

  const totalMaxLoss = profitLossDataSession.reduce((accumulator, bet) => {
    const maxLossToAdd = bet?.betId === betId ? +bet?.maxLoss : 0;
    return accumulator + maxLossToAdd;
  }, 0);

  return totalMaxLoss;
};

export const handleSize = (rate: any) => {
  if (rate && rate != 0) {
    return rate;
  } else {
    return "";
  }
};
export const handlePrice = (rate: any) => {
  if (rate && rate != 0) {
    return rate;
  } else {
    return "-";
  }
};
export const formatNumber = (num: any) => {
  if (num >= 1000 && num < 100000) {
    return (num / 1000)?.toFixed(1)?.replace(/\.0$/, "") + "K";
  } else if (num >= 100000) {
    return (num / 100000)?.toFixed(1)?.replace(/\.0$/, "") + "L";
  }
  return num?.toString() ?? 0;
};
export const dummyArray = [
  {
    price: 0,
    size: 0,
  },
  {
    price: 0,
    size: 0,
  },
  {
    price: 0,
    size: 0,
  },
];

export const manualProfitLoss = (
  selectedBet: any,
  team: any,
  type: any,
) => {
  const bet = selectedBet?.team;
  if (type !== bet?.matchBetType || !bet?.stake) return 0;
  const isBack = bet?.type?.toLowerCase() === "back";
  const isMatch = selectedBet?.data?.gtype === "match";
  const isSameTeam = team === bet?.betOnTeam;

  const stake = parseFloat(bet.stake) || 0;
  const rate = parseFloat(bet.rate) || 0;

  let result = 0;

  if (isMatch) {
    if (isBack) {
      result = isSameTeam ? stake * (rate - 1) : -stake;
    } else {
      result = isSameTeam ? -(stake * (rate - 1)) : stake;
    }
  } else {
    const profitOrLoss = (stake * rate) / 100;
    if (isBack) {
      result = isSameTeam ? profitOrLoss : -stake;
    } else {
      result = isSameTeam ? -profitOrLoss : stake;
    }
  }

  return parseFloat(result.toFixed(2)) || 0;
};

export const calculateRequiredStack = (
  initialTeamA: number,
  initialTeamB: number,
  perc: number
): number => {
  if (!initialTeamA || !initialTeamB || !perc) return 0;

  let result = (initialTeamB - initialTeamA) / (1 + perc / 100);
  return parseFloat(result.toFixed(2)) ?? 0;
};
