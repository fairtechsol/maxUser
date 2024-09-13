import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { useState } from "react";
import PlayerButton from "../../desktop/PlayerButton";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { IoInformationCircle } from "react-icons/io5";
import SmoothDropdownModal from "../../mobile/minMaxModal";

const TiePairBox2 = ({ lowHigh, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = lowHigh?.min;
  const max = lowHigh?.max;
  const [modelOpen, setModelOpen] = useState(false);

  const handleBet = (item: any, type: any) => {
    let team = {
      bettingType: type,
      matchId: data?.id,
      odd: type === "BACK" ? item?.b1 : item?.l1,
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

  const getProfitLoss = (gameName: string, sid: any) => {
    try {
      let result = 0;
      if (data?.profitLoss && Object.keys(data.profitLoss).length > 0) {
        const key = `${data.videoInfo.mid}_${sid}_card`;
        if (key in data.profitLoss) {
          const jsonString = data.profitLoss[key];
          const parsedData = JSON.parse(jsonString);
          result = parsedData[gameName] ? parsedData[gameName] : 0;
        } else return result;
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tiePairContainer">
      {/* <div style={{ width: "98%", textAlign: "end" }}>
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

      <div className="tiePairRateBoxMainlucky">
        <PlayerButton
          value1={lowHigh?.b1}
          value4={lowHigh?.l1}
          value2={lowHigh?.nat}
          value3={getProfitLoss("odd", lowHigh?.sid)}
          width={"100%"}
          handleBet={handleBet}
          lock={
            lowHigh?.gstatus === "CLOSED" || lowHigh?.gstatus === "SUSPENDED"
          }
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

export default TiePairBox2;
