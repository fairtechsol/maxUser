import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { AppDispatch } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/constants";
import { dummyArray, formatNumber } from "../../../helpers";
import BetBox from "../betBox";

const Bookmaker = ({ title, box, data, detail }) => {
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

  return (
    <>
      <div className="bookmakerContainer">
        <div className="bookmakerTitle">
          <span
            className={`bookmakerTitleTxt ${
              isMobile ? "f-size13" : "f-size15"
            }`}
          >
            {title}
          </span>
        </div>

        <div className="bookmakerBackLayTab">
          <div className="bookmakerMinMaxBox">
            <span className="bookmakerMinMax">
              Min:{formatNumber(data?.minBet)} Max:{formatNumber(data?.maxBet)}
            </span>
          </div>
          <div
            className={
              box === 6
                ? "bookmaker1BackLayBoxContainer backLayBoxWidth"
                : "bookmaker2BackLayBoxContainer backLayBoxWidth2"
            }
          >
            <div
              className={
                box === 6 ? "bookmaker1BackBoxTab" : "bookmaker2BackBoxTab"
              }
            >
              <span className={`f-size16 bookmakerBackTxt`}>Back</span>
            </div>
            <div
              className={
                box === 6 ? "bookmaker1LayBoxTab" : "bookmaker2LayBoxTab"
              }
            >
              <span className={`f-size16 bookmakerBackTxt`}>Lay</span>
            </div>
            {box === 6 && <div className="bookmakerEmptyBox"></div>}
          </div>
        </div>

        <div className="bookmakerTeamTab">
          <div
            className="bookmakerTeam"
            style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont bookmakerTeamTxt`}>
              {detail?.teamA?.length > 25
                ? `${detail?.teamA?.slice(0, 25)}...`
                : detail?.teamA}
            </span>
            <span
              className={`${
                detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.A +
                    "_" +
                    detail?.id
                ] > 0
                  ? "color-green"
                  : detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.A +
                        "_" +
                        detail?.id
                    ] < 0
                  ? "color-red"
                  : ""
              } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
            >
              {detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.A +
                  "_" +
                  detail?.id
              ]
                ? detail?.profitLossDataMatch?.[
                    profitLossDataForMatchConstants[data?.type]?.A +
                      "_" +
                      detail?.id
                  ] === "0"
                  ? ""
                  : detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.A +
                        "_" +
                        detail?.id
                    ]
                : ""}
            </span>
          </div>
          <div
            className={
              box === 6
                ? "bookmaker1RateBox rateBoxWidth"
                : "bookmaker2RateBox rateBoxWidth2"
            }
          >
            {(data?.activeStatus !== "live" ||
              data?.runners?.[0]?.status !== "ACTIVE") && (
              <div className="suspended-overlayRatesBookmaker">
                <span className={`suspendTextCmmn`}>SUSPENDED</span>
              </div>
            )}
            {box === 6 ? (
              <>
                {(data?.runners?.[0]?.ex?.availableToBack?.length>0?data?.runners?.[0]?.ex?.availableToBack:dummyArray)?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"back"}
                      detail={detail}
                      runner={data?.runners?.[0]}
                      handlePlaceBet={handlePlaceBet}
                    />
                  );
                })}
                {(data?.runners?.[0]?.ex?.availableToLay?.length>0?data?.runners?.[0]?.ex?.availableToLay:dummyArray)?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"lay"}
                      detail={detail}
                      runner={data?.runners?.[0]}
                      handlePlaceBet={handlePlaceBet}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <BetBox
                  data={data?.runners?.[0]?.ex?.availableToBack?.[0]}
                  type={"back"}
                  detail={detail}
                  runner={data?.runners?.[0]}
                  handlePlaceBet={handlePlaceBet}
                />

                <BetBox
                  data={data?.runners?.[0]?.ex?.availableToLay?.[0]}
                  type={"lay"}
                  detail={detail}
                  runner={data?.runners?.[0]}
                  handlePlaceBet={handlePlaceBet}
                />
              </>
            )}
          </div>
        </div>

        <div className="bookmakerTeamTab">
          <div
            className="bookmakerTeam"
            style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont bookmakerTeamTxt`}>
              {detail?.teamB?.length > 25
                ? `${detail?.teamB?.slice(0, 25)}...`
                : detail?.teamB}
            </span>
            <span
              className={`${
                detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.B +
                    "_" +
                    detail?.id
                ] > 0
                  ? "color-green"
                  : detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.B +
                        "_" +
                        detail?.id
                    ] < 0
                  ? "color-red"
                  : ""
              } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
            >
              {detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.B +
                  "_" +
                  detail?.id
              ]
                ? detail?.profitLossDataMatch?.[
                    profitLossDataForMatchConstants[data?.type]?.B +
                      "_" +
                      detail?.id
                  ] === "0"
                  ? ""
                  : detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.B +
                        "_" +
                        detail?.id
                    ]
                : ""}
            </span>
          </div>
          <div
            className={
              box === 6
                ? "bookmaker1RateBox rateBoxWidth"
                : "bookmaker2RateBox rateBoxWidth2"
            }
          >
            {(data?.activeStatus !== "live" ||
              data?.runners?.[1]?.status !== "ACTIVE") && (
              <div className="suspended-overlayRatesBookmaker">
                <span className={`suspendTextCmmn`}>SUSPENDED</span>
              </div>
            )}
              {box === 6 ? (
              <>
                {(data?.runners?.[1]?.ex?.availableToBack?.length>0?data?.runners?.[1]?.ex?.availableToBack:dummyArray)?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"back"}
                      detail={detail}
                      runner={data?.runners?.[1]}
                      handlePlaceBet={handlePlaceBet}
                    />
                  );
                })}
                {(data?.runners?.[1]?.ex?.availableToLay?.length>0?data?.runners?.[1]?.ex?.availableToLay:dummyArray)?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"lay"}
                      detail={detail}
                      runner={data?.runners?.[1]}
                      handlePlaceBet={handlePlaceBet}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <BetBox
                  data={data?.runners?.[1]?.ex?.availableToBack?.[0]}
                  type={"back"}
                  detail={detail}
                  runner={data?.runners?.[1]}
                  handlePlaceBet={handlePlaceBet}
                />

                <BetBox
                  data={data?.runners?.[1]?.ex?.availableToLay?.[0]}
                  type={"lay"}
                  detail={detail}
                  runner={data?.runners?.[1]}
                  handlePlaceBet={handlePlaceBet}
                />
              </>
            )}
          </div>
        </div>

        {detail?.teamC && (
          <div className="bookmakerTeamTab">
            <div
              className="bookmakerTeam"
              style={box === 6 ? { width: "28%" } : {}}
            >
              <span className={`teamFont bookmakerTeamTxt`}>
                {detail?.teamC?.length > 25
                  ? `${detail?.teamC?.slice(0, 25)}...`
                  : detail?.teamC}
              </span>{" "}
              <span
                className={`${
                  detail?.profitLossDataMatch?.[
                    profitLossDataForMatchConstants[data?.type]?.C +
                      "_" +
                      detail?.id
                  ] > 0
                    ? "color-green"
                    : detail?.profitLossDataMatch?.[
                        profitLossDataForMatchConstants[data?.type]?.C +
                          "_" +
                          detail?.id
                      ] < 0
                    ? "color-red"
                    : ""
                } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
              >
                {detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.C +
                    "_" +
                    detail?.id
                ]
                  ? detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.C +
                        "_" +
                        detail?.id
                    ] === "0"
                    ? ""
                    : detail?.profitLossDataMatch?.[
                        profitLossDataForMatchConstants[data?.type]?.C +
                          "_" +
                          detail?.id
                      ]
                  : ""}
              </span>
            </div>
            <div
              className={
                box === 6
                  ? "bookmaker1RateBox rateBoxWidth"
                  : "bookmaker2RateBox rateBoxWidth2"
              }
            >
              {(data?.activeStatus !== "live" ||
                data?.runners?.[2]?.status !== "ACTIVE") && (
                <div className="suspended-overlayRatesBookmaker">
                  <span className={`suspendTextCmmn`}>SUSPENDED</span>
                </div>
              )}
              {box === 6 ? (
              <>
                {(data?.runners?.[2]?.ex?.availableToBack?.length>0?data?.runners?.[2]?.ex?.availableToBack:dummyArray)?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"back"}
                      detail={detail}
                      runner={data?.runners?.[2]}
                      handlePlaceBet={handlePlaceBet}
                    />
                  );
                })}
                {(data?.runners?.[2]?.ex?.availableToLay?.length>0?data?.runners?.[2]?.ex?.availableToLay:dummyArray)?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"lay"}
                      detail={detail}
                      runner={data?.runners?.[2]}
                      handlePlaceBet={handlePlaceBet}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <BetBox
                  data={data?.runners?.[2]?.ex?.availableToBack?.[0]}
                  type={"back"}
                  detail={detail}
                  runner={data?.runners?.[2]}
                  handlePlaceBet={handlePlaceBet}
                />

                <BetBox
                  data={data?.runners?.[2]?.ex?.availableToLay?.[0]}
                  type={"lay"}
                  detail={detail}
                  runner={data?.runners?.[2]}
                  handlePlaceBet={handlePlaceBet}
                />
              </>
            )}
            </div>
          </div>
        )}
        {data?.rem && (
          <div className="bookmakerRemarkTab">
            <div className="remark-content">{data?.rem}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default Bookmaker;
