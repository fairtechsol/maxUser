import { matchBettingType } from "./constants";
export const calculateProfitLoss = (
  betData: any,
  selectedData: any,
  team: string
) => {
  // console.log('first',selectedData)
  if (
    betData?.id != selectedData?.data?.id ||
    !betData?.id ||
    !selectedData?.data?.id
  ) {
    return "";
  }
  // if (selectedData?.team?.type == "lay") {
  //   if (selectedData?.team?.betOnTeam == team) {
  //     return -parseFloat((+selectedData?.team?.stake || 0).toFixed(2));
  //   } else {
  //     return selectedData?.data?.type == matchBettingType.matchOdd
  //       ? parseFloat(
  //           (
  //             (+selectedData?.team?.stake || 0) *
  //             (parseFloat(selectedData?.team?.rate) / 100)
  //           ).toFixed(2)
  //         )
  //       : parseFloat(
  //           (
  //             (+selectedData?.team?.stake || 0) *
  //             (parseFloat(selectedData?.team?.rate) - 1)
  //           ).toFixed(2)
  //         );
  //   }
  // } else {
  //   if (selectedData?.team?.betOnTeam != team) {
  //     return -parseFloat((+selectedData?.team?.stake || 0).toFixed(2));
  //   } else {
  //     return selectedData?.data?.type == matchBettingType.matchOdd
  //       ? parseFloat(
  //           (
  //             (+selectedData?.team?.stake || 0) *
  //             (parseFloat(selectedData?.team?.rate) - 1)
  //           ).toFixed(2)
  //         )
  //       : parseFloat(
  //           (
  //             (+selectedData?.team?.stake || 0) *
  //             (parseFloat(selectedData?.team?.rate) / 100)
  //           ).toFixed(2)
  //         );
  //   }
  // }
  if (
    betData?.type === matchBettingType.matchOdd ||
    betData?.type === matchBettingType.tiedMatch1 ||
    betData?.type === matchBettingType.completeMatch ||
    betData?.type === matchBettingType.halfTime ||
    betData?.type.includes('overUnder') ||
    betData?.type.includes('firstHalfGoal') ||
    betData?.type.includes('setWinner')
  ) {
    if (selectedData?.team?.type === "lay") {
      let value: any = 0;
      value = +selectedData?.team?.stake * (+selectedData?.team?.rate - 1);
      if (selectedData?.team?.betOnTeam == team) {
        return -parseFloat(value)?.toFixed(2);
      } else {
        return parseFloat(selectedData?.team?.stake)?.toFixed(2);
      }
    } else {
      let value: any = 0;
      value = +selectedData?.team?.stake * (+selectedData?.team?.rate - 1);
      if (selectedData?.team?.betOnTeam == team) {
        return parseFloat(value).toFixed(2);
      } else {
        return -parseFloat(selectedData?.team?.stake).toFixed(2);
      }
    }
  } else if (betData?.type === "session") {
    // console.log('selectedData',selectedData)
    if (selectedData?.team?.type === "no") {
      let value: any = 0;
      value = (+selectedData?.team?.stake * +selectedData?.team?.rate) / 100;
      if (selectedData?.team?.betOnTeam == team) {
        return -parseFloat(value)?.toFixed(2);
      } else {
        return parseFloat(selectedData?.team?.stake)?.toFixed(2);
      }
    } else {
      let value: any = 0;
      value = (+selectedData?.team?.stake * +selectedData?.team?.rate) / 100;
      if (selectedData?.team?.betOnTeam == team) {
        return parseFloat(value)?.toFixed(2);
      } else {
        return -parseFloat(selectedData?.team?.stake)?.toFixed(2);
      }
    }
  } else {
    // console.log('selectedData',selectedData)
    if (selectedData?.team?.type === "lay") {
      let value: any = 0;
      value = (+selectedData?.team?.stake * +selectedData?.team?.rate) / 100;
      if (selectedData?.team?.betOnTeam == team) {
        return -parseFloat(value)?.toFixed(2);
      } else {
        return parseFloat(selectedData?.team?.stake)?.toFixed(2);
      }
    } else {
      let value: any = 0;
      value = (+selectedData?.team?.stake * +selectedData?.team?.rate) / 100;
      if (selectedData?.team?.betOnTeam == team) {
        return parseFloat(value)?.toFixed(2);
      } else {
        return -parseFloat(selectedData?.team?.stake)?.toFixed(2);
      }
    }
  }
};