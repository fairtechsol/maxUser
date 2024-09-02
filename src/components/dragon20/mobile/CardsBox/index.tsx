import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const CardBox = ({ name, cardData, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = cardData?.[0]?.min;
  const max = cardData?.[0]?.max;
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
  };
  return (
    <>
      <div className="cardContainerMob">
        <div style={{ textAlign: "center",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>{name}</span>
          </div>
          <span style={{ fontSize: "16px", fontWeight: "bolder",marginLeft:"4px" }}>
            {parseFloat(
              isNaN(cardData?.[0]?.rate) ? 0 : cardData?.[0]?.rate
            ).toFixed(2)}
          </span>
        </div>
        
          <CommonCardImg
            cardData={cardData}
            handleBet={handleBet}
            data={data}
          />
        
        <div style={{ textAlign: "end" }}>
          <span style={{ fontSize: "12px" }}>Min:</span>
          <span style={{ fontSize: "12px" }}>{min}</span>
          <span style={{ fontSize: "12px", marginLeft: "10px" }}>Max:</span>
          <span style={{ fontSize: "12px" }}>{max}</span>
        </div>
      </div>
    </>
  );
};

export default CardBox;
