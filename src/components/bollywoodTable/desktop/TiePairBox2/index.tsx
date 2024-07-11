import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { useState } from "react";
import CommonButtonBox from "../CommonButtonBox";
import PlayerButton from "../PlayerButton";
import { seven } from "../../../../assets/images";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { IoInformationCircle } from "react-icons/io5";
import SmoothDropdownModal from "../../mobile/minMaxModal";

const TiePairBox = ({ lowHigh, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = lowHigh?.[0]?.min;
  const max = lowHigh?.[0]?.max;
  const [modelOpen, setModelOpen] = useState(false);

  const handleBet = (item: any,type:any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd:type==="BACK"? item?.b1:item?.l1,
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
    <div className="tiePairContainer">

<div style={{ width: "98%", textAlign: "end" }}>
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
      </div>

      <div className="tiePairRateBoxMainlucky">
        <PlayerButton
          value1={lowHigh?.b1}
          value4={lowHigh?.l1}
          value2={lowHigh?.nat}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.sid}_card`
                ]
              : 0
          } 
          width={"100%"}
          handleBet={handleBet}
          lock={lowHigh?.gstatus === "CLOSED" ? true : false}
          data={lowHigh}
        />
      </div>
      {/* <div style={{ textAlign: "end", width: "100%" }}>
        <span style={{ fontWeight: "bolder" }}>Min:</span>
        <span>{min}</span>
        <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
        <span>{max}</span>
      </div> */}
    </div>
  );
};

export default TiePairBox;
