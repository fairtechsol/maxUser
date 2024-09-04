import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {isLap, isMobile} from "../../../utils/screenDimension";
import "./style.scss"
import { selectedBetAction } from "../../../store/actions/match/matchListAction";

const DynamicMarket=({title,data,detail})=>{
    const dispatch: AppDispatch = useDispatch();

    const handlePlaceBet=(odds:any,type:any,betTeam:any,status:any,index:any,runner:any)=>{
        if(data?.activeStatus != "live" || status !="ACTIVE"){
            return false;
        }
        if(odds === 0){
          return false;
      }
        let team ={
            betOnTeam:betTeam,
            rate:odds,
            type:type,
            stake:0,
            teamA:detail?.teamA,
            teamB:detail?.teamB,
            teamC:detail?.teamC,
            betId:data?.id,
            eventType:detail?.matchType,
            matchId:detail?.id,
            matchBetType:data?.type,
            placeIndex:index,
            mid: data?.mid?.toString(),
            selectionId:runner?.selectionId?.toString()
        }
        dispatch(
            selectedBetAction({
              team,
              data,
            })
          );
    }
    const formatNumber = (num:any) => {
        if (num >= 1000 && num < 1000000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        } else if (num >= 100000) {
          return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
        }
        return num.toString();
      };
   
    return(
        <>
        <div className="dynamicContainer">
            <div className="dynamicTitle">
               <span className="dynamicTitleTxt">{title}</span>
            </div>


            <div className="dynamicBackLayTab">
                <div className="dynamicMinMaxBox">
                    <span className="dynamicMinMax">Min:{formatNumber(data?.minBet)} Max:{formatNumber(data?.maxBet)}</span>
                </div>
                <div className="dynamicBackLayBoxContainer" style={{width:isMobile?"24%":"48%"}}>
                    <div className="dynamicBackBoxTab" style={{width:isMobile?"50%":"25%"}}>
                        <span className={`${!isMobile ? "f-size18":"f-size14"} dynamicBackTxt`}>Back</span>
                    </div>
                    <div className="dynamicLayBoxTab" style={{width:isMobile?"50%":"25%"}}>
                        <span className={`${!isMobile ? "f-size18":"f-size14"} dynamicBackTxt`}>Lay</span>
                    </div>
                  {!isMobile &&  <div className="dynamicEmptyBox"></div>}
                </div>
            </div>

            <div className="dynamicTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesdynamic"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtdynamic`}>
                SUSPENDED</span></div>}
              <div className="dynamicTeam"  style={{width:isMobile?"76%":"28%"}}>
                <span className={`${!isMobile ? "f-size14":"f-size13"} dynamicTeamTxt`}>{"Yes"}</span>
              </div>
              <div className="dynamicRateBox" style={{width:isMobile?"24%":"72%"}}>
              {(data?.activeStatus === "live" && data?.runners?.[0]?.status !="ACTIVE") && <div className="suspended-overlayRatesdynamic"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtdynamic`}>
                SUSPENDED</span></div>}
               {!isMobile && <div className="dynamicBackBox back3Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToBack?.[0]?.price,"BACK","Yes",data?.runners?.[0]?.status,data?.runners?.[0]?.ex?.availableToBack?.[0]?.tno,data?.runners?.[0])}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} dynamicRate1Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size11"} dynamicRate2Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[0]?.size}</span>
                </div>}
               {!isMobile && <div className="dynamicBackBox back2Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToBack?.[1]?.price,"BACK","Yes",data?.runners?.[0]?.status,data?.runners?.[0]?.ex?.availableToBack?.[1]?.tno,data?.runners?.[0])}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} dynamicRate1Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size11"} dynamicRate2Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[1]?.size}</span>
                </div>}
                <div className="dynamicBackBox back1Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToBack?.[2]?.price,"BACK","Yes",data?.runners?.[0]?.status,data?.runners?.[0]?.ex?.availableToBack?.[2]?.tno,data?.runners?.[0])}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} dynamicRate1Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size11"} dynamicRate2Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[2]?.size}</span>
                </div>
                <div className="dynamicBackBox lay1Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToLay?.[0]?.price,"LAY","Yes",data?.runners?.[0]?.status,data?.runners?.[0]?.ex?.availableToBack?.[0]?.tno,data?.runners?.[0])}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} dynamicRate1Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size11"} dynamicRate2Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[0]?.size}</span>
                </div>
               {!isMobile && <div className="dynamicBackBox lay2Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToLay?.[1]?.price,"LAY","Yes",data?.runners?.[0]?.status,data?.runners?.[0]?.ex?.availableToLay?.[1]?.tno,data?.runners?.[0])}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} dynamicRate1Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size11"} dynamicRate2Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[1]?.size}</span>
                </div>}
               {!isMobile && <div className="dynamicBackBox lay3Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToLay?.[2]?.price,"LAY","Yes",data?.runners?.[0]?.status,data?.runners?.[0]?.ex?.availableToLay?.[2]?.tno,data?.runners?.[0])}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} dynamicRate1Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size11"} dynamicRate2Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[2]?.size}</span>
                </div>}
              </div>
            </div>
             
            <div className="dynamicTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesdynamic"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtdynamic`}>
                SUSPENDED</span></div>}
              <div className="dynamicTeam"  style={{width:isMobile?"76%":"28%"}}>
                <span className={`${!isMobile ? "f-size14":"f-size13"} dynamicTeamTxt`}>{"No"}</span>
              </div>
              <div className="dynamicRateBox" style={{width:isMobile?"24%":"72%"}}>
              {(data?.activeStatus === "live" && data?.runners?.[1]?.status !="ACTIVE") && <div className="suspended-overlayRatesdynamic"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtdynamic`}>
                SUSPENDED</span></div>}
               {!isMobile && <div className="dynamicBackBox back3Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToBack?.[0]?.price,"BACK","No",data?.runners?.[1]?.status,data?.runners?.[1]?.ex?.availableToBack?.[0]?.tno,data?.runners?.[1])}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} dynamicRate1Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size11"} dynamicRate2Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[0]?.size}</span>
                </div>}
               {!isMobile && <div className="dynamicBackBox back2Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToBack?.[1]?.price,"BACK","No",data?.runners?.[1]?.status,data?.runners?.[1]?.ex?.availableToBack?.[1]?.tno,data?.runners?.[1])}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} dynamicRate1Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size11"} dynamicRate2Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[1]?.size}</span>
                </div>}
                <div className="dynamicBackBox back1Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToBack?.[2]?.price,"BACK","No",data?.runners?.[1]?.status,data?.runners?.[1]?.ex?.availableToBack?.[2]?.tno,data?.runners?.[1])}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} dynamicRate1Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size11"} dynamicRate2Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[2]?.size}</span>
                </div>
                <div className="dynamicBackBox lay1Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToLay?.[0]?.price,"LAY","No",data?.runners?.[1]?.status,data?.runners?.[1]?.ex?.availableToLay?.[0]?.tno,data?.runners?.[1])}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} dynamicRate1Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size11"} dynamicRate2Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[0]?.size}</span>
                </div>
              {!isMobile && <div className="dynamicBackBox lay2Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToLay?.[1]?.price,"LAY","No",data?.runners?.[1]?.status,data?.runners?.[1]?.ex?.availableToLay?.[1]?.tno,data?.runners?.[1])}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} dynamicRate1Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size11"} dynamicRate2Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[1]?.size}</span>
                </div>}
               {!isMobile && <div className="dynamicBackBox lay3Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToLay?.[2]?.price,"LAY","No",data?.runners?.[1]?.status,data?.runners?.[1]?.ex?.availableToLay?.[2]?.tno,data?.runners?.[1])}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} dynamicRate1Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size11"} dynamicRate2Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[2]?.size}</span>
                </div>}
              </div>
            </div>

          
           
        </div>
        </>
    )
}
export default DynamicMarket;