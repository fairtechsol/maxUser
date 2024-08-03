import { useDispatch } from "react-redux";
import { useState } from "react";
import { AppDispatch } from "../../../../store/store";
import PlayerButton from "../PlayerButton";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { IoInformationCircle } from "react-icons/io5";
import SmoothDropdownModal from "../../mobile/minMaxModal";
import { useEffect } from "react";

const TiePairBox = ({ lowHigh, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = lowHigh?.[0]?.min;
  const max = lowHigh?.[0]?.max;
  const [modelOpen, setModelOpen] = useState(false);
  const handleBet = (item: any, type: any) => {
    let team = {
      bettingType: "BACK",
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

  
  useEffect(() => {
    if (lowHigh?.[0]?.gstatus === "CLOSED" ||lowHigh?.[0]?.b1 === "0.00") {
      dispatch(selectedBetAction(""));
    } 
    
  }, [lowHigh?.[0]?.gstatus,lowHigh?.[0]?.b1]);

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
          value1={lowHigh?.[0]?.b1}
          value4={lowHigh?.[0]?.l1}
          value2={lowHigh?.[0]?.nat}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[0]?.sid}_card`
                ]
              : 0
          }
          width={"30%"}
          handleBet={handleBet}
          lock={lowHigh?.[0]?.gstatus === "CLOSED" ||lowHigh?.[0]?.b1 === "0.00" ? true : false}
          data={lowHigh?.[0]}
        />

        <PlayerButton
          value1={lowHigh?.[1]?.b1}
          value4={lowHigh?.[1]?.l1}
          value2={lowHigh?.[1]?.nat}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[1]?.sid}_card`
                ]
              : 0
          }
          width={"30%"}
          handleBet={handleBet}
          lock={lowHigh?.[1]?.gstatus === "CLOSED" ||lowHigh?.[1]?.b1 === "0.00" ? true : false}
          data={lowHigh?.[1]}
        />

        <PlayerButton
          value1={lowHigh?.[2]?.b1}
          value4={lowHigh?.[2]?.l1}
          value2={lowHigh?.[2]?.nat}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[1]?.sid}_card`
                ]
              : 0
          }
          width={"30%"}
          handleBet={handleBet}
          lock={lowHigh?.[2]?.gstatus === "CLOSED" ||lowHigh?.[2]?.b1 === "0.00" ? true : false}
          data={lowHigh?.[2]}
        />
      </div>
      <div className="tiePairRateBoxMainlucky">
        <PlayerButton
          value1={lowHigh?.[3]?.b1}
          value4={lowHigh?.[3]?.l1}
          value2={lowHigh?.[3]?.nat}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[3]?.sid}_card`
                ]
              : 0
          }
          width={"30%"}
          handleBet={handleBet}
          lock={lowHigh?.[3]?.gstatus === "CLOSED" ||lowHigh?.[3]?.b1 === "0.00" ? true : false}
          data={lowHigh?.[3]}
        />

        <PlayerButton
          value1={lowHigh?.[4]?.b1}
          value4={lowHigh?.[4]?.l1}
          value2={lowHigh?.[4]?.nat}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[4]?.sid}_card`
                ]
              : 0
          }
          width={"30%"}
          handleBet={handleBet}
          lock={lowHigh?.[4]?.gstatus === "CLOSED" ||lowHigh?.[4]?.b1 === "0.00" ? true : false}
          data={lowHigh?.[4]}
        />

        <PlayerButton
          value1={lowHigh?.[5]?.b1}
          value4={lowHigh?.[5]?.l1}
          value2={lowHigh?.[5]?.nat}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[5]?.sid}_card`
                ]
              : 0
          }
          width={"30%"}
          handleBet={handleBet}
          lock={lowHigh?.[5]?.gstatus === "CLOSED" ||lowHigh?.[5]?.b1 === "0.00" ? true : false}
          data={lowHigh?.[5]}
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
