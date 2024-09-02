import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { styleText } from "util";

const SessionOddEven = ({ title, data, detail,type }) => {
  const dispatch: AppDispatch = useDispatch();

  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    index: any
  ) => {
    if (data?.activeStatus != "live" || status != "ACTIVE") {
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
      betId: data?.id,
      eventType: detail?.matchType,
      matchId: detail?.id,
      matchBetType: data?.type,
      placeIndex: index,
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
      <div className="sessionOddEvenContainer">
        <div className="sessionOddEvenTitle">
          <span className="sessionOddEvenTitleTxt">{title}</span>
        </div>

        <div className="sessionOddEvenBoxContainer">
           <div className="sessionOddEvenTeam" style={{width:type!="OddEven"?"90%":"70%"}}>
            <span className={`sessionOddEvenTeamTxt ${isMobile ? "f-size12":"f-size16"}`}>rate box match rate</span>
           </div>
         <div className="sessionOddEvenRate back1Background">
         <span className={`sessionOddEvenRateTxt ${isMobile ? "f-size14":"f-size18"}`}>78.99</span>
         </div>
         {type==="OddEven" && <div className="sessionOddEvenRate back1Background">
         <span className={`sessionOddEvenRateTxt ${isMobile ? "f-size14":"f-size18"}`}>78.99</span>
         </div>}
         {type==="OddEven" && <div className="sessionOddEvenMinMax">
         <span className={`sessionOddEvenMinTxt`}>Min:78.99</span>
         <span className={`sessionOddEvenMinTxt`}>Max:78099</span>
         </div>}
        </div>

        
      </div>
    </>
  );
};
export default SessionOddEven;
