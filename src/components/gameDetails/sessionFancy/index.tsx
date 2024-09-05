import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { isLap, isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";

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
    console.log(item, "first", team);
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
              <div className="sessionYesNoBox">
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
                  <div className="sessionRateName">
                    <span className="f-size15" style={{ width: "60%" }}>
                      {item?.RunnerName?.length > 25
                        ? `${item?.RunnerName?.slice(0, 25)}...`
                        : item?.RunnerName}
                    </span>
                    <span
                      className={`${
                        detail?.profitLossDataSession
                          ? detail?.profitLossDataSession?.reduce(
                              (accumulator: any, bet: any) => {
                                const maxLossToAdd =
                                  bet?.betId === item?.id ? +bet?.maxLoss : 0;
                                return accumulator + maxLossToAdd;
                              },
                              0
                            ) < 0
                            ? "color-red"
                            : "color-green"
                          : ""
                      }`}
                    >
                      {detail?.profitLossDataSession
                        ? detail?.profitLossDataSession?.reduce(
                            (accumulator: any, bet: any) => {
                              const maxLossToAdd =
                                bet?.betId === item?.id ? +bet?.maxLoss : 0;
                              return accumulator + maxLossToAdd;
                            },
                            0
                          )
                        : 0}
                    </span>
                  </div>
                  <div className="sessionRateBoxContainer">
                    {(item?.activeStatus != "live" ||
                      item?.GameStatus != "") && (
                      <div className="suspended-overlayRates">
                        <span
                          className={`${
                            !isMobile ? "f-size18" : "f-size16"
                          } suspendedTxtMatchOdd`}
                        >
                          {item?.GameStatus ?? "SUSPENDED"}
                        </span>
                      </div>
                    )}
                    <div
                      className={`sessionRateBox back1Background`}
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
                        className={`${
                          !isMobile
                            ? "f-size18"
                            : isLap
                            ? "f-size16"
                            : "f-size15"
                        } sessionRate1Box`}
                      >
                        {handlePrice(item?.ex?.availableToBack?.[0]?.price) ??
                          "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size12" : "f-size11"
                        } sessionRate2Box`}
                      >
                        {item?.ex?.availableToBack?.[0]?.size}
                      </span>
                    </div>
                    <div
                      className="sessionRateBox lay1Background"
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
                        className={`${
                          !isMobile
                            ? "f-size18"
                            : isLap
                            ? "f-size16"
                            : "f-size15"
                        } sessionRate1Box`}
                      >
                        {handlePrice(item?.ex?.availableToLay?.[0]?.price) ??
                          "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size12" : "f-size11"
                        } sessionRate2Box`}
                      >
                        {item?.ex?.availableToLay?.[0]?.size}
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
                <div className="sessionYesNoBox">
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
                    <div className="sessionRateName">
                      <span
                        className="f-size15"
                        style={{ width: "60%", fontWeight: "400" }}
                      >
                        {item?.RunnerName?.length > 25
                          ? `${item?.RunnerName?.slice(0, 25)}...`
                          : item?.RunnerName}
                      </span>
                    </div>
                    <div className="sessionRateBoxContainer">
                      {(item?.activeStatus != "live" ||
                        item?.GameStatus != "") && (
                        <div className="suspended-overlayRates">
                          <span
                            className={`${
                              !isMobile ? "f-size18" : "f-size16"
                            } suspendedTxtMatchOdd`}
                          >
                            {item?.GameStatus ?? "SUSPENDED"}
                          </span>
                        </div>
                      )}
                      <div
                        className={`sessionRateBox back1Background`}
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
                          className={`${
                            !isMobile
                              ? "f-size18"
                              : isLap
                              ? "f-size16"
                              : "f-size15"
                          } sessionRate1Box`}
                        >
                          {handlePrice(item?.ex?.availableToBack?.[0]?.price) ??
                            "-"}
                        </span>
                        <span
                          className={`${
                            !isMobile ? "f-size12" : "f-size11"
                          } sessionRate2Box`}
                        >
                          {item?.ex?.availableToBack?.[0]?.size}
                        </span>
                      </div>
                      <div
                        className="sessionRateBox lay1Background"
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
                          className={`${
                            !isMobile
                              ? "f-size18"
                              : isLap
                              ? "f-size16"
                              : "f-size15"
                          } sessionRate1Box`}
                        >
                          {handlePrice(item?.ex?.availableToLay?.[0]?.price) ??
                            "-"}
                        </span>
                        <span
                          className={`${
                            !isMobile ? "f-size12" : "f-size11"
                          } sessionRate2Box`}
                        >
                          {item?.ex?.availableToLay?.[0]?.size}
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
