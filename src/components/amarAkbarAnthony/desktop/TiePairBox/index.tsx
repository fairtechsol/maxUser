import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import PlayerButton from "../PlayerButton";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const TiePairBox = ({ lowHigh, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = lowHigh?.[0]?.min;
  const max = lowHigh?.[0]?.max;

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
  return (
    <div className="tiePairContainer">
      <div className="tiePairRateBoxMainlucky">
        <PlayerButton
          value1={lowHigh?.[0]?.b1}
          value4={lowHigh?.[0]?.l1}
          value2="A. Amar"
          value3={
            data?.profitLoss
              ? JSON.parse(data?.profitLoss[`${data?.videoInfo?.mid}_1_card`])[
                  "amar"
                ]
                ? JSON.parse(
                    data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  )["amar"]
                : 0
              : 0
          }
          width={"30%"}
          handleBet={handleBet}
          lock={
            lowHigh?.[0]?.gstatus === "CLOSED" || lowHigh?.[0]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[0]}
        />

        <PlayerButton
          value1={lowHigh?.[1]?.b1}
          value4={lowHigh?.[1]?.l1}
          value2="B. Akbar"
          value3={
            data?.profitLoss
              ? JSON.parse(data?.profitLoss[`${data?.videoInfo?.mid}_1_card`])[
                  "akbar"
                ]
                ? JSON.parse(
                    data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  )["akbar"]
                : 0
              : 0
          }
          width={"30%"}
          handleBet={handleBet}
          lock={
            lowHigh?.[1]?.gstatus === "CLOSED" || lowHigh?.[1]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[1]}
        />

        <PlayerButton
          value1={lowHigh?.[2]?.b1}
          value4={lowHigh?.[2]?.l1}
          value2="C. Anthony"
          value3={
            data?.profitLoss
              ? JSON.parse(data?.profitLoss[`${data?.videoInfo?.mid}_1_card`])[
                  "anthony"
                ]
                ? JSON.parse(
                    data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  )["anthony"]
                : 0
              : 0
          }
          width={"30%"}
          handleBet={handleBet}
          lock={
            lowHigh?.[2]?.gstatus === "CLOSED" || lowHigh?.[2]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[2]}
        />
      </div>
      <div style={{ textAlign: "end", width: "100%" }}>
        <span style={{ fontWeight: "bolder" }}>Min:</span>
        <span>{min}</span>
        <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default TiePairBox;
