import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";

const MobileSessionFancy = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();

  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    value: any,
    item:any,
    tno:any
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
      name: item?.RunnerName,
      eventType: detail?.matchType,
      matchId: detail?.id,
      percent: value,
      mid: data?.mid?.toString(),
      betPlaceIndex:tno,
      matchBetType:"session"
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
           <div className="sessionYesNoBoxContainer">
              <div className="sessionYesNoBox">
                <div className="sessionYesBox back1Background" style={{width:"100%"}}>
                  <span
                    className={`f-size14 sessionBackTxt`}
                  >
                    Back
                  </span>
                </div>
                <div className="sessionYesBox lay1Background" style={{width:"100%"}}>
                  <span
                    className={`f-size14 sessionBackTxt`}
                  >
                    Lay
                  </span>
                </div>
                {/* <div className="sessionEmptyBox"></div> */}
              </div>
            </div>
            {data?.section?.map((item: any, index: any) => {
              return (
                <div className="sessionRateContainer" key={index}>
                  <div className="sessionRateName">
                    <span className="f-size13">{item?.RunnerName}</span>
                  </div>
                  <div className="sessionRateBoxContainer">
                  {(item?.activeStatus != "live" || item?.GameStatus != "") && <div className="suspended-overlayRates"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtMatchOdd`}>
                  {item?.GameStatus ?? "SUSPENDED"}</span></div>}
                    <div className={`sessionRateBox back1Background`} style={{cursor:"pointer"}} onClick={()=> handlePlaceBet(item?.ex?.availableToBack?.[0]?.price,"Back","Back",item?.activeStatus,item?.ex?.availableToBack?.[0]?.price ,item,item?.ex?.availableToBack?.[0]?.tno)}>
                      <span
                        className={`f-size15 sessionRate1Box`}
                      >
                        {item?.ex?.availableToBack?.[0]?.price ?? "-"}
                      </span>
                      <span
                        className={`f-size11 sessionRate2Box`}
                      >
                        {item?.ex?.availableToBack?.[0]?.size}
                      </span>
                    </div>
                    <div className="sessionRateBox lay1Background" style={{cursor:"pointer"}} onClick={()=> handlePlaceBet(item?.ex?.availableToLay?.[0]?.price,"lay","Back",item?.activeStatus,item?.ex?.availableToLay?.[0]?.price ,item,item?.ex?.availableToBack?.[0]?.tno)}>
                      <span
                        className={`f-size15 sessionRate1Box`}
                      >
                        {item?.ex?.availableToLay?.[0]?.price ?? "-"}
                      </span>
                      <span
                        className={`f-size11 sessionRate2Box`}
                      >
                        {item?.ex?.availableToLay?.[0]?.size}
                      </span>
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
export default MobileSessionFancy;
