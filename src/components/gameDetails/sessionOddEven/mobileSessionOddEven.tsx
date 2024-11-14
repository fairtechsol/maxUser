import { useDispatch } from "react-redux";
import { calculateMaxLoss, handleSize } from "../../../helpers";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../store/store";
import "./style.scss";

const MobileSessionOddEven = ({ title, data, detail }) => {
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
      min:item?.min ,
      max:item?.max 
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
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
      <div className="sessionNormalContainer">
        <div className="sessionNormalTitle">
          <span className="sessionNormalTitleTxt f-size13">{title}</span>
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
              <div className="sessionYesNoBox" style={{ width: "40%" }}>
                <div
                  className="sessionYesBox back1Background"
                  style={{ width: "100%",borderRight:"1px solid #c7c8ca" }}
                >
                  <span className={`f-size16 sessionBackTxt`}>Odd</span>
                </div>
                <div
                  className="sessionYesBox back1Background"
                  style={{ width: "100%" }}
                >
                  <span className={`f-size16 sessionBackTxt`}>Even</span>
                </div>
              </div>
            </div>
            {data?.section?.map((item: any, index: any) => {
              return (
                <div className="w-100 d-flex flex-column">
                <div className="sessionOddEvenRateContainer" key={index}>
                  <div
                    className="sessionRateName"
                    style={{ width: "60%", overflow: "hidden" }}
                  >
                    <span className="f-size13" style={{ fontWeight: "400" }}>
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
                      } title-13 fbold`}
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
                    className="sessionRateBoxContainer"
                    style={{ width: "40%" }}
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
                      style={{
                        width: "100%",
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
                        <span className={`f-size11 sessionRate2Box`}>
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
                          {handlePrice(item?.ex?.availableToLay?.[0]?.price) ??
                            "-"}
                        </span>
                        <span className={`f-size11 sessionRate2Box`}>
                          {handleSize(item?.ex?.availableToLay?.[0]?.size)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                 {item?.rem && (<div className="w-100 text-start" style={{fontSize:"11px",color:"#097c93",backgroundColor:"#f2f2f2",borderBottom:"1px solid #c7c8ca"}}>{item?.rem}
                  </div>)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default MobileSessionOddEven;
