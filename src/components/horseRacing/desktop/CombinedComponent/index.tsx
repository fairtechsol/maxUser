// import { useDispatch } from "react-redux";
// import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
// import { AppDispatch } from "../../../../store/store";

const CombinedComponent = () => {
  //   const dispatch: AppDispatch = useDispatch();

  //   const handleClick = (team: any, data: any) => {
  //     dispatch(
  //       selectedBetAction({
  //         team,
  //         data,
  //       })
  //     );
  //   };

  return (
    <div className="game-market market-12">
      <div className="market-title mt-1">COMBINED</div>
      <div className="market-header">
        <div className="market-nation-detail"></div>
        <div className="market-odd-box no-border d-none d-md-flex"></div>
        <div className="market-odd-box no-border d-none d-md-flex"></div>
        <div className="market-odd-box back">
          <b>Back</b>
        </div>
        <div className="market-odd-box lay">
          <b>Lay</b>
        </div>
        <div className="market-odd-box d-none d-md-flex"></div>
        <div className="market-odd-box no-border d-none d-md-flex"></div>
      </div>
      <div className="market-body">
        <div className="market-row removed">
          <div className="market-nation-detail" style={{ height: "2.5rem" }}>
            <span className="form-check-label">1 + 2 + 3 + 4</span>
          </div>
          <div className="market-odd-box bg-blue1">
            <span className="market-odd"></span>
            <span className="market-volume"></span>
          </div>
          <div className="market-odd-box bg-blue2">
            <span className="market-odd"></span>
            <span className="market-volume"></span>
          </div>
          <div
            className="market-odd-box bg-blue3"
            onClick={() => {
              // const rate = parseFloat(
              //   race?.ex?.availableToBack[0]?.price
              // );
              // if (rate > 0) {
              //   handleClick(
              //     {
              //       betOnTeam: race.runnerName,
              //       rate: rate,
              //       type: "back",
              //       stake: 0,
              //       betId: data?.matchOdd?.id,
              //       eventType: data?.matchType,
              //       matchId: data?.id,
              //       matchBetType: data?.matchOdd?.type,
              //       bettingName: "Match Odd",
              //       placeIndex: 0,
              //       selectionId: JSON.stringify(race?.selectionId),
              //       runnerId: race?.id,
              //     },
              //     data?.matchOdd
              //   );
              // }
            }}
          >
            <span className="market-odd"></span>
            <span className="market-volume"></span>
          </div>
          <div
            className="market-odd-box bg-red1"
            onClick={() => {
              // const rate = parseFloat(
              //   race?.ex?.availableToLay[0]?.price
              // );
              // if (rate > 0) {
              //   handleClick(
              //     {
              //       betOnTeam: race.runnerName,
              //       rate: rate,
              //       type: "lay",
              //       stake: 0,
              //       betId: data?.matchOdd?.id,
              //       eventType: data?.matchType,
              //       matchId: data?.id,
              //       matchBetType: data?.matchOdd?.type,
              //       bettingName: "Match Odd",
              //       placeIndex: 0,
              //       selectionId: JSON.stringify(race?.selectionId),
              //       runnerId: race?.id,
              //     },
              //     data?.matchOdd
              //   );
              // }
            }}
          >
            <span className="market-odd"></span>
            <span className="market-volume"></span>
          </div>
          <div className="market-odd-box bg-red2">
            <span className="market-odd"></span>
            <span className="market-volume"></span>
          </div>
          <div className="market-odd-box bg-red3">
            <span className="market-odd"></span>
            <span className="market-volume"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedComponent;
