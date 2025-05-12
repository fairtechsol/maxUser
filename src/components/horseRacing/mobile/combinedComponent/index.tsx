import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import RatesBoxMobile from "../ratesBox";

const CombinedComponentMobile = () => {
  const { matchDetail } = useSelector(
    (state: RootState) => state.horseRacing.matchDetail
  );
  return (
    <>
      <div className="market-title mt-1">
        COMBINED
        <span className="float-right">
          Max: {matchDetail?.matchOdd?.maxBet}
        </span>
      </div>
      <div className="main-market">
        <div className="table-header">
          <div className="float-left country-name box-4 min-max" />
          <div className="bg-blue1 box-1 float-left text-center">
            <b>Back</b>
          </div>
          <div className="bg-red3 box-1 float-left text-center">
            <b>Lay</b>
          </div>
        </div>
        <div className="table-body">
          <div data-title="ACTIVE" className="table-row">
            <div
              className="float-left country-name box-4"
              style={{ height: "2.5rem" }}
            >
              1 + 2 + 3 + 4
            </div>
            <RatesBoxMobile
              rate={""}
              percent={""}
              onClick={() => {
                //   const rate = parseFloat(
                //     runner?.ex?.availableToBack[0]?.price
                //   );
                //   if (rate > 0) {
                //     handleClick(
                //       {
                //         betOnTeam: runner?.runnerName,
                //         rate: rate,
                //         type: "back",
                //         stake: 0,
                //         betId: matchDetail?.matchOdd?.id,
                //         eventType: matchDetail?.matchType,
                //         matchId: matchDetail?.id,
                //         matchBetType: matchDetail?.matchOdd?.type,
                //         bettingName: "Match Odd",
                //         placeIndex: 0,
                //         selectionId: JSON.stringify(runner?.selectionId),
                //         runnerId: runner?.id,
                //       },
                //       matchDetail?.matchOdd
                //     );
                //   }
              }}
              bgColor="bg-blue1"
            />
            <RatesBoxMobile
              rate={""}
              percent={""}
              onClick={() => {
                //   const rate = parseFloat(runner?.ex?.availableToLay[0]?.price);
                //   if (rate > 0) {
                //     handleClick(
                //       {
                //         betOnTeam: runner?.runnerName,
                //         rate: rate,
                //         type: "lay",
                //         stake: 0,
                //         betId: matchDetail?.matchOdd?.id,
                //         eventType: matchDetail?.matchType,
                //         matchId: matchDetail?.id,
                //         matchBetType: matchDetail?.matchOdd?.type,
                //         bettingName: "Match Odd",
                //         placeIndex: 0,
                //         selectionId: JSON.stringify(runner?.selectionId),
                //         runnerId: runner?.id,
                //       },
                //       matchDetail?.matchOdd
                //     );
                //   }
              }}
              bgColor="bg-red3"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CombinedComponentMobile;
