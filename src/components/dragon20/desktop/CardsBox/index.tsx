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
      <div className="cardContainer">
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "20px" ,fontWeight:"bold"}}>
            {name}{" "}
            {parseFloat(
              isNaN(cardData?.[0]?.rate) ? 0 : cardData?.[0]?.rate
            ).toFixed(2)}
          </span>
        </div>
        <div>
          <CommonCardImg
            cardData={cardData}
            handleBet={handleBet}
            data={data}
          />
        </div>
        <div style={{ textAlign: "end" }}>
          <span style={{ fontWeight: "bolder" }}>Min:</span>
          <span>{min}</span>
          <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
          <span>{max}</span>
        </div>
      </div>
    </>
  );
};

export default CardBox;
