import { useDispatch } from "react-redux";
import { calculateMaxLoss, formatNumber, handleSize } from "../../../helpers";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../store/store";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";

const SessionOddEven = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();
  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    value: any,
    item: any,
    tno: any,
    teamName?: any
  ) => {
    if (data?.status != "OPEN" || status != "live") {
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
      betId: item?.id,
      name: item?.RunnerName,
      eventType: detail?.matchType,
      matchId: detail?.id,
      percent: value,
      matchBetType: "session",
      betPlaceIndex: tno,
      mid: data?.mid?.toString(),
      teamName: teamName,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  const evenIndexArray = [];
  const oddIndexArray = [];

  data?.section?.forEach((element: any, index: any) => {
    if (index % 2 === 0) {
      evenIndexArray.push(element);
    } else {
      oddIndexArray.push(element);
    }
  });
  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };
  return (
    <>
      <div
        className="sessionNormalContainer"
        style={{ marginTop: isMobile ? "" : "10px" }}
      >
        <div className="sessionNormalTitle">
          <span className="sessionNormalTitleTxt f-size15">{title}</span>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div className="sessionYesNoBoxContainer">
              <div
                className="sessionYesNoBox rateBoxWidthNormal"
              // style={{ width: isLap ? "180px" : !isMobile ? "240px" : "" }}
              >
                <div
                  className="sessionYesBox back1Background"
                  style={{ borderRight: "1px solid #c7c8ca" }}
                >
                  <span className={`f-size16 sessionBackTxt`}>Odd</span>
                </div>
                <div className="sessionYesBox back1Background">
                  <span className={`f-size16 sessionBackTxt`}>Even</span>
                </div>
                <div className="sessionEmptyBox"></div>
              </div>
            </div>
            {evenIndexArray?.map((item: any, index: any) => {
              return (
                <div className="w-100 d-flex flex-column">
                  <div className="sessionOddEvenRateContainer" key={index}>
                    <div
                      className="sessionRateName runnerWidthNormal"
                      style={{ overflow: "hidden" }}
                    >
                      <span
                        className="teamFont"
                        style={{ width: "60%", fontWeight: "400", lineHeight: 1 }}
                      >
                        {item?.RunnerName}
                      </span>{" "}
                      <span
                        className={`${calculateMaxLoss(
                          detail?.profitLossDataSession,
                          item?.id
                        ) < 0
                            ? "color-red"
                            : "color-red"
                          }  title-14 fbold`}
                      >
                        {calculateMaxLoss(
                          detail?.profitLossDataSession,
                          item?.id
                        ) !== 0
                          ? `-${calculateMaxLoss(
                            detail?.profitLossDataSession,
                            item?.id
                          )}`
                          : ""}
                      </span>
                    </div>
                    <div className="sessionRateBoxContainer rateBoxWidthNormal">
                      {(item?.activeStatus != "live" ||
                        item?.GameStatus != "") && (
                          <div className="suspended-overlayRates">
                            <span className={`suspendTextCmmn`}>
                              {item?.GameStatus ?? "SUSPENDED"}
                            </span>
                          </div>
                        )}
                      <div
                        style={{
                          width: "33.33%",
                          display: "flex",
                          flexDirection: "column",
                          borderRight: "1px solid #c7c8ca",
                        }}
                      >
                        <div
                          className={`sessionRateBox back1Background`}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToBack?.[0]?.price,
                              "Back",
                              item?.RunnerName,
                              item?.activeStatus,
                              item?.ex?.availableToBack?.[0]?.price,
                              item,
                              item?.ex?.availableToBack?.[0]?.tno,
                              "odd"
                            )
                          }
                        >
                          <span className={`rateFont`}>
                            {handlePrice(item?.ex?.availableToBack?.[0]?.price) ??
                              "-"}
                          </span>
                          <span className={`f-size12 sessionRate2Box`}>
                            {handleSize(item?.ex?.availableToBack?.[0]?.size)}
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "33.33%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          className="sessionRateBox back1Background"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToLay?.[0]?.price,
                              "Back",
                              item?.RunnerName,
                              item?.activeStatus,
                              item?.ex?.availableToLay?.[0]?.price,
                              item,
                              item?.ex?.availableToLay?.[0]?.tno,
                              "even"
                            )
                          }
                        >
                          <span className={`rateFont`}>
                            {handlePrice(item?.ex?.availableToLay?.[0]?.price) ??
                              "-"}
                          </span>
                          <span className={`f-size12 sessionRate2Box`}>
                            {handleSize(item?.ex?.availableToLay?.[0]?.size)}
                          </span>
                        </div>
                      </div>
                      <div
                        className="sessionMinBoxContainer"
                        style={{ width: "33.33%" }}
                      >
                        <span className={`sessionMinBox sessionMinMaxFont`}>
                          Min:{formatNumber(item?.min)}
                        </span>
                        <span className={`sessionMinBox sessionMinMaxFont`}>
                          Max:{formatNumber(item?.max)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {item?.rem && (
                    <div
                      className="w-100 text-start"
                      style={{
                        fontSize: "11px",
                        color: "#097c93",
                        backgroundColor: "#f2f2f2",
                        borderBottom: "1px solid #c7c8ca",
                      }}
                    >
                      {item?.rem}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {oddIndexArray?.length > 0 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="sessionYesNoBoxContainer">
                <div className="sessionYesNoBox rateBoxWidthNormal">
                  <div
                    className="sessionYesBox back1Background"
                    style={{ borderRight: "1px solid #c7c8ca" }}
                  >
                    <span className={`f-size16 sessionBackTxt`}>Odd</span>
                  </div>
                  <div className="sessionYesBox back1Background">
                    <span className={`f-size16 sessionBackTxt`}>Even</span>
                  </div>
                  <div className="sessionEmptyBox"></div>
                </div>
              </div>
              {oddIndexArray?.map((item: any, index: any) => {
                return (
                  <div className="w-100 d-flex flex-column">
                    <div className="sessionOddEvenRateContainer" key={index}>
                      <div
                        className="sessionRateName runnerWidthNormal"
                        style={{ overflow: "hidden" }}
                      >
                        <span
                          className="teamFont"
                          style={{
                            width: "60%",
                            fontWeight: "400",
                            lineHeight: 1,
                          }}
                        >
                          {item?.RunnerName}
                        </span>{" "}
                        <span
                          className={`${
                            calculateMaxLoss(
                              detail?.profitLossDataSession,
                              item?.id
                            ) < 0
                              ? "color-red"
                              : "color-red"
                          }  title-14 fbold`}
                        >
                          {calculateMaxLoss(
                            detail?.profitLossDataSession,
                            item?.id
                          ) !== 0
                            ? `-${calculateMaxLoss(
                                detail?.profitLossDataSession,
                                item?.id
                              )}`
                            : ""}
                        </span>
                      </div>
                      <div className="sessionRateBoxContainer rateBoxWidthNormal">
                        {(item?.activeStatus != "live" ||
                          item?.GameStatus != "") && (
                          <div className="suspended-overlayRates">
                            <span className={`suspendTextCmmn`}>
                              {item?.GameStatus ?? "SUSPENDED"}
                            </span>
                          </div>
                        )}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            className={`sessionRateBox ${
                              title === "oddeven"
                                ? "back1Background"
                                : "lay1Background"
                            }`}
                            style={{
                              cursor: "pointer",
                              borderRight: "1px solid #c7c8ca",
                            }}
                            onClick={() =>
                              handlePlaceBet(
                                item?.ex?.availableToBack?.[0]?.price,
                                "Back",
                                item?.RunnerName,
                                item?.activeStatus,
                                item?.ex?.availableToBack?.[0]?.price,
                                item,
                                item?.ex?.availableToBack?.[0]?.tno,
                                "odd"
                              )
                            }
                          >
                            <span className={`rateFont`}>
                              {handlePrice(
                                item?.ex?.availableToBack?.[0]?.price
                              ) ?? "-"}
                            </span>
                            <span
                              className={`${
                                !isMobile ? "f-size12" : "f-size11"
                              } sessionRate2Box`}
                            >
                              {handleSize(item?.ex?.availableToBack?.[0]?.size)}
                            </span>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            className="sessionRateBox back1Background"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handlePlaceBet(
                                item?.ex?.availableToLay?.[0]?.price,
                                "Back",
                                item?.RunnerName,
                                item?.activeStatus,
                                item?.ex?.availableToLay?.[0]?.price,
                                item,
                                item?.ex?.availableToLay?.[0]?.tno,
                                "even"
                              )
                            }
                          >
                            <span className={`rateFont`}>
                              {handlePrice(
                                item?.ex?.availableToLay?.[0]?.price
                              ) ?? "-"}
                            </span>
                            <span
                              className={`${
                                !isMobile ? "f-size12" : "f-size11"
                              } sessionRate2Box`}
                            >
                              {item?.ex?.availableToLay?.[0]?.size}
                            </span>
                          </div>
                        </div>
                        <div className="sessionMinBoxContainer">
                          <span className={`sessionMinBox sessionMinMaxFont`}>
                            Min:{formatNumber(item?.min)}
                          </span>
                          <span className={`sessionMinBox sessionMinMaxFont`}>
                            Max:{formatNumber(item?.max)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {item?.rem && (
                      <div
                        className="w-100 text-start"
                        style={{
                          fontSize: "11px",
                          color: "#097c93",
                          backgroundColor: "#f2f2f2",
                          borderBottom: "1px solid #c7c8ca",
                        }}
                      >
                        {item?.rem}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default SessionOddEven;
