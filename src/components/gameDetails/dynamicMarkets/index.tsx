import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { profitLossDataForMatchConstants } from "../../../utils/constants";
import { formatNumber } from "../../../helpers";
import BetBox from "../betBox";

const DynamicMarket = ({ title, data, detail }) => {
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
              Min:{formatNumber(data?.minBet)} Max:{formatNumber(data?.maxBet)}
            </span>
          </div>
          <div
            className={`dynamicBackLayBoxContainer backLayBoxWidth`}
          >
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
        
          <div className="dynamicTeam" style={{ width: "28%" }}>
            <span className={`teamFont dynamicTeamTxt`}>Yes</span>
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
            className={`dynamicRateBox rateBoxWidth`}
          >
            {(data?.activeStatus !== "live" ||
              data?.runners?.[0]?.status !== "ACTIVE") && (
              <div className="suspended-overlayRatesdynamic">
                <span className={`suspendTextCmmn`}>SUSPENDED</span>
              </div>
            )}
            {data?.runners?.[0]?.ex?.availableToBack?.map((item: any) => {
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
            {data?.runners?.[0]?.ex?.availableToLay?.map((item: any) => {
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
           
          </div>
        </div>

        <div className="dynamicTeamTab">
          <div className="dynamicTeam" style={{ width: "28%" }}>
            <span className={`teamFont dynamicTeamTxt`}>No</span>
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
            className={`dynamicRateBox rateBoxWidth`}
          >
            {(data?.activeStatus !== "live" ||
              data?.runners?.[1]?.status !== "ACTIVE") && (
              <div className="suspended-overlayRatesdynamic">
                <span className={`suspendTextCmmn`}>SUSPENDED</span>
              </div>
            )}
            {data?.runners?.[1]?.ex?.availableToBack?.map((item: any) => {
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
            {data?.runners?.[1]?.ex?.availableToLay?.map((item: any) => {
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
          </div>
        </div>
      </div>
    </>
  );
};
export default DynamicMarket;
