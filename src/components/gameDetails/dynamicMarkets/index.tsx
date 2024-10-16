import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { profitLossDataForMatchConstants } from "../../../utils/constants";
import { dummyArray, formatNumber, manualProfitLoss } from "../../../helpers";
import BetBox from "../betBox";
import { useSelector } from "react-redux";

const DynamicMarket = ({ title, data, detail }) => {
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
      teamA: "Yes",
      teamB: "No",
      // teamC: detail?.teamC,
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
      <div
        className="dynamicContainer"
        style={{ marginTop: isMobile ? "" : "10px" }}
      >
        <div className="dynamicTitle">
          <span
            className={`dynamicTitleTxt ${isMobile ? "f-size13" : "f-size15"}`}
          >
            {title}
          </span>
        </div>

        <div className="dynamicBackLayTab">
          <div className="dynamicMinMaxBox">
            <span className="dynamicMinMax">
            {data?.minBet===data?.maxBet? `Max:${formatNumber(data?.maxBet)}` :`Min:${formatNumber(data?.minBet)} Max:${formatNumber(data?.maxBet)}`}
            </span>
          </div>
          <div className={`dynamicBackLayBoxContainer backLayBoxWidth`}>
            <div className="dynamicBackBoxTab" style={{ width: "25%" }}>
              <span className={`f-size16 dynamicBackTxt`}>Back</span>
            </div>
            <div className="dynamicLayBoxTab" style={{ width: "25%" }}>
              <span className={`f-size16 dynamicBackTxt`}>Lay</span>
            </div>
            {!isMobile && <div className="dynamicEmptyBox"></div>}
          </div>
        </div>

        <div className="dynamicTeamTab">
          <div className="dynamicTeam" style={isMobile ? { width: "28%" } : {}}>
            <span className={`teamFont dynamicTeamTxt`}>Yes</span>
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
                      "Yes",
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
                        "Yes",
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
                      "Yes",
                      data?.type,
                      data?.gtype
                    ) > 0
                      ? "#086f3f"
                      : "#bd1828",
                }}
              >
                {manualProfitLoss(
                  selectedBet,
                  "Yes",
                  data?.type,
                  data?.gtype
                ) === 0
                  ? ""
                  : manualProfitLoss(
                      selectedBet,
                      "Yes",
                      data?.type,
                      data?.gtype
                    )?.toFixed(2)}
              </span>
            </div>
          </div>
          <div className={`dynamicRateBox rateBoxWidth`}>
            {(data?.activeStatus !== "live" ||
              data?.runners?.[0]?.status !== "ACTIVE") && (
              <div className="suspended-overlayRatesdynamic">
                <span className={`suspendTextCmmn`} style={{textTransform:"uppercase"}}>{data?.runners?.[0]?.status}</span>
              </div>
            )}
            {(data?.runners?.[0]?.ex?.availableToBack?.length > 0
              ? data?.runners?.[0]?.ex?.availableToBack
              : dummyArray
            )?.map((item: any) => {
              return (
                <BetBox
                  data={item}
                  type={"back"}
                  detail={"Yes"}
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
                  detail={"Yes"}
                  runner={data?.runners?.[0]}
                  handlePlaceBet={handlePlaceBet}
                />
              );
            })}
          </div>
        </div>

        <div className="dynamicTeamTab">
          <div className="dynamicTeam" style={isMobile ? { width: "28%" } : {}}>
            <span className={`teamFont dynamicTeamTxt`}>No</span>
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
                      "No",
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
                        "No",
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
                      "No",
                      data?.type,
                      data?.gtype
                    ) > 0
                      ? "#086f3f"
                      : "#bd1828",
                }}
              >
                {manualProfitLoss(
                  selectedBet,
                  "No",
                  data?.type,
                  data?.gtype
                ) === 0
                  ? ""
                  : manualProfitLoss(
                      selectedBet,
                      "No",
                      data?.type,
                      data?.gtype
                    )?.toFixed(2)}
              </span>
            </div>
          </div>
          <div className={`dynamicRateBox rateBoxWidth`}>
            {(data?.activeStatus !== "live" ||
              data?.runners?.[1]?.status !== "ACTIVE") && (
              <div className="suspended-overlayRatesdynamic">
                <span className={`suspendTextCmmn`} style={{textTransform:"uppercase"}}>{data?.runners?.[1]?.status}</span>
              </div>
            )}
            {(data?.runners?.[1]?.ex?.availableToBack?.length > 0
              ? data?.runners?.[1]?.ex?.availableToBack
              : dummyArray
            )?.map((item: any) => {
              return (
                <BetBox
                  data={item}
                  type={"back"}
                  detail={"No"}
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
                  detail={"No"}
                  runner={data?.runners?.[1]}
                  handlePlaceBet={handlePlaceBet}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default DynamicMarket;
