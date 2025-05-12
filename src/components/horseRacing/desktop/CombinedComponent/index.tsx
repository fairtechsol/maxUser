import RatesBox from "../ratesBox";

const CombinedComponent = () => {
  return (
    <div className="game-market market-12">
      <div className="market-title mt-1">COMBINED</div>
      <div className="market-header">
        <div className="market-nation-detail" />
        <div className="market-odd-box no-border d-none d-md-flex" />
        <div className="market-odd-box no-border d-none d-md-flex" />
        <div className="market-odd-box back">
          <b>Back</b>
        </div>
        <div className="market-odd-box lay">
          <b>Lay</b>
        </div>
        <div className="market-odd-box d-none d-md-flex" />
        <div className="market-odd-box no-border d-none d-md-flex" />
      </div>
      <div className="market-body">
        <div className="market-row removed">
          <div className="market-nation-detail" style={{ height: "2.5rem" }}>
            <span className="form-check-label">1 + 2 + 3 + 4</span>
          </div>
          <RatesBox bgColor="bg-blue1" />
          <RatesBox bgColor="bg-blue2" />
          <RatesBox
            bgColor="bg-blue3"
            onClick={
              () => {}
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
            }
          />
          <RatesBox
            bgColor="bg-red1"
            onClick={
              () => {}
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
            }
          />
          <RatesBox bgColor="bg-red2" />
          <RatesBox bgColor="bg-red3" />
        </div>
      </div>
    </div>
  );
};

export default CombinedComponent;
