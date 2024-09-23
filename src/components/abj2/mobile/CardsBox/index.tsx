import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const CardBox = ({ cards, data }: any) => {
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
  }
  return (
    <>
      <div className="cardContainer">
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "14px"}}>
          {/* {parseFloat(isNaN(cards?.[0]?.b1)?0:cards?.[0]?.b1)} */}
          </span>
        </div>
        <div>
          <CommonCardImg cardData={cards} handleBet={handleBet} data={data}/>
        </div>
       
      </div>
    </>
  );
};

export default CardBox;
