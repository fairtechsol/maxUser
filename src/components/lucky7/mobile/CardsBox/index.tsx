import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";

const CardBox = ({ cardData, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.rate,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.sid === "7" ? "Card A" : item?.nation,
      name: item?.sid === "7" ? "Card A" : item?.nation,
      bettingName: "Match odds",
      selectionId: item?.sid,
      min: item?.min,
      max: item?.max,
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
        <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <div style={{ width: "55%", textAlign: "end" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bolder",
                alignSelf: "center",
              }}
            >
              {parseFloat(
                isNaN(cardData?.[0]?.rate) ? 0 : cardData?.[0]?.rate
              ).toFixed(2)}
            </span>
          </div>
          {/* <div style={{ width: "45%", textAlign: "end" }}>
             <span className="minmaxi">
             <IoInformationCircle
              color="#ffc742"
              onClick={() => setModelOpen(!modelOpen)}
            />
            <SmoothDropdownModal
              min={min}
              max={max}
              show={modelOpen}
              setShow={() => setModelOpen(false)}
            />
                      </span>
          </div> */}
        </div>
        <div>
          <CommonCardImg
            cardData={cardData}
            handleBet={handleBet}
            data={data}
          />
        </div>
        {/* <div style={{ textAlign: "end" }}>
        <span style={{ fontWeight: "bolder" }}>Min:</span>
        <span>{min}</span>
        <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
        <span>{max}</span>
      </div> */}
      </div>
    </>
  );
};

export default CardBox;
