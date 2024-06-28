import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const CardBox = ({title, odds, data,bgColor }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet=(item:any)=>{
    let team ={
      "bettingType": "BACK",
      "matchId": data?.id,
      "odd": item?.b1,
      "stake": 0,
      "matchBetType": "matchOdd",
      "betOnTeam":item?.nat,
      "name":item?.nat,
      "bettingName": "Match odds",
      "selectionId": item?.sid
    }
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
    console.log('team',team)
  }
  return (
    <>
      <div className="abjcardContainer" style={{backgroundColor:bgColor,border:"0.5px solid #000"}} >
        <div style={{width:"20%",display:"flex",justifyContent:"center" ,alignItems: "center",borderRight:"0.5px solid #000" }}>
          <span style={{ fontSize: "16px"}}>
          {title}
          </span>
        </div>
        <div className="p-3">
          <CommonCardImg cardData={odds} cardInfo={data?.cardInfo} handleBet={handleBet} data={data}/>
        </div>
       
      </div>
    </>
  );
};

export default CardBox;
