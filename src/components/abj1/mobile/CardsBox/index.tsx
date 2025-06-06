import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const CardBox = ({title, odds, data,cards,bgColor }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet=(item:any)=>{
    let team ={
      "bettingType": "BACK",
      "matchId": data?.id,
      "odd": item?.rate,
      "stake": 0,
      "matchBetType": "matchOdd",
      "betOnTeam":item?.nation,
      "name":item?.nation,
      "bettingName": "Match odds",
      "selectionId": item?.sid,
      "min":data?.videoInfo?.min,
      "max":data?.videoInfo?.max
    }
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  }
  const arCards = cards?.ar?.split(",");
  const brCards = cards?.br?.split(",");
  return (
    <>
      <div className="abjcardContainer" style={{backgroundColor:bgColor,border:"0.5px solid #000"}} >
        <div style={{width:"20%",display:"flex",justifyContent:"center" ,alignItems: "center",borderRight:"0.5px solid #000" }}>
          <span style={{ fontSize: "16px",writingMode:"vertical-lr", textOrientation:"upright",fontWeight:"600"}}>
          {title}
          </span>
        </div>
        <div className="p-3">
          <CommonCardImg cardData={odds} cardInfo={title==="ANDAR"?arCards:brCards} handleBet={handleBet} data={data}/>
        </div>
       
      </div>
    </>
  );
};

export default CardBox;
