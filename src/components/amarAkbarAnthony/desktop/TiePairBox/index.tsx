import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";
import PlayerButton from "../PlayerButton";
import { seven } from "../../../../assets/images";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const TiePairBox = ({ lowHigh, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = lowHigh?.[0]?.min;
  const max = lowHigh?.[0]?.max;

  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.b1,
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

        <PlayerButton
          value1={lowHigh?.[0]?.b1}
          value4={lowHigh?.[0]?.l1}
          value2={"Amar"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[0]?.sid}_card`
                ]
              : 0
          }
          width={"30%"}
          handleBet={handleBet}
          lock={lowHigh?.[0]?.gstatus === "CLOSED" ? true : false}
          data={lowHigh?.[0]}
        />

        <PlayerButton
          value1={lowHigh?.[1]?.b1}
          value4={lowHigh?.[1]?.l1}
          value2={"Akbar"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[1]?.sid}_card`
                ]
              : 0
          }
          width={"30%"}
          handleBet={handleBet}
          lock={lowHigh?.[1]?.gstatus === "CLOSED" ? true : false}
          data={lowHigh?.[1]}
        />

        <PlayerButton
          value1={lowHigh?.[2]?.b1}
          value4={lowHigh?.[2]?.l1}
          value2={"Anthony"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[1]?.sid}_card`
                ]
              : 0
          }
          width={"30%"}
          handleBet={handleBet}
          lock={lowHigh?.[2]?.gstatus === "CLOSED" ? true : false}
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
