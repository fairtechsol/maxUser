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
export const formatNumber = (num: any) => {
  if (num >= 1000 && num < 1000000) {
    return (num / 1000)?.toFixed(1)?.replace(/\.0$/, "") + "K";
  } else if (num >= 100000) {
    return (num / 100000)?.toFixed(1)?.replace(/\.0$/, "") + "L";
  }
  return num?.toString();
};
