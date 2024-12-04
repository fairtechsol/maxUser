import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { AppDispatch, RootState } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/constants";
import { dummyArray, formatNumber, manualProfitLoss } from "../../../helpers";
import BetBox from "../betBox";
import { useSelector } from "react-redux";
import { IoInformationCircle } from "react-icons/io5";
import {OverlayTrigger, Tooltip } from "react-bootstrap";

const Bookmaker = ({ title, box, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const startAtTime = new Date(detail.startAt); 
  const hideTime = new Date(startAtTime.getTime() - 30 * 60 * 1000); 
  const shouldShowInfoIcon = new Date() < hideTime;
  const tooltip = <Tooltip id="tooltip">{`Max adv exposure limit 10L.`}</Tooltip>;
  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    index: any,
    runner: any
  ) => {
    if (
      data?.activeStatus != "live" ||
      (status != "ACTIVE" && status != "OPEN")
    ) {
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
      gameType: detail?.matchType === "cricket" ? "cricket" : "other",
      min:data?.minBet ,
      max:data?.maxBet ,
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
          { shouldShowInfoIcon && <OverlayTrigger placement="top" overlay={tooltip}><div><IoInformationCircle size={20}/></div></OverlayTrigger>}
        </div>

        <div className="bookmakerBackLayTab">
          <div className="bookmakerMinMaxBox">
            <span className="bookmakerMinMax">
              {data?.minBet === data?.maxBet
                ? `Max:${formatNumber(data?.maxBet)}`
                : `Min:${formatNumber(data?.minBet)} Max:${formatNumber(
                    data?.maxBet
                  )}`}
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
            style={isMobile && box === 6 ? { width: "28%" } : {}}
            // style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont bookmakerTeamTxt`}>
              {(data?.runners?.[0]?.nat || detail?.teamA)?.length > 25
                ? `${(data?.runners?.[0]?.nat || detail?.teamA)?.slice(
                    0,
                    25
                  )}...`
                : data?.runners?.[0]?.nat || detail?.teamA}
            </span>
            <div className="d-flex flex-row justify-content-between w-100">
              <span
                className={`${
                  parseFloat(
                    detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.A +
                        "_" +
                        detail?.id
                    ]
                  ) +
                    manualProfitLoss(
                      selectedBet,
                      detail?.teamA,
                      data?.type,
                      data?.gtype
                    ) >
                  0
                    ? "color-green"
                    : "color-red"
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
                    : parseFloat(
                        detail?.profitLossDataMatch?.[
                          profitLossDataForMatchConstants[data?.type]?.A +
                            "_" +
                            detail?.id
                        ]
                      ) +
                      manualProfitLoss(
                        selectedBet,
                        detail?.teamA,
                        data?.type,
                        data?.gtype
                      )
                  : ""}
              </span>
              <span
                className="title-12 f-400"
                style={{
                  color:
                    manualProfitLoss(
                      selectedBet,
                      detail?.teamA,
                      data?.type,
                      data?.gtype
                    ) > 0
                      ? "#086f3f"
                      : "#bd1828",
                }}
              >
                {manualProfitLoss(
                  selectedBet,
                  detail?.teamA,
                  data?.type,
                  data?.gtype
                ) === 0
                  ? ""
                  : manualProfitLoss(
                      selectedBet,
                      detail?.teamA,
                      data?.type,
                      data?.gtype
                    )?.toFixed(2)}
              </span>
            </div>
          </div>
          <div
            className={
              box === 6
                ? "bookmaker1RateBox rateBoxWidth"
                : "bookmaker2RateBox rateBoxWidth2"
            }
          >
            {(data?.runners?.[0]?.status !== "OPEN" &&
              data?.runners?.[0]?.status !== "ACTIVE" &&
              data?.runners?.[0]?.status !== "") && (
              <div className="suspended-overlayRatesBookmaker">
                <span
                  className={`suspendTextCmmn`}
                  style={{ textTransform: "uppercase" }}
                >
                  {data?.runners?.[0]?.status}
                </span>
              </div>
            )}
            {box === 6 ? (
              <>
                {(data?.runners?.[0]?.ex?.availableToBack?.length > 0
                  ? data?.runners?.[0]?.ex?.availableToBack
                  : dummyArray
                )?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"back"}
                      detail={detail?.teamA}
                      runner={data?.runners?.[0]}
                      handlePlaceBet={handlePlaceBet}
                    />
                  );
                })}
                {(data?.runners?.[0]?.ex?.availableToLay?.length > 0
                  ? data?.runners?.[0]?.ex?.availableToLay
                  : dummyArray
                )?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"lay"}
                      detail={detail?.teamA}
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
                  detail={detail?.teamA}
                  runner={data?.runners?.[0]}
                  handlePlaceBet={handlePlaceBet}
                />

                <BetBox
                  data={data?.runners?.[0]?.ex?.availableToLay?.[0]}
                  type={"lay"}
                  detail={detail?.teamA}
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
            style={isMobile && box === 6 ? { width: "28%" } : {}}
            // style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont bookmakerTeamTxt`}>
              {(data?.runners?.[1]?.nat || detail?.teamB)?.length > 25
                ? `${(data?.runners?.[1]?.nat || detail?.teamB)?.slice(
                    0,
                    25
                  )}...`
                : data?.runners?.[1]?.nat || detail?.teamB}
            </span>
            <div className="d-flex flex-row justify-content-between w-100">
              <span
                className={`${
                  parseFloat(
                    detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.B +
                        "_" +
                        detail?.id
                    ]
                  ) +
                    manualProfitLoss(
                      selectedBet,
                      detail?.teamB,
                      data?.type,
                      data?.gtype
                    ) >
                  0
                    ? "color-green"
                    : "color-red"
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
                    : parseFloat(
                        detail?.profitLossDataMatch?.[
                          profitLossDataForMatchConstants[data?.type]?.B +
                            "_" +
                            detail?.id
                        ]
                      ) +
                      manualProfitLoss(
                        selectedBet,
                        detail?.teamB,
                        data?.type,
                        data?.gtype
                      )
                  : ""}
              </span>
              <span
                className="title-12 f-400"
                style={{
                  color:
                    manualProfitLoss(
                      selectedBet,
                      detail?.teamB,
                      data?.type,
                      data?.gtype
                    ) > 0
                      ? "#086f3f"
                      : "#bd1828",
                }}
              >
                {manualProfitLoss(
                  selectedBet,
                  detail?.teamB,
                  data?.type,
                  data?.gtype
                ) === 0
                  ? ""
                  : manualProfitLoss(
                      selectedBet,
                      detail?.teamB,
                      data?.type,
                      data?.gtype
                    )?.toFixed(2)}
              </span>
            </div>
          </div>
          <div
            className={
              box === 6
                ? "bookmaker1RateBox rateBoxWidth"
                : "bookmaker2RateBox rateBoxWidth2"
            }
          >
            {(data?.runners?.[1]?.status !== "OPEN" &&
              data?.runners?.[1]?.status !== "ACTIVE" &&
              data?.runners?.[1]?.status !== "") && (
              <div className="suspended-overlayRatesBookmaker">
                <span
                  className={`suspendTextCmmn`}
                  style={{ textTransform: "uppercase" }}
                >
                  {data?.runners?.[1]?.status}
                </span>
              </div>
            )}
            {box === 6 ? (
              <>
                {(data?.runners?.[1]?.ex?.availableToBack?.length > 0
                  ? data?.runners?.[1]?.ex?.availableToBack
                  : dummyArray
                )?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"back"}
                      detail={detail?.teamB}
                      runner={data?.runners?.[1]}
                      handlePlaceBet={handlePlaceBet}
                    />
                  );
                })}
                {(data?.runners?.[1]?.ex?.availableToLay?.length > 0
                  ? data?.runners?.[1]?.ex?.availableToLay
                  : dummyArray
                )?.map((item: any) => {
                  return (
                    <BetBox
                      data={item}
                      type={"lay"}
                      detail={detail?.teamB}
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
                  detail={detail?.teamB}
                  runner={data?.runners?.[1]}
                  handlePlaceBet={handlePlaceBet}
                />

                <BetBox
                  data={data?.runners?.[1]?.ex?.availableToLay?.[0]}
                  type={"lay"}
                  detail={detail?.teamB}
                  runner={data?.runners?.[1]}
                  handlePlaceBet={handlePlaceBet}
                />
              </>
            )}
          </div>
        </div>

        {(data?.runners?.[2]?.nat || detail?.teamC) && (
          <div className="bookmakerTeamTab">
            <div
              className="bookmakerTeam"
              style={isMobile && box === 6 ? { width: "28%" } : {}}
              // style={box === 6 ? { width: "28%" } : {}}
            >
              <span className={`teamFont bookmakerTeamTxt`}>
                {(data?.runners?.[2]?.nat || detail?.teamC)?.length > 25
                  ? `${(data?.runners?.[2]?.nat || detail?.teamC)?.slice(
                      0,
                      25
                    )}...`
                  : data?.runners?.[2]?.nat || detail?.teamC}
              </span>{" "}
              <div className="d-flex flex-row justify-content-between w-100">
                <span
                  className={`${
                    parseFloat(
                      detail?.profitLossDataMatch?.[
                        profitLossDataForMatchConstants[data?.type]?.C +
                          "_" +
                          detail?.id
                      ]
                    ) +
                      manualProfitLoss(
                        selectedBet,
                        detail?.teamC,
                        data?.type,
                        data?.gtype
                      ) >
                    0
                      ? "color-green"
                      : "color-red"
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
                      : parseFloat(
                          detail?.profitLossDataMatch?.[
                            profitLossDataForMatchConstants[data?.type]?.C +
                              "_" +
                              detail?.id
                          ]
                        ) +
                        manualProfitLoss(
                          selectedBet,
                          detail?.teamC,
                          data?.type,
                          data?.gtype
                        )
                    : ""}
                </span>
                <span
                  className="title-12 f-400"
                  style={{
                    color:
                      manualProfitLoss(
                        selectedBet,
                        detail?.teamC,
                        data?.type,
                        data?.gtype
                      ) > 0
                        ? "#086f3f"
                        : "#bd1828",
                  }}
                >
                  {manualProfitLoss(
                    selectedBet,
                    detail?.teamC,
                    data?.type,
                    data?.gtype
                  ) === 0
                    ? ""
                    : manualProfitLoss(
                        selectedBet,
                        detail?.teamC,
                        data?.type,
                        data?.gtype
                      )?.toFixed(2)}
                </span>
              </div>
            </div>
            <div
              className={
                box === 6
                  ? "bookmaker1RateBox rateBoxWidth"
                  : "bookmaker2RateBox rateBoxWidth2"
              }
            >
              {(data?.runners?.[2]?.status !== "OPEN" &&
              data?.runners?.[2]?.status !== "ACTIVE" &&
              data?.runners?.[2]?.status !== "") && (
                <div className="suspended-overlayRatesBookmaker">
                  <span
                    className={`suspendTextCmmn`}
                    style={{ textTransform: "uppercase" }}
                  >
                    {data?.runners?.[2]?.status}
                  </span>
                </div>
              )}
              {box === 6 ? (
                <> 
                  {(data?.runners?.[2]?.ex?.availableToBack?.length > 0
                    ? data?.runners?.[2]?.ex?.availableToBack
                    : dummyArray
                  )?.map((item: any) => {
                    return (
                      <BetBox
                        data={item}
                        type={"back"}
                        detail={detail?.teamC}
                        runner={data?.runners?.[2]}
                        handlePlaceBet={handlePlaceBet}
                      />
                    );
                  })}
                  {(data?.runners?.[2]?.ex?.availableToLay?.length > 0
                    ? data?.runners?.[2]?.ex?.availableToLay
                    : dummyArray
                  )?.map((item: any) => {
                    return (
                      <BetBox
                        data={item}
                        type={"lay"}
                        detail={detail?.teamC}
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
                    detail={detail?.teamC}
                    runner={data?.runners?.[2]}
                    handlePlaceBet={handlePlaceBet}
                  />

                  <BetBox
                    data={data?.runners?.[2]?.ex?.availableToLay?.[0]}
                    type={"lay"}
                    detail={detail?.teamC}
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
