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
  return num?.toString();
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
  gType: any
) => {
  if (type === selectedBet?.team?.matchBetType && selectedBet?.team?.stake) {
    if (gType === "match") {
      if (
        selectedBet?.team?.type === "back" ||
        selectedBet?.team?.type === "BACK"
      ) {
        if (team === selectedBet?.team?.betOnTeam) {
          let profit = selectedBet?.team?.stake * (selectedBet?.team?.rate - 1);
          return profit ?? 0;
        } else {
          let loss = -selectedBet?.team?.stake;
          return loss ?? 0;
        }
      } else {
        if (team === selectedBet?.team?.betOnTeam) {
          let loss = selectedBet?.team?.stake * (selectedBet?.team?.rate - 1);
          return -loss ?? 0;
        } else {
          let profit = selectedBet?.team?.stake;
          return profit ?? 0;
        }
      }
    } else {
      if (
        selectedBet?.team?.type === "back" ||
        selectedBet?.team?.type === "BACK"
      ) {
        if (team === selectedBet?.team?.betOnTeam) {
          let profit =
            (selectedBet?.team?.stake * selectedBet?.team?.rate) / 100;
          return profit ?? 0;
        } else {
          let loss = -selectedBet?.team?.stake;
          return loss ?? 0;
        }
      } else {
        if (team === selectedBet?.team?.betOnTeam) {
          let loss = (selectedBet?.team?.stake * selectedBet?.team?.rate) / 100;
          return -loss ?? 0;
        } else {
          let profit = selectedBet?.team?.stake;
          return profit ?? 0;
        }
      }
    }
  }
};
