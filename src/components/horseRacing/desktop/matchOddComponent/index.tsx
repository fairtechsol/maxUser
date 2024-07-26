import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import RatesBox from "../ratesBox";
import BetStatusOverlayHorseRacing from "../../../commonComponent/betComponents/betStatusOverlayHorseRacing";

const MatchOddComponent = ({ data }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (team: any, data: any) => {
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  
  return (
    <div className="game-market market-12">
      <div className="market-title mt-1">
        {"MATCH ODDS"}
        <span className="float-right">Max : {data?.matchOdd?.maxBet}</span>
      </div>
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
        {data?.matchOdd?.runners
          ?.slice()
          ?.sort((a: any, b: any) => a?.sortPriority - b?.sortPriority)
          ?.map((race: any, index: number) => (
            <div className="market-row removed" key={race?.id}>
              <div className="market-nation-detail">
                {data?.matchType === "greyHound" ? (
                  <div
                    className="form-check"
                    style={{ paddingLeft: 0, alignItems: "flex-start" }}
                  >
                    <span className="market-nation-name">
                      {race?.runnerName}
                    </span>
                    <label style={{ alignItems: "flex-end", width: "auto" }}>
                      <div>
                        <span
                          className={`market-book float-right ${
                            data?.profitLossDataMatch &&
                            data?.profitLossDataMatch[race?.id]
                              ? data?.profitLossDataMatch[race?.id] > 0
                                ? "color-green"
                                : "color-red"
                              : ""
                          }`}
                        >
                          {data?.profitLossDataMatch &&
                          data?.profitLossDataMatch[race?.id]
                            ? data?.profitLossDataMatch[race?.id]
                            : 0}
                        </span>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id={race.id}
                      name={race.id}
                      className="form-check-input"
                    />
                    <label htmlFor={race.id} className="form-check-label">
                      <div>
                        {race?.metadata?.CLOTH_NUMBER}
                        <br />({race?.metadata?.STALL_DRAW})
                      </div>
                      <div>
                        {/* <img src={race.imageUrl} alt={race.name} /> */}
                      </div>
                      <div>
                        <div className="d-flex justify-content-between w-100">
                          <span className="market-nation-name ">
                            {`${index + 1}. ${
                              race?.runnerName?.split(".")?.[1]?.trim()
                                ? race?.runnerName?.split(".")?.[1]?.trim()
                                : race?.runnerName
                            }`}
                          </span>
                          <span
                            className={`market-book float-right ${
                              data?.profitLossDataMatch &&
                              data?.profitLossDataMatch[race?.id]
                                ? data?.profitLossDataMatch[race?.id] > 0
                                  ? "color-green"
                                  : "color-red"
                                : ""
                            }`}
                          >
                            {data?.profitLossDataMatch &&
                            data?.profitLossDataMatch[race?.id]
                              ? data?.profitLossDataMatch[race?.id]
                              : 0}
                          </span>
                        </div>
                        <div className="jockey-detail d-none d-md-flex">
                          <span className="jockey-detail-box">
                            <b>Jockey:-</b>{" "}
                            <span>{race?.metadata?.JOCKEY_NAME}</span>
                          </span>
                          <span className="jockey-detail-box">
                            <b>Trainer:-</b>{" "}
                            <span>{race?.metadata?.TRAINER_NAME}</span>
                          </span>
                          <span className="jockey-detail-box">
                            <b>Age:-</b> <span>{race?.metadata?.AGE}</span>
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                )}
              </div>
              <BetStatusOverlayHorseRacing
                active={
                  race?.status !== "ACTIVE" ||
                  data?.matchOdd?.activeStatus !== "live"
                }
                liveData={race}
              >
                <RatesBox
                  rate={
                    race?.ex?.availableToBack[2]?.price
                      ? race?.ex?.availableToBack[2]?.price
                      : data?.matchType === "horseRacing"
                      ? ""
                      : 0
                  }
                  percent={
                    race?.ex?.availableToBack[2]?.size
                      ? race?.ex?.availableToBack[2]?.size
                      : data?.matchType === "horseRacing"
                      ? ""
                      : 0
                  }
                  bgColor="bg-blue1"
                />
                <RatesBox
                  rate={
                    race?.ex?.availableToBack[1]?.price
                      ? race?.ex?.availableToBack[1]?.price
                      : data?.matchType === "horseRacing"
                      ? ""
                      : 0
                  }
                  percent={
                    race?.ex?.availableToBack[1]?.size
                      ? race?.ex?.availableToBack[1]?.size
                      : data?.matchType === "horseRacing"
                      ? ""
                      : 0
                  }
                  bgColor="bg-blue2"
                />
                <RatesBox
                  rate={
                    race?.ex?.availableToBack[0]?.price
                      ? race?.ex?.availableToBack[0]?.price
                      : data?.matchType === "horseRacing"
                      ? ""
                      : 0
                  }
                  percent={
                    race?.ex?.availableToBack[0]?.size
                      ? race?.ex?.availableToBack[0]?.size
                      : data?.matchType === "horseRacing"
                      ? ""
                      : 0
                  }
                  bgColor="bg-blue3"
                  onClick={() => {
                    const rate = parseFloat(
                      race?.ex?.availableToBack[0]?.price
                    );
                    if (rate > 0) {
                      handleClick(
                        {
                          betOnTeam: race.runnerName,
                          rate: rate,
                          type: "back",
                          stake: 0,
                          betId: data?.matchOdd?.id,
                          eventType: data?.matchType,
                          matchId: data?.id,
                          matchBetType: data?.matchOdd?.type,
                          bettingName: "Match Odd",
                          placeIndex: 0,
                          selectionId: JSON.stringify(race?.selectionId),
                          runnerId: race?.id,
                        },
                        data?.matchOdd
                      );
                    }
                  }}
                />
                <RatesBox
                  rate={
                    race?.ex?.availableToLay[0]?.price
                      ? race?.ex?.availableToLay[0]?.price
                      : data?.matchType === "horseRacing"
                      ? ""
                      : 0
                  }
                  percent={
                    race?.ex?.availableToLay[0]?.size
                      ? race?.ex?.availableToLay[0]?.size
                      : data?.matchType === "horseRacing"
                      ? ""
                      : 0
                  }
                  bgColor="bg-red1"
                  onClick={() => {
                    const rate = parseFloat(race?.ex?.availableToLay[0]?.price);
                    if (rate > 0) {
                      handleClick(
                        {
                          betOnTeam: race.runnerName,
                          rate: rate,
                          type: "lay",
                          stake: 0,
                          betId: data?.matchOdd?.id,
                          eventType: data?.matchType,
                          matchId: data?.id,
                          matchBetType: data?.matchOdd?.type,
                          bettingName: "Match Odd",
                          placeIndex: 0,
                          selectionId: JSON.stringify(race?.selectionId),
                          runnerId: race?.id,
                        },
                        data?.matchOdd
                      );
                    }
                  }}
                />
                <RatesBox
                  rate={
                    race?.ex?.availableToLay[1]?.price
                      ? race?.ex?.availableToLay[1]?.price
                      : data?.matchType === "horseRacing"
                      ? ""
                      : 0
                  }
                  percent={
                    race?.ex?.availableToLay[1]?.size
                      ? race?.ex?.availableToLay[1]?.size
                      : data?.matchType === "horseRacing"
                      ? ""
                      : 0
                  }
                  bgColor="bg-red2"
                />
                <RatesBox
                  rate={
                    race?.ex?.availableToLay[2]?.price
                      ? race?.ex?.availableToLay[2]?.price
                      : data?.matchType === "horseRacing"
                      ? ""
                      : 0
                  }
                  percent={
                    race?.ex?.availableToLay[2]?.size
                      ? race?.ex?.availableToLay[2]?.size
                      : data?.matchType === "horseRacing"
                      ? ""
                      : 0
                  }
                  bgColor="bg-red3"
                />
              </BetStatusOverlayHorseRacing>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MatchOddComponent;
