import { useDispatch, useSelector } from "react-redux";
import { dummyArray, formatNumber, manualProfitLoss } from "../../../helpers";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/constants";
import { isMobile } from "../../../utils/screenDimension";
import BetBox from "../betBox";
import "./style.scss";

const OtherMarket = ({ title, box, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
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
      teamA:
        data?.type === "other"
          ? data?.runners?.[0]?.nat || data?.metaData?.teamA
          : "yes",
      teamB:
        data?.type === "other"
          ? data?.runners?.[1]?.nat || data?.metaData?.teamB
          : "no",
      teamC: data?.runners?.[2]?.nat || data?.metaData?.teamC,
      betId: data?.id,
      eventType: detail?.matchType,
      matchId: detail?.id,
      matchBetType: data?.type,
      placeIndex: index,
      mid: data?.mid?.toString(),
      selectionId: runner?.selectionId?.toString(),
      min: data?.minBet,
      max: data?.maxBet,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const profitLossTeamA = [
    "tiedMatch1",
    "tiedMatch2",
    "tiedMatch3",
    "completeMatch",
    "completeMatch1",
  ].includes(data?.type)
    ? detail?.profitLossDataMatch?.[
    profitLossDataForMatchConstants?.[data?.type]?.A + "_" + detail?.id
    ]
    : detail?.profitLossDataMatch?.[
    profitLossDataForMatchConstants?.[data?.type]?.A +
    "_" +
    data?.id +
    "_" +
    detail?.id
    ];
  const profitLossTeamB = [
    "tiedMatch1",
    "tiedMatch2",
    "tiedMatch3",
    "completeMatch",
    "completeMatch1",
  ].includes(data?.type)
    ? detail?.profitLossDataMatch?.[
    profitLossDataForMatchConstants?.[data?.type]?.B + "_" + detail?.id
    ]
    : detail?.profitLossDataMatch?.[
    profitLossDataForMatchConstants?.[data?.type]?.B +
    "_" +
    data?.id +
    "_" +
    detail?.id
    ];
  const profitLossTeamC = [
    "tiedMatch1",
    "tiedMatch2",
    "tiedMatch3",
    "completeMatch",
    "completeMatch1",
  ].includes(data?.type)
    ? ""
    : detail?.profitLossDataMatch?.[
    profitLossDataForMatchConstants?.[data?.type]?.C +
    "_" +
    data?.id +
    "_" +
    detail?.id
    ];
  return (
    <>
      <div className="otherMarketContainer">
        <div className="otherMarketTitle">
          <span
            className={`otherMarketTitleTxt ${isMobile ? "f-size13" : "f-size15"
              }`}
          >
            {title}
          </span>
          {/* { shouldShowInfoIcon && <OverlayTrigger placement="top" overlay={tooltip}><div className="px-2"><IoInformationCircle size={20}/></div></OverlayTrigger>} */}
        </div>

        <div className="otherMarketBackLayTab">
          <div className="otherMarketMinMaxBox">
            <span className="otherMarketMinMax">
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
                ? "otherMarket1BackLayBoxContainer backLayBoxWidth"
                : "otherMarket2BackLayBoxContainer backLayBoxWidth2"
            }
          >
            <div
              className={
                box === 6 ? "otherMarket1BackBoxTab" : "otherMarket2BackBoxTab"
              }
            >
              <span className={`f-size16 otherMarketBackTxt`}>Back</span>
            </div>
            <div
              className={
                box === 6 ? "otherMarket1LayBoxTab" : "otherMarket2LayBoxTab"
              }
            >
              <span className={`f-size16 otherMarketBackTxt`}>Lay</span>
            </div>
            {box === 6 && <div className="otherMarketEmptyBox"></div>}
          </div>
        </div>

        <div className="otherMarketTeamTab">
          <div
            className="otherMarketTeam"
            style={isMobile && box === 6 ? { width: "28%" } : {}}
          // style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont otherMarketTeamTxt`}>
              {data?.type === "other"
                ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                : "Yes"}
            </span>
            <div className="d-flex flex-row justify-content-between w-100">
              <span
                className={`${parseFloat(profitLossTeamA) +
                    manualProfitLoss(
                      selectedBet,
                      data?.type === "other"
                        ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                        : "Yes",
                      data?.type,
                      data?.gtype
                    ) >
                    0
                    ? "color-green"
                    : "color-red"
                  } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
              >
                {parseFloat(profitLossTeamA) +
                  manualProfitLoss(
                    selectedBet,
                    data?.type === "other"
                      ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                      : "Yes",
                    data?.type,
                    data?.gtype
                  )
                  ? parseFloat(profitLossTeamA) +
                  manualProfitLoss(
                    selectedBet,
                    data?.type === "other"
                      ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                      : "Yes",
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
                      data?.type === "other"
                        ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                        : "Yes",
                      data?.type,
                      data?.gtype
                    ) > 0
                      ? "#086f3f"
                      : "#bd1828",
                }}
              >
                {manualProfitLoss(
                  selectedBet,
                  data?.type === "other"
                    ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                    : "Yes",
                  data?.type,
                  data?.gtype
                ) === 0
                  ? ""
                  : manualProfitLoss(
                    selectedBet,
                    data?.type === "other"
                      ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                      : "Yes",
                    data?.type,
                    data?.gtype
                  )?.toFixed(2)}
              </span>
            </div>
          </div>
          <div
            className={
              box === 6
                ? "otherMarket1RateBox rateBoxWidth"
                : "otherMarket2RateBox rateBoxWidth2"
            }
          >
            {(data?.runners?.[0]?.status !== "OPEN" &&
              data?.runners?.[0]?.status !== "ACTIVE" &&
              data?.runners?.[0]?.status !== "") && (
                <div className="suspended-overlayRatesotherMarket">
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
                      detail={
                        data?.type === "other"
                          ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                          : "Yes"
                      }
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
                      detail={
                        data?.type === "other"
                          ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                          : "Yes"
                      }
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
                  detail={
                    data?.type === "other"
                      ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                      : "Yes"
                  }
                  runner={data?.runners?.[0]}
                  handlePlaceBet={handlePlaceBet}
                />

                <BetBox
                  data={data?.runners?.[0]?.ex?.availableToLay?.[0]}
                  type={"lay"}
                  detail={
                    data?.type === "other"
                      ? data?.runners?.[0]?.nat || data?.metaData?.teamA
                      : "Yes"
                  }
                  runner={data?.runners?.[0]}
                  handlePlaceBet={handlePlaceBet}
                />
              </>
            )}
          </div>
        </div>

        <div className="otherMarketTeamTab">
          <div
            className="otherMarketTeam"
            style={isMobile && box === 6 ? { width: "28%" } : {}}
          // style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont otherMarketTeamTxt`}>
              {data?.type === "other"
                ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                : "No"}
            </span>
            <div className="d-flex flex-row justify-content-between w-100">
              <span
                className={`${parseFloat(profitLossTeamB) +
                    manualProfitLoss(
                      selectedBet,
                      data?.type === "other"
                        ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                        : "No",
                      data?.type,
                      data?.gtype
                    ) >
                    0
                    ? "color-green"
                    : "color-red"
                  } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
              >
                {parseFloat(profitLossTeamB) +
                  manualProfitLoss(
                    selectedBet,
                    data?.type === "other"
                      ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                      : "No",
                    data?.type,
                    data?.gtype
                  )
                  ? parseFloat(profitLossTeamB) +
                  manualProfitLoss(
                    selectedBet,
                    data?.type === "other"
                      ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                      : "No",
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
                      data?.type === "other"
                        ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                        : "No",
                      data?.type,
                      data?.gtype
                    ) > 0
                      ? "#086f3f"
                      : "#bd1828",
                }}
              >
                {manualProfitLoss(
                  selectedBet,
                  data?.type === "other"
                    ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                    : "No",
                  data?.type,
                  data?.gtype
                ) === 0
                  ? ""
                  : manualProfitLoss(
                    selectedBet,
                    data?.type === "other"
                      ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                      : "No",
                    data?.type,
                    data?.gtype
                  )?.toFixed(2)}
              </span>
            </div>
          </div>
          <div
            className={
              box === 6
                ? "otherMarket1RateBox rateBoxWidth"
                : "otherMarket2RateBox rateBoxWidth2"
            }
          >
            {(data?.runners?.[1]?.status !== "OPEN" &&
              data?.runners?.[1]?.status !== "ACTIVE" &&
              data?.runners?.[1]?.status !== "") && (
                <div className="suspended-overlayRatesotherMarket">
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
                      detail={
                        data?.type === "other"
                          ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                          : "No"
                      }
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
                      detail={
                        data?.type === "other"
                          ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                          : "No"
                      }
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
                  detail={
                    data?.type === "other"
                      ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                      : "No"
                  }
                  runner={data?.runners?.[1]}
                  handlePlaceBet={handlePlaceBet}
                />

                <BetBox
                  data={data?.runners?.[1]?.ex?.availableToLay?.[0]}
                  type={"lay"}
                  detail={
                    data?.type === "other"
                      ? data?.runners?.[1]?.nat || data?.metaData?.teamB
                      : "No"
                  }
                  runner={data?.runners?.[1]}
                  handlePlaceBet={handlePlaceBet}
                />
              </>
            )}
          </div>
        </div>

        {(data?.runners?.[2]?.nat || data?.metaData?.teamC) && (
          <div className="otherMarketTeamTab">
            <div
              className="otherMarketTeam"
              style={isMobile && box === 6 ? { width: "28%" } : {}}
            // style={box === 6 ? { width: "28%" } : {}}
            >
              <span className={`teamFont otherMarketTeamTxt`}>
                {data?.runners?.[2]?.nat || data?.metaData?.teamC}
              </span>{" "}
              <div className="d-flex flex-row justify-content-between w-100">
                <span
                  className={`${parseFloat(profitLossTeamC) +
                      manualProfitLoss(
                        selectedBet,
                        data?.runners?.[2]?.nat || data?.metaData?.teamC,
                        data?.type,
                        data?.gtype
                      ) >
                      0
                      ? "color-green"
                      : "color-red"
                    } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
                >
                  {parseFloat(profitLossTeamC) +
                    manualProfitLoss(
                      selectedBet,
                      data?.runners?.[2]?.nat || data?.metaData?.teamC,
                      data?.type,
                      data?.gtype
                    )
                    ? parseFloat(profitLossTeamC) +
                    manualProfitLoss(
                      selectedBet,
                      data?.runners?.[2]?.nat || data?.metaData?.teamC,
                      data?.type,
                      data?.gtype
                    )
                    : 0}
                </span>
                <span
                  className="title-12 f-400"
                  style={{
                    color:
                      manualProfitLoss(
                        selectedBet,
                        data?.runners?.[2]?.nat || data?.metaData?.teamC,
                        data?.type,
                        data?.gtype
                      ) > 0
                        ? "#086f3f"
                        : "#bd1828",
                  }}
                >
                  {manualProfitLoss(
                    selectedBet,
                    data?.runners?.[2]?.nat || data?.metaData?.teamC,
                    data?.type,
                    data?.gtype
                  ) === 0
                    ? ""
                    : manualProfitLoss(
                      selectedBet,
                      data?.runners?.[2]?.nat || data?.metaData?.teamC,
                      data?.type,
                      data?.gtype
                    )?.toFixed(2)}
                </span>
              </div>
            </div>
            <div
              className={
                box === 6
                  ? "otherMarket1RateBox rateBoxWidth"
                  : "otherMarket2RateBox rateBoxWidth2"
              }
            >
              {(data?.runners?.[2]?.status !== "OPEN" &&
                data?.runners?.[2]?.status !== "ACTIVE" &&
                data?.runners?.[2]?.status !== "") && (
                  <div className="suspended-overlayRatesotherMarket">
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
          <div className="otherMarketRemarkTab">
            <div className="remark-content">{data?.rem}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default OtherMarket;
