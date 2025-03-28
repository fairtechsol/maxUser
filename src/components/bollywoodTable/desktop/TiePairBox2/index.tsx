import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import PlayerButton from "../../desktop/PlayerButton";

const TiePairBox2 = ({ lowHigh, data }: any) => {
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
    <div className="tiePairContainer-bt">
      <div className="tiePairRateBoxMainlucky">
        <PlayerButton
          value1={lowHigh?.b1}
          value4={lowHigh?.l1}
          value2={lowHigh?.nat}
          value3={getProfitLoss("odd", lowHigh?.sid)}
          width={"100%"}
          handleBet={handleBet}
          lock={
            lowHigh?.gstatus === "CLOSED" ||
            lowHigh?.gstatus === "SUSPENDED" ||
            lowHigh?.[0]?.b1 === "0.00"
          }
          data={lowHigh}
        />
      </div>
    </div>
  );
};

export default TiePairBox2;
