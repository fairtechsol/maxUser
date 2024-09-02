import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";

const SessionNormal = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();

  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    value: any,
    item:any
  ) => {
    console.log(status,'first',data?.status)
    if (data?.status != "OPEN" || status != "live") {
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
      matchBetType:"session"
    };
    console.log('team',team)
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
console.log(data,'first',evenIndexArray)
  return (
    <>
      <div className="sessionNormalContainer">
        <div className="sessionNormalTitle">
          <span className="sessionNormalTitleTxt">{title}</span>
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
           {title !=="oddeven" && <div className="sessionYesNoBoxContainer">
              <div className="sessionYesNoBox">
                <div className="sessionYesBox lay1Background">
                  <span
                    className={`${
                      !isMobile ? "f-size18" : "f-size14"
                    } sessionBackTxt`}
                  >
                    No
                  </span>
                </div>
                <div className="sessionYesBox back1Background">
                  <span
                    className={`${
                      !isMobile ? "f-size18" : "f-size14"
                    } sessionBackTxt`}
                  >
                    Yes
                  </span>
                </div>
                <div className="sessionEmptyBox"></div>
              </div>
            </div>}
            {evenIndexArray?.map((item: any, index: any) => {
              return (
                <div className="sessionRateContainer" key={index}>
                  <div className="sessionRateName">
                    <span className="f-size16">{item?.RunnerName}</span>
                  </div>
                  <div className="sessionRateBoxContainer">
                  {(item?.activeStatus != "live" || item?.GameStatus != "") && <div className="suspended-overlayRates"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtMatchOdd`}>
                  {item?.GameStatus ?? "SUSPENDED"}</span></div>}
                    <div className="sessionRateBox lay1Background" style={{cursor:"pointer"}} onClick={()=> handlePlaceBet(item?.ex?.availableToLay?.[0]?.price,"No","No",item?.activeStatus,item?.ex?.availableToLay?.[0]?.size,item)}>
                      <span
                        className={`${
                          !isMobile ? "f-size18" : "f-size12"
                        } sessionRate1Box`}
                      >
                        {item?.ex?.availableToLay?.[0]?.price ?? "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size16" : "f-size12"
                        } sessionRate2Box`}
                      >
                        {item?.ex?.availableToLay?.[0]?.size}
                      </span>
                    </div>
                    <div className="sessionRateBox back1Background" style={{cursor:"pointer"}} onClick={()=> handlePlaceBet(item?.ex?.availableToLay?.[0]?.price,"Yes","Yes",item?.activeStatus,item?.ex?.availableToLay?.[0]?.size,item)}>
                      <span
                        className={`${
                          !isMobile ? "f-size18" : "f-size12"
                        } sessionRate1Box`}
                      >
                        {item?.ex?.availableToBack?.[0]?.price ?? "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size16" : "f-size12"
                        } sessionRate2Box`}
                      >
                        {item?.ex?.availableToBack?.[0]?.size}
                      </span>
                    </div>
                    <div className="sessionRateBox">
                      <span className={`sessionMinBox`}>Min:{item?.min}</span>
                      <span className={`sessionMinBox`}>Max:{item?.max}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
           {title !=="oddeven" && <div className="sessionYesNoBoxContainer">
              <div className="sessionYesNoBox">
                <div className="sessionYesBox lay1Background">
                  <span
                    className={`${
                      !isMobile ? "f-size18" : "f-size14"
                    } sessionBackTxt`}
                  >
                    No
                  </span>
                </div>
                <div className="sessionYesBox back1Background">
                  <span
                    className={`${
                      !isMobile ? "f-size18" : "f-size14"
                    } sessionBackTxt`}
                  >
                    Yes
                  </span>
                </div>
                <div className="sessionEmptyBox"></div>
              </div>
            </div>}

            {oddIndexArray?.map((item: any, index: any) => {
              return (
                <div className="sessionRateContainer" key={index}>
                  <div className="sessionRateName">
                    <span className="f-size16">{item?.RunnerName}</span>
                  </div>
                  <div className="sessionRateBoxContainer">
                  {(item?.activeStatus != "live" || item?.GameStatus != "") && <div className="suspended-overlayRates"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtMatchOdd`}>
                  {item?.GameStatus ?? "SUSPENDED"}</span></div>}
                    <div className="sessionRateBox lay1Background" style={{cursor:"pointer"}} onClick={()=> handlePlaceBet(item?.ex?.availableToLay?.[0]?.price,"No","No",item?.activeStatus,item?.ex?.availableToLay?.[0]?.size,item)}>
                      <span
                        className={`${
                          !isMobile ? "f-size18" : "f-size12"
                        } sessionRate1Box`}
                      >
                        {item?.ex?.availableToLay?.[0]?.price ?? "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size16" : "f-size12"
                        } sessionRate2Box`}
                      >
                        {item?.ex?.availableToLay?.[0]?.size}
                      </span>
                    </div>
                    <div className="sessionRateBox back1Background" style={{cursor:"pointer"}} onClick={()=> handlePlaceBet(item?.ex?.availableToLay?.[0]?.price,"Yes","Yes",item?.activeStatus,item?.ex?.availableToLay?.[0]?.size,item)}>
                      <span
                        className={`${
                          !isMobile ? "f-size18" : "f-size12"
                        } sessionRate1Box`}
                      >
                        {item?.ex?.availableToBack?.[0]?.price ?? "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size16" : "f-size12"
                        } sessionRate2Box`}
                      >
                        {item?.ex?.availableToBack?.[0]?.size}
                      </span>
                    </div>
                    <div className="sessionRateBox">
                      <span className={`sessionMinBox`}>Min:{item?.min}</span>
                      <span className={`sessionMinBox`}>Max:{item?.max}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default SessionNormal;
