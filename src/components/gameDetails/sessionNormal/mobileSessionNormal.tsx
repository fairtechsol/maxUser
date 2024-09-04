import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";

const MobileSessionNormal = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();

  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    value: any,
    item:any,
    tno:any,
    teamName?:any
  ) => {
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
      matchBetType:"session",
      betPlaceIndex:tno,
      mid:data?.mid?.toString(),
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
                <div className="sessionYesBox lay1Background" style={{width:"100%"}}>
                  <span
                    className={`${
                      !isMobile ? "f-size18" : "f-size14"
                    } sessionBackTxt`}
                  >
                    No
                  </span>
                </div>
                <div className="sessionYesBox back1Background" style={{width:"100%"}}>
                  <span
                    className={`${
                      !isMobile ? "f-size18" : "f-size14"
                    } sessionBackTxt`}
                  >
                    Yes
                  </span>
                </div>
                
              </div>
            </div>
            {data?.section?.map((item: any, index: any) => {
              return (
                <div className="sessionRateContainer" key={index}>
                  <div className="sessionRateName">
                    <span className="f-size16">{item?.RunnerName}</span>
                  </div>
                  <div className="sessionRateBoxContainer">
                  {(item?.activeStatus != "live" || item?.GameStatus != "") && <div className="suspended-overlayRates"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtMatchOdd`}>
                  {item?.GameStatus ?? "SUSPENDED"}</span></div>}
                  <div style={{width:"100%",display:"flex",flexDirection:"column",borderRight:"1px solid #c7c8ca"}}>
                    <div className={`sessionRateBox lay1Background`} style={{cursor:"pointer"}} onClick={()=> handlePlaceBet(item?.ex?.availableToLay?.[0]?.price,"no","NO",item?.activeStatus,item?.ex?.availableToLay?.[0]?.size,item,item?.ex?.availableToLay?.[0]?.tno)}>
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
                   {item?.ex?.availableToLay?.length > 1 && <div className={`sessionRateBox lay1Background`} style={{cursor:"pointer"}} onClick={()=> handlePlaceBet(item?.ex?.availableToLay?.[1]?.price,"no","NO",item?.activeStatus,item?.ex?.availableToLay?.[1]?.size,item,item?.ex?.availableToLay?.[1]?.tno)}>
                      <span
                        className={`${
                          !isMobile ? "f-size18" : "f-size12"
                        } sessionRate1Box`}
                      >
                        {item?.ex?.availableToLay?.[1]?.price ?? "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size16" : "f-size12"
                        } sessionRate2Box`}
                      >
                        {item?.ex?.availableToLay?.[1]?.size}
                      </span>
                    </div>}
                    {item?.ex?.availableToLay?.length > 2 &&  <div className={`sessionRateBoxlay1Background`} style={{cursor:"pointer"}} onClick={()=> handlePlaceBet(item?.ex?.availableToLay?.[2]?.price,"no","NO",item?.activeStatus,item?.ex?.availableToLay?.[2]?.size,item,item?.ex?.availableToLay?.[2]?.tno)}>
                      <span
                        className={`${
                          !isMobile ? "f-size18" : "f-size12"
                        } sessionRate1Box`}
                      >
                        {item?.ex?.availableToLay?.[2]?.price ?? "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size16" : "f-size12"
                        } sessionRate2Box`}
                      >
                        {item?.ex?.availableToLay?.[2]?.size}
                      </span>
                    </div>}
                    </div>
                    <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
                    <div className="sessionRateBox back1Background" style={{cursor:"pointer"}} onClick={()=> handlePlaceBet(item?.ex?.availableToBack?.[0]?.price,"Yes","YES",item?.activeStatus,item?.ex?.availableToBack?.[0]?.size,item,item?.ex?.availableToBack?.[0]?.tno)}>
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
                    {item?.ex?.availableToBack?.length > 1 && <div className="sessionRateBox back1Background" style={{cursor:"pointer"}} onClick={()=> handlePlaceBet(item?.ex?.availableToBack?.[1]?.price,"Yes","YES",item?.activeStatus,item?.ex?.availableToBack?.[1]?.size,item,item?.ex?.availableToBack?.[1]?.tno)}>
                      <span
                        className={`${
                          !isMobile ? "f-size18" : "f-size12"
                        } sessionRate1Box`}
                      >
                        {item?.ex?.availableToBack?.[1]?.price ?? "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size16" : "f-size12"
                        } sessionRate2Box`}
                      >
                        {item?.ex?.availableToBack?.[1]?.size}
                      </span>
                    </div>}
                    {item?.ex?.availableToBack?.length > 2 && <div className="sessionRateBox back1Background" style={{cursor:"pointer"}} onClick={()=> handlePlaceBet(item?.ex?.availableToBack?.[2]?.price,"Yes","YES",item?.activeStatus,item?.ex?.availableToBack?.[2]?.size,item,item?.ex?.availableToBack?.[2]?.tno)}>
                      <span
                        className={`${
                          !isMobile ? "f-size18" : "f-size12"
                        } sessionRate1Box`}
                      >
                        {item?.ex?.availableToBack?.[2]?.price ?? "-"}
                      </span>
                      <span
                        className={`${
                          !isMobile ? "f-size16" : "f-size12"
                        } sessionRate2Box`}
                      >
                        {item?.ex?.availableToBack?.[2]?.size}
                      </span>
                    </div>
            }
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
export default MobileSessionNormal;
