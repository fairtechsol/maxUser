import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import PlayerButton from "../PlayerButton";
const TiePairBox = ({ lowHigh, data }: any) => {
  const dispatch: AppDispatch = useDispatch();

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

  const getProfitLoss = (gameName: string) => {
    try {
      let result = 0;
      if (data?.profitLoss && Object.keys(data.profitLoss).length > 0) {
        const key = `${data.videoInfo.mid}_1_card`;
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
      <div className="tiePairRateBoxMainlucky">
        <PlayerButton
          value1={lowHigh?.[0]?.b1}
          value4={lowHigh?.[0]?.l1}
          value2="A. Amar"
          value3={getProfitLoss("amar")}
          width={"30%"}
          handleBet={handleBet}
          lock={
            lowHigh?.[0]?.gstatus === "SUSPENDED" ||
            lowHigh?.[0]?.gstatus === "CLOSED" ||
            lowHigh?.[0]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[0]}
        />

        <PlayerButton
          value1={lowHigh?.[1]?.b1}
          value4={lowHigh?.[1]?.l1}
          value2="B. Akbar"
          value3={getProfitLoss("akbar")}
          width={"30%"}
          handleBet={handleBet}
          lock={
            lowHigh?.[1]?.gstatus === "SUSPENDED" ||
            lowHigh?.[1]?.gstatus === "CLOSED" ||
            lowHigh?.[1]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[1]}
        />

        <PlayerButton
          value1={lowHigh?.[2]?.b1}
          value4={lowHigh?.[2]?.l1}
          value2="C. Anthony"
          value3={getProfitLoss("anthony")}
          width={"30%"}
          handleBet={handleBet}
          lock={
            lowHigh?.[2]?.gstatus === "SUSPENDED" ||
            lowHigh?.[2]?.gstatus === "CLOSED" ||
            lowHigh?.[2]?.b1 === "0.00"
              ? true
              : false
          }
          data={lowHigh?.[2]}
        />
      </div>
    </div>
  );
};

export default TiePairBox;
