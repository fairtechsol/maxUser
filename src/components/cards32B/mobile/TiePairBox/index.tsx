import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

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
  return (
    <div className="tiePairContainer-m">
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
          width={"35%"}
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
          width={"20%"}
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
          width={"35%"}
          handleBet={handleBet}
          lock={tiePair?.[1]?.gstatus === "0" ? true : false}
          data={tiePair?.[1]}
        />
      </div>
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
        width={"95%"}
        handleBet={handleBet}
        lock={tiePair?.[3]?.gstatus === "0" ? true : false}
        data={tiePair?.[3]}
      />
    </div>
  );
};

export default TiePairBox;
