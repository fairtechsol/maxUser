import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import PlayerButton from "../PlayerButton";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { useEffect } from "react";
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

  useEffect(() => {
    if ( lowHigh?.[0]?.gstatus === "SUSPENDED"||lowHigh?.[0]?.gstatus === "CLOSED" || lowHigh?.[0]?.b1 === "0.00") {
      dispatch(selectedBetAction(""));
    }
  }, [lowHigh?.[0]?.gstatus,lowHigh?.[0]?.b1]);
  
  return (
    <div className="tiePairContaine">
      <div
        style={{
          width: "100%",
          textAlign: "end",
          borderBottom: "1px solid #aaa",
          borderLeft: "1px solid #aaa",
          borderRight: "1px solid #aaa",
          display: "flex",
          alignItems: "start",
          justifyContent: "left",
          gap: "2px",
          fontWeight: "600",
          paddingLeft: "4px",
        }}
      >
      </div>

      {lowHigh &&
        lowHigh?.map((item: any, index: number) => (
          <PlayerButton
            key={index}
            value1={item?.b1}
            value4={item?.l1}
            value2={item?.nat}
            value3={getProfitLoss(item?.nat?.replace(/\s+/g, "").toLowerCase())}
            width={"100%"}
            handleBet={handleBet}
            lock={item?.gstatus === "CLOSED" ||item?.gstatus === "SUSPENDED" || item?.b1 === "0.00"}
            data={item}
          />
        ))}
    </div>
  );
};

export default TiePairBox;
