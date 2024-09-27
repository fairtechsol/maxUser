import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";
import { useEffect } from "react";
const TiePairBox = ({ tiePair, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.rate,
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
    if (tiePair?.[0]?.gstatus === "0" ||tiePair?.[0]?.rate === "0.00") {
      dispatch(selectedBetAction(""));
    } 
    
  }, [tiePair?.[0]?.gstatus,tiePair?.[0]?.rate]);
  return (
    <div className="tiePairContainer-d2">
      <div className="tiePairRateBoxMain">
        <CommonButtonBox
          value1={tiePair?.[0]?.rate}
          value2={"Dragon"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[0]?.sid}_card`
                ]
              : 0
          }
          width={"28%"}
          handleBet={handleBet}
          lock={tiePair?.[0]?.gstatus === "0" ? true : false}
          data={tiePair?.[0]}
        />
        <CommonButtonBox
          value1={tiePair?.[2]?.rate}
          value2={"Tie"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[2]?.sid}_card`
                ]
              : 0
          }
          width={"14%"}
          handleBet={handleBet}
          lock={tiePair?.[2]?.gstatus === "0" ? true : false}
          data={tiePair?.[2]}
        />
        <CommonButtonBox
          value1={tiePair?.[1]?.rate}
          value2={"Tiger"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${tiePair?.[1]?.sid}_card`
                ]
              : 0
          }
          width={"28%"}
          handleBet={handleBet}
          lock={tiePair?.[1]?.gstatus === "0" ? true : false}
          data={tiePair?.[1]}
        />
        <div style={{ width: "30%",borderLeft:"5px solid #ffc742",display:"flex",justifyContent:"center", height: "70px" }}>
          <CommonButtonBox
            value1={tiePair?.[3]?.rate}
            value2={"Pair"}
            value3={
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${tiePair?.[3]?.sid}_card`
                  ]
                : 0
            }
            width={"80%"}
            handleBet={handleBet}
            lock={tiePair?.[3]?.gstatus === "0" ? true : false}
            data={tiePair?.[3]}
          />
        </div>
      </div>
    </div>
  );
};

export default TiePairBox;
