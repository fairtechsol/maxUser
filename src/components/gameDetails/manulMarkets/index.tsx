import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import isMobile from "../../../utils/screenDimension";
import "./style.scss"
import { selectedBetAction } from "../../../store/actions/match/matchListAction";

const ManualMarket=({title,data,detail})=>{
    const dispatch: AppDispatch = useDispatch();
    const handlePlaceBet=(odds:any,type:any,betTeam:any,status:any,index:any)=>{
        if(data?.activeStatus != "live" || status !="active"){
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
            placeIndex:index
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
        <div className="manualContainer">
            <div className="manualTitle">
               <span className="manualTitleTxt">{title}</span>
            </div>


            <div className="manualBackLayTab">
                <div className="manualMinMaxBox">
                    <span className="manualMinMax">Min:{data?.minBet} Max:{data?.maxBet}</span>
                </div>
                <div className="manualBackLayBoxContainer" style={{width:isMobile?"24%":"48%"}}>
                    <div className="manualBackBoxTab" style={{width:isMobile?"50%":"25%"}}>
                        <span className={`${!isMobile ? "f-size18":"f-size14"} manualBackTxt`}>Back</span>
                    </div>
                    <div className="manualLayBoxTab" style={{width:isMobile?"50%":"25%"}}>
                        <span className={`${!isMobile ? "f-size18":"f-size14"} manualBackTxt`}>Lay</span>
                    </div>
                   {!isMobile && <div className="manualEmptyBox"></div>}
                </div>
            </div>

            <div className="manualTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesmanual"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtmanual`}>
                SUSPENDED</span></div>}
              <div className="manualTeam">
                <span className={`${!isMobile ? "f-size16":"f-size12"} manualTeamTxt`}>{"Yes"}</span>
              </div>
              <div className="manualRateBox" style={{width:isMobile?"24%":"72%"}}>
              {(data?.activeStatus === "live" && data?.statusTeamA !="active") && <div className="suspended-overlayRatesmanual"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtmanual`}>
                SUSPENDED</span></div>}
              {!isMobile &&  <div className="manualBackBox back3Background" onClick={()=> handlePlaceBet(data?.backTeamA-2,"BACK","Yes",data?.statusTeamA,2)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} manualRate1Box`}>{data?.backTeamA !=0 ?data?.backTeamA-2 : '-'}</span>
                </div>}
                {!isMobile && <div className="manualBackBox back2Background" onClick={()=> handlePlaceBet(data?.backTeamA-1,"BACK","Yes",data?.statusTeamA,1)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} manualRate1Box`}>{data?.backTeamA !=0 ?data?.backTeamA-1 : '-'}</span>
                </div>}
                <div className="manualBackBox back1Background" onClick={()=> handlePlaceBet(data?.backTeamA,"BACK","Yes",data?.statusTeamA,0)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} manualRate1Box`}>{data?.backTeamA !=0 ?data?.backTeamA : '-'}</span>
                </div>
                <div className="manualBackBox lay1Background" onClick={()=> handlePlaceBet(data?.layTeamA,"LAY","Yes",data?.statusTeamA,0)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} manualRate1Box`}>{data?.layTeamA !=0 ?data?.layTeamA : '-'}</span>
                </div>
               {!isMobile && <div className="manualBackBox lay2Background" onClick={()=> handlePlaceBet(data?.layTeamA+1,"LAY","Yes",data?.statusTeamA,1)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} manualRate1Box`}>{data?.layTeamA !=0 ?data?.layTeamA+1 : '-'}</span>
                </div>}
              {!isMobile && <div className="manualBackBox lay3Background" onClick={()=> handlePlaceBet(data?.layTeamA+2,"LAY","Yes",data?.statusTeamA,2)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} manualRate1Box`}>{data?.layTeamA !=0 ?data?.layTeamA+2 : '-'}</span>
                </div>}
              </div>
            </div>
             
            <div className="manualTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesmanual"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtmanual`}>
                SUSPENDED</span></div>}
              <div className="manualTeam">
                <span className={`${!isMobile ? "f-size16":"f-size12"} manualTeamTxt`}>{"No"}</span>
              </div>
              <div className="manualRateBox" style={{width:isMobile?"24%":"72%"}}>
              {(data?.activeStatus === "live" && data?.statusTeamB !="active") && <div className="suspended-overlayRatesmanual"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtmanual`}>
                SUSPENDED</span></div>}
               {!isMobile && <div className="manualBackBox back3Background" onClick={()=> handlePlaceBet(data?.backTeamB-2,"BACK","No",data?.statusTeamB,2)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} manualRate1Box`}>{data?.backTeamB !=0 ?data?.backTeamB-2 : '-'}</span>
                </div>}
              {!isMobile &&  <div className="manualBackBox back2Background" onClick={()=> handlePlaceBet(data?.backTeamB-1,"BACK","No",data?.statusTeamB,1)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} manualRate1Box`}>{data?.backTeamB !=0 ?data?.backTeamB-1 : '-'}</span>
                </div>}
                <div className="manualBackBox back1Background" onClick={()=> handlePlaceBet(data?.backTeamB,"BACK","No",data?.statusTeamB,0)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} manualRate1Box`}>{data?.backTeamB !=0 ?data?.backTeamB : '-'}</span>
                </div>
                <div className="manualBackBox lay1Background" onClick={()=> handlePlaceBet(data?.layTeamB,"LAY","No",data?.statusTeamB,0)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} manualRate1Box`}>{data?.layTeamB !=0 ?data?.layTeamB : '-'}</span>
                </div>
               {!isMobile && <div className="manualBackBox lay2Background" onClick={()=> handlePlaceBet(data?.layTeamB+1,"LAY","No",data?.statusTeamB,1)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} manualRate1Box`}>{data?.layTeamB !=0 ?data?.layTeamB+1 : '-'}</span>
                </div>}
               {!isMobile && <div className="manualBackBox lay3Background" onClick={()=> handlePlaceBet(data?.layTeamB+2,"LAY","No",data?.statusTeamB,2)}>
                    <span className={`${!isMobile ? "f-size18":"f-size12"} manualRate1Box`}>{data?.layTeamB !=0 ?data?.layTeamB+2 : '-'}</span>
                </div>}
              </div>
            </div>
           
        </div>
        </>
    )
}
export default ManualMarket;