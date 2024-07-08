import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const WinBox = ({ odds, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = odds?.[0]?.min;
  const max = odds?.[0]?.max;
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.b1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: item?.sid,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  const handleLock=(item:any)=>{
   
      if(item?.gstatus != "ACTIVE" || item?.b1 ==="0.00"){
        return true
      }else{
        return false
      }
    
  }
  return (
    <>
      <div className="winContainer-m">
        <div className="subwinContainer">
          {odds?.map((item: any, index: number) => {
            return (
              <>
                <div className="win-mainRateBox" key={index}>
                  <div>
                    <span className="f600">{item?.nat}</span>
                  </div>
                  <div className={`win-rateBox back-BackGround flex-column ${handleLock(item) ? 'suspended':""}`} onClick={()=> handleLock(item) ? null:handleBet(item) }>
                    <span className="rate-box">{odds?.[1]?.b1}</span>{" "}
                    <span className="casino-volume f400">0</span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div style={{ width: "100%", textAlign: "end", padding: "5px" }}>
          <span style={{ fontWeight: "bolder" }}>Min:</span>
          <span>{min}</span>
          <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
          <span>{max}</span>
        </div>
      </div>
    </>
  );
};

export default WinBox;
