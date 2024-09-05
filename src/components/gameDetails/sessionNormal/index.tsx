import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {isLap, isMobile} from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { useEffect, useState } from "react";

const SessionNormal = ({ title, data, detail,manual }:any) => {
  const dispatch: AppDispatch = useDispatch();
  const [marketArr, setMarketArr] = useState(data?.section || []);

  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    value: any,
    item: any,
    tno: any,
  ) => {
    if (data?.status != "OPEN" || status != "live") {
      return false;
    }
    if(odds === 0){
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
      name: item?.RunnerName || item?.name,
      eventType: detail?.matchType,
      matchId: detail?.id,
      percent: value,
      matchBetType: "session",
      betPlaceIndex: tno,
      mid: data?.mid?.toString(),
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

  useEffect(() => {
    const newMarketArr = [...(data?.section || []), ...(manual || [])];
    setMarketArr(newMarketArr);
  }, [data, manual]);
  

  marketArr?.forEach((element: any, index: any) => {
    if (index % 2 === 0) {
      evenIndexArray.push(element);
    } else {
      oddIndexArray.push(element);
    }
  });
  const formatNumber = (num:any) => {
    if (num >= 1000 && num < 1000000) {
      return (num / 1000)?.toFixed(1)?.replace(/\.0$/, '') + 'K';
    } else if (num >= 100000) {
      return (num / 100000)?.toFixed(1)?.replace(/\.0$/, '') + 'L';
    }
    return num?.toString();
  };
  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };
  const handleStatus=(activeStatus:any,gStaus:any,status:any)=>{
    if(activeStatus ==="live"){
      if(gStaus ===""){
        return false;
      }else if(status==="active"){
        return false;
      }else{
        return true
      }
     }else{
      return true;
     }
  }
  return (
    <>
      <div className="sessionNormalContainer" style={{marginTop:isMobile?"":"10px"}}>
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
                <div className="sessionYesBox lay1Background">
                  <span
                    className={`f-size16 sessionBackTxt`}
                  >
                    No
                  </span>
                </div>
                <div className="sessionYesBox back1Background">
                  <span
                    className={`f-size16 sessionBackTxt`}
                  >
                    Yes
                  </span>
                </div>
                <div className="sessionEmptyBox"></div>
              </div>
            </div>
            {evenIndexArray?.map((item: any, index: any) => {
              return (
                <div className="sessionRateContainer" key={index}>
                  <div className="sessionRateName">
                    <span className="f-size15" style={{width:"60%",fontWeight:"400"}}>{(item?.RunnerName || item?.name)?.length > 25 ? `${(item?.RunnerName || item?.name)?.slice(0, 25)}...` : (item?.RunnerName || item?.name)}</span>
                  </div>
                  <div className="sessionRateBoxContainer">
                    {handleStatus(item?.activeStatus,item?.GameStatus,item?.status) && (
                      <div className="suspended-overlayRates">
                        <span
                          className={`${
                            !isMobile ? "f-size18" : "f-size16"
                          } suspendedTxtMatchOdd`}
                        >
                          {(item?.GameStatus || item?.status) ?? "SUSPENDED"}
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
                        className={`sessionRateBox lay1Background`}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handlePlaceBet(
                            item?.ex?.availableToLay?.[0]?.price || item?.noRate,
                            "no",
                            "NO",
                            item?.activeStatus,
                            item?.ex?.availableToLay?.[0]?.size || item?.noPercent,
                            item,
                            item?.ex?.availableToLay?.[0]?.tno || 0
                          )
                        }
                      >
                        <span className={`${isLap?"f-size16":"f-size18"} sessionRate1Box`}>
                          {handlePrice(item?.ex?.availableToLay?.[0]?.price || item?.noRate) ?? "-"}
                        </span>
                        <span className={`f-size12 sessionRate2Box`}>
                          {item?.ex?.availableToLay?.[0]?.size || item?.noPercent}
                        </span>
                      </div>
                      {item?.ex?.availableToLay?.length > 1 && (
                        <div
                          className={`sessionRateBox lay1Background`}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToLay?.[1]?.price,
                              "no",
                              "NO",
                              item?.activeStatus,
                              item?.ex?.availableToLay?.[1]?.size,
                              item,
                              item?.ex?.availableToLay?.[1]?.tno
                            )
                          }
                        >
                          <span className={`${isLap?"f-size16":"f-size18"} sessionRate1Box`}>
                            {handlePrice(item?.ex?.availableToLay?.[1]?.price) ?? "-"}
                          </span>
                          <span className={`f-size12 sessionRate2Box`}>
                            {item?.ex?.availableToLay?.[1]?.size}
                          </span>
                        </div>
                      )}
                      {item?.ex?.availableToLay?.length > 2 && (
                        <div
                          className={`sessionRateBoxlay1Background`}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToLay?.[2]?.price,
                              "no",
                              "NO",
                              item?.activeStatus,
                              item?.ex?.availableToLay?.[2]?.size,
                              item,
                              item?.ex?.availableToLay?.[2]?.tno
                            )
                          }
                        >
                          <span className={`${isLap?"f-size16":"f-size18"} sessionRate1Box`}>
                            {handlePrice(item?.ex?.availableToLay?.[2]?.price) ?? "-"}
                          </span>
                          <span className={`f-size12 sessionRate2Box`}>
                            {item?.ex?.availableToLay?.[2]?.size}
                          </span>
                        </div>
                      )}
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
                            item?.ex?.availableToBack?.[0]?.price || item?.yesRate,
                            "Yes",
                            "YES",
                            item?.activeStatus,
                            item?.ex?.availableToBack?.[0]?.size || item?.yesPercent,
                            item,
                            item?.ex?.availableToBack?.[0]?.tno || 0
                          )
                        }
                      >
                        <span
                          className={`${isLap?"f-size16":"f-size18"} sessionRate1Box`}
                        >
                          {handlePrice(item?.ex?.availableToBack?.[0]?.price || item?.yesRate) ?? "-"}
                        </span>
                        <span
                          className={`f-size12 sessionRate2Box`}
                        >
                          {item?.ex?.availableToBack?.[0]?.size || item?.yesPercent}
                        </span>
                      </div>
                      {item?.ex?.availableToBack?.length > 1 && (
                        <div
                          className="sessionRateBox back1Background"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToBack?.[1]?.price,
                              "Yes",
                              "YES",
                              item?.activeStatus,
                              item?.ex?.availableToBack?.[1]?.size,
                              item,
                              item?.ex?.availableToBack?.[1]?.tno
                            )
                          }
                        >
                          <span
                            className={`${isLap?"f-size16":"f-size18"} sessionRate1Box`}
                          >
                            {handlePrice(item?.ex?.availableToBack?.[1]?.price) ?? "-"}
                          </span>
                          <span
                            className={`f-size12 sessionRate2Box`}
                          >
                            {item?.ex?.availableToBack?.[1]?.size}
                          </span>
                        </div>
                      )}
                      {item?.ex?.availableToBack?.length > 2 && (
                        <div
                          className="sessionRateBox back1Background"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToBack?.[2]?.price,
                              "Yes",
                              "YES",
                              item?.activeStatus,
                              item?.ex?.availableToBack?.[2]?.size,
                              item,
                              item?.ex?.availableToBack?.[2]?.tno
                            )
                          }
                        >
                          <span
                            className={`${isLap?"f-size16":"f-size18"} sessionRate1Box`}
                          >
                            {handlePrice(item?.ex?.availableToBack?.[2]?.price) ?? "-"}
                          </span>
                          <span
                            className={`f-size12 sessionRate2Box`}
                          >
                            {item?.ex?.availableToBack?.[2]?.size}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="sessionMinBoxContainer">
                      <span className={`sessionMinBox`}>Min:{formatNumber(item?.min || item?.minBet)}</span>
                      <span className={`sessionMinBox`}>Max:{formatNumber(item?.max || item?.maxBet)}</span>
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
              {title !== "oddeven" && (
                <div className="sessionYesNoBoxContainer">
                  <div
                    className="sessionEmptyBox"
                    style={{ width: "54%" }}
                  ></div>
                  <div className="sessionYesNoBox">
                    <div className="sessionYesBox lay1Background">
                      <span
                        className={`f-size16 sessionBackTxt`}
                      >
                        No
                      </span>
                    </div>
                    <div className="sessionYesBox back1Background">
                      <span
                        className={`f-size16 sessionBackTxt`}
                      >
                        Yes
                      </span>
                    </div>
                    <div className="sessionEmptyBox"></div>
                  </div>
                </div>
              )}

              {oddIndexArray?.map((item: any, index: any) => {
                return (
                  <div className="sessionRateContainer" key={index}>
                    <div className="sessionRateName">
                      <span className="f-size15" style={{width:"60%",fontWeight:"400"}}>{(item?.RunnerName || item?.name)?.length > 25 ? `${(item?.RunnerName || item?.name)?.slice(0, 25)}...` : (item?.RunnerName || item?.name)}</span>
                    </div>
                    <div className="sessionRateBoxContainer">
                      {handleStatus(item?.activeStatus,item?.GameStatus,item?.status) && (
                        <div className="suspended-overlayRates">
                          <span
                            className={`${
                              !isMobile ? "f-size18" : "f-size16"
                            } suspendedTxtMatchOdd`}
                          >
                            {(item?.GameStatus || item?.status) ?? "SUSPENDED"}
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
                          className={`sessionRateBox lay1Background`}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToLay?.[0]?.price || item?.noRate,
                              "no",
                              "NO",
                              item?.activeStatus,
                              item?.ex?.availableToLay?.[0]?.size || item?.noPercent,
                              item,
                              item?.ex?.availableToLay?.[0]?.tno || 0
                            )
                          }
                        >
                          <span
                            className={`${isLap?"f-size16":"f-size18"} sessionRate1Box`}
                          >
                            {handlePrice(item?.ex?.availableToLay?.[0]?.price || item?.noRate) ?? "-"}
                          </span>
                          <span
                            className={`f-size12 sessionRate2Box`}
                          >
                            {item?.ex?.availableToLay?.[0]?.size || item?.noPercent}
                          </span>
                        </div>
                        {item?.ex?.availableToLay?.length > 1 && (
                          <div
                            className={`sessionRateBox lay1Background`}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handlePlaceBet(
                                item?.ex?.availableToLay?.[1]?.price,
                                "no",
                                "NO",
                                item?.activeStatus,
                                item?.ex?.availableToLay?.[1]?.size,
                                item,
                                item?.ex?.availableToLay?.[1]?.tno
                              )
                            }
                          >
                            <span
                              className={`${isLap?"f-size16":"f-size18"} sessionRate1Box`}
                            >
                              {handlePrice(item?.ex?.availableToLay?.[1]?.price) ?? "-"}
                            </span>
                            <span
                              className={`f-size12 sessionRate2Box`}
                            >
                              {item?.ex?.availableToLay?.[1]?.size}
                            </span>
                          </div>
                        )}
                        {item?.ex?.availableToLay?.length > 2 && (
                          <div
                            className={`sessionRateBox lay1Background`}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handlePlaceBet(
                                item?.ex?.availableToLay?.[2]?.price,
                                "no",
                                "NO",
                                item?.activeStatus,
                                item?.ex?.availableToLay?.[2]?.size,
                                item,
                                item?.ex?.availableToLay?.[2]?.tno
                              )
                            }
                          >
                            <span
                              className={`${isLap?"f-size16":"f-size18"} sessionRate1Box`}
                            >
                              {handlePrice(item?.ex?.availableToLay?.[2]?.price) ?? "-"}
                            </span>
                            <span
                              className={`f-size12 sessionRate2Box`}
                            >
                              {item?.ex?.availableToLay?.[2]?.size}
                            </span>
                          </div>
                        )}
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
                              item?.ex?.availableToBack?.[0]?.price || item?.yesRate,
                              "Yes",
                              "YES",
                              item?.activeStatus,
                              item?.ex?.availableToBack?.[0]?.size || item?.yesPercent,
                              item,
                              item?.ex?.availableToBack?.[0]?.tno
                            )
                          }
                        >
                          <span
                            className={`${isLap?"f-size16":"f-size18"} sessionRate1Box`}
                          >
                            {handlePrice(item?.ex?.availableToBack?.[0]?.price || item?.yesRate) ?? "-"}
                          </span>
                          <span
                            className={`f-size12 sessionRate2Box`}
                          >
                            {item?.ex?.availableToBack?.[0]?.size || item?.yesPercent}
                          </span>
                        </div>
                        {item?.ex?.availableToBack?.length > 1 && (
                          <div
                            className="sessionRateBox back1Background"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handlePlaceBet(
                                item?.ex?.availableToBack?.[1]?.price,
                                "Yes",
                                "YES",
                                item?.activeStatus,
                                title === "oddeven"
                                  ? item?.ex?.availableToBack?.[1]?.price
                                  : item?.ex?.availableToBack?.[1]?.size,
                                item,
                                item?.ex?.availableToBack?.[1]?.tno
                              )
                            }
                          >
                            <span
                              className={`${isLap?"f-size16":"f-size18"} sessionRate1Box`}
                            >
                              {handlePrice(item?.ex?.availableToBack?.[1]?.price) ?? "-"}
                            </span>
                            <span
                              className={`f-size12 sessionRate2Box`}
                            >
                              {item?.ex?.availableToBack?.[1]?.size}
                            </span>
                          </div>
                        )}
                        {item?.ex?.availableToBack?.length > 2 && (
                          <div
                            className="sessionRateBox back1Background"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handlePlaceBet(
                                item?.ex?.availableToBack?.[2]?.price,
                                "Yes",
                                "YES",
                                item?.activeStatus,
                                item?.ex?.availableToBack?.[2]?.size,
                                item,
                                item?.ex?.availableToBack?.[2]?.tno
                              )
                            }
                          >
                            <span
                              className={`${isLap?"f-size16":"f-size18"} sessionRate1Box`}
                            >
                              {handlePrice(item?.ex?.availableToBack?.[2]?.price) ?? "-"}
                            </span>
                            <span
                              className={`f-size12 sessionRate2Box`}
                            >
                              {item?.ex?.availableToBack?.[2]?.size}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="sessionMinBoxContainer">
                        <span className={`sessionMinBox`}>Min:{formatNumber(item?.min || item?.minBet)}</span>
                        <span className={`sessionMinBox`}>Max:{formatNumber(item?.max || item?.maxBet)}</span>
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
export default SessionNormal;
