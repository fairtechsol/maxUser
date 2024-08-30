import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import isMobile from "../../../utils/screenDimension";
import "./style.scss"
import { AppDispatch } from "../../../store/store";

const Bookmaker=({title,box,data,detail})=>{
    
    const dispatch: AppDispatch = useDispatch();

    const handlePlaceBet=(odds:any,type:any,betTeam:any,status:any)=>{
        if(data?.activeStatus != "live" || status !="ACTIVE"){
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
        }
        dispatch(
            selectedBetAction({
              team,
              data,
            })
          );
    }

   
    return(
        <>
        <div className="bookmakerContainer">
            <div className="bookmakerTitle">
               <span className="bookmakerTitleTxt">{title}</span>
            </div>


            <div className="bookmakerBackLayTab">
                <div className="bookmakerMinMaxBox">
                    <span className="bookmakerMinMax">Min:{data?.minBet} Max:{data?.maxBet}</span>
                </div>
                <div className={box===6?"bookmaker1BackLayBoxContainer":"bookmaker2BackLayBoxContainer"}>
                    <div className={box===6?"bookmaker1BackBoxTab":"bookmaker2BackBoxTab"}>
                        <span className={`${!isMobile ? "f-size18":"f-size14"} bookmakerBackTxt`}>Back</span>
                    </div>
                    <div className={box===6?"bookmaker1LayBoxTab":"bookmaker2LayBoxTab"}>
                        <span className={`${!isMobile ? "f-size18":"f-size14"} bookmakerBackTxt`}>Lay</span>
                    </div>
                    {box ===6 && (<div className="bookmakerEmptyBox"></div>)}
                </div>
            </div>

            <div className="bookmakerTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesBookmaker"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtBookmaker`}>
                SUSPENDED</span></div>}
              <div className="bookmakerTeam">
                <span className={`${!isMobile ? "f-size16":"f-size12"} bookmakerTeamTxt`}>{detail?.teamA}</span>
              </div>
              <div className={box===6?"bookmaker1RateBox":"bookmaker2RateBox"}>
              {(data?.activeStatus === "live" && data?.runners?.[0]?.status !="ACTIVE") && <div className="suspended-overlayRatesBookmaker"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtBookmaker`}>
                SUSPENDED</span></div>}
              {box ===6 && (<div className="bookmakerBackBox back3Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToBack?.[0]?.price,"back",detail?.teamA,data?.runners?.[0]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[0]?.size}</span>
                </div>)}
                {box ===6 && ( <div className="bookmakerBackBox back2Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToBack?.[1]?.price,"back",detail?.teamA,data?.runners?.[0]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[1]?.size}</span>
                </div>)}
                <div className="bookmakerBackBox back1Background" onClick={()=> handlePlaceBet(box ===6 ?data?.runners?.[0]?.ex?.availableToBack?.[2]?.price : data?.runners?.[0]?.ex?.availableToBack?.[0]?.price,"back",detail?.teamA,data?.runners?.[0]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{box ===6 ? data?.runners?.[0]?.ex?.availableToBack?.[2]?.price ?? '-' : data?.runners?.[0]?.ex?.availableToBack?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{box ===6 ? data?.runners?.[0]?.ex?.availableToBack?.[2]?.size : data?.runners?.[0]?.ex?.availableToBack?.[0]?.size}</span>
                </div>
                <div className="bookmakerBackBox lay1Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToLay?.[0]?.price,"lay",detail?.teamA,data?.runners?.[0]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[0]?.size}</span>
                </div>
                {box ===6 && (<div className="bookmakerBackBox lay2Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToLay?.[1]?.price,"lay",detail?.teamA,data?.runners?.[0]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[1]?.size}</span>
                </div>)}
                {box ===6 && (<div className="bookmakerBackBox lay3Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToLay?.[2]?.price,"lay",detail?.teamA,data?.runners?.[0]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[2]?.size}</span>
                </div>)}
              </div>
            </div>
             
            <div className="bookmakerTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesBookmaker"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtBookmaker`}>
                SUSPENDED</span></div>}
              <div className="bookmakerTeam">
                <span className={`${!isMobile ? "f-size16":"f-size12"} bookmakerTeamTxt`}>{detail?.teamB}</span>
              </div>
              <div className={box===6?"bookmaker1RateBox":"bookmaker2RateBox"}>
              {(data?.activeStatus === "live" && data?.runners?.[1]?.status !="ACTIVE") && <div className="suspended-overlayRatesBookmaker"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtBookmaker`}>
                SUSPENDED</span></div>}
              {box ===6 && (<div className="bookmakerBackBox back3Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToBack?.[0]?.price,"back",detail?.teamB,data?.runners?.[1]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[0]?.size}</span>
                </div>)}
                {box ===6 && ( <div className="bookmakerBackBox back2Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToBack?.[1]?.price,"back",detail?.teamB,data?.runners?.[1]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[1]?.size}</span>
                </div>)}
                <div className="bookmakerBackBox back1Background" onClick={()=> handlePlaceBet(box ===6 ?data?.runners?.[1]?.ex?.availableToBack?.[2]?.price : data?.runners?.[1]?.ex?.availableToBack?.[0]?.price,"back",detail?.teamB,data?.runners?.[1]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{box ===6 ? data?.runners?.[1]?.ex?.availableToBack?.[2]?.price ?? '-' : data?.runners?.[1]?.ex?.availableToBack?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{box ===6 ? data?.runners?.[1]?.ex?.availableToBack?.[2]?.size : data?.runners?.[1]?.ex?.availableToBack?.[0]?.size}</span>
                </div>
                <div className="bookmakerBackBox lay1Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToLay?.[0]?.price,"lay",detail?.teamB,data?.runners?.[1]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[0]?.size}</span>
                </div>
                {box ===6 && (<div className="bookmakerBackBox lay2Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToLay?.[1]?.price,"lay",detail?.teamB,data?.runners?.[1]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[1]?.size}</span>
                </div>)}
                {box ===6 && (<div className="bookmakerBackBox lay3Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToLay?.[2]?.price,"lay",detail?.teamB,data?.runners?.[1]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[2]?.size}</span>
                </div>)}
              </div>
            </div>
             

            <div className="bookmakerTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesBookmaker"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtBookmaker`}>
                SUSPENDED</span></div>}
              <div className="bookmakerTeam">
                <span className={`${!isMobile ? "f-size16":"f-size12"} bookmakerTeamTxt`}>{detail?.teamC}</span>
              </div>
              <div className={box===6?"bookmaker1RateBox":"bookmaker2RateBox"}>
              {(data?.activeStatus === "live" && data?.runners?.[2]?.status !="ACTIVE") && <div className="suspended-overlayRatesBookmaker"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtBookmaker`}>
                SUSPENDED</span></div>}
              {box ===6 && (<div className="bookmakerBackBox back3Background" onClick={()=> handlePlaceBet(data?.runners?.[2]?.ex?.availableToBack?.[0]?.price,"back",detail?.teamC,data?.runners?.[2]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[0]?.size}</span>
                </div>)}
                {box ===6 && ( <div className="bookmakerBackBox back2Background" onClick={()=> handlePlaceBet(data?.runners?.[2]?.ex?.availableToBack?.[1]?.price,"back",detail?.teamC,data?.runners?.[2]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[2]?.ex?.availableToBack?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[2]?.ex?.availableToBack?.[1]?.size}</span>
                </div>)}
                <div className="bookmakerBackBox back1Background" onClick={()=> handlePlaceBet(box ===6 ?data?.runners?.[2]?.ex?.availableToBack?.[2]?.price : data?.runners?.[2]?.ex?.availableToBack?.[0]?.price,"back",detail?.teamC,data?.runners?.[2]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{box ===6 ? data?.runners?.[2]?.ex?.availableToBack?.[2]?.price  ?? '-' : data?.runners?.[2]?.ex?.availableToBack?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{box ===6 ? data?.runners?.[2]?.ex?.availableToBack?.[2]?.size : data?.runners?.[2]?.ex?.availableToBack?.[0]?.size}</span>
                </div>
                <div className="bookmakerBackBox lay1Background" onClick={()=> handlePlaceBet(data?.runners?.[2]?.ex?.availableToLay?.[0]?.price,"lay",detail?.teamC,data?.runners?.[2]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[2]?.ex?.availableToLay?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[2]?.ex?.availableToLay?.[0]?.size}</span>
                </div>
                {box ===6 && (<div className="bookmakerBackBox lay2Background" onClick={()=> handlePlaceBet(data?.runners?.[2]?.ex?.availableToLay?.[1]?.price,"lay",detail?.teamC,data?.runners?.[2]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[2]?.ex?.availableToLay?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[2]?.ex?.availableToLay?.[1]?.size}</span>
                </div>)}
                {box ===6 && (<div className="bookmakerBackBox lay3Background" onClick={()=> handlePlaceBet(data?.runners?.[2]?.ex?.availableToLay?.[2]?.price,"lay",detail?.teamC,data?.runners?.[2]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} bookmakerRate1Box`}>{data?.runners?.[2]?.ex?.availableToLay?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} bookmakerRate2Box`}>{data?.runners?.[2]?.ex?.availableToLay?.[2]?.size}</span>
                </div>)}
              </div>
            </div>
            {data?.rem && 
            <div className="bookmakerRemarkTab"> 
            <div className="remark-content">
            {data?.rem}
            </div>
            </div>}
           
        </div>
        </>
    )
}
export default Bookmaker;