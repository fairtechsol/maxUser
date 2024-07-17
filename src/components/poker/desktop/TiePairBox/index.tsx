import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const TiePairBox = ({ handsData, data , width,title,cards}: any) => {
  const dispatch: AppDispatch = useDispatch();
  // console.log(data,'tiePair',tiePair)
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.rate,
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
    // console.log("team", team);
  };
const handleCard=(data:any,index:number,type:string)=>{
  let card ;
if(type==='first'){
  card = `C${index+1}`
  return data[card]
}else{
  card = `C${index+7}`
  return data[card]
}
}
  return (
    <div className="tiePairContainer">
      <div className="tiePairRateBoxMainP">
      {handsData?.map((hand:any, index:any) => (
        <CommonButtonBox
          key={index}
          value1={hand?.rate}
          value2={hand?.nat} // Assuming hand has a name property
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${hand?.sid}_card`
                ]
              : 0
          }
          width={width}
          handleBet={handleBet}
          lock={hand?.gstatus === "0"}
          data={hand}
          title={title}
          card1={title ==='hand' ? handleCard(cards,index,'first'):null}
          card2={title ==='hand' ? handleCard(cards,index,'second'):null}
          min={hand?.min}
          max={hand?.max}
        />
      ))}
      </div>
    </div>
  );
};

export default TiePairBox;
