import { useDispatch } from "react-redux";
import { calculateMaxLoss, formatNumber, handleSize } from "../../../helpers";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../store/store";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";

const SessionFancy = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();

  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    value: any,
    item: any,
    tno: any
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
      mid: data?.mid?.toString(),
      betPlaceIndex: tno,
      matchBetType: "session",
    };
    // console.log(item, "first", team);
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
            <div className="sessionYesNoBoxContainer" >
              <div
                className="sessionYesNoBox  rateBoxWidthNormal"
                // style={{ width: isLap ? "180px" : !isMobile ? "240px" : "" }}
              >
                <div className="sessionYesBox back1Background">
                  <span className={`f-size16 sessionBackTxt`}>Back</span>
                </div>
                <div className="sessionYesBox lay1Background">
                  <span className={`f-size16 sessionBackTxt`}>Lay</span>
                </div>
                <div className="sessionEmptyBox"></div>
              </div>
            </div>
            {evenIndexArray?.map((item: any, index: any) => {
              return (
                <div className="sessionRateContainer" key={index}>
                  <div className="sessionRateName runnerWidthNormal"
                      style={{ overflow: "hidden" }}>
                    <span
                      className="f-size15"
                      style={{ fontWeight:"400", lineHeight: 1 }}
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
                      } title-14 fbold`}
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
                  <div
                    className="sessionRateBoxContainer rateBoxWidthNormal"
                    // style={{
                    //   width: isLap ? "180px" : !isMobile ? "240px" : "",
                    // }}
                  >
                    {(item?.activeStatus != "live" ||
                      item?.GameStatus != "") && (
                      <div className="suspended-overlayRates">
                        <span
                          className={`suspendTextCmmn`}
                        >
                          {item?.GameStatus ?? "SUSPENDED"}
                        </span>
                      </div>
                    )}
                    <div
                      className={`sessionRateBox rateFont back1Background`}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handlePlaceBet(
                          item?.ex?.availableToBack?.[0]?.price,
                          "Back",
                          "Back",
                          item?.activeStatus,
                          item?.ex?.availableToBack?.[0]?.price,
                          item,
                          item?.ex?.availableToBack?.[0]?.tno
                        )
                      }
                    >
                      <span
                        className={`rateFont`}
                      >
                        {handlePrice(item?.ex?.availableToBack?.[0]?.price) ??
                          "-"}
                      </span>
                      <span
                        className={`f-size12 sessionRate2Box`}
                      >
                        {handleSize(item?.ex?.availableToBack?.[0]?.size)}
                      </span>
                    </div>
                    <div
                      className="sessionRateBox rateFont lay1Background"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handlePlaceBet(
                          item?.ex?.availableToLay?.[0]?.price,
                          "lay",
                          "Back",
                          item?.activeStatus,
                          item?.ex?.availableToLay?.[0]?.price,
                          item,
                          item?.ex?.availableToLay?.[0]?.tno
                        )
                      }
                    >
                      <span
                        className={`rateFont`}
                      >
                        {handlePrice(item?.ex?.availableToLay?.[0]?.price) ??
                          "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size12" : "f-size11"
                        } sessionRate2Box`}
                      >
                        {handleSize(item?.ex?.availableToLay?.[0]?.size)}
                      </span>
                    </div>
                    <div className="sessionMinBoxContainer">
                      <span className={`sessionMinBox`}>
                        Min:{formatNumber(item?.min)}
                      </span>
                      <span className={`sessionMinBox`}>
                        Max:{formatNumber(item?.max)}
                      </span>
                    </div>
                  </div>
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
                <div
                  className="sessionYesNoBox rateBoxWidthNormal"
                  // style={{ width: isLap ? "180px" : !isMobile ? "240px" : "" }}
                >
                  <div className="sessionYesBox back1Background">
                    <span className={`f-size16 sessionBackTxt`}>Back</span>
                  </div>
                  <div className="sessionYesBox lay1Background">
                    <span className={`f-size16 sessionBackTxt`}>Lay</span>
                  </div>
                  <div className="sessionEmptyBox"></div>
                </div>
              </div>
              {oddIndexArray?.map((item: any, index: any) => {
                return (
                  <div className="sessionRateContainer" key={index}>
                    <div className="sessionRateName runnerWidthNormal"  style={{ overflow: "hidden" }}>
                      <span
                        className="f-size14"
                        style={{
                          width: "60%",
                          fontWeight: "400",
                          lineHeight: 1,
                        }}
                      >
                        {item?.RunnerName}
                      </span>
                      <span
                        className={`${
                          calculateMaxLoss(
                            detail?.profitLossDataSession,
                            item?.id
                          ) < 0
                            ? "color-red"
                            : "color-red"
                        } title-14 fbold`}
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
                    <div
                      className="sessionRateBoxContainer rateBoxWidthNormal"
                      // style={{
                      //   width: isLap ? "180px" : !isMobile ? "240px" : "",
                      // }}
                    >
                      {(item?.activeStatus != "live" ||
                        item?.GameStatus != "") && (
                        <div className="suspended-overlayRates">
                          <span
                            className={`suspendTextCmmn`}
                          >
                            {item?.GameStatus ?? "SUSPENDED"}
                          </span>
                        </div>
                      )}
                      <div
                        className={`sessionRateBox rateFont back1Background`}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handlePlaceBet(
                            item?.ex?.availableToBack?.[0]?.price,
                            "Back",
                            "Back",
                            item?.activeStatus,
                            item?.ex?.availableToBack?.[0]?.price,
                            item,
                            item?.ex?.availableToBack?.[0]?.tno
                          )
                        }
                      >
                        <span
                          className={`rateFont`}
                        >
                          {handlePrice(item?.ex?.availableToBack?.[0]?.price) ??
                            "-"}
                        </span>
                        <span
                          className={`${
                            !isMobile ? "f-size12" : "f-size11"
                          } sessionRate2Box`}
                        >
                          {handleSize(item?.ex?.availableToBack?.[0]?.size)}
                        </span>
                      </div>
                      <div
                        className="sessionRateBox rateFont lay1Background"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handlePlaceBet(
                            item?.ex?.availableToLay?.[0]?.price,
                            "lay",
                            "Back",
                            item?.activeStatus,
                            item?.ex?.availableToLay?.[0]?.price,
                            item,
                            item?.ex?.availableToLay?.[0]?.tno
                          )
                        }
                      >
                        <span
                          className={`rateFont`}
                        >
                          {handlePrice(item?.ex?.availableToLay?.[0]?.price) ??
                            "-"}
                        </span>
                        <span
                          className={`${
                            !isMobile ? "f-size12" : "f-size11"
                          } sessionRate2Box`}
                        >
                          {handleSize(item?.ex?.availableToLay?.[0]?.size)}
                        </span>
                      </div>
                      <div className="sessionMinBoxContainer">
                        <span className={`sessionMinBox`}>
                          Min:{formatNumber(item?.min)}
                        </span>
                        <span className={`sessionMinBox`}>
                          Max:{formatNumber(item?.max)}
                        </span>
                      </div>
                    </div>
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
export default SessionFancy;
