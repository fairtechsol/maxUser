import { useDispatch, useSelector } from "react-redux";
import {
  dummyArray,
  formatNumber,
  manualProfitLoss
} from "../../../helpers";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/constants";
import { isMobile } from "../../../utils/screenDimension";
import BetBox from "../betBox";
import "./style.scss";

const MatchOdd = ({ title, data, detail }) => {
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
    if (data?.activeStatus != "live" || (status != "ACTIVE" && status != "OPEN")) {
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
    };
    // console.log('team',team)
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
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
          <div className="matchOddBackLayBoxContainer backLayBoxWidth">
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
          <div
            className="matchOddTeam"
            style={isMobile ? { width: "28%" } : {}}
          >
            <span className={`teamFont matchOddTeamTxt`}>
              {detail?.teamA?.length > 20
                ? `${detail?.teamA?.slice(0, 25)}...`
                : detail?.teamA}
            </span>
            <div className="d-flex flex-row justify-content-between w-100">
              <span
                className={`${
                  parseInt(
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
                    : parseInt(
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
          <div className="matchOddRateBox rateBoxWidth">
            {(data?.activeStatus !== "live" ||
             ( data?.runners?.[0]?.status !== "ACTIVE" && data?.runners?.[0]?.status !== "OPEN")) && (
              <div className="suspended-overlayRatesMatchOdd">
                <span className={`suspendTextCmmn`}>SUSPENDED</span>
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
          </div>
        </div>

        <div className="matchOddTeamTab">
          <div
            className="matchOddTeam"
            style={isMobile ? { width: "28%" } : {}}
          >
            <span className={`teamFont matchOddTeamTxt`}>
              {detail?.teamB?.length > 25
                ? `${detail?.teamB?.slice(0, 25)}...`
                : detail?.teamB}
            </span>
            <div className="d-flex flex-row justify-content-between w-100">
              <span
                className={`${
                  parseInt(
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
                    : parseInt(
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
          <div className="matchOddRateBox rateBoxWidth">
            {(data?.activeStatus !== "live" ||
              ( data?.runners?.[1]?.status !== "ACTIVE" && data?.runners?.[1]?.status !== "OPEN")) && (
              <div className="suspended-overlayRatesMatchOdd">
                <span className={`suspendTextCmmn`}>SUSPENDED</span>
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
          </div>
        </div>

        {detail?.teamC && (
          <div className="matchOddTeamTab">
            <div
              className="matchOddTeam"
              style={isMobile ? { width: "28%" } : {}}
            >
              <span className={`teamFont matchOddTeamTxt`}>
                {detail?.teamC?.length > 25
                  ? `${detail?.teamC?.slice(0, 25)}...`
                  : detail?.teamC}
              </span>
              <div className="d-flex flex-row justify-content-between w-100">
                <span
                  className={`${
                    parseInt(
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
                      : parseInt(
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
            <div className="matchOddRateBox rateBoxWidth">
              {(data?.activeStatus !== "live" ||
                ( data?.runners?.[2]?.status !== "ACTIVE" && data?.runners?.[2]?.status !== "OPEN")) && (
                <div className="suspended-overlayRatesMatchOdd">
                  <span className={`suspendTextCmmn`}>SUSPENDED</span>
                </div>
              )}
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
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default MatchOdd;
