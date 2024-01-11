import { matchBettingType } from "./constants";

export const calculateProfitLoss = (
  betData: any,
  selectedData: any,
  team: string
) => {
  if (
    betData?.id != selectedData?.data?.id ||
    !betData?.id ||
    !selectedData?.data?.id
  ) {
    return "";
  }
  if (selectedData?.team?.type == "lay") {
    if (selectedData?.team?.betOnTeam == team) {
      return -parseFloat(selectedData?.team?.stake).toFixed(2);
    } else {
      return selectedData?.data?.type == matchBettingType.matchOdd ||
        selectedData?.data?.type == matchBettingType.tiedMatch1 ||
        selectedData?.data?.type == matchBettingType.completeMatch
        ? +selectedData?.team?.stake * (parseInt(selectedData?.team?.rate) - 1)
        : (
            +selectedData?.team?.stake *
            (parseInt(selectedData?.team?.rate) / 100)
          ).toFixed(2);
    }
  } else {
    if (selectedData?.team?.betOnTeam != team) {
      return -(+selectedData?.team?.stake).toFixed(2);
    } else {
      return selectedData?.data?.type == matchBettingType.matchOdd ||
        selectedData?.data?.type == matchBettingType.tiedMatch1 ||
        selectedData?.data?.type == matchBettingType.completeMatch
        ? +selectedData?.team?.stake * (parseInt(selectedData?.team?.rate) - 1)
        : (
            +selectedData?.team?.stake *
            (parseInt(selectedData?.team?.rate) / 100)
          ).toFixed(2);
    }
  }
};
