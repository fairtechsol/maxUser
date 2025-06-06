import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const CardBox = ({ name, cardData, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
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
      min:item?.min,
      max:item?.max
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
      </div>
    </>
  );
};

export default CardBox;
