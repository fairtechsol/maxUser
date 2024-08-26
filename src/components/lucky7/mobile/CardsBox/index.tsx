import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";
import { IoInformationCircle } from "react-icons/io5";
import SmoothDropdownModal from "../minMaxModal";
import { useState } from "react";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const CardBox = ({ cardData, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const min = cardData?.[0]?.min;
  const max = cardData?.[0]?.max;
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
      <div className="cardContainerMob">
        <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <div style={{ width: "55%", textAlign: "end" }}>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bolder",
                alignSelf: "center",
              }}
            >
              {parseFloat(isNaN(cardData?.[0]?.rate)?0:cardData?.[0]?.rate).toFixed(2)}
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
          <CommonCardImg cardData={cardData} handleBet={handleBet} data={data}/>
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
