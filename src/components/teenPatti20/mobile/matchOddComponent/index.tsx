import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import RatesBoxMobile from "../ratesBox";
import moment from "moment";
import "../style.scss";

const MatchOddCompnentMobile = ({ handleShowModal, handleClick }: any) => {
  const { matchDetail } = useSelector(
    (state: RootState) => state.horseRacing.matchDetail
  );
  return (
    <>
      <div className="market-title mt-1">
        MATCH_ODDS
        <span className="float-right">
          Max: {matchDetail?.matchOdd?.maxBet}
        </span>
      </div>
      <div className="main-market">
        <div className="table-header">
          <div className="float-left country-name box-4 min-max"></div>
          <div className="bg-blue1 box-1 float-left text-center">
            <b>Back</b>
          </div>
          <div className="bg-red3 box-1 float-left text-center">
            <b>Lay</b>
          </div>
        </div>
        <div className="table-body">
          {matchDetail?.matchOdd?.runners?.map((runner: any, index: number) => (
            <div
              data-title={
                runner?.status !== "ACTIVE"
                  ? runner?.status === "REMOVED"
                    ? `${runner?.status} - ${
                        runner?.adjustmentFactor
                      }%, ${moment(runner?.removalDate).format(
                        "MM/DD/YYYY HH:mm:ss A ([IST])"
                      )}`
                    : runner?.status
                  : ""
              }
              className={`table-row ${
                runner?.status !== "ACTIVE" ||
                matchDetail?.matchOdd?.activeStatus !== "live"
                  ? "suspended"
                  : ""
              } removed`}
              key={runner?.id}
            >
              <div className="float-left country-name box-4">
                {matchDetail?.matchType === "greyHound" ? (
                  <div className="">
                    <label htmlFor={runner.id} className="custom-control-label">
                      <div>
                        <span>{`${index + 1}. ${
                          runner.runnerName.split(".")?.[1]?.trim()
                            ? runner.runnerName.split(".")?.[1]?.trim()
                            : runner.runnerName
                        }`}</span>
                      </div>
                    </label>
                    <div className="d-flex justify-content-end">
                      <span
                        className={`${
                          matchDetail?.profitLossDataMatch &&
                          matchDetail?.profitLossDataMatch[runner?.id]
                            ? matchDetail?.profitLossDataMatch[runner?.id] > 0
                              ? "color-green"
                              : "color-red"
                            : ""
                        }`}
                      >
                        {matchDetail?.profitLossDataMatch &&
                        matchDetail?.profitLossDataMatch[runner?.id]
                          ? matchDetail?.profitLossDataMatch[runner?.id]
                          : 0}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      id={runner?.id}
                      name={runner?.runnerName}
                      className="custom-control-input"
                      value={runner?.runnerName}
                    />
                    <label htmlFor={runner.id} className="custom-control-label">
                      <span className="horse-mobile-arrow">
                        <i
                          data-toggle="collapse"
                          data-target={`#detail-${runner.id}`}
                          className="fas fa-angle-down"
                          onClick={(event) => handleShowModal(event, runner)}
                        ></i>
                      </span>
                      <div>
                        {runner?.number}
                        <br />({runner?.metadata?.STALL_DRAW})
                      </div>
                      <div>
                        <img src={runner?.image} alt={runner?.name} />
                      </div>
                      <div>
                        <span>{`${index + 1}. ${
                          runner.runnerName.split(".")?.[1]?.trim()
                            ? runner.runnerName.split(".")?.[1]?.trim()
                            : runner.runnerName
                        }`}</span>
                        <div className="w-100" style={{ color: "black" }}>
                          {/* {runner.metadata?.AGE}
                           */}{" "}
                          <span
                            className={`${
                              matchDetail?.profitLossDataMatch &&
                              matchDetail?.profitLossDataMatch[runner?.id]
                                ? matchDetail?.profitLossDataMatch[runner?.id] >
                                  0
                                  ? "color-green"
                                  : "color-red"
                                : ""
                            }`}
                          >
                            {matchDetail?.profitLossDataMatch &&
                            matchDetail?.profitLossDataMatch[runner?.id]
                              ? matchDetail?.profitLossDataMatch[runner?.id]
                              : 0}
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                )}
              </div>
              {/* <BetStatusOverlayHorseRacing
                active={
                  runner?.status !== "ACTIVE" ||
                  matchDetail?.matchOdd?.activeStatus !== "live"
                }
                liveData={runner}
              > */}
              <RatesBoxMobile
                rate={runner?.ex?.availableToBack[0]?.price}
                percent={runner?.ex?.availableToBack[0]?.size}
                onClick={() => {
                  const rate = parseFloat(
                    runner?.ex?.availableToBack[0]?.price
                  );
                  if (rate > 0) {
                    handleClick(
                      {
                        betOnTeam: runner?.runnerName,
                        rate: rate,
                        type: "back",
                        stake: 0,
                        betId: matchDetail?.matchOdd?.id,
                        eventType: matchDetail?.matchType,
                        matchId: matchDetail?.id,
                        matchBetType: matchDetail?.matchOdd?.type,
                        bettingName: "Match Odd",
                        placeIndex: 0,
                        selectionId: JSON.stringify(runner?.selectionId),
                        runnerId: runner?.id,
                      },
                      matchDetail?.matchOdd
                    );
                  }
                }}
                bgColor="bg-blue1"
              />
              <RatesBoxMobile
                rate={runner?.ex?.availableToLay[0]?.price}
                percent={runner?.ex?.availableToLay[0]?.size}
                onClick={() => {
                  const rate = parseFloat(runner?.ex?.availableToLay[0]?.price);
                  if (rate > 0) {
                    handleClick(
                      {
                        betOnTeam: runner?.runnerName,
                        rate: rate,
                        type: "lay",
                        stake: 0,
                        betId: matchDetail?.matchOdd?.id,
                        eventType: matchDetail?.matchType,
                        matchId: matchDetail?.id,
                        matchBetType: matchDetail?.matchOdd?.type,
                        bettingName: "Match Odd",
                        placeIndex: 0,
                        selectionId: JSON.stringify(runner?.selectionId),
                        runnerId: runner?.id,
                      },
                      matchDetail?.matchOdd
                    );
                  }
                }}
                bgColor="bg-red3"
              />
              {/* </BetStatusOverlayHorseRacing> */}
              <div
                id={`detail-${runner?.id}`}
                className="collapse box-10 jockey-detail"
              >
                <span>
                  <b>Jockey:</b> {runner.metadata?.JOCKEY_NAME}
                </span>
                <span>
                  <b>Trainer:</b> {runner.metadata?.TRAINER_NAME}
                </span>
                <span>
                  <b>Age:</b> {runner.metadata?.AGE}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MatchOddCompnentMobile;
