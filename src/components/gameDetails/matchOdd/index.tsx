import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { isLap, isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { profitLossDataForMatchConstants } from "../../../utils/constants";

const MatchOdd = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();

  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    index: any,
    runner: any
  ) => {
    if (data?.activeStatus != "live" || status != "ACTIVE") {
      return false;
    }
    if (odds === 0) {
      return false;
    }
    let team = {
      betOnTeam: betTeam,
      rate: odds,
      type: type,
      stake: 0,
      teamA: detail?.teamA,
      teamB: detail?.teamB,
      teamC: detail?.teamC,
      betId: data?.id,
      eventType: detail?.matchType,
      matchId: detail?.id,
      matchBetType: data?.type,
      placeIndex: index,
      mid: data?.mid?.toString(),
      selectionId: runner?.selectionId?.toString(),
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const formatNumber = (num: any) => {
    if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1).replace(/\.0$/, "") + "L";
    }
    return num.toString();
  };
  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };

  return (
    <>
      <div className="matchOddContainer">
        <div className="matchOddTitle">
          <span
            className={`matchOddTitleTxt ${isMobile ? "f-size13" : "f-size15"}`}
          >
            {title}
          </span>
        </div>

        <div className="matchOddBackLayTab">
          <div className="matchOddMinMaxBox">
            <span className="matchOddMinMax">
              Min:{formatNumber(data?.minBet)} Max:{formatNumber(data?.maxBet)}
            </span>
          </div>
          <div
            className="matchOddBackLayBoxContainer backLayBoxWidth"
            // style={{ width: isLap ? "240px" : !isMobile ? "320px" : "" }}
          >
            <div className="matchOddBackBoxTab">
              <span className={`f-size16 matchOddBackTxt`}>Back</span>
            </div>
            <div className="matchOddLayBoxTab">
              <span className={`f-size16 matchOddBackTxt`}>Lay</span>
            </div>
            <div className="matchOddEmptyBox"></div>
          </div>
        </div>

        <div className="matchOddTeamTab">
          {/* {data?.activeStatus != "live" && (
            <div className="suspended-overlayRatesMatchOdd">
              <span
                className={`${
                  !isMobile ? "f-size18" : "f-size16"
                } suspendedTxtMatchOdd`}
              ></span>
            </div>
          )} */}
          <div className="matchOddTeam">
            <span
              className={`teamFont matchOddTeamTxt`}
            >
              {detail?.teamA?.length > 20
                          ? `${detail?.teamA?.slice(
                              0,
                              25
                            )}...`
                          : detail?.teamA}
            </span>
            <span
              className={`${
                detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.A
                ] > 0
                  ? "color-green"
                  : detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.A
                    ] < 0
                  ? "color-red"
                  : ""
              } ${isMobile?"fbold title-12":"fbold title-14"}`}
            >
              {detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.A
              ] ?? ""}
            </span>
          </div>
          <div
            className="matchOddRateBox rateBoxWidth"
            // style={{ width: isLap ? "360px" : !isMobile ? "480px" : "" }}
          >
            {(data?.activeStatus !== "live" || data?.runners?.[0]?.status !== "ACTIVE") && (
                <div className="suspended-overlayRatesMatchOdd">
                  <span
                    className={`suspendTextCmmn`}
                  >
                    SUSPENDED
                  </span>
                </div>
              )}
            <div
              className="matchOddBackBox back3Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[0]?.ex?.availableToBack?.[0]?.price,
                  "BACK",
                  detail?.teamA,
                  data?.runners?.[0]?.status,
                  data?.runners?.[0]?.ex?.availableToBack?.[0]?.tno,
                  data?.runners?.[0]
                )
              }
            >
              <span className={`rateFont matchOddRate1Box`}>
                {handlePrice(
                  data?.runners?.[0]?.ex?.availableToBack?.[0]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont matchOddRate2Box`}>
                {data?.runners?.[0]?.ex?.availableToBack?.[0]?.size}
              </span>
            </div>
            <div
              className="matchOddBackBox back2Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[0]?.ex?.availableToBack?.[1]?.price,
                  "BACK",
                  detail?.teamA,
                  data?.runners?.[0]?.status,
                  data?.runners?.[0]?.ex?.availableToBack?.[1]?.tno,
                  data?.runners?.[0]
                )
              }
            >
              <span className={`rateFont matchOddRate1Box`}>
                {handlePrice(
                  data?.runners?.[0]?.ex?.availableToBack?.[1]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont matchOddRate2Box`}>
                {data?.runners?.[0]?.ex?.availableToBack?.[1]?.size}
              </span>
            </div>
            <div
              className="matchOddBackBox back1Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[0]?.ex?.availableToBack?.[2]?.price,
                  "BACK",
                  detail?.teamA,
                  data?.runners?.[0]?.status,
                  data?.runners?.[0]?.ex?.availableToBack?.[2]?.tno,
                  data?.runners?.[0]
                )
              }
            >
              <span className={`rateFont matchOddRate1Box`}>
                {handlePrice(
                  data?.runners?.[0]?.ex?.availableToBack?.[2]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont matchOddRate2Box`}>
                {data?.runners?.[0]?.ex?.availableToBack?.[2]?.size}
              </span>
            </div>
            <div
              className="matchOddBackBox lay1Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[0]?.ex?.availableToLay?.[0]?.price,
                  "LAY",
                  detail?.teamA,
                  data?.runners?.[0]?.status,
                  data?.runners?.[0]?.ex?.availableToBack?.[0]?.tno,
                  data?.runners?.[0]
                )
              }
            >
              <span className={`rateFont matchOddRate1Box`}>
                {handlePrice(
                  data?.runners?.[0]?.ex?.availableToLay?.[0]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont matchOddRate2Box`}>
                {data?.runners?.[0]?.ex?.availableToLay?.[0]?.size}
              </span>
            </div>
            <div
              className="matchOddBackBox lay2Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[0]?.ex?.availableToLay?.[1]?.price,
                  "LAY",
                  detail?.teamA,
                  data?.runners?.[0]?.status,
                  data?.runners?.[0]?.ex?.availableToLay?.[1]?.tno,
                  data?.runners?.[0]
                )
              }
            >
              <span className={`rateFont matchOddRate1Box`}>
                {handlePrice(
                  data?.runners?.[0]?.ex?.availableToLay?.[1]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont matchOddRate2Box`}>
                {data?.runners?.[0]?.ex?.availableToLay?.[1]?.size}
              </span>
            </div>
            <div
              className="matchOddBackBox lay3Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[0]?.ex?.availableToLay?.[2]?.price,
                  "LAY",
                  detail?.teamA,
                  data?.runners?.[0]?.status,
                  data?.runners?.[0]?.ex?.availableToLay?.[2]?.tno,
                  data?.runners?.[0]
                )
              }
            >
              <span className={`rateFont matchOddRate1Box`}>
                {handlePrice(
                  data?.runners?.[0]?.ex?.availableToLay?.[2]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont matchOddRate2Box`}>
                {data?.runners?.[0]?.ex?.availableToLay?.[2]?.size}
              </span>
            </div>
          </div>
        </div>

        <div className="matchOddTeamTab">
          {/* {data?.activeStatus != "live" && (
            <div className="suspended-overlayRatesMatchOdd">
              <span
                className={`${
                  !isMobile ? "f-size18" : "f-size16"
                } suspendedTxtMatchOdd`}
              ></span>
            </div>
          )} */}
          <div className="matchOddTeam">
            <span
              className={`teamFont matchOddTeamTxt`}
            >
              {detail?.teamB?.length > 25
                          ? `${detail?.teamB?.slice(
                              0,
                              25
                            )}...`
                          : detail?.teamB}
            </span>
            <span
              className={`${
                detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.B
                ] > 0
                  ? "color-green"
                  : detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.B
                    ] < 0
                  ? "color-red"
                  : ""
              } ${isMobile?"fbold title-12":"fbold title-14"}`}
            >
              {detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.B
              ] ?? ""}
            </span>
          </div>
          <div
            className="matchOddRateBox rateBoxWidth"
            // style={{ width: isLap ? "360px" : !isMobile ? "480px" : "" }}
          >
            {(data?.activeStatus !== "live" || data?.runners?.[1]?.status !== "ACTIVE") && (
                <div className="suspended-overlayRatesMatchOdd">
                  <span
                    className={`suspendTextCmmn`}
                  >
                    SUSPENDED
                  </span>
                </div>
              )}
            <div
              className="matchOddBackBox back3Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[1]?.ex?.availableToBack?.[0]?.price,
                  "BACK",
                  detail?.teamB,
                  data?.runners?.[1]?.status,
                  data?.runners?.[1]?.ex?.availableToBack?.[0]?.tno,
                  data?.runners?.[1]
                )
              }
            >
              <span className={`rateFont matchOddRate1Box`}>
                {handlePrice(
                  data?.runners?.[1]?.ex?.availableToBack?.[0]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont matchOddRate2Box`}>
                {data?.runners?.[1]?.ex?.availableToBack?.[0]?.size}
              </span>
            </div>
            <div
              className="matchOddBackBox back2Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[1]?.ex?.availableToBack?.[1]?.price,
                  "BACK",
                  detail?.teamB,
                  data?.runners?.[1]?.status,
                  data?.runners?.[1]?.ex?.availableToBack?.[1]?.tno,
                  data?.runners?.[1]
                )
              }
            >
              <span className={`rateFont matchOddRate1Box`}>
                {handlePrice(
                  data?.runners?.[1]?.ex?.availableToBack?.[1]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont matchOddRate2Box`}>
                {data?.runners?.[1]?.ex?.availableToBack?.[1]?.size}
              </span>
            </div>
            <div
              className="matchOddBackBox back1Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[1]?.ex?.availableToBack?.[2]?.price,
                  "BACK",
                  detail?.teamB,
                  data?.runners?.[1]?.status,
                  data?.runners?.[1]?.ex?.availableToBack?.[2]?.tno,
                  data?.runners?.[1]
                )
              }
            >
              <span className={`rateFont matchOddRate1Box`}>
                {handlePrice(
                  data?.runners?.[1]?.ex?.availableToBack?.[2]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont matchOddRate2Box`}>
                {data?.runners?.[1]?.ex?.availableToBack?.[2]?.size}
              </span>
            </div>
            <div
              className="matchOddBackBox lay1Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[1]?.ex?.availableToLay?.[0]?.price,
                  "LAY",
                  detail?.teamB,
                  data?.runners?.[1]?.status,
                  data?.runners?.[1]?.ex?.availableToLay?.[0]?.tno,
                  data?.runners?.[1]
                )
              }
            >
              <span className={`rateFont matchOddRate1Box`}>
                {handlePrice(
                  data?.runners?.[1]?.ex?.availableToLay?.[0]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont matchOddRate2Box`}>
                {data?.runners?.[1]?.ex?.availableToLay?.[0]?.size}
              </span>
            </div>
            <div
              className="matchOddBackBox lay2Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[1]?.ex?.availableToLay?.[1]?.price,
                  "LAY",
                  detail?.teamB,
                  data?.runners?.[1]?.status,
                  data?.runners?.[1]?.ex?.availableToLay?.[1]?.tno,
                  data?.runners?.[1]
                )
              }
            >
              <span className={`rateFont matchOddRate1Box`}>
                {handlePrice(
                  data?.runners?.[1]?.ex?.availableToLay?.[1]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont matchOddRate2Box`}>
                {data?.runners?.[1]?.ex?.availableToLay?.[1]?.size}
              </span>
            </div>
            <div
              className="matchOddBackBox lay3Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[1]?.ex?.availableToLay?.[2]?.price,
                  "LAY",
                  detail?.teamB,
                  data?.runners?.[1]?.status,
                  data?.runners?.[1]?.ex?.availableToLay?.[2]?.tno,
                  data?.runners?.[1]
                )
              }
            >
              <span className={`rateFont matchOddRate1Box`}>
                {handlePrice(
                  data?.runners?.[1]?.ex?.availableToLay?.[2]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont matchOddRate2Box`}>
                {data?.runners?.[1]?.ex?.availableToLay?.[2]?.size}
              </span>
            </div>
          </div>
        </div>

        {detail?.teamC && (
          <div className="matchOddTeamTab">
            {/* {data?.activeStatus != "live" && (
              <div className="suspended-overlayRatesMatchOdd">
                <span
                  className={`${
                    !isMobile ? "f-size18" : "f-size16"
                  } suspendedTxtMatchOdd`}
                ></span>
              </div>
            )} */}
            <div className="matchOddTeam">
              <span
                className={`teamFont matchOddTeamTxt`}
              >
               {detail?.teamC?.length > 25
                          ? `${detail?.teamC?.slice(
                              0,
                              25
                            )}...`
                          : detail?.teamC}
              </span>
              <span
                className={`${
                  detail?.profitLossDataMatch?.[
                    profitLossDataForMatchConstants[data?.type]?.C
                  ] > 0
                    ? "color-green"
                    : detail?.profitLossDataMatch?.[
                        profitLossDataForMatchConstants[data?.type]?.C
                      ] < 0
                    ? "color-red"
                    : ""
                } ${isMobile?"fbold title-12":"fbold title-14"}`}
              >
                {detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.C
                ] ?? ""}
              </span>
            </div>
            <div
              className="matchOddRateBox rateBoxWidth"
              // style={{ width: isLap ? "360px" : !isMobile ? "480px" : "" }}
            >
              {(data?.activeStatus !== "live" || data?.runners?.[2]?.status !== "ACTIVE") && (
                  <div className="suspended-overlayRatesMatchOdd">
                    <span
                      className={`suspendTextCmmn`}
                    >
                      SUSPENDED
                    </span>
                  </div>
                )}
              <div
                className="matchOddBackBox back3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[2]?.ex?.availableToBack?.[0]?.price,
                    "BACK",
                    detail?.teamC,
                    data?.runners?.[2]?.status,
                    data?.runners?.[2]?.ex?.availableToBack?.[0]?.tno,
                    data?.runners?.[2]
                  )
                }
              >
                <span className={`rateFont matchOddRate1Box`}>
                  {handlePrice(
                    data?.runners?.[2]?.ex?.availableToBack?.[0]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont matchOddRate2Box`}>
                  {data?.runners?.[2]?.ex?.availableToBack?.[0]?.size}
                </span>
              </div>
              <div
                className="matchOddBackBox back2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[2]?.ex?.availableToBack?.[1]?.price,
                    "BACK",
                    detail?.teamC,
                    data?.runners?.[2]?.status,
                    data?.runners?.[2]?.ex?.availableToBack?.[1]?.tno,
                    data?.runners?.[2]
                  )
                }
              >
                <span className={`rateFont matchOddRate1Box`}>
                  {handlePrice(
                    data?.runners?.[2]?.ex?.availableToBack?.[1]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont matchOddRate2Box`}>
                  {data?.runners?.[2]?.ex?.availableToBack?.[1]?.size}
                </span>
              </div>
              <div
                className="matchOddBackBox back1Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[2]?.ex?.availableToBack?.[2]?.price,
                    "BACK",
                    detail?.teamC,
                    data?.runners?.[2]?.status,
                    data?.runners?.[2]?.ex?.availableToBack?.[2]?.tno,
                    data?.runners?.[2]
                  )
                }
              >
                <span className={`rateFont matchOddRate1Box`}>
                  {handlePrice(
                    data?.runners?.[2]?.ex?.availableToBack?.[2]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont matchOddRate2Box`}>
                  {data?.runners?.[2]?.ex?.availableToBack?.[2]?.size}
                </span>
              </div>
              <div
                className="matchOddBackBox lay1Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[2]?.ex?.availableToLay?.[0]?.price,
                    "LAY",
                    detail?.teamC,
                    data?.runners?.[2]?.status,
                    data?.runners?.[2]?.ex?.availableToLay?.[0]?.tno,
                    data?.runners?.[2]
                  )
                }
              >
                <span className={`rateFont matchOddRate1Box`}>
                  {handlePrice(
                    data?.runners?.[2]?.ex?.availableToLay?.[0]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont matchOddRate2Box`}>
                  {data?.runners?.[2]?.ex?.availableToLay?.[0]?.size}
                </span>
              </div>
              <div
                className="matchOddBackBox lay2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[2]?.ex?.availableToLay?.[1]?.price,
                    "LAY",
                    detail?.teamC,
                    data?.runners?.[2]?.status,
                    data?.runners?.[2]?.ex?.availableToLay?.[1]?.tno,
                    data?.runners?.[2]
                  )
                }
              >
                <span className={`rateFont matchOddRate1Box`}>
                  {handlePrice(
                    data?.runners?.[2]?.ex?.availableToLay?.[1]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont matchOddRate2Box`}>
                  {data?.runners?.[2]?.ex?.availableToLay?.[1]?.size}
                </span>
              </div>
              <div
                className="matchOddBackBox lay3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[2]?.ex?.availableToLay?.[2]?.price,
                    "LAY",
                    detail?.teamC,
                    data?.runners?.[2]?.status,
                    data?.runners?.[2]?.ex?.availableToLay?.[2]?.tno,
                    data?.runners?.[2]
                  )
                }
              >
                <span className={`rateFont matchOddRate1Box`}>
                  {handlePrice(
                    data?.runners?.[2]?.ex?.availableToLay?.[2]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont matchOddRate2Box`}>
                  {data?.runners?.[2]?.ex?.availableToLay?.[2]?.size}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default MatchOdd;
