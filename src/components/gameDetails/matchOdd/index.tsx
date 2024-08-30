import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import isMobile from "../../../utils/screenDimension";
import "./style.scss"
import { selectedBetAction } from "../../../store/actions/match/matchListAction";

const MatchOdd=({title,type,data,detail})=>{
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
        <div className="matchOddContainer">
            <div className="matchOddTitle">
               <span className="matchOddTitleTxt">{title}</span>
            </div>


            <div className="matchOddBackLayTab">
                <div className="matchOddMinMaxBox">
                    <span className="matchOddMinMax">Min:{data?.minBet} Max:{data?.maxBet}</span>
                </div>
                <div className="matchOddBackLayBoxContainer">
                    <div className="matchOddBackBoxTab">
                        <span className={`${!isMobile ? "f-size18":"f-size14"} matchOddBackTxt`}>Back</span>
                    </div>
                    <div className="matchOddLayBoxTab">
                        <span className={`${!isMobile ? "f-size18":"f-size14"} matchOddBackTxt`}>Lay</span>
                    </div>
                    <div className="matchOddEmptyBox"></div>
                </div>
            </div>

            <div className="matchOddTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesMatchOdd"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtMatchOdd`}>
                SUSPENDED</span></div>}
              <div className="matchOddTeam">
                <span className={`${!isMobile ? "f-size16":"f-size12"} matchOddTeamTxt`}>{detail?.teamA}</span>
              </div>
              <div className="matchOddRateBox">
              {(data?.activeStatus === "live" && data?.runners?.[0]?.status !="ACTIVE") && <div className="suspended-overlayRatesMatchOdd"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtMatchOdd`}>
                SUSPENDED</span></div>}
                <div className="matchOddBackBox back3Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToBack?.[0]?.price,"back",detail?.teamA,data?.runners?.[0]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[0]?.size}</span>
                </div>
                <div className="matchOddBackBox back2Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToBack?.[1]?.price,"back",detail?.teamA,data?.runners?.[0]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[1]?.size}</span>
                </div>
                <div className="matchOddBackBox back1Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToBack?.[2]?.price,"back",detail?.teamA,data?.runners?.[0]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[0]?.ex?.availableToBack?.[2]?.size}</span>
                </div>
                <div className="matchOddBackBox lay1Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToLay?.[0]?.price,"lay",detail?.teamA,data?.runners?.[0]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[0]?.size}</span>
                </div>
                <div className="matchOddBackBox lay2Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToLay?.[1]?.price,"lay",detail?.teamA,data?.runners?.[0]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[1]?.size}</span>
                </div>
                <div className="matchOddBackBox lay3Background" onClick={()=> handlePlaceBet(data?.runners?.[0]?.ex?.availableToLay?.[2]?.price,"lay",detail?.teamA,data?.runners?.[0]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[0]?.ex?.availableToLay?.[2]?.size}</span>
                </div>
              </div>
            </div>
             
            <div className="matchOddTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesMatchOdd"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtMatchOdd`}>
                SUSPENDED</span></div>}
              <div className="matchOddTeam">
                <span className={`${!isMobile ? "f-size16":"f-size12"} matchOddTeamTxt`}>{detail?.teamB}</span>
              </div>
              <div className="matchOddRateBox">
              {(data?.activeStatus === "live" && data?.runners?.[1]?.status !="ACTIVE") && <div className="suspended-overlayRatesMatchOdd"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtMatchOdd`}>
                SUSPENDED</span></div>}
                <div className="matchOddBackBox back3Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToBack?.[0]?.price,"back",detail?.teamB,data?.runners?.[1]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[0]?.size}</span>
                </div>
                <div className="matchOddBackBox back2Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToBack?.[1]?.price,"back",detail?.teamB,data?.runners?.[1]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[1]?.size}</span>
                </div>
                <div className="matchOddBackBox back1Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToBack?.[2]?.price,"back",detail?.teamB,data?.runners?.[1]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[1]?.ex?.availableToBack?.[2]?.size}</span>
                </div>
                <div className="matchOddBackBox lay1Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToLay?.[0]?.price,"lay",detail?.teamB,data?.runners?.[1]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[0]?.size}</span>
                </div>
                <div className="matchOddBackBox lay2Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToLay?.[1]?.price,"lay",detail?.teamB,data?.runners?.[1]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[1]?.size}</span>
                </div>
                <div className="matchOddBackBox lay3Background" onClick={()=> handlePlaceBet(data?.runners?.[1]?.ex?.availableToLay?.[2]?.price,"lay",detail?.teamB,data?.runners?.[1]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[1]?.ex?.availableToLay?.[2]?.size}</span>
                </div>
              </div>
            </div>

            <div className="matchOddTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesMatchOdd"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtMatchOdd`}>
                SUSPENDED</span></div>}
              <div className="matchOddTeam">
                <span className={`${!isMobile ? "f-size16":"f-size12"} matchOddTeamTxt`}>{detail?.teamC}</span>
              </div>
              <div className="matchOddRateBox">
               {(data?.activeStatus === "live" && data?.runners?.[2]?.status !="ACTIVE") && <div className="suspended-overlayRatesMatchOdd"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtMatchOdd`}>
                SUSPENDED</span></div>}
                <div className="matchOddBackBox back3Background" onClick={()=> handlePlaceBet(data?.runners?.[2]?.ex?.availableToBack?.[0]?.price,"back",detail?.teamC,data?.runners?.[2]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[2]?.ex?.availableToBack?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[2]?.ex?.availableToBack?.[0]?.size}</span>
                </div>
                <div className="matchOddBackBox back2Background" onClick={()=> handlePlaceBet(data?.runners?.[2]?.ex?.availableToBack?.[1]?.price,"back",detail?.teamC,data?.runners?.[2]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[2]?.ex?.availableToBack?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[2]?.ex?.availableToBack?.[1]?.size}</span>
                </div>
                <div className="matchOddBackBox back1Background" onClick={()=> handlePlaceBet(data?.runners?.[2]?.ex?.availableToBack?.[2]?.price,"back",detail?.teamC,data?.runners?.[2]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[2]?.ex?.availableToBack?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[2]?.ex?.availableToBack?.[2]?.size}</span>
                </div>
                <div className="matchOddBackBox lay1Background" onClick={()=> handlePlaceBet(data?.runners?.[2]?.ex?.availableToLay?.[0]?.price,"lay",detail?.teamC,data?.runners?.[2]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[2]?.ex?.availableToLay?.[0]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[2]?.ex?.availableToLay?.[0]?.size}</span>
                </div>
                <div className="matchOddBackBox lay2Background" onClick={()=> handlePlaceBet(data?.runners?.[2]?.ex?.availableToLay?.[1]?.price,"lay",detail?.teamC,data?.runners?.[2]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[2]?.ex?.availableToLay?.[1]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[2]?.ex?.availableToLay?.[1]?.size}</span>
                </div>
                <div className="matchOddBackBox lay3Background" onClick={()=> handlePlaceBet(data?.runners?.[2]?.ex?.availableToLay?.[2]?.price,"lay",detail?.teamC,data?.runners?.[2]?.status)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} matchOddRate1Box`}>{data?.runners?.[2]?.ex?.availableToLay?.[2]?.price ?? '-'}</span>
                    <span className={`${!isMobile ? "f-size12":"f-size10"} matchOddRate2Box`}>{data?.runners?.[2]?.ex?.availableToLay?.[2]?.size}</span>
                </div>
              </div>
            </div>
           
        </div>
        </>
    )
}
export default MatchOdd;