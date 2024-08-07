import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import PlayerButton from "../PlayerButton";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { useEffect } from "react";
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
    <div className="">
      <div
        className="tiePairRateBoxMainlucky"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        {/* <div className="commonButtonBoxContainer" style={{ width: "30%" }}>
          <div>
            <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
              {parseFloat(lowHigh?.[0]?.b1).toFixed(2)}
            </span>
          </div>
          <div  //lowHigh?.[0]?.gstatus === "0" ? true : false
            className={`tiePairbtn-theme ${lowHigh?.[0]?.gstatus === "0" ? "suspended" : ""}`}
            onClick={() => (!(lowHigh?.[0]?.gstatus === "0") ? handleBet(data) : null)}
          >
            <span>
              {
                "Amar"
              }
            </span>
          </div>
          <div>
            <span
              style={{ fontSize: "16px" }}
              className={`${
                value3 && value3 > 0
                  ? "color-green"
                  : value3 < 0
                  ? " color-red"
                  : ""
              }`}
            >
              {value3 || 0}
            </span>
          </div>
        </div> */}

        <div
          style={{
            textAlign: "start",
            width: "100%",
            alignItems: "center",
            borderBottom: "1px solid #aaa",
            display: "flex",
            paddingTop: "2px",
          }}
        >
          <span style={{ fontWeight: "bolder" }}>Min:</span>
          <span>{min}</span>
          <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
          <span>{max}</span>
        </div>

        <PlayerButton
          value1={lowHigh?.[0]?.b1}
          value4={lowHigh?.[0]?.l1}
          value2={"Amar"}
          value3={getProfitLoss("amar")}
          width={"100%"}
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
          value2={"Akbar"}
          value3={getProfitLoss("akbar")}
          width={"100%"}
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
          value2={"Anthony"}
          value3={getProfitLoss("anthony")}
          width={"100%"}
          handleBet={handleBet}
          lock={
            lowHigh?.[2]?.gstatus === "CLOSED" || lowHigh?.[2]?.b1 === "0.00"
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
