import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {isLap, isMobile} from "../../../utils/screenDimension";
import "./style.scss"
import { selectedBetAction } from "../../../store/actions/match/matchListAction";

const ManualMarket=({title,data,detail})=>{
    const dispatch: AppDispatch = useDispatch();
    const handlePlaceBet=(odds:any,type:any,betTeam:any,status:any,index:any)=>{
        if(data?.activeStatus != "live" || status !="active"){
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
            placeIndex:index
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
        <div className="manualContainer" style={{marginTop:isMobile?"":"10px"}}>
            <div className="manualTitle">
               <span className="manualTitleTxt">{title}</span>
            </div>


            <div className="manualBackLayTab">
                <div className="manualMinMaxBox">
                    <span className="manualMinMax">Min:{formatNumber(data?.minBet)} Max:{formatNumber(data?.maxBet)}</span>
                </div>
                <div className="manualBackLayBoxContainer" style={{width:isMobile?"24%":"48%"}}>
                    <div className="manualBackBoxTab" style={{width:isMobile?"50%":"25%"}}>
                        <span className={`f-size16 manualBackTxt`}>Back</span>
                    </div>
                    <div className="manualLayBoxTab" style={{width:isMobile?"50%":"25%"}}>
                        <span className={`f-size16 manualBackTxt`}>Lay</span>
                    </div>
                   {!isMobile && <div className="manualEmptyBox"></div>}
                </div>
            </div>

            <div className="manualTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesmanual"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtmanual`}>
                </span></div>}
              <div className="manualTeam">
                <span className={`${!isMobile ? "f-size14":"f-size13"} manualTeamTxt`}>{data?.type?.includes('quickbookmaker')?detail?.teamA :"Yes"}</span>
              </div>
              <div className="manualRateBox" style={{width:isMobile?"24%":"72%"}}>
              {(data?.activeStatus === "live" && data?.statusTeamA !="active") && <div className="suspended-overlayRatesmanual"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtmanual`}>
                SUSPENDED</span></div>}
              {!isMobile &&  <div className="manualBackBox back3Background" onClick={()=> handlePlaceBet(data?.backTeamA-2,"BACK",data?.type?.includes('quickbookmaker')?detail?.teamA :"Yes",data?.statusTeamA,2)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.backTeamA !=0 ?data?.backTeamA-2 : '-'}</span>
                </div>}
                {!isMobile && <div className="manualBackBox back2Background" onClick={()=> handlePlaceBet(data?.backTeamA-1,"BACK",data?.type?.includes('quickbookmaker')?detail?.teamA :"Yes",data?.statusTeamA,1)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.backTeamA !=0 ?data?.backTeamA-1 : '-'}</span>
                </div>}
                <div className="manualBackBox back1Background" onClick={()=> handlePlaceBet(data?.backTeamA,"BACK",data?.type?.includes('quickbookmaker')?detail?.teamA :"Yes",data?.statusTeamA,0)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.backTeamA !=0 ?data?.backTeamA : '-'}</span>
                </div>
                <div className="manualBackBox lay1Background" onClick={()=> handlePlaceBet(data?.layTeamA,"LAY",data?.type?.includes('quickbookmaker')?detail?.teamA :"No",data?.statusTeamA,0)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.layTeamA !=0 ?data?.layTeamA : '-'}</span>
                </div>
               {!isMobile && <div className="manualBackBox lay2Background" onClick={()=> handlePlaceBet(data?.layTeamA+1,"LAY",data?.type?.includes('quickbookmaker')?detail?.teamA :"No",data?.statusTeamA,1)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.layTeamA !=0 ?data?.layTeamA+1 : '-'}</span>
                </div>}
              {!isMobile && <div className="manualBackBox lay3Background" onClick={()=> handlePlaceBet(data?.layTeamA+2,"LAY",data?.type?.includes('quickbookmaker')?detail?.teamA :"No",data?.statusTeamA,2)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.layTeamA !=0 ?data?.layTeamA+2 : '-'}</span>
                </div>}
              </div>
            </div>
             
            <div className="manualTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesmanual"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtmanual`}>
                </span></div>}
              <div className="manualTeam">
                <span className={`${!isMobile ? "f-size14":"f-size13"} manualTeamTxt`}>{data?.type?.includes('quickbookmaker')?detail?.teamB :"No"}</span>
              </div>
              <div className="manualRateBox" style={{width:isMobile?"24%":"72%"}}>
              {(data?.activeStatus === "live" && data?.statusTeamB !="active") && <div className="suspended-overlayRatesmanual"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtmanual`}>
                SUSPENDED</span></div>}
               {!isMobile && <div className="manualBackBox back3Background" onClick={()=> handlePlaceBet(data?.backTeamB-2,"BACK",data?.type?.includes('quickbookmaker')?detail?.teamB :"Yes",data?.statusTeamB,2)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.backTeamB !=0 ?data?.backTeamB-2 : '-'}</span>
                </div>}
              {!isMobile &&  <div className="manualBackBox back2Background" onClick={()=> handlePlaceBet(data?.backTeamB-1,"BACK",data?.type?.includes('quickbookmaker')?detail?.teamB :"Yes",data?.statusTeamB,1)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.backTeamB !=0 ?data?.backTeamB-1 : '-'}</span>
                </div>}
                <div className="manualBackBox back1Background" onClick={()=> handlePlaceBet(data?.backTeamB,"BACK",data?.type?.includes('quickbookmaker')?detail?.teamB :"Yes",data?.statusTeamB,0)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.backTeamB !=0 ?data?.backTeamB : '-'}</span>
                </div>
                <div className="manualBackBox lay1Background" onClick={()=> handlePlaceBet(data?.layTeamB,"LAY",data?.type?.includes('quickbookmaker')?detail?.teamB :"No",data?.statusTeamB,0)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.layTeamB !=0 ?data?.layTeamB : '-'}</span>
                </div>
               {!isMobile && <div className="manualBackBox lay2Background" onClick={()=> handlePlaceBet(data?.layTeamB+1,"LAY",data?.type?.includes('quickbookmaker')?detail?.teamB :"No",data?.statusTeamB,1)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.layTeamB !=0 ?data?.layTeamB+1 : '-'}</span>
                </div>}
               {!isMobile && <div className="manualBackBox lay3Background" onClick={()=> handlePlaceBet(data?.layTeamB+2,"LAY",data?.type?.includes('quickbookmaker')?detail?.teamB :"No",data?.statusTeamB,2)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.layTeamB !=0 ?data?.layTeamB+2 : '-'}</span>
                </div>}
              </div>
            </div>


         {(data?.type?.includes('quickbookmaker') && detail?.teamC) &&  <div className="manualTeamTab">
            {data?.activeStatus != "live" && <div className="suspended-overlayRatesmanual"><span className={`${!isMobile ? "f-size18":"f-size16"} suspendedTxtmanual`}>
                </span></div>}
              <div className="manualTeam">
                <span className={`${!isMobile ? "f-size14":"f-size13"} manualTeamTxt`}>{detail?.teamC}</span>
              </div>
              <div className="manualRateBox" style={{width:isMobile?"24%":"72%"}}>
              {(data?.activeStatus === "live" && data?.statusTeamB !="active") && <div className="suspended-overlayRatesmanual"><span className={`${!isMobile ? "f-size18":"f-size12"} suspendedTxtmanual`}>
                SUSPENDED</span></div>}
               {!isMobile && <div className="manualBackBox back3Background" onClick={()=> handlePlaceBet(data?.backTeamC-2,"BACK",detail?.teamC,data?.statusTeamC,2)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.backTeamC !=0 ?data?.backTeamC-2 : '-'}</span>
                </div>}
              {!isMobile &&  <div className="manualBackBox back2Background" onClick={()=> handlePlaceBet(data?.backTeamC-1,"BACK",detail?.teamC,data?.statusTeamC,1)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.backTeamC !=0 ?data?.backTeamC-1 : '-'}</span>
                </div>}
                <div className="manualBackBox back1Background" onClick={()=> handlePlaceBet(data?.backTeamC,"BACK",detail?.teamC,data?.statusTeamC,0)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.backTeamC !=0 ?data?.backTeamC : '-'}</span>
                </div>
                <div className="manualBackBox lay1Background" onClick={()=> handlePlaceBet(data?.layTeamC,"LAY",detail?.teamC,data?.statusTeamC,0)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.layTeamC !=0 ?data?.layTeamC : '-'}</span>
                </div>
               {!isMobile && <div className="manualBackBox lay2Background" onClick={()=> handlePlaceBet(data?.layTeamC+1,"LAY",detail?.teamC,data?.statusTeamC,1)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.layTeamC !=0 ?data?.layTeamC+1 : '-'}</span>
                </div>}
               {!isMobile && <div className="manualBackBox lay3Background" onClick={()=> handlePlaceBet(data?.layTeamC+2,"LAY",detail?.teamC,data?.statusTeamC,2)}>
                    <span className={`${!isMobile ? "f-size18":isLap ? "f-size16":"f-size15"} manualRate1Box`}>{data?.layTeamC !=0 ?data?.layTeamC+2 : '-'}</span>
                </div>}
              </div>
            </div>}
           
        </div>
        </>
    )
}
export default ManualMarket;